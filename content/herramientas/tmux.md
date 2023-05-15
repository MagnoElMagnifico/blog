---
title: tmux
description: >
    tmux, un programa de terminal que permite crear otras terminales dentro de
    él: pestañas, divisiones. Así puedes ser mucho más productivo.
date: 2022-08-29
weight: 4
---

`tmux` es un _terminal multiplexer_, un programa que permite, con una sola
pantalla; crear, acceder y controlar varias terminales. Está basado en sesiones,
es decir, colecciones de estas _pseudo terminales_; cada una ocupando su propia
ventana, cuyo comportamiento recuerda un poco a Vim.

Para iniciarlo:

```bash
tmux
```

Y en principio seguimos teniendo una consola, a excepción de la barra
verde informativa abajo de todo, que indica la sesión activa y que estamos en
tmux.

Para salir:

```bash
exit
```


# Vocabulario de tmux

- _Sessions_ o sesiones: contiene una o más ventanas, como si fuese un _workspace_
- _Windows_ o ventanas: contiene paneles y disposiciones de estos. Cada una se puede dividir en varios paneles
- _Panels_ o paneles: una _pseudo terminal_ o una _terminal dentro de otra terminal_

![](https://arcolinux.com/wp-content/uploads/2020/02/tmux-installation-02.png)
Fuente: [Arco Linux](https://arcolinux.com/everthing-you-need-to-know-about-tmux-introduction/)


# Comandos de tmux

Existen varias formas para interactuar con tmux:

- Comandos de teclado: tienen el siguiente aspecto `<prefijo> + <comando>`. Por defecto el prefijo es `ctrl-b`
- Argumentos de línea de comandos: comandos que se le envían a través de la shell: `tmux <comando>`
- Configuración del usuario: tmux lee un archivo de configuración cada vez que se inicia, por defecto busca `~/.tmux.config`

Por ejemplo, para listar las sesiones activas:

```
<ctrl-b>s
```

o desde la línea de comandos

```bash
tmux list-sessions
```

> **El comando más importante**: la ayuda:
>
> - `<prefijo> ?`
> - `tmux list-keys`
> - `:list-keys`
>
> Y a mayores, información sobre todas las sesiones, ventanas, paneles, etc:
> `tmux info`.

> Alternativamente, existe la ayuda en _manpages_: `man tmux` o
> [online](https://www.man7.org/linux/man-pages/man1/tmux.1.html)


## Comandos de teclado

Sesiones:

- `<prefijo> s`: mostrar todas las sesiones (_**s**essions_)
- `<prefijo> $`: renombrar sesión actual
- `<prefijo> d`: separar ¿ventana actual? de la sesión (_**d**etach_)
- `<prefijo> w`: previsualización de la sesión y ventana (_previe**w**_)
- `<prefijo> (` `<prefijo> )`: moverse a la sesión anterior/siguiente

Ventanas:

- `<prefijo> c`: crear ventana (_**c**reate_)
- `<prefijo> ,`: renombrar ventana actual
- `<prefijo> &`: cerrar la ventana actual
- `<prefijo> p/n`: ir a la ventana anterior/siguiente (_**p**revious/**n**ext_)
- `<prefijo> l`: ir a la ventana anterior (_**l**ast_)
- `<prefijo> 0..9`: cambiar a la ventana dado el número

Paneles:

- `<prefijo> %`: dividir panel en horizontal
- `<prefijo> "`: dividir panel en vertical
- `<prefijo> x`: cerrar panel
------------------------------------------------------------
- `<prefijo> <flechas>`: moverse entre paneles
- `<prefijo> ;`: cambiar al último panel activo
- `<prefijo> o`: siguiente panel
- `<prefijo> q`: mostrar los números de panel
- `<prefijo> q 0..9`: ir al panel dado el número
------------------------------------------------------------
- `<prefijo>+<flechas>` `<prefijo> <ctrl+flechas>`: cambiar tamaño del panel
- `<prefijo> { }`: mover el panel a la izquierda/derecha
- `<prefijo> <ctrl-o>`: intercambiar panel con el último
- `<prefijo> <espacio>`: cambiar entre disposiones de paneles
- `<prefijo> z`: activar el zoom (_**z**oom_)
- `<prefijo> !`: convertir panel en ventana

Fuente: [tmux cheat sheet](https://tmuxcheatsheet.com)


## Argumentos de línea de comandos

- `tmux` `tmux new/new-session`: nueva sesión
- `tmux new -s <nombre>`: nueva sesión dado el nombre
- `tmux new -n <nombre-ventana>`: nueva sesión dado el nombre de la ventana
------------------------------------------------------------
- `tmux kill-ses/kill-session -t <nombre>`: elimina la sesión dado el nombre
- `tmux kill-session -a`: elimina la sesión actual
- `tmux kill-session -a -t <nombre>`: elimina todas las sesiones excepto la dada
- `tmux a/at/attach/attach-session [-t <nombre>]`: recarga una sesión antes separada [dado el nombre]
------------------------------------------------------------
- `tmux ls/list-sessions`: muestra todas las sesiones

> **Nota**: Viendo estos comandos, podemos sacar la conclusión de que al
> ejecutar `tmux` se crea una nueva sesión, sales con `<prefijo>d` y
> posteriormente puedes recuperar la sesión con `tmux at`. Para no recuperar la
> sesión, usa `<prefijo>:kill-session`.

> **Nota**: La sesión también guarda la configuración, es decir, si por ejemplo
> cambias el prefijo, este se mantendrá cuando la recuperes.

> **Nota**: puede que se mantengan las sesiones devido al servidor de tmux
> corriendo en el fondo. ¿Si reiniciamos el ordenador, se irá todo a tomar por
> saco?


## Comandos

Este modo es muy similar, por no decir igual, al de Vim. Realizan diversas
acciones y son muy similares a los argumentos de línea de comandos. También, se
usa este "lenguaje" para crear archivos de configuración, cuyas instrucciones se
ejecutarán al iniciarse (igual que Vim, vamos).

- `:new`: nueva sesión
- `:new -s <nombre>`: nueva sesión dado el nombre
- `:attach -d`: separar todas las ventanas de la sesión excepto la actual
- `:swap-window -s 2 -t 1`: reordena las ventanas; en este caso: 2 origen (_**s**ource_) y 1
  destino (_des**t**ination_)
- `:swap-window -t -1`: reordena la ventana actual; en este caso: posición
  anterior
- `:setw synchronize-panes`: activa la sincronización de paneles, es decir,
  envía el mismo comando a todos los paneles


# Modos

Por defecto, tmux permite interactuar con la terminal activa, pero también
existen varios modos en los que poder operar.

- _Copy mode_ o modo copiar: permite seleccionar contenido de la ventana y
  guardarlo en un buffer, para posteriormente pegarlo.

- _View mode_: similar al anterior, pero se inicia cuando un comando genera
  _output_ (como por ejemplo `list-keys`)

- _Choose mode_: permite escoger entre varias opciones, usado en
  `choose_buffer`, `choose-client` y `choose-tree`.


## Modo copiar

Los siguientes atajos son los del modo Vim, actívalos con `setw -g mode-keys vi`.

- `<prefijo> [`: entrar al modo copiar
- `<prefijo> ]`: pegar contenido del buffer

Comandos del modo copiar:

- `<espacio>`: comenzar selección
- `<Esc>`: limpiar selección
- `q`: salir o cancelar (_**q**uit_)
- `v`: cambiar a rectángulo
- `V`: seleccionar línea
------------------------------------------------------------
- `h j k l`: mover el cursor
- `0 $`: inicio/fin de línea (?)
- `H M L`: mover cursor arriba/medio/abajo en la pantalla (_**h**igh_ &
  _**m**edium_ & _**l**ow_)
- `<C-u> <C-d>`: desplazar pantalla arriba/abajo (_**u**p_ & _**d**own_)
- `f F t T`: saltar a carácter (_**f**ind_ & _'**t**il_)

Y demás comandos de movimiento como `w W e E b B <C-f> <C-b> / ? n N ...` también
funcionan. Lista completa en `man tmux` sección _WINDOWS AND PANES_.

tmux, como Vim, mantiene una lista llamada _paste buffers_, cada uno llamado
automáticamente (`buffer0001`, `buffer0002`... hasta `buffer-limit`) o
manualmente. Estos últimos se crean con `:set-buffer` o `:load-buffer`, o
puedes renombrarlos con `:set-buffer -n`. Para usarlos, usa el comando
`paste-buffer`. Estos no tienen límite.


# Configuración

> **TODO**

Al igual que en Vim, se pueden cambiar los atajos de teclado, asignando una
tecla a cada comando con la sentencia `bind[-key]`. También hay opciones de
configuración que se pueden editar con `set`.

- `set -g prefix C-s`: cambiar el prefijo
- `set -g <opción>`: establece una opción para todas las sesiones
- `setw -g <opción>`: establece una opción para todas las ventanas
- `set mouse on`: activa el ratón
