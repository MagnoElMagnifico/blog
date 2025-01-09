---
title: Estructura de directorios
weight: 2
date: 2023-06-13
description: >-
    La estructura de archivos de Linux es bastante diferente a la de Windows,
    y quizás un poco contraintuitiva; pero en este post se explica con detalle
    qué es cada carpeta y qué se debería almacenar en ella.
---

[`vmlinuz` y `initramfs`]: {{< ref "so/arranque" >}}
[sistemas de archivos]: {{< ref "so/archivos" >}}
[procesos]: {{< ref "so/procesos" >}}

[1]: https://youtu.be/HbgzrKJvDRw
[2]: https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html
[3]: https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html

[^1]: https://refspecs.linuxfoundation.org/FHS_3.0/fhs/ch02.html
[^2]: https://refspecs.linuxfoundation.org/FHS_3.0/fhs/ch03s07.html
[^3]: https://en.wikipedia.org/wiki/Freedesktop.org
[^4]: https://wiki.archlinux.org/title/XDG_Base_Directory

# Resumen

    /                     Directorio raíz del sistema, todo cuelga de aquí
    bin   -> /usr/bin     Binarios de programas
    sbin  -> /usr/sbin    Binarios del sistema (solo root)
    lib   -> /usr/lib     Librerías de los programas y módulos del kernel
    libXX -> /usr/libXX   Librerías en otros formatos
    usr
        |-> bin, sbin, lib, libXX
        |-> games         Archivos de videojuegos
        |-> include       Archivos de cabecera (.h .hpp) para compilar
        |-> src           Código de fuente por referencia (normalmente del kernel)
        |-> share         Datos independientes de la plataforma
        |   |-> misc      Archivos únicos de aplicaciones
        |   |-> man       Documentos para el manual
        |-> local         Programas compilados localmente sin el package manager
            |-> bin       Binarios instalados localmente
            |-> sbin      Binarios del sistema instalados localmente
            |-> lib       Librerías locales
            |-> etc       Configuración de programas locales
            |-> games     Archivos de videojuegos locales
            |-> include   Archivos de cabecera locales
            |-> man       Documentación del programa man de programas locales
            |-> share     Datos independientes de la plataforma
            |-> src       Código fuente local
    ------------------------------------------------------------------
    etc     Configuración a nivel del sistema
    opt     Paquetes de software autocontenidos
    ------------------------------------------------------------------
    root    Carpeta personal del usuario root
    home    Carpetas personales de los usuarios (~)
        |-> .cache      $XDG_CACHE_HOME   Datos no esenciales
        |-> .config     $XDG_CONFIG_HOME  Configuración del usuario
        |-> .local
            |-> bin                           Ejecutables del usuario (en PATH)
            |-> share   $XDG_DATA_HOME        Datos del usuario
            |-> state   $XDG_STATE_HOME       Logs, historiales, archivos recientes...

        |-> Desktop     $XDG_DESKTOP_DIR      Archivos que aparecen en el escritorio
        |-> Downloads   $XDG_DOWNLOAD_DIR     Descargas de navegadores
        |-> Templates   $XDG_TEMPLATES_DIR    Plantillas para crear nuevos archivos
        |-> Public      $XDG_PUBLICSHARE_DIR  Documentos públicos
        |-> Documents   $XDG_DOCUMENTS_DIR    Documentos personales
        |-> Music       $XDG_MUSIC_DIR        Música
        |-> Pictures    $XDG_PICTURES_DIR     Fotografías
        |-> Videos      $XDG_VIDEOS_DIR       Vídeos
    ------------------------------------------------------------------
    srv     Datos de servicios de este sistema
    tmp     Archivos temporales
    var     Datos variables (logs, BD, archivos de impresión)
    svr     Datos para servidores y servicios
    ------------------------------------------------------------------
    boot    Archivos del boot loader incluyendo el kernel
    mnt     Punto de montaje para sistemas de archivos (manual)
    media   Punto de montaje para unidades externas
    dev     Device files: pseudo-archivos de acceso a periféricos
    proc    Información del sistema (CPU, memoria...) y sus procesos
    sys     Información de dispositivos (brillo de pantalla, carga de batería)
    run     Datos relevantes de procesos en ejecución

# Introducción

