---
title: Instalación de Software
description: >
    Post sobre las diferentes formas de instalación de Software en Linux,
    incluyendo gestores de paquetes y la compilación desde el código fuente.
date: 2025-01-04T20:11:28+01:00
weight: 3
draft: true
---

# Formas de instalación

En Linux hay varias formas de instalar software:

-   Instalación de paquetes precompilados (menos optimización, más sencillo)
-   Compilación e instalación desde código fuente (optimización para nuestro
    sistema, más complejo)

# Gestores de paquetes

En la mayoría de distribuciones, es posible obtener los paquetes precompilados
desde unos **repositorios** (servidores de archivos que normalmente pertenecen
a la distribución).

{{< keyvalue key-header=true >}}
-% Ventajas:%
- Fáciles de instalar
- Fáciles de actualizar (más que en Windows)
- Fácil de controlar los programas instalados (más que en Windows)

-% Desventajas:%
-   Binarios menos optimizados: como no han sido compilados para nuestro
    hardware, es posible que no se aproveche bien. Esto se debe a que se compiló
    en otro equipo bajo otras condiciones.
-   Problemas de dependencias de paquetes.
-   Problemas si la base de datos de paquetes se corrompe.
{{< /keyvalue >}}

Estos paquetes se distribuyen en formatos concretos. Algunos de los más
populares:

- `.deb`: para distribuciones basadas en Debian (Ubuntu, Mint, etc)
- `.rpm`: para distribuciones basadas en RedHat (Fedora...)

Se puede utilizar la herramienta `alien` para convertir de otros formatos
a `.deb`.

{{< dropdown "Convención del nombre de los paquetes" >}}
```
<paquete>_<version>_<build>_<arquitectura>.deb
```
- Paquete: nombre de la aplicación.
- Versión: número de versión de la aplicación.
- Build: número de <<compilación>> (subversión).
- Arquitectura: plataforma para la que está compilado.

Ejemplos:

- `ethereal_0.10.11-1_i386.deb`
- `libgtk-3-0_3.18.9-1_amd64.deb`
{{< /dropdown >}}

## Debian

En Debian hay dos herramientas estándar para manejar los paquetes de software:

-   `dpkg`: herramienta de bajo nivel para gestionar directamente los paquetes
    `.deb`
-   `apt`: herramientas APT que permiten gestionar los paquetes descargándolos
    de varias fuentes.

También existen otras herramientas gráficas a modo de _tienda_.

{{< block "Opciones de `dpkg`" >}}

    dpkg -i / --install   Instalación del paquete
    dpkg -r / --remove    Eliminación del paquete
    dpkg -P / --purge     Eliminación completa del paquete (configuración)
    dpkg -s / --status    Muestra el estado del paquete
    dpkg -l / --list      Lista los paquetes instalados
    dpkg -L / --listfiles Muestra el contenido de un paquete
    dpkg -S / --search    Busca el paquete al que pertenece un archivo

    dpkg-reconfigure      Reconfigura un paquete

`--install` es la única opción a la que se le necesita pasar el nombre del
archivo del paquete completo (`nombre_version_arch.deb`), al resto basta con el
nombre del paquete.
{{< /block >}}

{{< block "Opciones de `apt`" >}}
APT es un sistema de gestión de paquetes creado por el proyecto Debian que
simplifica la instalación de programas.

- Contacta con el servidor
- Comprueba las dependencias necesarias
- Pregunta al usuario si continuar
- Instala el paquete

### Comandos

- `apt-get`: realiza modificaciones en la base de datos.
- `apt-cache`: aporta únicamente información.
- `apt`: interfaz moderna que combina las funcionalidades anteriores.

Las opciones más habituales son:

    apt-get update       Actualiza la lista de paquetes (sincronizar con el server)
    apt-get updrade      Actualiza los paquetes
    apt-get install      Instala un paquete
    apt-get dist-upgrade Actualiza la versión de la distribución
                         Borra o instala nuevos paquetes si es necesario
    apt-get remove       Elimina un paquete
    apt-get purge        Elimina un paquete incluyendo la configuración
    apt-get autoremove   Elimina paquetes que no hacen falta (dependencias)
    apt-get clean        Borra la caché y descargas
    apt-get source       Descarga un archivo fuente
            --compile    Compila el paquete a .deb
    apt-get build-dep    Descarga las dependencias de compilación
    ---------------------------------------------------------------------------
    apt-cache search     Busca paquetes para instalar
    apt-cache show       Muestra información de un paquete
    apt-cache depends    Lista las dependencias del paquete
    apt-cache policy     Muestra fuentes y prioridades
    ---------------------------------------------------------------------------
    apt-get -f/--fix-broken install  Corrige errores de dependencias

### Bloqueo

Solo se puede usar un comando de `apt-get` a la vez para evitar posibles errores
de inconsistencia. El archivo `/var/lib/dpkg/lock` funciona a modo de cerrojo.

Cuando sucede un error con `apt` es posible que no libere el lock y luego no
puedas volver a usarlo. Llega con eliminar el lock para arreglar el problema.

> Puede configurarse que se realicen actualizaciones de forma automática, que
> también crea el lock. Es posible que esté bloqueado por eso.

### Archivos de configuración

`/etc/apt/sources.list` es el archivo de configuración que contiene los
distintos servidores desde los que se obtienen los paquetes.

```
deb     <URL> {stable|testing|unstable} <componentes>  # Ejecutables
deb-src <URL> {stable|testing|unstable} <componentes>  # Código fuente
```

