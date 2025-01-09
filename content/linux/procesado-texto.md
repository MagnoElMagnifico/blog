---
title: Procesado de Texto con Bash
description: >
    Comandos últiles para el procesado y filtrado de texto
date: 2025-01-09T23:00:50+01:00
weight: 4
draft: true
---

{{< todo >}}
<!-- TODO: ejemplos de uso -->
<!-- TODO: expresiones regulares -->
## Editores de terminal

nano
vim
helix


## Otros
- pushd popd dirs
- tree
- fmt
{{< /todo >}}

# Filtrar

- `grep`: busca una expresión regular. Usar `-E` (o el comando `egrep`) para expresiones regulares
  extendidas y `-o` para solo mostrar el match. También se puede usar `-v` para
  invertir el resultado (mostrar las líneas que no hacen match).

<!-- TODO: ripgrep -->

# Imprimir texto de diferentes formas

{{< keyvalue title="Imprimir texto de diferentes formas" key-header=true >}}
-% `cat` :% Imprime un archivo
-% `tac` :% Imprime las líneas del archivo en orden inverso.
-% `rev` :% Imprime todo el fichero en orden inverso.
-% `shuf` :% Desordena aleatoriamente las líneas.
-% `sort` :% Ordena las líneas por orden alfabético.
-% `uniq` :% Elimina las líneas duplicadas contiguas.
-% `head -n N` :% Muestra las `N` primeras líneas del archivo.
-% `tail -n N` :% Muestra las `N` últimas líneas del archivo.
-% `paste` :% Une línea a línea cada uno de los archivos.
-% `join` :% Une línea a línea archivos en base a un campo común.
-% `split` :% Separa un archivo en varios
{{< /keyvalue >}}

# Modificación

## `cut`

`cut` escribe partes seleccionadas de un archivo a la salida estándar, puede
usarse para seleccionar columnas o campos de un fichero en específico:

- `-b`: selecciona los bytes especificados
- `-c`: selecciona los caracteres especificados
- `-f`: selecciona los campos especificados. Con `-d` se puede cambiar el
delimitador.

## `tr`

Este comando permite reemplazar la entrada a nivel de caracteres.

- `tr 'abc' 'xyz'`: sustituye todos los caracteres `a` por `x`, todos los `b`
  por `y` y `c` por `z`.
- `tr 'a-z' 'A-Z'`: también se puede especificar como rangos. Este comando pasa
  de minúsculas a mayúsculas.
- `tr -d '...'`: borrar un conjunto o rango de caracteres.
- `tr -s ' '`: elimina espacios duplicados.
- `tr -s ' ' '_'`: cambia los espacios duplicados por `_`.
- `echo $PATH | tr ':' '\n'`: se interpretan los caracteres especiales.

Y un largo etcétera: hay muchas más opciones, se pueden combinar entre ellas...


# Comandos genéricos
## `awk`
El comando por excelencia para el procesamiento de texto es `awk`. En realidad
es su propio lenguaje de programación.

La idea es dividir la entrada en diferentes partes, para poder operar sobre
ellas como si fuese una tabla:

- **records**: `awk` procesa un record a la vez. Por defecto líneas de texto,
  pero se puede cambiar el delimitador con `RS=''` (_Record Separator_).
- **fields**: cada record se puede dividir en partes, a las que se puede acceder
  con las variables especiales `$0, $1 ...`. Por defecto palabras de cada línea,
  configurable con `FS=''` (_Field Separator_).

Algunas variables útiles de acuerdo a esto:

- `NR`: número de record actual. Cuando `RS='\n'`, equivale al número de línea.
- `NF`: número de campos que tiene el record actual.

La estructura de un comando de `awk` es la siguiente:

``` {linenos=false}
patron { accion1; accion2; }
```

Si no hay ningún patrón se interpretará como `true`, es decir, siempre se
ejecuta. El patrón `BEGIN` hace que se ejecute antes de empezar a procesar
records y `END` después de procesar el último. Este también puede ser un regex
sobre el record: `/regex/`.

Se pueden declarar variables sin necesidad de declarar su tipo, al igual que en
otros lenguajes: `sum += $1`. No es necesario declararlas, tendrán por defecto
`""`, que es implicitamente `0`.

Puedes encontrar más características de `awk` con ejemplos en [esta
página](https://linuxhandbook.com/awk-command-tutorial/).

## `sed`
`sed` procesa un archivo línea a línea aplicando una serie de acciones,
aplicando una serie de comandos. Hay una gran variedad de ellos, pero
habitualmente se utiliza para reemplazar texto:

```bash
sed 's/regex/replace' < archivo.txt
```
El comando `s` intenta hacer match del regex de cada línea para luego
reemplazarlo. Se pueden usar `\1` y demás para los grupos.

Se recomienda el uso del parámetro `-E` para poder utilizar expresiones
regulares extendidas.

# Otros comandos

- `diff`: muestra la diferencia entre dos archivos. Recomiendo `-u --color` para
  hacerlo más legible.
- `wc`: con `-l` puedes contar líneas de un archivo, con `-w` palabras, `-c` el
  número de bytes y `-L` la longitud de la línea más larga.
