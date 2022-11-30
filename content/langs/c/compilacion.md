---
title: Compilación en C
date: 07-11-2022 12:45
draft: true
---

```sh
#!/bin/bash

### Todo ###
gcc main.c suma.c -o all
# General: gcc *.c -o run

### Código objeto ###
gcc -c suma.c
gcc main.c suma.o -o obj

### Static lib ###
# También antes de nada: gcc -c suma.c
# Luego usar suma.o
gcc -static -c suma.c 
ar rs libsuma.a suma.o # Importante que empiece por lib
gcc main.c -o staticlib -L$PWD -lsuma

### Dynamic lib ###
gcc -shared suma.c -o libsuma.so
# Error: no encontró suma.
#gcc main.c -o sharedlib -lsuma
gcc main.c -o sharedlib -L$PWD -lsuma
# Error al ejecutar el programa: no se encontró suma
# Opción 1:
export LD_LIBRARY_PATH=$PWD:$LD_LIBRARY_PATH
# Opción 2: (-Wl le envía al enlazador argumentos separados por comas)
gcc main.c -o sharedlib -L. -lsuma -Wl,-rpath=$PWD

### Instalación de una librería compartida ###
# Como root
cp $PWD/libsuma.so /usr/lib    # o /usr/local/lib
chmod 0755 /usr/lib/libsuma.so
# (U)ser / owner can read, can write and can execute. (G)roup can read, can't write and can execute. (O)thers can read, can't write and can
# Update cache y crear un link
ldconfig
# Comprobación
ldconfig | grep suma
# Recompilación
gcc main.c -o sharedinstalled -lsuma
```
