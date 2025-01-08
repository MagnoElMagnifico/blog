---
title: Instalación de Arch Linux
description: TODO
date: TODO
weight: -1
draft: true
---
[1]: https://es.wikipedia.org/wiki/Arch_Linux

<!-- TODO -->
[t1]: https://wiki.archlinux.org/title/Dual_boot_with_Windows

<!-- Links importantes -->
[i1]: https://wiki.archlinux.org/title/Installation_guide
[i2]: https://archlinux.org/
[i3]: https://wiki.archlinux.org/
[i4]: https://www.youtube.com/c/EFLinuxMadeSimple/videos
[i5]: https://youtube.com/watch?v=DPLnBPM4DhI

Arch Linux es una distribución muy ligera de GNU/Linux que intenta
_"mantenerlo simple"_. La instalación es muy mínima y debe der ser realizada
manualmente (no hay un instalador, aunque puedes usar un script que lo haga por
ti), por lo que se considera esta distribución para usuarios avanzados.

Es en su totalidad código abierto y libre gracias a su comunidad altruista. Sus
versiones se dice que son _Rolling Releases_ o actualizaciones continuas, por lo
que no existen versiones del sistema, solo _capturas_.

_Fuente: [Wikipedia][1]_.

Esta distribución ofrece una personalización máxima, con el coste de tener que
aprender el funcionamiento del sistema y de sus diferentes partes. Mi objetivo
es aprender lo máximo posible sobre Linux, por lo tanto, esta es la distribución
perfecta para hacerlo. Voy a seguir principalmente la
[guía oficial de instalación][i1].

Algunos links de referencia de gran importancia y utilidad:
- [Página][i2] de Arch Linux
- [Wikipedia][i3] de Arch Linux (`!aw` en DuckDuckGo)
- _[Linux made simple][i4]_ sube un vídeo mensualmente instalando Arch.
- Este [vídeo][i5] de LearnLinuxTV explica detalladamente todos los pasos.

# Obtener el ISO
[5]: https://archlinux.org/download/

<!-- Fuentes -->
[6]: https://es.wikipedia.org/wiki/Imagen_ISO
[7]: https://www.aboutespanol.com/que-es-una-imagen-iso-3507896
[8]: https://www.xataka.com/basics/archivos-iso-que-son-y-como-montarlos-en-windows-y-macos

<!-- Información sobre software -->
[9]:  https://wiki.archlinux.org/title/Zsh
[10]: https://gitlab.archlinux.org/archlinux/archiso/-/blob/master/configs/releng/packages.x86_64
[11]: https://www.balena.io/etcher/

He descargado el `.iso` de la [página de Arch][5] y la he añadido a una máquina
virtual habiendola configurado previamente.

Un archivo ISO (según la [Wikipedia][6], [AboutEspañol][7] y [Xataka][8]) es una
copia o imagen exacta de un sistema de ficheros, lo que lo hace muy popular para
compartir copias de DVDs, de seguridad, etc: en lugar de enviar muchas carpetas
y archivos, solo envias uno.

> Puedes mirar los archivos desde el Explorador de Windows haciendo
> `Clic Derecho > Montar`

<!-- TODO: Configuración de la VM -->

Si vas a instalar Arch Linux (o cualquier otro sistema operativo realmente),
deberás escribir el archivo ISO en un DVD o USB con un programa especial como
[Balena Etcher][11] (descargar mejor en su versión portable, ya que solo es un
único `.exe`).

Tras iniciar la máquina virtual con el entorno en vivo (está el disco de
arranque -ISO- insertado en el equipo), nos encontraremos únicamente con una
consola [ZSH][9] con algunas herramientas [ya instaladas][10] para poder
trabajar.

> Si intentas crear aquí un archivo este no se guardará si reinicias el
> ordenador.

# Configuración básica
En primer lugar, el teclado que se está usando no es el apropiado, por defecto
se usa el americano. Los teclados disponibles están en el directorio
`/usr/share/kbd/keymaps/`, que posteriormente podrás cambiar usando `loadkeys`.
Yo uso el _layout_ `es`:

```sh
ls /usr/share/kbd/keymaps/**/*.map.gz
loadkeys es
```

Después, la guía de Arch dice que compruebes el modo de arranque: `UEFI` o
`BIOS`. Dependiendo de tu ordenador tendrás uno u otro, pero los ordenadores más
modernos utilizan `UEFI` y el modo que yo voy a utilizar.

```sh
ls /sys/firmware/efi/efivars
# Existe    -> UEFI
# No existe -> BIOS
```

