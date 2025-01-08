---
title: Comandos útiles para Linux
description: TODO
date: 2023-01-01
weight: -1
draft: true
---

pgrep <nombre>    Busca por procesos y devuelve su ID

Aprender a usar `ps`.

sudo fdisk -l  Muestra todos los discos

`ps` and `grep PROCESS` can be replaced by a `pgrep PROCESS` call, and your whole
thing can simply be replaced by `pkill PROCESS` or a `killall PROCESS`

`xxd` y `od` ver hexadecimal, octal, etc
od test.png -t u1 --endian=big

head, tail, wc

copiar
```sh
uptime | xclip -selection clipboard
uptime | xclip -sel clip
uptime | xsel -ib
```

pegar
```sh
xclip -o -selection clipboard
xclip -o -sel clip
xsel -ob
```
