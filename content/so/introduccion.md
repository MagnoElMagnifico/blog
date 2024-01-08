---
title: Introducción
description: >
    El Sistema Operativo es el software encargado de gestionar los recursos del
    ordenador y de proporcional una interfaz amigable para su uso. Probablemente
    sea el software más importante que se ejecuta, dado que da soporte al resto
    de programas. En este artículo, se comentará brevemente los retos a los que
    se debe enfrentar.
date: 2023-12-26T13:03:52+01:00
weight: 1
---

# El Sistema Operativo

El sistema operativo es el software encargado de **gestionar los recursos
hardware** del computador y de **proporcionar una interfaz amigable para su
uso**.

Escribir código para cada gestionar el disco duro, la memoria, el teclado, el
ratón... es una tarea sumamente complicada, y sería muy difícil para un
programador realizar una aplicación. Gracias al Sistema Operativo, el
programador puede utilizar los recursos que proporciona para construir más
fácilmente sus aplicaciones.

Responsabilidades del Sistema Operativo:

- **Virtualización**: abstracción creada por el Sistema Operativo con el fin de
  simplificar el uso del hardware.
  - Procesos e hilos
  - Memoria: espacios de direcciones
  - Archivos
  - Entrada/Salida
  - Seguridad y Protección
- **Gestión de los recursos**:
  - Sistemas multiprogramados: hoy en día las CPUs incluyen varios núcleos que
    pueden ejecutar varias tareas simultáneamente. No solo se debe gestionar el
    uso de estos cores, sino que también es necesario evitar problemas cuando se
    intenta acceder a memoria u otros dispositivos simultáneamente.
  - Tareas: asignación de los recursos a cada una adecuadamente.
  - Memoria
  - Disco
  - Gráfica
  - Red
  - ...
- Resolver conflictos entre programas y usuarios.
- Y un largo etcétera.

El Sistema Operativo se ejecuta directamente sobre el hardware y proporciona la
base para las demás aplicaciones. **Siempre debe estar disponible en memoria**:
su código y los datos que necesite para funcionar.

{{< block "Nota" >}}
Nótese que realmente los clientes del Sistema Operativo son los programas que se
quieren ejecutar, dado que los usuarios finales utilizan el Shell o la GUI
(_Graphical User Interface_), nunca usan las funcionalidades del sistema
directamente.
{{</ block >}}

# Tipos de Sistemas Operativos

Ordenados por tamaño:

- **Main frame**: computadores masivos (ocupan habitaciones enteras). Ofrecen
  tres tipos de servicios:

  - Procesamiento por lotes: procesa trabajos sin un usuario interactivo
    presente.
  - Procesamiento de transacciones: grandes cantidades de pequeñas
    transacciones, como peticiones a una página web.
  - Tiempo compartido: permite que varios usuarios usen la computadora a la vez,
    como consultar una gran base de datos.

  Se utilizan para simulaciones, aplicaciones científicas, cálculo...
  Principalmente procesamiento de muchos trabajos y E/S, servidores web de alto
  rendimiento. Normalmente se usa **{{< color "Unix" "var(--magno-green)">}}**.

- **Servidores**: servicios a varios usuarios a la vez a través de la red, y les
  permiten compartir los recursos hardware y software disponibles.
  **{{< color "Linux" "var(--magno-green)" >}}**,
  **{{< color "Windows Server 20XX" "var(--magno-blue)" >}}**,
  **{{< color "Solaris" "var(--magno-red)" >}}** o
  **{{< color "FreeBSD" "var(--magno-red)" >}}**.

- **Multiprocesadores**: varios chips de CPU.
  **{{< color "Linux" "var(--magno-green)" >}}** o
  **{{< color "Windows" "var(--magno-blue)" >}}** (entre otros).

- **Computadores personales**: buen soporte a un solo usuario.
  **{{< color "Windows" "var(--magno-blue)" >}}**,
  **{{< color "MacOS" "#fff" >}}**,
  **{{< color "Linux" "var(--magno-green)" >}}**.

- **Sistemas operativos de bolsillo** (PDA, _Personal Digital Assistant_):
  telefonía, fotografía digital, etc.
  **{{< color "Android" "var(--magno-orange)" >}}**,
  **{{< color "IOS" "#fff" >}}**,
  **{{< color "Windows Mobile" "var(--magno-blue)" >}}**.

- **Empotrados**: aplicaciones cerradas, todo el software se encuentra en
  memorias ROM: hornos, microondas, televisiones... QNX, VxWorks...

