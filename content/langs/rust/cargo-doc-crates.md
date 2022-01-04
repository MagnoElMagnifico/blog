# Cargo
+ `cargo check`: Muestra los errores de compilación sin compilar
+ `cargo build --release`
+ `cargo doc --open`: Abre la documentación en el navegador
+ `cargo install`: Instala en `user/.cargo/bin` un ejecutable, no sirven libs.
  Con esto podemos hacer "plugins" para cargo, si se llama `cargo-something`
  ejecutariamos `cargo something`.
+ `cargo login aaa bbb`: son los token de [crates.io](https://crates.io/)
+ `cargo publish`: Antes de debe hacer un commit; y, aparte de los valores por
  defecto de `Cargo.toml`, debemos añadir una descripción y una licencia. Otra
  cosa importante es que no se puede borrar el código de la página, pero podemos
  evitar que se use determinada versión `cargo yank --vers <version> [--undo]`

## Paquetes:


```
# Cargo.toml (por defecto)

[profile.dev]
opt-level = 0 # min

[profile.release]
opt-level = 3 # max
```

Un workspace es una forma de agrupar muchos paquetes en el mismo proyecto. De
esta manera lo tendremos mucho más ordenado.

Cada paquete tendrá su propia carpeta dentro del proyecto base, y estas tendrán
su propio archivo `Cargo.toml`. En el proyecto base se referirá a sus otros
crates de los que depende como miembros, dando su dirección. Un buen ejemplo de
esto es [gfx](https://github.com/gfx-rs/gfx).

Para publicar trabajar con un workspace:

+ `cargo run -p <package>`
+ `cargo test -p <package>`

> Nota: Tienes que publicarlos en <crates.io> por separado.
```
[workspace]
members = [ "adder", "add_one" ]
# Dentro de cada dirección debe haber un paquete válido

# add_one Cargo.toml
[dependencies]
# add_one depende de adder
adder = { path = "../adder" }
```

# Documentación y reexportación
```rs
//! Esto es para documentar el archivo

/// `markdown aqui`
/// ```
/// El codigo que añadamos funcionan como tests
/// ```
/// ```norun
/// Este código de aquí no se ejecuta
/// ```
/// Seciones importantes: ejemplos / panic / error / unsafe

// Rexportación: prevenimos de que el usuario tenga que escribir toda la dirección
pub use direction;
```

# Algunos crates interesantes
## CLI
+ [`crossterm`](https://crates.io/crates/crossterm)
  ([docs](https://docs.rs/crossterm/0.20.0)):
  manipula la terminal (multiplataforma)

+ [`read_input`](https://crates.io/crates/read_input)
  ([docs](https://docs.rs/read_input/0.8.4)):
  gestiona el input del usuario.

+ [`clap`](https://crates.io/crates/clap)
  ([docs](https://docs.rs/clap/2.33.3)):
  Command Line Argument Parser

+ [`colorful`](https://crates.io/crates/colorful)
  ([docs](https://docs.rs/colorful/0.2.1)):
  utiliza colores para el output

## Funcionalidades
+ [`rand`](https://crates.io/crates/rand)
  ([docs](https://docs.rs/rand/0.8.4)):
  genera números aleatorios

## ???
+ CLI input: (inquire)[https://crates.io/crates/inquire]
