---
title: Módulos del Kernel y Servicios
#description: TODO
date: 2025-01-09T21:51:49+01:00
weight: 6
---

{{< block "Nota" >}}
Se recomienda leer el artículo sobre el [arranque del sistema]({{< ref "so/arranque" >}})
{{< /block >}}

# Módulos del kernel

<!-- TODO: expandir -->
{{< block "Módulos del Kernel" "var(--magno-blue)" >}}
Los módulos del kernel son fragmentos de código que se pueden cargar y eliminar
del Sistema Operativo bajo demanda. Muchos de ellos funcionan como controladores
de dispositivos (en Windows se les llaman _drivers_).

En Linux se suelen almacenar en `/usr/lib/kernel/*` bajo la extensión `.ko`.
{{< /block >}}

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
omitir al arranque, para así personalizar cuáles se inician dependiendo de lo
que quiera hacer el administrador.

-   Rescate (`rescue.target`): conjunto de servicios mínimos necesarios para
    reparar el sistema.
-   Emergencia (`emergency.target`): abre un único shell monousuario en modo
    administrador
-   Multiusuario (`multi-user.target`): multiusuario no gráfico
-   Gráfico (`graphical.target`)

{{< todo >}}
# Creación de un nuevo servicio de `systemd`

Respondiendo a la pregunta que me hicieron hoy en clase, en la siguiente página
vienen unas simples instrucciones para la creación de un nuevo servicio de
systemd programado por uno mismo:

https://www.shubhamdipt.com/blog/how-to-create-a-systemd-service-in-linux/

Vamos a probar a hacer un servicio de eco de sockets usando los simples
programas server.c y client.c (similares a los programados en la materia de
redes) disponibles en:

https://mohsensy.github.io/programming/2019/09/25/echo-server-and-client-using-sockets-in-c.html

El procedimiento es el siguiente:

1) Vamos al directorio /root y compilamos el programa server.c. Necesitaremos el
compilador de C que podemos instalar con:

apt-get install gcc binutils

Entonces con gcc server.c obtenemos el ejecutable /root/a.out.

2) Vamos al directorio de configuración de systemd y creamos aquí el servicio
"mieco":

cd /etc/systemd/system

para ello creamos aqui el fichero mieco.service con contenido:

```toml
[Unit]
Description=description about this service

[Service]
User=root
WorkingDirectory=/root
ExecStart=/root/a.out
# optional items below
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

3) actualizamos systemd y activamos el servicio

```sh
systemctl daemon-reload
systemctl start mieco
systemctl enable mieco
systemctl status mieco
```

tiene que salir:

```
systemctl status mieco
* mieco.service - description about this service
     Loaded: loaded (/etc/systemd/system/mieco.service; enabled; preset: enabled)
     Active: active (running) since Thu 2024-09-19 11:14:53 CEST; 17min ago
   Main PID: 2115 (a.out)
      Tasks: 1 (limit: 1098)
     Memory: 176.0K
        CPU: 954us
     CGroup: /system.slice/mieco.service
             /root/a.out
```

4) probamos el servicio

como usuario compilamos client.c con gcc client.c -o b.out y ejecutamos ./b.out.
El servicio nos da la respuesta:

```sh
./b.out
Received hello server from server
```
{{< /todo >}}

[`systemd`]:      https://en.wikipedia.org/wiki/Systemd
[NetworkManager]: https://wiki.archlinux.org/title/NetworkManager
[CUPS]:           https://wiki.archlinux.org/title/CUPS
[SSH]:            https://wiki.archlinux.org/title/OpenSSH
