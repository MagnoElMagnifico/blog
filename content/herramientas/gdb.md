---
title: GDB
description: >-
  TODO
weight: 5
draft: true
---

# GDB

Al compilar, es recomendable añadir la opción `-g` para que se guarde
información sobre el código.

Usa el comando `gdb`:

```sh
gdb <executable>
```

## Algunos Comandos

- `help [comando]`: mostrar ayuda sobre el comando
- `file <dirección>`: abre un programa
- `run`: inicia el programa
- `q`: salir
---
- `b <archivo>:<línea>`: breakpoint (un punto donde se detendrá el programa)
- `info break`: muestra info sobre los breakpoints
- `next` o `n`: avanza
- `print <expresión>` o `p <expresión>`: imprime información
- `watch <expresión>`: hace un seguimiento de determinada variable, muestra
- cuando cambia su valor
---
- `layout src`: muestra el código que se está debugging
- `Ctrl + L`: refresca la pantalla para arreglar problemas de renderizado
- `Ctrl + X A`: cierra la ventana del código

[Más opciones](http://www.yolinux.com/TUTORIALS/GDB-Commands.html).
