---
title: Usuarios
description: >
    Cómo crear/modificar/eliminar usuarios en Linux. Grupos de usuarios. Uso
    básico de los comandos `passwd`, `useradd`, `groupadd`, `su`, `sudo`
    y otros. Los archivos `/etc/passwd`, `/etc/shadow`, `/etc/groups`
    y `/etc/gshadow`.
date: 2023-09-30T14:48:28+02:00
weight: 8
draft: true
---

<!-- TODO: poner permisos aquí ? -->

# Usuarios

Todo usuario de un sistema Unix debe tener una cuenta para poder acceder.

{{< block "Cuenta de usuario" "var(--magno-blue)" >}}
Se trata de una colección de características lógicas que especifican quién es el
usuario y lo que puede hacer dentro del sistema.

Se incluye:

-   Nombre de usuario (_login name_ o _username_) e identificador numérico [UID].
-   La contraseña (_passwd_).
-   Grupo o grupos a los que pertenece, con un identificador numérico del grupo
    por defecto ([GID][UID]).
-   Directorio en `/home`
-   _Login shell_
-   Colección de ficheros de inicio

[UID]: {{< ref "so/archivos/#identificadores-de-usuario-y-grupo" >}}
{{< /block >}}

Entre las cuentas asociadas a los usuarios se pueden encontrar diferentes tipos:

-   Cuentas normales de **usuario**.
-   Cuenta del **administrador** ([superusuario] o _root_).
-   Cuentas especiales de **servicios**, usados por los servicios internos. Esto
    aumenta la seguridad al evitar que se ejecuten como _root_ y se tiene un
    mayor control sobre sus capacidades.

## Superusuario

El **superusuario** es un usuario especial que tiene todos los permisos y actúa
a modo de administrador del sistema. Su nombre de login es `root` (aunque se
puede cambiar).

- Puede acceder a todos los archivos del sistema
- Puede crear otros usuarios
- Puede instalar y borrar software
- Puede matar cualquier proceso del sistema
- Puede apagar y reiniciar la máquina

