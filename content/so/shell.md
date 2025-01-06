---
title: Shell y Bash
description: >
    En este artículo se hará un overview del uso de la shell, más concretamente
    Bash. Algunos temas a tratar serán comandos, expansiones, redirecciones,
    tratamiento de caracteres especiales...
date: 2024-02-09T13:27:43+01:00
weight: 6
---

# Shell

<!-- TODO: diagrama de cebolla del kernel, shell, comandos y usuario -->

El shell es un programa que provee una **interfaz de usuario** para acceder
a los servicios del Sistema Operativo o ejecutar los diferentes programas. Este
puede ser de varios tipos:

- **Texto**: _Command Line Interface_ (CLI)
- **Gráfica**: _Graphical User Interface_ (GUI)
- **Lenguaje natural**: _Natural User Interface_ (NUI). Interfaz de usuario en el
  que se utilizan gestos corporales o la voz, sin el uso del ratón, teclado, panel
  táctil, etc.

En este artículo se hablará de los shells CLI, dado que los otros se han
diseñado para que sean intuitivos y sencillos de usar.

{{< keyvalue title="Shells CLI principales" >}}
-% `sh` :%
[Bourne Shell](https://en.wikipedia.org/wiki/Bourne_shell),
el primer Shell en las primeras versiones de Unix.

-% `csh` :%
[C Shell](https://en.wikipedia.org/wiki/C_shell),
desarrollado para Unix BSD. Su principal diferencia es que su sintaxis se
parecía a C, pero aún así era fácil y rápido de usar de forma interactiva.

-% `tcsh` :%
[Tenet C Shell](https://en.wikipedia.org/wiki/Tcsh),
versión mejorada de `csh` y retrocompatible con esta.

-% `ksh` :%
[Korn Shell](https://en.wikipedia.org/wiki/Korn_shell),
basada en `sh` y características de `csh`.

-% `bash` :%
[Bourne-Again Shell](https://en.wikipedia.org/wiki/Bash_(Unix_shell))

-% `zsh` :%
[Z Shell](https://en.wikipedia.org/wiki/Z_shell),
versión extendida de `sh`, con muchas características de `bash`, `ksh` y `tcsh`.
Además, permite añadir temas y customizar el _prompt_.

-% `PowerShell` :%
[PowerShell](https://en.wikipedia.org/wiki/PowerShell),
es el shell por defecto de Windows.

-% `fish` :%
[Friendly-Interactive Shell](https://en.wikipedia.org/wiki/Fish_(Unix_shell)),
es una shell exótica, lo que quiere decir que no sigue el estándar POSIX con el
fin de ser más sencilla y rápida de usar.
{{< /keyvalue >}}

Puedes ver una comparativa en [Wikipedia](https://en.wikipedia.org/wiki/Comparison_of_command_shells).
Nótese que en Unix, el shell no está integrado en el kernel, por tanto el
usuario puede utilizar otros o escribir el suyo propio.

En Linux, el archivo `/etc/shells` contiene las rutas a las shells conocidas por
el sistema y el archivo `/etc/passwd` especifica la shell por defecto de cada
usuario (también se puede ver en la variable `$SHELL`). Se puede cambiar con el
el comando `chsh`.

# Línea de comandos

Nos centraremos en **Bash**, que cumple con la especificación POSIX y es la shell
por defecto en muchos sistemas (no solo Linux). Actualmente, algunos prefieren
[zsh], pero todo lo que vamos a ver también se le puede aplicar.

`bash` se ejecuta como si fuese un comando más:

```sh {linenos=false}
bash
```

Y para salir puedes ejecutar `exit` o `Ctrl-D`.

## Funcionamiento de Bash

<!-- TODO: figura 10-11, diapositiva 6 -->

El shell es un proceso interactivo que ejecuta comandos, de los que se
distinguen dos tipos:

- **Comando externo**: se crea un proceso hijo que ejecute el comando y el shell
  espera a que este termine (`fork execv`).  
  Ejemplos: `cp`, `cat`, `grep`, `mkdir`...

- **Comando interno**: se ejecuta en el mismo proceso.  
  Ejemplos: `cd`, `bg`, `alias`, `eval`, `pwd`, `echo`...

Nótese que los comandos externos son ajenos al shell, almacenados como archivos
ejecutables en algún lugar del sistema. Para encontrar estos comandos externos,
**se busca en las rutas que contenga la variable `PATH`**. Esta es una lista de
rutas separadas normalmente por `:`.

```sh {linenos=false}
PATH=/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin:/opt/bin
```

Tenga en cuenta que se busca de forma lineal, por lo que conviene que las rutas
más usadas se coloquen al inicio.

{{< dropdown "`.` en `PATH`" >}}
Es muy mala idea poner el directorio actual (`.`) en la variable `PATH` por
varios motivos:

- **Seguridad**: puede llevar a la ejecución accidental de programas maliciosos.
  Imagina que un directorio contiene un script llamado `ls`, por lo que al
  intentar ejecutar `ls` se preferirá este script al comando real.
- **Incertidumbre**: la ejecución de comandos puede ser impredecible por el
  motivo descrito en el punto anterior.
- **Portabilidad**: estos programas no son portables y más difíciles de
  mantener.
{{< /dropdown >}}

Se puede comprobar rápidamente si un comando es interno o externo de la
siguiente forma:

```sh {linenos=false}
type comando
```

## Componentes de un comando y orden de evaluación

Cada comando tiene 3 componentes:

- Nombre del comando
- Opciones
- Parámetros

Nótese que en programas más complejos se puede distinguir otro componente, el
**subcomando**, por ejemplo `git clone`.

{{< dropdown "Ejemplo" >}}
```sh {linenos=false}
ls -l /tmp
```

- `ls` es el nombre del comando que se utiliza para listar el contenido de un
  directorio.
- `-l` es una opción que cambiar el comportamiento del comando, que en este caso
  realiza una lista de los archivos.
- `/tmp` es un parámetro, que indica qué directorio se desea listar.
{{< /dropdown >}}

Desde que introducimos un comando hasta que se ejecuta, el shell realiza los
siguientes pasos en orden:

1. Redirección E/S
2. Sustitución de variables
3. Sustitución de nombres de ficheros

{{< dropdown "Ejemplo" >}}
```sh {linenos=false}
star=\*
ls -l $star
```

Este comando lista todos los archivos, como si se hubiese hecho `ls -l *`.
Sin embargo, si se intenta hacer lo mismo con lo siguiente, dará un error:

```sh {linenos=false}
pipe=\|
cat archivo.txt $pipe more
# Error: no existe el archivo "|"
# Error: no existe el archivo "more"
```
{{< /dropdown >}}

Pero este comportamiento se modifica al usar `eval`:

1. Primero se realizan todas las sustituciones
2. Luego se ejecuta el comando

## Ejecución en segundo plano

Varias formas de ejecutar un comando:

- **Primer plano**: el shell hace `waitpid` (se bloquea y espera) a que termine
  el comando. Este es el comportamiento por defecto.
- **Segundo plano**: lanza el comando pero permite al usuario realizar otros.

```sh {linenos=false}
sleep 10     # Espera 10 segundos
sleep 10 &   # Lanza el mismo comando pero en segundo plano
             # Se puede lanzar otro comando
```

{{< keyvalue "Gestión de procesos en segundo plano" >}}
-% `jobs` :% Mostrar los procesos en segundo plano
-% `fg n` :% Traer el proceso `n` al primer plano
-% `bg n` :% Reanudar un proceso parado en segundo plano
{{< /keyvalue >}}

A mayores, para manejar un proceso en primer plano se puede usar `Ctrl-C` para
matarlo y `Ctrl-Z` para detener su ejecución.

## Tabulador y edición de comandos

Uso de **tabulador** para **completar comandos y rutas a archivos**. Dando dos
veces al tabulador se pueden listar todas las posibilidades.

Durante la edición de comandos en Bash, permite algunos atajos de teclado de
Emacs por defecto. Puede usar `set -o vim` para usar los atajos de Vi.

{{< keyvalue title="Movimientos en Bash" >}}
-% `Ctrl-A` /  `Ctrl-E` :% Ir al inicio / final
-% `Alt-B` / `Alt-F`    :% Moverse una palabra hacia delante / atrás
-% `Ctrl-W` / `Alt-D`   :% Borrar palabra anterior / siguiente
-% `Ctrl-U` / `Ctrl-K`  :% Borra hasta el principio / final
-% `Ctrl-N` / `Ctrl-P`  :% Comando siguiente / anterior
-% `Ctrl-L`             :% Limpia pantalla
-% `Alt-.`              :% Escribir el último argumento
-% `Ctrl-Y`             :% Deshacer
-% `Ctrl-D`             :% Salir
{{< /keyvalue >}}

## Expansiones

> Más información en `man 7 glob`

Una expansión en Bash es **una secuencia que este interpreta y expande antes de
ejecutar el comando**. También se les llaman comodines o _globbing_. Su uso
principal es para sustituir nombres de archivos (_wildcards_):

```sh {linenos=false}
ls -l *.html  # Lista todos los archivos html
```

Nótese que si la expansión falla (no hay archivos que coincidan), **el argumento
se dejará como está**.

{{< keyvalue title="Comodines para archivos" >}}
-% `*`           :% Expande a 0 o más caracteres. No cuentan los archivos ocultos
-% `?`           :% Expande a 1 carácter
-% `[ ]`         :% Expande solo a los caracteres que estén entre los corchetes
-% `[! ]` `[^ ]` :% Igual que antes, pero que no estén los caracteres
{{< /keyvalue >}}

Bash tiene algunos conjuntos de caracteres predeterminados:

- `[[:lower:]]`: cualquier carácter en minúsculas. Equivalente a `[a-z]`.
- `[[:upper:]]`: cualquier carácter en mayúsculas. Equivalente a `[A-Z]`.
- `[[:digit:]]`: cualquier carácter numérico. Equivalente a `[0-9]`.
- `[[:alpha:]]`: cualquier carácter alfanumérico. Equivalente a `[a-zA-Z0-9]`.

{{< dropdown "Ejemplos" >}}
- `cat practica-*.txt`  
  Muestra el contenido de todos los `.txt` que empiecen por `practica-`.

- `ls a*bc`  
  Lista todos los archivos que empiecen por `a` y terminen por `bc`

- `ls a?bc`  
  Lista todos los archivos cuyo nombre es de 4 caracteres, empieza por `a`
  y termina por `bc`.

- `ls [abc]???`  
  Lista todos los archivos cuyo nombre es de 4 caracteres y empieza por `a`, `b`
  o `c`.
{{< /dropdown >}}

{{< keyvalue title="Expansión de comandos" fill=true >}}
-% `` $(comando) `` :% Ejecuta un comando y obtiene su resultado (`stdout`).
-% `` `comando` ``  :%  Equivalente al anterior.
{{< /keyvalue >}}

{{< dropdown "Ejemplos" >}}
```sh {linenos=false}
echo date    # Muestra "date"
echo `date`  # Muestra "lun 12 feb 2024 14:14:54 CET"
echo "Num lineas: $(wc -l fichero)"  # Muestra "Num lineas: 130"
```
{{< /dropdown >}}

{{< keyvalue title="Otras expansiones" fill=true >}}
-% `Hola{1,2,3}`     :% Generación de strings. Genera `Hola1`, `Hola2` y `Hola3` (importante que no haya espacios entre las comas).
-% `Hola{1..3}`      :% Equivalente al anterior. Funciona con letras (según códigos ASCII).
-% `Hola{0..50..5}`  :% Va de 0 a 50 saltando de 5 en 5.
-% `~`               :% Expande al directorio de usuario.
-% `~root`           :% Expande al directorio del usuario especificado.
{{< /keyvalue >}}

## Historial de comandos

Bash mantiene una lista de los comandos previamente usados. Esta tiene un tamaño
definido por `HISTSIZE`, por defecto 1000, y se almacena por defecto en el
archivo `~/.bash_history`.

Los parámetros que denoto entre corchetes pueden ser:

- El índice en el historial
- Un número negativo, siendo -1 el último, -2 el penúltimo, etc
- Una cadena que sea el inicio del comando

{{< keyvalue title="Gestión del historial" fill=true >}}
-% `history`                   :% Muestra todo el historial. Se suele combinar con `grep`.
-% `history -c`                :% Borra todo el historial
-% `fc [inicio] [fin]`         :% Permite ver, editar y reejecutar el rango de los comando `inicio - fin`.
-% `fc -l [inicio] [fin]`      :% Igual que antes, pero solo se listan.
-% `fc -s ANTES=DESPUES [cmd]` :% Sustituye en un comando anterior y lo reejecuta.
{{< /keyvalue >}}

{{< keyvalue title="Expansiones relativas al historial" fill=true >}}
-% `Ctrl-R`           :% Búsqueda de un comando en el historial
-% `!!`               :% Expande al comando anterior. Muy útil para `sudo !!`.
-% `![cmd]`           :% Expande el comando especificado.
-% `!?texto`          :% Expande el comando que contenga `texto`
-% `^cadena1^cadena2` :% Expande al comando que contiene la `cadena1` y la
cambiar por `cadena2`.
{{< /keyvalue >}}

## Variables

Bash permite la creación de variables. Se distinguen dos tipos:

- **Locales** (minúsculas): solo están presentes en el shell actual
- **Globales/Entorno** (mayúsculas): los procesos hijos (comandos externos)
  heredan también estas variables. Nótese que es solo una copia, **si el proceso
  modifica la variable, el shell no se verá afectado**.

{{< keyvalue title="Variables en Bash" fill=true >}}
-% `variable=valor`         :% Crea una variable local.
-% `export VARIABLE=valor`  :% Crea una variable global.
-% `export VARIABLE`        :% Crea una variable global a partir de una local.
-% `VARIABLE=valor comando` :% Crea una variable global solamente para el comando dado.
-% `readonly variable`      :% Marca una variable como solo lectura.
-% `$variable`              :% Expande al valor de la variable.
-% `variable=` <br>
   `variable=""` <br>
   `unset variable`   :% Borra el contenido de la variable.
{{< /keyvalue >}}

El comando `declare` permite declarar variables con determinadas
características, además de mostrar información sobre las variables existentes.

Si se usa `readonly` sin parámetros, se mostrará una lista con todas las
variables de solo lectura. Si se usa `printenv` o `env` se mostrarán todas las
variables de entorno.

{{< block "Importante" "var(--magno-red)" >}}
No poner espacios alrededor de `=`.  
Fíjese que una palabra se interpreta como un comando:

```sh {linenos=false}
una_variable = hola
```

- Comando: `una_variable`
- Parámetro 1: `=`
- Parámetro 2: `hola`
{{< /block >}}

{{< keyvalue title="Operaciones aritméticas" >}}
-% `$(( (4+11)/3 ))` :% Resuelve una expresión aritmética de **enteros** usando
                        una sintaxis similar a C. El texto expande a `0`.
-% `$[ (4+11)/3 ]`   :% Equivalente al anterior.
-% `bc -l`           :% Recibe una expresión de `stdin` y la procesa. Permite
                        variables y variados operadores del estilo de C. Ver
                        `man bc`.
{{< /keyvalue >}}

{{< dropdown "Variables del entorno predefinidas" >}}
- `HOME`: directorio base del usuario actual
- `SHELL`: shell por defecto
- `USER`: nombre de login del usuario actual
- `PWD`: directorio de trabajo actual
- `PATH`: lista de rutas donde buscar ejecutables
- `LD_LIBRARY_PATH`: lista de rutas donde buscar librerías dinámicas
- `MANPATH`: lista de rutas donde buscar documentación del manual
- `LANG`: aspectos de localización geográfica e idioma
- `PS1` y `PS2`: promtps
{{< /dropdown >}}

## Redirecciones

Recuerde que cada proceso tiene asociados 3 archivos especiales para su
Entrada/Salida (toda la E/S se hace a través de archivos en Linux):

- `stdin`  (0): entrada del teclado
- `stdout` (1): salida estándar
- `stderr` (2): error estándar

El comando recibe datos del `stdin` y luego escribe en `stdout` o `stderr`,
dependiendo del caso. Pues el usuario **puede redirigir estos datos a otro
archivo**.

{{< keyvalue title="Operadores de redirección" fill=true >}}
-% `comando < archivo`    :% El comando toma la entrada del archivo.
-% `comando << etiqueta`  :% Toma la entrada para el comando hasta que vuelva a aparecer la etiqueta.
-% `comando <<< "string"` :% Envía el string como entrada para el comando.

-% `comando > archivo`  :% Envía la salida del comando al archivo. Lo sobreescribe si contenía algo.
-% `comando >> archivo` :% Envía la salida del comando al _final_ del archivo.
-% `comando | comando`  :% **Pipe**: la salida del primer comando es la entrada
del segundo.
{{< /keyvalue >}}

{{< dropdown "Ejemplos" >}}
- `ls -l / > root`  
   Crea un archivo (sino lo sobreescribe) llamado `root` con el resultado del
   comando.

- `ls -l ~ >> root`  
   Ahora añade al final del archivo el resultado del comando.

- `> foo`  
   Crea un archivo `foo` vacío. Equivalente a `touch foo`

- `cat > palabras.txt`  
  Si `cat` no recibe ningún archivo, lee del `stdin`. Este comando lee del
  teclado hasta que el usuario hace `Ctrl-D` y lo copia al archivo.

- `cat << END > palabras.txt`  
  Igual que antes, pero cuando se encuentre con `END` terminará de leer de
  teclado.

- `echo "hola que tal" > /dev/pts/<num>`  
  Muestra `hola que tal` en una terminal. Usar el comando `tty` para ver el
  nombre de la terminal.
{{< /dropdown >}}

{{< keyvalue title="Redirección de los descriptores" fill=true >}}
-% `comando 2>&1` :% Envía `stderr` a `stdout`. Si no se pone el `&`, creará un
archivo llamado `1`.
-% `comando &> archivo` :% Envía `stderr` y `stdout` al archivo. Equivalente
a `comando > archivo 2>&1`
{{< /keyvalue >}}

Un lugar muy común para redirigir la salida de un comando es `/dev/null`, la
basura, lo que evita que se muestre nada en la consola.

Es importante que al combinar varias redirecciones de distintos descriptores,
`2>&1` o análogos vaya **siempre al final del comando a redirigir**. Es decir,
si quieres redirigir `stderr` a `stdout` para pasarselo a `grep`, debes hacer
esto:

```bash {linenos=false}
params2stderr prueba test prueba 2>&1 | grep "p"
```

En lugar de:

```bash {linenos=false}
params2stderr prueba test prueba | grep "p" 2>&1
```

En este último intentas redirigir la salida de `grep`, en lugar de la salida del
primer comando.

## Caracteres especiales

La siguiente lista de caracteres reciben un tratamiento especial por parte de
bash:

        Globbing:               * ? [ ] [! ]
        Variables:              $
        Redirección:            < > << >> ` |
        Terminador de comando:  & ;

Por tanto, si quieren utilizar como caracteres literales (no con el significado
que les da Bash), será necesario escaparlos.

{{< keyvalue title="Tratamiento de caracteres especiales" >}}
-% `'` :% Ignora todos los caracteres especiales. El texto no puede contener `'`.
-% `"` :% Ignora todos los caracteres especiales excepto `$` `\` y `` ` ``
-% `\` :% Ignora el caracter especial que viene a continuación. También se puede
usar para ignorar el salto de línea.
{{< /keyvalue >}}

{{< dropdown "Ejemplos" >}}
```sh {linenos=false}
$ echo '$HOME'
$HOME
$ echo "$HOME"
/home/magno
$ echo
```
{{< /dropdown >}}

# Algunos comandos
## Documentación

El número potencial de comandos es muy grande, y cada uno tiene sus propios
subcomandos, con opciones y diferentes parámetros; por lo que resulta muy
difícil aprenderlos todos.

Normalmente, los programas disponen de una opción que muestran alguna ayuda
básica, comúnmente `--help` o `-h`. Para comandos internos se puede usar
`help <comando>`.

``` {linenos=false}
$ fdisk --help
Usage:
 fdisk [options] <disk>         change partition table
 fdisk [options] -l [<disk>...] list partition table(s)

Display or manipulate a disk partition table.

Options:
 -b, --sector-size <size>      physical and logical sector size
 [...]
 -h, --help                    display this help
 -V, --version                 display version

For more details see fdisk(8).
```

Pero el mejor lugar para buscar información concreta es el **manual** (`man`).

{{< block "Manual" "var(--magno-blue)" >}}
Muestra información detallada sobre un comando, aplicación, función C, etc.

```sh {linenos=false}
man fdisk
```

### Navegación por la página

- Desplazamiento: flechas, barra espaciadora, enter o `h j k l`.
- `u d`: mayor desplazamiento
- `q`: salir
- `/texto`: búsqueda
- `n`: siguiente de la búsqueda

Pulsa `h` para ver el resto de opciones disponibles.

### Formato de una página

- Cabecera: nombre del comando y sección.
- `NAME`: nombre y descripción corta del comando.
- `SYPNOSYS`: sintaxis del comando.
- `DESCRIPTION`: descripción detallada del comando y sus opciones.
- Otras secciones con más información: `AUTHOR`, `SEE ALSO`, `EXAMPLES`...

### Organización de las páginas

Se busca según la variable de entorno `MANPATH`. Ver el comando `manpath` para
más información.

Las secciones se buscan en el siguiente orden: `1 8 2 3 4 5 6 7 9`.

| Sección | Contenido                                          |
|:-------:|:---------------------------------------------------|
| 1       | Comandos de usuario y aplicaciones                 |
| 2       | Llamadas del sistema                               |
| 3       | Llamadas de biblioteca                             |
| 4       | Ficheros especiales (`/dev`)                       |
| 5       | Formato de ficheros y convenciones (`/etc/passwd`) |
| 6       | Juegos                                             |
| 7       | Ficheros varios, macros e información adicional    |
| 8       | Comandos de administración (`root`)                |
| 9       | Rutinas del kernel                                 |

### Opciones de CLI

- `man <section>`: especificar la sección
- `man -w`: muestra dónde está el archivo de ayuda
- `man -wa`: muestra dónde están todos los archivos que coincidan
- `man -f`: da una descripción breve. También con `whatis`
- `man -k`: busca por nombre y descripción. También con `apropos`
{{< /block >}}

El comando `whatis` mantiene una base de datos para rápidamente realizar
búsquedas. Se construye con diferentes comandos, dependiendo de la distribución:

```sh
makewhatis
catman
mandb
```

Otro comando interesante puede ser `info`, que es el sistema de manuales de GNU.
Por lo general es más flexible y completo que `man`.

{{< todo >}}
## Básicos
- cd mkdir rmdir rm ln ls echo cat
- less more
- locate find
{{< /todo >}}

## Útiles con pipes y redirecciones

{{< block "`tee`" "var(--magno-green)" "var(--font-color)" >}}
Copia la entrada que recibe de `stdin` y la copia a `stdout` y otros archivos.

```sh {linenos=false}
ls -l /bin | tee archivos.txt | less
```

El comando anterior lista el contenido de `/bin`, lo guarda en el archivo
`archivos.txt` y luego muestra el resultado con `less`.

Con el parámetro `-a` añade al final del archivo en lugar de sobreescribir.
{{< /block >}}

{{< block "`xargs`" "var(--magno-green)" "var(--font-color)" >}}
Lee el `stdin` y pasa esos datos como parámetros a otro comando.

```sh {linenos=false}
locate README | xargs cat
```

El comando anterior encuentra todos los archivos que se llamen `README` y luego
los imprime por pantalla. Nótese que `locate` solo devuelve las rutas.

```sh {linenos=false}
locate README | xargs -I % 'cat %; cp % /tmp'
```

En este otro ejemplo, se hace lo mismo, pero también se hace una copia del
archivo a `/tmp`. `xargs` sustituye cada línea que lee de `stdin` por `%` en el
comando especificado.
{{< /block >}}

## Procesado de texto

{{< block "`awk`" "var(--magno-green)" "var(--font-color)" >}}
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
{{< /block >}}

{{< block "`sed`" "var(--magno-green)" "var(--font-color)" >}}
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
{{< /block >}}

{{< block "`cut`" "var(--magno-green)" "var(--font-color)" >}}
`cut` escribe partes seleccionadas de un archivo a la salida estándar, puede
usarse para seleccionar columnas o campos de un fichero en específico:

- `-b`: selecciona los bytes especificados
- `-c`: selecciona los caracteres especificados
- `-f`: selecciona los campos especificados. Con `-d` se puede cambiar el
delimitador.
{{< /block >}}

{{< block "`tr`" "var(--magno-green)" "var(--font-color)" >}}
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
{{< /block >}}

Otros comandos:

- `grep`: busca una expresión regular. Usar `-E` para expresiones regulares
  extendidas y `-o` para solo mostrar el match. También se puede usar `-v` para
  invertir el resultado (mostrar las líneas que no hacen match).
- `diff`: muestra la diferencia entre dos archivos. Recomiendo `-u --color` para
  hacerlo más legible.
- `sort`: ordena alfabéticamente. Usar `-n` para ordenar numéricamente o `-u`
  para eliminar duplicados. `-r` si quieres invertir el orden.
- `paste`: unir línea a línea dos archivos.
- `tac`: imprime un archivo al revés, la primera línea es ahora la última.
- `rev`: le da la vuelta a los caracteres de cada línea.
- `wc`: con `-l` puedes contar líneas de un archivo, con `-w` palabras, `-c` el
  número de bytes y `-L` la longitud de la línea más larga.
- `head`: imprime las primeras líneas de un archivo. `-n` especifica la cantidad.
- `tail`: lo mismo que `head`, pero imprime las últimas líneas.

# Scripting

La [Bourne Shell], aunque se use como intérprete de comandos, también se pensó
para que se utilizase como un **lenguaje de scripting**.

La idea es básicamente tomar los comandos que estábamos ejecutando en la línea
de comandos y guardarlos en un archivos para reutilizar luego. La extensión
típica para los scripts de Bash es `.sh`, pero técnicamente solo son archivos de
texto plano.

Para ejecutar el archivo se puede le puede pasar a Bash directamente: `bash
script.sh`. Otra alternativa es ejecutarlo como un programa normal, pero es
necesario asignar permisos adecuadamente:

```sh
chmod u+x script.sh
./script.sh
```

Como existen otros lenguajes de scripting que se pueden utilizar (Python,
Perl...) con este método es necesario indicar el intérprete a utilizar en la
primera línea con un **shebang**:

```sh
#!/bin/bash
```

Aquí tienes una [cheatsheet](https://devhints.io/bash) bastante útil.

## Variables útiles

{{< keyvalue title="Parámetros de script o función" >}}
-% `$0`:% es el nombre del script.
-% `$1` a `$9`:% son los primeros parámetros
-% `${10} ${11} ...`:% si hace falta usar más
-% `$#`:% número de todos los parámetros
-% `$* $@`:% lista de todos los parámetros
{{< /keyvalue >}}

{{< keyvalue title="Otras" >}}
-% `$?` :% código de retorno del comando anterior
-% `$$` :% PID del script actual
{{< /keyvalue >}}

## Estructuras de control

Para los condicionales solo se chechea el código de retorno del comando `$?`.

En los bucles también se pueden usar `break` y `continue` (se les puede pasar un
número para salir de ese número de bucles).

```bash
if cmd1
then
    cmd2
elif cmd3
then
    cmd4
else
    cmd5
fi
```

```bash
case valor in
    patron1)
        cmd
        ;;

    patron2)
        cmd
        ;;

    *)      # Caso por defecto
        cmd;
        ;;
esac
```

```bash
for variable in lista
do
    cmd $variable
done
```

Lista debe ser texto, cada elemento estará separado por espacios. Por tanto, es
posible usar las expansiones de Bash vistas anteriormente.

```bash
for ((i=0; i < 5; i++))
do
    cmd $i
done
```

```bash
while cmd
do
    cmd $i
done
```

```bash
until cmd
do
    cmd $i
done
```

## Checks

{{< keyvalue title="Operadores" >}}
-% `[[ ! EXPR ]]` :% Negación
-% `[[ EXPR && EXP ]]` :% Y lógico
-% `[[ EXPR || EXP ]]` :% O lógico
-% `[[ !(EXPR && (EXPR || EXP)) ]]` :% Se pueden usar paréntesis
{{< /keyvalue >}}

{{< keyvalue title="Comprobaciones de strings" >}}
-% `[[ -z "STR" ]]` :% Vacio
-% `[[ -n "STR" ]]` :% No vacio
-% `[[ "STR" == "STR" ]]` :% Son iguales
-% `[[ "STR" != "STR" ]]` :% No son iguales
-% `[[ "STR" ~= REGEX ]]` :% Comprueba expresión regex
{{< /keyvalue >}}

{{< keyvalue title="Comprobaciones numéricas" >}}
-% `[[ NUM -eq NUM ]]` :% Iguales
-% `[[ NUM -ne NUM ]]` :% Diferentes
-% `[[ NUM -lt NUM ]]` :% Menor
-% `[[ NUM -gt NUM ]]` :% Mayor
-% `[[ NUM -le NUM ]]` :% Menor o igual
-% `[[ NUM -ge NUM ]]` :% Mayor o igual
-% `(( NUM == NUM ))` :% Alternativamente se puede usar esta sintaxis para poder
usar los símbolos matemáticos habituales.
{{< /keyvalue >}}

{{< keyvalue title="Comprobaciones de archivos" >}}
-% `[[ -e ARCHIVO ]]` :% Existe
-% `[[ -s ARCHIVO ]]` :% Si su tamaño es mayor que 0 bytes
-% `[[ -d ARCHIVO ]]` :% Es directorio
-% `[[ -f ARCHIVO ]]` :% Es archivo
-% `[[ -r ARCHIVO ]]` :% Se puede leer
-% `[[ -w ARCHIVO ]]` :% Se puede escribir
-% `[[ -x ARCHIVO ]]` :% Se puede ejecutar
{{< /keyvalue >}}

## Comando `read`

El comando `read` se puede utilizar para bastantes cosas. Por ejemplo, leer de
teclado a una variable:

```bash
read -p "Introduzca un dato: " res
printf "Ha instroducido: \"$res\""
```

Leer la primera línea de un fichero (dado que el delimitador es `\n`. Esto se
puede cambiar con `-d`):

```bash
read linea < archivo.txt
```

También se puede iterar sobre un archivo:

```bash
i=1
while read buff
do
    printf "$i: $buff\n"
    i=$[$i+1]
done < archivo.txt
```


## Funciones

```bash
nombre() {
    cmd
    return 0
}
```

Para pasar parámetros se usa la misma sintaxis que con los parámetros de un
script: `$1 ... $9 ${10} ...`, `$*` o `$@`. Para obtener el nombre de la función
debes usar `${FUNCNAME[0]}`, dado que `$0` siempre es el nombre del script.

## Rendimiento

- El shell no es eficiente a la hora de ejecutar trabajos pesados
- Es mejor **dejar que los procesos hagan todo el trabajo**: evitar `expr`, usar
  `$[]` o `$(())`.
- El uso de **lazos con ficheros es muy ineficiente**. Mejor usar comandos que
  operen con ellos (internamente tienen lazos eficientes escritos en C).
- Usar **comandos internos** cuando sea posible.
- **Useless use of any comand** (UUC):
  ```bash
  cat /etc/passwd | grep root
  # es equivalente a
  grep root /etc/passwd
  ```
- **Disminuir redirecciones a fichero** de tipo `>` y `>>`. Los pipes `|` suelen
  ser bastantes eficientes


{{< todo >}}
## Editores de terminal

nano
vim
helix


## Otros
- pushd popd dirs
- tree
- fmt

# Configuración

Como ya he mencionado antes, la configuración de Bash se puede almacenar en el
archivo `~/.bashrc`, que está oculto por defecto.

Para recargar dicha configuración, puedes simplemente volver a ejecutar el
script:

```bash
. ~/.bashrc
# o bien
source ~/.bashrc
```

## Bash Prompt

El prompt se controla usando variables de Bash:

- `PS0`: se muestra en shells interactivas después de leer un comando y antes de
  ejectuarlo.
- `PS1`: prompt primario, por defecto `\s-\v\$`
- `PS2`: prompt secundario, por defecto `> `
- `PS3`: prompt para el comando `select`
- `PS4`: se muestra antes de que un comando muestre _execution trace_, por
  defecto `+`.

```bash
PS3="Enter a number: "

select character in Sheldon Leonard Penny Howard Raj
do
    echo "Selected character: $character"
    echo "Selected number: $REPLY"
done
```

Modificando la variable `PS1`, podrás modificar tu prompt.

{{< keyvalue >}}
-% `\u`              :% Nombre de usuario
-% `\H`              :% Nombre del ordenador completo
-% `\h`              :% Nombre del ordenador hasta el primer `.`
-% `\l`              :% Nombre base de la terminal (?)
-% `\s`              :% Nombre de la shell
-% `\$`              :% Si eres _root_, `#`, sino `$`.
-% `\w`              :% Dirección completa del directorio actual (`$HOME` = `~`)
-% `\W`              :% Directorio actual (`$HOME` = `~`)
-% `\A`              :% Hora actual (24h HH:MM)
-% `\@`              :% Hora actual (12h am/pm)
-% `\t`              :% Hora actual (24h HH:MM:SS)
-% `\T`              :% Hora actual (12h HH:MM:SS)
-% `\d`              :% Fecha con día de la semana, nombre del mes y día (e.g.: `Tue May 26`)
-% `\D{\<formato\>}` :% Fecha con el formato dado. Se formatea con `strftime`.
-% `\j`              :% Número de trabajos de la shell actual
-% `\#`              :% Número de comando
-% `\!`              :% Número de comando en el historial
-% `\\`              :% `\`
-% `\a`              :% Sonido de campana (ASCII)
-% `\n`              :% Nueva línea
-% `\r`              :% Retorno de carro
-% `\nnn`            :% Carácter en formato octal
-% `\e`              :% Carácter especial de ASCII
-% `\[`              :% Secuencia de caracteres no imprimibles
-% `\]`              :% Fin de secuencia de caracteres no imprimibles
-% `\V`              :% Versión de bash completa (e.g.: 2.0.0)
-% `\v`              :% Versión de bash (e.g.: 2.0)
{{< /keyvalue >}}

Colores (uso `\e[<colornum>m...\e[m`):

|          | Fondo | Letra |
| :------: | :---: | :---: |
| Negro    | 40    | 30    |
| Rojo     | 41    | 31    |
| Verde    | 42    | 32    |
| Amarillo | 43    | 33    |
| Azul     | 44    | 34    |
| Violeta  | 45    | 35    |
| Cian     | 46    | 36    |
| Blanco   | 47    | 37    |

Ejemplo:

```bash
export PS1="\e[46m\u@\h:\w\e[m\$ " # en cian: <usuario>@<hostname>:~$
```


## Alias

Un alias es tal y como suena, darle un _nickname_ a un comando que utilizas
mucho, como por ejemplo `ls -lh`.

```bash
# sintáxis: alias aliasname="comando"
alias ll="ls -lh"
```

Otros alias comunes son:

```bash
alias   ..="cd .."
alias  ...="cd ../.."

alias la="ls -lah"
alias rm="rm -i"    # Pide confirmación antes de borrar
alias cp="cp -i"    # Pide confirmación antes de sobreescribir
```

Recuerda que también es posible añadir estos alias a su propio archivo:
`~/.bash_aliases`.

Si quieres ejecutar el comando original en lugar del alias, hay diferentes
formas:

```sh
# alias ls='ls --color=auto'
command ls
/bin/ls
\ls
```


## Shopt

El comando `shopt` puede usarse para cambiar cualquiera de está opciones con el
parámetro `-s`:

{{< keyvalue title="Opciones de `shopt`" >}}
-% `autocd` :%
Permite moverse entre directorios sin necesidad de escribir `cd`.

-% `cdspell` :%
Se corrigen errores en el nombre de un archivo que el usuario escribiera mal.

-% `dirspell` :%
Bash intenta correguir errores de escritura en nombres de archivos durante el
completado.

-% `checkwinsize` :%
Después de cada comando, comprueba que el tamaño en líneas y columnas es
correcto; y si no, lo cambia.

-% `cmdhist` :%
Bash intentará guardar en la misma entrada del historial, un un comando de
multilínea. Esto permite editarlos facilmente.

-% `histappend` :%
Se añade el histórico al archivo descrito en `HISTFILE`

-% `globstar` :%
Permite usar `**` para un wildcard recursivo.

-% `expand_aliases` :%
{{< /keyvalue >}}

Puedes listar todas las opciones con `shopt -p`, y las actualmente configuradas
con `shopt -s`.

Más información: [ComputerHope](https://www.computerhope.com/unix/bash/shopt.htm)


## Bind

También es posible cambiar los atajos de teclado, gracias al comando `bind`.
Puedes encontrar más información en [Computer Hope].

[Computer Hope]: https://www.computerhope.com/unix/bash/bind.htm
- alias
{{< /todo >}}

[zsh]: https://en.wikipedia.org/wiki/Bash_(Unix_shell)
[Bourne Shell]: https://en.wikipedia.org/wiki/Bourne_shell
