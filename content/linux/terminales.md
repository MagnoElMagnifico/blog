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
