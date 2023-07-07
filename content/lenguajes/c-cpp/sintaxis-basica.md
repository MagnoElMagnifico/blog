---
title: Sintaxis básica
description: >
    En este post se trata la sintáxis básica de C/C++: comentarios, sentencias
    y bloques.
date: 2023-07-07T21:17:54+02:00
weight: 3
---

# Comentarios

{{< block "Importante" >}}
El contenido de los comentarios se elimina durante la compilación, por lo que no
se tiene en cuenta para la sintaxis.
{{< /block >}}

Los comentarios, como ya se comentó en la [introducción], sirven para documentar
los programas:

- Explicaciones de código complicado, decisiones de diseño, etc
- Enseña al usuario cómo usar la librería / función / estructura / clase
- Permite desactivar temporalmente segmentos de código rápidamente

Son básicamente notas para los programadores. Más sobre los comentarios en
[learncpp.com].

En los lenguajes con una sintaxis similar a C, hay dos tipos de comentarios:
**de una línea** y **de bloque**.

Los **comentarios de una línea** empiezan por `//` el resto de la línea se
considerará comentario.

```c
// Esto es un comentario de una línea
int x = 0; // Puedo poderlo detrás de sintáxis válida
// pero no delante int x = 0;
```

Nótese el resaltado de sintaxis (colorines), para diferenciar lo que es
comentario (gris oscuro) y lo que no.

Por otro lado, los **comentarios de bloque** empiezan por `/*` y terminan por
`*/`. Se ignorará todo lo que haya de por medio.

```c
/*
    Esto es un comentario
    bastante largo
    porque tiene
    varias lineas
*/

int x = /* así mejor no, es difícil de leer */ 0;

/*
    Y esto es código desactivado:
    int x = 0;
*/
```

[introducción]: {{< relref "introduccion" >}}
[learncpp.com]: https://www.learncpp.com/cpp-tutorial/comments/

## Comentarios TODO

Estos comentarios se utilizan a modo de marcador, de tareas que están por hacer
(_TO DO_, por hacer).

```c
// TODO: Acabar de programar x cosa
```

De esta forma, se puede hacer una búsqueda rápida en los archivos del proyecto
por `// TODO:` para terminar las tareas sin terminar.

Algunos editores lo resaltan con otro color e incluso pueden listar todos los
pendientes, como una lista de tareas.


# Sentencias

Una sentencia es una instrucción del lenguaje de programación. Esta distinción
es importante, porque el lenguajes similares a C, **todas las sentencias deben
acabar por `;`**.

```c
sentencia1;
sentencia2;
sentencia3;
```

Al principio puede parecer un poco tonto, pero de esta forma, el compilador sabe
donde termina la instrucción y donde empieza la siguiente; dado que lo siguiente
es sintáxis válida:

```c
sentencia1; sentencia2; sentencia3;
```

# Bloques

Un bloque es una agrupación de sentencias. Serán necesarios para algunas
estructuras más adelante.

Para hacer un bloque, simplemente, coloca las sentencias entre llaves: `{ ... }`.

```c
{
    sentencia1;
    sentencia2;
    sentencia3;
}
```

Nótense los espacios antes de las sentencias. No son necesarios para que el
código funcione, pero sí lo hace mucho más sencillo de leer para el programador.
Esto se llama **identación** / **identar**.

Lo siquiente es un poco difícil de entender (y de ver si falta alguna llave):

```c
{
sentencia1; {
sentencia2;
{
sentencia3;
}
sentencia4;
}
}
```

Pero identado y ordenado es mucho más sencillo:

```c
{
    sentencia1;
    {
        sentencia2;
        {
            sentencia3;
        }
        sentencia4;
    }
}
```

Ahora, existen muchas formas de hacerlo:

- Con tabuladores
- Con 2 espacios
- Con 3 espacios
- Con 4 espacios
- Con 8 espacios (Linux Kernel)
- Poner la llave abierta (`{`) en una nueva línea
- Poner la llave abierta (`}`) con la línea anterior
- ...

Ya es preferencia personal, pero sobre todo intenta ser consistente con el resto
del código ya existente. Y si estás empezando, el ejemplo anterior (4 espacios)
es lo más común.


# Mínimo programa C/C++

{{< block "Recuerda" >}}
El archivo de código fuente de C tiene como extensión `.c` y el de C++ es `.cpp`.
{{< /block >}}

El mínimo programa C/C++ es el siguiente:

```c
int main() {}
```

No hace nada, pero permite compilar y comprobar que todo funciona.

Sin embargo, es más popular lo siguiente:

```c
#include <stdio.h>

int main() {
    printf("Hello World\n");
    return 0;
}
```

Y el equivalente en C++:

```cpp
#include <iostream>

int main() {
    std::cout << "Hello World" << std::endl;
    return 0;
}
```

Al ejecutarlo, debería mostrar el mensaje `Hello World` por la consola. En otros
posts continuaremos a entender la totalidad de esta sintaxis.

