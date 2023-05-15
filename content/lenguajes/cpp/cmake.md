---
title: CMake
description: >-
    CMake es una de las _build tools_ más utilizadas para proyectos C++.
date: 2021-08-05
weight: 3
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

Lo que todo proyecto debe de tener (por convención principalmente porque
igualmente funcionará si no lo incluimos) es una versión mínima de _CMake_ :

```cmake
cmake_minimum_required(VERSION XX [FATAL_ERROR])
```

Después de añadir esto, podemos declarar nuestro proyecto:

```cmake
project(
      <nombre>
      [VERSION <versión>]
      [DESCRIPTION <descripción>]
      [LANGUAGES <lenguajes>]
      [HOMEPAGE_URL <url>]
)
```

- `VERSION`: Guarda la versión del proyecto y la guarda en una variable llamada
  `<nombre>_VERSION`, pero también se puede usar PROJECT_VERSION.
- `LENGUAGES`: C/CXX (por defecto), Fortran, ASM, CUDA, CSharp, SWIFT.

Y para comenzar con un ejemplo básico, comenzaremos por un ejecutable sencillo:

```cmake
add_executable(<nombre> [<sources>])
```

El proceso de compilación es bastante sencillo, en recomendable en primer lugar
crear una carpeta específica para guardar los archivos generados automáticamente
por _CMake_. Normalmente, a esta carpeta se la llama `build`.

```sh
mkdir build
```

Ahora, podemos realizar la misma operación (la configuración de _CMake_ o la
generación del _Makefile_ ) de diferentes formas, usando cualquiera de estos
comandos:

```sh
cmake <dirección_del_cmakelists> # Desde build
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
cmake --build <dirección_donde_compilar>
```

# Comentarios

Podemos hacer comentarios para clarificar nuestro código CMake. Creo que solo
pueden ser de una línea:

```cmake
# Esto es un comentario
```

# Mostrar mensajes

Para mostrar información al usuario, al desarrollador, etc, podemos usar lo
siguiente:

```cmake
message([OPCIONES] <mensaje>)
```

- `FATAL_ERROR`: Informa de un error y termina la configuración
- `SEND_ERROR`: Solo informa de un error
- `WARNING`
- `STATUS`: Indica el estado actual, importante para el usuario
- `VERBOSE`: Indica el estado, pero no interesa mucho
- `DEBUG`: Mensaje que interesa al desarrollador
- `CHECKS`: cmake.org/cmake/help/...

# Variables

Las variables en CMake funcionan igual que en cualquier otro lenguaje de
programación: no se pueden repetir, tienen un alcance...

```cmake
set(<nombre> <valores> [PARENT_SCOPE])
```

`PARENT_SCOPE`: indica que el alcance de la variable es uno anterior al actual.
Para obtener el valor de la variable, se escribe entre `${<nombre_variable>}`.
Además de esto, podemos añadirle lo siguiente para que el valor se guarde en
caché y pueda usarse entre varios CMakeLists.txt, como una variable global.

```cmake
set (<nombre> <valores> CACHE <tipo> "<descripción>" [FORCE])
```

- `FORCE`: es para sobrescribir aquella variable con el mismo nombre que ya ha
  sido guardada.
- Tipo:
    - `BOOL`: `ON`/`OFF`
    - `FILEPATH`: a un archivo. En CMake GUI se muestra un explorador de
      archivos.
    - `PATH`: igual que el anterior pero la dirección es a una carpeta.
    - `STRING`: guarda texto.
    - `INTERNAL`: igual que el anterior, pero esta es la que se utiliza para
      guardar datos entre varios CMakeLists.txt. Además, no aparece en CMake
      GUI.

Como punto final, también se pueden establecer variables del entorno desde
CMake.

```sh
set (ENV{<nombre>} [<valor>])
```

Si el valor está vacío, se borra la variable del entorno.

## Algunas variables que nos ofrece CMake

- `CMAKE_SOURCE_DIR`: Path a la carpeta base de source
- `CMAKE_CURRENT_SOURCE_DIR`: Path del CMakeLists.txt actual
- `PROJECT_SOURCE_DIR`: source del proyecto actual
- `CMAKE_BINARY_DIR`: Path a donde compilas
- `CMAKE_CURRENT_BINARY_DIR`: Path actual de la compilación
- `PROJECT_BINARY_DIR`: Path de compilación para el proyecto actual

## Operaciones con variables

Con el siguiente método podemos hacer operaciones matemáticas con variables:

```cmake
math(EXPR <output_var> <mat_expresión> [FORMATO])
```

`FORMATO`: `HEXADECIMAL`, `DECIMAL`

# Opciones

Existen unas "variables" booleanas (`ON`/`OFF`) especiales que podemos declarar,
llamadas opciones. Estas son especiales porque el usuario puede modificarlas
desde la línea de comandos o CMake GUI.

```cmake
option(<nombre> “<descripción>” [<valor>])
```

