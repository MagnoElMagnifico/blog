---
title: Listas y Iteradores
weight: 10
---


# Colecciones

Estas se guardan en la `heap`, por lo que pueden crecer. Otro detalle es que los
vectores borrarán todo el contenido, incluidos sus elementos.

```rs
let v = vec![1, 2, 3];
let v: Vec<tipo> = Vec::new();
```

+ `push`: añade un elemento al final
+ `[index]`: accede a los elementos (`panics!` si es inválido)
+ `get(index)`: lo mismo que antes pero devuelve un `Option`

Los dos últimos son referencias. Esto puede ser problemático, porque si creamos
referencias y añadimos elementos, puede que no sigan en el mismo sitio, por lo
que sería referencia invalida, resultando error de compilación.

Podemos usar los siguientes iteradores implícitos:

```rs
for elem in &v     { ... } // Pasar por todo el contenido (lectura)
for elem in &mut v { ... } // Lo mismo, pero también escribe: desreferencia con *
```


## Strings

Consultar [aquí]({{< ref "lenguajes/rust/strings" >}}).


## Hash map

Guarda un valor relacionado con una clave mediante una función de Hash.

```rs
use collections::HashMap;
let map = HashMap::new();
map.insert(key, value); // toma ownership, podemos pasar referencia pero necesita de lifetimes
map.entry(key).or_insert(value); // añade solo si esta vacio (docs)
map.get(key); // Devuelve un Option<Some(), None>
for (key, value) in &/*mut*/ map { ... }
```


# Slices

Este es un tipo de dato que no toma ownership del original. Se trata de una
sequencia contigua de elementos de una lista: vectores, strings...

Podemos crear un slice así: `&<var>[<init>..<end-exclusive>]` (init < end):

```rs
let s = String::from("Hello World");
let hello = &s[0..5];  // also [..5]
let world = &s[6..11]; // also [6..]
let hello_world = &s[..]
```

> **Nota**: init y end no hacen referencia a la posición de un char en
> específico, sino que es en bytes.

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

Los tipos de datos de otras listas que no sean Strings, se escriben por ejemplo
así: `&[u8]`.



# Iteradores

Permiten pasar por una secuencia de elementos, no importa cuales sean ni como
estén guardados, por ejemplo un array, vector, hash map...

```rs
pub trait Iterator {
  type Item;
  fn next(&mut self) -> Option<Self::Item>;
}
```

Los otros metodos tienen implementaciones por defecto. Hay dos tipos:
+ `iterators`: toman iterador, devuelven iterador
  - `map(closure)`: llama a la closure por cada elemento
  - `filter(closure)`: devuelve el elemento si la closure devuelve `true`
  - Ejemplo (suma uno a cada elemento): `v.iter().map(|x| x + 1).collects();`
+ `consumers`: toman un iterador, devuelven elemento

`Vec<T>` a `Iterator`:
+ `.iter()`: devuelve una referencia inmutable.
+ `.iter_mut()`: devuelve una referencia mutable.
+ `.onto_iter()`: own tipes.

```rs
let v = vec![1, 2, 3];
for value in v.iter() {
  println!(value);
}
```


## Crear nuestros propios iteradores

```rs
struct Counter {
  value: u32
}

impl Counter {
  fn new() -> Counter {
    Counter { value : 0 }
  }
}

impl Iterator for Counter {
  type Item = u32;

  fn next(&mut self) -> Option<Self::Item> {
    if self.value < 5 {
      self.value += 1;
      Some(self.value)
    } else {
      None
    }
  }
}
```
