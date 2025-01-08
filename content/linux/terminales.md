---
title: Shell, Bash y Bashrc
weight: -1
date: 2022-08-31
description: >-
    Guia breve sobre Bash, diferencias con Shell, terminal, consola y prompt.
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

Fuente: [StackOverflow Shell vs Console vs Terminal][fuente]

[fuente]: https://superuser.com/questions/144666/what-is-the-difference-between-shell-console-and-terminal


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


# Prompt

Un _command prompt_ es un campo de entrada para comandos del usuario, y en bash
suele tener este aspecto (aunque es personalizable):

```
<username>@<hostname>:~$
```

El `~` representa el directorio actual, así que si haces `cd
blog/content/linux/` por ejemplo, cambiará a:

```
<username>@<hostname>:~/blog/content/linux$
```

Y en caso de ser _root_:

```
root@<hostname>:~/blog/content/linux#
```


# Archivos que ejecuta Bash

Consulta este [maravilloso post](https://shreevatsa.wordpress.com/2008/03/30/zshbash-startup-files-loading-order-bashrc-zshrc-etc/).

Bash diferencia entre varias posibilidades cuando una instancia suya es creada.
Se distingue entre:

- **interactiva** y **no interactiva**: si el usuario tiene un prompt y envía
  input directamente a Bash; o bien en un script, donde el usuario no tiene
  interacción.
- _**login**_ y _**non-login**_: cuando un usuario inicia una sesión en bash via
  terminal, SSH, etc; o cuando desde una shell se inicia otra.

Este último se puede comprobar con `echo $0`, si devuelve `-bash` será _login_,
y `bash` si es _non-login_.

{{<
    figure
    alt  = "Diagrama de ejecución de archivos de bash"
    src  = "https://shreevatsa.files.wordpress.com/2008/03/bashstartupfiles1.png"
    link = "https://shreevatsa.files.wordpress.com/2008/03/bashstartupfiles1.png"
>}}

Bash funciona de la siguiente forma. Lee las columnas hacia abajo. **Primero
ejecuta A, luego B, entonces C, etc**. B1, B2, B3 signfica que solo ejecuta el
primero de los que encuentre.

```goat
.----------------+-----------+-----------+------.
|                |Interactive|Interactive|Script|
|                |login      |non-login  |      |
+----------------+-----------+-----------+------+
|/etc/profile    |   A       |           |      |
+----------------+-----------+-----------+------+
|/etc/bash.bashrc|           |    A      |      |
+----------------+-----------+-----------+------+
|~/.bashrc       |           |    B      |      |
+----------------+-----------+-----------+------+
|~/.bash_profile |   B1      |           |      |
+----------------+-----------+-----------+------+
|~/.bash_login   |   B2      |           |      |
+----------------+-----------+-----------+------+
|~/.profile      |   B3      |           |      |
+----------------+-----------+-----------+------+
|BASH_ENV        |           |           |  A   |
+----------------+-----------+-----------+------+
|                |           |           |      |
+----------------+-----------+-----------+------+
|                |           |           |      |
+----------------+-----------+-----------+------+
|~/.bash_logout  |    C      |           |      |
'----------------'-----------'-----------'------'
```

Por lo que se puede concluir con:

- `bash_profile` debe ser super sencillo y solamente carga `.profile` y `.bashrc`
  en ese orden.

- `profile` configuración no específica a Bash, debe ser compatible con `sh`:
  `bash`, `zsh`, `ksh`... Esto puede ser variables del entorno (`$PATH`),
  variables para aplicaciones gráficas y demás.

- `bashrc` tiene la configuración de la shell interactiva: _prompt_, `$EDITOR`,
  `alias`, etc. No debe imprimir nada.

Se puede evitar la ejecución de todos estos scripts con el argumento
`--noprofile`.

Al cerrar sesión (con `exit`) se ejecuta `~/.bash_logout`.

**Fuente**: [GNU Manual] y el [Manual] sobre bash. Más información [en esta
respuesta de StackOverflow].

[Manual]: https://www.gnu.org/software/bash/manual/html_node/What-is-an-Interactive-Shell_003f.html
[GNU Manual]: https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html
[en esta respuesta de StackOverflow]: https://superuser.com/questions/183870/difference-between-bashrc-and-bash-profile/183980#183980


## Path

También es común modificar la variable _PATH_ en esta configuración, y poder
ejecutar programas de directorios personalizados:

```bash
export PATH=$PATH:<new/path>
```

> **Nota**: Ojo con modificar esta variable, ya que podrías eliminar todo el
> contenido y no podrías ejecutar nada.


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