- **Tiempo real**: respuesta rápida crítica, sistemas de control. Ejemplos
  pueden ser robots, máquinas de una fábrica, etc.

# Modos de ejecución

- Cuando se ejecuta código perteneciente al sistema operativo, se dice que está
  en **modo kernel**. En este modo, se tiene acceso completo a todo el hardware
  y se puede ejecutar cualquier instrucción que la máquina pueda ejecutar.

- El resto del software se ejecuta en **modo usuario**, donde solo se permiten
  determinado subconjunto de las instrucciones: aquellas dedicadas a la E/S
  están prohibidas. Para realizar este tipo de operaciones, el programa debe
  pedírselas al Sistema Operativo.

{{<
  figure
  src="../modos.svg"
  alt="Figura representando las capas de un ordenador"
  caption="Capas software de un ordenador"
>}}

En relación al diagrama:

- El shell (interfaz solo de texto) o GUI (interfaz gráfica) es el nivel más bajo
  del software a nivel de usuario: permite la ejecución de otros programas.

- Los programas de modo usuario se pueden cambiar por otros de forma sencilla,
  pero un componente del sistema operativo no, dado que está protegido contra
  modificaciones por parte del usuario.

- El Sistema Operativo es una abstracción del hardware.

## Traps

Se trata de cualquier salto a una subrutina del Sistema Operativo, es decir, se
pasa de modo usuario a modo kernel. Cuando se ha completado dicha subrutina, se
regresa a donde estaba en modo usuario. Algunos ejemplos de traps son:

- Llamadas al sistema.
- Interrupciones: producidas por el hardware en caso de error (división por
  0 u overflow) o en caso de operaciones de E/S (controladoras).

## Llamadas al sistema (_syscalls_)

Los Sistemas Operativos tenían dos funciones: gestionar los recursos hardware,
que se hace de forma automática; y proveer un uso simplicado del mismo, para lo
que se utilizan las llamadas al sistema.

Existen tres posibles definiciones:

1. Intrucción en código máquina que ejecuta un procedimiento del kernel.
2. Función de alto nivel (función en C) que contiene una llamada al sistema (1).
3. Comando que hace uso de las llamadas al sistema (2).

Estas varían de un sistema a otro: nosotros utilizaremos
[POSIX](https://es.wikipedia.org/wiki/POSIX) (_Portable Operating System
Interface_), el estándar internacional 9945-1 por IEEE, por tanto Unix, Linux,
BSD, etc.; y el resto de sistemas tiene llamadas que realizan las mismas
funciones.

Ejemplo:

```c
size_t read(int fd, void buf[.count], size_t count);
```

<!-- TODO: Diagrama 28-9-2023 -->

# Nociones sobre hardware

Como el sistema operativo trabaja directamente sobre el hardware, es necesario
comprender con detalle como este funciona.

Conceptualmente, una computadora simple se puede representar con la figura
siguiente. Como es de esperar, hoy en día tienen una estructura mucho más
compleja, pero esta representación nos servirá.

<!-- TODO: diagrama bus + CPU (MMU) + Monitor + Teclado + USC + Disco ... -->

## Procesador

Obtiene y ejecuta **instrucciones máquina**. Cada procesador tiene un conjunto
específico de instrucciones (ISA) que puede ejecutar. Lógicamente, si dos
procesadores no comparten estas intrucciones, no se podrá ejecutar el mismo
programa en los dos.

Consta de varias partes:

- **ALU**: _Arithmetic Logic Unit_, calculadora.
- **Unidad de control**.
- **Registros**:
  - De propósito general: el programador los usa según los necesite
  - De propósito específico: puntero de pila (SP), contador de programa (PC),
  ...

Se accede a los registro de forma explícita: es el programador (realmente el
compilador) quien decide qué registros usar, esa información va codificada en la
propia instrucción. El resto de la memoria no se gestiona por el programador:

- Caché: implementado mediante hardware
- Memoria principal y secundaria (RAM y disco): se encarga el Sistema Operativo.

{{< block "Tamaño de palabra" >}}
El **tamaño de la palabra** es el tamaño de los registros. Además, define:

- Define el rango de memoria direccionable
- Define el número de operandos de las instrucciones: hay bits limitados
{{< /block >}}

Con el fin de mejorar el rendimiento de los procesadores, se implementan varias
técnicas:

{{< dropdown "Entubado de Instrucciones (_Instruction Pipelining_)" >}}
El procesador está segmentado en diferentes etapas:

