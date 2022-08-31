---
title: Shell, Bash y Bashrc
weight: 1
date: 2022-08-31

extra:
    show_toc: true
    show_info: true
    ref_link:
        name: StackOverflow Shell vs Console vs Terminal
        link: https://superuser.com/questions/144666/what-is-the-difference-between-shell-console-and-terminal
---

<!-- TODO: teletyper tty -->
<!-- TODO: prompts -->

# Shell y Bash

Una _shell_ un tipo de software que provee de una interfaz para los usuarios de
un sistema operativo para que estos puedan interactuar con el _kernel_ y sus
servicios. Puedes imaginarlo como una capa (concha) alrededor del kernel y sus
servicios 

También existen _shells_ para diversos lenguajes de programación, por ejemplo,
ejecuta `python` sin ningún argumento (sal con `exit()`).

En la práctica, la shell es un intérprete que ejecuta los comandos que el
usuario le dé.

La shell estándar que casi todos sistemas Linux modernos utilizan es _Bourne
Again Shell_ (`bash`), que es derivada de _Bourne Shell_ (`sh`), la primera que
apareció en Unix. Otras alternativas populares son `ZSH` y `Fish`. Y en Windows
se usa `Powershell`.

# Terminal

Una terminal es el programa que ejecuta una shell, lee el input del usuario y se
lo pasa a esta última para que pueda ser procesado, además de presentar el
resultado.

Hace décadas, consistía en varios dispositivos físicos, y a medida que los
sistemas Unix/Linux fueron mejorarado, estos se abstrayeron a software. Por lo
tanto estos también se pueden llamar **emuladores de terminal** y
**pseudo-terminales**.

Para dejarlo más claro, algunos ejemplos son [Windows Terminal] o
[Alacritty]. 

[Windows Terminal]: https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701
[Alacritty]: https://github.com/alacritty/alacritty/

# Consola

Esta es un tipo de terminal. Históricamente la consola era un monitor y un
teclado conectados a un puerto dedicado para tener comunicación directa y de
bajo nivel con el Sistema Operativo. Los sistemas Linux actuales ofrecen
_consolas virtuales_, a las que puedes acceder con `Alt + F1` o `Alt + Ctrl +
F1`, siendo cada tecla de función una consola distinta.

# Archivos que ejecuta Bash

Fuente: [GNU Manual]

Primero debemos definir qué es una sesión de shell interactiva y no interactiva.

Una shell interactiva es aquella que se inició sin argumentos de línea de
comandos, es decir, sin el parámetro `-c`. El input y el output están
conectadas a una terminal (determinado por `isatty`). Generalmente lee y escribe
a la terminal del usuario. Una shell no interactiva será aquella que no cumpla
estas condiciones. [Manual].

Mejor con ejemplos:

- La _bash_ normal es interactiva: puedes escoger el comando anterior con las
  flechas, escribir en esta y tienes un prompt.

- Un script no es interactivo, un usuario no tiene interación con los comandos
  que se están ejecutando.

- Si un hacker consigue ejecutar enviar un archivo que permita ejecutar un
  comando, podría crear un script así:

```py
while True:
    command = input('> ')
    payload = 'http..../pwded.php?cmd=bash -c "' + command + '"'
    # Enviar payload
    print(response)
```

Con esto consigue enviar comandos con un "prompt" pero no es una sesión
interactiva, solo está ejecutando comandos aislados y imprimimiendo la
respuesta, haciendo que sea similar a una consola, pero no lo es (no tienes una
shell). Si cambias de directorio, en el siguiente comando, sigues en el mismo.

Entonces, en sesiones interactivas _login_ ejecuta por este orden:

1. `/etc/profile` si existe
2. `~/.bash_profile` si existe
3. `~/.bash_login` si existe
4. `~/.profile` si existe

Se puede evitar con el argumento `--noprofile`

Al cerrar sesión (con `exit`) se ejecuta `~/.bash_logout`

Para una shell interactiva _non-login_: `~/.bashrc` si existe. Se puede evitar
con el argumento `--norc` o cambiar el archivo con `--rcfile <archivo>`. Muchas
veces aparecerá el siguiente código en los _profiles_ para ejecutar tambiés la
configuración de las _non-login_ de `.bashrc`:

```bash
if [ -f ~/.bashrc ] # Si .bashrc existe ...
then
    . ~/.bashrc # ... ejecútalo
fi
```

Para una sesión no interactiva se comporta de esta forma (aunque este código no
está escrito en ningún script):

```bash
if [ -n "$BASH_ENV" ] # Comprueba si existe $BASH_ENV
then
    . "$BASH_ENV" # En tal caso, ejecuta el script en su dirección
fi
```

Finalmente, si bash se invoca con el comando `sh`, se intentará imitar el
comportamiento de dicha shell, pero manteniendo estándares POSIX.

[Manual]: https://www.gnu.org/software/bash/manual/html_node/What-is-an-Interactive-Shell_003f.html
[GNU Manual]: https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html

# Bash config

El archivo `.bashrc` está situado en la carpeta del usuario y oculto por
defecto. La plantilla para todos los nuevos usuarios se copia desde
`/etc/skel/.bashrc`. Contiene código escrito en _bash_ que se ejecuta cada vez
que el usuario propietario del archivo inicia sesión, lo que permite establecer
una configuración para esta.

> **Nota**: Se ejecuta con la condición de que inicie sesión de forma
> interactiva, es decir, accediendo a al shell de comandos puramente y no
> ejecutando un único comando como en `bash -c "pwd"`.
> 
> Para comprobarlo, si tienes un alias en tu `.bashrc`, por ejemplo:
> 
> ```bash
> alias ll="ls -l"
> ```
>
> Y lo ejecutas con bash de forma no interactiva:
> ```bash
> bash -c "ll"
> ```
> 
> Dará un error, ya que dicho alias no existe, no se ha ejecutado el archivo de
> configuración.

## Bash Prompt

`PS1`

## Alias

## Colores de ls

Puedes cambiar los colores de salida del comando `ls` editando la variable
`LS_COLORS`. Le puedes asignar a cada posible elemento (directorio, archivo,
enlace, etc) el color que quieras con esta clave:

- Azul: `34`
- Verde: `32`
- Verde Claro: `1;32`
- Cian: `36`
- Rojo: `31`
- Violeta: `35`
- Marrón: `33`
- Amarillo: `1;33`
- Blanco: `1;37`
- Gris Claro: `0;37`
- Negro: `30`
- Gris oscuro: `1;30`
-----------------------------------------------------------
- `di`: directorio
- `fi`: archivo
- `ln`: enlace simbólico
- `pi`: archivo _fifo_
- `so`: archivo _socket_
- `bd`: archivo de tipo _block_ (_buffered_)
- `cd`: archivo especial (_character unbuffered_)
- `or`: enlace simbólico roto, es decir, dirección que no existe (huérfano)
- `mi`: archivo que no existe, al que apunta algún enlace simbólico.

<!-- TODO: enlace con @/linux/files -->

Ejemplo:

```bash
LS_COLORS=$LS_COLORS:'di=0;35:' # Concatena el valor al resto de la variable
export LS_COLORS
```
 
# Atajos de teclado estándar para terminal

Por defecto usa los atajos de Emacs:

- `<C-a>`: inicio de línea (_st**a**rt_)
- `<C-e>`: fin de línea (_**e**nd_)
------------------------------------------------------------
- `<C-b>`: moverse atrás un _char_ (_**b**ack_)
- `<C-f>`: moverse adelante un _char_ (_**f**orward_)
- `<A-b>`: moverse atrás una palabra (_**b**ack_)
- `<A-f>`: moverse adelante una palabra (_**f**orward_)
------------------------------------------------------------
- `<C-w>`: borrar palabra anterior (= ctrl-backspace)
- `<A-d>`: borrar palabra siguiente
- `<C-u>`: borrar hasta el inicio (vim: `d0`)
- `<C-k>`: borrar hasta el final (vim: `D`)
------------------------------------------------------------
- `<C-y>`: deshacer
- `<A-.>`: escribir último argumento (similar a `!$`)
- `<C-p>`: comando anterior (_**p**revious_) (up\_arrow)
- `<C-n>`: comando siguiente (_**n**ext_) (down\_arrow)
- `<C-l>`: limpiar pantalla
- `<C-d>` = `exit`
- `!!`: se sustituye por el útimo comando. Útil en casos de `sudo !!`.
