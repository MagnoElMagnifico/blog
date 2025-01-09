---
title: Instalación
description: >
    Post sobre la instalación de Linux, esquemas de particionado del disco
    y cómo obtener información del hardware para comprobar que la instalación
    fue correcta.
date: 2024-12-31T20:00:23+01:00
weight: 1
---

# Tipos de instalación

Dependiendo de lo que se vaya a realizar con el sistema operativo, suelen
existir diferentes tipos de instalaciones.

{{< keyvalue title="Tipos de instalaciones" key-header=true >}}
-% Escritorio :%
Ofimática, navegación por Internet...

-% Workstation :%
Sistema de alto rendimiento, generalmente **orientado a una tarea específica**.

- Dedicada al cálculo (p.e. Aplicaciones científicas)
- Estaciones gráficas (p.e. Diseño 3D)

-% Servidores :%
Ofrecen **servicios** a otras máquinas.

-   Servicios de archivos ([FTP], NFS, Samba), de directorio (LDAP), bases de
    datos (MySQL, PostgreSQL), ...
-   Servicios de aplicaciones: telnet, SSH
-   Servicios de red:
    - [DHCP], [DNS], [NAT], proxies
    - Firewalls
    - [Correo electrónico]
    - Web (p.e. Apache)

[FTP]:  {{< ref "redes/aplicacion/#ftp" >}}
[DNS]:  {{< ref "redes/aplicacion/#dns" >}}
[NAT]:  {{< ref "redes/red/#nat" >}}
[DHCP]: {{< ref "redes/red/#protocolo-dhcp" >}}
[Correo electrónico]: {{< ref "redes/aplicacion/#protocolos-de-correo-electrónico" >}}
{{< /keyvalue >}}

<!-- TODO: post sobre instalación de Arch -->
# Proceso de instalación

<!-- TODO: explicar esto más -->
1.  Descargar el archivo `.iso` de la distribución que se vaya a usar
2.  Flashearlo en un USB para hacerlo _booleable_
3.  Arrancar el ordenador desde el USB (se cambia en el menú de la BIOS/UEFI)
4.  Seguir los pasos del instalador (excepto si usas Arch, en ese caso, te toca
    seguir la [wiki]).

Normalmente, en esos pasos hay que configurar:

-   Idioma, localización (huso horario y formatos de fechas, moneda, etc)
    y **teclado**.
-   **Configuración de red**. Por defecto prueba por [DHCP], sino se puede
    introducir manualmente la IP, máscara, _Gateway_ y DNS.
-   **Crear cuentas de usuario** y establecer contraseña del [superusuario]
-   Realizar el **particionado** del disco (ver sección siguiente)
-   Seleccionar los _mirrors_ (servidores) desde donde descargar software.
    Normalmente se escoge el más cercano para reducir latencias.
-   **Instalar el gestor de arranque** o _bootloader_, normalmente GRUB2.

# Particionado del disco

Dependiendo del tipo de sistema que se desee, se pueden utilizar distintos tipos
de particionados.

{{< block "Nota" >}}
Para más información sobre cómo se implementan las
particiones, consulte este [otro post]({{< ref "so/archivos/#partición" >}}).
{{< /block >}}

{{< block "Importante" "var(--magno-red)" >}}
Los directorios esenciales para arrancar son `/etc`, `/usr` y `/boot`. Salvo
esta última, deben estar disponibles en la misma partición que `/` o incluidas
en [`initramfs`].

[`initramfs`]: {{< ref "so/arranque" >}}
{{< /block >}}

{{< keyvalue key-header=true >}}
-% Escritorio <br> 3 particiones :%
-   `swap`: se corresponde con la partición de la [zona de intercambio]. El
    tamaño de esta partición dependerá del tamaño de la memoria principal y el tipo
    de aplicaciones que se quieran ejecutar. De forma general, antes se
    recomendaba **al menos el doble que RAM**, pero actualmente con memorias
    superiores al GiB, **4 GiB es un buen valor por defecto**. Si se va a usar
    para hibernar, mejor que sea del mismo tamaño que la RAM.
