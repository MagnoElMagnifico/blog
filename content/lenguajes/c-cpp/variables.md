---
title: Variables en C
description: >
    Guía sobre el uso de variables en C, tipos de datos y operaciones (operadores).
date: 2023-07-08T00:39:46+02:00
weight: 5
draft: true
---

# El concepto de variable

Como se ha discutido en la [introducción], un programa es la expresión de un
algoritmo; esto es, un conjunto de instrucciones que toman unos datos de
entrada, los manipulan, y finalmente producen un resultado de salida.

Los ordenadores utilizan la **memoria RAM** para almacenar estos datos de
entrada y salida, además de otros intermedios que sean necesarios para realizar
las distintas operaciones.

Se puede pensar esta memoria como una lista de cajas numeradas que pueden
almacenar números en binario. Las cajas no son infinitas, solo caben unos pocos
dígitos binarios, llamados **bits** (normalmente son 8 o un **byte**).

<!-- TODO: Enlace a arquitectura de computadores -->
En otra ocasión de discutirán los detalles de cómo funciona la memoria RAM
y cómo la CPU la lee, pero por el momento, llega con entender este diagrama.

```goat
Dirección:     0    1    2    3    4    5    6    7    8    9   ...
            .----.----.----.----.----.----.----.----.----.----.
Memoria:    |    |    |    |    |    |    |    |    |    |    | ...
            '----'----'----'----'----'----'----'----'----'----'
```

> Nótese que en programación, se suele a empezar a contar desde 0.

Es importante que estas cajas estén numeradas; porque de esta forma, la CPU
puede acceder de forma sencilla a cada uno de los datos almacenados.

Sin embargo, a la hora de programar, no es buena idea usar las direcciones de
estas cajas directamente, dado que es muy propenso a errores. En los lenguajes
modernos se accede a memoria de forma indirecta con **objetos**, que son
precisamente regiones de memoria donde almacenamos los valores.

Por tanto, en lugar de _ir a la caja número 4325_, lo que se hace es _recupera
el valor de este objeto_ sin preocuparse de donde está exactamente el objeto en
memoria.

Los objetos se referencian gracias a un **identificador**, esto es, un nombre
simbólico. Por tanto, la combinación de este objeto (región de memoria) y el
identificador (nombre) lo que llamamos una **variable**.

Finalmente, hay muchas cosas que podemos guardar en memoria: números,
caracteres, binario puro... Y cada una de ellas tiene un formato en binario
y tamaño en memoria diferente, por lo que es necesario hacer una distinción.
Estos son los **tipos de datos**.

{{< block "Definición práctica" "var(--magno-blue)" "black" >}}
Una **variable** es un contenedor de datos guardado en la memoria RAM con un
tipo de datos, cuyo valor puede cambiar.
{{< /block >}}

[introducción]: {{< relref "introduccion" >}}


# Tipos de datos

Los tipos de datos son fundamentales para un lenguaje de programación y el
compilador, dado que ayudan a determinar lo siguiente:

| Determinan:                  | Objetivos:                                              |
| ---------------------------- | ------------------------------------------------------- |
| Representación interna       | Indicar la representación de memoria del dato (formato) |
| Rango de valores posibles    | Determinar cómo ejecutar las operaciones de los datos   |
| Operaciones posibles         | Detectar errores en las operaciones                     |

Existen dos clases de tipos de datos:

- Primitivos
- Compuestos

En futuros posts se discutirán los tipos de datos compuestos.

Además, el sistema de tipos de un lenguaje de programación puede clasificarse según las
siguientes categorías (entre otras):

- Estático vs Dinámico
- Explícito vs Inferido

------------------------------------------------------------

- **Estático**: la comprobación de los tipos se hace en tiempo de compilación
  y dicho tipo es fijo para el resto del programa. Esta estrategia permite
  detectar errores de tipos antes, haciendo el ejecutable más seguro. E.g: C, C++,
  Java, etc.

- **Dinámico**: los tipos se comprueban durante la ejecución del programa, por
  tanto una variable puede cambiar de tipo. E.g: Python, JavaScript, Perl, etc.

------------------------------------------------------------

- **Explícito**: cuando se crea una variable, el programador escribe
  explícitamente el tipo de dato que se va a utilizar. E.g: C, C++, Java, etc.

- **Inferido**: el compilador deduce el tipo de dato de la variable a partir de
  los valores que se intentan almacenar. E.g: JavaScript, Rust, Python, etc.

