---
title: Instalación
description: >
    Post sobre la instalación de Linux, esquemas de particionado del disco
    y cómo obtener información del hardware para comprobar que la instalación
    fue correcta.
date: 2024-12-31T20:00:23+01:00
weight: 1
draft: true
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

<!-- TODO: mover a otro sitio: usuarios, grupos y permisos -->
# Creación de usuarios

Cambiar la contraseña con `passwd`

{{< dropdown "Recomendaciones para elegir una contraseña" >}}
- No usar el nombre de _login_ ni variantes
- Tampoco datos personales como DNI, nombre, teléfono, etc
- No repetir contraseñas
- Usar contraseñas largas: 12 o más caracteres
- Mezclar letras mayúsculas y minúsculas, números y puntuación
{{< /dropdown >}}

<!-- TODO: recuperación de contraseñas -->

<!-- TODO: post sobre instalación de Arch -->
# Proceso de instalación

<!-- TODO: explicar esto más -->
1.  Descargar el archivo `.iso` de la distribución que se vaya a usar
2.  Flashearlo en un USB
3.  Arrancar el ordenador desde el USB (se cambia en el menú de la BIOS/UEFI)
4.  Seguir los pasos del instalador (excepto si usas Arch, en ese caso, te toca
    seguir la [wiki]).

Normalmente, en esos pasos hay que configurar:

-   Idioma, localización (huso horario y formatos de fechas, moneda, etc) y teclado
-   Configuración de red. Por defecto prueba por [DHCP], sino se puede introducir
    manualmente la IP, máscara, _Gateway_ y DNS.
-   Crear cuentas de usuario y establecer contraseña del [superusuario]
-   Realizar el particionado del disco (ver sección siguiente)
-   Seleccionar los _mirrors_ (servidores) desde donde descargar software.
    Normalmente se escoge el más cercano para reducir latencias.
-   Instalar el gestor de arranque o _bootloader_, normalmente GRUB2.

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

En cada partición primaria, se pueden formatear con diferentes tipos de sistemas
de archivos.

{{< block "Sistema de archivos" "var(--magno-red)" >}}
Un sistema de archivos es una **forma de implementar la abstracción de un
archivo**. **Define cómo se almacenan, se organizan, sus metadatos, etc**. Están
íntimamente ligados con el propio Sistema Operativo.

Para más información sobre algunas posibles implementaciones, consulta el
[post de archivos]({{< ref "so/archivos/#implementación-de-archivos" >}})
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

-   `fdisk`: permite crear y modificar particiones con unos menús interactivos.
    Con la opción `-l` lista las particiones.
-   `mkfs` (_Make File System_): crear los sistemas de archivos
    - `mkfs.ext4 /dev/sda4`: formatea la partición con `ext4`
    - `mkfs.fat /dev/sda4`: formatea la partición con `fat`
    - Lo mismo para: `msdos`, `btrfs`, `jfs`, `xfs`, `vfat`...
    - `mkswap /dev/sda4`: formatea la partición para usar como `swap`
-   `fsck` (_File System Check_): chequea y reparar sistemas de archivos (`fsck.ext4`)
-   `du` (_Disk Usage_): muestra el uso de disco de archivos y directorios.
    -   `du -hs directorio`: muestra el tamaño del directorio en múltiplos de
        byte. No muestra el tamaño de todos los archivos que contiene, solo el
        total.

Comandos relacionados:

- `tune2fs`
- `dumpe2fs`

<!-- TODO: mover a SO -->
## Monturas

Enlaza una dirección (_path_) con un sistema de archivos.

```sh
mount partición directorio
umount directorio
```

Si se le pasa la opción `--mkdir` creará la carpeta si no existe.

Se definen las monturas a utilizar en el arranque en el archivo `/etc/fstab`:

```
# Partition Mount Point  Format  Options  Dump  Pass
/dev/sdb2   none         swap    sw       0     0
/dev/sdb3   /            ext4    sw       0     0
```

Si se usa `mount -a`, montará todas los sistemas de archivos especificados en el
archivo.

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

La opción `-o` permite remontar con otras opciones.

En el archivo `/etc/mtab` se muestran las particiones de están montadas.

### UUID

Los dispositivos se pueden identificar por su dispositivo (`/dev/sda`,
`/dev/nvme0n1p6`), pero esa nomenclatura depende de cómo estén colocados en el
hardware y pueden cambiar entre reinicios.

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
arranque.

## Logical Volume Management

En lugar de realizar [particiones físicas] mediante la modificación de las
tablas en [MBR] o [GPT], los sistemas Linux modernos proporcionan el sistema
**LVM**, que proporciona una **visión de alto nivel sobre los discos**:

- Permite ver **varios discos como solo uno**
- Permite hacer cambios **dinámicamente** sin necesidad de reiniciar el sistema
- Permite gestionar **volúmenes en grupos** definidos por el administrador

