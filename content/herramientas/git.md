---
title: Git
description: >
    Leyenda de los comandos más básicos de Git
weight: 1
date: 2023-06-17
mermaid: true
draft: true
---

{{< dropdown "TODO" >}}
- `git pull`
- `git push`
- `git remote`
------------------------------------------------------------
- `git branch`
- `git merge`
- `git checkout`
- `git switch`
------------------------------------------------------------
- `git revert`
- `git restore`
- `git reset`
------------------------------------------------------------
- `git log`
- `git diff`
- `git grep`
- `git show`
- `git tag`
------------------------------------------------------------
- `git rebase`
{{< /dropdown >}}

{{< dropdown "Vídeos" >}}
- Remotes: https://youtu.be/Gg4bLk8cGNo
- Git avanzado: https://youtu.be/qsTthZi23VE
{{< /dropdown >}}

{{< dropdown "TODO" >}}
- `git pull` : actualiza el repositorio

tags
- `git push --tags` : subir las tags a repositorio remoto
- _tag_: especifica versiones de un proyecto
- `git tag nametag -m "descripción"` : crea una tag

------------

quitar cambios de stage
git restore --staged file
git reset
git checkout -- file

descartar cambios
git restore file

deshacer ultimo commit (no quita los cambios, solo el commit) (alternativamente, puedes usar el hash)
git reset HEAD~1 # 1 commit hacia atras

si le pasas --hard, borrara tambien los cambios

---------

comandos unix directamente: hace el comando y los añade al stage
git rm file
git mv old new (mover renombrar)

git status -s (menos info)
git diff --staged

cada commit debe tener sentido por si mismo (solo un tema) y no ser una maraña de cosas
añadir cambios puntuales, pero no todo el archivo
git add -p file (patch level)

mensajes : conciso, el cuerpo es un mas detallado (motivo, q cambio, algo a tener en cuenta)

git branch -b feature; git checkout feature; git push -u (--set-upstream) origin (repo en github) feature (rama a la que se subira - git va por estados, ya sabe que esta en la rama feature)
git remote add origin url

Ver las diferencias con otra rama y saber si se puede hacer un merge
git diff rama

---------------------------------------------------
crea unas covenciones para tu equipo dado q depende un poco del proyecto, tamaño del equipo etc

always integrating

    pocas ramas
    relativamente commits pequeños
    tests de alta calidad y QA

state release feature

    distintas ramas para distintas cosas

    long running branches: existen para todo el proyecto (nunca se borran) y representan etapas en el desarrollo (dev, prod, main). no se suelen hacer commits, sino merges y rebases: por calidad (mas testeado)
        integration / develop / staging: estados del código que representes el proceso de creacion

    short running branches: creadas por un motivo, una vez cumplido, se borran: features, bugs, refactors

estrategia 1: github flow
solo hay una long running branch, main, y para añadir características y arreglar cosas se usan ramas pequeñas

estrategia 2: git flow
mas estructurado (mas reglas)
long-running: main + dev
short: features, releases (testing), hotfixes. se trabajan en estas, y luego de unen a dev. una vez q estan seguros q todo es correcto, lo añaden a main (luego añades una tag de la release, etc)

no hay una forma perfecta, cada equipo tiene su forma de operar
Hoja de referencia para Git de Github

pull request: es un merge para que te hagan una revisión de los cambios para no liarla
un fork es tu copia personal de otro repositorio. Si quieres modificar uno, crea un fork, y luego crea un pull request (esto evita que cualquiera modifique el repositorio). esto siempre se hace en una rama nueva que se incluira, no sobre commits

conflictos de merge: cuando queremos integrar ramas
por lo normal, git es capaz de detectar que cambios se mantienen y cuales se van, pero en otros casos resulta contradictorio
Activar para editar la descripción de tarea
{{< /dropdown >}}

{{< block "Recursos" >}}
Puedes encontrar un libro gratuito en PDF muy completo sobre Git en
[GoalKicker]. Además el propio GitHub tiene sus propias guias sobre git en
[Git Guides]. En [learngitbranching] hay una guía interactiva para
principiantes. Sin embargo, no hay nada mejor que el [libro oficial de Git].

