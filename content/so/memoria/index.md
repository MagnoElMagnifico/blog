---
title: Memoria
description: >
    La memoria principal es un importante recurso del ordenador, y debe
    gestionarse con cuidado para obtener un buen rendimiento, ya que las CPUs
    son mucho más rápidas que las memorias. Para ello, se creó la jerarquía de
    memoria, y el administrador debe llevar registro de qué partes están en uso
    y de asignarlas a los procesos cuando la necesiten.
date: 2024-01-02T14:23:00+01:00
weight: 3
math: true
---

# Jerarquía de memoria

Como ya se ha visto en la introducción, en el [apartado de memoria], el
desarrollo de las CPUs avanza mucho más rápido que la tecnología de las
memorias. Como resultado, tenemos CPUs muy rápidas que no pueden trabajar por
culpa de unas memorias lentas. Para solucionar este problema, se creó la
**jerarquía de memoria**: en las capas más bajas se disponen de memorias más
baratas con más espacio a un alto coste temporal de lectura, mientras que en las
capas superiores son mucho más rápidas, pequeñas y caras.

<!-- TODO: diagrama jerarquía de memoria. Reutilizar la de la introducción -->

Nótese que las cachés solo están controladas parcialmente por hardware: en
algunos casos es necesario desactivar el uso de la caché mediante software.

{{< block "Objetivo" >}}
Tener una gran cantidad de memoria y un acceso muy rápido a esta.
{{< /block >}}

Este diseño funciona especialmente bien gracias al **Principio de Localidad**,
porque de lo contrario, sería muy ineficiente. El lector puede comprobarlo
realizando dos sencillos programas: uno que sume dos matrices por filas en
memoria, y otro que lo haga por columnas. Tenga en cuenta que las filas de las
matrices deben ser _muy_ grandes para que se note la diferencia.

{{< block "Principio de Localidad" "var(--magno-blue)" >}}
**Principio de Localidad Espacial**: Los datos que requiere un programa suelen
estar próximos en memoria.

- Instrucción: la siguiente a ejecutar se encuentra a continuación en memoria (o
  ejecutable).
- Datos: normalmente se guardan en arrays o matrices, todos ellos contiguos en
  memoria. Es sencillo operar con ellos: solo se necesita un puntero y un
  offset.

Además, por el **Principio de Localidad Temporal**, estos datos se suelen
utilizar muy próximos en el tiempo.
{{< /block >}}

{{< dropdown "Importante: unidades de espacio" >}}
Cuando se habla de memoria del computador, solo tiene sentido hablar de
potencias enteras de 2: la memoria RAM (_Random Access Memory_) se direcciona
con un número representado en binario.

Tabla de unidades del Sistema Internacional:

| Símbolo | Prefijo | Potencia | Número       |
|---------|---------|----------|--------------|
| Y       | yotta   | 10^24    | .            |
| Z       | zetta   | 10^21    | .            |
| E       | exa     | 10^18    | .            |
| P       | peta    | 10^15    | .            |
| T       | tera    | 10^12    | .            |
| G       | giga    | 10^9     | mil millones |
| M       | mega    | 10^6     | millón       |
| K       | kilo    | 10^3     | mil          |
| .       | .       | .        | .            |
| m       | mili    | 10^-3    | milésima     |
| u       | micro   | 10^-6    | millonésimo  |
| n       | nano    | 10^-9    | .            |
| p       | pico    | 10^-12   | .            |
| f       | femto   | 10^-15   | .            |

