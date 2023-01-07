---
title: Generics, traits y closures
weight: 10
---


# Generics

Usa varios tipos de datos en uno solo.

```rust
fn foo<T>(a: T, b: T)    { ... }
fn foo<T, U>(a: T, b: U) { ... }

// podemos especificar q tipo de dato es y no cualquiera con traits
fn foo<T: PartialOrd + Copy>(a: T) // `a` se puede comparar y copiar

// tambien aplicable a structs y enums
impl<T> foo<T> { ... }
// no depende de la definicion en el struct incluso podemos crear impl foo<char>
// todo esto no afecta al rendimiento
```


# Traits

Sirven de plantillas para crear otras estructuras.

```rust
trait trait_example {
  fn foo(); // podemos añadir una definición por defecto (se sobreescribe despues)
}

struct struct_example { ... }

impl trait_example for struct_example {
  fn foo(){
    // algo
  }
}
```

Podemos pasar traits como parámetros, de esta forma, funcionan como un generic
algo más restringido:

```rust
fn foo(a: &(impl trait_example + other_trait)) -> impl name { ... }
```

Hablando de generics, podemos usar esta otra sintaxis (`trait bounds`):

```rust
fn foo<T: trait_example + other_trait>(a: T, b: T) { ... }
fn foo<T, U> (a: T, b: U) -> char where T: trait_example, U: trait_example + other_trait { ... }
```


# Closures

Son funciones sin nombre que pueden guardarse, usarse como si fuesen datos,
pasarlas como parámetros, etc.

```rust
let closure = |params| { ... } // si es una línea se puede borrar las {}
```

No es necesario dar el tipo de dato, el compilador tomará el primer valor que se
le pase. Además, las closures, tienen acceso a variables de una scope superior
(entorno).

```rust
struct<T> ??? where T: Fn(i32) -> i32
{
  closure: T,
  result: Option<i32>
}

impl<T> ???<T> where T: Fn(i32) -> i32 {
  fn new(init_closure: T) {
    ??? {
      closure: init_closure,
      result: None
    }
  }

  fn result(&mut self, arg: i32) -> i32 {
    if self.result == None {
      self.result = Some(self.closure(arg)); // or Some((self.closure)(arg) ?
    }
    self.result
  }
}
```

Tipos de closures como traits:

+ `FnOnce`: toma ownership de las variables de su entorno. Solo se puede llamar
una vez, porque al tomar ownership luego se borran (`move || {}`).
+ `FnMut`: mutably  borrow value
+ `Fn`: immutably borrow value
