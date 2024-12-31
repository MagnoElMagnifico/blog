---
title: Procesos e Hilos
description: >
    El concepto más importante en cualquier Sistema Operativo es el **proceso**,
    una abstracción de un programa en ejecución. Todo lo demás depende de este
    concepto. En este post se definirá qué es un proceso, cómo se crean, cómo
    terminan y cómo el Sistema Operativo los maneja.
date: 2023-12-26T13:42:11+01:00
weight: 2
math: true
---

# Definición de Proceso

{{< block "Definición" "var(--magno-blue)" "black" >}}
Un **proceso** es una instancia de un programa en ejecución. Esto incluye los
valores actuales de:

- El contador de programa
- Los registros
- Las variables
- Y otros, como la lista de archivos abiertos o procesos relacionados

Un proceso tiene asignado un espacio direccionable, en el que se pueden
encontrar diferentes partes:

- Código o instrucciones (sección de texto: `.text`)
- Datos del programa: estáticos y constantes (sección de datos: `.data`)
- Pila de llamadas (_call stack_)
- Memoria dinámica: Montón (_heap_)

Un proceso **solo puede estar en un único core a la vez**. Se puede mover el
proceso de core, pero nunca en varios.
{{< /block >}}

Una manera de ver a un proceso es como si fuera **una forma de agrupar recursos
relacionados**: su espacio de direcciones, texto y datos del programa, archivos
abiertos, procesos hijos, alarmas pendientes, manejadores...

<!-- TODO: dibujo del espacio de direcciones del proceso -->

Ya se ha comentado en la [introducción] la diferencia entre un proceso y un
programa, pero me gustaría recalcar la diferencia, dado que es algo sutil. **Un
proceso se podría pensar como una actividad** de cierto tipo, y **un programa
como una receta** (o un algoritmo). La actividad se puede pausar, reaunudar...
También se podría detener la actividad actual y comenzar otra en su lugar.
O puedo realizarla varias veces seguidas, o incluso, al mismo tiempo. Nada de
esto tiene sentido si se intenta aplicar a una receta: ¿Pausar y reaunudar una
receta?

Cabe recalcar que si un programa se está ejecutando por duplicado, cuenta como
dos procesos diferentes, dado que pueden estar en estados distintos.

Conceptualmente, cada proceso tiene su propia CPU; pero en realidad, la CPU real
conmuta rápidamente de programa a programa, continuamente realizando **cambios
de contexto**. De esta forma, se consigue un **sistema multiprogramado**. Para
ver un ejemplo de cómo conmutan las tareas, puede consultar en post sobre el
[proceso Hardware].

[introducción]: {{< relref "introduccion#proceso" >}}
[proceso Hardware]: {{< relref "arranque#proceso-hardware" >}}

{{< block "Multiprogramación" >}}
La **multiprogramación** es una técnica que permite ejecutar dos o más procesos
de forma _concurrente_ por una única CPU. Esto se consigue solapando en el
tiempo cada uno de forma que cause la impresión de que se ejecutan en paralelo.
Se trata de un paralelismo simulado (por eso el incapié en _concurrente_), dado
que la CPU solo trabaja en una tarea a la vez.

