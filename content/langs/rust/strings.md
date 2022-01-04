+++
title = "Strings"
date = 2022-01-04
weight = 10
+++

# Strings
Un String es una colección/secuencia de `char`s (valores escalares) codificados
en Unicode (en concreto UTF-8 de 1-4 bytes, siguiendo las reglas Unicode, por
que es compatible con ASCII), y Rust se encarga de que sea UTF-8 válido.

Los Strings no están terminados en un caracter nulo (`\0`), ya que pueden
contener estos caracteres.

Los Strings pueden ser representados como bytes (`&[u8]`), escalares (`char`,
un caracter separado y único de Unicode) o _grapheme clusters_ (lo que nosostros
llamamos letras):
+ `bytes()`: devuelve un iterador del String como bytes
+ `chars()`: devuelve un iterador del String como `char`
+ `unicode_segmentation::UnicodeSegmentation::graphemes("...", true /*is_extended*/)`:
`unicode-segmentation (crate)` to graphemes

Por norma general, a no ser que estemos trabajando con lenguas con una escritura
compleja, los chars coinciden con nuestras letras:

```
こんにちは:
bytes: [227, 129, 147, 227, 130, 147, 227, 129, 171, 227, 129, 161, 227, 129, 175] (15)
chars: [こ, ん, に, ち, は] (5)
graphemes: [こ, ん, に, ち, は] (5)

नमस्ते:
bytes: [224, 164, 168, 224, 164, 174, 224, 164, 184, 224, 165, 141, 224, 164, 164, 224, 165, 135] (18)
chars: [न, म, स, \u{94d}, त, \u{947}] (6)
graphemes: [न, म, स\u{94d}, त\u{947}] (4)
```

--------------------------------------------------------------------------------

Formas de crear un String:

```rs
let s1 = String::new();
let s2 = "".to_string();
let s3 = String::from("");
```

Con String Slices simplemente entre comillas `"`.

Algunos métodos para añadir al String:

```rs
s.push('c');       // Se añade un nuevo caracter
s.push_str("str"); // Se añade un String Slice
s = &s1 + &s2;
s += " mundo";
s = format!("{}{}", s1, s2);
```

##  String Slices
Se trata de un slice de un String: `&str`.

```rs
let s = String::from("Hello World");
let hello = &s[0..5];  // also [..5]
let world = &s[6..11]; // also [6..]
let hello_world = &s[..]
```

Aquí estamos creando una referencia a un trozo del String, no al String entero:

![](https://doc.rust-lang.org/book/img/trpl04-06.svg)

El tipo de dato de un String slice se escribe `&str`, y si declaramos un String
literal de las siguiente forma, también será de tipo `&str`:

```rs
let s = "Hello World";
```

Un detalle a tener en cuenta, es que podemos convertir Strings de forma muy
sencilla a `&str`, por lo que los hace el tipo ideal para usar como parámetros
en funciones:

```rs
fn foo(s: &str) {}
let s1 = String::from("Hello World");
let s2 = "Hello World again";

foo(&s1[..]); // or s1.as_str()
foo(s2);
```

## String literals
Estos son los Strings que existen hard coded dentro del programa, por lo que
están guardados dentro del propio programa, lo cual lo hace su dueño. Esto
quiere decir que estas valdrán hasta el final del programa, como su dueño
(`&'static str`).

Estas son algunas formas de representarlas:

Para evitar que al separar los Strings, se añadan saltos de línea (`\n`) se
puede hacer lo siguiente:

```rs
let s = "hola\
        que tal\
        como estas?";
```

Además de eso, se ignoran los espacios antes del primer caracter. Output:

```
holaque talcomo estas?
```

Podemos entonces hacer el siguiente hack, para quitar los espacios iniciales
pero manteniendo los saltos de línea:

```rs
let s = "hola\n\
        que tal\n\
        como estas?";
```

Output:

```
hola
que tal
como estas?
```

La otra opción es la siguiente:

```rs
let s = r###"
    hola
    que tal estas?
    me alegro que estes bien"###;
```

En este caso, lo que aparezca literalmente entre los `###"` `"###`, tanto `"`,
espacios y otros caracteres.
