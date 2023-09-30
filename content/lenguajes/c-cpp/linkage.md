---
title: Linkage
description: TODO
date: 2023-07-18T14:52:08+02:00
weight: 0 # temporal
draft: true
---

{{< dropdown "Notas" >}}
- aplica esto a C?
- translation unit
{{< /dropdown >}}

{{< block "Definición" "var(--magno-blue)" "black" >}}
El _linkage_ de un identificador determina si otras declaraciones de este mismo
nombre se refieren al mismo objeto o no. Esto se comprueba durante el enlazado,
después de la compilación.

Es una propiedad de un identificador; entonces tanto variables, constantes
y funciones lo tienen.
{{< /block >}}

Tipos:

- **Sin linkage**: las variables locales no tienen linkage
- **Linkage interno**: dentro de una misma translation unit, pero no accesible
  por el resto. Por tanto, si en dos archivos dos variables tienen el mismo
  identificador, se tratarán de forma independiente.
- **Linkage externo**: accesible por otras translation units.

Motivos por lo que es útil el linkage interno:

- Asegurarse de que un identificador solo se puede usar en un archivo
- También para evitar colisiones de nombres

Cómo usar linkage externo:

- Se necesita una _forward declaration_ para que el compilador sepa que existe
y que tipo tiene dicho identificador y luego el linker lo enlace todo.

para una función
```c
// Implementación de la función
int suma(int a, int b) {
    return a + b;
}

// Forward declaration (en otro archivo)
int suma(int, int);
```
para una variable / constante

```c
// Definición de las variables
int g_x = 0;
extern const int g_y = 0;

// Forward declaration: sin valor inicial (en otro archivo)
extern int g_x;
extern const int g_y;
```

Nótese que `extern` tiene significados diferentes en distintos contextos:

- esta variable puede recuperarse desde otro sitio (dale external linkage)
- recupera una variable definida en otro sitio (forward declaration)

Por tanto, si dejas sin inicializar una variable con `extern`, el compilador
entenderá que quieres importarla, resultando en un error.

| Tipo de identificador   | Interno     | Externo (exportar)   | Externo (importar)            |
|-------------------------|-------------|----------------------|-------------------------------|
| Variable global         | `static`    | _Default_            | `extern` (no init)            |
| Constante global        | _Default_   | `extern`             | `extern` (no init)            |
| Constexpr global        | _Default_   | `extern`             | no tienen forward declaration |
| Función                 | `static`    | _Default_            | _Default_                     |
| Inline global           | ?           | _Default_            | Repetir la declaración        |

las variables constexpr no se tienen forward declaration, dado que su valor se
tiene que saber en tiempo de compilación. En ese momento, se desconoce el resto
de archivos.

# Compartir globales entre varios archivos

## Opción 1

1. Hacer una archivo de cabecera con las constantes `constexpr` (con namespace)
2. `#include` donde sea necesario

```cpp
// constants.hpp
#pragma once

namespace constants {
    constexpr double pi       = 3.14159;
    constexpr double avogadro = 6.0221413e23;
    constexpr double gravity  = 9.8;
}
```

Pero tiene algunos problemas:

- Si se incluye la cabecera unas 20 veces, las variables se copias y pegan
20 veces (dado que constexpr tiene internal linkage), por lo que la compilación
será más lenta.
- si las constantes son muy grandes y no se pueden optimizar, ocupa mucha
memoria

## Opción 2

La alternativa es usar external linkage:

```cpp
// constants.hpp
#pragma once

namespace constants {
    // Forward declarations de las constantes
    extern const double pi;
    extern const double avogadro;
    extern const double gravity;
}

// constants.cpp
#include "constants.hpp"

namespace constants {
    // "Implementación" de las constantes
    extern const double pi       = 3.14159;
    extern const double avogadro = 6.0221413e23;
    extern const double gravity  = 9.8;
}
```

Sin embargo, al ser externas en otros archivos, no se podrá optimizar como si
fuesen constantes de compilación normales.

## Opción 3

Para C++17 en adelante, se introdujeron las variables `inline`, que permite que
la variable tenga múltiples definiciones, pero todas hacen referencia a lo
mismo: no son instancias diferentes.

Es decir, si tienes 10 archivos que incluyen la cabecera, sin `inline` tienes 10
definiciones independientes. Pero con `inline`, el compilador solo escoge una
definición, salvando la memoria de 9 variables.

Reglas que hay que seguir:

- Todas las definiciones de una variable `inline` deben ser exactamente iguales.
- La definición de una variable `inline` (no forward declaration) debe estar
  presente en el archivo donde se use.

```cpp
// constants.hpp
#pragma once

namespace constants {
    inline constexpr double pi       = 3.14159;
    inline constexpr double avogadro = 6.0221413e23;
    inline constexpr double gravity  = 9.8;
}
```

Esta es la forma preferida para definir constantes.

En este vídeo, Cherno muestra las diferencias estas distintas opciones.

{{< youtube
    id="rQhBECyA6ew"
    title="Global Variables in C++... not as easy as it seems"
>}}

Tipos de variables

- const
- constexpr
- globales
    - inline: varias definiciones, 1 objeto
    - static: local a la translation unit
- locales
    - static: duración estática
    - 
