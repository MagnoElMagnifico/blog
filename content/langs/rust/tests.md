+++
title = "Testing"
date = 2022-01-04
weight = 10
+++

# Unit tests en Rust

> Nota: Los tests solo sirven para las librerías, no para los binarios, por eso
> es tan común tener una librería y un binario que lo envuelva a la vez.

Estos tests se situarán en el mismo módulo que estaremos comprobando, no es
necesario ponerlos en otro archivo o carpeta, y que ese código no se compilará
a no ser que se llame a `cargo test`.

```rs
// Función como test
#[test]
fn test() {
    // Algo
}

// Un módulo entero solo para tests
#[cfg(test)]
mod tests {
    use super::*; // Testeamos lo que está en un nivel superior

    #[test]
    fn test() {
        // Algo
    }

    // Podemos tener funciones que no sean tests, simplemente de ayuda
    fn otra() {
        // Algo
    }
}
```

El test será exitoso si no se produce ninguna llamada a `panic!`, por lo que el
uso de macros como `assert!`, `assert_eq!` o `assert_ne!` , y funciones como
`.unwrap()` o `expect("<descripción>")` son bastante comunes.

Sin embargo, podemos hacer que un test pase al llamarse a `panic!`, pero falle
cuando eso no pasa: añadiendo `#[should_panic]`. Además, podemos especificar qué
debería ser el mensaje de error: `#[should_panic(expect = "algo")]` (este test
debe entrar en pánico con un mensaje que diga "algo").

Con la anotación `#[ignore]`, evitamos que se realice un test al llamar a
`cargo test`, pero con `cargo test -- --ignored`, solo se ejecutarán aquellos
que tengan este atributo.

+ `cargo test`: ejecuta todos los tests
+ `cargo test -- --test-threads=<n_threads>`: ejecuta los tests en el número
  dado de threads para acabar antes.
+ `cargo test -- --show-output`: muestra los `println!` en todos los casos (por
  defecto solo muestra el output en caso de que el test falle)
+ `cargo test <nombre>`: ejecuta solo el test dado (este nombre se corresponde
  con el nombre de la función, y podemos usarla como un buscador: por ejemplo
  tenemos tres tests llamados `add_one`, `add_two` y `times_one`. Si ejecutamos
  `cargo test add`, solo se ejecutarán los dos primeros. Podemos hacer lo mismo
  con el módulo: `cargo test tests::`)

# Integration tests
En lugar de los Unit tests, que comprueban la funcionalidad del programa por
separado, en pequeñas unidades; los integration tests se encargan de que todo
funcione al juntar todas estas partes.

A contrario de los Unit tests, estos se pueden situar en una carpeta a la misma
altura que `src` llamada `tests`.

```
proyecto
├─ src
└─ tests
```

> Nota: tendremos que usar `use` para poder utilizar las funciones para testear.

> Nota: No es necesario definir aquí un módulo de tests.

Cargo tratará cada archivo dentro de `/tests` como un crate independiente, y al
ejecutar `cargo test`, tendremos una sección para los unit tests, y otra por
cada uno de estos archivos.

Si queremos compartir funciones comunes para varios tests, esto puede dar
problemas. En ese caso debemos seguir la siguiente estructura, porque los
archivos en subdirectorios no se compilan como crates individuales:

```
proyecto
├─ src
└─ tests
  ├─ common // o cualquier otro nombre
  │  └─ mod.rs // aquí irá en código en común
  └─ ... // otros tests que usan funciones en común del crate `common`
         // (incluyen `mod common;`)
```
