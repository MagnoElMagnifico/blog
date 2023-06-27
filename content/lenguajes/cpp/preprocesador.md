---
title: Preprocesador
description: >-
    Cómo usar las directivas del preprocesador en C/C++, aquellas que comienzan
    por un `#`.

date: 2023-06-27T01:03:57+02:00
weight: 4
---

# El preprocesador

El preprocesador recibe un fichero de entrada y lo transforma en uno de salida
aplicando las directivas incluidas en el fichero de entrada. Estas directivas
permiten incluir código de otros ficheros (habitualmente archivos de cabecera),
substituir unos textos por otros (esto son las macros) y elegir si se incluye
o no cierto código (esto es la compilación condicional).

{{< block "Es decir" >}}
El preprocesador simplemente elimina, copia y pega código.
{{< /block >}}

El preprocesador solo entiende las directivas de preprocesado, las que empiezan
por `#`, y es completamente independiente del resto de la sintaxis de C++.
El estándar de C++ define las siguientes directivas:

- `include`
- `define` `undef`
- `if`, `else`, `elif`, `endif`
- `ifdef`, `ifndef`, `elifdef`, `elifndef`
- `error`, `warning`
- `line`
- `pragma`


# `#define`

```cpp
#define NOMBRE VALOR
```

{{< block "Nota" >}}
Es tradicional y recomendable definir las macros utilizando letras mayúsculas
y separando palabras por guiones bajos.
{{< /block >}}

Sirve para declarar una macro: **el texto será substituido por otro** por el
preprocesador. Por ejemplo, el siguiente fichero:

```cpp
#define MIMACRO 17

int main() {
    return MIMACRO;
}
```

Al ser traducido por el preprocesador se convertirá en:

```cpp
int main() {
    return 17;
}
```

Esta directiva también **permite el uso de parámetros**, por ejemplo:

```cpp
#define SALUDO(nombre)                               \
        std::cout << "Hola " << nombre << std::endl; \
        std::cout << "Bueno adios" << std::endl      \

#include<iostream>

int main() {
    SALUDO("Magno");
    return 0;
}
```

Si tiene varias líneas, recuerde añadir una barra invertida (`\`) antes de cada
una de ellas.

Las macros tienen diferentes problemas, considera este código de ejemplo:

```cpp
if (alguna_condición)
    SALUDO("Lucas");
```

El código anterior se traduce como:

```cpp
if (alguna_condición)
    std::cout << "Hola " << "Lucas" << std::endl;
std::cout << "Bueno adios" << std::endl;
```

Con lo que a `"Lucas"` se le saluda solo si se cumple la condición pero se
despide siempre. Esto no es lo que quería el autor, probablemente. Fíjese que
aunque la última línea esté identada esta no pertenece al if, que solo sobre la
primera línea, así que recuerde usar llaves en estos casos.

Aunque existe una solución por si sucede eso, crear un
[bloque]:

```cpp
#define SALUDO(nombre) {                                 \
            std::cout << "Hola " << nombre << std::endl; \
            std::cout << "Bueno adios" << std::endl;     \
        }                                                \
```

[bloque]: {{< ref "lenguajes/cpp/basico#sentencias-y-bloques" >}}

Otro problema es el siguiente:

```cpp
#define MIMACRO 17

int main() {
    int MIMACRO = 33;
    return 0;
}
```

No podemos utilizar `MIMACRO` como nombre de variable porque el preprocesador lo
substituye por 17. Y 17 no es un nombre de variable válido.

Usar macros como si fuesen funciones puede ser tentador puesto que el código se
inserta directamente en el resultado final en vez de tener que hacer llamadas
a subrutinas y retornos. El resultado es un programa más rápido a costa de que
es mucho más grande. Pero no es recomendable. Perdemos (entre otras cosas) la
seguridad de tipos (_type safety_).

Además, con los compiladores tan optimizados actuales no es necesario, son
capaces de optimizar funciones de la misma forma (`inline`).


# `#undef`

