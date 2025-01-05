---
title: Servicios
description: TODO
date: TODO
weight: -1
draft: true
---

{{< block "Nota" >}}
Se recomienda leer el artículo sobre el [arranque del sistema]({{< ref "so/arranque" >}})
{{< /block >}}

# Tipos de servicios

Listas de servicios:

- Rescate (`rescue.target`): conjunto de servicios mínimos necesarios para
reparar el sistema.
- Emergencia (`emergency.target`): abre un único shell monousuario en modo administrador
- Multiusuario (`multi-user.target`): multiusuario no gráfico
- Gráfico (`graphical.target`)

A la hora de arrancar, desde el menú de GRUB, se puede seleccionar cual
utilizar.

# Uso de `systemd`

Dichos servicios se pueden controlar con los comandos:

```sh
systemctl <action> <service-name>
# o bien con el comando
service
```

Siendo acción:

- `status`
- `start`
- `stop`
- `restart`
- `enable`/`disable`: configuran el servicio para arrancarse con el sistema


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