En el caso de C, es un lenguaje **fuertemente tipado**, **estático**
y **explícito**, lo que quiere decir que el compilador debe saber en todo
momento el tipo de dato de cada variables y **este no puede cambiar**. Por tanto
hay que especificar de forma explícita el tipo de dato para cada variable.

## Tipos de datos primitivos

| Nombre   | Descripción                                       | Precisión   | Ejemplos                           | Notas                                                                                                       |
| -------- | ------------------------------------------------- | ----------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `int`    | Números enteros (_Integer_)                       | Perfecta    | `..., -3, -2, -1, 0, 1, 2, 3, ...` |                                                                                                             |
| `float`  | Números con decimales (_flotating point numbers_) | Aproximado  | `3.1416, 2.71, -1.0, 0.0, ...`     | Entre dos números reales hay infinitos números reales, y eso es imposible de representar con memoria finita |
| `double` | Igual que `float` pero con más precisión          | Aproximado  | `3.1416, 2.71, -1.0, 0.0, ...`     |                                                                                                             |
| `char`   | Caracter del inglés                               | NA          | `'A', 'b', '.', '$'...`            | Codificado con ASCII (1 byte)                                                                               |

Nótese que en esta tabla no se detalla el formato (por tanto, tamaño
y representación en binario) de cada tipo de dato, dado que el estándar no lo
define. Es posible que el hardware de algunos sistemas usen una representación
distinta, pero que el mismo código C siga funcionando igual.

# Creación y uso de variables

El proceso de creación de variables tiene dos pasos:

- **Declaración**: se indica el identificador (nombre) y el tipo de dato de la variable al compilador.
- **Inicialización**: se da un valor inicial a la variable.

Si no se hace este último paso (inicialización), la memoria que ocupa la
variable podría contener basura y obtener un valor no predecible. Esto es una
forma de **comportamiento indefinido**, y por lo general se debe evitar.

Otro concepto importante cuando se trabajan con variables es:

- **Asignación**: se da otro valor a la variable.

## Declaración y asignación de una variable en C

La sintaxis que utiliza C y otros lenguajes similares es la siguiente:

```
<tipo de dato> <identificador / nombre>;
```

Por ejemplo,

```c
int a;
float b;
double c;
char d;
```

Y en el caso que queramos declarar varias variables del mismo tipo,

```c
// En lugar de hacer esto:
int a;
int b;
int c;

// C permite hacer:
int a, b, c;


// Pero, ojo, esto no funciona:
int a, float b;
```

Para **asignar o inicializar** una variable, **se usa el nombre o identificador
seguido se un igual y el valor en concreto**:

```c
a = 1;
b = 3.14; // Se usa el punto como separador decimal
c = 2.71;
d = 'a';  // Para diferenciar el caracter de lo que
          // es código, se debe escribir entre ' '
```

Dado que esta es una operación muy común, declarar e inicializar la variable, **se
puede hacer todo seguido**:

```c
int x;
x = 0;
// Es equivalente a
int x = 0;
```

## Creando identificadores

Las reglas que hay que seguir para crear nombres para variables y funciones son
las siguientes:

- No puede ser una _keyword_.
- Solo puede contener letras mayúsculas y minúsculas, números y guiones bajos (`_`).
  Espacios y otros símbolos no son válidos.
- No puede empezar por un número.
- C/C++ es _case sensitive_: `nombre` no es lo mismo que `Nombre` o `NoMbrE`.

{{< block "Observación" >}}
En los lenguajes de programación existen una palabras reservadas llamadas
_keywords_ que no se pueden usar para crear identificadores. Puedes encontrar
una lista en [cppreference de C] y en [cppreference de C++].

[cppreference de C]:   https://en.cppreference.com/w/c/keyword
[cppreference de C++]: https://en.cppreference.com/w/cpp/keyword
{{< /block >}}

Y las recomendaciones son las siguientes:

- Deben empezar por una letra minúscula; y si solo es una palabra, todo debería
  ser minúscula.

- Evita empezar por guión bajo, dado que esos nombres suelen estar reservados
  por el SO, librería, compilador, etc.

- Debe ser un **nombre descriptivo** de lo que representa la variable. De esta
  forma, se entiende mucho mejor el código; y si regresas al código fuente
  después de un tiempo, es posible que no recuerdes nada.

- También hay que evitar nombres muy largos y complejos porque resultan en
  expresiones muy largas.