Se puede cambiar la contraseña de cualquier usuario (como root o ese mismo
usuario usando el comando `passwd`.

{{< dropdown "Recomendaciones para elegir una contraseña" >}}
- No usar el nombre de _login_ ni variantes
- Tampoco datos personales como DNI, nombre, teléfono, etc
- No repetir contraseñas
- Usar contraseñas largas: 12 o más caracteres
- Mezclar letras mayúsculas y minúsculas, números y puntuación
{{< /dropdown >}}

# Archivos de información sobre los usuarios

{{< keyvalue title="Archivos de información sobre los usuarios" key-header=true >}}
-% `/etc/passwd` :%
Mantiene la información principal de cada cuenta:

- Nombre de usuario
- UID
- GID
- _Login shell_
- `/home`
- Contraseña si no está encriptada
- ...

-% `/etc/shadow` :%
Fichero sin permiso de lectura que guarda las contraseñas encriptadas.

-% `/etc/group` :%
Información sobre los grupos definidos, similar a `/etc/passwd`.

-% `/etc/gshadow` :%
Contraseñas para los grupos.

-% `/etc/skel` :%
Contiene los ficheros iniciales de nuevos usuarios, a modo de plantilla.
{{< /keyvalue >}}

## `/etc/passwd`

Este archivo contiene la lista de todos los usuarios. Este es su formato:

```
username : password : UID : GID : GECOS : homedir : shell
```

Si aparecen `::` seguidos, el campo está vacío.

-   `username`: identificación del usuario en el sistema.
    - Único en toda la organización, no solo la máquina local.
    - Preferiblemente corto, todo en minúsculas con caracteres ASCII.
    - Fácil de recordar.
    - Formato fijo (`nombreapellido` por ejemplo).
-   `password`: si aparece una `x` es que están encriptadas y almacenadas en
    `/etc/shadow`.
-   `UID`: identificador del usuario (entero).
    - 0: root
    - 1 - 999: usuarios especiales del sistema
    - 1000 - 65535: usuarios normales
-   `GID`: identificador del grupo principal del usuario (entero)
-   `GECOS`: comentario sobre el usuario, como su despacho, teléfono, etc.
-   `homedir`: `/home/magno/`, `/root`
-   `shell`: `/bin/bash`, `/usr/sbin/nologin`

{{< block "Nota" >}}
Para filtrar se pueden usar los comandos `cut` y `awk`:

```sh
cat /etc/passwd | cut -d: -f1
cat /etc/passwd | awk -F: '{print $1}'
```
{{</ block >}}

## `/etc/shadow`

Fichero de acceso restringido que almacena contraseñas encriptadas.

```
pepe:$1$.QKDPc5E$SWlkjRWexrXYgc98F.:12825:0:90:5:30:13096:
```

<!-- TODO: qué es cada campo? -->

## `/etc/group`

Similar a `/etc/passwd`: almacena información sobre los grupos de usuarios.

```
groupname : password : GID : user1,user2...
```

La contraseña es una `x` si se almacena en `/etc/gshadow` (mismo formato que
`/etc/shadow`). No suele usarse.

Algunos grupos:

- `users`: usuarios normales
- `sudo`: permite al usuario ejecutar comandos como _root_ usando `sudo`
- `http`: puede gestionar los servicios web
- `games`: puede gestionar los juegos

# Comandos

{{< keyvalue title="Mostrar información sobre usuarios y grupos" key-header=true >}}

-% `who` :%
Este comando permite saber quien está conectado. \
Alternativamente puedes usar `users`, aunque da menos información.

-% `groups [username]` :%
Este comando permite saber en qué grupos se encuentra un usuario.

{{< keyvalue-sep title="Creación de usuarios y grupos" >}}

-% `useradd opts usuario` <br> (Bajo nivel) :%
Añade un nuevo usuario al sistema.

- `-m`: crear directorio home y copiar `/etc/skel`
- `-c geckos`
- `-g grupo_principal`
- `-G grupo2,grupo3...`
- `-s /bin/bash`
- `-p clave`: cifrada con `mkpasswd`
- `-e YYYY-MM-DD`: fecha de expiración de la cuenta

-% `userdel` :%
Borra un usuario

-% `usermod` :%
Modifica los parámetros de un usuario

-% `groupadd`, `groupdel`, `groupmod` <br> (Bajo nivel) :%
Creación, eliminación y modificación de grupos a bajo nivel.

-% `mkpasswd` :% Cifra una contraseña.
-% `adduser`, `deluser` <br> `addgroup`, `delgroup` <br> (Alto nivel) :%
Creación de usuarios y grupos a alto nivel en función de la configuración
especificada en `/etc/adduser.conf`.
_Frontend_ para `useradd`, `usermod` y `userdel`; `groupadd`, `groupmod` y `groupdel`.

-% `newusers`, `chpasswd` :% Creación y edición de usuarios simultáneamente.

{{< keyvalue-sep title="Gestión de usuarios y grupos" >}}
<!-- TODO: recuperación de contraseñas -->

-% `vipw` :%
Permite editar `/etc/passwd` y `/etc/groups` de forma segura. Si se le pasa la
opción `-s` se usa para `/etc/shadow` y `/etc/gshadow`.
-% `passwd` :% Permite fijar o cambiar la contraseña de un usuario.
-% `chage [username]` <br> _Change Age_ :%
Permite cambiar la información de expiración de la contraseña. Ver información
con `chage -l`.

-% `gpasswd` :% Gestión de grupos (clave y miembros) por _root_.
-% `newgrp` :%
El propio usuario (no _root_) puede cambiar de grupo con `newgrp`:

- Si el usuario es miembro, no se le preguntará la contraseña.
- Si el usuario no es miembro y el grupo tiene contraseña, se le preguntará.
- Si el usuario no es miembro y el grupo no tiene contraseña, se denegará el cambio.

{{< keyvalue-sep title="Permisos" >}}
-% `chmod` :% Cambia los permisos de un archivo.
-% `chown` :% Cambia el dueño de un archivo
-% `chgrp` :% Cambia el grupo dueño de un archivo

{{< keyvalue-sep title="Otros" >}}
-% `su [-] username` :% Cambia de usuario. Si no se especifica, pasa a _root_.
-% `sudo [-u usuario] cmd` <br> _Super-User Do_ :%
Ejecuta un comando como otro usuario.

-   Un usuario del grupo `sudo` (también llamado `wheel`) puede ejecutar
    cualquier comando
-   En caso contrario, los permisos se definen en `/etc/sudoers`. Se puede
    editar con `visudo`, que solo guarda si el formato es adecuado.
{{< /keyvalue >}}

## Creación de una cuenta

Los pasos para hacerlo manualmente son:

1.  Añadir una nueva línea a `/etc/passwd` con la información adecuada. \
    Para evitar la corrupción del archivos, se usa `vipw`. Solo guarda el
    archivo si el formato es correcto.
2.  Editar el archivo `/etc/shadow`.
    - La contraseña debe escribirse cifrada. Usar `passwd`.
    - Para evitar la corrupción, usar `vipw -s`.
3.  (Opcional) Editar `/etc/groups` para añadir el nuevo grupo del usuario
    o asignarle grupos.
4.  (Opcional) Editar `/etc/gshadow` para también poner los miembros. Para no
    usar contraseña, escribir `*` o `!`.
5.  Crear el directorio del usuario: `mkdir /home/usuario`
6.  Copiar los archivos de `/etc/skel`: `cp /etc/skel/* /home/usuario`
7.  Usar `chown`, `chgrp` y `chmod` para fijar el propietario, grupo y permisos
    adecuados.
8.  Fijar la contraseña con `passwd usuario`. El usuario la cambiará tan pronto
    como pueda, esto puede forzase con `passwd -e`.

Alternativamente se puede usar `useradd`.

```bash
useradd \
    -m \               # Crea /home/aitor y copia /etc/skel
    -c "Aitor Tilla" \ # Comentario / GECOS
    -s /bin/bash \     # Shell
    -g staff \         # Grupo principal
    -G sudo,http \     # Otros grupos
    -e 2002-11-01 \    # Fecha de expiración de la cuenta
    aitor              # Username
```

[superusuario]: #superusuario
