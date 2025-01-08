---
title: Awesome WM
date: 2022-09-28
weight: -1
draft: true
description: >
    _Awesome_ es un _Tiling Window Manager_ centrado en el teclado,
    y uno de los más configurables.
---

Awesome en un _Window Manager_ o Gestor de Ventanas y es considerado uno de los
más configurables, gracias a que te permite utilizar **Lua** en su
configuración.

Sin embargo, a diferencia de Gnome, KDE y todos estos; este es un programa que
solo se encargará de las ventanas, nada más. Awesome está pensado para usuarios
más avanzados.

Fuente: post de [DesdeLinux.net][fuente]

[fuente]: https://blog.desdelinux.net/awesome-wm-instalacion-configuracion/

# Conceptos básicos

En el archivo `rc.lua` es donde se encuentra toda la configuración del gestor de
ventanas, y en la carpeta `themes` se almacenarán los temas, pero estos son
creados aparte (`/usr/share/awesome/themes`).

Pero antes de hacer nada, es conveniente entender la jerga de Awesome:

{{< keyvalue >}}
-% `Client` :% Ventana
-% `Tag` :% Espacio de trabajo o escritorio virtual

-% `Master Window` :%
Es la ventana que requiere más atención Cuando está en modo mosaico, tendrás una
ventana principal ocupando la mitad de la pantalla y las demás se apilarán en el
espacio restante

-% `Floating Window` :%
Cualquier ventana que no esté en mosaico (es decir, que puede estar por encima
de otras ventanas)

-% `Wibox` :%
Panel con widgets

-% `Widget` :%
Objetos que aportan funcionalidad, por ejemplo subir y bajar el volumen, barras
de menús, etc

-% `Screen` :%
Se refiere a la pantalla donde van a aparecer las ventana

-% `Layout` :%
Forma en la que se organizan las ventanas. Awesome tiene muchas, pero
seguramente acabes usando alguna de las siguientes:

- `columns`: la ventana maestra está ocupando mitad de la pantalla verticalmente
  y el resto se apilan en el espacio restante (dos variantes, ventana maestra a la
  derecha o a la izquierda)
- `rows`: igual que el anterior pero horizontalmente
- `magnified`: la ventana principal ocupa el centro de la pantalla y el resto
  están apiladas detrás
- `maximized`: la ventana principal ocupa toda la pantalla y el resto están
  escondidas
- `floating`: usa ventanas flotantes
{{< /keyvalue >}}

Awesome está pensado para usar más el teclado, por lo que se utilizan una serie
de atajos para controlar las ventanas, que normalmente comienzan por la tecla
`super`, `mod` o la _tecla de Windows_. Aquí están algunas por defecto, pero
como ya he comentado antes, es completamente customizable.

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
