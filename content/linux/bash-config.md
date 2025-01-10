---
title: Configuración de Bash
description:  >
    TODO
date: TODO
weight: -1
draft: true
---

# Archivos que ejecuta Bash

Consulta este [maravilloso post].

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
[Manual]: https://www.gnu.org/software/bash/manual/html_node/What-is-an-Interactive-Shell_003f.html
[GNU Manual]: https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html
[en esta respuesta de StackOverflow]: https://superuser.com/questions/183870/difference-between-bashrc-and-bash-profile/183980#183980
[maravilloso post]: https://shreevatsa.wordpress.com/2008/03/30/zshbash-startup-files-loading-order-bashrc-zshrc-etc/

