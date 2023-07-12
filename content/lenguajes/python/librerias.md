---
title: Módulos en Python
description: Breve explicación de como ejecutar programas Python e importar librerías
weight: 4
date: 2023-07-12
---

# Instalación de Python

Esta es una operación bastante sencilla, aquí puedes encontrar la [guía oficial
de instalación] de Python detallada.

Para Windows es simplemente ejecutar el instalador (y asegurarse de que se añada
al PATH).

Y para Linux, seguramente tu distribución tenga un paquete de Python. Por
ejemplo, para distribuciones basadas en Debian simplemente:

```sh
sudo apt install python3 python3-dev
```

Ahora, para comprobar que todo funciona ejecuta en una terminal:

```sh
python3 --version
```

Si no da un error del tipo `command not found`, quiere decir que todo está
instalado correctamente.

[guía oficial de instalación]: https://wiki.python.org/moin/BeginnersGuide/Download


# Uso básico de Python

Para ejecutar un programa se escribe:

```sh
python3 <filename>.py
```

O doble clic en el explorador de archivos si el sistema operativo lo detecta
como un programa Python (se debería desplegar la ventana de comandos si es de
consola).


## Importar módulos

Para importar otro archivo fuente desde otro en su misma carpeta, se añade con
un `import` al inicio con su nombre, en este caso `modulo.py`:

```py
import modulo
modulo.foo()
```

Nótese que para acceder a las funciones/clases del módulo, primero se debe usar
su nombre. También se puede cambiar su nombre, poniendo `as` y a continuación el
nombre que se le quiera dar:

```py
import modulo as mod
mod.foo()
```

Si el módulo está dentro de una carpeta o paquete, se añade antes `from` y el
nombre del paquete (`paquete/modulo.py`):

```py
from paquete import modulo
```

Si hay más subpaquetes, se van accediendo a ellos mediante el punto (`.`):

```py
from paquete.subpaquete import modulo
```

Además, para evitar tener que usar el nombre del módulo todo el rato, se puede
importar todo de golpe gracias a `import *`:

```py
from paquete.subpaquete.modulo import *
foo()
```

Y por el contrario, si solo vas a usar una clase o una función, puedes incluir
solo esa; y si se intenta usar cualquier otra, dará un error:

```py
from paquete.subpaquete.modulo import foo
foo()
```

Cabe recalcar que el programa principal debe encontrarse en la raíz de los
paquetes, para que pueda encontrar los demás archivos.


## Dónde Python busca los módulos

Cuando se hace un `import` de un módulo, Python busca en varias carpetas para
ver si lo encuentra. Si es un módulo creado por tí y perteneciente al proyecto,
es posible que esté en la misma carpeta; pero otros módulos como los de la
librería estándar o instalados con pip, pueden que estén en otros lugares.

Para ver donde Python busca (por orden), simplemente ejecuta:

```py
import sys
print(sys.path)
```


# "Compilar"

Para compilar el programa y que nadie pueda modificar nuestro código fácilmente
podemos exportarlo a `.pyo` o `.pyc`. Este último está más optimizado pero tiene
algunas limitaciones.

Para compilarlo a `.pyc` se puede usar el comando:

```sh
python3 -m compileall
# o para un único archvivo
python3 -m py_compile main.py
```

Los archivos se generarán en una carpeta llamada `__pycache__`. Recuerda que
antes de poder ejecutar tienes que cambiarle el nombre para que Python encuentre
el archivo al cual te estás refiriendo en los imports.

Se siguen ejecutando como siempre:

```sh
python3 <filename>.pyc
```


# Instalar módulos

Para extender la funcionalidad base de Python y de su librería estándar, es
posible instalar módulos desarrollados por la comunidad.

<!-- TODO:
Pipy
anaconda -->


## Pip

Pip es la herramienta preferida para instalar paquetes de Python. Si has
instalado python desde el código fuente o con Homebrew, ya deberías tenerlo.
Para comprobar si la tienes instalada prueba:

```sh
python3 -m pip --version
# o bien
pip --version
```

Alternativamente puedes usar `pip3`, pero generalmente solo son alias.

Para instalarlo, primero puedes usar lo siguiente:

```sh
python3 -m ensurepip --default-pip
```

En caso de error puedes probar a buscar el paquete de tu distribución de Linux
o usar el script [get-pip.py], pero ojo, este puede no coordinarse bien con el
resto de herramientas que tengas.

```sh
python3 get-pip.py
```

