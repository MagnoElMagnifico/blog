---
title: Python Setup
description: Breve explicación de como ejecutar programas Python e importar librerías
weight: 4
date: 2021-07-30

extra:
    show_details: true
    show_info: true
---


# Python
Cuando se instala Python, ya se marca una opción de añadirlo a la variable `PATH`,
aunque se suele guardar `AppData/Local/Programs/Python-XX`

Para ejecutar un programa se escribe:

```sh
python NombreDelArchivo.py
```

O doble clic si el sistema operativo lo detecta como un programa Python (se
debería desplegar la ventana de comandos si es de consola).

Para importar otro archivo fuente desde otro en su misma carpeta, se añade con
un `import` al inicio con su nombre:

```py
import NombreDelArchivo
```

Si está dentro de una carpeta o paquete, se añade antes `from` y el nombre del
paquete:

```py
from paquete import NombreDelArchivo
```

Si hay más subpaquetes, se van accediendo a ellos mediante el punto (.):

```py
from paquete.subpaquete import NombreDelArchivo
```

También se puede cambiar su nombre, poniendo `as` y a continuación el nombre que
le queramos dar:

```py
import NombreDelArchivo as Nombre
```

Cabe recalcar que el programa principal debe encontrarse en la raíz de los
paquetes, para que pueda encontrar los demás archivos.

Para compilar el programa y que nadie pueda modificar nuestro código fácilmente
podemos exportarlo a `.pyo` o `.pyc`. Este último está más optimizado pero tiene
algunas limitaciones.

Para compilarlo a `.pyc` se puede usar el comando:

```sh
python -m compileall
```

Los archivos se generarán en una carpeta llamada `__pycache__`. Recuerda que
antes de poder ejecutar tienes que cambiarle el nombre para que Python encuentre
el archivo al cual te estás refiriendo en los imports, porque por defecto se
cambia el nombre.

> **TODO**: Como pasar a `.exe` (no necesita tener Python instalado)
