---
title: Estructura directorios
weight: 3

# draft: true
extra:
    show_toc: true
    show_info: true
    ref_link:
        name: video de DorianDotSlash
        link: https://www.linux.com/topic/desktop/understanding-linux-links/ft
---
[1]: https://youtu.be/HbgzrKJvDRw
[2]: https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html

El sistema de archivos de Linux es diferente Windows, y seguramente este sea uno
de los temas más fundamentales que un usuario experto debería conocer.

Antes de Windows, Linux y los otros sistemas modernos que se conocen hoy en día;
existía DOS (Disk Operating System). Era únicamente CLI, sin GUIs. Sin embargo,
era posible instalar _Windows_ por encima de DOS.

Para las unidades de memoria se utilizan:

- `A` y `B` para los _floppy disks_,
- `C` para el disco duro,
- y etc, dependiendo de cuantas unidades estén instaladas en el equipo.

En DOS podías instalar tus programas donde al usuario le pareciese. _Windows_, sin
embargo, se instalaba en su propia carpeta: `Windows`. Con el paso del tiempo,
Windows se independizó de DOS y la estructura de archivos se mantuvo más o menos
igual.

En cambio, Linux es diferente. Por ejemplo, puedes tener múltiples archivos cuya
única diferencia sea una letra mayúscula o minúscula:

- `Archivo`
- `archivo`
- `ARCHIVO`
- `ArChIVo`

Esto está permitido en Linux, pero no en Windows. De la misma forma, los
usuarios de Apple se sentirán más cómodos con la estructura de archivos de
Linux, ya que evolucionaron desde el mismo lugar: Unix.

> Por cierto, esta estructura se encuentra recogida en el [FHS][2] (Filesystem
> Hierarchy Standard).

> Otra nota, no todas las distribuciones Linux siguen este patrón, pueden haber
> pequeñas variaciones. Pero por lo general, esto se cumple.

# Sistema
## `boot`
Aquí se guardan los archivos que necesita el sistema operativo para encenderse
(_boot_), en otras palabras, aquí están los ejecutables del _bootloader_. Por
este motivo, no es recomendable toquetear los archivos de este directorio.
Normalmente es una partición separada.

## `dev`
Quiere decir _devices_ o dispositivos. En Linux (y también en Unix), todo es un
archivo: desde un archivo de texto en el que guardas las contraseñas de tus
redes sociales, USBs, teclados, discos duros, etc.

Los drivers, el kernel y determinadas aplicaciones acuden a este directorio para
saber con qué dispositivos cuenta tu ordenador. Por ejemplo, un disco sería
`sda` y una partición `sda1`, `sda2`...

También por este motivo, es aquí donde más aparecen los diferentes tipos de
archivos (ver [tipos de archivos](@/linux/files.md)).

## `media` y `mnt`
_Media_ y _mount_ son los directorios en donde el sistema coloca los
dispositivos como USBs, _floppy disks_, discos duros externos, CDs y demás.
Las distribuciones actuales de Linux los montan automáticamente en la carpeta de
_media_.

Por lo tanto, el USB que insertes estará en
`/media/<usuario>/<nombre del dispositivo>`. Pero Si quieres montar algo
manualmente, déjalo en `/mnt/`

## `var`
Este es el directorio _variable_, contiene carpetas y archivos dedicados a
guardar datos que suelen aumentar en tamaño, como _logs_ de sistema, _caché_ y
demás.

## `tmp`
Este es el sitio donde las aplicaciones guardan datos temporalmente durante una
sesión. Por ejemplo, si estás escribiendo un archivo en un programa de ofimática,
es posible que el programa guarde copias de seguridad regularmente, por si
ocurre un error, se va la luz u otros inconvenientes. Luego podrás recuperar
esos datos.

## `proc`
`proc` de _procedures_. Contiene información de todos los procesos que se están
ejecutando en el momento, que principalmente son pseudo-archivos (no son
archivos del disco realmente, el kernel los traduce a archivos). Cada uno de
estos procesos tendrá un sub-directorio con el nombre del identificador del
proceso (ID).

Paralelamente puedes encontrar información sobre el CPU (`/proc/cpuinfo`) u
otras utilidades (`/proc/uptime`).

## `run`
Funciona en RAM, lo que significa que todo se borrará al apagar el ordenador.
Aunque diferentes distribuciones lo utilizan de formas un poco diferentes,
generalmente sirve para guardar datos al iniciar la máquina.

## `sys`
Es la carpeta para interactuar con el kernel, y es similar al directorio `/run`.

# Binarios y configuración
## `bin`, `sbin` y `libXX`
Estas carpetas se conservan por algunos programas que utilizan estas
direcciones, por eso en distribuciones actuales de Linux, son solamente enlaces
simbólicos a `/usr/bin`, `/usr/sbin` y `/usr/libXX/`; cuyo propósito es el mismo.