Los comandos básicos de Pip son los siguientes (más información en la [guía de
usuario de Pip]:

{{< block "Nota" >}}
Pip se puede llamar desde Python:

```sh
python3 -m pip
```

o directamente como comando:

```sh
pip
```
{{< /block >}}

{{< keyvalue "Comandos básicos de Pip" >}}
-% `pip install <paquete>` :% Instalar `<paquete>`
-% `pip uninstall <paquete>` :% Desistalar `<paquete>`
-% `pip list` :% Muestra los paquetes instalados
-% `pip list --outdated` :% Muestra los paquetes instalados sin actualizar
-% `pip show <paquete>` :% Muestra más información sobre el paquete `<paquete>`
-% `pip search <paquete>` :% Busca el paquete `<paquete>`
{{< /keyvalue >}}

[get-pip.py]: https://bootstrap.pypa.io/get-pip.py
[guía de usuario de Pip]: https://pip.pypa.io/en/stable/user_guide/


## Entorno virtual

{{< block "Nota" >}}
Esto se introdujo en la versión 3.3 de Python, por lo que con versiones
anteriores no funciona.
{{< /block >}}

{{< block "Nota" >}}
Puede que en este [vídeo] se explique mejor.

[vídeo]: https://youtu.be/KxvKCSwlUv8
{{< /block >}}

Los entornos virtuales se recomiendan para desarrollar un proyecto con dependencias
de Python porque de lo contrario tendrías los módulos instalados a nivel del
sistema, lo que puede dar problemas:

- Librerías que se actualizan y cosas dejan de funcionar en proyectos viejos
- Dependencias que colisionan entre varios proyectos

La solución es crear un entorno donde se instalarán estos paquetes, pero de
forma local. Esta se conforma de dos partes:

- Una versión concreta de Python, pip y otras herramientas
- Y las librerías de terceros que use el proyecto


## Crear y usar entornos virtuales

Para crear estos entornos, se utiliza la herramienta `venv`. Prueba a ejecutar:

```sh
python3 -m venv
```

Y si no aparece un error de `no module named venv`, es que está instalado
correctamente.

Para **crear un entorno virtual en la carpeta actual** ejecuta:

```sh
python3 -m venv .venv
```
{{< dropdown "Para Debian/Ubuntu" >}}
Es posible que este comando de problemas en Debian/Ubuntu debido a que
`ensurepip` no está disponible. Esto se debe a que la distribución prefiere que
instales las herramientas como paquetes del sistema convencionales, por tanto
vas a tener que instalar `python3-venv` y repetir el comando.
{{< /dropdown >}}

Siendo `.venv` el nombre. Puedes escoger otro nombre, pero este es bastante
popular. Se creará una carpeta con ese nombre y dentro contendrá:

- `lib/.../site-packages`: aquí se instalarán las librerías de terceros
- `bin/`: aquí están las herramientas del entorno y la versión de Python que se
  va a usar.
- `pyenv.cfg`: es el archivo de configuración del entorno

A continuación, **hay que activar el entorno** con el siguiente comando:

```sh
source .venv/bin/activate     # Linux/Mac
source .venv/Scripts/activate # Windows WSL / Git bash
.env/Scripts/activate         # Windows CMD / Powershell
```

Y debería cambiar el prompt para indicar que el entorno se está usando:

```sh
(.venv) ~/proyecto $
```

Además, si ahora muestras la variable `$PATH` / `%PATH%`, verás que la primera
dirección que sale es donde está la versión del Python del entorno virtual.

Ahora simplemente se pueden usar comandos normales de Python y de Pip para
instalar paquetes.

**El entorno solo estará activo durante esa sesión de consola**, si la cierras,
tendrás que volver a activarlo.


## `requirements.txt`

En el caso de enviar el código a otra persona, esta deberá instalar también las
dependencias. Para ello, se listan todas ellas en un archivo llamado por
convención `requirements.txt`. Para dependencias de desarrollo (librerias que no
se necesitan para ejecutar el código, pero sí para otras cosas, como tests), se
suelen listar en `requirements-dev.txt`.

En la [documentación de Pip] aparece el formato del archivo y un ejemplo.

Para **instalar los requerimientos**:

```sh
python3 -m pip install -r requirements.txt
# o bien
pip install -r requirements.txt
```

Y para **obtener los requerimientos**:

```sh
python3 -m pip freeze > requirements.txt
# o bien
pip freeze > requirements.txt
```

[documentación de Pip]: https://pip.pypa.io/en/stable/reference/requirements-file-format/