[GoalKicker]: https://goalkicker.com/GitBook/
[Git Guides]: https://github.com/git-guides/
[learngitbranching]: https://learngitbranching.js.org/?locale=es_ES
[libro oficial de Git]: https://git-scm.com/book/es/v2
{{< /block >}}


# Introducción a Git

Software por excelencia para el control de versiones, guarda un registro de
todos los cambios a unos archivos y permite trabajar más fácilmente en equipos.
Creado por Linux Torballs (creador del Kernel de GNU/Linux), y es software
libre.


# La ayuda

```sh
git help
git help comando
git comando --help
```

O puedes leer la documentación en el manual:

```sh
man git
man git-comando
```


# Configuración del usuario

Antes de añadir cambios, el sistema debe saber cómo reconocerte.

{{< block "Nota" >}}
Esto no tiene nada que ver con la cuenta de GitHub. Es el nombre que se
relacionará con los cambios que realices.
{{< /block >}}

Para ello ejecuta:

```sh
git config --global user.username "usuario"
git config --global user.email "email"
```

Esto añadirá al archivo de configuración `~/.gitconfig` los datos dados, por lo
que se aplicarán para todos los repositorios. Puedes listar la configuración
almacenada con:

```sh
git config --list
```

También hay formas para hacer esta configuración local al repositorio, véase la [seccion 1.4]
de las notas de Git.

Otros aspectos que se pueden configurar es el editor de las descripciones de los
cambios:

```sh
git config --global core.editor "nvim"
```

Si esta opción no está configurada, mirará la variable `$EDITOR`, y si no está
definida, simplemente usará Vim.

[seccion 1.4]: https://goalkicker.com/GitBook/GitNotesForProfessionals.pdf#%5B%7B%22num%22%3A843%2C%22gen%22%3A0%7D%2C%7B%22name%22%3A%22XYZ%22%7D%2C0%2C658.623%2Cnull%5D


# Creación del repositorio

En primer lugar lo que se debe hacer es crear un repositorio de git para
iniciar el control de versiones de tu proyecto. Un repositorio es simplemente
un lugar donde almacenar el código o los archivos en cuestión. Desde el
directorio de dicho proyecto, ejecuta:

```sh
git init
```

Esto creará una carpeta oculta `.git`, que contiene una rama sin ningún commit.

> Puedes usar `-b nombre-rama` para escoger un nombre de rama inicial
> (configuración `init.defaultBranch`).

Si en lugar de eso, quieres descargar otros proyectos de internet, debes
**clonar** el repositorio. Esto depende de cada plataforma, en GitHub se hace
de la siguiente forma:

```sh
git clone https://github.com/username/repositorio.git
```

Esto obtiene los archivos necesarios (incluyendo `.git`) y los mete en una
carpeta con el nombre del repositorio. Puedes cambiar ese nombre con un
parámetro adicional o seleccionando la carpeta actual con `.`.


# Realizando cambios

En esta sección se discutirá en detalle los comandos con los que estarás
trabajando sobre el 80% de las veces que uses Git.

```mermaid
sequenceDiagram title: Ciclo de vida de Git
    participant Sin seguimiento
    participant Sin modificar
    participant Modificado
    participant Añadido

    Sin seguimiento->>Añadido: Añadir el archivo
    Sin modificar->>Modificado: Editar el archivo
    Sin modificar->>Sin seguimiento: Eliminar el archivo
    Modificado->>Añadido: Añadir el archivo
    Añadido->>Sin modificar: Commit
```

Antes de nada, **Git debe saber qué cambios son los que quieres incluir**
y cuáles no; porque es posible que tengas muchos archivos modificados, pero solo
quieras reportar un cambio en un par de ellos.