La definición de una macro (definida con `#define`) dura hasta el final del
archivo o hasta que su definición es cancelada con `#undef`.


# `#include`

Esta directiva recibe como parámetro un nombre de un fichero, generalmente `.h`
o `.hpp`. El parámetro se puede dar entre comillas dobles `" "` o entre símbolos
de mayor y menor `< >`.

Esta distinción se hace para diferencias de las cabeceras que el usuario ha
creado (comillas) y de las librerías externas añadidas (símbolos de mayor
y menor):

```cpp
#include <iostream>        // librería estándar
#include <SFML/Window.hpp> // librería externa
#include "MiJuego.hpp"     // librería interna
```

**Esta directiva lee ese fichero y lo inserta en el fichero que está
procesando**, en el punto en que se encontraba la directiva.

Nótese que estos ficheros insertados también son preprocesados y pueden a su vez
tener otros `#include` con lo que pude haber una cascada de código insertado.


# `#ifdef`, `#ifndef`, `#elifdef`, `#elifndef`

Estas cuatro directivas permiten controlar qué código va a ser compilado en
función de si las macros utilizadas como parámetros están o no definidas.

Por ejemplo, si pasamos el siguiente código al preprocesador:

```cpp
#include <iostream>
#define LINUX

int main() {
#ifdef LINUX
    std::cout << "Mi SO es Linux" << std::endl;
#else
    std::cout << "Mi SO no es Linux" << std::endl;
#endif

#ifndef MAC
    std::cout << "No uso Macintosh" << std::endl;
#else
    std::cout << "Sí uso Macintosh" << std::endl;
#endif

    return 0;
}
```

Será traducido como:

```cpp
int main() {
    std::cout << "Mi SO es Linux" << std::endl;
    std::cout << "No uso Macintosh" << std::endl;
    return 0;
}
```

Es posible anidar estas directivas de forma similar a como se hace con los if de
C++.


# `#if`, `#else`, `#elif`, `#endif`

`#if` actúa como `#ifdef` pero comparando una macro con un valor. `#elif`
permite encadenar varias comprobaciones seguidas sin tener que anidarlas y
necesitando solo un `#endif` al final. Por ejemplo:

```cpp
#define LINUX    1
#define NINTENDO 2
#define VR_VIVE  3

bool disparoPulsado() {
#if SYSTEM == LINUX
    return (key[KEY_SPACE]);
#elif SYSTEM == NINTENDO
    return buttonPressed(KEY_A);
#elif SYSTEM == VR_VIVE
    return pushGesture();
#else
#   error Sistema desconocido
#endif
}
```

El código anterior sería el de una hipotética función que determina si un
jugador ha pulsado el botón de disparo. Debemos definir la macro `SYSTEM` con un
valor según compilemos para Linux, Nintendo o Realidad Virtual con `VIVE`.
Y según el valor de esa macro se llamará a un código u otro.

Esto también lo podríamos haber hecho con un `if` normal de código de C++. Pero
esto tiene un inconveniente, es muy posible que la función `buttonPressed` de
Nintendo no exista en Linux y falle la compilación del sistema para Linux. No
tiene sentido que falle la compilación por un código que no se va a usar, para
eso usamos estas directivas de procesador.


# `#error`, `#warning`

Esta directiva provoca que falle la compilación y el compilador emita el mensaje
de error que acompaña a esta directiva.


# `#line`

Esta es una macro que posiblemente nunca uses.

```cpp
#line 17 nombreFichero
```

Cuando se sigue de un número, causa que el compilador trate la siguiente línea
como si fuese ese número de línea. Esto afecta a los mensajes de aviso o error
que emita el compilador y a la información de ayuda a depuradores pero no afecta
al código generado.

Si además añades un nombre, el compilador actuará como si el fichero que está
procesando tuviese este nombre.

Esta directiva es útil para programas de transformación de código. Por ejemplo,
los primeros compiladores de C++ traducían el código C++ a C y después lo
compilaban con un compilador normal de C. Así se ahorraban escribir el
compilador entero. Pero con frecuencia una línea de C se convertía en muchas de
C++, y para que el compilador de C diese los números de línea correctos en los
mensajes de error usaban esta directiva.


