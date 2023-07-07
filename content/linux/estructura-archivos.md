---
title: Estructura directorios
weight: 3
date: 2023-06-13
description: >-
    La estructura de archivos de Linux es bastante diferente a la de Windows,
    y quizás un poco contraintuitiva; pero en este post se explica con detalle
    qué es cada carpeta y qué se debería almacenar en ella.
---

[1]: https://youtu.be/HbgzrKJvDRw
[2]: https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html
[3]: https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html

[^1]: https://refspecs.linuxfoundation.org/FHS_3.0/fhs/ch02.html
[^2]: https://refspecs.linuxfoundation.org/FHS_3.0/fhs/ch03s07.html
[^3]: https://en.wikipedia.org/wiki/Freedesktop.org
[^4]: https://wiki.archlinux.org/title/XDG_Base_Directory

**Fuente**: vídeo de [DorianDotSlash][1] y [documentación de FHS][2].

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
**
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


# Resumen

    bin   -> /usr/bin     Binarios esenciales: ls, cat, uname
    sbin  -> /usr/sbin    Binarios del sistema esenciales (solo root)
    lib   -> /usr/lib     Librerías esenciales y módulos del kernel
    libXX -> /usr/libXX   Otros formatos de librerías esenciales
    usr
        |-> bin, sbin, lib, libXX
        |-> local         Datos no esenciales y programas compilados localmente
        |   |             sin el package manager
        |   |-> bin       Binarios instalados localmente
        |   |-> sbin      Binarios del sistema instalados localmente
        |   |-> lib       Librerías locales
        |   |-> etc       Configuración de programas locales
        |   |-> games     Archivos de videojuegos locales
        |   |-> include   Archivos de cabecera locales
        |   |-> man       Documentación del programa man
        |   |-> share     Datos independientes de la plataforma
        |   |-> src       Código fuente local
        |-> share         Datos independientes de la plataforma, datos de
        |   |             aplicaciones, etc.
        |   |-> misc      Archivos únicos de aplicaciones
        |-> games         Archivos de videojuegos
        |-> include       Archivos de cabecera (.h .hpp) para compilar
        |-> src           Código de fuente por referencia
    ------------------------------------------------------------------
    etc     Configuración del sistema
    opt     Paquetes de software adicionales o instalado manualmente
    ------------------------------------------------------------------
    boot    Archivos estáticos del boot loader (NO TOCAR)
    mnt     Punto de montaje para sistemas de archivos (manual)
    media   Punto de montaje para unidades externas
    dev     Device files
    run     Datos relevantes de procesos en ejecución
    srv     Datos de servicios de este sistema
    tmp     Archivos temporales
    var     Datos variables
    svr     Datos para servidores
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


# El sistema de archivos

Se pueden distinguir dos tipos:

- **shareable** vs **unshareable**: un archivo shareable se puede guardar en un
  ordenador y utilizar en otros[^1]. Por ejemplo, los archivos de usuario
  y configuración son shareables, pero _device lock files_ no.

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

> Nota: para escribir más rápido la carpeta del usuario `/home/magno` (por
> ejemplo) usa `~`.

**Aquí dentro cada usuario tiene su propia carpeta**. Allí puede guardar sus
documentos y otros, como la carpeta personal de Windows.

Puede que sea una buena idea también colocar esta carpeta en una nueva partición
de disco, por si ocurre algo con el sistema principal, tus documentos
importantes estén seguros. De la misma forma, puede ser buena idea montar un
sistema de copias de seguridad.

### `$HOME/.config`, `$HOME/.local`, etc

[freedesktop.org] (antes llamados _Cross Desktop Group_, **XDG**) es un proyecto
que trabaja en en la tecnología base que comparten los entornos de escritorio
gratuitor para el _X Window System_ (X11) y _Wayland_ en Linux y otros sistemas
basados en Unix[^3]. Tienen muchas [especificaciones] y [utilidades] intentando
estandarizar la experiencia de usuario dentro de un entorno de escritorio, en
concreto la especificación [XDG Base Directory][3] describe la estructura de la
carpeta del usuario.

Para ello, se crean algunas **variables de entorno** donde se espera que los
datos del usuario se encuentren, para que las aplicaciones sepan donde están
los documentos y donde pueden guardar la configuración específica del usuario.

Conceptos básicos:

- `$XDG_DATA_HOME`: Único directorio para escribir datos del usuario. Por
  defecto es `~/.local/share`.

- `$XDG_CONFIG_HOME`: Único directorio para almacenar configuración del usuario
  (análogo a `/etc`). Por defecto es `~/.config`.

- `$XDG_STATE_HOME`: Único directorio para almacenar estados del usuario como
  logs, historiales, archivos recientes, etc. Por
  defecto es `~/.local/state`.

- `$XDG_CACHE_HOME`: Único directorio para almacenar datos no esenciales (caché)
  del usuario (análogo a `/var/cache`). Por defecto es `~/.cache`.

- `$XDG_RUNTIME_DIR`: Único directorio para almacenar archivos runtime y otro
  tipo de objetos.

------------------------------------------------------------

