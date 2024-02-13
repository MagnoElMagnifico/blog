---
title: Sistema de Archivos
description: >
    Cuando el proceso termina, se pierde todo lo que se había almacenado en
    memoria. Además, los discos solo permiten dos operaciones: lectura
    y escritura, lo que presenta muchos problemas. Para solucionarlo, el Sistema
    Operativo crea la abstracción del Sistema de Archivos.
date: 2024-01-06T23:56:17+01:00
weight: 4
math: true
---

# Necesidad de un sistema de archivos

Nótese que, una vez que un proceso termina, toda la memoria relacionada con él
(su espacio de direcciones o segmentos) se borran, lo que es inaceptable para
algunas aplicaciones (p.e.: Bases de Datos).

En general, tenemos 3 requisitos esenciales para el almacenamiento de
información a largo plazo:

- Debe ser posible almacenar una gran cantidad de información.
- La información debe persistir tras la terminación del proceso que la utilice.
- Múltiples procesos deben poder acceder a la información de forma concurrente.

Los discos son los dispositivos que se utilizan para este almacenamiento a largo
plazo, lo que permiten (entre otras) dos operaciones básicas:

- Leer un bloque
- Escribir un bloque

Lo que no es muy satisfactorio:

- ¿Cómo sabemos qué bloques están libres?
- ¿Cómo se gestionan los sistemas con muchas aplicaciones y usuarios?
- ¿Cómo evitamos que un usuario lea datos de otro?
- ¿Cómo se encuentra la información?
- ...

Además, ya se ha visto en la [introducción] que los dispositivos de E/S, en
especial los discos, son bastante complejos de gestionar.

# Archivo

Al igual que con los [procesos] y el [espacio de direcciones virtuales], el
Sistema Operativo soluciona todos estos problemas creando una nueva abstracción:
el **archivo**.

{{< block "Archivo" "var(--magno-blue)" >}}
Los **archivos** son **unidades lógicas de información** creados por los
procesos. Estos pueden leer archivos existentes y crear otros.

La información almacenada en cada uno es **persistente**: no se ve afectado por
la creación o terminación de procesos, solo desaparece cuando su propietario lo
elimina.
{{< /block >}}

Cuando un proceso crea un archivo, le da un **nombre**. La nomenclatura depende
un poco de cada sistema:

- Habitualmente se permiten símbolos hasta 255 caracteres.
- Unix diferencia mayúsculas de minúsculas, mientras que para MS-DOS, `ARCHIVO`,
  `archivo` y `arCHiVo` representa lo mismo.

Muchos sistemas aceptan nombres de archivos en dos partes, separadas por un
punto. La parte que va después del punto se llama la **extensión del archivo**
y normalmente indica el tipo de archivo: `.c` indica un archivo de código fuente
C, `.zip` un archivo comprimido o `.pdf` un archivo en Formato de Documento
Portable.

- En MS-DOS se permiten de 3 a 8 caracteres para el nombre del archivo
  y una extensión opcional de 1 a 3 caracteres.
- En Unix, la extensión también es opcional y puede ser de longitud variable.

Estas extensiones son solo convenciones, el Sistema Operativo no las impone. Son
más bien un recordatorio para el usuario o impuestas por algún programa en
concreto. Aun así, Windows es consciente de las extensiones: los usuarios
o procesos pueden registrar extensiones y especificar a qué programa
corresponden.

{{< dropdown "La nomenclatura se hereda del formato que se use" >}}
- FAT-16 MS-DOS: Win95 Win98
- FAT-32: evolución de FAT-16
- NTFS MS-DOS: WinNT, Win2000, WinXP
{{< /dropdown >}}

{{< dropdown "Tipos de archivos" >}}
- **Archivos regulares**: contienen información del usuario
    - **Texto**: se usan distintos caracteres para marcar el final de la línea
      y diferentes formatos para codificar el texto. El más común es UTF8.
    - **Binarios**: tienen una estructura interna que los programas utilizan. Un
      campo muy común es el número mágico, que indica el tipo de archivo que es.
- **Directorios**: sistemas de archivos para dar una estructura a los archivos
- **Archivos especiales de caracteres**: se relacionan con dispositivos E/S en serie
- **Archivos especiales de bloque**: se usan para modelar discos
{{< /dropdown >}}

{{< dropdown "Acceso a archivos" >}}
Los primeros sistemas solo proporcionaban **acceso secuencial**, sin posibilidad
de saltar datos; aunque sí que podían rebobinarse para leerlo las veces
necesarias. Esto se debe al uso de cintas magnéticas en el pasado.

Hoy en día, en cambio, prácticamente todos los sistemas proporcionan **acceso
aleatorio** a los datos de un archivo (`seek`).
{{< /dropdown >}}

{{< dropdown "Atributos/Metadatos de archivos" >}}
El Sistema Operativo lleva registro de información sobre el archivo:

- Protección
- Contraseña
- Creador
- Propietario
- Hora de creación
- Hora del último acceso
- Tamaño actual
- Tamaño máximo
- Banderas (_flags_): oculto, sistema, sólo lectura, binario, temporal, etc
- ...
{{< /dropdown >}}

{{< keyvalue title="Llamadas al sistema para el manejo de archivos" fill=true >}}
-% `create` :% Creación de un archivo vacío dados algunos atributos.
-% `delete` :% Borra el archivo dado.

-% `open` :%
Antes de usar un archivo se debe abrir, para que el SO haga las
preparaciones necesarias; como llevar los atributos a memoria para su rápido
acceso y actualizar la tabla de procesos.

-% `close` :%
Una vez terminado el trabajo con el archivo, se debe cerrar para que el SO
libere recursos.

-% `read` :%
Leer un determinado número de bytes del archivo desde la posición actual en el
archivo y la dirección de memoria de dónde colocarlos.

-% `write` :%
Escribir datos en la posición actual del archivo.
- Si a continuación hay datos, se sobreescriben con los nuevos
- Si la posición es el final, se aumenta el tamaño del archivo.

-% `append` :%
Agrega datos al final del archivo. Es un tipo de `write`.

-% `seek` :%
Reposiciona el apuntador dentro del archivo, para hacer lecturas o escrituras en
otro lugar.

-% `get attributes` y `set attributes` :%
Proporciona un forma a los procesos para obtener y modificar los metadatos de
un archivo. Un ejemplo, es el programa `make`, que comprueba los tiempos de
modificación; o el programa `chmod`, que modifica los permisos de un archivo.

-% `rename` :%
Permite dar un nuevo nombre. No es completamente necesaria: se puede copiar el
archivo, darle el nombre nuevo y borrar el anterior.
{{< /keyvalue >}}

Ejemplo de uso de estas llamadas:

```c
// Programa Linux para copiar archivos: copyfile input output
// NOTA: la verificación y reporte de errores es mínimo

#include <sys/types.h>
#include <fcntl.h>
#include <stdlib.h>
#include <unistd.h>

#define TAM_BUF     4096
#define MODO_SALIDA 0700 // rwx --- ---

int main(int argc, char** argv) {
    if (argc != 3) exit(1); // Error de sintaxis

    char buffer[TAM_BUFF];

    // Abrir los archivos
    int fd_input = open(arg[1], O_RDONLY); // Abrir input solo lectura
    if (fd_input < 0) exit(2);             // Error al abrir input

    int fd_output = creat(arg[1], MODO_SALIDA); // Crear output
    if (fd_output < 0) exit(3);                 // Error al abrir output

    // Bucle de copia
    while (1) {
        // Lee un bloque de datos al buffer
        int bytes_leidos = read(fd_input, buffer, TAM_BUF);

        if (bytes_leidos == 0) break;   // Fin de archivo
        if (bytes_leidos < 0)  exit(4); // Error

        // Escribe en el archivo de salida
        int bytes_escritos = write(fd_output, buffer, bytes_leidos);
        if (bytes_escritos <= 0) exit(5);
    }

    // Cierra los archivos
    close(fd_input);
    close(fd_output);
    exit(0);
}
```

Los enteros `fd_input` y `fd_output` son dos descriptores de archivos (_File
Descriptors_) que se usan para hacer referencia a cada archivo.

## Modos de un archivo

<!-- TODO: cambiar esta figura para hacer que se parezca a dispositiva 10 -->
{{<
    figure
    src = "../permisos-archivo.webp"
    caption = "Modos de un archivo"
>}}

Cada archivo tiene asociada una máscara de 16 bits, llamada la **máscara de
modo**. La llamada al sistema `chmod` permite cambiarla.

- Los 3 bits `rwx` de menos peso de permisos que aplican a otros usuarios.
- Los 3 bits `rwx` siguientes al grupo propietario.
- Los 3 bits `rwx` siguientes al usuario propietario.
- Los 3 bits siguientes indican permisos especiales.
- Los 4 bits de más peso indican el tipo de archivo (regular, plano, bloque,
  carácter o link)

Los tres octales (otros, grupo y propietario) aplican todo tipo de archivos,
pero tener un efecto diferente dependiendo si es un archivo normal o un
directorio. Puede consultar la tabla completa en la [ArchWiki].

- Lectura en directorios (`l`): permite listar su contenido.
- Escritura en directorios (`w`): permite crear, renombrar o borrar elementos. Require
  el bit `x`.
- Ejecución en directorios (`x`): permite acceder usando `cd`.

Los permisos especiales solo son aplicables a determinados tipos de archivos:

- **Sticky bit** (`S_ISVTX`): indica la compartición del segmento de código, por
  lo que debe mantenerse en memoria. Sin embargo, hoy en día no se usa para eso,
  sino para directorios. Significa que los elementos de ese directorio solo pueden
  ser renombrados o borrados por su propietario. Se muestra una `t` en el
  comando `ls`.