1. Obtener la instrucción de memoria
2. Decodificar la instrucción
3. Acceder a los registros especificados
4. Realizar una operación en la ALU o acceder a memoria
5. Guardar el resultado

Si en lugar de procesar una instrucción de cada vez, una vez que la primera
etapa ya ha terminado de obtener la instrucción, no tiene porqué esperar a que
se terminen el resto de etapas: ya puede leer la instrucción siguiente.
Es decir, mientras se obtiene la instrucción n, se puede estar decodificando la
instrucción n+1, accediendo a los registros de la instrucción n+2...
Entre cada sección se incluye in Latch para almacenar temporalmente resultados
intermedios.

Esta técnica se utiliza en casi todas las CPUs de propósito general modernas.

# Problemas

A veces es necesario el resultado de la operación anterior para ejecutar la
siguiente, entonces es necesario llevar cuenta en qué casos ocurre esto
y retrasar un segmento. Esto implica más circuitos.
{{< /dropdown >}}

{{< dropdown "Procesadores superescalares" >}}
Se trata de una mejora del entubado de instrucciones. En este diseño hay varias
unidades de ejecución: varias ALUs y varias unidades de control.

Por tanto, varias instrucciones se obtiene a la vez, se decodifican y se vacían
en un buffer a la espera de que puedan ser ejecutadas.

# Problemas

Se ejecutan las instrucciones de forma desordenada, y, al igual que con
entubado, una instrucción posterior posiblemente necesite un resultado previo.
Esto añade complejidad para los programadores de ensamblador, los compiladores
y para el Sistema Operativo.
<!-- TODO: https://es.wikipedia.org/wiki/Unidad_central_de_procesamiento#Paralelismo -->
<!-- TODO: Diagrama del libro página 21 -->
{{< /dropdown >}}

{{< dropdown "Multihilo o hiperhilo (_multithreading, hyperthreading_)" >}}
Permite a la CPU contener el estado de dos hilos de ejecución distintos
y alterne entre ellos en una escala de nanosegundos. A efectos prácticos parece
como si se tuviesen dos CPUs a partir de una sola.

Este aspecto es importante para el Sistema Operativo a la hora de planificar las
tareas. Por ejemplo, en el caso de tener 2 CPUs reales, cada una con multihilo,
se debería asignar una tarea a cada CPU real para que ambas trabajen, y no
sobrecargar una única CPU real.
{{< /dropdown >}}

{{< dropdown "Multinúcleo (_multicore_)" >}}
También existen las CPUs con más de un procesador completo e independiente en su
interior.
<!-- TODO: figura del libro página 23, clase 18-9-23 -->
{{< /dropdown >}}


## Jerarquía de memoria

El segundo componente más importante en un ordenador es la memoria. Idealmente,
esta debe ser más rápida que el procesador, para que no haya cuello de botella.
Además, debe ser grande y barata. Sin embargo, en la actualidad no existe la
tecnología que cumpla todos estos requisitos.

Como solución, se ideó el concepto de **jerarquía de memoria**. Las capas
superiores son memorias más pequeñas y rápidas (y caras), mientras que las de
abajo son mucho más lentas pero permiten almacenar muchos datos.

<!-- TODO: diagrama de jerarquía de memoria -->

- Líneas de caché: ~64 bytes
- L1: ~16KiB (1 ciclo)
- L2:  X MiB (1,2 ciclos)

Adicionalmente: ROM (rápida y económica, solo lectura)


## Disco duro

<!-- TODO: diagrama del disco -->

Dos órdenes de magnitud más barato por bit, pero tres órdenes de magnitud más
lento en el acceso de forma aleatoria.

- 4 discos, 8 superficies, 8 peines, 8 bits simultáneamente
- 5400, 7200, 10800 rpm
- Círculos concéntricos: pistas
- Todas las pistas en una posición dada: cilidro
- División de una pista: sector (~512 bytes)

## Bus

Permite la comunicación entre dispositivos. Para obtener un buen rendimiento,
si dicho dispositivo es rápido, el bus también debe serlo: de lo contrario hará
cuello de botella.

Sin embargo, a medida que los sistemas mejoraban, tener un solo bus para manejar
todo el tráfico era ineficiente. Por eso, los ordenadores actuales incluyen
múltiples buses.

<!-- TODO: figura 1-12 pag 31 -->

- **Bus ISA** (_Industry Standard Arquitecture_): 8.33 MHz, 2 bytes simultáneos,
  16.67 MiB/s. Se incluye para compatibilidad hacia atrás con dispositivos lentos.
