---
title: CMake
description: >-
    CMake es una de las _build tools_ más utilizadas para proyectos C++.
date: 2021-08-05
weight: 0 # temporal
---

# Introducción

_Make_ es un _build system_ , es decir, un programa que se utiliza para compilar
otros programas y hacer así la vida del desarrollador más sencilla. _CMake_ ,
sin embargo, genera automáticamente estos programas _Make_ con la ventaja de no
solamente poder exportarlo a _Make_ , si no a muchos otros _build system_ y
haciendo que sea fácil de compilar en diferentes plataformas.

Todo comienza con un archivo sencillo llamado `CMakeLists.txt`. En este archivo
se podrá escribir toda la configuración necesaria. Este archivo debe estar
situado en la base del proyecto para que este pueda acceder fácilmente al
_source_.

_CMake_ es _Case Sensitive_ (distingue mayúsculas de minúsculas), pero no le
importan los espacios en blanco. Sin embargo, en algunos casos se permite usar
tanto mayúsculas como minúsculas para hacer llamadas a las funciones de CMake.
Esto se debe a que anteriormente se hacía todo en mayúsculas. Actualmente, por
convención se suelen escribir los nombres de las variables en mayúsculas y las
funciones en minúsculas. Los _strings_ entre comillas dobles (`"`).


# `CMakeLists.txt` básico

Lo que todo proyecto debe de tener (por convención principalmente porque
igualmente funcionará si no lo incluimos) es una versión mínima de _CMake_ :

```cmake
cmake_minimum_required(VERSION <X.X.X> [FATAL_ERROR])
```

Después de añadir esto, podemos declarar nuestro proyecto:

```cmake
project(
      <nombre del proyecto>
      [VERSION <versión>]
      [DESCRIPTION <descripción>]
      [LANGUAGES <lenguajes>]
      [HOMEPAGE_URL <url>]
)
```

- `VERSION`: Guarda la versión del proyecto y la guarda en una variable llamada
  `<nombre>_VERSION`, pero también se puede usar PROJECT_VERSION.
- `LANGUAGES`: C/CXX (por defecto), Fortran, ASM, CUDA, CSharp, SWIFT.

Y para comenzar con un ejemplo básico, comenzaremos por un ejecutable sencillo:

```cmake
add_executable(<ejecutable> [<sources>])
```


# Compilación con CMake

El proceso de compilación es bastante sencillo, en primer lugar es recomendable
crear una carpeta específica para guardar los archivos generados automáticamente
por _CMake_. Normalmente, a esta carpeta se la llama `build`.

```sh
mkdir build
```

Ahora, podemos realizar la misma operación (la configuración de _CMake_ o la
generación del _Makefile_ ) de diferentes formas, usando cualquiera de estos
comandos:

```sh
cmake ..            # Desde build
cmake -S . -B build # Desde la raíz

# El comando en general es:
cmake -S <dirección_del_CMakeLists> -B <dirección_donde_compilar>
```

En algunos casos, da un error porque no conoce o no tenemos instalado el Make
por defecto que genera CMake. Para cambiarlo, usamos la bandera `-G
"<tipo_de_Makefile>"`. Para saber cuales tienes disponibles simplemente escribe
el comando `cmake -G`. Recuerda que si te ha saltado un error de este tipo y
luego cambias tu tipo de _Makefile_ no funcionará, porque no se sobrescribirá.
Deberás borrar todos los archivos generados y repetir el comando.

Una vez generado el Makefile, podemos utilizarlo como de costumbre o llamar a
CMake para que lo haga por nosotros:

```sh
cmake --build build
```


# Sintaxis básica
## Comentarios

Podemos hacer comentarios para clarificar nuestro código CMake. Creo que solo
pueden ser de una línea:

```cmake
# Esto es un comentario
```

## Variables

Las variables en CMake funcionan igual que en cualquier otro lenguaje de
programación: no pueden haber varias con el mismo nombre, tienen un alcance...

Para obtener el valor de la variable, se escribe entre llaves con un dolar
delante: `${<nombre_variable>}`.

```cmake
set(<nombre> <valores> [PARENT_SCOPE])
```

- `PARENT_SCOPE`: indica que el alcance de la variable es uno anterior al actual.

