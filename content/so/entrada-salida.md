---
title: Entrada/Salida
description: >
    Además de crear abstracciones para los procesos, la memoria y los archivos;
    el Sistema Operativo es el encargado de manejar los dispositivos de
    Entrada/Salida. Debe pasarles comandos, captar interrupciones y manejar
    errores.
date: 2024-01-08T10:36:22+01:00
weight: 5
---

# Dispositivos de E/S

Entre las responsabilidades del Sistema Operativo está manejar los dispositivos
de Entrada/Salida y proporcionar una **interfaz simple y homogénea** para todos
ellos. Esto constituye gran parte del código del kernel.

- Emitir comandos
- Captar interrupciones
- Manejar errores

Dos categorías de dispositivos E/S:

- **Dispositivos de bloque**: almacenan información en bloques independientes de
  tamaño fijo (512B - 32 KiB) y toda transferencia se realiza mediante dichos
  bloques. Los discos duros, CDs y memorias USB son los más comunes.
- **Dispositivos de carácter**: envía o acepta un flujo de caracteres, por lo
  que no es direccionable ni dispone de operaciones de búsqueda. Impresoras,
  interfaces de red, el ratón, etc son algunos ejemplos.

Tenga en cuenta que el límite no está bien definido: hay dispositivos como las
cintas magnéticas que operan en bloques pero también no son direccionables, solo
funcionan secuencialmente.

Además, existen otros dispositivos que no caen en ninguna de estas categorías,
como el reloj del sistema o las pantallas.

Ya se ha visto en la [introducción], estos dispositivos disponen de un
componente mecánico y otro electrónico. A este último se le llama **controlador
de dispositivo** o **adaptador** y se comunica con el dispositivo mediante una
interfaz, que normalmente es de muy bajo nivel. Se encarga de convertir el flujo
de bits en un bloque de datos y realizar correcciones de errores.

Cada controlador dispone de unos **registros de control** para comunicarse con
la CPU. Escribiendo en dichos registros, el Sistema Operativo puede hacer que el
dispositivo envíe o acepte datos, se encienda o apage o que realice alguna
acción. Y leyendo su contenido, se puede conocer el estado del dispositivo, si
está preparado para aceptar comandos.

También posee un **buffer de datos** que del que se puede leer y escribir. Es
donde el dispositivo recibe los datos de entrada principalmente. Un ejemplo muy
claro es la memoria de vídeo, VRAM.

# Comunicación controladora-CPU

¿Cómo se comunica la CPU con estos registros y buffers?

<!-- TODO: figura 5-2 página 333, diapositiva 7 -->

{{< block "Puertos E/S" >}}
A cada registro se le asigna un **número de puerto E/S** (entero de 8 o 16
bits), que conforman el **espacio de puertos de E/S**. Estos están protegidos
para que solo se puedan usar en modo kernel con instrucciones especiales, como
`in reg1, puerto` o `out puerto, reg1`.

**El espacio de direcciones y el espacio de puertos son completamente
diferentes**. Uno hace referencia a memoria principal y otro a la memoria de
dispositivos de E/S.

Por tanto, existe una gran diferencia entre `mov r0, 4` y `in r0, 4`. La primera
lee la palabra 4 de memoria principal y la escribe en el registro `r0`, y la
segunda lee el registro de control del puerto 4 al registro `r0`.

Desventajas:

- Las instrucciones `in` y `out` solo se pueden utilizar en ensamblador, en
  lenguajes como C/C++ no hay forma de realizarlas. **Los drivers deben
  programarse en ensamblador**.
{{< /block >}}

{{< block "E/S por asignación de memoria" >}}
En el sistema de **E/S con asignación de memoria** (_mapped memory_), a cada
registro de control se le asigna una dirección de memoria única en la que no hay
memoria asignada. Por lo general se encuentran en la parte superior del espacio
de direcciones, donde es menos probable que exista una dirección física.

Ventajas:

- Soluciona el problema de las instrucciones `in` y `out`, dado que los
  registros de control se pueden direccionar como si fuese cualquier otra
  dirección. **Se pueden programar drivers en C**.

- No se requieren medidas de protección especiales para evitar que los procesos
  realizan operaciones E/S: simplemente esas direcciones no se colocan sobre el
  espacio de direcciones. Si cada dispositivo tiene sus registros en una página
  distinta, **el Sistema Operativo puede lanzar un error cuando se intenten
  acceder a aquellas que no se desee dar acceso**.

- Se pueden usar instrucciones de memoria sobre los registros de control. Con
  los puertos E/S se necesita primero acceder al registro y luego realizar
  comprobaciones, lo que implica más instrucciones.

Desventajas:

- La caché interfiere con el mecanismo: cuando se solicite por primera vez un
  valor quedará almacenado en la caché, que se usará en futuras llamadas. Por
  tanto, será un **valor desactualizado, dado que no se está volviendo a acceder
  al dispositivo**. El hardware debe tener la capacidad de poder deshabilitar la
  caché de forma selectiva.