- **SGID** (`S_ISGID`): cambiar el EGID al ejecutar. Se muestra una `s` en el
  comando `ls`.
- **SUID** (`S_ISUID`): cambiar el EUID al ejecutar. Se muestra una `s` en el
  comando `ls`.

Si al usar `ls` aparece una `S` mayúscula, quiere decir que hay un error:
probablemente el archivo no es ejecutable. No tiene sentido activar el bit
`SUID` en un archivo no ejecutable.

El funcionamiento del usuario real y efectivo se explica en más detalle en el
siguiente apartado.

## Identificadores de Usuario y Grupo

Ya sabemos que un fichero ejecutable contiene todas las instrucciones y datos
necesarios para el programa. Este tiene también una máscara de modo. Cuando se
ejecuta, aparte del PID, tiene asociados dos identificadores de usuario y dos de
grupo. Son dos enteros positivos.

- `UID` y `EUID`: identificador de usuario real y efectivo respectivamente
- `GID` y `EGID`: identificador de grupo real y efectivo respectivamente

Vamos a centrarnos en el identificador de usuario, ya que para el identificador
de grupo es análogo.

- `UID`: es el usuario responsable de la ejecución del proceso
  (_quien ejecuta_)
- `EUID`: es el usuario que se usa para determinar el propietario de los
  ficheros creados, comprobar si tiene los permisos para acceder a determinados
  ficheros, permisos para enviar señales, etc.

Es decir: **el usuario real es quien ejecuta el programa** y **un proceso solo
puede trabajar con los archivos que pueda acceder el usuario efectivo**.

Vale, pero... ¿quién es el usuario efectivo? Esto lo determina por el bit
`SUID`. Si un ejecutable tiene el bit `SUID=1`, **el EUID pasa a ser el
propietario del programa**.

Además, mediante las llamadas al sistema `setuid` y `setgid` se puede cambiar el
EUID, pero su funcionamiento es algo particular. Para consultar los valores se
usan `getuid`, `geteuid`, `getgid`, `getegid`.

Tenga en cuenta que en la mayoría de los casos, `UID = EUID`.

{{< block "Funcionamiento de setuid" >}}
```c {linenos=false}
#include <fcntl.h>
salida = setuid(par);
```

1. El EUID del proceso que efectúa la llamada **es el superusuario**. Entonces,
   `UID = par` y `EUID = par`. El superusuario tiene permisos para acceder
   a cualquier cosa, incluso sin `SUID`. Nótese que también se cambia el usuario
   real.

2. Si EUID **no es el superusuario**. Se establece `EUID = par` si:
   - `par` es el UID del proceso (_yo_, `getuid`) {{< arrow >}} Yo voy acceder
     a mis archivos
   - `SUID = 1` y `par` es el UID del propietario del archivo {{< arrow >}} Me
     hago pasar por el propietario del programa (EUID por defecto cuando
     `SUID=1`).

Se devuelve 0 si se ha cambiado el EUID de forma exitosa o -1 si ha ocurrido
algún error. Puede consultarlo con `perror`.
{{< /block >}}

{{< block "Ejemplo" >}}
Considere el siguiente directorio:

```{linenos=false}
-rwxrwxr-x 1 user1 ... exe
-rw-rw---- 1 user1 ... mi_archivo.txt
-rw-rw---- 1 user2 ... otro_archivo.txt
```

Puede ver que el usuario 1 es propietario de un archivo ejecutable y un archivo
de texto, mientras que el usuario 2 solo es propietario de otro archivo de
texto.

Suponiendo que ambos usuarios están en grupos distintos, `user1` no puede
acceder a `otro_archivo.txt`, ni `user2` puede acceder a `mi_archivo.txt`. Por
otro lado, ambos pueden ejecutar `exe`.

Suponga que `exe` recibe un archivo por parámetro y lo imprime por pantalla.

Si `user1` ejecuta `exe mi_archivo.txt`, por tanto, el usuario real y efectivo
del proceso es `user1`. Cuando solicita abrir el archivo para leerlo, se le
concede el acceso dado que el **EUID tiene permisos**. Sin embargo, si `user1`
ejecuta `exe otro_archivo.txt`, el Sistema Operativo devuelve un error, porque
el **EUID no tiene suficientes permisos**.

Hasta aquí, no debería haber problema: esto es igual que antes, pero usando un
proceso.

Suponga ahora que se ha añadido el bit de `SUID` al ejecutable:

```{linenos=false}
-rwsrwxr-x 1 user1 ... exe
-rw-rw---- 1 user1 ... mi_archivo.txt
-rw-rw---- 1 user2 ... otro_archivo.txt
```

Si ahora `user2` ejecuta `exe mi_archivo.txt`, el **EUID pasa a ser el
propietario del archivo ejecutable: `user1`**. Como consecuencia, **el usuario
2 puede leer el archivo `mi_archivo.txt`**.

