---
title: Algunos comandos de Windows
description: >
    Algunos comandos de CMD.exe básicos, atajos de teclado y funciones
    especiales como tuberías.
date: 2021-07-30
weight: 1 # Mover de content? Network tendrá carpeta propia y será el único que quede
draft: true
---


# Atajos

+ `WIN + R`: ejecutar (cmd - notepad - dxdiag - mspaint - explorer).
+ `WIN + E`: bibliotecas.
+ `WIN + G`: grabar con XBox Game Bar.
<!-- TODO: Añadir más -->


# Tipos de comandos

+ **Internos**: son aquellos que están dentro del propio CMD.exe, y se cargan a
la vez que el `SO`.
+ **Externos**: se encuentran en diversos directorios, y se cargan en memoria
cuando es necesario gracias a la variable del entorno `PATH`.


# Variables del entorno

Las variables del entorno son valores que guarda el sistema operativo.

+ Constan de un nombre y un valor, ambos texto: `<nombre>=<valor>`
+ El valor es normalmente un directorio, aunque puede ser texto o números.
+ Obtenemos su valor de la siguiente forma `%<nombre>%`.


## PATH

Esta variable es especial, define aquellas carpetas donde guardamos los
programas que ejecuta CMD. De lo contrario, para ejecutar un programa en la
consola, tendríamos que escribir su dirección completa.


# Comandos

Características:

- No distingue mayúsculas de minúsculas
- Usa el tabulador para el autocompletado
- Las teclas de función tienen cada una su uso
- Si un archivo tiene espacios, da todo su nombre entre comillas (`""`)
- `Flechas`: navegar entre comandos anteriores
- `Ctrl + C`: detiene un programa

- `echo <mensaje>`: imprime en pantalla el mensaje
- `cd <carpeta>`: cambia la carpeta actual (`..` para ir atrás)
- `dir <carpeta>` muestra los archivos en la carpeta actual
- `mkdir <carpeta>`: crea una carpeta dentro de la actual
- `copy <archivo> <destino>`: copia un archivo a otro lugar
- `move <archivo> <destino>`: mueve un archivo y lo pega en otro lugar.
- `del <archivo>`: borra un archivo
- `rmdir <carpeta>`: borra una carpeta
- `rename <archivo> <nombre>`: renombra un archivo
- `cls`: limpia la pantalla
- `exit`: cierra la terminal
- `help`: muestra ayuda
- `type <archivo>`: permite ver un archivo desde la terminal
- `time`: muestra la hora
- `color -h:` configura el color de la consola

- `<comando> && <comando>`: varios comandos a la vez


## Tuberías

Redirigen la salida de un comando a otro)

- `<comando> | find “<query>”`: filtra la salida
- `<comando> | more`: imprime la salida línea a línea
- `<comando> | clip`: copia la salida
- `<comando> > <archivo>`: guarda la salida en un archivo
  - `echo “hola” > test.txt`: escribe `hola` en un archivo llamado `test.txt`
  - `echo “hola” >> test.txt`: añade `hola` a un archivo llamado `test.txt`


# Archivos ejecutables

Podemos extraer todo esto de los comandos a programas ejecutables simplemente
escribiendo los comandos en una línea nueva de un archivo `.sh` (Unix) o `.bat`
(Windows)
