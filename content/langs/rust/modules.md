---
title: Módulos
weight: 10
---

# Rust module system

+ **Paquetes**: Una característica de cargo que te permite compilar, testear y
compartir crates.
+ **`Crates`**: El árbol de mòdulos que crea una librería o ejecutable.
+ **Módulos y `use`**: Te permite controlar la organización, scope, privacidad
en las direcciones, etc.
+ **Direcciones**: Una forma de nombrar cada elemento, como un `struct`,
función, módulo, etc.

## Crates y Paquetes
Un `crate` (caja) es solo una librería o un ejecutable.
El `crate root` es el archivo de código fuente base, el que se compila por
defecto, o el principal, digamos.

Un paquete es el conjunto de crates que tienen cierta funcionalidad. Existen
algunas normas sobre estos:

1. Debe tener al menos un crate (paquete vacío?).
2. Puede tener entre 0 y 1 (inclusive) crates de librería.
3. Puede tener los crates binarios que sean necesarios.

Entonces:

+ El crate de la librería tan solo se puede definir creando `src/lib.rs`.
+ El crate binario, para que sea el crate root, se define creando `src/main.rs`.
+ Pero, al querer crear más crates binarios (como ejemplos de uso para una
librería), debemos almacenarlos en la carpeta `src/bin`. Si no tenemos un
`crate root` binario, debemos especificar qué ejecutable deseamos usar:
```sh
$ cargo run --bin <nombre>
```

Al usar `cargo new <nombre>`, estamos creando un paquete llamado `<nombre>` (lo
que contenga un archivo `Cargo.toml` y un directorio `src` será un paquete). Si,
de base, contiene `src/main.rs` será binario, o `src/lib.rs` será librería.

## Módulos y direcciones
Un módulo nos permite organizar mejor nuestro código dentro del propio crate. Se
definen con la palabra clave `mod`:

```rs
mod example {
  mod other_module {
    fn other_example() {
      todo!();
    }
  }
  fn foo_example() {
    todo!();
  }
}
```

Module tree:
```
crate
└─ example
   ├─ other_module
   │  └─ other_example
   └─ foo_example
```

Para acceder a las diferentes partes usamos las direcciones. Estas están
compuestas de los nombres del camino que se debe tomar. Hay varias formas:

+ Absoluta: Empiezan desde el crate root usando `crate` o su nombre:
`crate::example::other_module::other_example()`
+ Relativa: Empiezan desde el módulo actual, podemos referirnos a este usando
`self`, al módulo que lo contiene (el padre) con `super`, o un identificador del
propio módulo.

Además de usar esta dirección, los módulos y las funciones deben de ser
públicas, dado que pueden ser únicamente para el funcionamiento interno del
módulo. Para cambiar su privacidad se usa `pub`:

```rs
pub mod example {
  pub fn foo() {
    todo!();
  }
}
```

Tener que escribir estas largas direcciones para utilizar determinada dirección
puede ser engorroso, por eso tenemos la palabra clave `use`:

```rs
a::very::long::and::verbose::direction::foo();

use a::very::long::and::verbose::direction;
direction::foo();

use a::very::long::and::verbose::direction::foo;
foo();
```

En el caso de que el último nombre sea muy grande, o prefiramos cambiarlo en
caso de que se repitan nombres, podemos usar `as`:

```rs
a::very_long_and_verbose_direction::foo();

use a::very_long_and_verbose_direction as dir;
dir::foo();
```

[Re-exportando nombres con `pub use`]
(https://doc.rust-lang.org/book/ch07-04-bringing-paths-into-scope-with-the-use-keyword.html#re-exporting-names-with-pub-use)

Podemos también agrupar numerosos uses que tengan el mismo prefijo:

```rs
use base::path;
use base::path::one::path;
use base::path::other_path;

use base::path::{self, one::path, other_path};
```

O incluso, si queremos usar todo su contenido público (glob operator):

```rs
use base::path::*;
```

## Usando paquetes externos
Después de añadir un paquete a nuestro archivo Cargo.toml, y para poder usar sus
funciones, usamos `use`:

```toml
[dependencies]
pkg_name = "*"
```

```rs
use pkg_name::some::path;
fn main() {
  path::foo();
}
```

## Varios archivos de código fuente
Al parecer tenemos las siguientes reglas en cuanto al sistema de módulos de
Rust y sus direcciones:

1. Un archivo de código fuente es un módulo por sí mismo, excepto los
especiales: `main.rs`, `lib.rs` y `mod.rs`.
2. Un directorio es **solo** un componente de la ruta del módulo.
3. El archivo `mod.rs` es el módulo de la carpeta.

De la forma que al describir los paths a nuestras funciones y demás, estas
coincidirán en con la estructura de archivos.

--------------------------------------------------------------------------------

Veamos por ejemplo el siguiente caso:

```
src
├─ main.rs
└─ other.rs
```

Para llamar la función `foo` en `other.rs`, dentro de `main.rs` escribiriamos:

```rs
mod other;

fn main() {
  other::foo();
}
```

La palabra clave `use` funciona simplemente para evitar tener que escribir toda
la dirección. En este ejemplo, dentro del archivo other, hay un módulo llamado
`module`.

Hay que tener en cuenta que deberás seguir utilizando la última dirección para
evitar que se confundan módulos.

Estas direcciones pueden ser tanto relativas al directorio actual, como
absolutas (usando `crate` al principio de todo si se refiere al crate base).

```rs
mod other;
use other::module;

fn main() {
  module::foo();
}
```

--------------------------------------------------------------------------------

¿Qué sucede al tener subdirectorios?

```
src
├─ module
│  ├─ mod.rs
│  └─ other.rs
└─ main.rs
```

En este caso, es necesario disponer de un archivo `mod.rs` que se cargará al
usar `module`, ya que como veiamos antes, las carpetas son también módulos y
`mod.rs` es donde se guarda su código.

En `src/main.rs`:
```rs
mod module;

fn main() {
  module::other::foo();
}
```

En `src/module/mod.rs`:
```rs
pub mod other;
```