Además, tenga en cuenta que si `user2` ejecuta ahora `exe otro_archivo.txt`, se
le denegará el acceso, porque el EUID (`user1`) no tiene acceso
a `otro_archivo.txt`.
{{< /block >}}

{{< block "Ejemplo" >}}
```{linenos=false}
-rwsrwxrwx user1 ... exe
-rw------- user1 ... fichero1.txt
-rw------- user2 ... fichero2.txt
```

Suponga que el UID de `user1` y `user2` son 501 y 502 respectivamente.

```c
// Código del programa EXE
#include <fcntl.h>

int main() {
    int x, y, fd1,fd2;

    x = getuid(); y = geteuid();
    printf("\nUID=%d, EUID=%d\n", x, y);

    fd1 = open("fichero1.txt", O_RDONLY);
    fd2 = open("fichero2.txt", O_RDONLY);
    printf("fd1=%d, fd2=%d\n", fd1, fd2);

    setuid(x);
    printf("UID=%d, EUID=%d\n",getuid(),geteuid());

    fd1 = open("fichero1.txt", O_RDONLY);
    fd2 = open("fichero2.txt", O_RDONLY);
    printf("fd1=%d, fd2=%d\n", fd1, fd2);

    setuid(y);
    printf("UID=%d, EUID=%d\n",getuid(),geteuid());
}
```

Si lo ejecuta `user1`, naturalmente solo tiene acceso a sus archivos.

```{linenos=false}
UID=501, EUID=501   fd1=3, fd2=-1
UID=501, EUID=501   fd1=4, fd2=-1
UID=501, EUID=501
```

Si lo ejecuta `user2` con `SUID=0`. Igual que antes, solo tiene acceso a sus
archivos.

```{linenos=false}
UID=502, EUID=502   fd1=-1, fd2=3
UID=502, EUID=502   fd1=-1, fd2=4
UID=502, EUID=502
```

Pero si `user2` vuelve a ejecutar con `SUID=1`:

```{linenos=false}
UID=502, EUID=501   fd1=3, fd2=-1
UID=502, EUID=502   fd1=-1, fd2=4
UID=502, EUID=501
```
{{< /block >}}

# Directorios

Para llevar registro de los archivos, por lo general se permiten crear
**directorios** o **carpetas**, que en muchos sistemas **también son archivos**.

Gracias a la creación de directorios dentro de otros directorios, se crean las
jerarquías o **árboles de directorios**. Estas permiten al usuario organizar sus
archivos de una forma bastante natural, mediante agrupaciones. Además, se pueden
asignar determinados directorios a cada usuario para establecer permisos
y seguridad de los archivos.

<!-- TODO: figura 4-7 página 269 -->

{{< keyvalue title="Llamadas al sistema para el manejo de directorios" fill=true >}}
-% `create` :%
Crea un directorio vacío (`mkdir`)

-% `delete` :%
Borra un directorio vacío (`rmdir`)

-% `opendir` :%
Los directorios se pueden leer, para listar los archivos que contiene. El
proceso de abrir un directorio es análogo a abrir un archivo.

-% `closedir` :%
Análogo a cerrar un archivo.

-% `readdir` :%
Devuelve la siguiente entrada en un directorio abierto.

-% `rename` :%
Cambia el nombre al directorio. Análoga a renombrar un archivo.

-% `link` :%
En algunos sistemas, se permiten crear referencias simbólicas para que un
mismo archivo (o directorio) de pueda aparecer en varios directorios a la vez.

-% `unlink` :%
Elimina una entrada del directorio. Si el archivo solo se encuentra en el
directorio actual, se elimina del sistema de archivos.
{{< /keyvalue >}}

## Rutas

Cuando los archivos se organizan en una estructura arbórea, ya no se pueden
identificar únicamente por su nombre, sino que se utilizan **nombres de rutas**.

- **Ruta absoluta**: consiste en el camino de directorios desde el directorio
  raíz, hasta el archivo deseado.
- **Ruta relativa**: es el camino de directorios desde el **directorio de
  trabajo** actual hasta el archivo deseado.

{{< block "Directorio de trabajo" "var(--magno-blue)" >}}
Cada proceso tiene un directorio de trabajo sobre el que opera y que se usa para
las rutas relativas.

Por defecto, se usa el directorio heredado del proceso padre, pero existen
llamadas al sistema para cambiar este directorio.
{{< /block >}}

En las rutas relativas, habitualmente se puede hacer referencia al directorio de
trabajo actual con `.` y directorios superiores con `..`. Por ejemplo, la ruta
Unix `../../layouts/404.html` retrocede dos directorios y obtiene al archivo
HTML dentro del subdirectorio `layouts`.

La nomenclatura de las rutas también varía de un sistema a otro:

- Windows: `\`, p.e.: `C:\Programacion\blog\content\so\archivos.md`. `C` es la
  _unidad_ (dispositivo) y continuación aparece la ruta.
- Unix: `/`, p.e.: `/home/magno/Programacion/blog/content/so/archivos.md`. El
  directorio raíz se especifica con `/`.

# Implementación

Hasta ahora, se ha visto el funcionamiento de la abstracción creada por el
Sistema Operativo. Véase ahora cómo se lleva a cabo.

- ¿Cómo se almacenan los archivos y los directorios?
- ¿Cómo se administra del espacio del disco?

## Disco duro

Ya hemos visto en las [nociones de hardware] de la introducción las diferentes
partes de los discos. Vamos a profundizar un poco en su funcionamiento.

- Pueden haber varios discos apilados, e incluso varias unidades a la vez. La
  controladora debe poder gestionar todas las unidades (**búsquedas
  traslapadas**).
- Hay dos **cabezas electromagnéticas** por cada disco, una por cada superficie.
- Un **peine** contiene todas las cabezas y se desplaza hacia dentro y afuera
  de los discos. El disco rota para acceder al resto de datos.
<!-- separador -->
- Cada círculo concéntrico en un disco se llama **pista**.
- Cada porción de pista se llama **sector**. Es la unidad mínima de
  información que permite el hardware.
- Como es un círculo, en las pistas exteriores hay más sectores que en las
  interiores. Por eso se dividen en **cilindros**.

{{< block "Bloque de disco" "var(--magno-blue)" >}}
El bloque de disco, también llamado _cluster_, es un grupo de sectores.

Para reducir la sobrecarga de las estructuras de datos en el disco, el sistema
de archivos no se asigna sobre los sectores directamente, sino sobre un conjunto
de ellos que se considere eficiente. No tienen porqué estar todos seguidos, sino
que pueden abarcar más de una pista.

### Tamaño del bloque

Debe ser una potencia entera de 2, múltiplo del tamaño del sector. Existen casos
donde el bloque el del tamaño del sector. También se debería considerar el
tamaño de la página en sistemas paginados.

- **Grande**: [fragmentación] interna {{< arrow >}} Se desperdicia espacio
  (espacio de holgura, _slack space_). Los archivos usan bloques completos.
- **Pequeño**: un archivo puede tomar muchos bloques {{< arrow >}} Acceso más
  lento debido a la búsqueda del sector y las rotaciones mecánicas necesarias.

<!-- TODO: gráfica diapositiva 27 + explicación
eje x: tamaño de bloque
eje y:
  línea continua: uso de disco (100-% es el porcentaje de fragmentación)
  línea discontinua: velocidad (tiempo de acceso)
  (según la fórmula debería ser lineal, pero se ve así por la escala.)
-->

[fragmentación]: {{< relref "memoria#block-fragmentación" >}}

### Benchmarks

Según simulaciones de Tanenbaum, el tamaño promedio de los archivos es 2745 bytes.

- Bloques de 1 KiB: el 30% - 50% de los archivos caben en un bloque.
- Bloques de 4 KiB: el 60% - 70% de los archivos caben en un bloque. El 10% de
  los archivos más grandes son el 93% los bloques ocupados.

Este último es el recomendado a partir del 2007 por la IDEMA (Asociación
Internacional de Unidades, Equipo y Materiales de Disco).
{{< /block >}}

{{< block "Tiempo de lectura de un bloque" >}}
1. **Latencia** $L$: tiempo de colocar el peine electromagnético en la pista
   adecuada. No es un tiempo constante, depende de la posición actual del peine.
2. **Retraso de rotación**: tiempo que hay que esperar mientras el disco rota
   para colocar el peine sobre el sector adecuado. Depende de la velocidad de
   rotación del disco (rpm).
3. **Tiempo de transferencia de datos** $T$.

Por tanto: $$ L + \frac{t_{\text{rotación}}}{\text{ancho de banda}} + T $$

Se intentan meter todos los archivos en la misma pista para reducir la latencia.
{{< /block >}}

{{< block "Desajuste de cilindros" >}}
Al cambiar de pista, el disco sigue girando. Se tiene en cuenta el tiempo para
mover el peine de una pista a otra: donde caiga tras ese tiempo. De esta forma,
se pueden seleccionar sectores de forma más eficiente. Esto se llama el
**desajuste de cilindros**.

Por tanto, el sector 0 de cada pista está desfasado de la pista anterior.

#### Ejemplo de cálculo

Disco de $f = 10\\,000$ rpm (**frecuencia**), $300$ sectores/pista, tiempo de cambio de pista $800
\\; \mu s$.

Tiempo de una vuelta (**periodo**):
$$
  \frac{1}{f} = \frac{1}{10\\,000 \text{ rpm}} =
  \frac{1}{10\\,000 \times \frac{1 \text{ rpm}}{60 \text{ vuelta/segundo}}} =
  \frac{60}{10\\,000} \text{ segundo/vuelta} =
  6 \text{ms/vuelta}
$$

Tiempo que se tarda en recorrer un sector:
$$
  6 \text{ ms/vuelta} \times \frac{1 \text{ vuelta}}{300 \text{ sectores}} =
  20 \\; \mu s \text{/sector}
$$

Número de sectores que pasan durante el cambio de pista:
$$ 800 \mu s \times \frac{1 \text{ sector}}{20 \mu s} = 40 \text{ sectores} $$
{{< /block >}}

## Disco físico y lógico

{{< block "Disco físico" "var(--magno-blue)" >}}
Un **disco físico** es un dispositivo de almacenamiento permanente. Este opera
en modo bloque: contiene un array de bloques de tamaño fijo, y cada uno de ellos
posee un **número de bloque físico**.
{{< /block >}}

{{< block "Disco lógico" "var(--magno-blue)" >}}
Un **disco lógico** es abstracción que el SO ve como una secuencia lineal de
bloques accesibles aleatoriamente, cada uno identificado por un **número de
bloque lógico**. El driver traduce los números de bloque lógico a números de
bloque físico.

- Un sistema de archivos está contenido por completo en un disco lógico y un
  disco lógico solo puede contener un solo sistema de archivos.
- En sistemas Unix modernos, un disco lógico puede estar formado por varios
  discos físicos, lo que da soporte a sistemas de archivos grandes.
- En lugar de contener sistemas de archivos, un disco lógico puede contener un
  **área de intercambio** para el almacenamiento temporal de páginas de
  procesos.

<!-- - La jerarquía de archivos puede tener varios subárboles independientes, y cada
  uno puede contener a su vez su propio sistema de archivos. -->
{{< /block >}}

## Partición

{{< block "Partición" "var(--magno-blue)" >}}
Un disco físico se divide en **particiones físicas contiguas**, cada una
asociada a un disco lógico. Estas son divisiones independientes del disco y es
responsabilidad del administrador del sistema decidir qué contiene cada una.

Cada partición se comporta como un disco lógico; y como consecuencia, es posible
la coexistencia varios SO en el mismo ordenador: una partición para cada uno
(_dual boot_).
{{< /block >}}

Dentro de estas particiones se almacenan los **sistemas de archivos**. Estas
pueden tener diversos formatos, lo que implica una organización diferente dentro
la misma.

- `fdisk`: esta herramienta permite manipular particiones.
- `mkfs`: permite crear un sistema de archivos dentro de una partición.

{{< keyvalue title="Tipos de particiones" >}}
-% Partición primaria :%
Contiene un sistema de archivos. Este se puede identificar por su ID en la tabla
de particiones.

-% Partición extendida :%
Un disco duro puede contener una única partición extendida, pero esta se puede
subdividir en varias particiones lógicas.

-% Partición de arranque (_boot partition_) :%
Es una partición primaria que contiene el programa de arranque. Por ejemplo, en
Linux, sus archivos (kernel, initrd y GRUB) se montan en `/boot`.

- **BIOS Boot Partition** (BIOS BP): 
- **EFI System Partition**: igual que la anterior, pero se carga por el firmware EFI.

-% Partición del sistema :%
Partición primaria que contiene la carpeta del Sistema Operativo (_system
root_). En Linux se monta sobre `/`.
{{< /keyvalue >}}

Nótese que según la definición de Microsoft, la partición del sistema es la que
contiene el programa de arranque y la partición de arranque es la que contiene
el SO. Puede consultar todos los [IDs de las particiones].

La información sobre las particiones se almacena en la **tabla de particiones**,
que el Sistema Operativo lee antes que cualquier otra parte del disco. Existen
varias implementaciones dependiendo del sistema:

- Master Boot Record (MRB)
- GUID Partition Table (GPT). Parte del estándar de UEFI.
- Apple Partition Map (APM)

<!-- TODO: figura 4-9 página 274 -->

{{< block "Master Boot Record" "var(--magno-blue)" >}}
El sector 0 del disco se conoce como el _**Master Boot Record**_ (MBR).

### Tabla de particiones

Al final de este sector, se almacena una **tabla de particiones** que
proporciona las direcciones de inicio y fin de cada partición. Una de ellas
está marcada como **activa**.

Debido a la organización de la tabla de particiones, el MBR limita el tamaño
máximo del disco particionado a 2 TiB ($2^{32} \times 512$). Con el fin de
superar esta limitación, se realizó una transición a _GUID Partitions Table_
(GPT).

### Volume Boot Record

La BIOS accede al MBR y ejecuta unas instrucciones que almacena. Estas tienen
como objetivo localizar la partición activa y leer su primer bloque: el **bloque
de arranque** o _**Volume Boot Record**_ (VBR). Este contiene el **programa de
arranque** que cargará el kernel del SO de esa partición.

De esta forma, las instrucciones que se almacenen en el MBR serán más sencillas
y se podrán crear programas de arranque personalizados para cada sistema. Nótese
que toda partición inicia con un bloque de arranque, aunque no contenga ningún
Sistema Operativo.

### Superbloque

Contiene todos los parámetros clave acerca del sistema de archivos:

- Número mágico del tipo de sistema de archivos
- Número de bloques que contiene
- Y más información administrativa clave

Y a continuación de este pueden aparecer:

- Información sobre los bloques libres
- Lista de inodos
- Directorio raíz y el resto de archivos

### Fuentes
- [Master Boot Record](https://en.wikipedia.org/wiki/Master_boot_record), Wikipedia (04-02-2024 21:00)
- [Volume Boot Record](https://en.wikipedia.org/wiki/Volume_boot_record), Wikipedia (04-02-2024 23:00)
- [Bootloader](https://en.wikipedia.org/wiki/Bootloader), Wikipedia (04-02-2024 23:00)
- [System Partition](https://en.wikipedia.org/wiki/System_partition_and_boot_partition), Wikipedia (04-02-2024 21:30)
{{< /block >}}

{{< block "GUID Partition Table" "var(--magno-blue)" >}}
{{< /block >}}


## Implementación de archivos

Es necesario mantener un registro de la correspondencia de un archivo y de los
bloques de disco que contienen su información.

{{< block "Lista enlazada de bloques" >}}
Se mantiene una lista enlazada de bloques de disco, la primera palabra de cada
bloque se utiliza como apuntador al siguiente, el último bloque tiene un 0. El
resto del bloque es para los datos.

<!-- TODO: lista de bloques figura 4-11 página 277 -->

Problemas:

- La lectura secuencial no tiene problemas, pero **el acceso aleatorio puede ser
  muy lento**. Para leer el bloque $n$, necesariamente hay que acceder a los $n-1$
  bloques anteriores.
- **La cantidad de datos almacenados en el bloque ya no es potencia entera de
  dos**. Puede ser problemático, dado que los programas leen/escriben de bloque en
  bloque.
{{< /block >}}

{{< block "Tabla de asignación" >}}
Se solucionan los problemas de la lista enlazada tomando todos los apuntadores
y colocándolos en una tabla, llamada _File Allocation Table_ (FAT).

En la entrada correspondiente al bloque inicial del archivo se almacena la
dirección del siguiente bloque. En dicha entrada, se almacena la dirección del
bloque siguiente, y así sucesivamente. La cadena termina con un marcador
especial, como por ejemplo -1.

<!-- TODO: tabla de asignación enlazada figura 4-12 página 278 -->

- El bloque completo está disponible para los datos.
- La tabla FAT debe estar en memoria principal siempre.
- El acceso aleatorio es más sencillo dado que la tabla está en RAM, aunque aún
  se tiene que seguir la cadena.
- No escala bien para discos grandes: tablas muy grandes.
{{< /block >}}

{{< block "Inodos" >}}
Se lleva un registro de qué bloques pertenecen a cuál archivo es asociar cada
archivo a una estructura de datos conocida como **nodos-índice** (_inodes_).

Esta contiene los atributos del archivo y un array de las direcciones de los
bloques. Si hay más bloques de los que se pueden listar en el inodo, hay un
puntero a un **bloque de apuntadores** con el resto de direcciones.

<!-- TODO: inodo de ejemplo, figura 4-13 página 279 -->

- El inodo de un archivo solo se lleva a memoria cuando se abre.
- El inodo es más pequeño que una tabla FAT: esta se refiere a todos los
  archivos, mientras que el inodo describe uno.

Esta es la opción utilizada en Unix.
{{< /block >}}

## Implementación de directorios

La función principal del sistema de directorios es asociar cada nombre de
archivo a la información necesaria para localizar los datos. Muchos sistemas
también almacenan en la entrada de directorio de un archivo sus atributos.

<!-- TODO: expandir más -->

## Montaje de sistemas de archivos

En Windows, a cada disco lógico se le llama unidad y cada uno puede contener un
sistema de archivos con su propia jerarquía. Se identifican por una letra
mayúscula, donde normalmente `C` se refiere a donde está Windows instalado.

En Unix es posible tener varios subárboles independientes, cada uno con un
sistema de archivos completo. Sin embargo, **uno de ellos se configura para ser
el sistema de archivos raíz** y para que su directorio raíz sea el directorio
raíz del sistema. **Otros sistemas de ficheros se adjuntan a la estructura
montándolos sobre un directorio ya existente**, llamado **directorio de
montaje** o **punto de montaje**, gracias a la llamada del sistema `mount`.

Una vez montado, **el directorio raíz de la nueva estructura pasa a ser el
directorio de montaje**, y cualquier acceso se traduce al sistema de archivos
montado. Esto permanecerá visible hasta que se desmonte con `umount`.

```c
// Ver man mount(2)
#include <sys/mount.h>