- **Bus PCI** (_Peripheral Component Interconnect_): 66 MHz, 8 bytes
  simultáneos, 528 MiB/s. Los dispositivos de E/S veloces (gráfica, USB, etc)
  deben usar PCI.
- **Bus PCI Express**: versión actualizada del bus PCI.

--------------

- **USB** (_Universal Serial Bus_): inventado para conectar al ordenador
  dispositivos E/S lentos, pero con cada versión (1.0, 2.0, 3.0) se aumenta la
  velocidad. Todos los USB comparten un solo controlador, por lo que no hace
  falta instalar nuevos drivers para cada dispositivo.

- **SCSI** (_Small Computer System Interface_): usado para dispositivos que
  necesiten un ancho de banda considerable, discos, escáneres, ...

## Entrada/Salida

La gestión de dispositivos de Entrada/Salida es posiblemente una de las cosas
más complejas de las que se debe encargar el Sistema Operativo.

- Controladora y dispositivo
- _Drivers_

Formas de comprobar que la operación se ha realizado:

- **Espera ocupada**: hay una llamada al sistema para que se ejecute el driver.
  Mientras el dispositivo trabaja, la CPU pide continuamente su estado. Esto no es
  muy eficiciente, porque la CPU está ocupada cuando podría realizar otras tareas.

- **Línea de interrupciones**: cuando del driver inicie el dispositivo le pide
  que genere una interrupción. Una vez terminado esa ejecución, se regresa al
  programa para que la CPU pueda seguir haciendo otras tareas (un realizar un
  cambio de contexto, por ejemplo).

  Cuando la operación de E/S termine, lanzará la interrupción a modo de
  notificación para que el Sistema Operativo la gestione.

  <!-- TODO: figura 1-11 página 30 -->

- **[DMA]**

[DMA]: {{< relref "entrada-salida#acceso-directo-a-memoria-dma" >}}

### Controladoras (_device controllers_)

Se trata de **hardware específico** que controla un dispositivo de E/S. Es una
electrónica muy sencilla: consta de registros y buffers en los que escribe la
CPU para realizar una operación. Resultan particularmente útiles para el sistema
operativo porque abstraen la complejidad específica del dispositivo.

Por ejemplo, se escribe en los registros de la controladora que se quiere leer
determinado bloque en el disco. Con esta información, la controladora determina
cuánto se debe mover el peine del disco para situarlo en la posición deseada
y poder leer el dato. Esto resulta complicado porque las pistas exteriores
tienen más sectores, dependiendo de donde esté el brazo del peine se debería
mover hacia dentro o hacia afuera, etc.

### Controladores (_drivers_)

Software que utiliza el Sistema operativo para comunicarse con el dispositivo.
Simplemente lee y escribe datos en buffers específicos para realizar acciones
sobre el mismo. Para ello utiliza instrucciones especiales para acceder, dado
que la memoria no es la RAM. Y para hacer uso de dichas intrucciones, el
_driver_ se debe ejecutar el modo kernel. En otros casos, se relaciona una
dirección de memoria virtual con un dispositivo de Entrada/Salida, como si fuese
leer/escribir en la memoria RAM.

Para realizar conseguir añadir un driver al modo kernel, exiten tres formas:

- Volver a enlazar el kernel con el nuevo driver y después reiniciar.
- Crear una entrada en un archivo del SO indicando en nuevo driver y después
reiniciar.
- O bien que el SO acepte los drivers de forma dinámica, como cuando se inserta
  un USB.

# Conceptos básicos de un Sistema Operativo
## Proceso

{{< block "Nota" >}}
Para más información consultar el artículo dedicado a
[procesos]({{< relref "procesos" >}})
{{< /block >}}

Un programa es un fichero ejecutable/binario que se encuentra en el disco
y contiene instrucciones máquina. Cuando este programa se quiere ejecutar, se
debe cargar el memoria principal.

Un proceso, en cambio, es en esencia **un programa en ejecución**. Este tiene
asociado un espacio de direcciones de cierto rango (0 hasta 0xFF...F, por
ejemplo) donde el proceso puede leer y escribir información. **Solo puede estar en
un único core** (se puede cambiar de core, pero nunca más de uno a la vez).

Los sistemas actuales son multiprogramados, por tanto se deben suspender
y reaunudar los procesos. Eso implica guardar toda la
información relacionada (estado de los registros, archivos abiertos, etc)
y recuperarla cuando se reaunude (**cambio de contexto**). Todo esto se almacena en la **tabla de
procesos**.