Esto hace que el sistema sea más compatible con Unix y se simplifica la
jerarquía de carpetas: anteriormente era necesario diferenciar los programas a
nivel de equipo o usuario y esencial o no esencial.

## `etc`
Finalmente se ha confirmado que el nombre de esta carpeta quiere decir
_etcétera_. Aquí es donde se guardas todas las configuraciones del tus
programas, en general, a nivel de todo el sistema, no de un solo usuario.

Por ejemplo, allí podrás encontrar información sobre el _package manager_ `apt`:
en esta carpeta se guarda la lista de los repositorios, paquetes instalados y
sus archivos de configuración.

# `usr`
`bin/` es la forma corta de _binaries_, que quiere decir archivos binarios o
programas. Por ese motivo, aquí se guardan los programas esenciales y más
básicos. Por ejemplo, podrás encontrar los ejecutables de los comandos:

- `ls`
- `cat`
- `kill`
- `ps`
- ...

Por otro lado, `sbin/` también almacena programas, pero estos son mucho más
sensibles, ya que se tratan de los ejecutables del administrador
(_system admin_). Estos archivos están restringidos al super-usuario y no pueden
ser utilizados por otros.

Sin embargo, en estas carpetas no se suelen instalar otros programas del
usuario.
## `lib`
En este directorio se guardan las librerías de desarrollo y para compilar tú
mismo los programas. Suelen usar estas librerías los ejecutables de `bin` y
`sbin`, pero no es complemente necesario.

## `opt`
Significa _opcional_. Aquí es donde se instala software manualmente e incluso
los programas que has hecho tú mismo.
<!-- TODO: Completar un poco más -->



# Usuarios
## `root`
Esta es la `/home/` del usuario _root_. Puedes guardar archivos sin ningún
problema, mientras seas el usuario _root_: `sudo su`.

## `usr`
Esta es la carpeta del usuario, donde él instalará sus propias aplicaciones, que
son no esenciales para el sistema. En su interior podemos encontrar los
sub-directorios siguientes (con las mismas funciones ya comentadas):

- Ejecutables de aplicación
    - `bin`
    - `sbin`
    - `local`: Programas instalados/compilados desde código fuente: `local/bin`
    `local/sbin`
    - `share`: Programas más grandes: `share/bin` `share/sbin`
    - `games`
    - `lib`
    - `lib32`
    - `lib64`
- Código fuente
    - `include`: para `.h`/`.hpp` de C/C++
    - `src`

No siempre todos los programas se instalan aquí, así que es posible que tengas
que mirar en otros lugares.

> `path` guarda alguna de estas direcciones para saber donde buscar los
> programas del terminal. Usa `which` para conocer su carpeta concreta de un
> comando.

## `home`
> Nota: para escribir más rápido la carpeta del usuario `/home/magno/` (por
> ejemplo) usa `~`.

Aquí dentro cada usuario tiene su propia carpeta. Allí puede guardar sus
documentos y otros, como la carpeta personal de Windows. Paralelamente, podremos
encontrar carpetas y archivos de configuración del usuario (`.config/` y
`.local/`; configuración del escritorio y temas `.themes`, `.fonts`, `.icons`;
aunque otros lo guardan en `home/<user>/` directamente), que normalmente están
ocultos (empiezan por `.`). Estos también guardan caché.

Puede que sea una buena idea también colocar esta carpeta en una nueva partición
de disco, por si ocurre algo con el sistema principal, tus documentos
importantes estén seguros. De la misma forma, puede ser buena idea montar un
sistema de copias de seguridad.

# Resumen
- `/`: root, la base de todo

- `dev` (DEVice files): drivers/hardware
- `boot`: archivos necesarios para iniciar el ordenador
- `sbin`: ejecutables del sistema (solo administrador)
- `bin`: ejecutables básicos &#8594; `ls`, `curl`
- `lib`: librerías compartidas &#8594; `.so`, `.a`

- `etc`: archivos de configuración a nivel de sistema

- `usr`:
    - `lib`: librerías compartidas del usuario &#8594; `.so`, `.a`
    - `bin`: binarios del usuario (no esenciales para el SO: Apps)
    - `local/bin`: binarios compilados por el usuario
    - `.config` o otro dotfile: configuración del usuario
- `home`: carpetas de usuarios (atajo: `~`)

- `opt` (OPTional): addons, plugins, programas propios
- `var`: variables del sistema operativo (logs, cache)
- `tmp`: información temporal, se borra al apagar
- `proc` `run`: carpeta imaginaria, se encarga de gestionar procesos

<!--
etc - Registry, Local Machine
boot - The boot partition
bin and sbin - Windows and system32
lib - system32
opt and some bin - Program Files
dev and proc has no corresponding windows directories
home and root - Users
media, mnt and cdrom - drive letters assigned by windows, but ntfs allows you to mount a partition to a folder like in linux
-->