# `#pragma`

```cpp
#pragma parametros
```

Esta es la directiva de control dependiente de la implementación. Cada compilador puede
definir sus propios pragmas con su propio significado.

Un pragma común es `#pragma once` (ver [Guardas de
cabecera](#guardas-de-cabecera)). Si aparece en la primera línea de un fichero
indica que solo se debe incluir una vez. Es una directiva que no existe en todos
los sistemas y que no funciona bien con ficheros montados en red, hardlinks
o similares.


# `##`

<!-- TODO: mejorar esto -->

No es una directiva como tal, sino un operador de macro. Toma dos tokens
distintos y los pega para formar un solo token. El token resultado puede ser un
nombre de variable, de clase o cualquier otro identificador.

Por ejemplo:

```cpp
#define DECLARA_Y_ASIGNA(tipo, nombrevar, valor) \
        tipo nombrevar = valor;                  \
        tipo original_#nombrevar = valor;        \

DECLARA_Y_ASIGNA(int, area, 2 * 6);
```

El `#define` anterior se utilizaría como ayuda a la depuración. Te permite
declarar y asignar una variable. Pero declarando siempre otra segunda variable
que empieza por `original_` y sigue con el mismo nombre y a la que se asigna el
mismo valor.

En tu código usarías la variable con el nombre que pusiste en la macro. Y si
mientras estás depurando quieres consultar el valor original puedes consultar la
otra variable que se ha declarado con la macro.


# Guardas de cabecera

Esta es una técnica muy habitual en los archivos de cabecera. Es común que un
archivo de cabecera sea utilizado por varios archivos de cabecera y se termine
copiando y pegando el mismo archivo. Por ejemplo:

```cpp
// Fichero persona.h
class Persona {};
```

```cpp
// Fichero calculos.h
#include "persona.h"
int envejecer(Persona p, int tiempo);
```

```cpp
// Fichero impresiones.h
#include "persona.h"
void muestraPersona(Persona p);
```

```cpp
// Fichero main.c
#include "calculos.h"
#include "impresiones.h"

/* El resto del código */
```

Al compilar el fichero `main.c` vamos a tener un error:

```
error: redefinition of ‘class Persona’
```

Esto se debe a que `main.c` incluye `calculos.h` e `impresiones.h` y cada uno de
estos dos a su vez incluye a `persona.h`. Con lo que `persona.h` ha quedado
incluido dos veces y el compilador esto no lo permite.

Esto podemos solucionarlo así en el fichero `persona.h` :

```cpp
#ifndef PERSONA_H
#define PERSONA_H

// Fichero persona.h
class Persona {};

#endif
```

{{< dropdown "Usando `#pragma once`" >}}
```cpp
#pragma once

// Fichero persona.h
class Persona {};
```
{{< /dropdown >}}

La primera vez que se incluya el fichero la macro no estará definida por lo que
el #ifndef se evaluará a cierto y todo el código se incluirá. El código incluido
a su vez define la macro `PERSONA_H`. La siguiente vez que se incluya la macro sí
está definida por lo que el #ifndef se evalua a falso y no se incluirá el
código.

De esta forma nos aseguramos que el código del fichero se incluye una sola vez aunque el
archivo se incluya múltiples veces.


# Macros predefinidos

Los siguientes macros deberían estar siempre presentes:

{{< keyvalue >}}
-% `__cplusplus` :% Denota la versión del estándar de C++ en uso.
-% `__FILE__` :% Nombre del archivo actual (se puede cambiar con [`#line`](#line))
-% `__LINE__` :% Línea actual del archivo  (se puede cambiar con [`#line`](#line))
-% `__DATE__` :% Fecha de la compilación en formato `Mmm dd yyyy`
-% `__TIME__` :% Hora de la compilación en formato `hh:mm:ss`
{{< /keyvalue >}}

Entre [otros](https://en.cppreference.com/w/cpp/preprocessor/replace).

