---
title: Documentación, Cargo y Crates
weight: 2
---

[crates.io]: https://crates.io
[gfx-rs]: (https://github.com/gfx-rs/gfx)
[rodio]: https://crates.io/crates/rodio
[mint]: https://crates.io/crates/mint
[wgpu]: https://crates.io/crates/wgpu
[winit]: https://crates.io/crates/winit
[glam-rs]: https://crates.io/crates/glam-rs
[spirv-reflect]: https://crates.io/crates/spirv-reflect

# Cargo
- `cargo check`: Muestra los errores de compilación sin compilar.
- `cargo build --release`
- `cargo doc --open`: Abre la documentación en el navegador.
- `cargo install`: Instala en `user/.cargo/bin` un ejecutable, no sirven libs.
  Con esto podemos hacer "plugins" para cargo, si se llama `cargo-something`
  ejecutariamos `cargo something`.
- `cargo login aaa bbb`: son los token de [crates.io].
- `cargo publish`: Antes de debe hacer un commit; y, aparte de los valores por
  defecto de `Cargo.toml`, debemos añadir una descripción y una licencia. Otra
  cosa importante es que no se puede borrar el código de la página, pero podemos
  evitar que se use determinada versión `cargo yank --vers <version> [--undo]`.

## Paquetes:
```toml
# Cargo.toml (por defecto)

[profile.dev]
opt-level = 0 # mínimo

[profile.release]
opt-level = 3 # máximo
```

Un workspace es una forma de agrupar muchos paquetes en el mismo proyecto. De
esta manera lo tendremos mucho más ordenado.

Cada paquete tendrá su propia carpeta dentro del proyecto base, y estas tendrán
su propio archivo `Cargo.toml`. En el proyecto base se referirá a sus otros
crates de los que depende como miembros, dando su dirección. Un buen ejemplo de
esto es [gfx-rs].

Para publicar trabajar con un workspace:

- `cargo run -p <package>`
- `cargo test -p <package>`

> Nota: Tienes que publicarlos en [crates.io] por separado.

```toml
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

/// `markdown aquí`
/// ```
/// El código que añadamos funcionan como tests
/// ```
/// ```norun
/// Este código de aquí no se ejecuta
/// ```
/// Seciones importantes: ejemplos / panic / error / unsafe

// Rexportación: prevenimos de que el usuario tenga que escribir toda la dirección
pub use direction;
```

# Algunos crates interesantes

## Funcionalidades
- [`rand`](https://crates.io/crates/rand)
  ([docs](https://docs.rs/rand/lastest)):
  genera números aleatorios.

- [`mint`](https://crates.io/crates/mint)
  ([docs](https://docs.rs/mint/lastest)):
  mates (**TODO**: Comprobar si es buena).
  - `Point2` y `Point3`
  - `Vector2`, `Vector3` y `Vector4`
  - Cuaterniones y matrices
  - Ángulos de Euler

- **TODO**: Mirar [nalgebra](https://nalgebra.org/).

## CLI
- [`clap`](https://crates.io/crates/clap)
  ([docs](https://docs.rs/clap/lastest)):
  _Command Line Argument Parser_.

- [`read_input`](https://crates.io/crates/read_input)
  ([docs](https://docs.rs/read_input/lastest)):
  gestiona el input del usuario (**TODO**: Comprobar si es buena).

- [`inquire`](https://crates.io/crates/inquire)
  ([docs](https://docs.rs/inquire/lastest)):
  alternativa para input de usuario (**TODO**: Comprobar si es buena).

- [`crossterm`](https://crates.io/crates/crossterm)
  ([docs](https://docs.rs/crossterm/lastest)):
  manipula la terminal (multiplataforma) (**TODO**: Comprobar si es buena).

- [`colorful`](https://crates.io/crates/colorful)
  ([docs](https://docs.rs/colorful/lastest)):
  utiliza colores para el output.

## Audio
- [`cpal`](https://crates.io/crates/cpal)
  ([docs](https://docs.rs/cpal/lastest)):
  control _low level_ para salida y entrada de audio (multiplataforma, incluso
  WASM). Diferentes _backends_: ASIO (Windows) y JACK (Linux).

- [`rodio`](https://crates.io/crates/rodio)
  ([docs](https://docs.rs/rodio/lastest)):
  usa `cpal` para la reproducción de `.mp3`, `.wav`, `.flac`...
  (**TODO**: Comprobar si es buena).

## Gráficos y GPU
- [`winit`](https://crates.io/crates/winit)
  ([docs](https://docs.rs/winit/latest/)):
  creación de ventanas multiplataforma, eventos, monitores, etc.

- [`WGPU`](https://crates.io/crates/wgpu)
  ([docs](https://docs.rs/wgpu/latest/)):
  una nueva API con diferentes _backends_ (OpenGL ES, Vulkan, etc).

- [`Vulkano`](https://crates.io/crates/vulkano)
  ([docs](https://docs.rs/vulkano/latest/)):
  _wrapper_ sobre la API de Vulkan.

- [`Glium`](https://crates.io/crates/glium)
  ([docs](https://docs.rs/glium/latest/)):
  _wrapper_ seguro sobre la API de OpenGl (**Actualmente no está mantenido**
  **por el autor original**).

- [`Raylib`](https://crates.io/crates/raylib)
  ([docs](https://docs.rs/raylib/latest/)):
  _bindings_ para la librería en C de Raylib.

- [`SDL2`](https://crates.io/crates/sdl2)
  ([docs](https://docs.rs/sdl2/latest/)):
  _bindings_ para la librería en C de SDL2.

## Game engines
- [`Bevy`](https://crates.io/crates/bevy)
  ([docs](https://docs.rs/bevy/latest/), [site](https://bevyengine.org/)):
  sencillo, modular y orientado a datos (**Todavía en desarrollo**).
  - Usa [wgpu], [winit], [glam-rs] (mates 3D para juegos), [spirv-reflect]
  (reflejos?)
  - 2D y 3D.
  - Multiplataforma.
  - Sencillo para principiantes y flexible para avanzados.
  - Orientado a datos.
  - Modular: cambia lo que no te gusta.
  - Rápido: la aplicación se ejecuta rápido, y cuando es posible, en _threads_.
  - Productivo: _hot reloading_ y tiempos de compilación cortos.
  - Sonido, escenas, ECS, GUI...

- [`Piston`](https://crates.io/crates/piston)
  ([docs](https://docs.rs/piston/latest/)):
  muy modular (es una colección de librerías), y por ello también muy amplio y
  con muchas características.
  - Gráficos y animación en 2D y 3D.
  - GUI
  - AI
  - Sonido y música
  - Network

- [`ggez`](https://crates.io/crates/ggez)
  ([docs](https://docs.rs/ggez/latest/))
  - Abstracción del sistema de archivos: abrir carpetas (o `.zip`) para cargar
  recursos.
  - Eventos de teclado y ratón (con _callbacks_).
  - Cargar archivos `.ogg`, `.wav` y `.flac` gracias a [rodio].
  - Renderizado gracias a [gfx-rs].
  - Opciones avanzadas de gráficos: shaders, sprites batches, render targets.
  - Matemáticas de [mint].
  - Renderizado de fuentes TTF con `rusttype` y `glyph_brush`.
  - Usa un archivo de configuración.
  - Funciones de control de tiempo, FPS...
  - Para Windows y Linux (puede que funcione en Mac).
  - No tiene: físicas, animación, GUI, manego de assets, AI, ECS, Networking.

- [`macroquad`](https//crates.io/crates/macroquad)
  ([docs](https://docs.rs/macroquad/lastest)):
  sencillo (inspirado por Raylib)
  - Multiplataforma (incluso para WASM y Android/iOS con un comando)
  - Renderizado 2D eficiente
  - GUI inmediata incluída
  - Mínimas dependencias: se compila en 16s
