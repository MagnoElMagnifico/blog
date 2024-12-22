---
title: Cuando Linux crashea
description: Algunos consejos para cuando Linux deja de funcionar.
date: 2023-01-01
weight: -1
---


# Programa que se congela

```bash
xkill
```

Y hacer click en la ventana problemática.


# Abrir una tty

    Ctrl + Alt + F1 / F2 / F3 / ...

Desde ahí puedes utilizar los comandos `ps` y `kill` para deshacerte de los
procesos causantes del problema.

<!-- TODO: Añadir uso de ps y kill (@/linux/commands.md): kill signals SIGTERM 15, SIGKILL 9 -->

Otras opciones son reiniciar el escritorio gráfico (depende de cual uses):

```bash
sudo service lightdm restart
sudo service gdm restart      # Ubuntu < 11.04
sudo service kdm restart      # Kubuntu (KDE)

sudo service <nombre> restart
```


# Matar al Server X

Otra alternativa al punto anterior, es matando al Server X, encargado del
escritorio gráfico. Por conveniencia, podemos asignarle un atajo de teclado,
porque en el caso de que tengamos que reiniciarlo, la pantalla no estará
operativa.

El atajo de teclado es normalmente `Ctrl + Alt + Backspace`.

- En GNOME: `Keyboard Preferences > Layout (pestaña) > Options > Key sequence to
  kill X Server > Activar Ctrl + Alt + Backspace`.

- En KDE: `System Settings > Input devices > Keyboard > Advanced > Configure
  keyboard options > Marca Key sequence to kill the X server`.

- Otro: `setxkbmap -option terminate:ctrl_alt_bksp`. Para hacer los cambios
  permanentes añádelo a `~/.xinitrc`.

Fuente: [9TO5 Answer](https://9to5answer.com/how-to-set-keyboard-combination-to-kill-the-x-server)


# Activar SSH

Tener SSH activado puede ser útil cuando el sistema se queda colgado. Puedes
intentar acceder a tu sistema por SSH (desde el móvil por ejemplo, con
_termux_):

- Si puedes conectarte: es posible que sea un cuelgue de GPU.
- Si no puedes conectarte, es probable que sea cosa del Kernel.

Para solucionar lo primero, puedes probar a reiniciar el escritorio gráfico
como antes.


# Funciones de `SysRq`

La combinación de teclas `SysRq` se puede utilizar para mandar comandos al
Kernel y realizar diferentes operaciones directamente desde el teclado.
Dicha combinación consiste en `Alt + SysRq + <tecla>`, donde `SysRq` es la
tecla `PrintScreen` del teclado _QWERTY_ normal.

> En portátiles puede que tengas que utilizar `Fn + SysRq + Alt + K`, soltando
> `Fn` después de pulsar `SysRq`.

Para conseguir que funcione, debemos configurar un par de cosas.

El directorio `/boot/config-<kernel version>` contiene información sobre las
opciones con las que se compiló el Kernel. Podemos buscar por la característica
que nos interesa con `grep`:

```bash
grep -i CONFIG_MAGIC_SYSRQ /boot/config-$(uname -r)
```

Y si todo va bien, debería aparecer algo como lo siguiente:

```
CONFIG_MAGIC_SYSRQ=y
CONFIG_MAGIC_SYSRQ_DEFAULT_ENABLE=0x01b6
CONFIG_MAGIC_SYSRQ_SERIAL=y
```

El valor `y` quiere decir que el Kernel seleccionado, tiene dicha
característica. También podemos ver el que el número `0x01b6` es 438.

Ahora podemos comprobar qué opciones de `SysRq` están disponibles (algunas
distribuciones restringen el acceso por razones de seguridad).

```bash
cat /proc/sys/kernel/sysrq
```

El número devuelto se corresponde con una cadena de bits, cada bit con su
propio significado (empezando a contar en 0).

           0    disable sysrq completely
    bit 0) 1    enable all functions of sysrq
    bit 1) 2    enable control of console logging level
    bit 2) 4    enable control of keyboard (SAK, unraw)
    bit 3) 8    enable debugging dumps of processes etc.
    bit 4) 16   enable sync command
    bit 5) 32   enable remount read-only
    bit 6) 64   enable signaling of processes (term, kill, oom-kill)
    bit 7) 128  allow reboot/poweroff
    bit 8) 256  allow nicing of all RT tasks

Si por ejemplo, con el comando anterior obtenemos 176, se puede representar
en binario como `1011 0000`, por lo tanto, `176 = 2^4 + 2^5 + 2^7 = 16 + 32 +
128`. Ahí, sería comprobar cada valor en la tabla para ver qué opciones tenemos
activadas. Paralelamente, `0x01b6 = 438 = 2 + 4 + 16 + 32 + 128 + 256`.

Y para poner el valor que nosotros queramos (`1` en este caso), simplemente:

```bash
sudo echo '1' > /proc/sys/kernel/sysrq
```

El problema, es que al reiniciar el sistema, se recuperará el valor anterior.
La forma correcta de hacerlo es editando el siguiente archivo y cambiar el 176
(o el valor que sea) por 1.

```bash
sudo nano /etc/sysctl.d/10-magic-sysrq.conf
```

El valor debe corresponder con el de `/proc/sys/kernel/sysrq`, así que cámbialo
allí también.

```bash
echo 1 | sudo tee /proc/sys/kernel/sysrq
```

Puedes comprobar si ha funcionado con apretando `Alt + SysRq + F`, que
eliminará los procesos que más están consumiendo. Puedes cerrar con eso la
pestaña actual el navegador hasta llegar al reinicio de Server X.

Para más información puedes consultar la [documentación del Kernel de
Linux][1], o la [wikipedia][2].

> **NOTA IMPORTANTE**: Si estas características no están activadas por defecto,
> debe de ser por un buen motivo. Es posible que el `244` sea un valor menos
> perjudicial que aún te permite realizar los siguientes trucos.

Fuente: [Linux Config][3]

[1]: https://www.kernel.org/doc/html/latest/admin-guide/sysrq.html
[2]: https://en.wikipedia.org/wiki/Magic_SysRq_key
[3]: https://linuxconfig.org/how-to-enable-all-sysrq-functions-on-linux


## REISUB

Cuando todo deja de funcionar, existe una forma más segura de reiniciar el
ordenador que simplemente desenchufarlo.

Mientras mantienes presionado `Alt` y `SysReq` (`Print Screen`), escribe
**lentamente** (para que dé tiempo a ejecutar cada acción) `REISUB`.

Significado:

    R:  Cambiar al modo XLATE
    E:  Mandar una señal de Terminar (SIGTERM) a todos los procesos, excepto init
    I:  Mandar una señar de Matar (SIGKILL) a todos los procesos, excepto init
    S:  Sincronizar todos los sistemas de archivos montados
    U:  Remontar los sistemas de archivos en solo-lectura
    B:  Reiniciar.

Consejos para recordar el comando:

- `BUSIER` al revés, como en _The System is **busier** than it should be!_
- _Reboot Even If System Utterly Broken_.

Hay otra forma menos radical que reiniciar el sistema completo. Puedes utilizar
el comando `Alt + SysRq + F` para ir eliminando los procesos más pesados uno a
uno. Si lo prefieres, puedes eliminar todos los procesos de una consola de
golpe con `Alt + SysRq + K`

Fuente: [ask ubuntu](https://askubuntu.com/questions/4408/what-should-i-do-when-ubuntu-freezes)