El sistema de archivos de Linux es diferente a Windows, y seguramente este sea
uno de los temas más fundamentales que un usuario experto debería conocer.

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

{{< block "Nota" >}}
Por cierto, esta estructura se encuentra recogida en el [FHS][2] (_Filesystem
Hierarchy Standard_).

No todas las distribuciones Linux siguen el estándar (por ejemplo
[NixOS](https://nixos.org/)), pueden haber pequeñas variaciones. Pero por lo
general, esto se cumple.

[2]: https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html
{{< /block >}}

# El sistema de archivos

Se pueden distinguir dos tipos:

- **shareable** vs **unshareable**: un archivo es _shareable_ cuando se puede guardar en un
  ordenador y utilizar en otros sin problemas[^1]. Por ejemplo, los archivos de usuario
  y configuración se pueden compartir, pero _device lock files_ no.

- **variable** vs **estático**: un archivo estático son aquellos que no cambian
  sin intervención del administrador del sistema[^1], como binarios, librerías,
  documentación, etc.

|          | Shareable   | Unshareable |
|:--------:|:-----------:|:-----------:|
| Estático | `/usr`      | `/etc`      |
|          | `/opt`      | `/boot`     |
| Variable | `/var/mail` | `/var/run`  |


# Usuarios

## `/home`

{{< block "Nota" >}}
Para escribir más rápido la carpeta del usuario `/home/magno` (por ejemplo) usa `~`.
También se puede usar la variable `$HOME`.
{{< /block >}}

**Aquí dentro cada usuario tiene su propia carpeta**. Allí puede guardar sus
documentos y otros, como la carpeta personal de Windows.

Puede que sea una buena idea también colocar esta carpeta en una nueva partición
de disco, por si ocurre algo con el sistema principal, tus documentos
importantes estén seguros. De la misma forma, puede ser buena idea montar un
sistema de copias de seguridad.

## _Dotfiles_ de usuario

[freedesktop.org] (antes llamados _Cross Desktop Group_, **XDG**) es un proyecto
que trabaja en la tecnología base que comparten los entornos de escritorio
gratuitos para el _X Window System_ (X11) y _Wayland_ en sistemas basados en
Unix[^3]. Tienen muchas [especificaciones] y [utilidades] intentando
estandarizar la experiencia de usuario dentro de un entorno de escritorio, en
concreto la especificación [XDG Base Directory][3] describe la estructura de la
carpeta del usuario.

Para ello, se crean algunas **variables de entorno** donde se espera que los
datos del usuario se encuentren, para que las aplicaciones sepan donde están
los documentos y donde pueden guardar la configuración específica del usuario.

Por defecto, solo `XDG_RUNTIME_DIR` tiene un valor asignado (debido
a `pam_systemd(8)`). El resto de variables, es responsabilidad del usuario
definirlas según la especificación[^4]. Sin embargo, si no están definidas, los
programas compatibles deberán utilizar los valores por defecto. Por tanto, **solo
es útil definir las variables si se decide cambiar los valores predeterminados**.

{{< block "Importante" "var(--magno-red)" "black" >}}
No todos los programas siguen la especificación, de hecho, solo unos pocos. Este
problema da lugar al [_dotfile madness_], donde el usuario tiene los archivos de
configuración de programas por todas partes. No es para tanto, dado que la
mayoría simplemente se almacenan en `~/.<programa>`.

En la [Arch Wiki] hay una lista de programas, indicando cuáles siguen el estándar
y cuáles no.

[Arch Wiki]: https://wiki.archlinux.org/title/XDG_Base_Directory
[_dotfile madness_]: https://0x46.net/thoughts/2019/02/01/dotfile-madness/
{{< /block >}}

Las variables más importantes son:

| Variable             | Valor por defecto   | Descripción del contenido                                           |
|----------------------|---------------------|---------------------------------------------------------------------|
| `$XDG_DATA_HOME`     | `~/.local/share`    | Datos _shareables_                                                  |
| `$XDG_CONFIG_HOME`   | `~/.config`         | Configuración (análogo a `/etc`).                                   |
| `$XDG_STATE_HOME`    | `~/.local/state`    | Estado del usuario como logs, historiales, archivos recientes, etc. |
| `$XDG_CACHE_HOME`    | `~/.cache`          | Datos no esenciales (caché) del usuario (análogo a `/var/cache`).   |
| `$XDG_RUNTIME_DIR`   |                     | Archivos _runtime_ y otro tipo de objetos como sockets              |

Estos directorios son **únicos**: no existen otras localizaciones dónde
almacenar ese tipo de archivos.

También hay otro directorio para **almacenar ejecutables del usuario**, por
defecto en `~/.local/bin`. La distribución se debe asegurar que estos
directorios estén en `PATH`. Hay que tener cuidado cuando `/home` se comparta
entre varios sistemas, es posible que los ejecutables no funcionen allí.

{{< dropdown "Otras variables" >}}
- `$XDG_DATA_DIRS`: conjunto de directorios de datos ordenados de mayor a menor
  preferencia en los que buscar, siendo `$XDG_DATA_HOME` la primera localización
  donde se mire. Por defecto es `/usr/local/share/:/usr/share/`.

- `$XDG_CONFIG_DIRS`: conjunto de directorios de configuración ordenados de
  mayor a menor preferencia en los que buscar, siendo `$XDG_CONFIG_HOME` la
  primera localización donde se mire. Por defecto es `/etc/xdg`.
{{< /dropdown >}}

## Carpetas estándar

Además de estos archivos, la gente de [freedesktop.org] provee de la utilidad
[`xdg-user-dirs`], que ayuda a manejar los conocidos directorios del usuario:

- Desktop
- Downloads
- Templates
- Public
- Documents
- Music
- Pictures
- Videos

Los nombres describen bastante bien el significado del directorio, excepto
`Templates` y `Public`, que pueden ser un poco confusos.

- Si guardas archivos en `Templates`, en la mayoría de entornos de escritorio,
  el explorador de archivos permitirá hacer copias de esas plantillas
  personalizadas para que puedas trabajar más rápidamente.

- `Public` se utiliza para compartir archivos públicamente, de forma que el
  resto de tus archivos no se expongan. Por defecto no se comparte, pero si
  alguna vez utilizas un servicio para compartir archivos, lo ideal es hacerlo
  aquí.

{{< block "Nota" >}}
En KDE con Dolphin, la creación de plantillas es algo más complicado. En la
carpeta `~/.local/share/templates` crea un archivo `.desktop` por cada plantilla
de la siguiente forma:

```
[Desktop Entry]
Name    = Nombre que aparecerá en el menú "Create new" de Dolphin
Comment = Texto que aparece cuando se le da un nombre
URL     = $HOME/Templates/plantilla
Type    = Link
Icon    = $HOME/icon.png
```
{{< /block >}}

Esta utilidad lee el archivo de configuración `$XDG_CONFIG_HOME/user-dirs.dirs`,
que permite al usuario cambiar estos últimos. Simplemente edita este archivo con
el nuevo valor que se desee, como traducir los títulos. Este es mi el mio:

```bash
XDG_DESKTOP_DIR="$HOME"
XDG_DOWNLOAD_DIR="$HOME/Downloads"
XDG_TEMPLATES_DIR="$HOME/Templates"
XDG_PUBLICSHARE_DIR="$HOME/Public"
XDG_DOCUMENTS_DIR="$HOME/Files"
XDG_MUSIC_DIR="$HOME/Music"
XDG_PICTURES_DIR="$HOME/Images"
XDG_VIDEOS_DIR="$HOME/Videos"
```

De esta forma, desde la terminal, puedo escribir una letra en la terminal
y usar tabulador para moverme rápidamente entre mis archivos.

Si deseas recuperar los valores por defecto, estos están en
`/etc/xdg/user-dirs.defaults`. Además, si deseas eliminar un directorio, no
borres o comentes la línea, simplemente déjalo a `$HOME`.

Ojo, el comando `xdg-user-dirs-update` no crea las carpetas, simplemente
verifica que el archivo de configuración es correcto y está actualizado.

Todo este sistema puede ser útil para algunas aplicaciones, que consulten el
`user-dirs.dirs` para ver donde colocar los archivos. Repito, esto solo es un
estándar y puede que algunos programas no lo usen.

[freedesktop.org]: https://www.freedesktop.org/
[especificaciones]: https://www.freedesktop.org/wiki/Specifications/
[utilidades]: https://www.freedesktop.org/wiki/Software/
[`xdg-user-dirs`]: https://www.freedesktop.org/wiki/Software/xdg-user-dirs/


## `/root`

Esta es la **carpeta personal del usuario _root_**. Puedes guardar archivos sin
ningún problema, mientras seas el usuario _root_: `sudo su`.


# `/usr`


Originalmente en Unix aquí se almacenaban las **carpetas de los usuarios**, al
igual que ahora sucede con `home`. Pero actualmente su uso ha disminuido
a solamente <<programas que puede usar el usuario y otros datos>>: contiene
binarios del sistema, documentación, librerías, archivos de cabecera... El
acrónimo <<oficial>> es _Unix System Resources_.

En esta carpeta se almacena la mayoría del contenido, por lo tanto es una de las
más importantes. En su interior podemos encontrar los sub-directorios
obligatorios de los apartados siguientes.

Según el estándar, los tipos de archivos que contiene se catalogan como
**_shareables_ y de solo lectura** instalados por la distribución.

Son solo de lectura (salvo por instalación o actualización) porque los archivos
de configuración van en [`/etc`](#etc).

## `/usr/bin`

{{< block "Nota" >}}
Ver también [`/bin`](#bin-sbin-y-libxx) para más detalles.
{{< /block >}}

`bin` es la forma corta de _binaries_, que quiere decir archivos binarios o
programas. **Contiene los comandos que puede usar tanto el administrador del
sistema como los distintos usuarios**.

Además, si un programa se instala con el package manager de tu distro (`pacman`,
`apt`, etc), también acabará aquí.

**No debe haber subdirectorios en `/usr/bin`**.

{{< dropdown "Contenido obligatorio de `/usr/bin`" >}}
Son obligatorios los siguientes comandos:

    cat        Contatenar archivos con stdout
    chgrp      Cambiar el dueño del grupo del archivo
    chmod      Cambiar los permisos de un archivo
    chown      Cambiar el dueño y grupo de un archivo
    cp         Copiar archivos y directorios
    date       Mostrar y configurar la fecha del sistema
    dd         Copiar y convertir un archivo
    df         Uso de espacio en disco
    dmesg      Mostrar o controlar el buffer de mensajes del kernel
    echo       Mostrar una línea de texto
    false      Hacer nada en fracaso
    hostname   Mostrar o configurar el nombre del host del sistema
    kill       Enviar señales a procesos
    ln         Crear enlaces simbólicos entre archivos
    login      Iniciar una sesión en el sistema
    ls         Listar contenidos de los directorios
    mkdir      Crear directorios
    mknod      Crear bloques u otros archivos especiales
    more       Paginar texto
    mount      Montar sistemas de archivos
    mv         Mover o renombrar archivos
    ps         Mostrar procesos y su estado
    pwd        Mostrar la carpeta de trabajo
    rm         Borrar archivos o directorios
    rmdir      Borrar directorios vacíos
    sed        Editor de stream
    sh         Shell de comandos compatible con POSIX
    stty       Configurar la terminal
    su         Cambiar el ID de usuario
    sync       Flush los buffers del sistema de archivos
    true       Hacer nada en éxito
    umount     Desmontar sistemas de archivos
    uname      Mostrar información del sistema

Algunos de los paquetes que dan los comandos más básicos de Linux y que
prácticamente están instalados en todos los sistemas son:

- [`util-linux`](https://en.wikipedia.org/wiki/Util-linux):
  `lsblk`, `kill`, `su`, `whereis`, `mkfs`, `mount`, `fdisk`...
- [`coreutils`](https://en.wikipedia.org/wiki/List_of_GNU_Core_Utilities_commands)
  `cat`, `ls`, `rm`, `mv`, `mkdir`, `pwd`, `echo`...
{{< /dropdown  >}}

## `/usr/sbin`

Por otro lado, `sbin` también almacena programas, pero estos son mucho más
sensibles, ya que se tratan de los **ejecutables del administrador** (_system
admin_). Estos archivos están restringidos al super-usuario y no pueden ser
utilizados por otros.

Estos binarios son esenciales para iniciar, recuperar y/o reparar el sistema;
como por ejemplo `shutdown`, `fdisk`, `getty`, `ifconfig` y `mkfs`. Más ejemplos
[aquí](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/ch03s16.html).

El único requerimiento del estándar es que no existan subdirectorios dentro de
esta carpeta.

Nótese que los programas de este tipo localmente instalados deben ir en
`/usr/local/sbin`.

{{< block "Nota" >}}
`PATH` guarda alguna de estas direcciones para saber donde buscar los programas
del terminal. Usa `which` para conocer su carpeta concreta de un comando.
{{< /block >}}


## `/usr/lib`

Finalmente; `lib`, `lib32`, `lib64` y otras variantes son directorios en los que
se almacenan las **librerías de determinados programas**. Estos son otros
archivos binarios que añaden funcionalidad a algunas aplicaciones.

También es útil para poder compilar de forma sencilla, ya que el _linker_ mirará
por defecto en ellas:

```sh
gcc -o exe main.c -llibreria
```

Y la librería en cuestión está en `/usr/lib/liblibreria.so`.

{{< block "Nota" >}}
Los paquetes del kernel generalmente se instalan en `/usr/lib/modules/*`
{{< /block >}}


## `/usr/local`

El motivo de hacer esta separación es el de tener otro directorio `usr` que se
pueda montar en solo lectura en algún otro lugar. Sin embargo, hoy en día, solo
se usa para guardar **programas de terceros o autocompilados**.

Es utilizado por el administrador del sistema para instalar software localmente,
de esta forma está seguro de sobreescrituras cuando los programas de sistema se
actualizan.

Este incluye (y ninguno más):

- `bin`, `sbin`, `lib`: equivalentes a los vistos hasta ahora
- `man` (que suele ser un enlace a `/usr/share/man`): páginas del manual, documentación
- `share`
- `etc`
- `games`
- `include`
- `src`

Tienen el mismo uso que los que ya se describieron

Tras una instalación limpia, estas carpetas deben estar vacías.


## `/usr/share`

Esta carpeta contiene archivos de **solo lectura que se pueden compartir**
y archivos independientes de la arquitectura de software: documentación, iconos,
fuentes, imágenes de fondo... Sin embargo, no está pensada para compartir con
otros sistemas operativos.

Cualquier programa o paquete que contenga o necesite datos que no tengan que
ser modificados también se pueden guardar aquí (o en `/usr/local/share`).

Se recomienda que se cree un subdirectorio para los datos correspondientes, y si
la aplicación solo guarda un único archivo, debe guardare en `/usr/share/misc`.

Algunas subcarpetas importantes:

- `/usr/share/games`: datos estáticos de videojuegos
- `/usr/share/doc`: documentación de algunos programas
- `/usr/share/man`: documentación para el programa _man_
- `/usr/share/info`: más documentación (hoy no se usa tanto)

Y [más](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/ch04s11.html) como:
`color`, `dict`, `locale`, `nls`...


## Otros

- `/usr/games`: archivos de videojuegos
- `/usr/include`: archivos de cabecera necesarios para compilar (`.h`, `.hpp`)
- `/usr/src`:
    - `/usr/src/linux`:los archivos de código fuente de Linux
    - `/usr/src/Documentation`: documentación
    - `/usr/src/.config`: configuración


# `/bin`, `/sbin` y `/libXX`

En 1970, en el sistema Unix, los discos tenían bastante poco espacio. Los
binarios del sistema ocupaban cada vez más, tanto que se necesitaban varios
discos para ellos.

Los desarrolladores tuvieron que separarlos en varias carpetas para poder
[montarlos] por separado. Cuando `/bin` estaba lleno, se instalaba en
`/usr/bin`, que por aquel momento **era la carpeta del usuario**.

Después, se intentaron montar justificaciones arbitrarias sobre lo que debía ir
en `/bin` frente a `/usr/bin`, pero de forma informal:

- `/bin`: binarios <<esenciales>>
- `/usr/bin`: el resto

Lo mismo sucedía para `/lib`.

Con el paso del tiempo, las carpetas de los usuarios se mezclaban con las del
sistema, por lo que finalmente se movieron a la nueva carpeta de `/home`
y mantener `/usr` para <<cosas del sistema>>.

Luego apareció el estándar [FHS][2], que decidió formalizar este estándar. Por
tanto, los nombres _Unix Source Repository_ o _Unix System Resources_ con solo
para <<parchear>> el problema de que originalmente era de _user_.

Actualmente, estas carpetas se conservan por algunos programas que todavía
utilizan estas direcciones. Por eso en distribuciones actuales de Linux, son
solamente enlaces simbólicos a `/usr/bin`, `/usr/sbin` y `/usr/libXX`; cuyo
propósito es el mismo.

Esto hace que el sistema sea más compatible con Unix y se simplifica la
jerarquía de carpetas: anteriormente era necesario diferenciar los programas a
nivel de equipo o usuario y esencial o no esencial.

Fuente: [AskUbuntu](https://askubuntu.com/a/135679)

[montarlos]: {{< ref "so/archivos/#montaje-de-sistemas-de-archivos" >}}

# `/opt`

Significa _optional_. Aquí es donde se instala software manualmente e incluso
los programas que has hecho tú mismo, pero que sea ***self-contained***. Esto
significa que el programa no se separa en `bin`, `lib`, `share`, etc y que le
llega con tener una única carpeta. Suelen ser **programas comerciales**.

Cada paquete debe ir en `/opt/<paquete>` o `/opt/proveedor`.

# `/etc`

Finalmente se ha confirmado que el nombre de esta carpeta quiere decir
_etcétera_. Aquí es donde se guardas todas las **configuraciones de programas
a nivel de todo el sistema**, no de un solo usuario.

Requerimientos del estándar[^2]:

- No debe haber ningún ejecutable en este directorio.
- Debe existir una carpeta de configuración `/etc/opt` de los programas
  instalados en `/opt`.
- Se recomienda que dichas configuraciones estén dentro de sus propias carpetas,
  no directamente en `/etc`.

Por ejemplo, allí podrás encontrar información sobre el _package manager_ `apt`:
en esta carpeta se guarda la lista de los repositorios, paquetes instalados y
sus archivos de configuración.

Lista de algunos archivos de configuración más importantes:

- `/etc/fstab`: _File Systems Table_. Montado y configuración de particiones durante el arranque.
- `/etc/mtab`: _Mounted file systems Table_. Lista de sistemas de archivos actualmente montados.

Usuarios y grupos:

- `/etc/passwd`: información sobre usuarios: nombre, UID, GID, _login_, _shell_, directorio _home_, etc.
- `/etc/shadow`: información de grupos de usuarios: nombre, GID y miembros.
- `/etc/gshadow`: contraseñas encriptadas de los grupos.
- `/etc/sudoers`: lista de usuarios con capacidad para ejecutar comandos privilegiados.
- `/etc/skel/*`: directorio con los archivos a copiar a nuevos usuarios
- `/etc/adduserconf`: configuración por defecto de los nuevos usuarios creados con `adduser`.

Redes:

- `/etc/network/interfaces`: configuración de las interfaces (manual o dinámica -- DHCP).
- `/etc/resolv.conf`: especifica el dominio y los servidores DNS a usar.
- `/etc/hosts`: asociación de nombres de host a direcciones IP, similar a un DNS local.
- `/etc/hostname`: nombre de host de la máquina (debe estar asociado a `127.0.0.1` en `/etc/hosts`).
- `/etc/dhcp/dhcp.conf`: configuración del servidor DHCP
- `/etc/sysctl.conf`: configuración del tráfico IP como _IP forwarding_.
- `/etc/services`: asociación de puertos y protocolos con los servicios que ofrecen.

_Package managers_:

- `/etc/apt/sources.list`: _mirrors_ de los que descargar software.
- `/etc/apt.conf.d/*`: directorio del resto de configuración de `apt`.

Otros:

- `/etc/cron.hourly/*`, `/etc/cron.daily/*`, `/etc/cron.monthly/*`: directorios
  con scripts de ejecución periódica.

Otros ejemplos de archivos [aquí](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/ch03s07.html).

Nótese que la disposición de algunos archivos pueden cambiar dependiendo de la
propia distribución. Consulta la documentación de cada uno para obtener más
detalles.

# `/svr`

Datos específicos que utilizados por servidores que se estén ejecutando en el
sistema.

# `/var`

Este es el directorio _variable_, contiene carpetas y archivos dedicados a
guardar datos que suelen aumentar en tamaño, como _logs_ de sistema, _caché_ y
demás.

# `/tmp`

Lugar para almacenar **datos temporalmente** durante una sesión. Por ejemplo, si
estás escribiendo un archivo en un programa de ofimática, es posible que el
programa guarde copias de seguridad regularmente, por si ocurre un error, se va
la luz u otros inconvenientes. Luego podrás recuperar esos datos.

Generalmente se borra al reiniciar el sistema.


# Sistema

## `/boot`

Contiene las imágenes de [`vmlinuz` y `initramfs`], además de la configuración
del _bootloader_ y cualquier otro tipo de información que se necesite antes de
que el kernel ejecute programas de usuario.

Solo es necesario que esté presente durante el arranque y durante la
actualización del kernel (se necesita regenerar el `initramfs`).

Normalmente se utiliza el formato FAT32 para evitar que los _bootloaders_ no
conozcan las nuevas características de los [sistemas de archivos].

Aquí se guardan los archivos que necesita el sistema operativo para encenderse
(ejecutables del _bootloader_) y **el propio kernel**. Por este motivo, no es
recomendable toquetear los archivos de este directorio. Normalmente es una
partición separada.


## `/media` y `/mnt`

`/media` y `/mnt` son los directorios en donde el sistema monta los dispositivos
como USBs, _floppy disks_, discos duros externos, CDs y demás. Las
distribuciones actuales de Linux los montan automáticamente unidades externas
removibles en la carpeta de `/media`.

Por lo tanto, el USB que insertes estará en
`/media/<usuario>/<nombre del dispositivo>`. Pero si quieres montar algo
manualmente con el comando `mount`, déjalo en `/mnt`


## `/dev`

En este directorio, el kernel de Linux almacena **pseudo-archivos**, que
representan dispositivos (de ahí el nombre _devices_) y pseudo-dispositivos.

{{< todo "Pendiente de revisión y verificación" >}}
En Linux (y también en Unix), todo es un archivo: desde un archivo de texto
hasta los mismos USBs, teclados, discos duros, etc.

Se trata de un modelo bastante sencillo, porque los drivers consisten en los
programas que implementan las llamadas para escribir y leer datos de estos
archivos especiales.

Los drivers, el kernel y determinadas aplicaciones acuden a este directorio para
saber con qué dispositivos cuenta tu ordenador. Por ejemplo, un disco sería
`sda` y una partición `sda1`, `sda2`...
{{< /todo >}}

Algunos ejemplos de dispositivos:

- `/dev/sdX`, `/dev/hdX`: (_Sata Disk_ o _Hard Drive_) archivos de bloque que
  representan discos duros.

Ejemplos de pseudo-dispositivos:

- `/dev/null`: archivo que descarta todos los datos que se le escriben.
- `/dev/random`, `/dev/urandom`: fichero con contenidos aleatorios de mayor o menor calidad.


## `/proc`



`proc` de _procedures_. Contiene **información de todos los [procesos]** que se
están ejecutando en el momento, que principalmente son pseudo-archivos. **No son
archivos del disco** realmente, el kernel los traduce a archivos, por lo que no
ocupan espacio.

Cada uno de estos procesos tendrá un subdirectorio con el nombre del
identificador del proceso (PID):

- `/proc/PID/fd/*`: directorio con los descriptores de archivos (_File
  Descriptors_) que tiene abiertos).
- `/proc/PID/cwd`: enlace al directorio de trabajo del proceso.
- `/proc/PID/exe`: enlace al ejecutable del proceso.
- `/proc/PID/cmdline`: línea de comandos con la que se invocó el proceso.
- `/proc/PID/environ`: variables del entorno.
- `/proc/PID/maps`: mapa de memoria del proceso.
- `/proc/PID/status`: estado del proceso.

`/proc` es una elegante interfaz con el espacio de direcciones
de cada proceso. Permite a un usuario leer y modificar el espacio de direcciones
de otro proceso y realizar tareas de control sobre el mismo, simplemente usando
la interfaz del sistema de archivos.

Paralelamente puedes encontrar **información sobre propio sistema**:

- `/proc/cpuinfo`: información sobre la CPU.
- `/proc/meminfo`: información del uso de la memoria principal.
- `/proc/interrupts`: interrupciones usadas por IRQ.
- `/proc/ioports`: lista puertos de entrada/salida del sistema.
- `/proc/filesystems`: lista de sistemas de archivos soportados.
- `/proc/partitions`: información sobre las particiones
- `/proc/uptime`

Directorios con más información:

- `/proc/net/*`
- `/proc/bus/*`

## `/sys`

De forma similar a `/proc`, da información sobre los dispositivos conectados,
como el nivel de la batería, el brillo de la pantalla, etc.

## `/run`

Funciona en RAM, lo que significa que todo se borrará al apagar el ordenador.
Aunque diferentes distribuciones lo utilizan de formas un poco diferentes,
generalmente sirve para guardar datos al iniciar la máquina, usuarios
conectados y deamons en ejecución.


{{< todo >}}
# Comparación con Windows

No hay información en ningún sitio sobre esto.
Windows se da tan por hecho, que realmente nadie sabe usarlo.
https://en.wikipedia.org/wiki/Directory_structure

Carpetas virtuales, This PC, Quick Access, Libraries

    libraries = lista de lugares donde el usuario guarda archivos que las
    aplicaciones pueden encontrar y mostrar los datos (... que?)
    this pc = %userprofile% ?
    %userprofile% = C:/Users/<usuario>
    %appdata% = %userprofile%/appdata
    %programdata% = C:/ProgramData

En Windows, cada dispositivo conectado es una unidad de ficheros diferente,
empezando por la letra `C`, que es donde está Windows instalado.

En `C:`

- `PerfLogs`: logs de _performance_, pero vacío por defecto
- `Program Files`: carpeta de instalación de programas
- `Program Files (x86)`: carpeta de instalación de programas de 32 bits
- `Program Data`: configuración y datos de los programas a nivel de sistema
- `Windows`: lugar de instalación de Windows
  - `System` `System32` `SysWOW64`: guardan los _DLL_ de Windows API
  - `WinSxS`: _Windows component store_
- `Users`: carpetas de los usuarios. Además de esas existen `Default`
  (escondido), `Public`, `Default User` (puntero a `Default`), `All Users`
  (puntero a `Program Data`)
  - `Public`: espacio para que los usuarios del sistema compartan archivos
    suyos, no programas. (opción en el Explorador de Archivos: Compartir con
    <usuario>). Tambien se abre en la red local.
  - `<usuario>/AppData` `%appdata%`: configuración de aplicaciones por usuario.
    - `Local` `LocalLow`
    - `Roaming`: se utiliza para _networking based logins for roaming
      profiles_. Los datos se sincronizarán por red.
{{< /todo >}}

# Dudas frecuentes
## ¿Dónde instalar programas?

|                        | Instalado por el sistema | Instalado por el administrador/usuario |
|------------------------|--------------------------|----------------------------------------|
| Todo el sistema        | `/usr/bin`               | `/usr/local/bin`                       |
| Solo un usuario        |                          | `~/.local`                             |
| Si es _self-contained_ | `/opt`                   | `~/.local/opt`                         |

Cuando digo `bin`, también me refiero a otros directorios como `lib`, `share`
o `include`. Por este motivo, casi siempre se repite la misma estructura en
varios sitios.

Un programa _self-contained_ es aquel que no se separa entre estas carpetas
y solamente se instala en una sola (como más o menos sucede en Windows).

Cuando un usuario (o el administrador) instala un programa desde su código
fuente, es decir:

```bash
./configure
make
sudo make install
```

Generalmente el valor por defecto es `/usr/local`. Solo se cambia si el usuario
lo quiere instalar solo para sí mismo:

```bash
./configure --prefix=$HOME/.local
```

{{< block "Nota" >}}
`flatpak` y `snap`s se colocan en directorios completamente diferentes.
{{< /block >}}

## ¿Dónde está mi configuración?

Si el programa sigue el estándar de [FHS][2] y [freedesktop.org]:

- `/etc` para la configuración de todo el sistema
- `~./config` para la configuración del usuario

De lo contrario, deberías consultar la documentación del programa, aunque
podrías empezar mirando por algo como `~/.<programa>` o `~/.<vendor>`.

