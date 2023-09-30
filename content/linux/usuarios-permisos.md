---
title: Usuarios y Permisos
description: >
    Cómo crear/modificar/eliminar usuarios en Linux. Grupos de usuarios.
    Permisos de archivos.
date: 2023-09-30T14:48:28+02:00
weight: -1
draft: true
---

# Usuario

<!-- TODO: definición -->

## `/etc/passwd`

Este archivo contiene la lista de todos los usuarios. Este es su formato:

```
username : password : UID : GID : comment : homedir : shell
```

- `username`: `magno`, `root`
- `password`: si aparece una `x` es que están encriptadas y almacenadas en
  `/etc/shadow`.
- `UID`: identificador del usuario
- `GID`: identificador del grupo
- `comment`: comentario
- `homedir`: `/home/magno/`, `/root`
- `shell`: `/bin/bash`, `/usr/sbin/nologin`

{{< block "Nota" >}}
Para filtrar se pueden usar los comandos `cut` y `awk`:

```sh
cat /etc/passwd | cut -d: -f1
cat /etc/passwd | awk -F: '{print $1}'
```
{{</ block >}}

## `who`

Este comando permite saber quien está conectado.

Alternativamente puedes usar `users`, aunque da menos información.

# Grupos

## `/etc/group`

Similar a `/etc/passwd`:

```
groupname:password:GID:users
```

- `users`: usuarios que pertenecen a ese grupo

## `groups`

Este comando permite saber en qué grupos se encuentra un usuario.

```sh
groups [usuario]
```

# Permisos

## Archivos

```
$ ls -l
d rwx rwx rwx  usuario grupo ...
```

## Permisos especiales

- `SUID`: permite ejecutar el archivo como el usuario dueño.
- `SGID`: permite ejecutar el archivo como el grupo dueño.

## `chmod`

```
chmod ugo +- rwx archivo
```

## `chown`

Cambia el dueño de un archivo

## `chgrp`

Cambia el grupo dueño de un archivo


https://www.redhat.com/sysadmin/linux-file-permissions-explained