-   `/home`: cuentas de usuario, para poder realizar _backups_.
-   `/`: resto del disco.

[zona de intercambio]: {{< ref "so/memoria/#zona-de-intercambio" >}}

-% Servidor <br> 6 particiones :%
Las mismas 3 de antes:

- `swap`
- `/home`
- `/`

Y también particiones separadas para:

-   `/usr`: montado como **solo lectura** después de la instalación para evitar
    que los usuarios introduzcan virus.
-   Tener `/var` y `/tmp` aparte evita que estos directorios resten espacio para
    el resto del disco.
{{< /keyvalue >}}

Otras particiones importantes son:

-   `/boot`: mantiene separados los archivos de arranque del resto. Permite evitar
    incompatibilidades de BIOS en discos grandes.
-   `/chroot`: aplicaciones _enjauladas_ que requieran aislamiento.
-   `/var/lib`: archivos de bases de datos DNS, Apache, proxies, etc.

<!-- TODO: mover a so/archivos -->
## Sistemas de archivos

Dentro de las particiones primarias creadas es posible almacenar **sistemas de archivos**.
Estas pueden tener diversos formatos, lo que implica una organización diferente
dentro la misma.

{{< block "Sistema de archivos" "var(--magno-red)" >}}
Un sistema de archivos es una **forma de implementar la abstracción de un
archivo**. **Define cómo se almacenan, se organizan, sus metadatos, etc**. Están
íntimamente ligados con el propio Sistema Operativo.

Para más información sobre algunas posibles implementaciones, consulta el
[post de archivos]({{< ref "so/archivos/#implementación-de-archivos" >}}).
{{< /block >}}

{{< block "Sistema de archivos transaccional" "var(--magno-red)" >}}
Se trata de un sistema de archivos que implementa los conceptos de las
**transacciones atómicas** típicas de un sistema de base de datos. Este concepto
también se conoce como ***Journaling File System***.

Las operaciones aplicadas mantienen la consistencia de los datos a través de
transacciones: o se realizan todas las operaciones, o no se realiza ninguna (en
caso de error).

Para ello, se suelen anotar las operaciones realizadas en un _log_ para poder
deshacerlas.
{{< /block >}}

{{< block "Volumen" "var(--magno-blue)" >}}
Cualquier dispositivo de bloque (pseudo-archivo: [disco], [partición], LUKS,
[volumen LVM], RAID) que contiene un sistema de archivos que se pueden montar se
le llama **volumen**.

[disco]: #disco-físico-y-lógico
[partición]: #partición
[volumen LVM]: ref "linux/instalacion/#logical-volume-management"
{{< /block >}}

A continuación, se detallan algunas características de los sistemas de archivos
más utilizados.

{{< block "`ext4`" >}}
_Fourth EXTended file system_ es el sistema estándar de Linux.

- Es transaccional
- Utiliza [_inodes_] para reducir la [fragmentación].
- Puede trabajar con discos de gran tamaño: 1 EiB
- Los archivos pueden ser también muy grandes: 16 TiB
- Las opciones pueden configurarse con `tune2fs`

Versiones anteriores como `ext2` y `ext3` todavía se pueden usar.

[_inodes_]: {{< ref "so/archivos/#block-inodos" >}}
[fragmentación]: {{< ref "so/memoria/#block-fragmentación" >}}
{{< /block >}}

{{< block "`btrfs`" >}}
El sistema de archivos [B-tree] es el posible sucesor de `ext4`. Presenta
características avanzadas para mejorar el rendimiento, la gestión y seguridad
de los datos.

-   Incluye funciones para el controlador de RAID (_Redundant Array of Independent Disks_)
    y del gestor de volúmenes LVM. Por tanto, soporta de forma nativa sistemas de
    ficheros multidispositivo y subvolúmenes.
-   Uso de _copy-on-write_: si varios recursos son iguales, se devuelve un
    puntero al único recurso. Cuando se modifica uno de ellos, es entonces cuando se
    crea el nuevo recurso.
-   Permite _snapshots_
-   Protege la información mediante _checksums_
-   Soporta compresión y empaquetado eficiente de archivos pequeños
-   Implementa optimizaciones para discos SSD