- El hardware moderno tiende a incluir muchos más buses para no sobrecargar el
  principal, pero complica el mapeo de memoria: los dispositivos E/S no ven las
  direcciones que van a memoria principal. Una posible solución es enviar
  primero a memoria, y si no responde, pasarlo por el resto de buses; lo que es
  lento y require hardware adicional.
{{< /block >}}

{{< block "Híbrido" >}}
Se combinan los dos métodos anterior: para **los registros de control de usan
puertos de E/S** y para los **buffers de los dispositivos se usan asignación de
memoria**.
{{< /block >}}

Estas funcionan de la siguiente forma:

1. Cuando se quiere leer una palabra, sea memoria o puerto, la CPU coloca la
   dirección en las líneas de dirección del bus y una señal `read` en la línea
   de control.
2. Se utiliza **una segunda línea para indicar si es espacio de E/S o memoria**.
   - Si es espacio de memoria, se responde a la petición como hasta ahora.
   - Si es E/S, es el dispositivo quien responde

En el caso de que solo haya memoria (asignación por memoria), **todos los
módulos de memoria y dispositivos E/S están pendientes del bus por si encuentran
alguna dirección sobre la que operen**, si está en su rango, se responde. Dado
que no hay direcciones solapadas, no hay peligro de colisión.

# Acceso directo a memoria (DMA)

Sin importar que el sistema use E/S por asignación de memoria o no, es indudable
que la CPU debe poder acceder a las controladoras de los dispositivos. Solicitar
leer y escribir datos, lo que desperdicia tiempo de CPU, por lo que a menudo se
utiliza el esquema de DMA.

<!-- TODO: figura 5-4 página 337, diapositiva 17 -->

Solo se puede utilizar si el hardware tiene un controlador de DMA. Este **tiene
acceso al bus de manera independiente de la CPU** y contiene registros de
control para especificar el puerto E/S a utilizar, dirección de transferencia
(R/W), unidad de transferencia (byte o palabra) y el número de bytes
a transmitir.

El objetivo del DMA es **liberar a la CPU del intercambio de datos**. Se encarga
de controlar los dispositivos E/S mientras la CPU continua con otras tareas. El
DMA puede incluso gestionar varias operaciones de E/S a la vez (con dispositivos
diferentes, lógicamente), haciendo uso de un _Round-Robin_ o prioridades, pero
esto depende del hardware.

Tenga en cuenta que no todas las computadoras usan DMA, con el argumento de que
la CPU es mucho más rápida que el DMA y puede terminar antes de forma más
simple.

{{< dropdown "Modos de bus" >}}
Los buses pueden operar en varios modos:

- **Modo una palabra a la vez**: mientras se lleva a cabo una operación de DMA,
  la CPU tiene que esperar para usar el bus. Para evitarlo, se usa el **robo de
  ciclo**, el controlador del dispositivo roba un ciclo de bus de vez en cuando,
  retrasando ligeramente a la CPU.

- **Modo bloque**: el DMA opera en **modo ráfaga**, se indica que se va a usar
  el bus, emite una serie de transferencias y luego lo libera. Es más eficiente
  que el robo de ciclo, dado que adquirir el bus durante un momento lleva
  tiempo. Aun así, se puede bloquear la CPU por un tiempo considerable.
{{< /dropdown >}}

{{< dropdown "Método _fly-by_ y otros" >}}
El método _**fly-by**_ requiere que el controlador destino sea quien escribe
luego los datos en memoria principal. Es el que se usa en el ejemplo con DMA.

Otros métodos requieren que el DMA escriba luego los datos a memoria. Se
requiere un ciclo de bus adicional, pero es más flexible: los datos no tienen
porqué ir siempre a memoria.
{{< /dropdown >}}

{{< dropdown "¿Direcciones virtuales o físicas?" >}}
> Nota: puedes consultar más en el artículo sobre [memoria]({{< relref "memoria#memoria-virtual" >}})

La mayoría de los DMAs usan direcciones físicas, lo que requiere que el Sistema
Operativo traduzca la dirección antes de realizar la operación E/S.

Un esquema alternativo es usar las direcciones virtuales, pero el controlador de
la DMA debe pasar por la MMU.
{{< /dropdown >}}

{{< block "Ejemplo sin DMA" >}}
Lectura de un bloque del disco:

1. El controlador lee el bloque requerido bit a bit secuencialmente y lo coloca
   en el buffer interno.
2. Se comprueba si hay errores (checksum u otros).
3. Se produce una interrupción indicando que ha terminado.
4. El Sistema Operativo procesa la interrupción y ahora puede leer el bloque.
5. En bucle, la CPU se encarga de copiar los datos a memoria principal leyendo
   palabra a palabra (o byte a byte).

Nótese que es la CPU quien copia los datos, lo que lleva varios ciclos de reloj.
**La CPU está ocupada**.
{{< /block >}}

{{< block "Ejemplo con DMA" >}}
1. **La CPU programa el controlador de el DMA** (escribiendo en sus registros de
   control) para leer el bloque en concreto y dónde colocarlo en memoria.
   También se envía el comando al controlador del disco para que lea.