Para eso existe el _**Índice**_ o la _**Staging Área**_. Es una sala preliminar
de los cambios que todavía no son un commit. Para añadirlos aquí simplemente
utiliza [`git add`](#git-add).

Un **commit** en un repositorio es una snapshot o un estado intermedio del
proyecto que desees guardar, esto puede ser después de un cambio importante,
código nuevo, etc. Se mantendrá un historial de cada [`git
commit`](#git-commit), quién los hizo y cuándo; para que puedas revisar la
historia del proyecto.

Git registrará dichas snapshots como un gran copy&paste; pero se pretende que
los commits sean lo más livianos posibles: solo se almacenan los cambios entre
commits, los **deltas**.

```mermaid
%%{init: { 'logLevel': 'debug', 'theme': 'base' } }%%
gitGraph
    commit id: "c0"
    commit id: "c1"
    commit id: "c2"
```

En la figura anterior se muestra una rama `main` con 3 commits.

- `c0` ha sido el inicial
- `c1` ha hecho cambios sobre `c0`.
- `c2` ha hecho cambios sobre `c1`.


## `git status`

Antes de seguir, es necesario saber ver el estado del repositorio. Para ello se
usa:

```sh
git status
```

Que muestra la rama actual, si hay cambios pendientes o archivos sin
seguimiento. Además recomienda algunos comandos para poder añadir los cambios.

Algunas _flags_:

- `git status -s`: salida en formato corto
- `git status -sb`: en formato corto muestra también la rama

Y esta es la tabla con los significados de las letras:

{{< keyvalue >}}
-% `M`:% modificado
-% `A`:% añadido
-% `D`:% borrado
-% `R`:% renombrado
-% `C`:% copiado
-% `U`:% actualizado pero no _merged_
-% `?`:% sin seguimiento
-% `!`:% ignorado
{{< /keyvalue >}}


## `git add`


```sh
git add archivo
```

O alternativamente, para añadir todo (no recomendado):

```sh
git add .
```

Además, si el archivo ya está añadido, pero quieres actualizar los cambios:

```sh
git add -u archivo
git add --update archivo
```

Eso es el uso básico de `git add`. Veamos ahora qué más puede hacer.

### `git add -i`

```sh
git add -i
git add --interactive
```

Git entra en modo interactivo:

1. Muestra el resultado de `status`
2. Muestra los comandos disponibles
3. Muestra un prompt: `What now> `

Los subcomandos son los siguientes:

- `status`: muestra los cambios entre `HEAD` y la _Staging Area_, y entre la
  _Staging Area_ y los cambios ya guardados. `+` indica el número de líneas que
  se añadieron y `-` las líneas eliminadas con respecto a los cambios ya
  guardados (`staged`) y los cambios en la _Staging Area_ (`unstaged`).

- `update`: similar a la _flag_ `-u`. Permite actualizar el archivo seleccionado
  con los nuevos cambios que no se añadieron a la _Staging Area_.

- `revert`: revierte los cambios de la _Staging Area_ a `HEAD` y los nuevos
  cambios quedan sin seguimiento.

- `add untracked`: añade cambios que estaban sin seguimiento.

- `patch`: permite añadir los cambios uno a uno. Usa `?` para ver las opciones
  disponibles (también en [`git add -p`](#git-add--p))

- `diff`: permite revisar los cambios a los que se le harán commit.

Para volver al menú principal desde un comando, simplemente deja la línea en
blanco y pulsa enter.

### `git add -p`

```sh
git add -p
git add -patch
```

Permite añadir los cambios uno a uno, no por archivos.

{{< keyvalue >}}
-% `y` (yes):% añadir el cambio
-% `n` (no):% no añadir el cambio
-% `q` (quit):% salir, no añade el actual ni los restantes
-% `a` (all):% añade todos los restantes del archivo
-% `d` (delete):% no añade todos los restantes del archivo
-% `s` (split):% dividir en cambios más pequeños
-% `e` (edit):% editar manualmente el cambio
-% `g` (go):% seleccionar cambio al que saltar
-% `/`:% buscar cambio
-% `j` `J`:% dejar sin decidir, ver el siguiente
-% `k` `K`:% dejar sin decidir, ver el anterior
{{< /keyvalue >}}


## `git commit`

Y finalmente para crear el commit de los cambios en el _Index_:

```sh
git commit
```

Este comando abrirá el editor que tengas definido en la variable de entorno
`$EDITOR` para que especifiques una descripción de los cambios. Puedes usar lo
siguiente para dar la descripción desde los comandos:

```sh
git commit -m "descripción"
```

Otros comandos pueden ser:

- `git commit -a`: Añade todos los cambios (no archivos nuevos) a la _Staging
  Area_ y crea el commit en un solo comando.
- `git commit -t plantilla`: Usa una plantilla para el mensaje de commit.
- `git commit -p`: similar a `git add -p`.


## _Workflow_ con Git

La mayoría del tiempo, solo estarás utilizando los siguientes comandos:

```sh
git status
git add archivos
git commit -m "mensaje"
# Y quizás
git push
```

# `gitignore`

En algunas ocasiones tenemos un montón de archivos que no queremos que estén en
el repositorio, como binarios compilados, pruebas, etc. Y en lugar de que estén
molestando a la hora de añadir los cambios que sí que nos interesan, se le puede
decir a Git que ignore a estos archivos.

Este es el propósito del `.gitignore`: decirle a Git **qué archivos ignorar**.

```gitignore
# Esto es un comentario

# Ignora los contenidos de una carpeta
carpeta/

# Ignora la extensión .txt en la carpeta base
/*.txt

# Ignora la extensión .txt en cualquier carpeta dentro de `src`
src/**/*.txt

# Bueno, pero no ignores el README.txt
!README.txt
```

La sintaxis es algo similar a las expresiones regulares. Puedes utilizar los
corchetes `[abc]` para seleccionar o `a` o `b` o `c`; el signo `?` para un
caracter; y `*` para ninguno o varios caracteres.


# Revisando el historial

## `git log`

```sh
git log
```

Muestra el historial de commits hasta el momento en orden cronológico inverso.

{{< keyvalue >}}
-% `git log <archivo>`                   :% Muestra los cambios del archivo
-% `git log -p`                          :% Muestra los cambios de cada commit (_diff_)
-% `git log --relative-date`             :% Usa la fecha relativa (hace X tiempo)
-% `git log --name-only`                 :% Muestra el nombre de los archivos modificados
-% `git log --name-status`               :% Muestra el nombre de los archivos modificados y si fueron modificados, añadidos, etc
-% `git log -<numero>`                   :% Muestra solo los últimos `<numero>` commits
-% `git log --oneline`                   :% Muestra los commits solo en una línea
-% `git log --decorate --online --graph` :% Muestra los commits usando ASCII Art
-% `git log --stat`                      :% Muestra cuantos cambios se hicieron en el commit
-% `git log --shortstat`                 :% Muestra cuantos cambios se hicieron en el commit de forma abreviada
-% `git log --pretty=format:"<formato>"` :% Usa un formato dado para mostrar los commits
-% `git shortlog`                        :% Otro comando para ver los commits
-% `git reflog`                          :% Otro más
{{< /keyvalue >}}

Y esta es la sintaxis del formato de la opción `--pretty=format`:

{{< keyvalue >}}
-% `%H` y `%h` (abreviado) :% Hash del commit
-% `%T` y `%t` (abreviado) :% Hash del árbol
-% `%P` y `%p` (abreviado) :% Hashes de los commits padre
-% `%an` :% Nombre del autor
-% `%ae` :% Email del autor
-% `%ad` :% Fecha de la autoría (formato `--date`)
-% `%ar` :% Fecha de la autoría relativa (hace X tiempo)
-% `%s`  :% Asunto
{{< /keyvalue >}}

## `git diff`

- `git diff [archivo]` : muestra todos los cambios no añadidos
- `git diff --staged [archivo]`: muestra los cambios añadidos
- `git diff --check`: muestra los archivos y líneas con conflictos

## `git blame`

Permite saber quien añadió cada línea de un archivo entre otras cosas.


# Ramas

- `git branch nombre` : crear una rama
- `git branch` : muestra las ramas creadas y en cuál estás
- `git branch -a`: muestra todas las ramas
- `git switch nombrerama` : cambia a la rama dada
- `git merche nombrerama` : desde la rama master/main se une con la rama dada
- `git branch -d nombrerama` : borra la rama

- _Fork_: clona el repositorio (repositorio publico) en GitHub a otra cuenta
- _Pull request_: petición para juntar el fork con el proyecto inicial

https://stackoverflow.com/a/70454786


# `HEAD`

`HEAD` es un nombre que verás a menudo a medida que uses los distintos comandos
de Git.

Un repositorio puede tener cualquier número de `head`s y cada una de ellas tiene
un nombre: nombre de rama, etiqueta, etc.

En concreto, `HEAD`, siempre se refiere al commit más reciente de la rama
actual.

Puedes utilizar la sintaxis de `HEAD~` para referirte al commit previo,
o `HEAD~2` para el anterior del anterior...

```mermaid
%%{init: { 'logLevel': 'debug', 'theme': 'base' } }%%
gitGraph
    commit id:"c0"
    commit id:"c1"
    commit id:"c2"
    commit id:"c3"
    commit id:"HEAD" type:HIGHLIGHT
```

En el ejemplo anterior:

- `HEAD~` es `c3`
- `HEAD~2` es `c2`
- ...

Fuente: [Stack Overflow](https://stackoverflow.com/questions/2304087/what-is-head-in-git)


# Deshacer cambios

{{< block "Nota" >}}
Ten en cuenta que a veces no es posible recuperar algo que hayas deshecho.
{{< /block >}}

## `git commit --amend`

Creo que se entenderá mejor con un ejemplo:

```sh
git commit -m 'Añadiendo algunos cambios'
# ¡Diablos! Se me olvidó añadir el archivo.txt
git add archivo.txt
git commit --amend
```

Básicamente, rehace el último commit. Por tanto, saca el último cambio y lo
añade a la Staging Area. Luego vuelve a hacer el commit. Si la Staging Area
estaba vacía, con esta operación simplemente se cambia la descripción. Sino,
puedes añadir otros cambios que faltaba.

## `git reset HEAD <archivo>`

Permite deshacer los cambios que todavía no son commit y están en la Staging
Area.



- `git reset --reset [--hard] code` : vuelve a un estado anterior borrando los commits posteriores
- `git revert code && git add .` && `git revert --continue` : Crea un nuevo commit que cambia el repositorio a un estado anterior por medio de un merge

`git rm` elimina archivos de la _Staging Area_ y de los cambios ya guardados.


# Remotos

Git es un sistema distribuido, donde generalmente los cambios se hacen en
local. Para comunicarse con el resto, Git usa **remotes**. Estos son otros
repositorios a los que puedes acceder para añadir cambios (_push_) para que los
demás lo vean y recibir actualizaciones (_pull_) del resto de desarolladores.

Puedes pensarlo básicamente como un marcador a un repositorio distinto al que
le envias y recibes cambios.

Para añadir uno usa:

```sh
git remote add nombre URL
```

<!-- TODO: origin y upstream -->

Resumen de comandos:

```sh
git remote -v                 # Listar los remotos del repo
git remote add nombre> <URL # Añadir remoto
git remote set-url nombre> <nueva-URL # Cambia la dirección
git remote rename <nombre> <nuevo-nombre> # Cambia el nombre del remoto
git remote remote nombre    # Eliminar remoto
```

Comunicación con el remoto:

```sh
git push
git clone
git pull
git fetch
```

Fuente: [StackOverflow](https://stackoverflow.com/questions/20889346/what-does-git-remote-mean)


# Sub módulos (repositorio dentro de otro)

- `git submodule add url` : añade un submódulo
- `git submodule init` : inicia el submódulo tras clonar el repositorio original
- `git submodule update` : actualiza (clona) los submódulos iniciados


# Más comandos

## `git rm`

```sh
git rm archivo
# Equivalente a
rm archivo
```

Simplemente elimina el archivo dado (siempre y cuando no fuese modificado ni
añadido, lo que lo hace equivalente al comando `rm`. Pero tiene algunas opciones
interesantes:

- `--cached`: quita el archivo de la _Staging Area_ y lo deja como si fuese
  eliminado, pero el archivo todavía está en el disco.
- `--dry-run` `-n`: no aplica los cambios, solo muestra el efecto
- `--force` `-f`: borra el archivo aunque tenga cambios
- `-r`: borra recursivamente

## `git mv`

Git no rastrea explícitamente los cambios de nombre en los archivos, pero es lo
suficientemente listo como para darse cuenta de cosas de este estilo:

```sh
mv README.md README.txt
git rm README.md
git add README.txt
```

Pero resulta más cómodo usar directamente `git mv <archivo>`.


# Resumen

{{< block "Nota" >}}
Algunos de estos comandos incluyen el argumento `--dry-run` o `-n`, que
realmente no aplica los cambios, pero muestra el efecto si realmente se hubiese
realizado.
{{< /block >}}


{{< keyvalue title="La ayuda" >}}
-% `git help` :% Muestra algunos subcomandos
-% `git help <comando>` o `man git-<comando>`:% Muestra el manual del subcomando
{{< /keyvalue >}}


{{< keyvalue title="Creación" >}}
-% `git init` :% Crea un nuevo repositorio en la carpeta
-% `git init -b <rama>` :% Crea un nuevo repositorio con el nombre de la rama
-% `git clone <link>` :% Descarga un repositorio desde el link dado
{{< /keyvalue >}}


{{< keyvalue title="`git status`" >}}
-% `git status` :% Muestra el estado actual del repositorio
-% `git status -s` :% Estado del repositorio en formato corto
-% `git status -sb` :% Estado del repositorio y la rama actual en formato corto
{{< /keyvalue >}}

{{< keyvalue title="`git log`" >}}
-% `git log <archivo>`                   :% Muestra los cambios del archivo
-% `git log -p`                          :% Muestra los cambios de cada commit (_diff_)
-% `git log --relative-date`             :% Usa la fecha relativa (hace X tiempo)
-% `git log --name-only`                 :% Muestra el nombre de los archivos modificados
-% `git log --name-status`               :% Muestra el nombre de los archivos modificados y si fueron modificados, añadidos, etc
-% `git log -<numero>`                   :% Muestra solo los últimos `<numero>` commits
-% `git log --oneline`                   :% Muestra los commits solo en una línea
-% `git log --decorate --online --graph` :% Muestra los commits usando ASCII Art
-% `git log --stat`                      :% Muestra cuantos cambios se hicieron en el commit
-% `git log --shortstat`                 :% Muestra cuantos cambios se hicieron en el commit de forma abreviada
-% `git log --pretty=format:"<formato>"` :% Usa un formato dado para mostrar los commits
{{< /keyvalue >}}


{{< keyvalue title="Cambios" >}}
-% `git add <archivo>`             :% Prepara el archivo para crear un cambio
-% `git add -i`                    :% Abre una consola interactiva para añadir archivos
-% `git add -p [<archivo>]`        :% Decide qué cambios se añaden uno a uno
-% `git commit`                    :% Guarda los cambios en el histórico y abre el editor para dar una descripción
-% `git commit -a`                 :% Guarda los cambios de todos los archivos con seguimiento
-% `git commit -m "<descripción>"` :% Guarda los cambios dada la descripción
-% `git commit -t <plantilla>`     :% Guarda los cambios con la plantilla de descripción dada
-% `git commit -p`                 :% Guarda los cambios de seleccionándolos uno a uno (como `git add -p`)
{{< /keyvalue >}}


{{< keyvalue title="Deshacer cambios" >}}
{{< /keyvalue >}}


{{< keyvalue title="Ramas" >}}
-% `git branch <nombre-rama>` :% Crea una rama
-% `git branch -d <nombre-rama>` :% Borra la rama
-% `git branch` :% Muestra las ramas y en cuál estás
-% `git branch -a` :% Muestra todas las ramas (incluyendo remotos)
-% `git switch <nombre-rama>` :% Cambia de rama
-% `git merge <nombre-rama>` :% Combina la rama actual con la dada
{{< /keyvalue >}}


{{< keyvalue title="Remotos" >}}
{{< /keyvalue >}}

{{< keyvalue title="Más comandos" >}}
-% `git rm <archivo>`:% Elimina el archivo como con `rm archivo`
-% `git rm --cached <archivo>`:% Hace como si se eliminase el archivo, pero
todavía existe en disco.
-% `git rm -f <archivo>` :% Borra el archivo aunque tenga cambios
-% `git rm -r <directorio>` :% Borra el directorio recursivamente
-% `git mv <archivo> <nuevo-nombre>` :% Renombra el archivo
{{< /keyvalue >}}


{{< keyvalue title="Configuración del usuario" >}}
-% `git config --list` :% Muestra la configuración actual (`~/.gitconfig`)

-% `git config --global -e` :% Edita la configuración actual en el editor

-% `git help config` :% Muestra toda las opciones de configuración posibles
    (busca `Variables`)

-% `git config --global user.username "<usuario>` :% Almacena el nombre de
    usuario para los commits

-% `git config --global user.email "<email>"` :% Almacena el email del usuario
    para los commits

-% `git config --global core.editor "<comando-editor>"` :% Configura qué editor
    se va a usar para editar los commits.

-% `git config --global core.autocrlf <valor>` :%
- `input`: Recomendado para Mac/Linux (usan `LF`)
- `true`: Recomendado para Windows (usa `CR LF`)
{{< /keyvalue >}}

