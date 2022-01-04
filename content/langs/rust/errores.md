+++
title = "Errores en Rust"
date = 2022-01-03
weight = 3
+++

# Errores irrecuperables
Para crear errores que paren completamente la ejecución del programa usamos el
macro `panic!()`. Entre los paréntesis podemos dar una pequeña descripción del
problema, con la sintaxis del macro `format!()` (o `println!()`).

# Errores recuperables
Para otros errores donde una operación pudo acabar de forma exitosa, usamos la
enum `Result`:

```rs
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

La variante `Ok` guarda el resultado de la función en caso de que la operación
fuese exitosa. Sino, se provee un error con la variante `Err`.

Podemos manejar el error de la siguiente forma:

```rs
let f = match File::open("hello.txt") {
    Ok(file) => file,
    Err(error) => match error.kind() {
        ErrorKind::NotFound => match File::create("hello.txt") {
            Ok(fc) => fc,
            Err(e) => panic!("Problem creating the file: {:?}", e),
        },
        other_error => {
            panic!("Problem opening the file: {:?}", other_error)
        }
    },
};
```

Para evitar tanta expresión `match` podemos usar la función `unwrap_or_else()`,
que devuelve el valor en caso de éxito y ejecuta la función que le demos de
parámetro en caso de error:

```rs
let f = File::open("hello.txt").unwrap_or_else(|error| {
    if error.kind() == ErrorKind::NotFound {
        File::create("hello.txt").unwrap_or_else(|error| {
            panic!("Problem creating the file: {:?}", error);
        })
    } else {
        panic!("Problem opening the file: {:?}", error);
    }
});
```

De igual forma esto es muy largo para escribir, y sobre todo si estamos
probando. Para eso tenemos otras funciones que nos simplifican más el trabajo.

+ `unwrap()` devuelve el valor del `Ok` en caso de éxito y llama a `panic!()` en
caso contrario.
+ `expect(String)` es exactamente lo mismo, solo que nos permite añadir una
pequeña descripción del error.

Para simplificar más, y en el caso de estar escribiendo una función que puede
dar un error o no, podemos simplemente propagarlo, que sería devolverlo para que
el que use esta función se encarge del error. Podemos devolver el error
manualmente o usar el operador `?`:

```rs
fn foo() -> Result<(), some_error> {
    let v = function_that_might_fail()?;
    // this is equivalent to:
    let v = match function_that_might_fail() {
        Ok(value)  => value,
        Err(error) => return Err(error),
    }
}
```
