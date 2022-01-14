---
title: General
weight: 1

draft: true

extra:
    show_details: true
    show_toc: true
---

# Links
- [Compilador] para Windows.
- [Convenciones] interesantes para el lenguaje C.

[Compilador]: https://osdn.net/projects/mingw/
[Convenciones]: https://www.doc.ic.ac.uk/lab/cplus/cstyle.html

# Acciones Básicas
```c
int main() {
    // Código
    return 0;
}
```

Con argumentos de línea de comandos:
```c
int main(int argc, char *argv[]) {
    // Código
}

// o

int main(int argc, char **argv) {
    // Código
}
```

## stdout
```c
printf("");
```

- `%d`: `int` (same as `%i`)
- `%ld`: `long int` (same as `%li`)
- `%f`: `float`
- `%lf` `%g`: `double`
- `%c`: `char`
- `%s`: `string`
- `%x`: `hexadecimal`

Más información [aquí](https://www.it.uc3m.es/pbasanta/asng/course_notes/input_output_printf_es.html).

- `\\`: `\`
- `\"`: `"`
- `\'`: `'`
- `\n`: Nueva línea.
- `\r`: Devolver el cursor al principio de la línea (retorno de carro).
- `\b`: Borrar caráter.
- `\t`: Tabulador
- `\f`:
- `\a`: Sonido de alerta
- `\v`:
- `\?`:
- `\nnn`: Carácter con el valor octal `nnn`.
- `\xhh`: Carácter con el valor hexadecimal `hh`.
getchar();

# Tipos
Tipos de memoria &#8594; stack / heap

- Variables &#8594; typedef enum { F, T } bool; // 1 - true and 0 - false
- Constantes
- Operadores
- Conversiones de tipo
- Punteros
- Lista/arrays
- Strings (\0)
    - `atof( )`: función que convierte `string` to `float`
    - `atoi( )`: función que convierte `string` to `int`
    - `atol( )`: función que convierte `string` to `long`
    - `itoa( )`: función que convierte `int` to `string`
    - `ltoa( )`: función que convierte `long` to `string`
· Enums

    TIPOS DE DATOS
        3 basicos
            · int            &#8594; enteros
            · char           &#8594; letra
            · float / double &#8594; decimales

        modificadores
            · short/long &#8594; simplemente es mas grande, no sabemos cuanto
            · unsigned
            Nota: da igual el orden

CONTROL
· Condicionales
· Operadores booleanos
· Bucles
    - For
    - Foreach
    - While
    - Do while

ORGANIZACION
· Funciones
· Structs

STD
· Streams
· Archivos