Fuente: [Wikipedia](https://es.wikipedia.org/wiki/Multiprogramaci%C3%B3n)
{{< /block >}}

{{< block "Cambio de contexto">}}
La operación de tomar un proceso en ejecución, guardar su estado y cambiarlo por
otro se llama **cambio de contexto**.

1. Se almacena el valor de los registros en memoria, como si fuese tomar una
   foto del estado del proceso actual.
2. Se calcula el proceso a seguir.
3. Se recuperan los registros de memoria del proceso elegido.

De esta forma, el proceso se recupera exactamente como estaba antes, y este no
se ha enterado de lo que ha sucedido.
{{< /block >}}

{{< block "PID" >}}
Cada proceso tiene un identificador numérico único y fijo: **PID** (_Process
IDentification_). Este se usa para interactuar o dirigirse al proceso en
concreto.
{{< /block >}}

## Tipos de Procesos

- **Usuario**: procesos de primer plano, creados por el usuario.
- **Demonios** (_daemons_): procesos de segundo plano, servicios. Se pueden ver
  desde el Administrador de tareas o con el comando `ps`.
- **Kernel**
  - `Innit` / `SystemD`

# Creación de Procesos

Hay varios eventos que provocan la creación de procesos:

- El **arranque del sistema** (ver [arranque del Sistema Operativo] y el proceso
  inicial en [jerarquía de procesos]).
- Uso de una **llamada al sistema** desde otro proceso (`fork`).
- Petición de un usuario a través de un **comando** (caso particular del punto
  anterior).

[arranque del Sistema Operativo]: {{< relref "arranque#arranque-del-sistema" >}}
[jerarquía de procesos]: {{< relref "#jerarquías-de-procesos" >}}

Si se fija, salvo por el primer caso, solo un proceso puede crear otro proceso:
la única forma de crearlos en Unix es llamando a la función `fork`. Esta duplica
la entrada de la tabla de procesos, es decir, se está haciendo **una copia
exacta del proceso actual**. Toda la memoria y código será el mismo, salvo el
valor devuelto por la función.

- `-1` en caso de error (se puede imprimir el mensaje con `perror`)
- El PID del proceso hijo en caso de que el proceso actual sea el padre
- 0 si el proceso actual es el hijo

Para darle utilidad a esta función, es necesario colocar un `if` justo después
de la llamada a `fork` para comprobar si estamos en el padre o en el hijo.

Ejemplo:

```c
#include <unistd.h>
// ...

pid_t pid_hijo = fork();
if (pid_hijo == 0) {
     // Código que ejecuta el proceso hijo
} else if (pid_hijo < 0) {
     // Código en caso de error
} else {
     // Código del proceso padre
}
```

{{< block "Importante" >}}
Son dos procesos distintos (el que llamó a `fork` y proceso creado) y que cada
uno tiene su propio espacio direccionable, aunque sean iguales. Si un proceso
modifica una variable, el otro no se verá afectado.
{{< /block >}}

<!-- TODO: diagrama del espacio de direcciones de cada proceso creado -->

Utilizando esta estrategia, se puede repartir un trabajo entre varios cores.

Cuidado con el siguiente código:

```c
for (int i = 0; i < 3; i++) {
     fork();
     printf("%d\n");
}
```

Este programa no crea 3 procesos hijo, sino 2^3 = 8 procesos. Recuerde que
cada proceso hijo también realizará a su vez un `fork`, por lo que será un
crecimiento exponencial.

<!-- TODO: diagrama de árbol para este caso -->

# Jerarquías de Procesos

En algunos sistemas, cuando un proceso crea a otro, ambos siguen vinculados
mediante una relación padre-hijo: cada uno conoce el PID del otro (`getpid()`,
`getppid()` y el resultado de `fork`). A su vez, los procesos hijos pueden crear
otros, por lo que se termina con una jerarquía de procesos. Estas se pueden ver
usando el comando `pstree`.

{{< block "Grupo de procesos" >}}
En Unix, un proceso con todos sus hijos forman **un grupo de procesos**.

- Se pueden enviar señales a todos los procesos del grupo.
- Cada uno tratará la señal de forma individual.
{{< /block >}}

{{< block "Proceso Inicial" >}}
El proceso inicial (el proceso 0 u 1, la raíz de toda la jerarquía de procesos)
es el primero que se ejecuta, antes llamado `init`, hoy en día sustituido por
[`systemd`].

Las funciones de `init` son la siguientes:

- Crea un proceso para cada terminal. Estos quedan a la espera de que alguien
  inicie sesión, y luego el proceso ejecuta una shell. A partir de ahí, el
  usuario creará más procesos según necesite: comandos, aplicaciones, etc.
- Cuando un proceso queda huérfano (su padre termina), normalmente `init` pasa
  a ser su padrastro.

[`systemd`]: https://es.wikipedia.org/wiki/Systemd
{{< /block >}}

En Windows no existe esta jerarquía:

- Cuando se crea un proceso, el <<padre>> recibe in manejador (_token_) para
  gestionarlo.
- Se puede pasar el token a otros procesos, lo que invalida la jerarquía.

# Señales

Las señales son **avisos** / **notificaciones** que reciben los procesos acerca
de eventos que pueden ocurrir en el sistema, para comunicar y sincronizar
procesos.

{{< block "Características" >}}
- Cada señal está identificada por un número entero, **no se envía información
  adicional**.
- Son pocos tipos de señales.
- Cuando un proceso recibe una señal, tiene una respuesta preprogramada
  (manejador): matar el proceso, suspenderlo, reanudarlo..., o también ignorar
  la señal.
- Tienen un comportamiento muy parecido a las interrupciones, pero estas se
  deben a dispositivos E/S, no a otros procesos o el propio Sistema Operativo.
- Van dirigidas a un proceso en concreto (o a grupos).
{{< /block >}}

{{< block "Envío de señales" >}}
- Otro proceso manda una señal con `kill`
- Excepciones
- Interrupciones en la terminal: `Control + C`
- Terminación de un proceso hijo
- Notificaciones de E/S o alarmas de reloj del sistema
{{< /block >}}

Algunos ejemplos de señales (más en `man signal(7)`):

| Constante de C      | Número | Efecto                                                        |
|---------------------|--------|---------------------------------------------------------------|
| `SIGABRT`           | 6      | Aborta la ejecución con un _core dump_                        |
| `SIGALRM`           | 14     | Se acaba el contador del reloj del sistema                    |
| `SIGFPE`            | 8      | Error de número flotante (e.g.: división por 0)               |
| `SIGILL`            | 4      | El usuario presionó `DEL` para interrumpir el proceso         |
| `SIGQUIT`           | 3      | El usuario presionó una tecla pidiendo _core dump_            |
| **`SIGKILL`**       | 9      | Mata el proceso (**no se puede reprogramar**)                 |
| `SIGPIPE`           | 13     | El proceso escribió en un _pipe_ sin lectores                 |
| `SIGSEGV`           | 11     | El proceso intentó acceder a una posición de memoria inválida |
| **`SIGTERM`**       | 15     | El usuario solicita que el proceso termine ordenadamente      |
| `SIGINT`            | 2      | `Control + C`: Interrupción. Por defecto termina el proceso.  |
| `SIGCHLD`           | -      | Terminación de un proceso hijo                                |
| `SIGUSR1` `SIGUSR2` | -      | Señales personalizables                                       |

Cuando se le devuelve la CPU al proceso, lo primero que se hace es ejecutar el
manejador de la señal. En la interrupciones, primero se mira quién es el
receptor y se cambia a él inmediatamente.

Algunas funciones de C utilizadas para gestionar señales:

<!-- TODO: añadir info.md de los apuntes de las prácticas -->

```c
#include <signal.h>

// Enviar una señal
int kill(pid_t pid, int signal);

// Cambiar el manejador del proceso
sighandler_t signal(int signum, sighandler_t handler);
int sigaction(int signum,
             const struct sigaction *_Nullable restrict act,
             struct sigaction *_Nullable restrict oldact);

// Otras funciones
int sigreturn(...);
int sigprocmask(int how, const sigset_t *_Nullable restrict set,
                         sigset_t *_Nullable restrict oldset);
int sigpending(sigset_t *set);
int sigsuspend(const sigset_t *mask);

#include <unistd.h>
int pause();
unsigned int alarm(unsigned int seconds);

#include <string.h>
char* strsignal(int signal);
```

También se pueden enviar señales desde la terminal:

```sh
kill -<señal> <PID>
```

Donde `<señal>` puede ser el número de señal o el nombre de la constante en
C (con o sin el prefijo `SIG`).

<!-- ## Interrupciones
TODO: diagrama 19-10-23, diapositiva 33 -->

# ¿Cómo finaliza un proceso?

- **Salida normal** (voluntaria): termina porque el proceso ha terminado su
  trabajo. Para eso, se hace uso de la llamada del sistema `exit(int codigo)`.
  `codigo` es un valor numérico con significado definido por el programador. Sirve
  para que proceso padre pueda determinar si terminó exitosamente o hubo algún
  error. El compilador añade esta llamada aunque el programador no lo haya
  escrito explícitamente.

- **Salida por error** (voluntario): igual que antes, pero durante la ejecución
  se produjo un error que dio lugar a la terminación del proceso.

- **Error fatal** (involuntario): se da una excepción, como dividir por
  0 o acceder a una posición inválida. Se gestionan de forma muy parecida a las
  interrupciones.

- **Eliminado por otro proceso** (involuntario): se usa la llamada del sistema
  `kill` para hacer que otro proceso termine.

Cuando el proceso finaliza, el padre recibe una señal de tipo `SIGCHLD`.

## Sincronización con la terminación de un proceso hijo

<!-- TODO: añadir info.md de los apuntes de las prácticas -->

```c
#include <sys/wait.h>

int pid_terminado = wait(&estado);
```

Esta función devuelve el PID del hijo que ha terminado o -1 en caso de error
(cuando no hay hijos). El proceso se quedará bloqueado a la espera de que un
hijo cualquiera termine, es decir, cuando reciba una señal `SIGCHLD`.

Alternativamente se puede usar la función `waitpid`, que incluye el PID al hijo
que esperar y otras opciones. Nótese que `waitpid(-1, &estado, 0)` es
equivalente a `wait(&estado)`.

<!-- TODO: diagrama de flujo de la función wait 28-9-23 -->

# Estados de un Proceso

Un proceso puede estar en varios estados de ejecución:

- **En ejecución** (solo un proceso por CPU)
- **Bloqueado**: no es _elegible_ para ejecutar, debido a que no puede continuar,
  comúnmente esperando por una entrada todavía no disponible.
- **Listo**: está preparado para ejecutarse, a la espera de CPU (es _elegible_),
  pero el Sistema Operativo le ha dado la CPU a otro.
- Otros (derivados de los anteriores)

<!-- TODO: diagrama de los 3 estados 9-10-23, figura 2-2 página 90 + explicación
de las transiciones -->


{{< block "Ejemplo 1" >}}
```sh
cat main.c test.c | grep proceso
```

Este comando shell crea dos procesos, uno llamado `cat`, que obtiene el
contenido de dos archivos, y `grep` que realiza una búsqueda sobre lo que ha
leído `cat`. Es posible que `grep` esté listo antes de que `cat` termine, por
tanto, este debe esperar (**bloquearse**) hasta que haya una entrada disponible.

Como `grep` queda a la espera sin hacer nada, el Sistema Operativo le puede
quitar la CPU mientras no reciba la entrada que necesite y otro proceso pueda
ejecutarse mientras tanto.
{{< /block >}}

{{< block "Ejemplo 2" >}}
Según el [proceso hardware]:

1. Un proceso se está ejecutando.
2. Se recibe una interrupción no relacionada con el proceso.
3. El kernel resuelve la interrupción. El proceso sigue en estado de ejecución
   pero está parado.
4. El kernel ejecuta el planificador.
    - El proceso continua ejecutándose como antes. Solo se ha perdido tiempo.
    - Se selecciona otro proceso para ejecutar. El proceso anterior pasa al
      estado listo.

[proceso hardware]: {{< relref "arranque#proceso-hardware" >}}
{{< /block >}}

{{< block "Ejemplo 3" >}}
Un proceso solicita una operación Entrada/Salida, como leer del disco. Como
esta operación lleva tiempo y como se necesitan dichos datos para continuar con
la ejecución, el proceso pasa al estado bloqueado hasta que se termine la
operación.
{{< /block >}}

<!-- TODO: diagrama completo de estado de los procesos 9-10-23, diapositiva 2-30
destacar el estado Zombie
-->

# Tabla de procesos

Para implementar el modelo de procesos, el Sistema Operativo mantiene la **tabla
de procesos**, donde almacena información de control sobre cada proceso. Cada
fila se corresponde con un proceso y cada columna con un dato relacionado sobre
este.

A continuación aparece una lista no exhaustiva de la información que necesita
ser almacenada para cada proceso:

| Administración de procesos  | Asignación de memoria         | Administración de archivos |
|-----------------------------|-------------------------------|----------------------------|
| Registros                   | Puntero al código (`.text`)   | Directorio base            |
| Contador de programa        | Puntero a los datos (`.data`) | Directorio de trabajo      |
| Estado del proceso          | Puntero a la pila (`.stack`)  | Archivos abiertos          |
| Prioridad                   |                               | UID, EUID                  |
| Parámetros de planificación |                               | GID, EGID                  |
| PID                         |
| Proceso padre (PPID)        |
| Grupo al que pertenece      |
| Señales y manejadores       |
| Tiempo activo               |
| Tiempo de CPU usado         |
| Tiempo CPU de los hijos     |
| Tiempo de alarma            |

Como puede ver, hay mucha información relevante para cada proceso. Por eso, para
algunas cosas, se usan **punteros para distribuir la tabla en varios sitios**.

<!-- TODO: figura UNED 4.4 página 5 -->

{{< block "Área U" >}}
Es una estructura local asociada a cada proceso que contiene **información de
control que solamente necesita el kernel cuando el proceso se está ejecutando**.
Entre la información contenida, se puede encontrar:

- Puntero a la entrada correspondiente de la tabla de procesos
- [EUID y EGID]. UID y GID están en la tabla de procesos, dado que se necesitan
  para la planificar.
- Parámetros y resultados de la llamada al sistema en ejecución.
- Dirección de los manejadores de la señales.
- Información acerca de las regiones de código, datos y pila.
- Tabla de descriptores de ficheros abiertos
- Directorio de trabajo y base
- Terminal asociada, si existe
- Estadísticas de uso de la CPU

El Área U se puede considerar una extensión de la tabla de procesos, pero esta
puede almacenarse en el disco mientras el proceso no se esté ejecutando. Por
otro lado, **la tabla de procesos debe estar enteramente en la memoria principal
del kernel**.

El kernel puede acceder directamente a los campos del Área U gracias a un
puntero interno, `u`. Cuando se produce un cambio de contexto, esa variable
debe de ser actualizada.

[EUID y EGID]: {{< relref "archivos#identificadores-de-usuario-y-grupo" >}}
{{< /block >}}

{{< block "Tabla de regiones por proceso" >}}
Es una estructura local a cada proceso que contiene una entrada por cada región
de código, datos y pila; incluso si están compartidas.

Cada entrada contiene:

- Un puntero a la _tabla de regiones general_
- Una dirección virtual de donde empieza dicha región
- El tipo de acceso permitido sobre la región: solo lectura, lectura y escritura
  o ejecución.

Esta tabla se puede implementar directamente en la tabla de procesos o incluso
en el Área U.
{{< /block >}}

{{< block "Tabla de regiones general" >}}
Es una estructura global del kernel, y al igual que la tabla de procesos, tiene
una entrada para cada uno. Las entradas se organizan en dos listas enlazadas,
una **lista de regiones libres** y otra **lista de regiones activas**. Esta
contiene la información necesaria para **describir una región**.

- Puntero al _inodo_ del fichero relacionado
- Tipo de región: código, datos, pila o memoria compartida
- Localización de la región en memoria principal: **puntero a la [tabla de
  páginas]**
- Estado de la región: válida, bloqueada, bajo demanda, cargándose en memoria
- Contador de referencias: número de procesos usando la región.

Esta tabla es general para todos los procesos para facilitar la compartición de
regiones de memoria entre procesos.

[tabla de páginas]: {{< relref "memoria#tabla-de-páginas" >}}
{{< /block >}}

# Hilos (_threads_)

{{< block "Definición" "var(--magno-blue)" >}}
Un hilo de ejecución es la **secuencia de instrucciones** de un programa. Son
como procesos independientes, salvo que **comparten memoria** (<<proceso dentro
de un proceso>>).

Los elementos de un hilo son:

- Un **contador de programa** que lleva registro de la instrucción que va
  a ejecutar a continuación.
- Los **registros**.
- Una **pila** que contiene el historial de ejecución y los valores de cada
  procedimiento que todavía no devolvió.
- El **estado** del hilo: bloqueado, en ejecución, listo, terminado.
{{< /block >}}

<!-- TODO: diagrama de varios hilos dentro de un proceso y regiones del mismo 19-10-2023 -->

<div id="LWP">

Hay autores que llaman a los cores hilos por su fuerte relación. Otros autores
los llaman procesos ligeros (**Lightweight Processes**, LWP), pero eso ya es mas
inusual. Un proceso consiste de al menos un hilo y un espacio de direcciones.

</div>

{{< block "Características" >}}
- **Comparten memoria**: Están en el mismo espacio de direcciones.
- **Son planificables**: se ejecutan de forma pseudoparalela.
-----------------------------------------------------------
- La conmutación entre hilos es más rápida que la conmutación entre procesos.
- Más fáciles de crear y destruir: no hay entrada en la tabla de procesos, no
  hay que generar un nuevo espacio de direcciones, etc. La creación de un hilo
  es de 10 a 100 veces más rápida que la creación de un proceso.
-----------------------------------------------------------
- Se usan para aplicaciones cuyas tareas están muy acopladas
- Muy útiles para aplicaciones de cálculo y muchas operaciones de E/S.
{{< /block >}}

{{< block "Principio de afinidad entre hilos" >}}
Los procesos se pelean por la memoria física y la CPU, mientras que los hilos
colaboran entre ellos:

- Si el Hilo 1 calcula un dato y lo coloca en memoria, el Hilo 2 lo puede utilizar.
- También, si el Hilo 2 abre un archivo, lee datos del disco y los trae
  a memoria (incluso a caché), el Hilo 1 se verá beneficiado.

Hay que tener en cuenta que el Sistema Operativo aporta protección entre
procesos: pueden ser de usuarios diferentes y ser hostiles entre sí.
Pero no hay protección entre hilos, dado que es imposible y no es necesario. Se
supone que el programador ha creado los hilos para que colaboren.
{{< /block >}}

## Creación de hilos en POSIX

Cada proceso tiene un hilo por defecto, pero podemos crear más dentro de su
espacio de direcciones gracias al paquete de hilos (_pthreads_, hilos portables)
definido por IEEE. Exiten más de 60 funciones, aquí solo se verán las más
importantes.

```c
#include <pthread.h> // -lpthread
```

Para poder usar las funciones que permiten manejar los hilos, se debe incluir el
archivo de cabecera `pthread.h`. Además, a la hora de compilar, se debe añadir
la librería `pthread`.

```c
int pthread_create(pthread_t* thread,
                   const pthread_attr_t* attr,
                   void* (*start_routine)(void *),
                   void* arg);

// Ejemplo:
thread_t hilo;
pthread_create(&hilo, NULL, thread_main, NULL);
```

Para crear un hilo se usa la función `pthread_create`.

- `thread`: parámetro de salida, obtiene el TID del hilo (_Thread IDentifier_).
  Juega el papel del PID para los hilos. La función análoga a `getpid()` para
  los hilos es `pthread_self()`.
- `attr`: referencia a un los atributos del hilo.
- `start_routine`: puntero a función `void* (void*)`. Esta será la función
  principal nuevo hilo.
- `arg`: argumentos para la función principal del hilo.
- `return`: devuelve 0 en caso de éxito, y otro número en caso de error.

Nótese que el efecto de llamar a la función `start_routine` directamente
o hacerlo mediante `pthread_create` es notable: de la última forma se estará
ejecutando en un nuevo hilo.

```c
[[noreturn]]
void pthread_exit(void* retval);
```

Cuando un hilo ha terminado su trabajo, se puede llamar a `pthread_exit()`, lo
que provoca la detención del hilo y la liberación de su pila. También se puede
usar dentro del hilo principal.

```c
int pthread_join(pthread_t thread, void** retval);
```

Esta es la equivalente a `waitpid` para hilos. Bloquea el hilo actual hasta que
el hilo indicado termine. El valor `retval` almacena el resultado del hilo.

```c
[[deprecated]]
int pthread_yield(void);
```

Esta función provoca que el hilo ceda la CPU, lo que permite al programador
mejorar la cooperación entre ellos. Sin embargo, **no bloquea al hilo**, por lo
que si se disponen de suficientes CPUs, esta función no tiene efecto.

## Ejecución de hilos

- Los hilos se turnan para ejecutarse.
- Algunas CPUs tienen soporte hardware para la conmutación entre hilos.
- El Sistema Operativo ofrece protección entre procesos (no pueden modificar las
  variables de otro proceso) pero no entre hilos (pero los hilos sí). Es muy
  difícil detectar errores relacionados con esto.

<!-- TODO: diagrama de tabla de procesos vs tabla de hilos 19-10-2023 -->

## Implementación de hilos

Hay varias formas posibles de implementar el paquete de hilos:

- En el espacio de usuario
- En el espacio de kernel: el kernel maneja los hilos
- Implementaciones híbridas

<!-- TODO: diagrama de hilos en espacio de usuario vs kernel 19-10-2023 -->
<!-- TODO?: libro 2.2.7 activación del planificador -->

### Hilos en el espacio de usuario

Este método consiste en colocar el paquete de hilos **completamente en el
espacio de usuario**: planificación de hilos, tabla de hilos, etc.

- El kernel solo administra los procesos ordinarios: **no sabe nada nada sobre
  hilos**.
- Los hilos se implementan con una biblioteca (_Runtime_).
- Hay una **tabla de hilos privada** en la zona de usuario de cada proceso.
- Los **cambios de contexto entre hilos los hace el propio proceso**, no
  involucra al kernel.

{{< block "Ventajas" >}}
- Se pueden implementar hilos en Sistemas Operativos que no los soporten.

- La **conmutación entre hilos es más rápida**:
  - No se necesitan [traps]({{< relref "introduccion#traps" >}})
  - No se necesitan cambios de contexto por el kernel (no es lo mismo un cambio
    de contexto _de procesos_ que conmutar hilos).
  - No se necesita vaciar la caché

    Los procesos meten en caché sus datos, y dado que cada uno tiene su propia
    memoria; al cambiar de proceso, la memoria en caché no le vale, por lo que
    tiene que sustituirlos con sus propios datos.

    Los hilos, al compartir memoria, colaboran entre sí: un hilo carga algo en
    memoria y el resto lo pueden usar.
- **Algoritmos de planificación personalizados**: Como está en el espacio de
  usuario, es mucho más configurable.

- **Estabilidad**: la tabla de hilos en el kernel puede ser enorme. El
  kernel está siempre en memoria principal, pero la zona de usuario se retira en
  cuanto el proceso no está activo, y entonces no se necesita la información de
  los hilos.
{{< /block >}}

{{< block "Desventajas" "var(--magno-red)" >}}
**Llamadas al sistema o interrupciones pueden para a todos los hilos del
proceso**, dado que si se detiene el proceso por el kernel, también se detendrán
el resto de los hilos. Esto es un gran problema, dado que los hilos se utilizan
precisamente para aplicaciones que se bloquean con frecuencia, como un servidor
Web multihilado.

Una posible solución es encapsulando las llamadas al sistema, y si se determina
que se bloqueará, **se le quita la CPU al hilo**. Esto lo puede añadir el
compilador.

Sin embargo, no siempre se puede hacer: por ejemplo **los fallos de página son
imprevisibles** y también provocan el bloqueo del proceso.

Otra desventaja es que dentro de un proceso no hay interrupciones de reloj, por
lo que resulta imposible implementar un planificador de hilos _round robin_.
{{< /block >}}

### Hilos en el espacio de kernel

En este caso el kernel tiene conocimiento de los hilos y es él mismo quien los
administra:

- **No hay tabla de hilos privada**: el kernel mantiene una global.
- No se necesita un sistema en tiempo de ejecución (_Runtime_): es el propio
  kernel.
- **Se necesitan llamadas al sistema** para la gestión de los hilos.

{{< block "Ventajas" >}}
Cuando un hilo se bloquea, el kernel puede:

- Seleccionar otro hilo del mismo proceso.
- Seleccionar un hilo de otro proceso distinto.

Dado que conoce todos los procesos e hilos, puede tomar decisiones más
inteligentes.
{{< /block >}}

{{< block "Desventajas" "var(--magno-red)" >}}
- **Más lento**: las llamadas al sistema son costosas, dado que implican traps.

Otros problemas que debe resolver el Sistema Operativo:

- Si en un proceso hay varios hilos y se realiza un `fork`, ¿cuántos hilos tiene
  el nuevo proceso?
- Cuando un proceso recibe una señal, ¿qué hilo lo recibe?
{{< /block >}}

### Implementaciones híbridas

Las implementaciones híbridas tratan de combinar las ventajas de los hilos en el
espacio de usuario y kernel. Para ello, se usan hilos del kernel con
multiplexación entre varios hilos del usuario.

- **Muy flexible**: el programador decide cuántos hilos de cada tipo usa.
- El Sistema Operativo solo gestiona los hilos de la zona de kernel.

<!-- TODO: diagrama de hilos hibridos 26-10-2023 -->

### Hilos emergentes (_pop-up thread_)

- Estos hilos se utilizan en sistemas distribuidos.
- La llegada de un mensaje de red crea un nuevo hilo para su gestión.
- Se crean con rapidez, porque como son nuevos no tienen historial (registros,
  pila...) que se tenga que restaurar. Cada uno empieza desde cero y es idéntico
  a los demás.

<!-- TODO: figura de hilos emergentes 26-10-2023 -->

Estos hilos se pueden ejecutar tanto en el contexto del kernel como de un
proceso.

Si aparece en espacio de kernel, es más rápido y sencillo; además de que se
tiene acceso a las tablas del kernel y dispositivos E/S. El problema es que si
el programa contiene errores puede causar mucho daño al sistema.

### Hilos en Linux

**Linux es multihilado**, por lo que los hilos se gestionan en el espacio de
kernel. Este provee de una función de alto nivel, `clone`, que disuelve la
distinción entre hilos y procesos.

pid = clone(funcion),

```c
int clone(int (*fn)(void *_Nullable),
          void *stack,
          int flags,
          void *_Nullable arg);
```

<!-- TODO: incluir información de practica4/info.md -->

Gracias a diferentes flags, se puede hacer que diferentes procesos compartan
memoria, esencialmente convirtiéndolos en hilos.

Nótese que es necesario que el programador cree la pila para el hilo y la
función principal para el mismo.

# Planificación de procesos

Los procesos e hilos compiten por el uso de la CPU, y el **gestor de procesos**
es el encargado de decidir, entre aquellos que estén en el estado **listo**,
cuál será el siguiente en ejecutarse gracias al **algoritmo de planificación**.

Es importante destacar que **para sistemas diferentes, se require una
planificación diferente**, por lo que es muy difícil diseñar un algoritmo
genérico. Por ejemplo:

- Los servidores tienen muchos procesos donde todos ellos
  requieren de la CPU, por lo que la planificación en crítica.
- Los PCs tienen pocos procesos activos y muchas operaciones E/S; por lo que la
  planificación no resulta tan crítica.

Además, **la conmutación es cara**: si son muy frecuentes, pueden llegar
a consumir una fracción considerable del tiempo de CPU. Entonces, **el algoritmo
de selección es crítico para el rendimiento**.

{{< block "Gestión de procesos" >}}
1. Paso de modo usuario a kernel
2. Guardar el estado en la tabla de procesos
3. Ejecutar el algoritmo de selección entre los procesos listos
4. Cargar el nuevo proceso desde los datos almacenados en la tabla de procesos
5. Se puede quitar la información del proceso anterior de caché y memoria
   principal
{{< /block >}}

<!-- TODO: figura de mucho E/S vs poco E/S 30-10-2023, diapositiva 57, figura
2-38 pagina 147 -->

- El proceso A hace un uso más intensivo de la CPU con ráfagas más largas y pocas
  esperas por E/S: procesos **limitados a cálculos**.
- El proceso B hace ráfagas de CPU cortas con un gran uso de dispositivos E/S:
  procesos **limitados a E/S** (_IO-bound_).

Con las mejoras tecnológicas de las CPUs, la E/S suelen ser el cuello de
botella. Por tanto, la estrategia a seguir es **priorizar los procesos con mucha
E/S**: mientras se espera por la operación E/S, se pueden ejecutar los procesos
intensivos de CPU.

Por tanto, la **duración de la ráfaga de la CPU** es un factor clave.

<!-- TODO: gráfica 30-10-2023 diapositiva 58 -->

Si nuestro objetivo es desperdiciar el mínimo tiempo de CPU, por ejemplo <10%:

- Si los procesos usan el 80% de su tiempo esperando por E/S, debe haber al
  menos 10 procesos en memoria.
- Si solo usan el 20%, es suficiente con 2 procesos.

## ¿Cuándo planificar un proceso?

A continuación aparece una lista de posibles circunstancias en las que se
debe ejecutar el planificador de procesos:

- **Creación** de un proceso: ¿se ejecuta el padre, el hijo u otros?
- **Terminación** de un proceso: ¿quién sigue?
- **Bloqueo** de un proceso: ¿quién sigue?
- **Interrupción de E/S**: se resuelve y se decide quién sigue (ver [proceso
  Hardware]).
  - ¿Ejecutar el destinatario?
  - ¿Ejecutar el que se estaba ejecutando antes?
- **Interrupción de reloj**: se ha terminado el quantum.

{{< block "Proceso idle/inactivo" >}}
Como ya se comentó en el [proceso Hardware], **la CPU siempre debe estar
ejecutando instrucciones**. Por eso, existe el proceso _**idle**_, en el que
se ejecuta en bucle la operación `noop` (no hacer nada).

Esta es lógicamente la última candidata que considera el planificador, pero
siempre está disponible en caso de que no haya ninguna otra tarea.

[proceso Hardware]: {{< relref "arranque#proceso-hardware" >}}
{{< /block >}}

{{< block "Quantum" "var(--magno-blue)" >}}
Cada cierto tiempo se lanza una interrupción de reloj, indicando que se ha
acabado un **quantum**. Este es una constante del sistema que designa el periodo
de tiempo entre cada interrupción.

Su único objetivo es quitar la CPU al proceso actual, para dejar paso a otros
procesos y que todos puedan avanzar con sus tareas.

### Tamaño del quantum

El tamaño del quantum es una importante decisión de diseño:

- Quantum **muy corto**: **demasiados cambios de contexto**, se desperdicia mucha CPU
  cambiando de contexto.
- Quantum **muy largo**:
  - Tiempos de espera largos
  - Muchos procesos se bloquearán antes
  - Mala respuesta a peticiones interactivas

El valor habitual oscila entre los 20ms y 50ms.
{{< /block >}}

Dependiendo de si el sistema utiliza quantums o no, se pueden distinguir dos
tipos:

- **Sistemas apropiativos**: uso de interrupciones sistemáticas de reloj para
  cambiar el proceso actual por otro, dado que llevaba demasiado tiempo usando la
  CPU.
- **Sistemas no apropiativos** (_nonpreemptive_): el Sistema Operativo deja que el proceso se
  ejecute hasta que él mismo se bloquee.

## Tipos de algoritmos de planificación

Requisitos de un buen algoritmo de planificación:

- **Justo**: ningún proceso queda sin ejecutarse
- Aplicación de una **política**
- **Balance**: tener la mayor parte posible del hardware trabajando
  simultáneamente, intentando aprovecharlo al máximo.

{{< keyvalue title="Distintos sistemas, distintos algoritmos" >}}
-% _Batch Systems_ :%
No hay procesos que esperen para obtener una respuesta rápida.
- (Política) **Productividad**: maximizar el número de tareas por tiempo.
- **Tiempo de retorno** (_Turn around time_): minimizar el tiempo realizando la tarea (desde que se
  inicia hasta que se acaba).
- Uso de la CPU: mantenerla siempre ocupada.
- No apropiativos o apropiativos con largos periodos.
- Reducir la conmutación de procesos.

-% Sistemas interactivos (propósito general) :%
- **Tiempo de respuesta**: responder rápido a las peticiones del usuario.
- **Proporcionalidad**: alcanzar las expectativas del usuario.
- Se evita que un proceso acapare toda la CPU: **apropiativo**.

-% Sistemas en tiempo real (e.g.: avión) :%
Está condicionado por las exigencias del sistema
- **Fechas límite**: se tiene que completar la tarea en x tiempo.
- **Predictibilidad**: evitar la degradación de la calidad en sistemas
  multimedia.
{{< /keyvalue >}}

## Estrategias generales de planificación

Nótese que ningún Sistema Operativo implementa una única estrategia, sino que en
la práctica, se combinan y se usan diferentes ideas. Hay muchos matices.

{{< keyvalue title="Resumen" >}}
-% FIFO :%
Cola por orden de llegada.

-% Más corto primero :%
Se deben conocer los tiempos de ejecución de antemano.

-% Menor tiempo restante :%
Variante del Más corto primero. Apropiativo por quantums.

-% Turno circular (_Round-Robin_) :%
FIFO apropiativo por quantums.

-% Prioridad :%
Apropiativo: reducción de prioridad cada quantum.  
Varias colas para agrupar por prioridad.  
Prioridad dinámica de $\frac{1}{f}$, donde $f$ es el porcentaje de uso del
quantum.

-% Más corto después :%
Variante de Más Corto Primero con una estimación del tiempo de ejecución.

-% Garantizada :%
$\frac{1}{n}$ de uso de CPU.

-% Sorteo :%
El de más papeletas tiene más posibilidades.  
Se permite el paso de papeletas a otro proceso.

-% Partes equitativas :%
Asignación de una fracción de tiempo CPU por usuario.
{{< /keyvalue >}}

### Sistemas de procesamiento por lotes

{{< block "FIFO" >}}
Primero en entrar, primero en ser atendido (_First In, First Out_).

- Uso de una **cola**:
  - A medida que se van creando procesos, se añaden al final de la cola.
  - A la hora de seleccionar un proceso, se escoge el primero de la cola.
  - Si un proceso se bloquea, se envía al final de la cola.
- **No apropiativo**: Un proceso se ejecuta durante todo el tiempo que necesite
  o en períodos largos.
- Fácil de implementar y equitativo.
- Ineficiente si hay muchas operaciones E/S y poco cálculo.
{{< /block >}}

{{< block "Más corto primero" >}}
- Los **tiempos de ejecución se deben conocer de antemano**.
- Se conocen los procesos a ejecutar están disponibles al mismo tiempo.
- **No apropiativo**

<!-- TODO: diagrama mas corto primero, figura 2-40 pag 153, diapositiva 62 -->

El tiempo medio es: $$ \frac{(4a + 3b + 2c + d)}{4} $$ porque el primer trabajo,
$a$ contribuye más al promedio de los otros tiempos; $b$ contribuye, pero un
poco menos, etc.
{{< /block >}}

{{< block "Menor tiempo restante" >}}
- Mejora de más corto primero.
- Los **tiempos de ejecución se deben conocer de antemano**.
- Cuando llega un nuevo proceso:
  - Su tiempo se compara con el tiempo restante del actual
  - Si el nuevo proceso necesita menos tiempo, se le quita la CPU
- **Apropiativo**
- Da buen servicio a los procesos cortos.

<!-- TODO: diagrama menor tiempo restante, 31-10-2023 -->
{{< /block >}}

### Sistemas interactivos

{{< block "Turno circular (Round Robin)" >}}
> FIFO apropiativo

- **Apropiativo**: uso de quantums para cada limitar el tiempo de CPU de cada
  proceso.
- Procesos en una **cola**: cuando se bloquee o termine va al final de esta. Se
  selecciona el proceso del principio.
{{< /block >}}

{{< block "Prioridad" >}}
- Se asigna una **prioridad a cada proceso**.
- Se ejecuta el proceso listo de mayor prioridad.
- **Apropiativo**

Para evitar que los procesos de mayor prioridad acaparen todo:

- A cada quantum se le baja la prioridad
- Si ya no es el proceso de mayor prioridad, se produce un cambio de contexto.

### Asignación dinámica

- Procesos con mucha E/S: mayor prioridad
- Asignar $\frac{1}{f}$, donde $f$ es el porcentaje de uso del quantum.
  - Mucha CPU, menos prioridad
  - Poca CPU, más prioridad

### Clases de prioridad

- **Múltiples colas**: Agrupación de procesos en clases de la misma prioridad.
- Uso de turno circular (_Round-Robin_) dentro de cada clase.
- Las clases se deben poder ajustar dinámicamente.

<!-- TODO: diagrama 31-10-2023, 2-42 página 157 -->
{{< /block >}}


{{< block "Más corto después" >}}
- Adaptación del más corto primero para sistemas interactivos
- Estimación del tiempo en base a ejecuciones anteriores:

$$
\begin{align*}
  T_1 \\; =& \\; T_{\text{inicial}} \hspace{2cm} \text{No hay más datos} \\\\
  T_2 \\; =& \\; \alpha T_1 + (1 - \alpha) t_1 \\\\
  \vdots \\\\
  T_n \\; =& \\; \alpha T_{n-1} + (1 - \alpha) t_{n-1}
\end{align*}
$$

Donde $T_n$ es el tiempo estimado en la ejecución $n$, $t_n$ es el tiempo real
medido y $\alpha \in [0, 1]$ es el factor de envejecimiento.

- $\alpha \rightarrow 0$: se le da más importancia a la última medida.
- $\alpha \rightarrow 1$: se le da más importancia a la estimación.

En especial, esto es sencillo de implementar cuando $\alpha = 0.5$: se suma el
nuevo valor a la estimación y se divide entre dos (un desplazamiento de bit a la
derecha).

Si se expande la tercera expresión:

$$ T_3 = \alpha T_2 + (1-\alpha) t_2 = \alpha^2 T_1 + \alpha (1-\alpha) t_1 + (1-\alpha) t_2 $$

Se puede ver que las medidas anteriores van teniendo cada vez menos importancia.
{{< /block >}}

-----------------------------------------------------------

{{< block "Garantizada" >}}
- Con $n$ usuarios o procesos: $\frac{1}{n}$ de tiempo de CPU
- Llevan unas estadísticas del proceso: nº de fallos caché, nº de ejecuciones,
  tiempo CPU...
- Esto se hace por hardware, usando los registros en procesadores que lo
  soporten.
{{< /block >}}

{{< block "Sorteo" >}}
- Otra forma de asignar prioridades, pero de una forma más justa: garantiza que
  todos tendrán algún tiempo de CPU (si el RNG es bueno).
- Se asignan **boletos a un proceso**. Será más probable elegir un proceso con
  más boletos.
- Capacidad de **pasar boletos** a otros procesos.
{{< /block >}}

{{< block "Partes equitativas" >}}
Se asigna una fracción de la CPU a cada usuario, que puede depender del número
de procesos que tenga.
{{< /block >}}

## Planificación de hilos


{{< block "Hilos nivel usuario" >}}
<!-- TODO: figura nivel usuario 2-11-2023 -->
1. El kernel selecciona un proceso
2. El _runtime_ selecciona un hilo

Resultado: `A1 A2 A1 B1 B3 B4`  
No puede ocurrir: ~~`A1 B1 A2 B3 B4`~~

- El SO solo planifica procesos
- Cada hilo tiene un ID local
- Planificadores específicos para cada aplicación
{{< /block >}}

{{< block "Hilos nivel kernel" >}}
<!-- TODO: figura nivel kernel 2-11-2023 -->
Posible resultado: `A1 A2 A1 B1 B3 B4`  
También posible:   `A1 B1 A2 B3 B4 A1`

- El kernel selecciona un hilo sin importar el proceso.
- **Conmutar entre hilos de procesos distintos es más costoso**: se puede tener
  en cuenta para la planificación.
- Si un hilo se bloquea, no afecta al resto del proceso.
{{< /block >}}

<!-- TODO: llamadas al sistema equivalentes en Windows -->
