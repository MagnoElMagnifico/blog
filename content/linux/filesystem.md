---
title: Estructura directorios
weight: 3
date: 2022-03-19

extra:
    max_level: 5
    show_toc: true
    show_info: true
    ref_link:
        name: video de DorianDotSlash
        link: https://www.linux.com/topic/desktop/understanding-linux-links/ft
---
[1]: https://youtu.be/HbgzrKJvDRw
[2]: https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html

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

> Por cierto, esta estructura se encuentra recogida en el [FHS][2] (Filesystem
> Hierarchy Standard).

> Otra nota, no todas las distribuciones Linux siguen este patrón, pueden haber
> pequeñas variaciones. Pero por lo general, esto se cumple.

# Usuarios
## `root`
Esta es la `/home/` del usuario _root_. Puedes guardar archivos sin ningún
problema, mientras seas el usuario _root_: `sudo su`.

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

## `usr`
En versiones de Unix anteriores aquí se almacenaban las carpetas de los usuarios,
al igual que ahora sucede con `home`. Pero actualmente su uso ha disminuido a
solamente "programas que puede usar el usuario y otros datos": contiene binarios
del sistema, documentación, librerías, archivos de cabecera...

En esta carpeta se almacena la mayoría del contenido, por lo tanto es una de las
más importantes. En su interior podemos encontrar los sub-directorios
de los apartados siguientes.


### `bin`, `sbin` y `libXX`
`bin` es la forma corta de _binaries_, que quiere decir archivos binarios o
programas. Por ejemplo, podrás encontrar los ejecutables de los comandos:

- `ls`
- `cat`
- `kill`
- `ps`
- ...

Por otro lado, `sbin` también almacena programas, pero estos son mucho más
sensibles, ya que se tratan de los ejecutables del administrador
(_system admin_). Estos archivos están restringidos al super-usuario y no pueden
ser utilizados por otros.

> `path` guarda alguna de estas direcciones para saber donde buscar los
> programas del terminal. Usa `which` para conocer su carpeta concreta de un
> comando.

Finalmente; `lib`, `lib32`, `lib64` y otras variantes son directorios en los que
se almacenan las librerías de determinados programas. Estos son otros archivos
binarios que añaden funcionalidad a algunas aplicaciones.

### `local`
El motivo de hacer esta separación es el de tener otro directorio `usr` que se
pueda montar en solo lectura en algún otro lugar. Sin embargo, hoy en día, solo
se usa para guardar programas de terceros o autocompilados.

### `share`
Esta carpeta contiene archivos que se pueden compartir y archivos independientes
de la arquitectura de software: documentación, iconos, fuentes, imágenes de
fondo...

Sin embargo, no está pensada para compartir con otros sistemas operativos.
Cualquier programa o paquete que contenga o necesite datos que no tengan que
ser modificados también se pueden guardar aquí (o en `/usr/local/share`).

Algunas subcarpetas importantes:

- `/usr/share/doc`: documentación de algunos programas
- `/usr/share/man`: documentación para el programa _man_
- `/usr/share/info`: más documentación (hoy no se usa tanto)

### Otros
- `games`: archivos de juegos online

- Código fuente
    - `include`: archivos de cabecera necesarios para compilar (`.h`, `.hpp`)
    - `include/<paquete>`: archivos de cabecera de determinado programa
    - `src`: los archivos de código fuente de Linux (`/usr/src/linux`), archivos
    de cabecera, documentación (`usr/src/Documentation`) y configuración
    (`/usr/src/.config`).

# Binarios y configuración

## `bin`, `sbin` y `libXX`
Estas carpetas se conservan por algunos programas que todavía utilizan estas
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

## `opt`
Significa _opcional_. Aquí es donde se instala software manualmente e incluso
los programas que has hecho tú mismo.
<!-- TODO: Completar un poco más -->

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
manualmente con el comando `mount`, déjalo en `/mnt/`

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

# Resumen
- `/`: root, la base de todo

- Usuarios
    - `root`
    - `home`: carpetas de usuarios (atajo: `~`)
        - `.config` o otro dotfile: configuración del usuario
    - `usr`:
        - `bin`: ejecutables básicos &#8594; `ls`, `curl`
        - `sbin`: ejecutables del sistema (solo administrador)
        - `lib`: librerías compartidas &#8594; `.so`, `.a`
        - `local`: carpeta `usr` alternativa con datos no esenciales y
        programas compilados localmente, sin usar un _package manager_.
        - `share`: archivos independientes de la plataforma, datos de
        aplicationes, etc.

- Binarios y configuración
    - `bin` `sbin` `libXX` &#8594; `usr`
    - `etc`: archivos de configuración a nivel de sistema
    - `opt` (OPTional): software instalado manualmente o plugins

- Sistema
    - `boot`: archivos necesarios para iniciar el ordenador
    - `dev` (DEVice files): hardware
    - `media` y `mnt`: estructuras de ficheros externas, USBs
    - `var` (VARiable): variables del sistema operativo (logs, cache)
    - `tmp` (TeMPoral): información temporal, se borra al apagar
    - `proc`, `run` y `sys`: carpetas imaginarias, se encargan de gestionar procesos

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
    - `Roaming`: se utiliza para _networking based logins for roaming profiles_.
      Los datos se sincronizarán por red.