- Hay un único directorio para almacenar ejecutables del usuario, por defecto en
  `~/.local/bin`. La distribución se debe asegurar que estos directorios esten
  en `PATH`. Hay que tener cuidado cuando `/home` se comparta entre varios
  sistemas, es posible que los ejecutables no funcionen allí.

------------------------------------------------------------

- `$XDG_DATA_DIRS`: conjunto de directorios de datos ordenados de mayor a menor
  preferencia en los que buscar, siendo `$XDG_DATA_HOME` la primera localización
  donde se mire. Por defecto es `/usr/local/share/:/usr/share/`.

- `$XDG_CONFIG_DIRS`: conjunto de directorios de configuración ordenados de
  mayor a menor preferencia en los que buscar, siendo `$XDG_CONFIG_HOME` la
  primera localización donde se mire. Por defecto es `/etc/xdg`.

Por defecto, solo `XDG_RUNTIME_DIR` tiene un valor debido a `pam_systemd(8)`;
para el resto es responsabilidad del usuario definirlas según la especificación[^4].
Sin embargo, si no están definidas, se toma el valor por defecto; por tanto,
solo es útil definir las variables si se decide cambiar lo predeterminado.

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

### `$HOME/Downloads`, `$HOME/Templates`, `$HOME/Documents`...

Además de estos archivos, la gente de FreeDesktop.org provee de la utilidad
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


## `/usr`

En versiones de Unix anteriores aquí se almacenaban las carpetas de los usuarios,
al igual que ahora sucede con `home`. Pero actualmente su uso ha disminuido a
solamente <<programas que puede usar el usuario y otros datos>>: contiene binarios
del sistema, documentación, librerías, archivos de cabecera...

Según el estándar, los tipos de archivos que contiene se catalogan como
shareables y de solo lectura.

En esta carpeta se almacena la mayoría del contenido, por lo tanto es una de las
más importantes. En su interior podemos encontrar los sub-directorios
obligatorios de los apartados siguientes.


### `/usr/bin`

