---
title: Setup
weight: 1

extra:
    show_toc: true
    show_details: true
---

Se debe instalar el determinado compilador para la plataforma. Para Windows se
suele usar `MinGW`.

Tras instalarlo y añadirlo a la variable PATH (se instala por defecto en
`C:/MinGW` y se debe de añadir su carpeta `bin` -> `C:/MinGW/bin`).

Para C o C++ se escribe g++ y el nombre del `.c` o `.cpp` en cuestión, se puede
añadir el parámetro `-o` para darle un nombre de salida.

```sh
$ g++ Nombre.cpp -o Salida.exe
```

Podemos usar cabeceras (de extensión `.h` o `.cpp`) añadiendolas en el código
simplemente:

```cpp
#include "Libreria.h"
```

Ahora para ejecutar, compilamos el programa principal como de constumbre, y se
generará un `.exe` completamente independiente del archivo `.h`/`.cpp` (pero no
en el caso de un `.dll`, dado que se necesita para el compilador).

Si tenemos la librería dentro de un paquete o subpaquete, no hay nada más que
hacer que especificar en dónde se encuentra:

```cpp
#include "paquete/Libreria.h"
```

La función main tiene que poder acceder a todos los demás paquetes, por lo que
tiene que estar situada en la raíz de estos.

Para compilar la librería, simplemente la compilamos como un programa normal de
C++, solo que su salida tendrá la extensión `.dll`:

```sh
$ g++ Libreria.h -o Libreria.dll
```

# Dynamic library
Se linkean al iniciar el programa, haciendo que el `.exe` sea más pequeño.
Además, se pueden actualizar sin tener que recompilar y usar para programas
diferentes.

Compilar libreria:

```sh
$ g++ -shared <sourcefiles>.cpp -o <libraryname>.dll/so
```

# Static library
Hacen un programa más manejable, un solo archivo.

1. Compilar a `.o`

```sh
$ g++ -c <sourcefiles>.cpp
```

2. Añadir a una libreria

```sh
$ ar rvs <final-libraryname>.lib/a <sourcefiles>.o
```

# Link
```sh
$ g++ <filename>.cpp -L<librarypath> -l<libraryname>
$ g++ <filename>.cpp <libraryname>.<libraryextension>
```
