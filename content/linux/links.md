---
title: Archivos de link
weight: -1
description: >
    Los archivos link en Linux son muy útiles e interesantes: puedes tener el
    mismo archivo en distintas direcciones.
date: TODO
draft: true
---

[1]: https://www.linux.com/topic/desktop/understanding-linux-links/

Los archivos de links son una manera de crear un atajo a otro archivo, de tal
forma que estamos creando un _pseudo-archivo_ que refiere al original.

Voy a usar el ejemplo que dan en [Linux.com][1]: Imaginemos que tenemos una
carpeta cualquiera en un USB (`/media/usb/music`) y creamos un archivo de link
a este USB en nuestro usuario (`~/music`). Si abres el link, estarás en
`~/music`, no te redirigirá a `/media/usb/music`. Pero si haces algunos cambios
ahí, estos se reflejarán automáticamente en el original.

Se pueden usar en los siguientes ámbitos:

- Crear una dirección alternativa a un archivo que se encuentre muy escondido en
  la jerarquía.
- Enlazar librerías.
- Tener como una copia del mismo archivo en diferentes lugares.


# Tipos de links

- _Hard links_
- _Symbolic links_

Los _hard links_ solo se pueden usar con archivos (no directorios) que estén en
tu mismo dispositivo (ni USBs, otros discos, etc). Incluso si se borra el
original, el enlace seguirá siendo válido. En lo que a Linux le respecta, ambos
archivos son el mismo, porque tienen los mismos [inodos]({{< ref
"linux/estructura-directorios" >}}).

Los _enlaces simbólicos_ sí que pueden referirse a directorios de otros
dispositivos, pero en el caso de eliminar el original aparecerán como _rotos_.
A diferencia de los _hard links_, estos sí tiene su propio inodo.


# Creación de links

Para crear un _hard link_ se usa simplemente el siguiente comando:

```sh
ln ORIGINAL LINK
```

Un _enlace simbólico_ también se crea con el comando `ln`, pero con una _flag_
adicional:

```sh
ln -s ORIGINAL LINK
```

Y se borrarían como un archivo completamente normal:

```sh
rm LINK
```


# ¿Cómo diferenciar los dos tipos?

En realidad, solamente podrás diferenciar los _soft links_, porque aparecerá
(tras un comando `ls -l`) una `l` indicando que es un enlace. Además de eso,
después del nombre del archivo, se mostrará a que otro archivo hace referencia:

```
lrwxrwxrwx 1 magno magno   26 Jan 27 17:50 soft -> originals/example-soft.txt
```

Por otro lado, un _hard link_, no podrá diferenciarse de ningún archivo normal,
ya que se mostrará `-` indicando que es un archivo, y no aparecerá ningún
indicador de donde esta el otro archivo al que hace referencia.

Puede que si que exista una forma de comprobarlo, pero yo todavía no lo he
descubierto.

> **Más?**: Usa `$ man ln`

# Fuente

[Linux.com][linux.com]

[linux.com]: https://www.linux.com/topic/desktop/understanding-linux-links/