Además de esto, podemos añadirle lo siguiente para que el valor se guarde en
caché y pueda usarse entre varios CMakeLists.txt, como una variable global.

```cmake
set(<nombre> <valores> CACHE <TIPO> "<descripción>" [FORCE])
```

- `FORCE`: es para sobrescribir aquella variable con el mismo nombre que ya ha
  sido guardada.

Como punto final, también se pueden establecer variables del entorno desde
CMake.

```cmake
set(ENV{<nombre>} [<valor>])
```

Si el valor está vacío, se borra la variable del entorno.

{{< keyvalue title="Tipos de datos de la variables" >}}
-% `BOOL`     :% `ON`/`OFF`
-% `FILEPATH` :% Dirección a un archivo. En CMake GUI se muestra un explorador de archivos.
-% `PATH`     :% igual que el anterior pero la dirección es a una carpeta.
-% `STRING`   :% Guarda texto.
-% `INTERNAL` :% Igual que el anterior, pero esta es la que se utiliza para guardar
                 datos entre varios CMakeLists.txt. Además, no aparece en CMake GUI.
{{< /keyvalue >}}

### Algunas variables que nos ofrece CMake

En la [documentación de las variables] puedes encontrar una lista exhaustiva de
todas las variables. Estas son probablemente las más útiles.

{{< keyvalue title="Paths útiles" >}}
-% `CMAKE_SOURCE_DIR`         :% Path a la carpeta base de source
-% `CMAKE_CURRENT_SOURCE_DIR` :% Path del CMakeLists.txt actual
-% `PROJECT_SOURCE_DIR`       :% source del proyecto actual
-% `CMAKE_BINARY_DIR`         :% Path a donde compilas
-% `CMAKE_CURRENT_BINARY_DIR` :% Path actual de la compilación
-% `PROJECT_BINARY_DIR`       :% Path de compilación para el proyecto actual
{{< /keyvalue >}}

{{< keyvalue title="Compilador y flags" >}}
-% `CMAKE_C_COMPILER` y `CMAKE_CXX_COMPILER` :% Cambia el compilador por defecto
-% `CMAKE_BUILD_TYPE` :% Tipo de ejecutable generado: `Debug`, `Release`, `RelWithDebInfo`, `MinSizeRel`
-% `CMAKE_CXX_FLAGS_DEBUG` :% Flags para el compilador en configuración Debug
-% `CMAKE_CXX_FLAGS_RELEASE` :% Flags para el compilador en la configuración Release
-% `CMAKE_CXX_FLAGS_RELWITHDEBINFO` :% Flags para el compilador en la configuración RelWithDebInfo
-% `CMAKE_CXX_FLAGS_MINSIZEREL` :% Flags para el compilador en la configuración MinSizeRel
{{< /keyvalue >}}

[documentación de las variables]: https://cmake.org/cmake/help/latest/manual/cmake-variables.7.html

### Operaciones con variables

Con el siguiente método podemos hacer operaciones matemáticas con variables:

```cmake
math(EXPR <output_var> <mat_expresión> [HEXADECIMAL | DECIMAL])
```

## Opciones

Existen unas <<variables>> booleanas (`ON`/`OFF`) especiales que podemos
declarar, llamadas opciones. Estas son especiales porque el usuario puede
modificarlas desde la línea de comandos o CMake GUI.

```cmake
option(<nombre> "<descripción>" [<valor>])
```

Si no damos ningún valor, por defecto estará desactivada (OFF). El usuario puede
cambiar su valor usando la flag `-D<nombre_variable>=<valor>`, o bien
sobreescribiéndola:

```cmake
set(<nombre> <valor> CACHE BOOL "" FORCE)
```

## Listas

