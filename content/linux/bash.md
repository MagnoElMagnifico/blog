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

Bash diferencia entre varias posibilidades cuando una instancia suya es creada.
Por una parte distingue entre **interactiva** y **no interactiva** (si el
usuario tiene un prompt y envía input directamente a Bash; o bien en un script,
donde el usuario no tiene interacción) y entre _**login**_ y _**non-login**_
(cuando un usuario inicia una sesión en bash via terminal, SSH, etc; o cuando
desde una shell se inicia otra). Este último se puede comprobar con `echo $0`,
si devuelve `-bash` será _login_, y `bash` si es _non-login_.

Entonces, en sesiones **interactivas _login_** ejecuta por este orden:

1. `/etc/profile` si existe, y este script ejecuta `/etc/profile.d/*.sh`
2. `~/.bash_profile` si existe
3. `~/.bash_login` si existe
4. `~/.profile` si existe, y este script generalmente ejecuta `~/.bashrc`

```bash
# ~/.profile
if [ -f ~/.bashrc ] # Si .bashrc existe ...
then
    . ~/.bashrc # ... ejecútalo
fi
```

Además, por si todo esto fuese poco, normalmente `~/.bashrc` puede llegar a
ejecutar `~/.bash_aliases`, únicamente dedicado a definiciones de
[alias](#alias). <!-- TODO: bash_completion -->

Se puede evitar la ejecución de todos estos scripts con el argumento
`--noprofile`.

Al cerrar sesión (con `exit`) se ejecuta `~/.bash_logout`.

-----------------------------------------------------------

Para una shell **interactiva _non-login_**:

1. `~/.bashrc` si existe.

Se puede evitar
con el argumento `--norc` o cambiar el archivo con `--rcfile <archivo>`.

-----------------------------------------------------------

Para una sesión **no interactiva** se comporta de esta forma (aunque este código no
está escrito en ningún script):

```bash
if [ -n "$BASH_ENV" ] # Comprueba si existe $BASH_ENV
then
    . "$BASH_ENV" # En tal caso, ejecuta el script en su dirección
fi
```

-----------------------------------------------------------

Finalmente, si bash se invoca con el comando `sh`, se intentará imitar el
comportamiento de dicha shell, pero manteniendo estándares POSIX.

> **Conclusión**: De una forma u otra, los scripts por defecto de `.profile`
> acabarán ejecutando finalmente `.bashrc`, así que yo simplemente colocaría mi
> configuración allí dejando los demás por defecto (que generalmente residen en
> `/etc/skel/`, por si los quieres recuperar).

**Fuente**: [GNU Manual] y el [Manual] sobre bash.

[Manual]: https://www.gnu.org/software/bash/manual/html_node/What-is-an-Interactive-Shell_003f.html
[GNU Manual]: https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html

# Bash config

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
- `PS3`: prompt para el comando `select`, ejemplo:
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

- `\u`: nombre de usuario
- `\H`: nombre del ordenador completo
- `\h`: nombre del ordenador hasta el primer `.`
- `\l`: nombre base de la terminal (?)
- `\s`: nombre de la shell
- `\$`: (UID == 0)? `#` : `$`. Es decir, si eres _root_, `#`, sino `$`.
-----------------------------------------------------------
- `\w`: dirección completa del directorio actual (`$HOME` = `~`)
- `\W`: directorio actual (`$HOME` = `~`)
-----------------------------------------------------------
- `\A`: hora actual (24h HH:MM)
- `\@`: hora actual (12h am/pm)
- `\t`: hora actual (24h HH:MM:SS)
- `\T`: hora actual (12h HH:MM:SS)
- `\d`: fecha con día de la semana, nombre del mes y día (e.g.: `Tue May 26`)
- `\D{<formato>}: fecha con el formato dado. Se formatea con `strftime`.
-----------------------------------------------------------
- `\j`: número de trabajos de la shell actual
- `\#`: número de comando
- `\!`: número de comando en el historial
-----------------------------------------------------------
- `\\` = `\`
- `\a`: sonido de campana (ASCII)
- `\n`: nueva línea
- `\r`: retorno de carro
- `\nnn`: carácter en formato octal
- `\e`: carácter especial de ASCII
- `\[`: secuencia de caracteres no imprimibles
- `\]`: fin de secuencia de caracteres no imprimibles
-----------------------------------------------------------
- `\V`: versión de bash completa (e.g.: 2.0.0)
- `\v`: versión de bash (e.g.: 2.0)

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
# sintáxis: alias <aliasname>="<comando>"
alias ll="ls -lh"
```

Otros alias comunes son:

```bash
alias   ..="cd .."
alias  ...="cd ../.."
alias ....="cd ../../.."
alias   .4="cd ../../../.."
alias   .5="cd ../../../../.."

alias la="ls -lah"
alias rm="rm -i"    # Pide confirmación antes de borrar
alias cp="cp -i"    # Pide confirmación antes de sobreescribir
```

Recuerda que también es posible añadir estos alias a su propio archivo:
`~/.bash_aliases`.

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
