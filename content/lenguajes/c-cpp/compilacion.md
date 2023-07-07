---
title: Instalación y compilación
description: >
    Guía de como instalar un compilador de C/C++. También se aportan algunas
    directrices de compilación de librerías así como su importación.
date: 2021-07-30
weight: 2
---

{{< block "Nota" >}}
El proceso de compilación para C y C++ es prácticamente idéntico.
{{< /block >}}

# Instalación

Se debe instalar el determinado compilador para la plataforma. Si estás
desarrollando en Windows, lo más común es instalar un editor especializado en
C/C++ que ya tenga incorporado el compilador. La opción más popular y recomendada
de Microsoft es [Visual Studio]. Alternativamente puedes usar [`MinGW`], que
emula el comportamiento de un compilador de Linux.

Si instalas MinGW debes añadirlo a la variable PATH (se instala por defecto en
`C:/MinGW` y se debe de añadir su carpeta `bin` -> `C:/MinGW/bin`).

En Linux existen dos compiladores populares, [`gcc`] (_GNU C Compiler_)
y [`clang`] (_C Language_). Este último es más reciente y pretende ser
totalemente compatible con `gcc`, utilizando como backend [LLVM].

El compilador de C y C++ de GCC y MinGW es `gcc` y `g++` respectivamente; y el
de clang es `clang` y `clang++`.

Para los siguientes ejemplos se usará `gcc`y `g++` (aunque las opciones
y parámetros sean prácticamente las mismas) dado que también es compatible con
clang.

[Visual Studio]: https://visualstudio.microsoft.com/es/
[LLVM]:          https://llvm.org/
[`MinGW`]:       https://sourceforge.net/projects/mingw/
[`clang`]:       https://clang.llvm.org/
[`gcc`]:         https://gcc.gnu.org/

# Compilación básica

```sh
gcc main.c   -o compilado.exe
g++ main.cpp -o compilado.exe
```

Se le pasan los nombres de los archivos de código fuente (`main.cpp` o `main.c`)
y para especificar el nombre del ejecutable con el parámetro `-o`
(`compilado.exe`).

También se puede generalizar y especificar un patrón como `*.cpp` o `src/*.cpp`.

<!-- TODO?: versión de C -->

# Versión de C++

Para especificar qué versión estamos usando se usa `-std` y (en el momento de
escribir esto) hay las siguientes opciones:

- `-std=c++11`
- `-std=c++14`
- `-std=c++17`
- `-std=c++20`
- `-std=c++23` (con poco soporte actualmente)

# Includes

Podemos usar cabeceras (de extensión `.h` o `.hpp`) añadiéndolas en el código
simplemente:

```cpp
#include <cabecera.h>
#include "cabecera.h"

#include <cabecera.hpp>
#include "cabecera.hpp"
```

Y si tenemos la librería dentro de un paquete o subpaquete, no hay nada más que
hacer que especificar en dónde se encuentra:

```cpp
#include "paquete/cabecera.h"
// Y variantes
```

Sin embargo, esto no es muy óptimo si la estructura del proyecto es un poco más
complicada. Por ese motivo, se le puede indicar al compilador en qué directorios
buscar.

```sh
gcc -Ipaquete main.c   -o compilado.exe
g++ -Ipaquete main.cpp -o compilado.exe
```

Por tanto, se puede simplemente especificar:

```cpp
#include "cabecera.h"
// Y variantes
```

# Errores y Warnings

Se recomiendan los siguientes argumentos para configurar los warnings y errores
que genera el compilador:

- `-Wall`: todos los warnings
- `-Wextra`: aún más warnings
- `-Wconversion -Wsign-conversion`: warnings por conversión de datos
- `-Weffc++`: <<C++ Effectivo>>, busca problemas comunes
- `-Werror`: trata los warnings como errores, es decir, no compila

# Debug y Release

Por ahora, para la configuración _debug_ compila con información de depuración
usa la opción `-g` o `-ggdb` si usas GDB.

Y para _release_ usa `-O2 -DNDEBUG`.

# Código objeto

Cuando se trabaja con proyectos grandes, los tiempos de compilación se pueden
volver bastante elevados. Por eso mismo, se compila cada archivo de código
fuente a su propio binario (código objeto) y este solo se recompilará si se le
hace algún cambio. De esta forma, se ahorra tener que recompilar siempre los
mismos archivos que no cambiaron y que ya estaban compilados de iteraciones
anteriores.

Esto se consigue con la opción `-c`, que compila y ensambla pero no llama al
linker:

```sh
gcc -c <src>.c
g++ -c <src>.cpp
```

Por defecto, el nombre del archivo de salida será de `<src>.o`.

