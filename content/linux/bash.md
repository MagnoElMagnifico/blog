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

Para dejarlo más claro está, algunos ejemplos son [Windows Terminal] o
[Alacritty]. 

[Windows Terminal]: https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701
[Alacritty]: https://github.com/alacritty/alacritty/

# Consola

Esta es un tipo de terminal. Históricamente la consola era un monitor y un
teclado conectados a un puerto dedicado para tener comunicación directa y de
bajo nivel con el Sistema Operativo. Los sistemas Linux actuales ofrecen
_consolas virtuales_, a las que puedes acceder con `Alt + F1` o `Alt + Ctrl +
F1`, siendo cada tecla de función una consola distinta.

# Bashrc

<!-- TODO:
https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html -->

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

# _Bash profile_ y _profile_

Si `.bashrc` se ejecuta para shells interactivas, `.profile` o `.bash_profile`
tienen el mismo uso.

<!-- TODO: dudoso -->
 
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