{{< block "Volúmen Físico (PV)" "var(--magno-red)" >}}
Discos duros, [particiones] de los mismos (definidas en la [tabla de
particiones]) u dispositivos similares, por ejemplo
[RAID](https://en.wikipedia.org/wiki/RAID). Deben ser continuas en el disco.

[particiones físicas]: {{< ref "so/archivos/#disco-físico-y-lógico" >}}
{{< /block >}}

{{< block "Volumen Lógico (LV)" "var(--magno-red)" >}}
[Particiones lógicas] sobre las que se montan los sistemas de archivos.

[Particiones lógicas]: {{< ref "so/archivos/#disco-físico-y-lógico" >}}
{{< /block >}}

{{< block "Grupo de volúmenes (VG)" "var(--magno-red)" >}}
Agrupación de Volúmenes Lógicos (LV) que forman una unidad administrativa.
{{< /block >}}

Por tanto, se genera este esquema:

<table style="text-align:center">
  <tr>
    <td class="header">Sistemas de archivos</td>
    <td colspan="2"><code>/home</code></td>
    <td colspan="2"><code>/data</code></td>
  <tr>
  <tr>
    <td class="header">Volumen Lógico (LV)</td>
    <td colspan="2"><code>/dev/primary_vg/home_lv</code></td>
    <td colspan="2"><code>/dev/primary_vg/data_lv</code></td>
  <tr>
  <tr>
    <td class="header">Grupo de Volúmenes (VG)</td>
    <td colspan="4"><code>primary_vg</code></td>
  <tr>
  <tr>
    <td class="header">Volúmenes Físicos (PV)</td>
    <td><code>/dev/sda1</code></td>
    <td><code>/dev/sda2</code></td>
    <td><code>/dev/sdb1</code></td>
    <td><code>/dev/sdb2</code></td>
  <tr>
  <tr>
    <!-- Truco para "separar" las dos tablas -->
    <td colspan="5" style="padding: 0; background-color: var(--background-color);">&uarr; &uarr; &uarr; &uarr;</td>
  </tr>
  <tr>
    <td class="header">Particiones Físicas</td>
    <td><code>/dev/sda1</code></td>
    <td><code>/dev/sda2</code></td>
    <td><code>/dev/sdb1</code></td>
    <td><code>/dev/sdb2</code></td>
  </tr>
  <tr>
    <td class="header">Discos Físicos</td>
    <td colspan="2"><code>/dev/sda</code></td>
    <td colspan="2"><code>/dev/sdb</code></td>
  <tr>
</table>

Comandos de uso:

    INFORMACIÓN
    pvs  Show Physical Volumes
    vgs  Show Volume Groups
    lvs  Show Logical Volumes

    CREACIÓN
    vgcreate  Create Volume Group
    vgremove  Remove Volume Group
    vgextend  Añade volumen lógico al grupo
    vgreduce  Elimina volumen lógico del grupo

    ... Lo mismo para Logical Volumes:
        lvcreate, lvremove, lvextend, lvreduce

    fsadm  Comando genérico para cambiar de tamaño un Sistema de Archivos, es
           decir, formatear el espacio aumentado.

{{< todo >}}
/dev/vol_group
/dev/mapper/...
{{< /todo >}}

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

<tr>
    <td colspan="2" style="text-align: center; background-color: var(--table-header); border-bottom: var(--table-header-border)">
        Información obtenida por el Sistema Operativo
    </td>
</tr>

-% `lshw` <br> (_List Hardware_):%
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

<tr>
    <td colspan="2" style="text-align: center; background-color: var(--table-header); border-bottom: var(--table-header-border)">
        Información sobre los discos
    </td>
</tr>

-% `fdisk -l` :%
Lista todas las particiones. Al especificar `-l` lista todos los discos.

-% `df -h` :%
Lista todas particiones montadas. `-h` es para especificar el tamaño en
múltiplos y no solo en bytes.

<tr>
    <td colspan="2" style="text-align: center; background-color: var(--table-header); border-bottom: var(--table-header-border)">
        Información sobre la memoria
    </td>
</tr>

-% `free -h` :%
Muestra la memoria principal total, disponible y libre, tanto RAM como swap.

<tr>
    <td colspan="2" style="text-align: center; background-color: var(--table-header); border-bottom: var(--table-header-border)">
        Versión de Linux
    </td>
</tr>

-% `uname -a` :%
Muestra la versión del kernel de Linux (`-a` es de _all_).

-% `lsb_release -a` :%
Muestra información sobre la distribución y su versión.

<tr>
    <td colspan="2" style="text-align: center; background-color: var(--table-header); border-bottom: var(--table-header-border)">
        Módulos del kernel
    </td>
</tr>

-% `lsmod` :% Muestra los módulos cargados.
-% `modprobe` :% Instala un módulo nuevo en el kernel (iniciarlo).
-% `rmmod` :% Elimina un módulo del kernel (pararlo).
{{< /keyvalue >}}

<!-- TODO: mover a otro lugar más apropiado -->
{{< block "Módulos del Kernel" "var(--magno-blue)" >}}
Los módulos del kernel son fragmentos de código que se pueden cargar y eliminar
del Sistema Operativo bajo demanda. Muchos de ellos funcionan como controladores
de dispositivos (en Windows se les llaman _drivers_).

En Linux se suelen almacenar en `/usr/lib/kernel/*` bajo la extensión `.ko`.
{{< /block >}}

Otras formas de obtener información sobre el hardware son consultar los
directorios [`/proc`] y [`/sys`]. De hecho, la mayoría de los comandos
anteriores, simplemente consultan estos archivos.

[wiki]: https://wiki.archlinux.org/title/Installation_guide
[superusuario]: #cuenta-de-superusuario
[particiones físicas]: {{< ref "so/archivos/#partición" >}}
[MBR]:                 {{< ref "so/archivos/#block-master-boot-record" >}}
[GPT]:                 {{< ref "so/archivos/#block-guid-particion-table" >}}
[DHCP]:                {{< ref "redes/red/#protocolo-dhcp" >}}
[`/proc`]:             {{< ref "linux/estructura-archivos/#proc" >}}
[`/sys`]:              {{< ref "linux/estructura-archivos/#sys" >}}

{{< todo "Notas de las prácticas" >}}
/media/magno/magnofiles/uni/5-ASR/practica1-instalacion/practica1.pdf
/media/magno/magnofiles/uni/5-ASR/practica1-instalacion/
{{< /todo >}}