Existen las jerarquías de procesos: los **procesos hijo** son aquellos que ha
creado un proceso padre, por lo que se pueden organizar en una estructura de
árbol. Los procesos relacionados cooperan y se comunican.

Por otro lado, cada usuario recibe un código de identificación (UID), al igual
al grupo al que pertenece (GID). Cada proceso recibe el UID de la persona que lo
inició. El **superusuario** o **administrador** es un UID especial que puede
saltarse las reglas de protección

## Espacio de direcciones

{{< block "Nota" >}}
Para más información consultar el artículo dedicado a
[memoria]({{< relref "memoria" >}})
{{< /block >}}

Si solo se desea ejecutar un único programa a la vez, simplemente se puede
cargar en memoria principal y ejecutarlo directamente. Si se quiere ejecutar un
segundo, primero se debe retirar el primero y posterioremente cargar el deseado.

Sin embargo, en los sistemas multiprogramados, esta estrategia no es válida.
Para evitar que diferentes procesos interfieran unos con otros se necesita
cierto mecanismo de protección.

Una técnica posible es designar a cada proceso un **espacio de direcciones
virtual**, que consiste en abstraer el conjunto de direcciones a las que puede
acceder el proceso. De esta forma, la memoria que usa el proceso se desacopla de
la memoria física (en caso de que hayan partes que no quepan se almacenan en la
zona de _swapping_ del disco), pudiendo tener varios procesos al mismo tiempo,
incluso con una memoria física mucho menor.

<!-- TODO: diagrama de memoria de un proceso -->

## Archivo

{{< block "Nota" >}}
Para más información consultar el artículo dedicado a
[archivos]({{< relref "archivos" >}})
{{< /block >}}

Esta es otra de las grandes abstracciones del sistema operativo. Gracias
a llamadas al sistema se pueden crear, eliminar o escribir archivos; lo que
implica que **toda operación relacionada con archivos debe pasar a través de un
proceso**.

También existe el concepto de **directorio** (carpetas) para agruparlos
y simplificar su manejo. Los directorios pueden contener otros directorios, por
lo que al igual que los procesos, se forma una **jerarquía en forma de árbol**
(las jerarquías de archivos suelen ser más profundas que las jerarquías de
procesos). El nodo raíz, la parte superior de la jerarquía de archivos se
denomina **directorio raíz**. En cada instante, un proceso tiene un **directorio
de trabajo** actual.

