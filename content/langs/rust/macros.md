+++
title = "Macros"
date = 2022-01-04
weight = 10
+++

[rocket](https://blog.logrocket.com/macros-in-rust-a-tutorial-with-examples/)
[doc](https://doc.rust-lang.org/book/ch19-06-macros.html)

# Proceso de compilación de Rust
La primera etada es la tokenización, donde se convierte el texto en símbolos
(unidades indivisibles del lenguaje, son como las palabras de Rust). Algunos
ejemplos de tokens:

+ Identifiers: `foo`, `Bambous`, `self`, `we_can_dance`, ...
+ Integers: `42`, `72u32`, `0_______0`, ...
+ Keywords: `_`, `fn`, `self`, `match`, `yield`, `macro`, ...
+ Lifetimes: `'a`, `'b`, `'a_rare_long_lifetime_name`, ...
+ Strings: `""`, `"Leicester"`, `r##"venezuelan beaver"##`, ...
+ Symbols: `[`, `:`, `::`, `->`, `@`, `<-`, ...

> **Notas**:
> + `self` es un identificador y una palabra clave (normalmente este último).
> + `yield` y `macro` no son palabras clave como tal, pero el compilador las
>   interpreta así.
> + `<-` se eliminó de la gramática pero no del lexer.
> + `::` no son dos `:`, sino que se trata de un símbolo totalmente diferente.

En este punto, algunos lenguajes procesan aquí los macros, por eso esto
funciona:

```c
#include <stdio.h>

#define SUB void
#define BEGIN {
#define END }

SUB main() BEGIN
    printf("Pesadillas!\n");
END
```

La siguiente fase es el Parser, donde los tokens se cambian por el Árbol
Sintáctico Abstracto (AST) que contiene la estructura del programa entero.

Una vez hecho eso, es cuando los macros se procesan.

# Macros
Las macros permiten escribir código que escriba otro código, lo que se llama
`metaprogramming`, es decir, definiremos una especie de función que se ejecutará
y como resultado modificará nuestro archivo de código fuente.

Las macros son similares a las funciones, pero sin el coste extra en la hora de
ejecución, aunque se aumenta el coste de compilación.

> **Nota**: Los macros en Rust son muy diferentes a otros lenguajes como por
> ejemplo C, que solo es substitución de texto.

Metaprogramming se usa para reducir la cantidad de código que tienes que
escribir y mantener, que es el mismo motivo de las funciones, pero los macros
ofrecen otras posibilidades.

## Tipos de macros
+ Declarativos: similares a un `match` y simplemente reemplazan la declaración
  del macro (terminada en `!`) por otro código.
+ Procedurales: operan en el ATS (Abstract Syntax Tree) de Rust. Estes tipos de
  macros son funciones que afectan un `TokenStream` cuando pasa a otro, donde el
  macro reemplaza algunos de ellos.

> Esto del `TokenStream` es como funciona el compilado de Rust. En lugar de
> cambiar directamente el contenido del archivo, se modifican los símbolos que
> el compilador ha entendió.

## Macros declarativos
Se crean con `macro_rules!`. Son algo menos poderosos, pero son bastante
sencillos para acortar código y eliminar partes duplicadas. Uno de los más
comunes de este tipo es `println!`.

```rs
// Indica que este macro se puede usar en cualquier lugar dentro del crate.
// Sin esta anotación, al macro no podrá entrar en scope
#[macro_export]

// Aquí no es necesario añadir la `!`
macro_rules! <macro_name> {
    // Esta sintáxis es similar a un match
    ($a: expr, $b: expr) => {
        { // Añadimos ´{}´ extra en caso de que creemos una variable.
          // Al terminarse el macro, el compilador se encontrará con `}` y
          // borrará el valor, por lo que no tendremos errores inesperados
            // los valores $a y $b se sustituiran y luego se sumarán
            $a + $b
        }
    };

    // Se pueden añadir varios brazos para usar diferentes argumentos
    // en el mismo macro
    ($a: expr) => {
        {
            $a
        }
    };
}
```

También podemos pasarle a un macro un número indetermidado de argumentos, `*` se
usa para 0 o más y `+` para 0 o 1. La parte que se repite debe ir entre `$()`
luego una coma y `*`/`+`.

```rs
#[macro_export]
macro_rules! vec {
    ( $( $x:expr ), * ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}
```

Estos son los símbolos que representan los valores precedidos de `$`:

+ `item`: función, struct, módulo, etc
+ `block`: algo redondeado por `{}` (?)
+ `stmt`: sentencia
+ `pat`: patrón
+ `expr`: expresión
+ `ty`: tipo
+ `ident`: identificador
+ `path`: una dirección, por ejemplo `::mem::replace`
+ `meta`: lo que va detro de `#[...]` `#![...]`
+ `tt`: a sigle token tree
+ `vis`: `pub` (?)

# Macros procedurales
Existen tres tipos:

+ `#[derive]`
+ Attribute-like macros that define custom attributes usable on any item
+ Function-like macros that look like function calls but operate on the tokens
  specified as their argument