[CMake docs](https://cmake.org/cmake/help/latest/command/list.html)


## Estructuras de control
### Condicionales

En muchos casos, es necesario tomar decisiones: si compilar esto, si unirlo con
lo otro... Para ello tenemos la siguiente estructura:


```cmake
if(<condición>)
    <código>
elseif(<condición>) # Opcional, puede ser repetido
    <código>
else() # Opcional
    <código>
endif()
```

Disponemos de los siguientes operadores para realizar las condiciones (además de
contar con los típicos operadores lógicos AND, OR y NOT):

Comprueban si existen determinados elementos:

- `EXISTS "<filename>"`
- `IS_DIRECTORY "<filename>"`
- `COMMAND "<comando>"`
- `TARGET "<nombre>"`
- `DEFINED <nombre>|CACHE{<nombre>}|ENV{<nombre>}`
- `<variable>|<string> IN_LIST <variable>`

> Más información: <cmake.org/cmake/help/...>

### Bucles

En algunos casos queremos repetir ciertas operaciones, para ello podemos usar
estos bucles:

```cmake
foreach(<elemento> <items>)
    <código>
endforeach()

foreach(<elemento> RANGE [<start>] <end> [<step>])
foreach(<elemento> IN LIST <lista>)
```

Además de eso, podemos usar `break()` y `continue()` para controlar mejor el
flujo.

## Macros


## Trabajar con proyectos grandes

En algunos casos, nos encontraremos entre cientos y cientos de archivos para un
mismo programa, y para manejarlos todos desde solamente un CMakeLists.txt, este
se nos queda pequeño.

Para evitar eso, podemos declarar más de estos archivos y incluirlos a nuestro
CMakeLists.txt principal de la siguiente forma siempre y cuando estos se
distribuyan en subdirectorios:

```cmake
add_subdirectory(<path> [<build_path>])
```

Básicamente lo que hace es añadir un subdirectorio y ejecuta cualquier
CMakeLists.txt de este. Los targets declarados ahí se conservan, pero las
variables convencionales no. Recuerda guardarlas en caché si las necesitas.

Sin embargo, en algunos casos, no tenemos subdirectorios. En ese caso podemos
usar:

```cmake
include(<path> [OPTIONAL][RESULT_VARIABLE <var>])
```

- `OPTIONAL`: No da error al no encontrarse el archivo.

Esta instrucción funciona igual que los `#include` de C/C++, simplemente añaden
código al CMakeLists.txt. Es útil cuando tienes partes comunes entre varios
CMakeLists pero solo quieres escribir el código una vez.


# Mostrar información
## Mostrar el comando de compilación

En muchos casos, ayuda para depurar qué comandos se están ejecutando para
compilar. Esto se puede hacer con la opción `--verbose`.

```sh
cmake --build build --verbose
```

## Mostrar mensajes

Para mostrar información al usuario, al desarrollador, etc, podemos usar lo
siguiente:

```cmake
message([OPCIONES] <mensaje>)
```

- `FATAL_ERROR`: Informa de un error y termina la configuración
- `SEND_ERROR`: Solo informa de un error
- `WARNING`: Advertencia de un mal uso o posible problema
- `STATUS`: Indica el estado actual, importante para el usuario
- `VERBOSE`: Indica el estado, pero no interesa mucho
- `DEBUG`: Mensaje que interesa al desarrollador


# Configuración
## Cambiar el compilador

Por lo general, no nos suele importar qué compilador estamos usando; pero en
algunos casos hace falta. Para configurar eso, existen las variables
`CMAKE_C_COMPILER` y `CMAKE_CXX_COMPILER`.

No se recomienda fijarlas directamente en el archivo `CMakeLists.txt` con `set`
(en caso de que fuese necesario, es mejor hacerlo antes de la llamada
a `project`), sino pasarlas por línea de comandos:

```sh
cmake . -B build -DCMAKE_C_COMPILER=<compiler>
```

Alternativamente, puedes usar las variables de entorno `CC` para el compilador
de C y `CXX` para el compilador de C++.


## Tipo de ejecutable

En algunos casos, queremos configurar cómo será nuestro ejecutable: si debe de
guardar los símbolos necesarios para usar un _debugger_ , cuanto de optimizado
debe estar, etc.

Para esto, CMake nos ofrece la posibilidad de usar la variable
`CMAKE_BUILD_TYPE`. Los valores más típicos son los siguientes, aunque también
es posible añadir otros personalizados (como por ejemplo `Distribution`).

| Tipo             | Características                                    | Flags                               | Valor por defecto |
|------------------|----------------------------------------------------|-------------------------------------|-------------------|
| `Debug`          | Sin optimizaciones y con información de depuración | `CMAKE_<lang>_FLAGS_DEBUG`          | `-g`              |
| `Release`        | Optimizado y sin _asserts_                         | `CMAKE_<lang>_FLAGS_RELEASE`        | `-O3 -DNDEBUG`    |
| `RelWithDebInfo` | Optimizado pero con información de depuración      | `CMAKE_<lang>_FLAGS_RELWITHDEBINFO` | `-O2 -g -DNDEBUG` |
| `MinSizeRel`     | Optimizado por tamaño del ejecutable               | `CMAKE_<lang>_FLAGS_MINSIZEREL`     | `-Os -DNDEBUG`    |

Donde `<lang>` es `C` o `CXX`.

{{< dropdown "Flags de optimización del compilador" >}}
- `-O0`      : optimizado para el tiempo de compilación (default)
- `-O1`/`-O` : optimizado para tiempo de ejecución y tamaño del binario
- `-O2`      : `-O1` pero más rápido
- `-O3`      : `-O2` pero más rápido
- `-Os`      : optimizado para el tamaño del binario
- `-g`       : guarda información para el debbugger
{{< /dropdown >}}


## Escoger un estándar

```cmake
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED True)
```


# Targets

Los _targets_ son el propósito de CMake en general: los ejecutables, librerías,
binarios... Estos se crean con `add_executable()` y `add_library()`:

```cmake
add_executable(<target> [<sources>])
add_library(<target> <SHARED | STATIC | MODULE> [<sources>])
```

- `SHARED`: librería dinámica
- `STATIC`: librería estática
- `MODULE`: plugin cargado en tiempo de ejecución

En ambos casos los sources son opcionales porque podemos añadirlos de la
siguiente forma:

```cmake
target_sources(<target> <PUBLIC | PRIVATE | INTERFACE> <sources>)
```


## Un truco para cargar muchos _sources_

Cuando tenemos muchos archivos fuente, puede que no sea buena idea escribirlos
todos a mano en CMake. Lo que podemos hacer, en cambio, es, si los tenemos
ordenados en sus respectivas carpetas, podemos buscarlos por su extensión:

```cmake
file(GLOB <output_var> <extensiones>)
file(GLOB_RECURSE <output_var> <extensiones>) # Lo mismo, pero recursivo
```

Más [información sobre `file`].

[información sobre `file`]: https://cmake.org/cmake/help/latest/command/file.html

<!-- TODO: expandir -->


## Alias

Da a la librería un `ALIAS` para ser utilizado en contextos _read-only_:

```cmake
add_library(<alias_name> ALIAS <target>) # Por convención: alias::name
```


## Añadir los _includes_ a un _target_

Este es el equivalente a hacer `-I` en el compilador:

```cmake
target_include_directories(<target> <PUBLIC | PRIVATE | INTERFACE> <include_paths>)
```

- `PUBLIC`: se añaden a todo
- `PRIVATE`: solo se añaden al _target_ , no a las dependencias
- `INTERFACE`: solo para las dependencias


## Enlazar librerías a _targets_

Este es el equivalente a hacer `-l` en el compilador:

```cmake
target_link_libraries(<target> <librerías>)
```

Las librerías que incluyamos aquí ha debido ser creada por `add_library()` o ser
importada.


## Crear una librería estática y dinámica a la vez

Para evitar compilar de nuevo la librería, en primer lugar se crea una común
marcada como `OBJECT` y luego esta se enlazan para crear la librería estática
y dinámica.

```cmake
add_library(<main_target>   OBJECT <sources>)
add_library(<static_target> STATIC)
add_library(<shared_target> SHARED)

target_link_libraries(<static_target> PUBLIC <main_target>)
target_link_libraries(<shared_target> PUBLIC <main_target>)
```


## Importar y exportar _targets_

Para importar librerías y ejecutables ya creados como _targets_ (es decir, que
no necesitan compilación por parte de CMake) se usa la opción `IMPORTED`.

```cmake
add_executable(<target> IMPORTED)
add_library(<target> <SHARED | STATIC | MODULE> IMPORTED)
```

Y para decirle a CMake donde está la librería / el ejecutable se debe usar
`set_property()` de la siguiente forma:

```cmake
set_property(TARGET <target> PROPERTY IMPORTED_LOCATION "<path>/<file>")
```

Además, si se da el caso, es posible importar distintas configuraciones de la
mismo target:

```cmake
add_library(math STATIC IMPORTED GLOBAL)
set_target_properties(math PROPERTIES
  IMPORTED_LOCATION "${math_REL}"
  IMPORTED_LOCATION_DEBUG "${math_DBG}"
  IMPORTED_CONFIGURATIONS "RELEASE;DEBUG"
)
```

[referencia]: https://cmake.org/cmake/help/latest/guide/importing-exporting/index.html


## Instalar


# CMake a código

CMake nos ofrece la posibilidad de modificar nuestro código C++. Esto puede ser
útil para tener en cuenta la versión del código y otros aspectos.

```cmake
configure_file(<input_file> <output_file> [COPYONLY][@ONLY])
```

Básicamente, copia el archivo de entrada (normalmente de extensión `.in`) en uno
de salida sustituyendo el nombre de las variables (`@<var>@` o `${<var>}`) por
su valor en el archivo de entrada. Recuerda añadir el archivo resultante al
includepath (se genera en `${CMAKE_CURRENT_BINARY_DIR}`)

> `COPYONLY`: solo copia el contenido de un archivo al otro, no modifica su
> interior

`@ONLY`: solo modifica aquellas variables entre `@<var>@` porque en algunos
casos puede haber incompatibilidades.

Además, las líneas como `#cmakedefine <var> ...` se remplazarán con `#define
<var> ...` o `/* #undef <var> */` dependiendo de como actúa el valor de `<var>`
en un if.

Como punto final, si añadimos `#cmakedefine01 <var>`, se sustituirá por `#define
<var> 0` o `#define <var> 1`

<cmake.org/cmake/help/...>

# Librerías

Para incluir librerías en nuestro proyecto, CMake nos ofrece varias formas de
abordar esta situación:

```cmake
find_library(<var> <name> [<paths>])
find_library(
    <var>
    <name>|NAMES <names>
    [HINTS <paths>]
    [PATHS <paths>]
    [PATH_SUFFIXES <path_suffixes>]
    [DOC <doc>]
    [REQUIRED]
    [OTROS]
)
```

- `var`: es la variable que guarda el resultado de la operación. Si la librería
  no se ha encontrado el resultado es `<var>-NOTFOUND`.
- `name`: nombre o posibles nombres de la librería.
- `HINTS`, `PATHS`: Especifica los directorios donde buscar a parte de las
  localizaciones por default. `HINTS` son las que se buscan antes de las
  direcciones del sistema y PATHS es para después.
- `PATH_SUFFIXES`: Especifica subdirectorios adicionales.
- `DOC`: Documentación para la caché.
- `REQUIRED`: Lanza un error y termina la configuración cuando la librería no se
  encuentra.
- `OTROS`: <cmake.org/cmake/help/...>

```cmake
find_package(
    <name>
    [NAMES <names>]
    [<version>]
    [EXACT]
    [QUIET]
    [REQUIRED]
    [COMPONENTS <componentes>]
    [OPTIONAL_COMPONENTS <componentes_opcionales>]
    [MODULE]
    [CONFIG|NO_MODULE]
    [CONFIGS <configs>]
    [HINTS <paths>]
    [PATHS <paths>]
    [PATH_SUFFIXES <path_suffixes>]
    [OTROS]
)
```

Busca y carga la configuración de un proyecto externo. `<name>_FOUND` si se
encuentra el paquete.

- `EXACT`: Obliga que la versión sea la misma que la dada.
- `QUIET`: quita los mensajes informativos.
- `REQUIRED`: igual que el anterior, da un error si el paquete no se encuentra.

En el modo `MODULE`, CMake busca por un archivo llamado `Find<name>.cmake`.
Primero se busca en las direcciones de `CMAKE_MODULE_PATH`, después entre los
_find modules_ dados por la instalación de CMake. Si se encuentra este archivo,
se ejecuta: es responsable de encontrar el paquete, comprobar la versión y
mostrar mensajes acordes.

Si no se especifica la opción `MODULE`, CMake primero busca usando este modo
igualmente. Después, si no ha encontrado nada, continua otra vez usando el modo
`CONFIG`. El modo `MODULE` principalmente se usa cuando la librería no utiliza
CMake, por lo que tenemos que escribir el `Find<name>.cmake` por nosotros mismos
y sopesar las diferentes posibilidades. El modo `CONFIG` es el que deberíamos
utilizar cuando la librería sí soporta CMake.

Este modo (o también llamado `NO_MODULE`) intenta encontrar el archivo de
configuración, llamado `<name>Config.cmake` o `<lowercase_name>-config.cmake`
(por cada nombre dado). Una vez que se encuentra el archivo, se ejecuta y se
crea una variable en caché llamada `<name>_DIR` que guarda la dirección de la
carpeta del archivo, y `<name>_CONFIG` la dirección completa al archivo.
`CONFIGS` son los nombres adicionales del `paquete-config.cmake`

Un paquete de config consiste en un archivo de configuración, y opcionalmente en
un package version file.

Estas son las direcciones donde CMake busca estas librerías dependiendo de la
plataforma en la que se esté. La forma más fácil de decirle otra dirección
no-estándar es:

```cmake
set(CMAKE_PREFIX_PATH “<path>” CACHE PATH “” FORCE)

# W: Windows, U: Unix, A: Apple
# En todos los casos, el nombre es caseinsensitive

(W) <prefix>/ (W) <prefix>/(cmake|CMake)/ (W) <prefix>/<name>*/ (W)
<prefix>/<name>*/(cmake|CMake)/ (W/U)
<prefix>/<name>*/(lib/<arch>|lib*|share)/cmake/<name>*/ (W/U)
<prefix>/<name>*/(lib/<arch>|lib*|share)/<name>*/ (W/U)
<prefix>/<name>*/(lib/<arch>|lib*|share)/<name>*/(cmake|CMake)/ (U)
<prefix>/(lib/<arch>|lib*|share)/cmake/<name>*/ (U)
<prefix>/(lib/<arch>|lib*|share)/<name>*/ (U)
<prefix>/(lib/<arch>|lib*|share)/<name>*/(cmake|CMake)/ (A)
<prefix>/<name>.framework/Resources/ (A)
<prefix>/<name>.framework/Resources/Cmake/ (A)
<prefix>/<name>.framework/Versions/*/Resources/ (A)
<prefix>/<name>.framework/Versions/*/Resources/Cmake/ (A)
<prefix>/<name>.app/Contents/Resources/ (A)
<prefix>/<name>.app/Contents/Resources/Cmake/
```

- `https://cmake.org/cmake/help/latest/command/find_package.html#search-procedure`
- `https://cmake.org/cmake/help/latest/manual/cmake-packages.7.html`
- `https://cmake.org/cmake/help/latest/manual/cmake-developer.7.html`

# Git submodules

```cmake
# Download all the submodules

find_package(Git QUIET)

if (GIT_FOUND AND EXISTS "${PROJECT_SOURCE_DIR}/.git") # Update submodules as needed
    option(GIT_SUBMODULE "Check submodules during build" ON)

    if (GIT_SUBMODULE)
        message(STATUS "Submodule update")
        execute_process(
            COMMAND ${GIT_EXECUTABLE} submodule update --init --recursive
            WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
            RESULT_VARIABLE
            GIT_SUBMOD_RESULT
        )

        if (NOT GIT_SUBMOD_RESULT EQUAL "0")
            message(FATAL_ERROR
                "git submodule update --init -- recursive failed with ${GIT_SUBMOD_RESULT}, please checkout submodules")
        endif()
    endif()
endif()

# Check all submodules
if (NOT EXISTS "${PROJECT_SOURCE_DIR}/...")
    message(FATAL_ERROR "The ... submodule was not downloaded! GIT_SUBMODULE was turned off or failed. Please update submodules")
endif()
```

{{< todo >}}
# Más (TODO)

- Añade opciones al compilado: `target_compile_options(<target> <options>)`
- Manejar archivos: `file(<READ/WRITE/APPEND> <filename> <var>)`
- `target_compile_features`
- Instalar
- Exportar
- Config.cmake
- `find_library()`
- `find_package()` policy
{{< /todo >}}