- `stable` o el _code name_ de la versión de la distro: versión recomendada
- `testing`: versiones más recientes pero no probados exhaustivamente
- `unstable`: versión en desarrollo, con errores sin corregir

Y componentes puede ser:

-   `main`: conjunto principal dados por el personal de la distribución, más
    fiables.
-   `contrib`: paquetes adicionales dados por la comunidad, menos fiables.
-   `non-free`: paquetes con licencias comerciales

El resto de la configuración se puede poner en el archivo `/etc/apt/apt.conf`
o separado en varios archivos dentro del directorio `/etc/apt/apt.conf.d/*`.
{{< /block >}}

{{< todo >}}
## Fedora
- rpm
- yum
- dnf
## Arch
- pacman
{{< /todo >}}

## Snap

Los _snaps_ son **paquetes autocontenidos** que funcionan en una amplia gama de
distribuciones. Incluyen todas las dependencias que necesitan, lo que permite
que funcionen de forma independiente de las ya instaladas. Como desventaja, esto
introduce mucha **redundancia**.

Las programas _snap_ se **ejecutan en contenedores aislados** con acceso
limitado al sistema. El usuario puede configurar varios niveles de permisos de
forma similar que en sistemas Android. Este enfoque aumenta la seguridad pero
tiene la desventaja de que las aplicaciones son algo más lentas al arrancar.

Se desarrollaron por Ubuntu.

<!-- TODO: expandir -->
## Flatpak

Modelo similar a los _snaps_, pero desarrollado por Fedora y RedHat.

## Otras herramientas

- `pip`: instalación de librerías Python.
- `cargo`: instalación de programas escritos en Rust.

# Instalación desde código fuente

1.  Descargar el código fuente.
2.  Descomprimir el archivo (ver [Tarballs](#tarballs) o [Zip](#zip)).
3.  Leer el archivo `INSTALL` por si hubiese instrucciones de instalación.
4.  Configuración del _build system_.

    Si se usó `autoconf`, ejecutar el script `./configure` que se encarga de:

    - Chequear el entorno de compilación
    - Chequear las librerías necesarias
    - Generar los `Makefiles` de compilación e instalación

    Se le puede especificar el directorio de instalación:
    `./configure --prefix=dir`. Por defecto, instalará localmente
    (`/usr/local`).

5.  Compilación: el estándar en Linux es `make`
6.  Instalación: se puede utilizar el mismo `Makefile`: `make install`
7.  Opcionalmente, se pueden limpiar los archivos de compilación: `make clean`

En resumen, el proceso estándar es:

```sh
wget https://servidor.com/software/paquete_version.tar.gz
tar xzvf paquete_version.tar.gz
cd paquete_version
./configure
make
make install
```

<!-- TODO: mover a otro sitio, prob lenguajes/c-cpp -->
## Tipos de ejecutables

-   Estáticamente enlazados: contienen todo el código que necesitan para
    ejecutarse.
-   Dinámicamente enlazados: necesitan de librerías instaladas en el sistema.

El comando `file` indica si un ejecutable fue enlazados dinámicamente
o estáticamente.

{{< keyvalue title="Uso de librerías dinámicas" key-header=true >}}
-% Ventajas :%
- Los ejecutables ocupan menos espacio
- Se reutiliza el código de las librerías y no se repiten

-% Desventajas :%
- Fuente de errores: no se encuentra la librería, versiones incompatibles, etc.
- El compilador puede optimizar mejor dado que tiene presente todo el código.
- Los ejecutables funcionan independientemente del contexto del sistema.
{{< /keyvalue >}}

El comando `ldd` permite ver las librerías en las que depende un ejecutable
y dónde localizarlas.

Cuando una librería no se encuentra (`Not found`) puede ser por 2 motivos:

-   No se encuentra en una localización estándar. Se le debe indicar al linker
    (`LD_LIBRARY_PATH`) dónde encontrarla.
-   La librería tiene una versión diferente. Una posible solución es crear un
    enlace simbólico con `ln` a otra versión. No siempre funciona.

# Archivos comprimidos
## Tarballs

La herramienta `tar` empaqueta archivos y directorios en solo uno, llamados
**tarballs**.

- `.tar`: tarball empaquetado pero sin comprimir
- `.tar.gz` o `.tgz`: tarball comprimido con _gzip_
- `.tar.bz2` o `.tbz`: tarball comprimido con _bzip2_
- Y muchos otros formatos

El formato del comando es:

```sh {linenos=false}
tar <operacion> <opciones> <archivo tar> <contenidos...>
```

Operaciones:

-   `-c` / `--create`: se puede especificar el algoritmo de compresión
    - _gzip_: `-z`
    - _bzip2_: `-j`
-   `-x` / `--extract`: se pueden especificar archivos (para no extraer todos)
-   `-t` / `--list`: si se combina con `-v`, muestra dueño del archivo,
    permisos...
-   `-r` / `--append`
-   `--delete`

Opciones:

- `-f`: nombre del archivo tar
- `-v` / `--verbose`
- `-C` / `--directory`: directorio de extracción

## Zip

Se utiliza el comando `zip` para crear archivos `.zip` y el comando `unzip`
para descomprimir. Su uso es más intuitivo que el de `tar`.

```bash
zip <nombre zip> <contenidos>
```

Con `unzip` se pueden ver sus contenidos:

- `-l`: lista los archivos
- `-p`: imprime los archivos