# Conectarse a internet
<!-- TODO: Revisar mejor / expandir -->

Como el ISO de Arch no trae consigo lo necesario para hacer una instalación
offline, por lo que es necesario conectarse a internet para descargar paquetes y
software.

Podemos comprobar si tenemos internet de dos maneras:

En esta primera, tendremos internet si disponemos de una red que tenga un estado
activo `state UP` y aparece unas direcciones ip.

```sh
ip address
```

También es posible lanzar una traza _icmp_:

```sh
ping -c 1 archlinux.org # Si recibes un paquete de vuelta (0% perdidos), todo correcto
```

En el caso de no tener internet, puedes conectarte mediante un cable o
inalámbricamente. La primera opción será lo más sencillo, será solo enchufar el
cable y realizar las debidas comprobaciones.

Mediante una conexión inalámbrica, en cambio, deberás usar la utilidad `iwctl`:


```sh
iwctl
[iwd]# device list # Muestra los dispositivos a los que puedes conectarte
```
<!-- TODO: No encuentra ningún device -->

# Actualizar el reloj del sistema
```sh
timedatectl set-ntp true
timedatectl status # Comprobación
```

# Particiones de disco
<!-- Fuentes -->
[12]: https://es.wikipedia.org/wiki/Partición_de_disco
[13]: https://wiki.archlinux.org/title/Partitioning

<!-- Formatos de partición -->
[14]: https://es.wikipedia.org/wiki/NTFS
[15]: https://es.wikipedia.org/wiki/Tabla_de_asignación_de_archivos

<!-- Linux Swap -->
[16]: https://es.wikipedia.org/wiki/Espacio_de_intercambio

<!-- Herramientas de manejo -->
[17]: https://en.wikipedia.org/wiki/List_of_disk_partitioning_software
[18]: https://wiki.archlinux.org/title/Partitioning#Partitioning_tools

> Aquí empieza lo peligroso, hay que tener cuidado de no formatear discos
> incorrectos, etc; ya que se eliminará todo su contenido.

Una partición de disco es una división interna de un almacenamiento de datos:
prácticamente todo tipo de discos magnéticos y memorias flash (como pendrives)
pueden particionarse. El sistema operativo tratará estas particiones como
dispositivos independientes.

Esto posee muchos usos, por ejemplo puedes tener particiones encriptadas para
documentos críticos, copias de seguridad (al estar aisladas de otras particiones
resultan mucho más seguras), instalar varios sistemas operativos...

Cada una de ellas tiene su esquema que distribuye las particiones en el disco.
Las más extendidas y populares son dos (usaremos GPT):
- **MBR**: _Master Boot Record_, antigua
- **GPT**: _Global Unique IDentifier (GUID) Partition Table_, (`GUID = UUID` en
terminología Linux) más moderna y sucesora de MRB. Funciona mejor con discos más
grandes.

Para poder contener datos, las particiones tienen que poseer un sistema de
archivos. Existen múltiples formatos con diferentes capacidades como los
siguientes:
- [NTFS][14] (_New Technology File System_) para sistemas Windows
- [FAT][15], FAT32 (_File Allocation Table_)
- EXT2, EXT3, EXT4 <!-- TODO -->
- Btrfs
- ReiserFS, Reiser4
- ...

Independientemente del formato de la partición (que no deben de ser confundidas
con lo siguiente), existen diferentes tipos de estas:

- **Partición primaria o cruda**: Son detectadas por el ordenador al arrancar,
por lo que aquí se instalan los sistemas operativos. Puede haber un máximo de
cuatro, y también son reconocidas por estos y le asignarán una unidad cuando
usen un formato compatible. Un disco duro completamente formateado contiene en
realidad una partición primaria ocupando todo su espacio.

- **Partición secundaria o extendida**: Se utiliza para tener más de 4
particiones, pero no sirve para almacenar SOs, solo datos. Solo puede haber una
de ellas, aunque dentro podremos hacer tantas otras particiones como queramos.
Si utilizas esta partición, el disco solo podrá tener tres primarias, siendo
la extendida la que actúe como cuarta.

- **Partición lógica**: "Sub-particiones" que existen dentro de una partición
secundaria. Se le deben de asignar un tamaño y un formato.

Cualquiera de estos, ya sea disco, partición, dispositivo LUKS, LVM o RAID, se
consideran archivos de bloque por Linux y contienen un sistema de ficheros
montable (comando `mount`). Se les llama _volúmenes_.

_Fuente: [Wikipedia][12], [ArchWiki][13]_

