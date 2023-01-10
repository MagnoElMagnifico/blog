---
title: Redes
weight: 1
description: TODO
date: TODO
draft: true
---

<!-- TODO
**What is a cloud platform?** A cloud platform refers to the operating system and hardware of a server in an Internet-based data center. It allows software and hardware products to co-exist remotely and at scale.

**So, how do cloud platforms work?** Enterprises rent access to compute services, such as servers, databases, storage, analytics, networking, software, and intelligence. Therefore, the enterprises don’t have to set up and own data centers or computing infrastructure. They simply pay for what they use.

**Types of Cloud Platforms**
There are several types of cloud platforms. Not a single one works for everyone. There are several models, types, and services available to help meet the varying needs of users. They include:

- **Public Cloud**: Public cloud platforms are third-party providers that deliver computing resources over the Internet. Examples include Amazon Web Services (AWS), Google Cloud Platform, Alibaba, Microsoft Azure, and IBM Bluemix.
- **Private Cloud**: A private cloud platform is exclusive to a single organization. It’s usually in an on-site data center or hosted by a third-party service provider.
- **Hybrid Cloud**: This is a combination of public and private cloud platforms. Data and applications move seamlessly between the two. This gives the organization greater flexibility and helps optimize infrastructure, security, and compliance.
-->


<!-- TODO

En casa tienes varios dispositivos conectados entre si (network), y pueden compartir datos (imprimir, ver video, internet...). Estos estan conectados a un switch, por cable o inalambrico (wifi).
El receptor y emisor deben entenderse entre si (hablar el mismo idioma), esto estan determinados por los protocolos (TCP, HTTPS...)

Tipos
Podemos llamar a cada elemento en una red nodo. Estos nodos pueden controlar la red (switch, router) o pueden ser end-points/host, q reciben y envian informacion
Red de casa (pequeña): SOHO Small Office, Home Office (el switch, router, punto de acceso y otros suelen estar integrados en un mismo dispositivo)
Mas grandes (eg Banco): Enterprise Network
Las q proveen el internet: Service Provider Network

La red LAN (Local Area Network) esta formada por sus elementos en un area determinada
La red WAN (Wide Area Network) puede ser como la del banco, todas sus sedes mundiales interconectadas

Cables
Pueden ser de Cu (baratos, usan electricidad -puede tener interferencias-, se usan para cortas distancias) o Fibra (caro,se hacen de cristal, los datos se envian con luz, se usa para distancias largas, no hay interferencias)

La LAN cableada usa un protocolo llamado Ethernet, un conjunto de reglas q describen como se deben comunicar los dispositivos conectados:
Determina como tiene q ser el cableado (parte fisica)
O como se debe formatear los datos y ser enviados (Media Access Control)

IEEE, los creadores de Ethernet, tienen diferentes tipos de estandares.
Cada dispositivo tiene un ID: si empiezan por 802 son para LAN, 802.3 Ethernet (802.3i 10Mbps / 802.3u 100Mbps / 802.3ab 1Gbps / 802.3an 10 Gbps = 10GBASE-T -10G speed/base baseband (cables) / T UTP cable type-)

Los cables se envian informacion mediante bits, pero hay q descodificarlo (Encoding Scheme). Para enviar estas señales se necesita un circuito. Los cables q lo forman pueden ser
UTP: Unshielded Twisted (4 parejas de cables, como unas interfieren con las otras, por q crean un iman..., se enrollan).
    Cat(egory)2: definen el numero de parejas, el grosor, y como de apretados estan enrollados. Cada uno tiene un alcance y velocidad maxima soportadas.

Los cables tienen tambien un conector (RG45?). Estos tienen unos pines q se conectan con las parejas, cada une recibe (RX) o transmite (TX): (ordenador RX:1 TX:2 / switch TX:1 RX:2 >> Straight through //// ordenador RX:2 TX:1 / otro ordenador RX:2 TX:1 /1-2/2-1 >> Crossover). Para evitar estos cambios existe el Auto MDI-X, q hace los cambios automaticamente.

1000BASE-T usa todas las parejas tanto para recibir y enviar (Full Duplex, Half Duplex si hay una pausa antes de volver a enviar por la misma pareja, solo pueden enviar o recibir, no las dos a la vez) (requiere cat5e). 1000BASE-TX usa dos pares para recibir y dos para enviar (requiere cat6) (requieren Auto MDI-X)

Los cables de fibra se pueden doblar hasta cierto punto, donde ya se pierde la señal.

Single core: tenemos solo una linea, funcionan en Half Duplex
Dual core: tenemos dos lineas, Full Duplex

Single Mode Fibre (SMF): Laser >2km caro
Multi Mode Fibre (MMF): LED 500m barato

Los conectores q usan son LC y SC
