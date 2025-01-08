---
title: Linux
content_title: true
draft: true
---

GNU/Linux (sí, ese es su nombre completo), es un conjunto de Sistemas Operativos
basados en Unix y normalmente _OpenSource_, gratuitos, multiplataforma,
multiusuario y multitarea.

Puede que Windows domine a la mayoría de los usuarios comunes, pero la mayoría
de los servidores web funcionan con Linux.

Por otro lado, para el usuario, las distribuciones son completamente
customizables: puedes cambiar el _Window Manager_ por uno de tu gusto, temas,
y muchas otras utilidades que ahora mismo no puedo recordar. Ese es el poder del
código libre: puedes cambiar el código fuente de tu SO como quieras para hacerlo
a tu gusto y no estar restringido por parámetros de una empresa multinacional.

Por no decir que es mucho más cómodo, su estructura de ficheros, manejo de
paquetes y programas instalados es muy sencilla; y el poder supremo que otorga
la terminal.

Puede que sea más complicado que un sistema Windows, obviamente hay muchas cosas
que aprender y ese es el objetivo de esta sección; pero también existen
distribuciones muy amigables al usuario novato de Linux.

Este es un mapa de la evolución del algunas de las distribuciones más conocidas:

{{<
  figure
  alt  = "Timeline de distros"
  src  = "https://upload.wikimedia.org/wikipedia/commons/8/8c/Linux_Distribution_Timeline_Dec._2020.svg"
  link = "https://upload.wikimedia.org/wikipedia/commons/8/8c/Linux_Distribution_Timeline_Dec._2020.svg"
  height = "500"
 >}}

Fuente: [Wikipedia](https://en.wikipedia.org/wiki/List_of_Linux_distributions).

{{< todo >}}
# Organización de esta sección

Conceptos / Aprender:

1.  Instalación + esquemas de particionado + verificación (maybe arch install)
2.  Estructura de directorios
3.  Artículo sobre Bash
    - Comandos básicos
4.  Procesado de texto
    - awk
    - tr
    - cut
    - sed
    - expresiones regulares
    - encontrar archivos --> maybe post aparte
5.  Gestión de procesos
    - trabajos del shell (?: tiene que ver con bash)
    - ps, kill, strace, nice
6.  Servicios / systemd --> Nota: define módulos del kernel, maybe a SO

7.  Instalación de software
    - package managers

8.  Administración de sistemas
    - tareas
    - backups
    - Creación de usuarios y grupos
        - otpw quota
    - LVM + encriptado
    - NFS, samba, ldap

9.  Redes

Más info:

1.  Cuando linux crashea
    - falta kernel panic
1.  Instalación de Arch Linux
1.  Powershell / Comandos de Windows
1.  Raspberry (???)

Configuración:

1.  Configuración de Bash
1.  Configuración de Awesome
1.  Configuración de i3 / sway
1.  Nvidia

Mover a Sistemas Operativos:

1.  sistemas de archivos
    - `/etc/fstab`
1.  Tipos de archivos
    - Link
1.  Usuarios y permisos. --> Gran dependencia con linux...
    - `/etc/passwd`
1.  Shell vs Terminal vs TTY vs Consola vs Prompt
    GUIs

ASR:

- [x] Teoría: estructura de archivos + hardware
- [x] Teoría: arranque + servicios
- [x] Teoría: tareas
- [x] Teoría: python
- [x] Teoría: discos y particiones + sistemas de archivos + VLM
- [x] Teoría: monturas + UUID
- [x] Teoría: copias de seguridad
- [x] Teoría: servicios
- [x] Práctica 1: Instalación del SO
- [x] Práctica 2: Instalación de software -- apt + dpkg
- [ ] Práctica 3: Scripts -- bash + procesado de texto + expresiones regulares
- [x] Práctica 4: Procesos -- ps + trabajos del shell + nice + top + strace + signals
- [ ] Práctica 5: archivos -- tipos + permisos + grupos + find + encriptado + lvm
- [ ] Práctica 6: usuarios -- otpw + quota + script
- [ ] Práctica 7: redes -- configuración + comandos útiles
- [ ] Práctica 8: servicios -- NFS + samba + ldap

PDF de teoría:

- [x] Instalación + arranque + verificación
- [x] Instalación de software
- [x] Automatización de tareas + backups
- [%] programación de scripts + procesado de texto + expresiones regulares
- [x] gestión de procesos
- [%] gestión del sistemas de ficheros + localización
- [%] gestión de discos y parciciones + LVM + cifrar
- [%] gestion de usuarios
- [%] gestión de redes
- [%] servicios
{{< /todo >}}



