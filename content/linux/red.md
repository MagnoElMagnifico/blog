---
title: Redes de área local
description: >
    TODO
date: 2025-01-10T11:59:03+01:00
weight: 9
draft: true
---

<!-- TODO: mejorar el formateado de esto -->

- Linux soporta muchos protocolos como TCP/IP, IPX/SPC, PPP, ...
- Soporta hardware Ethernet, Wi-Fi, MPLS, ...
- Es posible que sea necesario añadir [módulos del kernel] para cada dispositivo



# Interfaces

<!-- TODO: mejorar esta explicación -->
Una interfaz es una abstracción del sistema operativo que representa una
tarjeta de red. Dicha tarjeta es un dispositivo hardware que conecta el
ordenador a una red ya sea inalámbrica o por cable.

Existe una interfaz especial que no está asociada con ninguna tarjeta de red,
_loopback_ (`lo`). Se utiliza para pruebas, dado que simula cualquier otra
interfaz, únicamente para el propio equipo. Funciona como un circuito cerrado en
el que cualquier datagrama pasado se devuelve inmediatamente a la capa de red
del sistema.

En Linux, cada interfaz se representa como un _device file_ (pseudo-archivo), al
igual que los discos. Antes tenían nombres genéricos según el orden de su
detección:

- `ethx` para Ethernet
- `wlanx` para Wi-Fi
- `pppx` para PPP

Pero actualmente son  nombres asociados al hardware, firmware, MAC, etc. Por
ejemplo, `enp3s0` Ethernet Network, bus PCI 3, slot 0.


# Configuración

Durante el proceso de arranque, la red se inicia del siguiente modo:

- El [servicio] de `networking` se inicia por `systemctl`
- Se lee el archivo `/etc/network/interfaces`
- Se lee el archivo de configuración del DNS `/etc/resolv.conf`

En algunas distribuciones y entornos, también es posible configurar la red en
Linux utilizando herramientas gráficas o de terminal (`NetworkManager` sustituye
al servicio `networking`).

{{< keyvalue title="Archivos de configuración de red" key-header=true >}}
-% `/etc/network/interfaces` :%
```
# Configuración estática
auto eth0
    iface eht0 inet static
    network 192.168.1.0
    netmask 255.255.255.0
    address 192.168.1.79
    broadcast 192.168.1.255
    gateway 192.168.1.1    # Enviar tráfico desconocido

# Configurar dinámicamente con DHCP
auto eth1
    iface eth1 inet dhcp
```

-% `/etc/resolv.conf` :%
Configuración del DNS.

```
# Al buscar por hostname sin dominio, les añade estos.
search dominio.es subdominio.dominio.es

# Servidores DNS
# Si se usa DHCP, los aportará el servidos DHCP
nameserver 8.8.8.8  # DNS de Google
```

-% `/etc/hosts` :%
Asociación de nombres de host con IPs, como un DNS interno de alta velocidad.
```
127.0.0.1  localhost                      # Obligatorio
mi ip...   hostname.dominio.es  hostname  # Obligatorio
ip...      server.dominio.es    server
```

-% `/etc/hosts` :%
Nombre de la máquina en la red. El nombre también debe aparecer en `/etc/hosts`
enlazado con `127.0.0.1`.

-% `/proc/sys/net/ipv4/ip_forward` :%
Permite el enrutado entre interfaces, haciendo que el kernel funcione como un
router. Esencialmente conecta varias interfaces para que entren por una y salgan
por otra.

- `=0` entrada y salida individual (mejor seguridad para escritorio)
- `=1` interfaces conectadas entre sí (indispensable para routers)

Para activar temporalmente (se borra al reiniciar): `echo 1 > /proc/sys/net/ipv4/ip_forward`. \
Para que sea permanente, en `/etc/sysctl.conf`: `net.ipv4.ip_forward=1`.

-% `/etc/dhcp/dhcp.conf` :%
Configuración del servidor DHCP.
{{< /keyvalue >}}

# Comandos
## Modificar la red

    ifconfig Configuración de la interfaz de red
        Asignar IP: ifconfig eth0 IP netmask MACK broadcast IP up
        Sniffer: ifconfig eth0 promisc
        Cambiar MAC: ifconfig hw ether MAC

        ifconfig [-a]          Lista todas las interfaces
        ifconfig intf          Muestra información de una interfaz
        ifconfig intf up/down  Activa desactiva una interfaz
        ifconfig intf IP       Asigna una IP
            netmask MASK
            broadcast IP
            up

        Salida:
        UP         Interfaz activada
        BROADCAST  Soporta broadcast
        MULTICAST  Soporta multicast
        MTU        Tamaño máximo de trama
        Metric     Cuantas interfaces tiene que atravesar
        RX         Bytes enviados
        TX         Bytes recibidos

    ifup intf    == ifconfig intf up
    ifdown intf  == ifconfig intf down
    iwconfig intf   Configuración de una red wireless

    route
        Mostrar tabla de rutas
        Si no hay gateway: es una red local

        Añadir red individual para redirigir mensajes
        route add
            -net IP
            netmask MASK
            gw GATEWAY
        La IP para internet es default, que irá para el gateway a internet

        Pasarela no es mi máquina: son otras que reenvian.
        No le puedo poner la misma IP que mi máquina.
        Deben estar en redes locales, directamente conectadas

        FLAGS
        U  Ruta destino está accesible (UP)
        H  El destino es una estación (HOST). Si no está presente, asumir que es una red
        G  Usa una pasarela (GATEWAY). Si no está presente, es directamente conectado.

    netstat     Lista de sockets abiertos
    netstat     Conexiones activas: netstat + puertos activos + protocolo (si es conocido) + estado
    netstat -s  Números de paquetes recibidos/enviados + protocolo
    netstat -r  == route

    ip  Comando genérico más moderno, con más opciones.
        Hace lo mismo que ipconfig, netstat y route

    ip link set up dev eth0
    ip link show

    ip address add IP/XX broadcast MASK dev eth0
    ip address del IP/XX broadcast MASK dev eth0

    ip route add IP/XX via GW broadcast MASK dev eth0

## Pruebas de red

    hostname       Muestra el nombre de la máquina en la red
    dnsdomainname  Muestra el nombre del dominio de la máquina

    ping IP/URL
        Comprobar conexión con ICMP (envía ECHO_REQUEST).
        Muchos firewalls o routers bloquean el tráfico ICMP dado que esto
        permite el descubrimiento de ordenadores

    traceroute
        Igual que ping, pero añade los routers intermedios.

        Esto se consigue con diferentes paquetes UDP con diferentes TTLs (de
        1 a 255 maximo). Cuando el paquete llega a TTL=0, el protocolo dicta que
        hay que informar al emisor que se ha destruido

    dig   Muestra más detalladamente los mensajes DNS
    host  Mensajes DNS
        host URL   Y obtiene IP
        host IP    Y obtiene URL

        Puede tener varios para distribuir el tráfico

    arp    Muestra la tabla ARP y permite modificarla

## Otros

    dhclient        Realizar petición DHCP
    dhclient intf   Fuerza la configuración DHCP en la interfaz

[servicio]: {{< ref "linux/servicios" >}}
[módulos del kernel]: {{< ref "linux/servicios" >}}