2. Cuando el disco ya ha leído y comprobado los datos, el **DMA inicia la
   transferencia enviando sucesivas peticiones de lectura del buffer del
   disco**, que se ven como otras cualquieras. Al controlador de disco le da igual
   si estas instrucciones vinieron de la CPU o de otro sitio.

3. El controlador de disco ya sabe a donde tiene que escribir los datos, dado
   que está en una de las líneas del bus. La escritura de memoria es otro ciclo
   de bus.

4. Cuando termina, el controlador de disco envía un ACK a el DMA, que disminuye
   su cuenta de bytes. Mientras no llegue a 0, repite los pasos 2, 3 y 4.

5. Finalmente, el DMA envía una interrupción a la CPU, indicando que ha
   terminado. Ahora, cuando el Sistema Operativo gestione la interrupción, ya
   están los datos requeridos en memoria principal.
{{< /block >}}

# Interrupciones

En la [introducción] se comentaron brevemente las interrupciones.

Cuando el dispositivo de E/S termina de hacer su trabajo, se lanza una
interrupción a modo de notificación para el Sistema Operativo. Esto se realiza
mediante el **controlador de interrupciones**:

<!-- TODO: figura 1-11 página 30 + figura 5-5 página 339 -->

1. El dispositivo se comunica con el controlador de interrupciones, poniendo una
   señal sobre una línea del bus concreta.
2. El controlador de interrupciones detecta la señal y decide qué hacer. Luego
   usa un pin de la CPU para notificarla.
     - Si no hay otras interrupciones, se procesa de inmediato
     - Si hay otras interrupciones, se mira cuál tiene más prioridad y se
       atiende esa. Se continua imponiendo las señales de las interrupciones
       restantes hasta que se atiendan.
3. Luego, el controlador de interrupciones coloca el número del dispositivo
   causante en el bus para poder identificarlo.
4. Se ejecuta el **despachador**, que guarda el estado previo en la pila y pasa
   al modo kernel. Usa el número del dispositivo para acceder al **vector de
   interrupciones** y obtener la dirección del manejador (_handler_)
   correspondiente.
5. Se inicia el manejador, que es parte del driver del dispositivo que causó la
   interrupción. Este lo consulta para conocer su estado, lo que le indica al
   dispositivo que puede emitir otra interrupción.
6. Finalmente, se regresa al modo usuario (recuperando los datos de la pila).

Es posible que las interrupciones se den en momentos inoportunos, como por
ejemplo, cuando se estaba manejando una interrupción previa. Por eso, la CPU
tiene un mecanismo para deshabilitar las interrupciones y rehabilitarlas
después.

Nótese que el paso 4 es como funcionan las traps e interrupciones: **se usa el
número de la trap o interrupción para acceder al vector de interrupciones**.
Este está localizado en una posición específica de memoria física o se usa un
registro para localizarla.

En los pasos 4 y 6 se hace referencia a la pila, pero ¿qué pila se usa?

- **Pila de usuario**: pueden suceder varios errores, como un fallo de página si la
  actual está llena (un fallo de página también genera una interrupción).
- **Pila del kernel**: al cambiar de modo, requiere cambiar el contexto de la
  MMU lo que probablemente invalide el contenido de la TLB {{< arrow >}} Se
  pierde mucho tiempo de CPU.

# Software de E/S

Debe de ser posible escribir programas que puedan acceder a cualquier
dispositivo de E/S sin saber de qué dispositivo se trata, es decir,
**independencia de dispositivos**. En Unix, por ejemplo, los dispositivos E/S se
representan como archivos y se pueden [montar] sobre la estructura existente.

Otra cuestión importante es el **manejo de errores**, que se debe llevar a cabo
lo más cerca del hardware que sea posible: si el controlador de disco descubre
un error de lectura, debe saber cómo manejarlo.

Comentar también las transferencias **síncronas** (bloquean el proceso) contra
las **asíncronas** (se realizan en segundo plano y se controlan por
interrupciones). Como hemos visto, el uso del DMA permite operaciones E/S
asíncronas: el dispositivo trabaja mientras la CPU atiende a otro proceso; pero
los programas de usuario esperan E/S síncronas, por lo que el SO debe hacer que
lo parezcan bloqueando el proceso.

Como ya hemos visto en la [introducción], hay tres maneras fundamentales en las
que se puede llevar a cabo la E/S:

- **E/S programada**: **ocupado en espera**, la CPU chequea constantemente el
  estado del dispositivo. La desventaja es que se pierde mucho tiempo de CPU.

- **E/S por interrupciones**: después de lanzar la operación, se bloquea el proceso
  actual y realiza un cambio de contexto a otro que esté listo. Cuando la
  operación termine, se lanzará una interrupción para continuar con la operación.
  Como desventaja es que se generan muchas interrupciones, y por tanto muchos
  cambios a modo kernel.

- **E/S por DMA**: muy similar al anterior, pero todas las interrupciones
  y control del dispositivo las controla la DMA, por lo que se producen menos
  interrupciones. Se necesita hardware dedicado, que normalmente es más lento que
  la CPU.

[introducción]: {{< relref "introduccion#entradasalida" >}}
[montar]:       {{< relref "archivos#montaje-de-sistemas-de-archivos" >}}

