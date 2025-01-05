---
title: Arranque y Proceso Hardware
description: >
    Pasos que realiza el Sistema Operativo cuando se inicia y su funcionamiento
    normal, llamado proceso hardware.
date: 2023-12-28T13:48:37+01:00
weight: 2
math: true
---

{{< todo >}}
# Pendiente
-   `initramfs` (_initial RAM file system_): carga un pequeño disco virtual
    simplificado y carga un programa de inicio simplificado.
-   Definición del disco de arranque
-   Cargador vs Boot loader vs Boot Manager \
    Carga el gestor de arranque, el más usado es GRUB2 (_Grand Unified Bootloader_)
    - GRUB mostrará diferentes opciones en la pantalla dependiendo de su configuración
    - Cargará el kernel a partir de una imagen de la memoria inicial.

{{< dropdown "Programa de arranque y Gestor de arranque" >}}
Un **programa de arranque** (_boot loader_) es aquel que carga en memoria
principal el kernel del Sistema Operativo, mientras que el **gestor de
arranque** (_boot manager_) presenta un menú con opciones de arranque u otras
alternativas para controlar el proceso.

GRUB2, el más popular utilizado junto con Linux es simultáneamente un boot
loader y boot manager, por lo que algunas veces los términos se usan de forma
indistintiva.
{{< /dropdown >}}

[TODO]: http://www.rodsbooks.com/efi-bootloaders/principles.html

[TODO]: https://en.wikipedia.org/wiki/UEFI
[TODO]: https://en.wikipedia.org/wiki/EFI_system_partition

[TODO]: https://en.wikipedia.org/wiki/Windows_Boot_Manager
[TODO]: https://en.wikipedia.org/wiki/Booting_process_of_Windows
[TODO]: https://en.wikipedia.org/wiki/GNU_GRUB
[TODO]: https://en.wikipedia.org/wiki/Booting_process_of_Linux
[TODO]: https://wiki.archlinux.org/title/Arch_boot_process

[TODO]: https://learn.microsoft.com/es-es/windows-hardware/manufacture/desktop/configure-uefigpt-based-hard-drive-partitions?view=windows-11
[TODO]: https://cifpn1.com/tic/?p=1407
{{< /todo >}}

# Arranque del sistema

{{<
    figure
    src="arranque-sistema.png"
    alt="Figura de arranque del sistema"
>}}

1.  Se inicia el reloj del sistema.

2.  Como hay que estar ejecutando instrucciones continuamente, incluso desde el
    primer tick de reloj, se debe cargar una instrucción de memoria y actualizar
    el contador del programa.

3.  Se lee de una memoria ROM que contiene el programa de arranque escrito desde
    fábrica, normalmente llamado [POST] (_Power-On Self-Test_). Este programa
    consta de chequeos del hardware (ver la memoria instalada, discos conectados...)
    e inicializaciones para verificar que todo funciona correctamente.

5.  Ya con los discos operativos, POST finalmente carga el **gestor de
    arranque** en la RAM. Esto se hace desde el **disco de arranque** configurado
    y se ejecutan sus instrucciones.

6.  Este programa es el encargado de copiar el código del kernel del Sistema
    Operativo a memoria principal y empezar a ejecutarlo. Antes de eso, algunos
    gestores de arranque como [GRUB2] muestran un menú con diferentes opciones,
    como seleccionar entre los varios SO instalados.

7.  Ahora el kernel debe continuar: montará los sistemas de archivos raíz
    ejecutando el [proceso inicial]. Por su complejidad, esto se suele realizar
    en dos pasos:

    1. `initramfs`. En la primera fase se carga en memoria principal el fichero
        de imagen de un pequeño disco virtual que contiene una **<<partición
        raíz>> virtual** y un **programa `init`**. De ahí proviene su nombre, _init
        RAM file system_.

        Este contiene el mínimo requerido por el kernel para cargar el verdadero
        sistema de archivos raíz del disco.

    2.  `init`. En la segunda fase, `initramfs` cede el control al [proceso
        inicial], el proceso de arranque estándar.

        A grandes rasgos, este incluye **módulos de controladores** (drivers)
        desdes del disco duro sin los que el sistema no puede arrancar. Estos
        normalmente son scripts de inicialización, montaje de RAIDs, inicio de
        particiones cifradas, montaje de LVM, ...