Si no damos ningún valor, por defecto estará desactivada (OFF). El usuario puede
cambiar su valor usando la flag `-D<nombre_variable>=<valor>`, o bien
sobreescribiéndola:

```cmake
set(<nombre> <valor> CACHE BOOL "" FORCE)
```

# Listas

[CMake docs](https://cmake.org/cmake/help/latest/command/list.html)

# Estructuras de control

## Condicionales

En muchos casos, es necesario tomar decisiones: si compilar esto, si unirlo con
lo otro... Para ello tenemos la siguiente estructura:


```cmake
if(<condición>)
    <código>
eleeif(<condición>) # Opcional, puede ser repetido
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
- `COMMAND “<comando>”`
- `TARGET “<nombre>”`
- `DEFINED <nombre>|CACHE{<nombre>}|ENV{<nombre>}`
- `<variable>|<string> IN_LIST <variable>`

> Más información: <cmake.org/cmake/help/...>

## Bucles

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
flujo. `<elemento>_<pos>?`

# Targets

Los _targets_ son el propósito de CMake en general: los ejecutables, librerías,
binarios... Estos se crean con `add_executable()` y `add_library()`: (imported
targets???)

```cmake
add_executable(<nombre> [<sources>])
add_library(<nombre> TIPO [<sources>])
```

TIPO: `SHARED`, `STATIC`, `MODULE` (plugin cargado en tiempo de ejecución) En
ambos casos los sources son opcionales porque podemos añadirlos de la siguiente
forma: `target_sources(<nombre> TIPO <sources>)`

- `PUBLIC`: se añaden a todo
- `PRIVATE`: solo se añaden al _target_ , no a las dependencias
- `INTERFACE`: solo para las dependencias

## Alias

Da a la libraría un `ALIAS` para ser utilizado en contextos _read-only_

```cmake
add_library(<alias_name> ALIAS <target>) # Por convención: alias::name
```

## Un truco para cargar muchos sources

Cuando tenemos muchos archivos fuente, puede que no sea buena idea escribirlos
todos a mano en CMake. Lo que podemos hacer, en cambio, es, si los tenemos
ordenados en sus respectivas carpetas, podemos buscarlos por su extensión:

```cmake
file(GLOB <output_var> <extensiones>)
```

## Añadir los include

Este es el equivalente a hacer -I en un compilador GNU:

```cmake
target_include_directories(<nombre> TIPO <include_paths>)
```

- `PUBLIC`: se añaden a todo
- `PRIVATE`: solo se añaden al _target_ , no a las dependencias
- `INTERFACE`: solo para las dependencias

## Enlazar librerías

Este es el equivalente a hacer -L -l en un compilador GNU:

```cmake
target_link_libraries(<nombre> <librerías>)
```

Las librerías que incluyamos aquí ha debido ser creada por `add_library()` o ser
importada. Además, se le puede dar una dirección completa a un
`.lib`/`.dll`/`.a`/`.so`

# CMake a C++

CMake nos ofrece la posibilidad de modificar nuestro código C++. Esto puede ser
útil para tener en cuenta la versión del código y otros aspectos.

```cmake
configure_file(<input_file> <output_file> [COPYONLY][@ONLY])
```

Básicamente, copia el archivo de entrada (normalmente de extensión `.in`) en uno
de salida sustituyendo el nombre de las variables (`@<var>@` o `${<var>}`) por
su valor en el archivo de entrada. Recuerda añadir el archivo resultante al
includepath (se genera en $ `{CMAKE_CURRENT_BINARY_DIR}`)

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

# Trabajar con proyectos grandes

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

`OPTIONAL`: No da error al no encontrarse el archivo.

Esta instrucción funciona igual que los #include de C/C++, simplemente añaden
código al CMakeLists.txt. Es útil cuando tienes partes comunes entre varios
CMakeLists pero solo quieres escribir el código una vez.

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

# Configurando más

## Tipo de ejecutable

En algunos casos, queremos configurar cómo será nuestro ejecutable: si debe de
guardar los símbolos necesarios para usar un _debugger_ , cuanto de optimizado
debe estar, etc. Para esto, cmake nos ofrece las siguientes opciones: usar la
flag `MAKE_BUILD_TYPE=<tipo>` o bien sobrescribir este valor en la variable
llamada `CMAKE_BUILD_TYPE`. Estas son las opciones:

- Release: -O3 -DNDEBUG
- Debug: -g
- RelWithDebInfo: -O2 -g -DNDEBUG
- MinSizeRel: -Os -DNDEBIG
- -O0: optimizado para el tiempo de compilación (default)
- -O1/-O: optimizado para tiempo de ejecución y tamaño del binario
- -O2: -O1++
- -O3: -O2++
- -Os: optimizado para el tamaño del binario
- -g: guarda información para GDB (debbugger)

# Más (TODO)

- Añade opciones al compilado: `target_compile_options(<target> <options>)`
- Manejar archivos: `file(<READ/WRITE/APPEND> <filename> <var>)`
- `target_compile_features`
- Instalar
- Exportar
- Config.cmake
- `find_library()`
- `find_package()` policy