Estos archivos se pueden enviar directamente al compilador como si fuese código
fuente normal, por ejemplo:

```sh
gcc main.o suma.o resta.o -o mates.exe
g++ main.o suma.o resta.o -o mates.exe
```
# Crear una librería estática

Una librería estática es simplemente un archivo `.zip` que contiene el código
objeto ya precompilado. Este se añade al ejecutable final directamente, por
tanto, este será independiente del archivo de la librería: hacen un programa más
manejable, un solo archivo.

Primero debemos compilar a código objeto y luego usar la herramienta `ar` para
crear dicho `.zip`.

```sh
gcc -c <source>.c
g++ -c <source>.cpp
ar sr lib<libraryname>.[lib|a] <sources>.o
```

Los argumentos de `ar` son:

- `sr`: indica que queremos crear un nuevo archivo con el código objeto dado
(ver más opciones ejecutando `ar`).
- `lib<libraryname>.[lib|a]`: es el nombre del archivo generado. En Windows debe
  de tener la extensión `.lib` y en Unix `.a`.
- Y continuación se listan los archivos del código objeto

# Crear una librería dinámica

Se enlazan al iniciar el programa o de forma dinámica, mediante código, haciendo
que el `.exe` sea más pequeño. Además, se pueden actualizar sin tener que
recompilar y usar para programas diferentes.

Compilar librería:

```sh
gcc -shared <sources>.c   -o <libraryname>.[dll|so]
g++ -shared <sources>.cpp -o <libraryname>.[dll|so]
```
# Usar librerías estáticas

Simplemente se puede listar el archivo de la librería como si fuese más código
fuente o código objeto:

```sh
gcc <sources> <libpath>/<library> -o <exe>
g++ <sources> <libpath>/<library> -o <exe>
```

Nótese que el orden es importante, lo siguiente dará un error:

```sh
gcc <librarypath>/<library> <sources> -o <exe> # ERROR
g++ <librarypath>/<library> <sources> -o <exe> # ERROR
```

Alternativamente se pueden usar los argumentos `-L` y `-l`:

- `-L`: especifica donde se almacena la librería (opcional)
- `-l`: especifica el nombre de la librería

```sh
gcc <sources> -L<librarypath> -l<libraryname> -o <exe>
g++ <sources> -L<librarypath> -l<libraryname> -o <exe>
```

Con estos parámetros **el nombre de la librería es importante**, porque si se le
da el argumento `-l<xxx>`, el compilador buscará en los directorios
especificados un archivo de nombre `lib<xxx>.a` o `lib<xxx>.so`.

Y nótese que esto tampoco funciona:

```sh
gcc -L<librarypath> -l<libraryname> <sources> -o <exe> # ERROR
g++ -L<librarypath> -l<libraryname> <sources> -o <exe> # ERROR
```

Se puede forzar usar una librería estática (a veces se confunden por las
dinámicas) con la opción `-static`.

# Usar librerías dinámicas

Aparte de poder abrirlas en tiempo de ejecución mediante código (gracias
a `dlopen()`), podemos añadirlas en tiempo de compilación. Esto resulta muy
similar al uso de librerías estáticas:

```sh
gcc <sources> -L<librarypath> -l<library> -o <exe>
g++ <sources> -L<librarypath> -l<library> -o <exe>

gcc <sources> <librarypath>/<library> -o <exe>
g++ <sources> <librarypath>/<library> -o <exe>

# Recuerda que estos no funcionan:
gcc -L<librarypath> -l<library> <sources> -o <exe>
g++ -L<librarypath> -l<library> <sources> -o <exe>
gcc <librarypath>/<library> <sources> -o <exe>
g++ <librarypath>/<library> <sources> -o <exe>
```

Pero esto aún puede dar algunos problemas. Esto se debe a que la librería
dinámica debe estar presente en el momento de ejecución, pero no hemos
especificado donde. Eso se haría de la siguiente forma:

```sh
gcc <sources> -Wl,-rpath,<runtime-library-path> -L<librarypath> -l<library> -o <exe>
gcc <sources> -Wl,-rpath,<runtime-library-path> <librarypath>/<library> -o <exe>

g++ <sources> -Wl,-rpath,<runtime-library-path> -L<librarypath> -l<library> -o <exe>
g++ <sources> -Wl,-rpath,<runtime-library-path> <librarypath>/<library> -o <exe>
```

Explicación:

- `-Wl,-rpath,<...>`: se manda el argumento `-rpath=<...>` al linker. Esto
  especifica el directorio relativo al ejecutable en donde se debe buscar la
  librería a la hora de ejecutar.
- `-L<...>`: especifica la dirección de la librería a la hora de compilar.
- `-l<...>`: especifica el nombre de la librería

