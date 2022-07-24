---
title: Git y Github
weight: 1
---

# GIT
Software para el control de versiones, guarda un registro de todos los cambios a
unos archivos y permite trabajar más fácilmente en equipos. Creado por Linux
Torballs (creador del Kernel de GNU/Linux), lo cual es software libre.

Se puede editar el código desde github (botón del lápiz, y guardar cambios)

` proyecto - git add > staging area - git commit > repositorio local `

+ `git init` : inicia un seguimiento de un proyecto

+ `git commit -m "descripción"` : guarda los cambios con una descripción dada
+ `git commit -am "descripción"` : git add + git commit
+ `git commit --amend` : abre Vim para editar las descripciones de los commit

Configura el email y usuario necesarios para git
+ `git config --global user.username "user"`
+ `git config --global user.email "email"`

Para conectarte a github y hacer un `git push`, debes añadir tu usuario y
contraseña. Sin embargo, con la actualización de Github de Julio de 2020
(entra en vigor a partir del 13 de Agosto de 2021), no debes introducir
tu contraseña real, sino un _Personal Access Tolken_ (PAT) que puedes
generar desde tu cuenta en `Settings > Developer settings > Personal access tokens > Generate new token`
Debes introducir un nombre descriptivo, su fecha máxima de validez y los
permisos que le quieras aportar. Finalmente pulsa en `Generate token.`
y úsalo en lugar de tu contraseña. De esta forma resulta mucho más seguro
y puedes controlar mejor los permisos.

+ `git pull` : actualiza el repositorio
+ `git clone <url>` : copiar repositorio
+ `git push --tags` : subir las tags a repositorio remoto

- _tag_: especifica versiones de un proyecto
+ `git tag <nametag> -m "descripción"` : crea una tag

## Reset
+ `git reset --reset [--hard] <code>` : vuelve a un estado anterior borrando los commits posteriores
+ `git revert <code> && git add .` && `git revert --continue` : Crea un nuevo commit que cambia el reposotorio a un estado anterior por medio de un merge

## Ramas
+ `git branch <nombre>` : crear una rama
+ `git branch` : muestra las ramas creadas y en cuál estás
+ `git branch -a`: muestra todas las ramas
+ `git checkout <nombrerama>` : cambia a la rama dada
+ `git merche <nombrerama>` : desde la rama master/main se une con la rama dada
+ `git branch -d <nombrerama>` : borra la rama

- _Fork_: clona el repositorio (repositorio publico) en github a otra cuenta
- _Pull request_: petición para juntar el fork con el proyecto inicial

## Sub módulos (repositorio dentro de otro)
+ `git submodule add <url>` : añade un submodulo
+ `git submodule init` : inicia el submodulo tras clonar el repositorio original
+ `git submodule update` : actualiza (clona) los submodulos inciados

## Info
+ `git status -s` : muestra el estado de los archivos en la carpeta del proyecto
+ `git diff [archivo]` : muestra todos los cambios en relación al master remoto
+ `git log [archivo]` : muestra info de los commits (usuario, fecha, código, descripción)
+ `git log --oneline` : muestra info de los commits
+ `git blame <archivo>` : muestra info de los cambios de un archivo con su código de commit, usuario, fecha, etc.
+ `git reflog` : historial del repositorio local

# Contribuir a Open Source
La página principal donde aparecen todos estos proyectos Open Source es en
[GitHub](https://github.com), para ello, es necesario tener una cuenta.

El siguiente paso es encontrar un proyecto al que queramos contribuir. Dentro
de la pestaña [`Explore`](https://github.com/explore) podrás encontrar
diferentes repositorios basados en tus intereses, populares, por categorías, etc.

Dentro de un repositorio, tenemos varias pestañas disponibles. Aparte de la
pestaña del código (`code`), existen otras como `Issues`, `Pull requests`,
`Actions`... La pestaña `Issues` se usa para reportar bugs o pedir nuevas
funcionalidades, por lo que siempre es buena idea pasarse por ahí para intentar
solucionar algún problema. Tambien puedes buscar [`Issues`](https://github.com/issues)
en todo github directamente.

Estos `Issues` tienen diferentes etiquetas indicando el tipo de problema. Al
estar empezando, puede que sea buena idea buscar por `good first issue`, ya que
suelen ser problemas más sencillos. Pero si estamos empezando, puede que sea
mejor arreglar algo de la documentación para coger la mecánica.

La pestaña de `Pull requests` contiene posibles soluciones a estos `Issues` que
algunos contribuyentes han propuesto. Para que esta solución se acepte, uno de
los dueños del repositorio deberá revisar tus cambios comprobando que todo sea
correcto antes de juntarlo con el proyecto.

Las acciones diponibles en un repositorio es observar (`watch`, se te notificará
de los recientes cambios del repositorio), indicar que te gusta (`start`) y
hacer un `Fork`, que sería editar tu propia versión del proyecto. Esto último es
exactamente lo que queremos.

Antes de meterse de lleno a editar cosas, es importante entender bien el
proyecto: en el archivo `README.md` podrás encontrar más información sobre el
mismo. Además de este archivo, algunos incluyen una guía de contribución o
código de conducta (`CONTRIBUTING.md`/`CODE_OF_CONDUCT.md`).

Al hacer click en este botón de `Fork`, se creará una copia del proyecto en tu
propia cuenta, por lo que lo podrás editar con total libertad, pero deberías
crear tu propia rama para no modificar el proyecto directamente y afectar el
trabajo de otros, además de que puede que haya nuevos cambios y acabes añadiendo
código desactualizado.

El siguiente esquema muestra los pasos a seguir para enviar los cambios al
proyecto.

![Esquema](github-contribute.png)

```sh
# Obtener copia local
git clone <fork_del_proyecto>

# Crear rama
git branch <tu_rama>
git checkout <tu_rama>

# Añadir el repositorio original
git remote add upstream <link_del_projecto>

# Cambios en los archivos
git diff # Muestra los cambios
git add .
git commit -m "<descripción>"

# Comprobar si hay actualizaciones
git pull upstream <rama_principal>
git pull upstream <tu_rama>

# Enviar los cambios al fork
git push origin <tu_rama>

# Si el último comando te dio problemas, prueba con a especificar el upstream
git branch --set-upstream-to=origin/<rama_principal> <tu_rama>
```

Ahora en GitHub debería aparecer una notificación de `Pull request`, pulsa en el
botón de _Comparar & Pull Request_ y añade una descripción según aparezca en
la guía de contribución. Una vez cubierto y enviado, esta debería junto a otras
del repositorio original. Ahí puedes esperar a que acepten tus cambios o bien te
pueden proponer sugerencias, etc. En ese caso, deberías hacer otra rama nueva.

¡Listo! Acabas de hacer tu primera contribución a Open Source.