// Sintaxis en Linux
int mount(const char* device, const char* mountdir,
          const char* filesystem_type,   // ext4, vfat, proc, tmpfs, ...
          unsigned long flags,
          const void *_Nullable data);
int umount(const char* device);

// Sintaxis en Unix clásico
mount("/dev/hda2", "/usr", 0);
umount("/dev/hda2");
```

<!-- TODO: figura de montaje, diapositiva 8 -->

Esta noción de montaje, permite ocultar al usuario los detalles de la
organización del almacenamiento: las rutas siguen siendo homogéneas y no es
necesario especificar ninguna unidad.

{{< block "Tabla de Montaje" "var(--magno-blue)" >}}
El kernel utiliza una **tabla de montaje** para llevar registro de los sistemas
de archivos montados. Se suele ubicar en `/etc/mtab`, en Linux `/etc/fstab`. Un
ejemplo de este último es el siguiente:

```{linenos=false}
# device    directory   type    options
/dev/hda1   /           ext2    defaults
/dev/hda2   /usr        ext2    defaults
/dev/hda3   none        swap    sw        # Zona de swapping
/dev/sda1   /dosc       msdos   defaults
/proc       /proc       proc    none
```

La primera línea es un comentario:

- La primera columna indica el dispositivo que se monta
- La segunda columna es el directorio de montaje
- La tercera columna es el tipo de sistema de archivos
- Y la última columna contiene diferentes opciones de montaje

Las opciones por defecto son:

- Se monta con permisos de lectura/escritura
- Se permite la ejecución de archivos ejecutables
- Se interpretan los bits `S_ISUID` y `S_ISGID`
- El sistema de archivos se considera como un dispositivo de bloque
- Todas las operaciones E/S se hacen de forma asíncrona
- Los usuarios normales no pueden montar el sistema de archivos

La última entrada, `proc` es una elegante interfaz con el espacio de direcciones
de cada proceso. Permite a un usuario leer y modificar el espacio de direcciones
de otro proceso y realizar tareas de control sobre el mismo, simplemente usando
la interfaz del sistema de archivos. Cada proceso se representa como un
subdirectorio nombrado con su PID. Estos no ocupan espacio en ninguna partición
física del disco.
{{< /block >}}

# Administración y optimización de Sistemas de Archivos

Hacer que el sistema de archivos es una cosa, que sea eficiente es otra. Véanse
ahora algunas ideas para mejorar el rendimiento.

Un parámetro fundamental para ello es el [tamaño del bloque], que ya se ha
comentado previamente.

## Registro de bloques libres

Problema muy similar a la [administración de memoria libre], por lo que se
utiliza el mismo tipo de estrategias: listas enlazadas y mapas de bits.

{{< block "Lista enlazada" >}}
Se utiliza una lista enlazada de bloques, donde cada **bloque almacena tantos
números de bloque libres como pueda**. Se mantiene uno de estos bloques en memoria
para cuando se necesite escribir algo, y cuando se terminen los bloques libres,
se lee el siguiente. Lo mismo cuando se borran archivos: se añaden, y en el
momento que se llene, se toma un bloque adicional y el anterior se escribe en el
disco.

<!-- TODO: figura 4-22 página 295 -->

Si un bloque es de 1 KiB, con 32 bits para poder representar su número; en un
bloque pueden caber $2^{10} / 4 - 1 = 2^8 - 1 = 255$ entradas, dado que el
último es un puntero al siguiente bloque de la lista.

Generalmente se usan los bloques libres para almacenar esta lista, por lo que el
almacenamiento sale gratuito.

Si hay muchos bloques libres contiguos, se puede almacenar la dirección del
bloque inicial y cuántos bloques libres hay a continuación, ahorrando aún más en
espacio.
{{< /block >}}

{{< block "Mapa de bits" >}}
Un disco con $n$ bloques requiere un mapa de $n$ bits, donde 1 indica que el
bloque está libre y 0 si está ocupado (o viceversa, depende del sistema).

Lógicamente, ocupa mucho menos espacio que la lista enlazada de bloques (si el
disco está vacío).
{{< /block >}}

Disco de 500 GB, bloques de 1 KiB
$\implies n_b = 500 \times 10^{9} / 2^{10} = 488\,281\\,250$ bloques.

- **Lista enlazada**: $2^{10} / 4 - 1 = 255$ entradas
  $\implies \lceil n_b / 255 \rceil = 1\\,914\\,829$ bloques, 0.3922% (si el disco está vacío).
- **Mapa de bits**: $n_b$ bloques $\implies n_b$ bits
  $\implies \lceil (n_b / 8) / 2^{10} \rceil = 59\\,605$ bloques, 0.0122%

[administración de memoria libre]:  {{< relref "memoria#administración-de-memoria-libre" >}}
[espacio de direcciones virtuales]: {{< relref "memoria#espacio-de-direcciones" >}}
[introducción]:                     {{< relref "introduccion#entradasalida" >}}
[nociones de hardware]:             {{< relref "introduccion#disco-duro" >}}
[procesos]:                         {{< relref "procesos#block-definición" >}}
[tamaño del bloque]:                {{< relref "#block-bloque-de-disco" >}}
[ArchWiki]:               https://wiki.archlinux.org/title/File_permissions_and_attributes_(Espa%C3%B1ol)
[IDs de las particiones]: https://en.wikipedia.org/wiki/Partition_type