Fuente: [Wikipedia](https://es.wikipedia.org/wiki/Prefijos_del_Sistema_Internacional)

Tabla de unidades en Binario:

- `B`: Byte
- `b`: bit

| Símbolo | Prefijo | Potencia | Número        |
|---------|---------|----------|---------------|
| Yi      | yobi    | 2^80     | .             |
| Zi      | zebi    | 2^70     | .             |
| Ei      | exbi    | 2^60     | .             |
| Pi      | pebi    | 2^50     | .             |
| Ti      | tebi    | 2^40     | .             |
| Gi      | gibi    | 2^30     | 1 073 741 824 |
| Mi      | mega    | 2^20     | 1 048 576     |
| Ki      | kibi    | 2^10     | 1024          |

Fuente: [Wikipedia](https://es.wikipedia.org/wiki/Prefijo_binario#Tablas)
{{< /dropdown >}}


{{< block "Responsabilidades del SO" >}}
Las responsabilidades del Administrador de Memoria son:

- Saber qué partes de la memoria está en uso
- Asignar memoria a cada proceso
- Liberar la memoria de los procesos que terminan (_core dumps_, etc)

A mayores, se debe gestionar el movimiento de datos entre memoria principal
y disco, dado que no se hace por hardware. Es esencialmente **el mismo problema
que las memorias cachés**, pero al hacerse mediante software y dado que se
dispone de más tiempo (la lectura de disco es muy lenta), se pueden ejecutar
ideas más sofisticadas.

- Algoritmos de reemplazo
- Cachés asociativas, por conjuntos, etc

<!-- TODO: link a arquitectura de computadores -->
{{< /block >}}


# Sin abstracción de memoria

## Un solo proceso

Las primeras computadoras operaban sin ningún tipo de abstracción de memoria: el
programador utilizaba directamente memoria física, las instrucciones como `mov
registro1, 1000` literalmente movían el contenido de la dirección 1000 al
`registro1`. Los programas tienen acceso desde la posición 0 hasta el valor
máximo, esto es, se usan **direcciones absolutas**.

Para sistemas como este, simplemente se carga un programa en memoria, y cuando
termina, se sobreescribe con el siguiente. La única posibilidad de tener cierto
paralelismo es utilizando hilos, pero aun así no es posible ejecutar programas
no relacionados a la vez.

{{< block "Nota" >}}
Estas direcciones de memoria apuntan a una **unidad direccionable**, que puede ser
un byte, una palabra de 4 bytes, etc.
{{< /block >}}

<!-- TODO: figura diapositiva 7, 3-1 página 177 -->

Dentro de este esquema, existen varias formas de distribuir los distintos
componentes necesarios dentro de la memoria principal:

- El SO puede estar en la parte inferior de la RAM
- El SO puede estar en una memoria ROM (dispositivos de bolsillo o empotrados).
- Los _drivers_ se pueden almacenar en una memoria ROM (primeros sistemas
  MS-DOS).

## Varios procesos

Sin embargo, con esta estrategia de usar la memoria física directamente, resulta
imposible ejecutar múltiples programas a la vez ([multiprogramación]), dado que
colisionarían constantemente. El compilador tampoco podría hacerlo, dado que no
sabe qué otros procesos se van a ejecutar y por tanto desconoce qué direcciones
escoger para su programa.

<!-- TODO: diagrama intercambio: memoria principal (partes del programa) y disco
(otros programas almacenados) -->

Una idea que se nos podría ocurrir sería realizar una conmutación entre memoria
principal y disco (**[Intercambio]**): en los cambios de contexto se almacena
temporalmente toda la memoria en un archivo de disco del proceso que se retira,
y se carga del disco otro el nuevo proceso. Mientras solo haya un único proceso
en memoria principal de cada vez, no habrá problemas de conflictos.

Pero esto es _muy muy_ lento: tenga en cuenta que con cada cambio de contexto se
tiene que rellenar toda la memoria principal con el contenido del disco, que
sabemos que es un dispositivo muy lento (se encuentra abajo en la jerarquía de
memoria).

-----------------------------------------------------------

La alternativa, es usar **reubicación estática** que consiste en, cuando se
cargue un nuevo programa, **se desplacen _todas_ las direcciones del programa
por un _offset_**: suponiendo programas de 16 KiB, pasaría de utilizar las
direcciones 0 - 16,383 a 16,384 - 32,768, por ejemplo. Como resultado, habría un
programa en la parte más baja de la memoria, y otro en la parte más alta de la
memoria.

<!-- TODO: figura representando esta distribución de los programas -->

Es un proceso muy lento, dado que se tiene que recorrer y modificar todo un
programa. Además, se debe diferenciar de lo que es una dirección de lo que es
una constante cualquiera del programa: `mov registro1, 28` podría referirse
a meter la dirección 28 en el registro 1, o directamente usar el 28 como una
constante para algún cálculo.

Esta solución solo la usan determinados sistemas empotrados sin abstracción de
memoria, donde se conoce qué procesos se van a ejecutar con antelación.

{{< block "Conclusión" >}}
Que los programas utilicen directamente direcciones absolutas puede ser
problemático:

- Si los programas pueden direccionar cualquier byte de la memoria, pueden
  estropear el propio Sistema Operativo con facilidad (sea intencional
  o accidentalmente), incluso si solo hay un proceso.
- Es muy difícil ejecutar varios programas a la vez de forma eficiente.
- No hay protección entre procesos.
{{< /block >}}


# Espacio de direcciones

Para solucionar los problemas de utilizar direcciones absolutas directamente, se
inventó la abstracción del **espacio de direcciones**. Así como el concepto de
proceso crea como una CPU abstracta para ejecutar programas, el espacio de
direcciones crea un tipo de memoria abstracta para que puedan vivir ahí.

{{< block "Espacio de direcciones" "var(--magno-blue)" >}}
Un **espacio de direcciones** (_address space_) es el conjunto de direcciones
que puede usar un proceso para direccionar memoria. Cada proceso tiene el suyo
propio, independiente del resto.
{{< /block >}}

<!-- TODO: figura espacio de direcciones 2-11-2023 -->

El concepto de espacio de direcciones también existe en otros ámbitos, como el
conjunto de direcciones IPv4 válidas, o incluso espacios no numéricos, como el
conjunto de dominios `.com` de Internet.

## Reubicación dinámica

Una implementación sencilla del espacio de direcciones usa una versión simple de
la **reubicación dinámica**. Para ello, se utilizan dos registros hardware,
protegidos en muchas implementaciones para que solo el Sistema Operativo pueda
utilizarlos:

- **Registro base**: dirección física donde empieza el programa.
- **Registro límite**: longitud del programa.

**El espacio de cada proceso se asigna a una zona concreta de la memoria
física** libre, se carga el programa la zona de memoria dada (sin cambiar las
direcciones), y se guarda en los registros el inicio de la memoria asignada y el
tamaño del programa. Durante la ejecución, por cada referencia a memoria:

1. Se suma el registro base a la dirección.
2. Se comprueba que no supere el límite, de lo contrario genera un fallo
   y aborta el proceso.

Como consecuencia, los accesos a memoria son más lentos, dado que se requieren
operaciones extra. Hoy en día esta técnica solo se utiliza en algunos sistemas
empotrados, dado que existen mejores soluciones.

Nótese que esto solo funciona si el proceso cabe entero en memoria. Esto en la
práctica no ocurre, dado que la memoria física es limitada y hay muchos procesos
a tener en cuenta.

Existen dos posibles soluciones:

- [Intercambio]
- [Memoria Virtual]

## Intercambio

En caso de que los procesos necesiten más memoria de la que hay disponible, se
realiza un **intercambio con el disco**. La estrategia más simple se comentó en
la sección [sin abstracción de memoria]: se almacena el proceso completo en
memoria, se ejecuta durante un tiempo y luego se lleva al disco.

Los procesos inactivos se almacenan en el disco, de forma que no ocupen memoria
cuando no se estén ejecutando. Y tras varios intercambios, un proceso puede
cargarse en zonas diferentes (reubicación dinámica).

<!-- TODO: figura esquemas de memoria con intercambio 6-11-2023, diapositiva 13,
figura 3-4 página 183 -->

El mayor problema de este sistema es la **fragmentación**.

{{< block "Fragmentación" "var(--magno-blue)" >}}
Se generan pequeños huecos en memoria **inutilizables**, dado que no cabe ningún
proceso ahí. Es memoria que queda sin utilizar, y por tanto, una mala gestión de
memoria.

Para solucionarlo, se recurre a la **compactación**: se desplazan los demás
procesos lo más abajo posible y combinar todo el espacio libre. Esto es un
proceso _muy_ lento.

Dos tipos:

- **Fragmentación externa**: huecos entre los distintos bloques de memoria. Es
  la más problemática, porque es memoria libre que no se puede asignar.
- **Fragmentación interna**: huecos libres dentro del bloque de memoria. Se
  puede solucionar haciendo una compactación a nivel del bloque (lo que es más
  rápido porque es menos memoria) y reduciendo el tamaño del bloque utilizado.
  Además, dado que se encuentra dentro del propio programa, no es responsabilidad
  del Sistema Operativo solucionarlo.
{{< /block >}}

Otras cuestiones a resolver:

- ¿Cuánto debo reservar para cada proceso? No se conoce el tamaño del heap.
- ¿Cómo sabe el SO qué memoria está asignada y a quién?
- ¿Cómo permitimos que un proceso crezca en memoria?

### Crecimiento

<!-- TODO: diagrama crecimiento 6-11-2023 -->

Para manejar el crecimiento de memoria de los procesos, se puede seguir el
siguiente procedimiento:

- Ocupar memoria adyacente
- Si no hay memoria adyacente disponible, será necesario mover el proceso a otro
  lugar de memoria
- Alternativamente, se puede intercambiar procesos para hacer hueco
- Se suspende si no se puede crecer

Además, si se sabe que el proceso crecerá continuamente, **es conveniente asignar
memoria adicional** cada vez que se carga o mueve el proceso de memoria, pero
cuando se realice un intercambio con el disco, solo se debe guardar aquello que
esté en uso. De lo contrario se desperdicia espacio de disco.

## Administración de memoria libre

Dos estrategias para llevar un registro de la memoria asignada:

- Mapas de bits
- Listas enlazadas

### Mapas de bits
<!-- TODO: figura mapa de bits 6-11-2023, figura 3-6 página 185, diapositiva 15 -->

- El tamaño del mapa depende del tamaño de la memoria y la unidad de asignación.
- La búsqueda de espacio libre es una operación lenta.
- Solo se sabe que esa zona de memoria está ocupada, pero no se sabe a quién
  pertenece.

### Listas enlazadas

<!-- TODO: figura -->

- Ordenadas por dirección, por lo que la actualización es sencilla.
- Los vecinos de un proceso cuando este termine:
  - El proceso terminado se cambia por un hueco
  - Si hay huecos consecutivos, se fusionan

<!-- TODO: figura de reglas de fusión 9-11-2023, figura 3-7 página 186 -->

### Algoritmos de asignación de memoria

- **Primer ajuste**: el primer hueco válido {{< arrow >}} Es rápido.
- **Siguiente ajuste**: la exploración empieza desde el último hueco encontrado.
  Es ligeramente peor que el anterior según simulaciones.
- **Mejor ajuste**: explora toda la lista y busca el espacio más pequeño válido.
  - Es más lento.
  - Genera espacios pequeños e inutilizables
- **Peor ajuste**: busca el hueco más grande {{< arrow >}} Poco eficiente
  (simulaciones).

Estos algoritmos son más rápidos si se usan 2 listas, a coste de que la
liberación de memoria requiere más operaciones:

- Lista de procesos.
- Lista de huecos: ordenada por tamaño {{< arrow >}} Mejor ajuste más rápido.

A la hora de asignar memoria, se busca solo en la lista de huecos.

Aprovechando estas listas, se podría diseñar otro algoritmo de **ajuste
rápido**: mantener listas separadas para tamaños más solicitados. De esta forma,
la búsqueda es muy rápida, pero actualización muy lenta.

# Memoria virtual

Mientras que los registros base y límite se pueden utilizar para crear la
abstracción de los espacios de direcciones, cada vez hay la necesidad de
ejecutar programas muy grandes como para caber en memoria y sin duda la
necesidad de ejecutar varios programas simultáneamente. El intercambio no es
demasiado atractivo por su gran lentitud.

Posteriormente, se ideó el método de la **memoria virtual**. Esta consiste en
que cada espacio de direcciones de cada proceso se divida en trozos contiguos
llamados **páginas**. Estas páginas se asocian a la memoria física, pero no
todas tienen que estar en memoria física para poder ejecutar un programa.
Cuando se accede a un dato de una página en memoria física, el hardware realiza
la asociación necesaria al instante; pero de lo contrario, se notifica al
Sistema Operativo para que cargue la página deseada a memoria.

En cierto sentido este método es una generalización de los registros base
y límite, y funciona muy bien para un sistema multiprogramado.

## Página

{{< block "Página" "var(--magno-blue)" >}}
Una **página** es un bloque de memoria contigua en la que se divide el espacio
de direcciones de un proceso. Estas páginas pueden contener tanto datos del
programa como instrucciones, incluso ambos simultáneamente (aunque se intenta
evitar).

Se trata de la **unidad mínima que viaja entre la memoria principal y la memoria
secundaria** (disco, zona de _swapping_). Aunque solo se necesite 1 byte, se
trae la página completa (Principio de Localidad Espacial: será muy probable que
en el futuro necesite otro dato próximo a este, y en ese caso, ya estará en
memoria principal).

Si se modifica algún dato de una página, **solo se actualiza en memoria
principal porque es muy lento escribir en el disco** directamente (no es
_write-through_). <!-- TODO: link a arquitectura de computadores -->
Esto se debe tener en cuenta antes de reemplazar una página por si ha sido
modificada.

### Tamaño de la página

El tamaño de la página es otra constante del sistema que decide el SO (al igual
que el [quantum]), y debe ser una potencia entera de 2, $2^p$. Normalmente se
tiene en cuenta el tamaño del sector del disco, de forma que sea un múltiplo de
este. De esta forma, resulta más natural el paso de datos entre memoria
principal y disco.

Sin embargo, no hay un tamaño de página óptimo:

- **Muy pequeño**: menos fragmentación interna
- **Muy grande**: tabla de páginas más pequeña, pero tiempo de transferencia es
  elevado.

### Estimación

Se puede intentar calcular matemáticamente:

- $p$ es el tamaño de la página óptimo en bytes,
- $s$ es el tamaño promedio de un proceso en bytes y
- $e$ es el tamaño de la entrada de la tabla de páginas.

Entonces:

- $\displaystyle \frac{s}{p}$ es el número de páginas por proceso
- $\displaystyle e\frac{s}{p}$ es el tamaño de la tabla de páginas

Luego, considerando como sobrecarga la tabla de páginas y la memoria
desperdiciada por fragmentación interna en la última página (que de media es
$p/2$):

$$ f(p) = e \frac{s}{p} + \frac{p}{2} $$

Es la función que debemos minimizar. La primera derivada es:

$$ f'(p) = - e \frac{s}{p^2} + \frac{1}{2} $$

Por lo que si se iguala a 0 y se despeja $p$, se obtiene:

$$ p = \sqrt{2se} $$

[quantum]: {{< relref "procesos#block-quantum" >}}
{{< /block >}}

{{< block "Marco de página" "var(--magno-blue)" >}}
Un **marco de página** (_frame_) es una página de la memoria física.
{{< /block >}}

{{< block "Páginas residentes" "var(--magno-blue)" >}}
Son aquellas páginas **almacenadas en memoria principal**. De estas páginas existen
dos copias: una en memoria principal y otra en disco (posiblemente
desactualizada).
{{< /block >}}

<!-- TODO: figura 3-9 página 190 -->

Ya hemos comentado que un proceso tiene un espacio de direcciones, pero se trata
de un **espacio de direcciones virtuales**. Estas **direcciones virtuales** son
propias del espacio de cada proceso, que se pueden corresponder o no con unas
**direcciones físicas**.

El programa genera direcciones virtuales, pero estas necesitan ser
**traducidas** a direcciones físicas para ser utilizadas. Esta operación es
crítica, se necesita traducir constantemente: en cada ciclo de reloj se debe
obtener una instrucción de memoria y quizás luego escribir o leer un dato. Por
eso se realiza mediante hardware: de esto ser encarga la **MMU** (_Memory
Management Unit_).

En cuanto a las cachés, hay varios tipos dependiendo de qué direcciones
utilizan:

- **Uso de direcciones virtuales**: de esta forma, se evita realizar la
  traducción para acceder a un dato en la caché. Sin embargo, el hardware se
  complica enormemente, dado que hay que identificar el proceso de cada línea
  (almacenar el PID), etc.
- **Uso de direcciones físicas**: se debe realizar la traducción
  obligatoriamente.

## Tabla de páginas

{{< block "Tabla de Páginas" "var(--magno-blue)" >}}
Se trata de una estructura que se almacena en el kernel y se **corresponde con
un único proceso**. Su objetivo es proporcionar el marco de página (página
residente en memoria física) correspondiente a cada página virtual.
{{< /block >}}

{{< block "Registro base de la Tabla de Páginas" "var(--magno-blue)" >}}
El RBTP es un registro hardware que **almacena la dirección física de la primera
entrada de la tabla de páginas** del proceso que se ejecuta actualmente.

Por tanto, para obtener la entrada de la tabla de páginas correspondiente, se le
suma al contenido de este registro el número de página virtual. Es como si fuese
un array de structs en C.

Nótese que hay que cambiar su valor con cada cambio de contexto.
{{< /block >}}

Se requiren de 4 accesos a memoria para ejecutar una instrucción de carga:

1. Tengo que obtener la instrucción que me indica el contador de programa. Sin
   embargo, el contador de programa guarda una dirección virtual, por lo que
   primero **accedo a la tabla de páginas para traducir la dirección de la
   intrucción**.
2. Ahora que ya tengo la dirección física, **cargo la instrucción**.
3. Se decodifica la instrucción y resulta que tengo que cargar un dato de
   memoria. El programa solo conoce la dirección virtual, por lo que **se tiene
   que traducir dicha dirección nuevamente**.
4. Ahora que ya tengo la dirección, puedo **finalmente obtener el dato
   necesario**.

Lo que, lógicamente, es muy lento y en cada acceso de puede dar un [fallo de
página].

Una alternativa podría ser utilizar un conjunto de registros hardware que
almacenen la tabla de páginas, pero el Sistema Operativo debería actualizarlos
completamente de memoria principal en cada cambio de contexto. La ventaja es que
no se necesitan más referencias a memoria, pero a coste de que el cambio de
contexto es muy lento y de que resulta muy problemático cuando la tabla de
páginas es muy extensa.

### Entrada de la tabla de páginas

Nótese que la distribución exacta puede variar de un sistema a otro, pero más
o menos, se requiren los mismos campos. 32 bits suele ser un tamaño común.

<!-- TODO: figura entrada de la tabla de páginas, diapositiva 25, figura 3-11
página 193 -->

{{< keyvalue >}}
-% **Número de marco de página** :% Indica el número de página física.

-% **Bit de ausente/presente** :%
- 0 si la página es no residente (no está en memoria principal)
- 1 si la página es residente

-% 3 bits de **protección** (`rwx`) :%
- Las páginas con instrucciones usan `r-x`
- Las páginas con datos usan `rw-`.

Por eso se intenta no mezclar en una misma página datos e instrucciones.

-% Bit de **modificada** (_dirty bit_) :%
- 0 si la página no ha sido modificada. A la hora de quitarla de memoria, se
  puede hacer directamente.
- 1 si se ha modificado algo en la página, y al quitarla de memoria principal se
  debe actualizar en el disco

De esta forma, se evitan escrituras en disco innecesarias. La actualización de
este bit la realiza el hardware.

-% Bit de **referenciada** :%
- 0 si la página no ha sido referenciada (no se leyó ni actualizó ningún dato)
- 1 si la página fue referenciada

Es muy útil para el algoritmo de reemplazo de páginas: de esta forma sabe qué
páginas están en uso y cuales no. Si por algún motivo se quita una página que
estaba en uso, será muy costoso solucionar el fallo de página producido.
Habitualmente se necesitan más bits.

-% Bit de **deshabilitación de uso de caché para la página** :%
Prohíbe que esta página se guarde en memoria caché.

Se utiliza para solucionar problemas: una controladora de E/S accede a un dato
desactualizado de memoria principal, donde la CPU ha escrito el dato correcto en
la caché.
{{< /keyvalue >}}

Nótese que no hay información sobre direcciones de disco.

## Traducción de direcciones

La CPU emite una dirección virtual y la recibe la MMU. Esta unidad hardware es
la encargada de realizar la traducción.

<!-- TODO: figura 3-8 CPU+MMU -- bus -> memoria -->

El proceso de traducción es el siguiente:

{{<
  figure
  src="traduccion-direcciones.svg"
  caption="Proceso de traducción de una dirección virtual a física."
>}}

En la figura, $2^p$ es el tamaño de la página, $w_v$ es el tamaño de una
dirección virtual y $w_r$ es el tamaño de una dirección real. En este caso,
suponiendo que la unidad direccionable es el byte, una dirección virtual son 16
bits, una física son 15, y el tamaño de la página es
$2^{12} = 4096 \text{ bytes} = 4 \text{ KiB}$.

1. Los $w_v - p$ bits de mayor peso indican el número de página y los $p$ bits
   restantes la posición dentro de esta.

2. Se usa **el número de página virtual como índice** en la tabla de páginas
   (usando el registro base de la tabla de páginas) y se obtiene la entrada
   correspondiente.

3. Si el bit ausente/presente está a 0, se produce un **fallo de página**. Si
   está a 1, continua el procedimiento.

4. Finalmente, se desplaza $p$ veces a la izquierda el número de página físico
   y se realiza un _or_ lógico con los $p$ bits de desplazamiento. De esta
   forma, forma la dirección física deseada.

5. Se coloca la dirección calculada en el bus para acceder a esta.

Por eso se ha escogido una potencia entera de 2 para el tamaño de página: solo
hay que tomar los bits indidivualmente, no es necesario dividir.

## Fallo de página

{{< block "Fallo de página" "var(--magno-blue)" >}}
Cuando un proceso intenta acceder a una dirección de memoria de una página no
residente se produce un **fallo de página**. Es decir, que se necesita un dato
que no está en memoria actualmente. Estos fallos son **imprevisibles**.

El Sistema Operativo debe decidir dónde colocar la página requerida, y si la
memoria está llena, debe reemplazar otra página existente. Eso lo deciden los
**algoritmos de reemplazo de páginas**.

Dado que leer del disco es algo lento, el proceso se bloquea hasta que se
termine de cargar sus datos.
{{< /block >}}

<!-- TODO: figura 3-8 página 189 -->

Si el dato que se busca está en caché o memoria principal:

1. La CPU emite una dirección virtual.
2. Se realiza la traducción a dirección física como se ha descrito antes.
3. Se coloca dicha dirección en el bus y se obtiene el dato.

Pero si se busca un dato de una página que no está en memoria:

1. La CPU emite una dirección virtual.
2. No se puede realizar la traducción porque el bit ausente/presente está a 0.
   Se produce un **fallo de página**, lo que da lugar a un trap.
3. El Sistema Operativo carga la página requerida a memoria principal,
   posiblemente teniendo que reemplazar una página previa (**algoritmo de
   reemplazo**).
4. También debe realizar el cambio en la MMU: primero marca la página que se
   quita como no residente, poniendo el bit de ausente/presente a 0, y la
   página entrante como residente (el bit a 1) además de añadir la dirección
   física base de la nueva página.
4. Dado que cargar una página lleva tiempo, el proceso se bloquea.
5. Una vez que se ha terminado de cargar la página, el proceso se desbloquea
   y ya puede acceder al dato.

Para el proceso, el procedimiento ha sido transparente: ha obtenido del dato
deseado en ambos casos (quizás en el segundo ha tardado un poco más).

## Mejorando la paginación

Hay que solucionar de forma eficiente las siguientes cuestiones:

- **Traducción rápida** de dirección virtual a física. Ahora mismo, se necesitan
  demasiados accesos a memoria.
- Si el espacio de direcciones es grande, **la Tabla de Páginas es grande**.
  Recuerde que cada proceso tiene la suya, y puede llegar a haber muchos
  procesos.

### Buffer de traducción adelantada (TLB)

Hemos visto que se necesitan muchos accesos a memoria debido a la traducción de
direcciones. Al observar las direcciones que producen los programas, se puede
ver que **tienden a hacer un gran número de referencias a un pequeño número de
páginas**, precisamente como nos indica el [Principio de Localidad]. Por tanto,
solo se lee una pequeña parte de la tabla de páginas frecuentemente y el resto
muy pocas veces.

La solución ideada es instalar un dispositivo hardware llamado **TLB**
(_Translation Look-aside Buffer_), una memoria totalmente asociativa con un
pequeño número de entradas, raras veces más de 64.

Generalmente se encuentra dentro de la MMU, por eso a veces también se le llama
**caché de direcciones**.

| Válida | Página virtual | Modificada | Protección | Marco de Página |
|:-:|:---:|:-:|:-----:|:--:|
| 1 | 140 | 1 | `rw-` | 31 |
| 1 | 20  | 0 | `r-x` | 38 |
| 1 | 130 | 1 | `rw-` | 29 |
| 1 | 129 | 1 | `rw-` | 62 |
| 1 | 19  | 0 | `r-x` | 50 |
| 1 | 21  | 0 | `r-x` | 45 |
| 1 | 860 | 1 | `rw-` | 15 |
| 1 | 861 | 1 | `rw-` | 75 |

Cada entrada de la TLB almacena información de una página, como si fuese una
entrada de la tabla de páginas, pero también es necesario añadir el número de
página virtual a la que corresponde.

Cuando la MMU recibe una dirección virtual para traducir, el hardware comprueba
que la página virtual está en la TLB, comparando todas las entradas de forma
simultánea.

- Si la página se encuentra en la TLB, se comprueban los bits de protección. Si
  se violan, se genera un fallo de protección; de lo contrario, se realiza la
  traducción como siempre.
- Si no se encuentra, es que se ha producido un **fallo de TLB**. Se tiene que
  ir a la tabla de páginas de memoria principal (es posible que se genere un
  **fallo de página**) y obtener la entrada requerida. Como una caché más, se trae
  de memoria y le busca un sitio en la TLB.

  Cuando se quita una entrada de la TLB,
  el bit de modificado y de referencia se copia de vuelta a la tabla de páginas de
  memoria, dado que los otros valores no se han modificado.

Ahora, para gestionar un fallo de TLB, existen varias formas de llevarlo a cabo:

- Resolución por el Sistema Operativo: la TLB se gestiona por software
- Resolución por hardware: es la MMU quien va a la tabla de páginas

Si la TLB es bastante grande, sorprendentemente, la resolución por software
produce una eficiencia aceptable. El beneficio principal es que la MMU es mucho
más simple y liberando espacio en el chip para otras cosas, pero el Sistema
Operativo podría ejecutar algoritmos interesantes para intentar reducir los
fallos de TLB.

Cuando se gestiona la TLB por software, se distinguen dos tipos de fallos:

- **Fallo suave**: fallo de TLB, pero la página es residente. Solo hay que
  actualizar la TLB.
- **Fallo duro**: fallo de TLB y fallo de página. Se require un acceso al disco.

### Tabla de páginas multinivel

Para solucionar el problema de que la tabla de páginas es demasiado grande, se
ideó la **tabla de paginas multinivel**. La idea es intentar evitar tenerlas en
memoria todo el tiempo, sobre todo, **aquellas que no se necesitan o no se
usan**.

Para ello, se toma toda la tabla de páginas y se fracciona en diferentes trozos,
del tamaño de una página (**tablas de segundo nivel**). Para saber dónde está
cada trozo, se crea una nueva tabla que nos lo indique (**tabla de primer
nivel**). Esta siempre debe estar en memoria principal, mientras que los otros
trozos se pueden almacenar en disco (o directamente no existir si el proceso no
las necesita).

Hemos _paginado la tabla de páginas_: esencialmente la tabla pasa a ser un árbol B. <!-- TODO: link a algoritmos y estructuras de datos -->

<!-- TODO: figura de la tabla de páginas multinivel, figura 3-13 página 199,
diapositiva 29 -->

Suponiendo una dirección virtual de 32 bits (un espacio virtual de 4 GiB,
$2^{32}$) y un tamaño de página de 4 KiB ($2^{12}$), por tanto $2^{20}$ páginas
o entradas en la tabla de páginas, se divide en varias partes:

- Número de página del primer nivel: los 10 bits de mayor peso
- Número de página del segundo nivel: los 10 bits a continuación
- Desplazamiento: los 12 bits de menor peso restantes

{{< block "Nota" >}}
El número de página del primer y segundo nivel no tienen porqué tener el mismo
tamaño. Depende del tamaño de cada entrada de la tabla de páginas.
{{< /block >}}

Entonces, la tabla del primer nivel tiene $2^{10}$ entradas, y cada una de ellas
representa 4 MiB del espacio de direcciones ($2^{32} / 2^{10}$), dado que hacen
referencia a otras $2^{10}$ páginas.

Lo que debe hacer ahora la MMU es tomar los 10 primeros bits de la dirección
virtual como índice de la tabla de páginas del primer nivel, lo que proporciona
la dirección (o número de marco de página) de una tabla de páginas del segundo
nivel. Esta operación es análoga a la traducción clásica, solo que **el
desplazamiento es ahora el número de página del segundo nivel**.

Una vez dentro de esta, se usan los siguientes 10 bits para acceder a la entrada
correspondiente del segundo nivel y finalmente realizar la traducción.

Como consecuencia, ahora tenemos:

- **Fallos de página del primer nivel**: cuando no la página del segundo nivel
  no está en memoria.
- **Fallos de página del segundo nivel**: cuando la página deseada no está en
  memoria.

El posible que se tenga que acceder dos veces al disco.

{{< block "Ejemplo" >}}
Con los datos de antes (sistema de 32 bits, páginas de $2^{12}$ bytes, primer
nivel de $2^{10}$ entradas), supongamos un programa que necesita 12 MiB:

- Los primeros 4 MiB del espacio de direcciones para instrucciones (bytes
  0-4095)
- Los siguientes 4 MiB para datos (bytes 4096-8192)
- Los últimos 4 MiB para la pila (bytes $1023 \times 2^{22}$ a $2^{32} - 1$)

Por tanto, la entrada 0 de la tabla de páginas del primer nivel da lugar a todas las
tablas de páginas usadas para instrucciones, la entrada 1 es la utilizada para
los datos y la 1023 para la pila.

Todo el espacio entre los datos y la pila está completamente vacío y no se
utiliza. Las entradas 2 a la 1022 tienen el bit ausente/presente a 0, por lo que
si se da el caso que el programa solicita alguna de estas direcciones, se
producirá un fallo de página, y el Sistema Operativo detectará que intentó
referenciar memoria no debe, por lo que terminará el programa.
{{< /block >}}

Nótese que el título dice _multi_-nivel: es posible hacer un tercer o cuarto
nivel. Sin embargo, solo añade complejidad innecesaria por encima de los
3 niveles.

### Tabla de páginas invertida

Para computadoras de 32 bits, la multipaginación funciona bien, pero para 64
bits, la situación cambia: se pueden direccionar $2^{64}$ bytes, y con páginas
de 4 KiB ($2^{12}$), se necesitaría una tabla de páginas de $2^{64} / 2^{12}
= 2^{52}$ entradas. Si cada una es de 8 bytes, la tabla de páginas ocuparía $8
\times 2^{52} = 2^5 \times 2^{50} = 32 \text{ PiB}$.

La **tabla de páginas invertida** (TPI) es una alternativa a las tablas de
páginas multinivel. En este diseño **hay una entrada por cada marco de página de
memoria real**, no una por cada página de cada proceso. Se lleva el **registro
de quién está utilizando el marco de página y qué página virtual se encuentra en
ella**.

Para un sistema de 64 bits, páginas de 4 KiB y 1 GiB de memoria RAM: la tabla de
páginas invertida solo tiene $2^{30} / 2^{12} = 2^{18} = 262\\,144$ entradas.

De esta forma se ahorra una gran cantidad de espacio, pero la traducción se
vuelve mucho más compleja: ya no se puede usar el número de página como índice,
**se tiene que hacer una búsqueda lineal** por cada una de esas 262 mil entradas
con **cada referencia a memoria** (incluso si se da un fallo de página: esto
sucede cuando no se encontró una entrada), lo que no es particularmente
eficiente.

Se podría utilizar la TLB: si esta contiene todas las páginas de uso frecuente,
la traducción puede realizarse casi instantáneamente. Pero en caso de fallo de
TLB, se debe buscar _por software_ en la tabla de páginas invertida.

La solución reside en convertir la tabla de páginas invertida en una **tabla <!-- TODO: link a algoritmos y estructuras de datos -->
hash, usando el número de página virtual como clave**, preferiblemente una
implementación encadenada. Si tiene tantas entradas como marcos de página, en
promedio, solo habrá 1 nodo por entrada, por lo que se acelera considerablemente
la búsqueda. Aun así, hay que tener en cuenta que las colisiones de la tabla
hash requieren más accesos a memoria.

# Algoritmos de reemplazo de páginas

Los algoritmos de reemplazo de páginas se ejecutan cuando se produce un [fallo
de página] y la memoria principal está llena. Es un problema similar al de la
memoria caché o servidores web caché. <!-- TODO: link a redes distribución de contenidos -->

- El Sistema Operativo debe escoger una página residente para desalojarla
- Actualizar su copia en disco si fue modificada
- Evidentemente, no interesa eliminar una página de uso frecuente

Al igual que con los [algoritmos de planificación de procesos], en esta sección
solo se discutirán las ideas generales de los mismos. Cada implementación tiene
muchos detalles y se pueden combinar varias ideas.

Antes de nada, el Sistema Operativo debe decidir si desalojar una página del
mismo proceso (**local**) o de otro cualquiera (**global**).

{{< keyvalue title="Resumen" fill=true >}}
-% Óptimo :%
Página que se vaya a referenciar más tarde.  
No es implementable, pero se usa a modo de comparación.

-% No usadas recientemente (NRU) :%
Bits reuso y modificado.  
fácil de implementar, aproximación burda a lru.

-% FIFO :%
Cola ordenada con las páginas por orden de llegada. Seleccionar la primera.  
Podría descartar páginas importantes.

-% Segunda oportunidad :%
FIFO con `R=0`.

-% Reloj :%
_Round-Robin_ con un puntero. Realista.

- Si `R=0` se quita
- Si `R=1` se pone a 0.

-% Menos usada recientemente (LRU) :%
Excelente, pero difícil de implementar sin el hardware necesario.

-% No usada frecuentemente (NFU) :%
Mantener un contador de cuántas veces se referencia una página.  
Mala aproximación de LRU.

-% Envejecimiento :%
Uso de una matriz que almacena el historial del bit de reuso de cada página
residente. Es eficiente y se aproxima bien a LRU.

-% Conjunto de trabajo (WS, _Working Set_) :%
Selección de aquellas páginas que no pertenezcan al conjunto de trabajo.  
Muy costoso de implementar.

-% WSClock :%
Mezcla del conjunto de trabajo y del algoritmo del Reloj.  
Algoritmo eficientemente bueno.
{{< /keyvalue >}}

{{< block "Óptimo" >}}
Se reemplaza **la página que se vaya a referenciar más tarde o nunca**.

### No se puede implementar
- No se sabe cuando será la próxima referencia
- Se utiliza para para comparar otros algoritmos
- Quizás en algunos sistemas sí sea posible implementarlo, dado que se sabe lo
  que va a suceder (solo 1 proceso).
{{< /block >}}

{{< block "No usadas recientemente (NRU)" >}}
Se trata de una burda aproximación del algoritmo LRU.

Cada página tiene 2 bits de reuso y modificación en su entrada de la tabla de
páginas. Estos los actualiza el hardware, y si no es posible hacerlo así, se
provoca un fallo de página con cada referencia para que entre el Sistema
Operativo y lo él haga mismo.

- `M=1` cuando se modifica
- `R=1` cuando se referencia, ya sea lectura o escritura (la primera vez no
  cuenta, dado que es cuando se carga la página. Por eso se le llama reuso)

Esto da lugar a 4 tipos de páginas:

0. `R=0 M=0`
1. `R=0 M=1`: solo se puede dar si se modificó y luego se reseteó el bit de reuso.
2. `R=1 M=0`
3. `R=1 M=1`

**Se reemplaza la página con menor numeración distinta de 0** (no se va
a reemplazar una página que se acaba de cargar y todavía no se usó).

A cada quantum o interrupción de reloj, **el SO vuelve a poner a 0 los bits de
reuso de todas las páginas**. De esta forma, si a la siguiente vez se tiene que
volver a poner a 0, quiere decir que se referenció al menos una vez durante el
quantum, y por tanto, es una página que se usa frecuentemente.

Su implementación es **muy sencilla**, pero solo hay 4 estados posibles para
todas las páginas, por lo que se dan **muchos empates**. Aun así, proporciona un
rendimiento que puede ser adecuado.
{{< /block >}}

{{< block "FIFO" >}}
- Quitar la página que más tiempo lleva en memoria
- El Sistema Operativo debe mantener una cola con las páginas ordenadas por
  orden de llegada
- Es un algoritmo bastante malo, aunque se puede usar a modo de desempate en
  otras implementaciones.
{{< /block >}}

{{< block "Segunda Oportunidad" >}}
Se trata de una **variante de FIFO**.

- **Análisis del bit de reuso**: aquellas páginas con el bit `R=1`, se pone
  a 0 y se mandan al final de la cola.
- Se quita la primera página de la cola con `R=0`, lo que significa que no se
  utilizó recientemente.

En casos donde una página se utiliza mucho, se mantendrá al final de la lista
y casi nunca se cambiará. Sin embargo, es necesariamente ineficiente: demasiados
movimientos de páginas en la cola.
{{< /block >}}

{{< block "Reloj" >}}
<!-- TODO: figura del reloj 3-16 página 206, diapositiva 38 -->

Se usa una **lista enlazada circular** (_Round-Robin_) con todas las páginas
residentes. Cuando ocurre un fallo de página, un puntero (actuando como
**manecilla de un reloj**) recorre todas las páginas inspeccionando el bit de
reuso.

- Si `R=1`, lo pone a 0 y continua con la siguiente.
- Si encuentra una con `R=0`, selecciona esa para sustituir y se inserta la
  nueva página en su lugar. La manecilla del reloj queda apuntando a esa posición
  para la próxima vez.
- Si no se encuentra `R=0` y se examinaron todas las páginas, se toma
  directamente la primera.
{{< /block >}}

{{< block "Menos usada recientemente (LRU)" >}}
Basado en el principio de localidad temporal, y proporciona una buena
aproximación al algoritmo óptimo.

- Las páginas usadas en las últimas instrucciones se volverán a usar.
- Páginas no usadas en mucho tiempo, no se volverán a usar.

La idea principal es descartar la página **que más tiempo lleva sin usarse**
(fecha más pequeña). **Implentación difícil**:

- **Lista enlazada**: las primeras páginas son las usadas más recientemente
  y las últimas de uso menos reciente. El problema reside en que esta lista se
  tiene que actualizar con cada referencia a memoria.
- **Contador**: disponer de un contador hardware para almacenar la última vez
  que se referenció una página. Problema: el valor del reloj es muy grande para
  almacenar en la tabla de páginas.

### Implementación mediante hardware

Se utiliza una matrix $n \times n$ donde $n$ es el número máximo de marcos de
página.

1. Inicialmente, la matriz es toda 0.
2. Con cada referencia a la página $k$, el hardware pone a 1 todos los bits de
   la fila $k$.
3. Luego, pone a 0 todos los bits de la columna $k$.

La fila cuyo valor valor binario sea menor, es la de uso menos reciente.

<!-- TODO: ejemplo del algoritmo 27-11-2023, figura 3-17 página 207, diapositiva
40 -->
{{< /block >}}

{{< block "No usada frecuentemente (NFU)" >}}
- Se dispone de un contador software asociado con cada página residente.
- El contador se actualiza a cada quantum: **solo se incrementa si `R=1`**.

De esta forma, el contador será mayor si la página se utilizó
mucho {{< arrow >}} se selecciona **la página cuyo contador es mínimo**.

El problema es que NFU nunca olvida nada: las páginas que se usaron
frecuentemente en el pasado siguen teniendo un contador alto, pero la página ha
dejado de usarse.
{{< /block >}}

{{< block "Envejecimiento" >}}
Simulación de LRU con software.

<!-- TODO: figura de funcionamiento de envejecimiento 27-11-2023 -->

### Componentes del algoritmo:

- **Bit de reuso de las páginas residentes en un registro** de $p$ bits de tamaño.
  Se actualiza con cada interrupción de reloj.
- Se mantiene una matriz de tamaño $p \times n$, donde $n$ es el tamaño del
  historial que se quiera mantener.

Si el matriz es muy grande para almacenar, se puede reducir $n$. Sin embargo, si
$n$ es muy pequeño, se limita su horizonte pasado. Se podrían tener varias
páginas con 0 en su contador, pero una de ellas se podría haber usado hace $n+1$
pulsos. Se debe buscar un valor para $n$ balanceado teniendo en cuenta el valor
de quantum.

### Funcionamiento

**Se inserta al principio de la matriz el registro como columna**. Para ello, se
desplaza un bit a la derecha (eliminando el último) y se copia la columna al
inicio.

La página que se quita es la que representa el menor número
- Reciente {{< arrow >}} posiciones más peso
- Más usada {{< arrow >}} más 1s

Nótese que es solo una aproximación a LRU: solo hay 1 bit de información por
cada quantum, por lo que se pierde la información de quién se referenció antes
o después dentro del quantum.
{{< /block >}}

## Working Set

{{< block "Paginación bajo demanda" "var(--magno-blue)" >}}
Los procesos inician sin ninguna de sus páginas en memoria. Cuando solicitan su
primera instrucción, se produce un fallo de página para que el Sistema Operativo
la obtenga. Lo mismo sucede con el resto de datos que necesite: poco a poco el
proceso va pidiento las páginas que necesita mediante fallos de página
(**sobrepaginación**), hasta que finalmente obtiene la mayoría de páginas que
necesita y deja de producir tantos fallos de página.
{{< /block >}}

{{< block "Sobrepaginación" "var(--magno-blue)" >}}
Cuando un programa produce fallos de página cada pocas instrucciones se dice que
está **sobrepaginando** (_thrashing_). Muchos fallos de página implica una
ejecución lenta. Depende del tamaño de la memoria, del programa y sus
necesidades.
{{< /block >}}

Según [las observaciones realizadas para la TLB], los procesos habitualmente
trabajan con un número limitado de páginas: exhiben una **localidad de
espacial** o de referencia ([Principio de Localidad]). Esto nos permite definir
el concepto de conjunto de trabajo.

La ventaja principal de algoritmos basados en el WS es que proporcionan lo que
necesita a cada proceso, no un trozo estático.

{{< block "Conjunto de Trabajo" "var(--magno-blue)" >}}
El conjunto de trabajo (_Working Set_, WS) es el conjunto de paginas que el
proceso utiliza en un momento dado.

O más formalmente: el conjunto de trabajo $w(k, t)$, en cualquier instante de
tiempo $t$, es el conjunto consistente de todas las páginas utilizadas por las
$k$ referencias más recientes.

Como el principio de localidad se cumple, normalmente el tamaño del conjunto de
trabajo es pequeño. Además, en el peor de los casos, al menos sabemos que es
finito, porque no se puede referenciar a un conjunto infinito de direcciones con
un número finito de bits.
{{< /block >}}

Si todo el conjunto de trabajo está en memoria, el proceso se ejecutará sin
muchos fallos de página. Sin embargo, en sistemas multiprogramados, se producen
cambios de contexto continuamente: **el nuevo proceso producirá sobrepaginación
para recuperar sus páginas**.

El **modelo del conjunto de trabajo** utiliza el concepto del WS para intentar
reducir los fallos de página en estos casos. Se lleva la cuenta de las páginas
que usa cada proceso y se asegura que estén en memoria antes de permitir que se
ejecute. Además, como **cambia lentamente con el tiempo**, es posible realizar
una predicción razonable en cuanto a qué páginas se necesitarán cuando el
programa reinicie. Esto se conoce como la **prepaginación**.

{{< block "Prepaginación" "var(--magno-blue)" >}}
La **prepaginación** es el proceso de cargar las páginas _antes_ de permitir que
el proceso se ejecute y produzca un fallo de página.

Las dificultades presentadas por la prepaginación incluyen conocer en todo
momento el WS e ir actualizándolo, porque aunque cambia lentamente, no es
estático.

Una apuesta que funciona bien es **precargar la página siguiente** además de la
página pedida, por el principio de localidad es probable que se acabe
utilizando.
{{< /block >}}

Todo esto implica la implementación de una manera precisa de determinar qué
páginas están dentro del conjunto de trabajo. Para eso, primero hay que
concretar el valor de $k$, el número de referencias a memoria más recientes, lo
que determina una **ventana de tiempo**.

<!-- TODO: gráfico de las fases del WS, 27-11-2023 -->

En la figura anterior, se puede ver que el proceso tiene diferentes fases: **la
localidad del programa va cambiando**. El tamaño del WS depende de la ventana,
es decir, del valor de $k$: se tiene en cuenta las páginas usadas hace $k$
referencias a memoria, lo que implica que **no puede haber cambios bruscos**
como saltos en la gráfica.

Esos extraños picos que se muestran en la gráfica se deben a que existen
simultáneamente páginas de la localidad 1 y localidad 2 en el WS, porque todavía
no ha pasado el suficiente tiempo para dejar de considerar las de localidad 1.
Lo mismo sucede a la transición a la localidad 3: se añaden las páginas nuevas
que se necesiten al WS, pero las anteriores aún siguen presentes.

Nótese que estos picos no son deseables, sino que es una mala gestión de
memoria. Cuanto mayor sea la ventana, mayor duración tendrá el pico; y si la
ventana es muy pequeña, el gráfico no será tan suave.

### Implementación

Una posible forma para llevar un registro del WS es usar un registro que
lo almacene: en cada referencia, se desplaza y se añade el número de página
correspondiente. Cuando se de un fallo de página, el Sistema Operativo puede
extraer, ordenar y eliminar las páginas duplicadas. Sin embargo, mantener este
registro es bastante costoso.

En vez de esto, en la práctica se redefine el WS: **se deshace de $k$ y se usa
el tiempo de ejecución en su lugar**, lo que resulta más sencillo produciendo un
resultado similar. Pero ojo, se usan los últimos $\tau$ segundos de tiempo de
ejecución, **tiempo virtual** del proceso, no tiempo real.

### El Conjunto de Trabajo para reemplazar páginas

Que el Sistema Operativo lleve cuenta del conjunto de trabajo de un proceso
también es útil para un posible algoritmo de reemplazo de páginas: cuando ocurra
un fallo de página, **se busca una que no esté en el conjunto de trabajo
actual**.

<!-- TODO: figura 3-20, página 212, diapositiva 47 -->

Para este algoritmo, se almacena en la tabla de páginas un contador de Tiempo de
Último Uso (TUU) aproximado de la última vez que se referenció y el bit `R`, que
establecía el hardware y se borra a cada [quantum].

A la hora de reemplazar una página, se procesa toda entrada de la tabla de
páginas que sea residente. Si `R=1`, el tiempo virtual actual del proceso
($t_v$) se escribe en el TUU de la tabla, indicando que la página estaba en uso
cuando se produjo el fallo. Esta pertenece al WS (se supone que $\tau$ abarca
varios quantums).

Si `R=0`, puede ser candidata para eliminación: se calcula su edad ($t_v - TUU$)
y se compara con $\tau$.

- $\text{edad} > \tau$: no pertenece al WS. Candidata para eliminar.
- $\text{edad} \le \tau$: pertenece al WS.

En caso de que se recorra toda la tabla y todas las páginas pertenezcan al WS,
se retira la de mayor edad (menor valor del contador). En el peor caso, todas
tienen `R=1`, entonces se escoge una página al azar.

### WSClock

Este algoritmo también utiliza el concepto del conjunto de trabajo, pero es
mucho más sencillo de implementar y tiene un buen rendimiento. Se utiliza mucho
en la práctica.

El funcionamiento es muy similar al [algoritmo de Reloj]: se utiliza una lista
circular de marcos de página, donde cada celda incluye el TUU y los bits de
reuso y modificación.

En cada fallo de página, se examina primero la página a donde apunta la
manecilla. Si `R=1` no es candidata para la eliminación, por lo que se pone
a 0 y se examina la siguiente.

En caso de `R=0`:

- **$\text{edad} \le \tau$**: pertenece al WS, no es candidata.
- **$\text{edad} > \tau$ y no está modificada**: no pertenece al WS y existe una
  copia válida en el disco. Se selecciona esta página.
- **$\text{edad} > \tau$ y está modificada**: para evitar una conmutación de
  procesos debido a la actualización en el disco, se planifica la escritura y se
  continua buscando por una mejor candidata.

Tenga en cuenta que todas las páginas podrían requerir una actualización. Para
no sobrecargar el disco, se establece un límite: una vez que se alcanza, ya no
se planifican más.

En el caso de que se la manecilla de una vuelta completa:

- **Si se ha planificado al menos una escritura**, la manecilla continua
  buscando. Si se ya completado la escritura de una página, se encontrará en la
  segunda vuelta.
- **Si no se ha planificado nada**, quiere decir que todas las páginas están en
  el conjunto de trabajo. En este caso, lo más sencillo es seleccionar una
  página que no esté modificada; y si no hay, entonces se toma la página actual
  y se actualiza en el disco.

# Cuestiones de diseño

{{< block "Asignación local o global" >}}
- **Local**: la página a reemplazar debe ser del mismo proceso
- **Global**: la página a reemplazar puede ser de cualquier proceso

Con algoritmos locales es posible que produzca mucha sobrepaginación. Cuando el
conjunto de trabajo crece, aunque haya espacio en memoria principal, se
seleccionarán solo páginas del proceso. Si el WS disminuye, se desperdicia
espacio. Sin embargo, hay algunos algoritmos de reemplazo que solo tienen
sentido si son locales, como los basados en el WS (el WS es relativo a un único
proceso).

En general, los algoritmos globales funcionan mejor: se dividen los marcos de
página entre todos los procesos según su conjunto de trabajo.

- Debe ser proporcional al tamaño del proceso
- Debe cambiar de forma dinámica según las necesidades

El **algoritmo PFF** (_Page Fault Frecuency_) indica cuando se debe aumentar
o disminuir los marcos de página de un proceso.
{{< /block >}}

{{< block "Control de la carga" >}}
Aun así, con todos estos mecanismos, es posible que se siga produciendo
sobrepaginación. Puede ser que haya muchos procesos muy grandes y poca memoria,
o que el algoritmo PFF indica que se necesita más memoria cuando en realidad no
es así.

La mejor solución en estos casos es **intercambiar algunos procesos y llevar sus
páginas al disco**. Si se continua sobrepaginando, se repite el proceso hasta
que se estabilice.
{{< /block >}}

{{< block "Espacios de instrucciones y datos separados" >}}
La mayor parte de las computadoras solo tienen un espacio de direcciones para
programas y datos, y cuando no es demasiado grande aparecen problemas.

Una solución es tener espacios de direcciones separados para instrucciones
y datos (**espacio I** y **espacio D**), que se pueden paginar de forma
independiente:

- Tablas de páginas y procesos de traducción diferentes
- Se duplica el espacio de direcciones
{{< /block >}}

{{< block "Páginas compartidas" >}}
Otro punto a tener en cuenta es la compartición. En un sistema de
multiprogramación grande, es posible que se ejecute el mismo programa varias
veces por distintos usuarios. Lo más eficiente sería no duplicar la página, sino
compartirla entre los distintos procesos. Solo es posible compartir páginas de
solo lectura.

Cuando se utiliza un espacio de instrucciones separado del de datos se puede
compartir el espacio de instrucciones. Esto puede ocasionar problemas cuando el
primer proceso llega a un punto donde el planificador decide eliminar el espacio
de direcciones que aún estaba usando el segundo proceso, haciendo así que el
segundo provoque un gran número de fallos de página para volver a cargar esas
páginas.

Compartir datos es más complicado, aunque en Unix se suele hacer después de
crear un proceso hijo. Cada uno de estos procesos tienen su propia tabla de
páginas, pero apuntan a las mismas (**solo lectura**). En el momento de que uno
de los procesos intente modificar una de las páginas, se produce un trap (lo
lanza la TLB porque los permisos no son adecuados) y se hace una copia de la
página para que cada proceso tenga una copia de esta, ahora con permisos de
lectura y escritura.
{{< /block >}}

# Cuestiones de implementación

- Participación del SO en la paginación
- Gestión de los fallos de página
- Respaldo de instrucción
- Bloqueo de páginas en memoria
- Almacén de respaldo
- Separación de política y mecanismo

# Segmentación

Para mejorar aquellos casos donde el programa aumenta o disminuye en memoria, se
ideó la **Segmentación**.

{{< block "Segmentación" "var(--magno-blue)" >}}
Un Sistema Segmentado proporciona muchos espacios de direcciones independientes
por completo, llamados **segmentos**. Estos deben constituir una unidad lógica
dentro del programa.

Los segmentos tienen **tamaño variable**:

- Puede cambiar durante la ejecución del programa (dinámico)
- Crecen o disminuyen sin afectar a otros segmentos
- Toman el espacio que necesiten
{{< /block >}}

Por tanto, en lugar de tener un único espacio virtual para un proceso:

- Se tiene un espacio de direcciones para las instrucciones,
- otro para los datos,
- otro para el _stack_,
- y otro para el _heap_.

O por ejemplo, para un compilador:

- Un segmento para la tabla de símbolos,
- otro para el texto original,
- otro para constantes,
- otro para el AST,
- y otro para la pila de llamadas.

Las **direcciones virtuales pasan a tener dos campos**, lo que hace la
programación en ensamblador y el trabajo de los compiladores más complicado. El
programador debe de ser consciente de lo que hay en cada segmento.

- El número de segmento
- La dirección dentro del segmento<!-- . Esta se comporta al igual que antes, con su
  número de página virtual (quizás subdividido en varios si hay paginación
  multinivel) y su desplazamiento -->

Ventajas:

- Se evitan los problemas de _¿Cuánta memoria le asigno a cada segmento?_ de los
  sistemas paginados.
- Si cada función ocupa un segmento separado y su punto inicial es la dirección
  0, se puede modificar y recompilar libremente el segmento $n$ sin afectar a los
  demás. Con memoria unidimensional, las funciones se colocan todas juntas y sus
  direcciones cambian si se modifica algo, incluso en una función no
  relacionada.
- La compartición de datos entre procesos es muy sencilla, como por ejemplo una
  biblioteca compartida.
- Dado que el programador conoce qué va en cada segmento, se pueden especificar
  los bits de protección necesarios.

|                                                    | Paginación           | Segmentación            |
|:---------------------------------------------------|:--------------------:|:-----------------------:|
| ¿Necesita el programador saber la técnica usada?   | No                   | Sí                      |
| ¿Cuántos espacios direccionables hay?              | 1                    | Muchos (1 por segmento) |
| ¿El tamaño direccionable excede del físico?        | Sí                   | Sí                      |
| ¿Se pueden separar las instrucciones de los datos? | No (pero se intenta) | Sí (gran ventaja)       |
| ¿Puede crecer fácilmente sin reacomodaciones?      | No                   | Sí (gran ventaja)       |
| ¿Facilita la compartición entre procesos?          | No                   | Sí                      |

## Implementación de la Segmentación Pura

La implementación de la segmentación difiere de la paginación en un punto
crítico: las páginas tienen un tamaño fijo y los segmentos no. Esto da lugar
a **grandes problemas de [fragmentación] externa**.

<!-- TODO: figura de fragmentación externa y compactación 4-12-2023 -->

Los algoritmos de reemplazo tienen en cuenta el tamaño del segmento.
- Los segmentos grandes son beneficiosos de quitar
- Los segmentos pequeños no porque no puedo meter muchos datos en su lugar

## Segmentación con paginación

Por los problemas que planteados de fragmentación, hoy en día es raro encontrar
Sistemas Segmentados Puros, pero existen sistemas segmentados con paginación: si
hay segmentos extensos que no caben completos en memoria principal, se dividen
en páginas.

Hay una **Tabla de Segmentos** que funciona igual una Tabla de Páginas de dos
niveles. Además, también se hace uso de la TLB, que almacena direcciones físicas
de páginas, no segmentos.

- En el primer nivel, cada entrada es un **descriptor de segmento**:
  - Dirección a la tabla de páginas correspondiente
  - Tamaño del segmento en páginas
  - Tamaño de la página
  - Bit de paginación: determina si el segmento está o no paginado
  - Bit ausente/presente: si hay alguna página residente del segmento, este bit
    está a 1 y su tabla de páginas está en memoria. Si se intenta direccionar un
    segmento que no esté en memoria, se produce un **fallo de segmento**.
  - Bits de protección y otros
- El segundo nivel es una tabla de páginas corriente.

Dado que la tabla de segmentos es muy grande, **se almacena toda en un único
segmento, que también se pagina**.

<!-- TODO: figura 3-37 página 241 -->

[Intercambio]:                {{< relref "#intercambio" >}}
[Memoria Virtual]:            {{< relref "#memoria-virtual" >}}
[Principio de Localidad]:     {{< relref "#block-principio-de-localidad" >}}
[algoritmo de Reloj]:         {{< relref "#block-reloj" >}}
[apartado de memoria]:        {{< relref "introduccion#jerarquía-de-memoria" >}}
[fallo de página]:            {{< relref "#fallo-de-página" >}}
[multiprogramación]:          {{< relref "procesos#block-multiprogramación" >}}
[quantum]:                    {{< relref "procesos#block-quantum" >}}
[fragmentación]:              {{< relref "#block-fragmentación" >}}
[sin abstracción de memoria]: {{< relref "#varios-procesos" >}}
[algoritmos de planificación de procesos]:  {{< relref "procesos#estrategias-generales-de-planificación" >}}
[las observaciones realizadas para la TLB]: {{< relref "#buffer-de-traducción-adelantada-tlb" >}}