Existen muchos estilos distintos de nombrar variables, pero eso es más bien
preferencia personal:

| Nombre         | Descripción                                                                                   | Ejemplo                 |
|----------------|-----------------------------------------------------------------------------------------------|-------------------------|
| **snake_case** | Todo en minúsculas separados por guiones bajos                                                | `mi_nombre_de_variable` |
| **camelCase**  | Todo junto separando palabras con una mayúscula                                               | `miNombreDeVariable`    |
| **PascalCase** | Igual que camelCase, pero empezando con mayúscula (no recomendado para variables y funciones) | `MiNombreDeVariable`    |

Yo personalmente uso snake_case para todo excepto para tipos de datos, que uso
PascalCase. Esta es la convención de Rust.


# Constantes

- const
- literales

# Modificadores

- unsigned
- short
- long
- long long

- inline
- register
- restrict
- volatile

- static
- extern
- inline
ver linkage

# Operadores
## Orden de los operadores
## Expresiones
# Conversión de tipo


# Alcance de las variables

{{< block "Definición" "var(--magno-blue)" "black" >}}
El alcance de una variable determina dónde un identificador se puede usar en el
código fuente.
{{< /block >}}

- **Variables locales**: tienen

- Se deben definir en el scope menor posible
- variables en bloques
- lifetime (2.5)

## Variables locales
## Variables globales

- aquella variable que está fuera de toda función o clase (no solo de un bloque,
  dado que también es global si está en un namespace).
- se recomienda un prefijo como `gVariable` o `g_variable` para distingir
  rápidamente si es global o no. también puedes crear un namespace específico
  para globales
- tienen duración **estática**, se crean con el programa y se borran cuando este
  termina.
- pueden ser constantes
- variables no constantes no se recomienda que sean globales

inicialización de variables estáticas (incluyendo globales) se realiza antes de
llamar a la función main

1. static initialization: constexpr y literales. Si no tienen valor, se les da
   el 0.
2. dynamic initialization: el resto

## _Name Hiding_ / _Shadowing_

Se produce _Name Hiding_ cuando en distintos alcances hay variables con el mismo
nombre, por lo que puede ser confuso cuál será la variable que se vaya a usar.
El compilador decidirá usar aquella variable que tenga el alcance más cercano.

```c
int main() {
    int x = 0;

    {
        int x = 10; // es válido, no da error
        x = 5;      // usa la variable más cercana,
                    // en este caso la que almacena 10
    }

    // Aquí x sigue valiendo 0
}
```

Lo mismo pasa con variables globales, por eso se recomienda el prefijo `g_`:

```c
int x = 0;

int main() {
    int x = 10;
    ::x = 5;    // Usando el operador de namespace,
                // es menos ambiguo
}
```

Esto se debe evitar porque puede ser confuso; para ello activa el _warning_ de
GCC o Clang con `-Wshadow`.

## Variables locales estáticas

La _keyword_ `static` en C++ tiene varios usos:

- Variables globales tienen duración estática: se crean cuando el programa
  empieza y se borran cuando termina (ver [variables globales](#variables-globales)).

- A un identificador global, si tiene `static`, tiene [linkage interno] y no es
  visible por otras translation units.

- Variables locales estáticas

Una variable local tiene duración automática por defecto, pero con `static` se le
puede dar duración estática:

```c
#include <stdio.h>

int funcion() {
    static int s_x = 0;
    return ++s_x;
}

int main() {
    printf("%d\n", funcion());
    printf("%d\n", funcion());
    printf("%d\n", funcion());
}
```

{{< block "Nota" >}}
Para las variables locales estáticas se usa el prefijo `s` p `s_`.
{{< /block >}}

De esta forma, la variable se creará al inicio del programa y se eliminará
cuando este termine. El resultado práctico es que se pueden almacenar valores
entre distintas llamadas a la función. El código anterior produce como
resultado:

```
1
2
3
```

Hay que tener en cuenta que al ser estática, solo se inicia la variable una vez.

Las variables estáticas locales se pueden usar para crear IDs únicos para un
_Entity Component System_ por ejemplo.

### Constantes locales estáticas

Una variable local estática se puede declarar `const` o `constexpr`.

No son tan útiles, pero se pueden usar para evitar que se cree un objeto de cada
vez una función se llama; ahorrando algo de recursos.

[linkage interno]: {{< relref "linkage" >}}

# Type alias

```cpp
using Nombre = int;
typedef Nombre int;
```