Con esto, el sistema queda arrancado. Mientras el ordenador siga encendido, este
**estará siempre en memoria**.

{{< block "`vmlinuz`" >}}
`vmlinuz` es un ejecutable que contiene el kernel de Linux. Para poder usarlo
como sistema operativo se le debe añadir una [cabecera especial], [sector boot]
y otras rutinas de _setup_.

Más información:
[wikipedia](https://en.wikipedia.org/wiki/Vmlinux),
[archwiki](https://wiki.archlinux.org/title/Kernel)

[cabecera especial]: https://en.wikipedia.org/wiki/Multiboot_Specification
[sector boot]: https://en.wikipedia.org/wiki/Bootsector
{{< /block >}}

## BIOS

{{<
    figure
    src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Legacy_BIOS_boot_process.png"
    href="https://en.wikipedia.org/wiki/BIOS"
    link="https://en.wikipedia.org/wiki/BIOS"
    alt="Figura del proceso de encendido con BIOS"
    caption="Proceso de encendido con BIOS (Wikipedia)"
>}}

En sistemas compatibles con los [IBM PC]s, la BIOS (_Basic Input/Output System_)
se trata del [firmware] encargado de ejecutar [POST]. Su función principal
actualmente es **inicializar el hardware**, probar los componentes (POST)
y **cargar el programa de arranque**, el encargado de ejecutar el kernel.
Para más detalles de cómo la BIOS encuentra este programa, consulte el artículo
sobre [archivos].

En el menú de la BIOS, accesible durante el arranque presionando alguna
combinación de teclas (depende de la marca y modelo), se pueden fijar algunas
opciones. Entre ellas, se puede especificar el medio del que leer el [MBR].
También es posible configurarla para que se lea de la red, lo que hace posible
utilizar ordenadores sin disco duro de arranque por red.

Fue desarrollado por IBM para los [IBM PC]s, y alguna compañías hicieron
ingeniería inversa con el fin de crear sistemas compatibles. La interfaz
original, debido a su gran popularidad en la época, sirve de estándar de facto.

Originalmente, la BIOS se almacenada en una memoria **ROM** escrita de fábrica.
Con el fin de poder actualizar el [firmware], ahora se suelen utilizar
**memorias flash**. Nótese que estas actualizaciones son cruciales, dado que si
falla dejando la memoria corrupta, no se podrá encender el sistema ([brick]). La
configuración se guarda en una memoria no volátil (CMOS).

A mayores, la BIOS dispone procedimientos (BIOS system calls) para leer el
teclado, escribir en la pantalla (texto o gráficos) y realizar operaciones
básicas de E/S como por ejemplo acceder al disco. Sin embargo, estas
operaciones suelen ser muy lentas y los SO prefieren reimplementarlas.

Otras funciones de la BIOS puede ser proveer la identificación del dispositivo
del _Original Equipment Manufacturer_ (OEM) y realizar overclocking.

Fuente: [BIOS](https://en.wikipedia.org/wiki/BIOS), Wikipedia (04-02-2024 23:00)

## UEFI

{{< dropdown "Cómo saber si tu sistema usa UEFI" >}}
En Linux puede ejecutar el siguiente comando.
```sh {linenos=false}
[ -d /sys/firmware/efi ] && echo UEFI || echo BIOS
```

En Windows supongo que lo pondrá por algún menú de la configuración, quien sabe.
{{< /dropdown >}}

_Extensible Firmware Interface_ (EFI) es una nueva variante diseñada para
reemplazar BIOS, que se sitúa entre el firmware y el SO. Unified EFI_ (UEFI) es
esencialmente EFI 2.x.

{{<
    figure
    src="http://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Efi-simple.svg/316px-Efi-simple.svg.png"
    height="300"
>}}

_Secure Boot_ es una característica de EFI que intenta mejorar la seguridad
asegurándose de que todos los _boot loaders_ están firmados con una clave
criptográfica. Para más información, puedes consultar la [página de Rod Smith]
(tiene una [lista] de artículos sobre EFI en Linux) sobre [Dealing with Secure
Boot] y [Controlling Secure Boot].

La especificación EFI incluye una descripción de una nueva tabla de particiones:
la **GUID Partition Table** (GPT) (más información en [Wikipedia GPT]), que
aunque sistemas EFI puedan iniciarse usando particiones MBR, por lo general será
mejor que se particione usando GPT directamente.

Para ver qué tipo de tabla de particiones se está usando, puede usar el
siguiente comando:

```sh {linenos=false}
sudo parted --list
```

EFI requiere una partición especial conocida como la **EFI System Partition**
(**ESP**), que debe usar un sistema de archivos **FAT32** y tiene un ID `0xEF`
si se usa MRB o `C12A7328-F81F-11D2-BA4B-00A0C93EC93B` (a veces representado
como `EF00`) en GPT. Sobre el tamaño no hay un consenso, pero pueden haber
problemas si es menor de 512 MiB.

La ESP contiene los drivers EFI, aplicaciones EFI, scripts EFI y programas de
arranque EFI, entre otros. **Cada programa de arranque tiene su propio
subdirectorio**: `EFI/ubuntu` o `EFI/redhat`, pero hay que tener en cuenta que
esta partición se suele montar en `/boot/efi`, por lo que son
`/boot/efi/EFI/ubuntu` y `/boot/efi/EFI/redhat` respectivamente. En caso de que
no exista ningún programa de arranque, **se usará el almacenado en `EFI/BOOT`**.

Estos directorios contienen un **archivo de arranque EFI** de extensión `.efi`,
otros archivos de configuración relevantes, kernels de Linux, [archivos de RAM
iniciales]... Depende de cada programa.

A la hora de arrancar, EFI ejecuta el gestor de arranque y almacena en memoria
principal una lista ordenada de los boot loaders a utilizar. Los va probando en
orden iterativamente hasta que uno no regrese/`return` (los anteriores pudieron
volver por algún error). Algunos vendedores disponen de una tecla (como `F12`)
para acceder a este menú por defecto, pero es posible que sea necesario
activarlo desde la configuración.

Este boot loader es el encargado de cargar el Sistema Operativo (en el caso de
[bootmgr] de Windows), o a su vez, puede mostrar más menús para más opciones
(Linux).

Es decir, cuando se instala un SO, es necesario añadir el boot loader a la
partición ESP y además añadir su correspondiente entrada en el boot manager de
EFI.

Además de todo esto, los sistemas EFI modernos incluyen un **BIOS Compatibility
Mode** (CSM) que les permite arrancar usando la BIOS como se ha descrito
anteriormente. Esto tiene el potencial de añadir muchas complicaciones, así que
no se recomienda activar.

# Proceso Hardware

{{<
  figure
  src="proceso-hardware.png"
  alt="Figura del Proceso Hardware"
>}}

Tras completar el proceso de arranque y de haber cargado el kernel en memoria,
se debe de escoger qué tarea ejecutar a continuación. De esto se encarga el
**Gestor de Procesos**.

En el caso de la figura solo se dispone de un core para ejecutar las tareas
$P_1, P_2, \ldots, P_n$. Si hubiesen más cores, también se tendría que decidir
qué hace cada uno, y en la figura se representaría por líneas paralelas, dado
que se ejecutan simultáneamente.

Las aplicaciones del usuario (e.g.: un navegador) puede generar cada una muchas
de estas tareas, pero hay otras que también se ejecutan, llamadas **demonios**
(_daemons_). Siempre tiene que existir una tarea a ejecutar, dado que la CPU
siempre debe estar ejecutando instrucciones. Por eso, existe la tarea
_**idle**_, que simplemente ejecuta _noop_ (no hacer nada) continuamente. Debe
ser una intrucción que consuma poco. Esta tarea es la última elegible por el
Gestor de Procesos.

Como se puede ver en la figura, se cambia de tarea constantemente, por ejemplo
cuando hay una operación de Entrada/Salida. Se vuelve al gestor de procesos para
decidir qué ejecutar a continuación, porque la tarea anterior está
**bloqueada**, dado que necesita que se termine la operación de Entrada/Salida.

Por otro lado, las **interrupciones** son avisos que vienen de fuera, de
dispositivos de Entrada/Salida: teclado, ratón, disco duro... El SO interrumpe
la ejecución actual y salta al **gestor de interrupciones** para determinar su
causa y cómo resolverla. Dicha interrupción podría ser que el usuario termina el
`scanf` de otra tarea. Después de la interrución, es necesario llamar al gestor
de procesos para decidir quién continua, puede ser la misma tarea de antes
o otra distinta.

Resumiendo:

 1. Se completa el Arranque del Sistema.
 2. Se carga el Sistema Operativo en memoria principal.
 3. Se llama al Gestos de Procesos para decidir qué tarea ejecutar.
 4. Se decide ejecutar $P_1$.
 5. Después de un rato, $P_1$ solicita una operación de Entrada/Salida que lo
    bloquea.
 6. Se vuelve al planificador y se escoge otra tarea.
 8. Después de repetir el proceso un par de veces, mientras se ejecuta la tarea
    $P_n$, se recibe una interrupción.
 9. Se llama al gestor de interrupciones para descubrir la causa.
10. Se vuelve al planificador, que selecciona la tarea $P_2$. Por lo visto, la
    operación Entrada/Salida que había solicitado, ya está completada.
11. ...

Este es el funcionamiento normal del Sistema Operativo.

<!-- TODO: mover a servicios -->
# `systemd`

[`systemd`] es el sistema de inicio más utilizado en las distribuciones de Linux.
Actúa a modo del proceso `init`.

-   Se encarga de ejecutar los procesos encargados de la creación del sistema:
    teclado, controladores, sistemas de ficheros, red, servicios, etc. \
    {{< arrow >}} Ofrece una visión global del sistema, tanto software como
    hardware.

-   Muchos de estos procesos ofrecen servicios:

    - Networking ([NetworkManager])
    - Sistema de impresión ([CUPS])
    - [SSH]
    - Gestores gráficos: entorno de escritorio (_Desktop Manager_) o gestor de ventanas (_Window Environment_).
    - Gestor de Volúmenes Lógicos (LVM)
    - ...

    El arranque de estos servicios se realiza en paralelo para que sea más
    rápido.

Proporciona varias utilidades para que los administradores controlen los
servicios.

    systemctl status   Muestra el estado del servicio
    systemctl start    Inicia el servicio
    systemctl stop     Detiene el servicio
    systemctl restart  Reinicia el servicio
    systemctl enable   Configura el servicio para que se ejecute al inicio
    systemctl disable  El servicio no se iniciará durante el arranque

Además, distingue varios _targets_. Estos son grupos de servicios que se pueden
arrancar todos conjuntamente, para así personalizar cuáles se inician
dependiendo de lo que quiera hacer el administrador.

-   Rescate (`rescue.target`): conjunto de servicios mínimos necesarios para
    reparar el sistema.
-   Emergencia (`emergency.target`): abre un único shell monousuario en modo
    administrador
-   Multiusuario (`multi-user.target`): multiusuario no gráfico
-   Gráfico (`graphical.target`)


[POST]:           https://en.wikipedia.org/wiki/Power-on_self-test
[IBM PC]:         https://en.wikipedia.org/wiki/IBM_Personal_Computer
[firmware]:       https://en.wikipedia.org/wiki/Firmware
[brick]:          https://en.wikipedia.org/wiki/Brick_(electronics)
[GRUB2]:          https://en.wikipedia.org/wiki/GNU_GRUB
[NetworkManager]: https://wiki.archlinux.org/title/NetworkManager
[CUPS]:           https://wiki.archlinux.org/title/CUPS
[SSH]:            https://wiki.archlinux.org/title/OpenSSH

[página de Rod Smith]:       http://www.rodsbooks.com
[lista]:                     http://www.rodsbooks.com/efi-bootloaders/index.html
[Dealing with Secure Boot]:  http://www.rodsbooks.com/efi-bootloaders/secureboot.html
[Controlling Secure Boot]:   http://www.rodsbooks.com/efi-bootloaders/controlling-sb.html
[Wikipedia GPT]:             https://en.wikipedia.org/wiki/GUID_Partition_Table
[archivos de RAM iniciales]: https://en.wikipedia.org/wiki/Initial_ramdisk
[bootmgr]:                   https://en.wikipedia.org/wiki/Windows_Boot_Manager
[`systemd`]:                 https://es.wikipedia.org/wiki/Systemd

[archivos]:        {{< ref "so/archivos#partición" >}}
[proceso]:         {{< ref "so/procesos" >}}
[proceso inicial]: {{< ref "so/procesos/#block-proceso-inicial" >}}
[MBR]:             {{< ref "so/archivos/#block-master-boot-record" >}}
