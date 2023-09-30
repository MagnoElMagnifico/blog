---
title: Rust FFI
description: >
    Importar código C a Rust usando FFI.
date: 2023-09-30T15:31:17+02:00
weight: -1
draft: true
---

# Tipos de datos

En `std::ffi` hay unos tipos de datos que se corresponden con los de C.

| C data type   | Rust FFI data type   |
| ------------- | -------------------- |
| `int`         | `c_int`              |
| `float`       | `c_float`            |
| `double`      | `c_double`           |
<!-- TODO: ver el resto -->

# Importar funciones

Con el siguiente código se importa la función `sqrtf` de la librería matemática
estandar de C.

```rs
extern "C" {
    fn sqrtf(x: c_float) -> c_float;
}
```

A la hora de usar la función, debe hacerse en un bloque `unsafe`:

```rs
println!("sqrt(2) = {}", unsafe { sqrtf(2.0) });
```

Y a la hora de compilar se debe enlazar con la librería en cuestión:

```sh
rustc main -o program -lm
```

<!-- TODO: usar esto en cargo -->