Por ejemplo, Windows usa las siguientes particiones:
- Partición de recuperación, 450 MB (_WinRE_)
- Partición _EFI_ (para sistemas _UEFi_), 100 MB.
- Partición reservada de Microsoft, 16 MB (no visible en Administración de discos de Windows)
- Windows (el tamaño depende de la unidad)

<!-- TODO: Poner tabla de tamaños -->
En nuestro caso, se necesitan tres particiones:
1. _EFI_: La partición que contendrá los datos necesarios para iniciar el SO.
2. _Swap_ o _[Espacio de intercambio][16]_ <!-- TODO: Explicar esto https://itsfoss.com/swap-size/ -->
3. _Root_: `/`, los archivos del sistema, documentos, aplicaciones, etc.

## ¿Cómo se hace?
Los discos reconocidos tienen una referencia en un archivo de bloque en el
directorio `/dev/sda`, `/dev/nvme0n1` o `/dev/mmcblk0`.

<!-- TODO: Sistema encriptado, etc -->

```sh
fdisk -l    # Listamos todos los discos disponibles
lsblk       # Alternativa
            # Los que contengan "room", "loop" o "airoot" puedes ignorarlos
```

Podemos manipular las particiones de disco con [muchas herramientas diferentes][17],
(de las cuales solo [estas][18] están disponibles en el ISO de Arch). Yo voy a
utilizar `gdisk`, muy similar a `fdisk`, pero ya orientado a GPT.

```sh
gdisk /dev/<disco>

# Partición para boot (EFI)
Command (? for help): n     # Nueva partición
Partition number (...): 1   # Default (número de la partición, con EFI hasta 128)
First sector (...): 2048    # Default
Last sector (...): +550M    # Tamaño de la partición
[...] GUID (...): ef00      # Partición de sistema EFI

# Partición de Swap
Command (? for help): n     # Nueva partición
Partition number (...): 2   # Default
First sector (...):         # Default
Last sector (...): +2G      # TODO
[...] GUID (...): TODO      # Partición para Linux Swap

# Partición de root
Command (? for help): n
Partition number (...): 3   # Default
First sector (...):         # Default
Last sector (...):          # Default (el resto del espacio disponible)
[...] GUID (...):           # Default

# Guardar los cambios
Command (? for help): w     # Escribe los datos en disco

lsblk     # Comprobación
```

Forma alternativa (muy similar) usando `fdisk`:

```sh
fdisk /dev/<disco>

Command (m for help): g     # Crear una tabla GPT

# Partición para boot (EFI)
Command (m for help): n     # Nueva partición
Partition number (...): 1   # Default
First sector (...): 2048    # Default
Last sector (...): +550M    # Tamaño de la partición
# Se crea una partición de tipo Linux filesystem -> Lo cual no es correcto, pero lo cambiaremos luego

# Partición de Swap
Command (m for help): n     # Nueva partición
Partition number (...): 2   # Default
First sector (...):         # Default
Last sector (...): +2G      # TODO
# Se crea una partición de tipo Linux filesystem -> Lo cual no es correcto, pero lo cambiaremos luego

# Partición para root (/)
Command (m for help): n     # Nueva partición
Partition number (...): 3   # Default
First sector (...):         # Default
Last sector (...):          # Default (lo que quede del dispositivo)
# Se crea una partición de tipo Linux filesystem -> Esta vez sí es correcto

# Cambiamos el tipo de partición
Command (m for help): t
Partition number (1-3): 1                         # La primera era la EFI
Partition type or alias (type L to list all): 1   # Código del sistema EFI

Command (m for help): t
Partition number (1-3): 2                         # La segunda es el Swap
Partition type or alias (type L to list all): 19  # Código para la partición Swap

Command (m for help): w     # Escribe los cambios en disco

lsblk   # Comprobación
```

## Formatear las particiones
En este punto hemos creado el esquema y ahora debemos formatear las particiones
con su tipo adecuado, proceso también llamado crear el sistema de ficheros.

```sh
# La partición EFI debe de ser FAT32
mkfs.fat -F32 /dev/<disco>1

# La partición Linux Swap
mkswap /dev/<disco>2
<!-- TODO: Ponerlo en mount? -->
swapon /dev/<disco>2          # Activar la partición como Swap

# La partición para root
mksf.ext4 /dev/sda3
```

## Montar las particiones
<!-- TODO: Explicación -->

```sh
mount /dev/<disco>3 /mnt
```

# Instalando cosas

```sh
pacstrap
```