Para especificar un archivo o ruta dentro de la jerarquía, se indica el nombre
de cada directorio hasta llegar al archivo más un separador: `/` en Unix y `\`
en MSDOS/Windows.

Existen dos tipos de rutas:

- **Absolutas**: indican el camino completo desde la raíz. En Unix siempre
  empiezan por `/`: `/home/magno/Prog/blog/content/so/introduccion.md`.
- **Relativas**: indican el camino a partir del directorio actual de trabajo.
  `content/so/introduccion.md`.

<!-- TODO: diagrama estructura jerarquica de los archivos 1-14, pag 41 -->

Otro concepto importante en Unix son las **monturas**. Inicialmente, para
acceder a los archivos de un DVD/USB/etc, no se dispone de ninguna ruta para
referirse a ellos: se debe hacer uso de la llamada del sistema `mount`. Esta
toma el sistema de archivos indicado y lo _monta_ sobre un directorio ya
existente en el sistema de archivos.

<!-- TODO: diagrama montaje de archivos 1-15 página 43 -->

Finalmente, existen algunos archivos especiales:

- **Bloque**: representan dispositivos en una colección de bloques
  direccionables al azar, como discos duros.
- **Caracter**: impresoras, módems, y otros dispositivos que aceptan flujo de
  caracteres
- **Canal** (_pipe_): pseudoarchivos para la compartición de información entre
  procesos

De esta forma, se modelan operaciones de Entrada/Salida o Comunicación como si
fuese escribir o leer de un archivo.

{{< block "Importante" >}}
Sin embargo, nada de esto existen para el computador, dado que como ya se ha
comentado, el disco se divide en sectores: no sabe qué es eso de un archivo.
{{< /block >}}

## Shell

<!-- TODO: link a un post dedicado a comandos y sintaxis de bash -->

El Sistema Operativo es quien ejecuta las llamadas al sistema. Los editores,
compiladores, ensambladores, intérpretes, etc. no forman parte de él, pero aun
así son importantes y útiles. El **shell**, el intérprete de comandos de Unix,
tampoco forma parte del sistema, pero utiliza con frecuencia muchas
características del mismo y sirve como ejemplo para utilizar las llamadas al
sistema.

El intérprete de comandos es la interfaz principal entre un usuario y el Sistema
Operativo (salvo casos donde el usuario use la GUI). Existen muchos tipos de
shell distintos: `sh`, `csh`, `bash`, `fish`, etc.

A continuación aparece una versión simplificada del shell. Nótese que se usa
escritura en pantalla, lectura de teclado, creación de procesos (`fork`),
esperar por un proceso hijo (`waitpid`) y ejecutar un archivo (`execve`).

```c
while (1) {
    type_prompt();                     // Mostrar el prompt
    read_command(command, parameters); // Lee la entrada de terminal

    if (fork() != 0) {
        // Código del padre: esperar por el hijo
        waitpid(-1, &status, 0);
    } else {
        // Código del hijo: ejecutar el comando
        execve(command, parameters, 0);
    }
}
```


# Historia

- Tubos de vacío. No habían Sistemas Operativos como tal. La programación se
  realizaba con lenguaje máquina o creando circuitos eléctricos conectando
  cables en _plugboards_.

- Aparecen los transistores, lo que implica una gran mejora para al hardware. Se
  programa Fortran en papel y luego se pasa a tarjetas perforadas. Aparecen los
  sistemas de procesamiento por lotes.

- Aparecen los circuitos integrados y la multiprogramación. IBM desarrolla una
  línea de computadoras System/360, diseñadas para computación científica
  y comercial. Estas incluían el sistema operativo [OS/360], que pretendía que
  funcionase en todos los modelos. Era un programa muy voluminoso y tenía muchos
  problemas, pero los clientes quedaban satisfechos.

- 1964: Creación de [Multics], que fue un proyecto muy ambicioso y que nunca llegó
  a funcionar completamente. Sin embargo, influyó mucho a futuros sistemas.

- 1969: Creación de [Unix] por Ken Thompson en Bell Labs, que resultó ser muy
  popular. Este sistema es de código privativo.

- Luego, aparecieron algunos derivados de Unix: System V y BSD (1978). BSD era
  de código privativo, por lo que se desarolló posterioremente [FreeBSD] (1993),
  en el que se basan los Sistemas Operativos de Apple. Para que se fuese posible
  escribir programas para todos los sistemas Unix, el IEEE desarrolló el estándar
  [POSIX] (_Portable Operating System Interface_, la X viene de Unix).

- En 1983, Richard Stallman inicia el [proyecto GNU] (GNU es un acrónimo
  recursivo, significa _GNU no es Unix_) con el fin de crear un sistema operativo
  completamente libre compatible con Unix. Algunos programas ya eran de código
  libre y otros se tuvieron que hacer desde 0. Para 1990, se disponía de Emacs,
  GCC, Bash y un montón de bibliotecas y utilidades propios de un sistema Unix;
  pero faltaba una parte clave: el kernel.

- En 1987, se liberó un pequeño clon con fines educativos del mismo, [Minix]. El
  deseo de una versión de producción (en lugar de educativa), llevó a Linus
  Torvals a escribir [Linux], por lo que está inspirado en gran medida de Minix,
  que se lanzó en 1991 como parte del proyecto GNU.

<!-- TODO: windows & macos

------------------------------------------------------------

Mercado de los ordenadores personales

CP/M por Gary Kildall en 19

- De vuelta en los 80, IBM diseñó la IBM PC y contactó con Bill Gates para
  conseguir software. Él había comprado DOS, así que les dió un paquete de
  BASIC/DOS. IBM quería ciertas modificaciones, por lo que Bill Gates contrató
  al creador original para rediseñar el sistema a MS-DOS (_Microsoft Disk
  Operating System_).

  Bill Gates fue muy inteligente, porque vendía su sistema a las empresas para que lo
  incluyeran en su hardware. -->

[OS/360]: https://es.wikipedia.org/wiki/OS/360
[Multics]: https://es.wikipedia.org/wiki/Multics
[Unix]: https://es.wikipedia.org/wiki/Unix
[FreeBSD]: https://es.wikipedia.org/wiki/FreeBSD
[POSIX]: https://es.wikipedia.org/wiki/POSIX
[proyecto GNU]: https://es.wikipedia.org/wiki/Proyecto_GNU
[Minix]: https://es.wikipedia.org/wiki/MINIX
[Linux]: https://es.wikipedia.org/wiki/N%C3%BAcleo_Linux
