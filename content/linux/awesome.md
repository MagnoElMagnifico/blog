---
title: Awesome WM
date: 2022-09-28
weight: 5
description: _Awesome_ es un _Tiling Window Manager_ centrado en el teclado, y uno de los más configurables.
---

Awesome en un _Window Manager_ o Gestor de Ventanas y es considerado uno de los
más configurables, gracias a que te permite utilizar Lua en su configuración.

Sin embargo, a diferencia de Gnome, KDE y todos estos; este es un programa que
solo se encargará de las ventanas, nada más. Awesome está pensado para usuarios
más avanzados.

Fuente: post de [DesdeLinux.net][fuente]

[fuente]: https://blog.desdelinux.net/awesome-wm-instalacion-configuracion/


# Instalación

> **Nota**: Yo lo he instalado con ArcoLinux, por lo tanto, no he podido
> comprobar esto.

Deberás instalar con tu administrador de paquetes o _package manager_ los
siguientes:

- `awesome`: el propio gestor de ventanas
- `vicious`: librería con algunos widgets para Awesome
- `xcompmgr` / `picom`: para usar la composición (transparencia, sombras, etc)
- `nitrogen`: se encargará de los fondos de pantalla
- `lxappearance`: selector de temas GTK

```bash
# Habilita Awesome
echo "exec awesome" >> ~./initrc
# Para conectarse a un display en específico mejor:
echo "DISPLAY=<host>:1 exec awesome" >> ~/.initrc

# Creación de la configuración básica
mkdir ~/.config/awesome
cp /etc/xdg/awesome/rc.lua ~/.config/awesome # Copia la configuración por defecto
```


# Conocimiento básico

En el archivo `rc.lua` es donde se encuentra toda la configuración del gestor de
ventanas, y en la carpeta `themes` se almacenarán los temas, pero estos son
creados aparte (`/usr/share/awesome/themes`).

Pero antes de hacer nada, es conveniente entender la jerga de Awesome:

- `Client` o cliente = ventana

- `Tag` o etiqueta: espacio de trabajo

- `Master Window` o ventana principal: es la ventana que requiere más atención
  Cuando está en modo mosaico, tendrás una ventana principal ocupando la mita de
  la pantalla y las demás se apilarán en el espacio restante

- `Floating Window` o ventana flotante: cualquier ventana que no esté en mosaico
  (es decir, que puede estar por encima de otras ventanas)

- `Wibox`: panel con widgets

- `Widget`: objetos que aportan funcionalidad, por ejemplo subir y bajar el
  volumen, barras de menús, etc

- `Screen` o pantalla: se refiere a la pantalla donde van a aparecer las
  ventana

- `Layout` o disposición: forma en la que se organizan las ventanas. Awesome
  tiene muchas, pero seguramente acabes usando alguna de las siguientes:

  - `columns` o columnas: la ventana maestra está ocupando mitad de la pantalla
    verticalmente y el resto se apilan en el espacio restante (dos variantes,
    ventana maestra a la derecha o a la izquierda)

  - `rows` o filas: igual que el anterior pero horizontalmente

  - `magnified` o magnificado: la ventana principal ocupa el centro de la
    pantalla y el resto están apiladas detrás

  - `maximized` o maximizado: la ventana principal ocupa toda la pantalla y el
    resto están escondidas

  - `floating`: usa ventanas flotantes

  - ...

Awesome está pensado para usar más el teclado, por lo que se utilizan una serie
de atajos de teclado para controlar las ventanas, que normalmente comienzan por
la tecla `super`, `mod` o la _tecla de Windows_. Aquí están algunas por defecto,
pero como ya he comentado antes, es completamente customizable.

<!-- TODO: probar correctamente -->
- `mod + s`: mostrar los atajos disponibles
-------------------------
- `mod + mouse1`: mover cliente con el ratón
- `mod + mouse2`: cambiar el tamaño del cliente con el ratón
-------------------------
- `mod + tab`: cliente anterior
- `mod + j`: cliente a la izquierda
- `mod + k`: cliente a la derecha
- `mod + 1-9` `mod + derecha/izquierda`: cambiar de tag
- `mod + shift + 1-9`: mover cliente al tag
-------------------------
- `mod + shift + j`: mover cliente a la izquierda
- `mod + shift + k`: mover cliente a la derecha
- `mod + l` `mod + l`: agrandar/empequeñecer cliente
-------------------------
- `mod + shift + c/q`: cerrar un cliente
- `mod + f`: pantalla completa (incluye barras de menús)
- `mod + m`: maximizar (agrandar todo lo posible dentro de los menús)
- `mod + n`: minimizar (esconder)
- `mod + ctrl + n`: restaurar clientes minimizados
-------------------------
- `mod + ctrl + space`: modo flotante
- `mod + enter`: abrir una terminal


# Configuración

Modificar la configuración es bastante sencillo, ya que aparecen muchos
comentarios explicando que hace cada cosa. Si necesitas más ayuda puedes ir a
la [documentación oficial](https://awesomewm.org/apidoc/).

![](https://awesomewm.org/apidoc/images/AUTOGEN_awful_popup_defaultconfig.svg)