Actualmente son la mejor opción para los servidores.

[B-tree]: {{< ref "aed/arboles/#árbol-b" >}}
{{< /block >}}

Otros sistemas transaccionales portados de otros sistemas Unix pueden ser `JFS`
y `XFS` (IBM y GSI Iris respectivamente).

Y algunos sistemas de archivos que el sistema operativo Windows utiliza son los
siguientes:

{{< block "`NTFS` y `exFAT`" >}}
Usados por Windows en ordenadores domésticos y unidades extraíbles. Linux
también los soporta.
{{< /block >}}

{{< block "`reFS`" >}}
Usado por Windows en entornos empresariales. No soportado por Linux.
{{< /block >}}

## Herramientas

-   `fdisk` (_Format Disk_): permite crear y modificar particiones con unos
    menús interactivos. Con la opción `-l` lista las particiones.

-   `mkfs` (_Make File System_): crea los sistemas de archivos dentro de un
    disco lógico.
    - `mkfs.ext4 /dev/sda4`: formatea la partición con `ext4`
    - `mkfs.fat /dev/sda4`: formatea la partición con `fat`
    - Lo mismo para: `msdos`, `btrfs`, `jfs`, `xfs`, `vfat`...
    - `mkswap /dev/sda4`: formatea la partición para usar como `swap`

-   `fsck` (_File System Check_): chequea y reparar sistemas de archivos
    (`fsck.ext4`)

-   `du` (_Disk Usage_): muestra el uso de disco de archivos y directorios.
    -   `du -hs directorio`: muestra el tamaño del directorio en múltiplos de
        byte. No muestra el tamaño de todos los archivos que contiene, solo el
        total.

Comandos relacionados:

-   `tune2fs`: permite cambiar algunos parámetros de los sistemas de archivos
    `ext`.
-   `dumpe2fs`: muestra información sobre un sistema archivos `ext`.

<!-- TODO: mover a SO -->
## Monturas

Enlaza una dirección (_path_) con un sistema de archivos.

```sh
mount /dev/... ruta         # Monta la partición en directorio
mount --mkdir /dev/... ruta # Para crear directorio si no existe
mount -a                    # Monta los fs especificados en /etc/fstab
mount -o ruta opciones      # Permite remontar con otras opciones
umount ruta                 # Desmonta el fs del directorio
```

Se definen las monturas a utilizar en el arranque en el archivo `/etc/fstab`:

```
# Partition Mount Point  Format  Options  Dump  Pass
/dev/sdb2   none         swap    sw       0     0
/dev/sdb3   /            ext4    sw       0     0
```

Opciones de montado:

-   `ro`: solo lectura
-   `rw`: lectura y escritura
<!---->
-   `auto`: se monta en el arranque
-   `noauto`: previene el montado en el arranque. Útil para poder hacer `mount
    directorio` sin especificar el dispositivo, porque lo lee de `/etc/fstab`.
<!---->
-   `user`: permite que usuarios no privilegiados  lo monten
-   `nouser`: solo root

En el archivo `/etc/mtab` se muestran las particiones de están montadas en el
momento (ver [tabla de particiones]).

### UUID

Los dispositivos se pueden identificar por su dispositivo (`/dev/sda`,
`/dev/nvme0n1p6`), pero esa nomenclatura depende de cómo estén colocados en el
hardware y **pueden cambiar entre reinicios**.

La otra forma es usar el _Universal Unique Identifier_ del dispositivo. Se
determina a partir de elementos hardware, etiquetas, el sistemas de archivos,
etc. Se trata de un número muy grande, por tanto es poco probable que hayan
colisiones.

Se puede usar el comando `blkid` para obtener el UUID de un dispositivo.

En el archivo `/etc/fstab` también se pueden utilizar como `UUID=XXXX` en lugar
de `/dev/...`.

<!-- TODO: expandir y mover a arranque -->
## GRUB