> Ver también [`/bin`](#bin-sbin-y-libxx)

`bin` es la forma corta de _binaries_, que quiere decir archivos binarios o
programas. **Contiene los comandos que puede usar tanto el administrador del
sistema como los distintos usuarios**.

Además, si un programa se instala con el package manager de tu distro (`pacman`,
`apt`, etc), también acabará aquí.

**No debe haber subdirectorios en `/usr/bin`**.

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

<!-- TODO: Cuando se publique el post de comandos de Linux -->
<!-- Ver más en detalle en: [comandos de Linux]. -->
<!-- [comandos de Linux]: {{< relref "comandos" >}} -->

Y entre otros muchos, los siguientes opcionales:

    ed        Editor ed
    tar       Crear archivos tar
    gzip      Comprimir archivos
    gunzip    Descomprimir archivos
    zcat      Descomprimir archivos
    netstat   Mostrar estadísticas de red
    ping      Probar ICMP


### `/usr/sbin`

Por otro lado, `sbin` también almacena programas, pero estos son mucho más
sensibles, ya que se tratan de los ejecutables del administrador
(_system admin_). Estos archivos están restringidos al super-usuario y no pueden
ser utilizados por otros.

Estos binarios son esenciales para iniciar, recuperar y/o reparar el sistema;
como por ejemplo `shutdown`, `fdisk`, `getty`, `ifconfig` y `mkfs`. Más ejemplos
[aquí](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/ch03s16.html).

El único requerimiento del estándar es que no existan subdirectorios dentro de
esta carpeta.

Nótese que los programas de este tipo localmente instalados deben ir en
`/usr/local/sbin`.

> `PATH` guarda alguna de estas direcciones para saber donde buscar los
> programas del terminal. Usa `which` para conocer su carpeta concreta de un
> comando.


### `/usr/lib`

Finalmente; `lib`, `lib32`, `lib64` y otras variantes son directorios en los que
se almacenan las librerías de determinados programas. Estos son otros archivos
binarios que añaden funcionalidad a algunas aplicaciones.

Estas carpetas también suelen estar en la `PATH` para poder compilar de forma
sencilla:

```sh
gcc -o exe main.c -llibreria
```

Y la librería en cuestión está en `/usr/lib/liblibreria.so`.


### `/usr/local`

El motivo de hacer esta separación es el de tener otro directorio `usr` que se
pueda montar en solo lectura en algún otro lugar. Sin embargo, hoy en día, solo
se usa para guardar programas de terceros o autocompilados.

Es utilizado por el administrador del sistema para instalar software localmente,
de esta forma está seguro de sobreescrituras cuando los programas de sistema se
actualizan.

Este incluye (y ninguno más):

- `bin`, `sbin`, `lib`
- `man` (que suele ser un enlace a `/usr/share/man`)
- `share`
- `etc`
- `games`
- `include`
- `src`

Tienen el mismo uso que los que ya se describieron

Tras una instalación limpia, estas carpetas deben estar vacías.


### `/usr/share`

Esta carpeta contiene archivos de solo lectura que se pueden compartir
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


### Otros

- `/usr/games`: archivos de videojuegos
- `/usr/include`: archivos de cabecera necesarios para compilar (`.h`, `.hpp`)
- `/usr/src`:
    - `/usr/src/linux`:los archivos de código fuente de Linux
    - `/usr/src/Documentation`: documentación
    - `/usr/src/.config`: configuración


# Binarios y configuración

## `/bin`, `/sbin` y `/libXX`

Estas carpetas se conservan por algunos programas que todavía utilizan estas
direcciones, por eso en distribuciones actuales de Linux, son solamente enlaces
simbólicos a `/usr/bin`, `/usr/sbin` y `/usr/libXX`; cuyo propósito es el mismo.

Esto hace que el sistema sea más compatible con Unix y se simplifica la
jerarquía de carpetas: anteriormente era necesario diferenciar los programas a
nivel de equipo o usuario y esencial o no esencial.


## `/etc`

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

Otros ejemplos de archivos [aquí](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/ch03s07.html).


## `/opt`

Significa _opcional_. Aquí es donde se instala software manualmente e incluso
los programas que has hecho tú mismo.

Cada paquete debe ir en `/opt/<paquete>` o `/opt/proveedor`.

Los directorios

- `/opt/bin`
- `/opt/doc`
- `/opt/include`
- `/opt/info`
- `/opt/lib`
- `/opt/man`

están reservados para el uso del administrador, dado que los programas que ejecute
el usuario deben seguir el patrón de `/opt/<paquete>`.

Tras una instalación limpia esta carpeta debería estar vacía.


# Sistema

## `/boot`

Aquí se guardan los archivos que necesita el sistema operativo para encenderse
(_boot_), en otras palabras, aquí están los ejecutables del _bootloader_. Por
este motivo, no es recomendable toquetear los archivos de este directorio.
Normalmente es una partición separada.


## `/dev`

Quiere decir _devices_ o dispositivos. En Linux (y también en Unix), todo es un
archivo: desde un archivo de texto en el que guardas las contraseñas de tus
redes sociales, USBs, teclados, discos duros, etc.

Los drivers, el kernel y determinadas aplicaciones acuden a este directorio para
saber con qué dispositivos cuenta tu ordenador. Por ejemplo, un disco sería
`sda` y una partición `sda1`, `sda2`...

<!-- TODO: Cuando se publique el post de archivos en Linux -->
<!-- También por este motivo, es aquí donde más aparecen los diferentes tipos de
archivos (ver [tipos de archivos]).

[tipos de archivos]: {{< relref "archivos" >}} -->


## `/media` y `/mnt`

_Media_ y _mount_ son los directorios en donde el sistema coloca los
dispositivos como USBs, _floppy disks_, discos duros externos, CDs y demás.
Las distribuciones actuales de Linux los montan automáticamente en la carpeta de
_media_.

Por lo tanto, el USB que insertes estará en
`/media/<usuario>/<nombre del dispositivo>`. Pero Si quieres montar algo
manualmente con el comando `mount`, déjalo en `/mnt/`


## `/var`

Este es el directorio _variable_, contiene carpetas y archivos dedicados a
guardar datos que suelen aumentar en tamaño, como _logs_ de sistema, _caché_ y
demás.


## `/tmp`

Este es el sitio donde las aplicaciones guardan datos temporalmente durante una
sesión. Por ejemplo, si estás escribiendo un archivo en un programa de ofimática,
es posible que el programa guarde copias de seguridad regularmente, por si
ocurre un error, se va la luz u otros inconvenientes. Luego podrás recuperar
esos datos.


## `/proc`

`proc` de _procedures_. Contiene información de todos los procesos que se están
ejecutando en el momento, que principalmente son pseudo-archivos (no son
archivos del disco realmente, el kernel los traduce a archivos). Cada uno de
estos procesos tendrá un sub-directorio con el nombre del identificador del
proceso (ID).

Paralelamente puedes encontrar información sobre el CPU (`/proc/cpuinfo`) u
otras utilidades (`/proc/uptime`).


## `/run`

Funciona en RAM, lo que significa que todo se borrará al apagar el ordenador.
Aunque diferentes distribuciones lo utilizan de formas un poco diferentes,
generalmente sirve para guardar datos al iniciar la máquina, usuarios
conectados, y deamons en ejecución.


## `/sys`

Es la carpeta para interactuar con el kernel, y es similar al directorio `/run`.


## `/svr`

Datos específicos que utilizados por servidores que se entén ejecutando en el
sistema.


# Comparación con Windows

<!-- TODO:
No hay información en ningún sitio sobre esto.
Windows se da ya por hecho, que realmente nadie sabe usarlo.
https://en.wikipedia.org/wiki/Directory_structure

Carpetas virtuales, This PC, Quick Access, Libraries

libraries = lista de lugares donde el usuario guarda archivos que las
aplicaciones pueden encontrar y mostrar los datos (... que?)
this pc = %userprofile% ?
%userprofile% = C:/Users/<usuario>
%appdata% = %userprofile%/appdata
%programdata% = C:/ProgramData
-->

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

