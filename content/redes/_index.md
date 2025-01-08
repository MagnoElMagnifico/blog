---
title: Redes y Computación Distribuida
---

{{< todo >}}
**What is a cloud platform?** A cloud platform refers to the operating system
and hardware of a server in an Internet-based data center. It allows software
and hardware products to co-exist remotely and at scale.

**So, how do cloud platforms work?** Enterprises rent access to compute
services, such as servers, databases, storage, analytics, networking, software,
and intelligence. Therefore, the enterprises don’t have to set up and own data
centers or computing infrastructure. They simply pay for what they use.

**Types of Cloud Platforms**
There are several types of cloud platforms. Not a single one works for everyone.
There are several models, types, and services available to help meet the varying
needs of users. They include:

- **Public Cloud**: Public cloud platforms are third-party providers that
  deliver computing resources over the Internet. Examples include Amazon Web
  Services (AWS), Google Cloud Platform, Alibaba, Microsoft Azure, and IBM
  Bluemix.
- **Private Cloud**: A private cloud platform is exclusive to a single
  organization. It’s usually in an on-site data center or hosted by a third-party
  service provider.
- **Hybrid Cloud**: This is a combination of public and private cloud platforms.
  Data and applications move seamlessly between the two. This gives the
  organization greater flexibility and helps optimize infrastructure, security,
  and compliance.

Los cables tienen tambien un conector (RG45?). Estos tienen unos pines q se
conectan con las parejas, cada une recibe (RX) o transmite (TX): (ordenador RX:1
TX:2 / switch TX:1 RX:2 >> Straight through //// ordenador RX:2 TX:1 / otro
ordenador RX:2 TX:1 /1-2/2-1 >> Crossover). Para evitar estos cambios existe el
Auto MDI-X, q hace los cambios automaticamente.

1000BASE-T usa todas las parejas tanto para recibir y enviar (Full Duplex, Half
Duplex si hay una pausa antes de volver a enviar por la misma pareja, solo
pueden enviar o recibir, no las dos a la vez) (requiere cat5e). 1000BASE-TX usa
dos pares para recibir y dos para enviar (requiere cat6) (requieren Auto MDI-X)

Los cables de fibra se pueden doblar hasta cierto punto, donde ya se pierde la
señal.

Single core: tenemos solo una linea, funcionan en Half Duplex
Dual core: tenemos dos lineas, Full Duplex

Single Mode Fibre (SMF): Laser >2km caro
Multi Mode Fibre (MMF): LED 500m barato

Los conectores q usan son LC y SC

----

# Qué es una Red?

Una red es un conjunto de dispositivos conectados entre sí para poder enviarse
datos.

Las conexiones se realizan mediante cables a un _Switch_ o de forma inalámbrica
a un _Punto de Acceso_, como el Wifi.

Sin embargo, debido a la variedad de dispositivos que pueden estar conectados,
se debe establecer un _lenguaje_ común para que se puedan entender entre sí.
Esto implica utilizar un protocolo, que describe como los datos se envian, reciben,
organizan y manejan.

# Tipos de redes

Podemos llamar a los dispositivos conectados en la red nodos.

Estos pueden ayudar a controlar la red, como los Switches y Routers, y otros son
los _End-Points_ (consumidores) / _Hosts_, que reciben y envian los datos.

Por tamaño:

- Red pequeña (**SOHO**, Small Office, Home Office): par de ordenadores, impresora,
  móviles, etc. El Switch, Router, punto de acceso y otros suelen estar
  integrados en un mismo dispositivo. <!-- TODO: Modem? -->
- **Enterprise Network**: Redes grandes que pueden ocupar varios edificios, no
  necesariamente cerca (e.g.: Banco).
- **Service Provider Network**: las que proveen de internet y servicios

Por proximidad:

- Red **LAN** (Local Area Network): formada por sus elementos en un area determinada.
- Red **WAN** (Wide Area Network): puede ser como la de un banco, con sus sedes
  internacionales conectadas entre sí.

# Conectando dispositivos

|                 | Coste   | Distancia   | Señales      | ¿Afecta el medio?  |
|-----------------|---------|-------------|--------------|--------------------|
| Cobre           | Barato  | Corta       | Electricidad | Sí                 |
| Fibra (cristal) | Caro    | Larga       | Luz          | No                 |

Los cables envian información mediante bits, pero hay que desco

# Ethernet

Las redes WAN usan un conjunto de protocolos llamados Ethernet. Este está
formado por muchas partes:

- Parte física: describe cómo es cableado y las velocidades a la que van os datos.
- **Media Access Control**: cómo los datos están formateados y cómo se deben enviar.

De esta forma, dispositivos con diferentes cables y velocidades todavía se
pueden comunicar.

Esto fue diseñado por IEEE (como muchos otros estándars). Cada uno tiene un
código para identificarlos, a su vez con un nombre más sencillo de recordar:

- `802`: Tecnologías LAN
- `802.3`: Ethernet
    - `802.3i`: 10Mbps
    - `802.3u`: 100Mbps
    - `802.3ab`: 1Gbps
    - `802.3an`: 10Gbps : `10GBASE-T` (`10G` es la velocidad, 10Gbps; `BASE` se
    refiere a _Baseband_, cables; y `T` es el tipo de cable _UTP_)

Puedes encontrar toda la lista en la página de la Wikipedia de [IEE 802.3].

Los cables se envian informacion mediante bits, pero hay q descodificarlo
(Encoding Scheme). Para enviar estas señales se necesita un circuito. Los cables
q lo forman pueden ser UTP: Unshielded Twisted (4 parejas de cables, como unas
interfieren con las otras, por q crean un iman..., se enrollan). Cat(egory)2:
definen el numero de parejas, el grosor, y como de apretados estan enrollados.
Cada uno tiene un alcance y velocidad maxima soportadas.

[IEE 802.3]: https://en.wikipedia.org/wiki/IEEE_802.3
{{< /todo >}}

