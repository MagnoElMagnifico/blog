+++
title = "WASM"
date = 2022-01-04
weight = 10
+++

# Rust y WebAssembly

## Sin nada
1. Añadir _wasm_ al compilador:

    ```
    rustup component add wasm32-unknown-unknown
    ```

2. _Cargo.toml_

    ```toml
    # ...

    # Con esto, no se pueden llamar funciones de `lib.rs` desde un
    # binario como `main.rs`
    [lib]
    crate-type = ["cdylib"]
    ```

3. _lib.rs_

    ```rs
    // No cambia el nombre de la función para unirla más fácil
    #[no_mangle]
    pub fn double(number: i32) -> i32 {
        2 * number
    }
    ```

4. Compilar:

    ```
    cargo build --target wasm32-unknow-unknown
    ```

5. Script que cargará y ejecutará la función:

    ```js
    async function load_wasm(path) {
        const {instance} = await WebAssembly.getinstantiateStreaming(fetch(path));

        if (instance) {
            return instance;
        } else {
            throw `Error loading ${path}: instance is undefined`;
        }
    }

    function main() {
        const wasm = load_wasm("./target/wasm32-unknown-unknown/debug/<nombre>.wasm")
        console.log(wasm.double(2)); // Se imprimirá 2
    }
    ```

6. La página web se tendrá que mostrar en un servidor por temas de seguridad:

    ```
    python -m http.server
    ```

## Con WASM-PACK y WASM-BINDGEN
1. Descargué [_wasm_pack_](https://rustwasm.github.io/wasm-pack/installer/),
   porque `cargo install wasm-pack` daba error de compilación.

2. Escribí un archivo por lotes que crea un servidor en python y abre la página
   en Chrome, porque por temas de seguridad, los navegadores no permiten acceso
   a archivos (como el _.wasm_).

    ```bat
    @echo off
    wasm-pack build --target web
    REM Abre la pagina primero porque el servidor detendrá el programa
    start chrome http://localhost:8000
    python -m http.server
    ```

3. `Cargo.toml` y `.gitignore`

    ```toml
    [package]
    name = "<nombre>"
    # ...

    # Con esto, no se pueden llamar funciones de `lib.rs` desde un
    # binario como `main.rs`
    [lib]
    crate-type = ["cdylib"]

    [dependencies]
    wasm-bindgen = "*"

    # Opcional, pero es buena idea hacer que `release` se
    # centre en hacerlo pequeño para enviarlo por internet
    [profile.release]
    opt-level = "s"
    ```

    ```gitignore
    /target
    /pkg
    ```

4. Para llamar funciones de JavaScript desde Rust se usa:

    ```rs
    use wasm_bindgen::prelude::*;

    #[wasm-bingen]
    extern {
        // La función. Ejemplo:
        fn alert(msg: &str);
    }

    // Esta función se puede llamar desde JavaScript
    #[wasm-bingen]
    fn greet(name: &str) {
        // Se queja porque el `unsafe` es innecesario
        // Pero si lo quito lo marca como error y no corrige otros errores
        // Sin embargo, no produce ningún error al compilar
        alert(&format("Hello {}", name));
    }
    ```

5. El HTML básico (el nombre no acaba en `bg`):

    ```html
    <!DOCTYPE html>
    <html>
    <body>
        <!-- `type="module"` es para no tener que escribir un `.js` por
        separado, ya que `import` solo funciona en un módulo -->
        <script type="module">
            import init, {<nombre_función>} from "./pkg/<nombre>.js";

            init()
                .then(() => {
                    // ...
                });
        </script>
    </body>
    </html>
    ```

6. Exceptuando el archivo `.wasm` y `<nombre>.js`, son todos innecesarios.
