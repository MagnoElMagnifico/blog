---
weight: 4
title: Algunos comandos de Windows
description: TODO
date: TODO
draft: true
---

[imager]: https://www.raspberrypi.com/software/
[model]: https://www.raspberrypi.com/products/raspberry-pi-3-model-b/
[remote]: https://www.raspberrypi.com/documentation/computers/remote-access.html
[rust]: https://github.com/rust-embedded/rust-raspberrypi-OS-tutorials

El modelo que yo tengo es: [`Raspberry Pi 3 Model B`][model].
- Quad Core 1.2GHz Broadcom BCM2837 64bit CPU.
- 1GB RAM.
- BCM43438 wireless LAN y Bluetooth de baja energía (BLE).
- 100 Base Ethernet.
- 40 pines extendidos de GPIO.
- 4 puertos USB 2.0.
- 4 polos stereo de salida y puerto de vídeo compuesto.
- HDMI de tamaño completo.
- Puerto de cámara CSI para conectar una cámara Raspberry Pi.
- Puerto de display DSI display para conectar a una Raspberry Pi touchscreen.
- Puerto para una Micro SD para cargar el SO y otros datos.
- Micro USB de 2.5A.

Se necesita:
- Una tarjeta Micro SD con Raspberry Pi OS instalado (de al menos 8GB).
    - Para instalar el SO, necesitarás también un adaptador para la tarjeta SD.
- Fuente de alimentación y cable Micro USB de 2.1 A.

Para usar como un ordenador:
- TV o monitor y cable HDMI.
- Teclado y ratón

# Setup de la tarjeta SD
1. Descargar un SO: la opción más fácil es usar Raspberry Pi OS (con
[Raspberry Pi Imager]), pero también
puedes instalar otro compatible con el hardware (aunque seguramente esto limite
las opciones).

    1. Descargar [Raspberry Pi Imager][imager] en otro ordenador (no la Raspberry crack,
    a ver como la enciendes sin tenerla lista aún XD) e instalar.

    2.

# Cómo obtener acceso remoto a la Raspberry
[Acceso remoto a Raspberry][remote].

# Rust para Raspberry
[Tutorial][rust] en Raspberry. Seguramente tengas que usar [Docker].