Hay que instalar al menos un gestor de arranque, de lo contrario no se podrá
iniciar el sistema. Si tenemos varios SO, basta con instalar un único gestor de
arranque. Mostrará un menú con todos los SO disponibles y carga el kernel
elegido por el usuario.

GRUB (_Grand Unified Booloader_) es el programa más utilizado.

# Información sobre el hardware

-   Las últimas distribuciones de Linux soportan la mayoría del hardware actual.
-   Hay soporte Linux para múltiples arquitecturas: `i386`, `amd64`, `ARM`,...
-   En el proceso de instalación se configura automáticamente casi todo el
    hardware

Disponemos de los siguientes comandos y archivos para obtener la información
sobre el hardware:

{{< keyvalue key-header=true title="Información leída del Hardware" >}}

-% `dmidecode` <br> _DMI Decode_ :%
Vuelca la información DMI (_Desktop Management Interface_) de la BIOS. Esta es
una tabla que contiene una descripción de los componentes hardware en un formato
legible por humanos. Incluye:

- Placa base
- Módulos de RAM
- CPU
- Discos
- Tarjetas insertadas
- ...

{{< keyvalue-sep title="Información obtenida por el Sistema Operativo" >}}

-% `lshw` <br> (_List Hardware_) :%
Muestra toda la información obtenida por el Sistema Operativo. Utiliza los
archivos especiales de `/proc` y `/sys`.

-% `lscpu` <br> (_List CPU_) :%
Muestra información sobre la CPU: núcleos, memoria caché, arquitectura...

-% `nproc` <br> (_Number of Processors_) :%
Muestra el número de núcleos disponibles.

-% `lspci` <br> (_List PCI_) :%
Lista tarjetas pinchadas en la placa.

-% `lsusb` <br> (_List USB_) :%
Lista dispositivos conectados por USB. Incluye coordenadas del bus e ID del
dispositivo.

{{< keyvalue-sep title="Información sobre los discos" >}}

-% `fdisk -l` :%
Lista todas las particiones. Al especificar `-l` lista todos los discos.

-% `df -h` :%
Lista todas particiones montadas. `-h` es para especificar el tamaño en
múltiplos y no solo en bytes.

{{< keyvalue-sep title="Información sobre la memoria" >}}

-% `free -h` :%
Muestra la memoria principal total, disponible y libre, tanto RAM como swap.

{{< keyvalue-sep title="Versión de Linux" >}}

-% `uname -a` :%
Muestra la versión del kernel de Linux (`-a` es de _all_).

-% `lsb_release -a` :%
Muestra información sobre la distribución y su versión.

{{< keyvalue-sep title="Módulos del kernel" >}}

-% `lsmod` :% Muestra los módulos cargados.
-% `modprobe` :% Instala un módulo nuevo en el kernel (iniciarlo).
-% `rmmod` :% Elimina un módulo del kernel (pararlo).
{{< /keyvalue >}}

Otras formas de obtener información sobre el hardware son consultar los
directorios [`/proc`] y [`/sys`]. De hecho, la mayoría de los comandos
anteriores, simplemente consultan estos archivos.

<!-- TODO: permisos ? -->
# Cuenta del superusuario

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

<!-- TODO: recuperación de contraseñas -->

[wiki]: https://wiki.archlinux.org/title/Installation_guide
[superusuario]: #cuenta-de-superusuario
[particiones físicas]:  {{< ref "so/archivos/#partición" >}}
[tabla de particiones]: {{< ref "so/archivos/#block-tabla-de-montaje" >}}
[MBR]:                  {{< ref "so/archivos/#block-master-boot-record" >}}
[GPT]:                  {{< ref "so/archivos/#block-guid-particion-table" >}}
[DHCP]:                 {{< ref "redes/red/#protocolo-dhcp" >}}
[`/proc`]:              {{< ref "linux/estructura-directorios/#proc" >}}
[`/sys`]:               {{< ref "linux/estructura-directorios/#sys" >}}

{{< todo "Notas de las prácticas" >}}
/media/magno/magnofiles/uni/5-ASR/practica1-instalacion/practica1.pdf
/media/magno/magnofiles/uni/5-ASR/practica1-instalacion/
{{< /todo >}}

