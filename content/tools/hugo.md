---
title: Hugo SSG
description: Guía de uso de Hugo para crear una página web estática fácilmente.
date: 2022-09-05
weight: -1
draft: true
---

```bash
hugo server --bind <ip> --baseURL http://<ip> --port 8000
```

[Hugo] es un _Static Site Generator_ (SSG) escrito en Go, lo que quiere decir
que será solamente HTML, CSS y JavaScript: no incluye nada en el servidor. Para
blogs (este, por ejemplo) resulta muy útil, ya que aporta herramientas para
automatizar la generación de dicho HTML, como el uso de markdown para el
contenido de los posts. Además, al no tener que procesarse nada en el servidor,
es muy rápido.

Esto funciona creando plantillas HTML con código en Go que se extenderá el HTML
final de la página. Tareas como convertir el Markdown, crear listas de páginas,
etc. se hacen gracias a estas plantillas. Se distinguen entre varios tipos de
plantillas:

- _List pages_:
- Página principal
- Plantillas de taxonomía
- _Partials_
- Plantillas de un única página
- etc

https://discourse.gohugo.io/t/see-which-template-is-used-by-hugo/9983
https://discourse.gohugo.io/t/my-experiences-with-hugos-template-lookup-order/9959

Además, si tu objetivo no es crear una página web, sino simplemente crear
contenido; existen muchos [temas] gratis y _Open Source_ a tu disposición para que
utilices como plantillas. Sin embargo, como eso consiste solamente en leer las
instrucciones de instalación y configurar varios detalles, este post se centrará
en la creación de dichas plantillas.

Cada página/post de Hugo puede tener varias especificaciones, y como resultado
que no se termine generando:

- `publishdate` aún no pasó
- `draft: true`
- `expirydate`, fecha máxima para ver el contenido

Se puede forzar a Hugo a generar este contenido con `--buildFuture --buildDrafts
--buildExpired` o activando estas mismas opciones en la configuración.

Otra característisca es _LiveReload_ con el comando `hugo server`: cada vez que
detecta cambios en los archivos, recarga la generación para actualizar el
contenido de forma automática (`--disableLiveReload`, esta opción o `--watch=false`).

[Hugo]: https://gohugo.io
[temas]: https://themes.gohugo.io


# Instalación

La instalación es muy sencilla, puedes usar un _package manager_ o bien puedes
descargar el archivo de instalación desde la página [releases de github][install].

Fuente y más información: [Instalación de Hugo](https://gohugo.io/getting-started/installing)
[install]: https://github.com/gohugoio/hugo/releases


# Comandos

```
hugo help
```


# Estructura

- `/archetypes`: con el comando `hugo new ...` puedes crear posts nuevos de
  forma sencilla. En esta carpeta se guardan plantillas para estos posts.

- `/assets`: guardan archivos que serán procesadas con _Hugo Pipes_.

- `/config`: configuración del sitio (`JSON`, `YAML` o `TOML`) dado que hay
  muchas [opciones] disponibles. Sitios más minimalistas y que no necesiten
  detectar su entorno (variables de entorno?) pueden guardar su configuración
  directamente en `/config.toml`.

- `/content`: contenido del blog. Cada una de las subcarpetas serán secciones,
  por ejemplo: `/content/langs`, `/content/linux` y `/content/tools` darán lugar
  a las secciones _langs_, _linux_ y _tools_.

- `/data`: más archivos de configuración y _data templates_.

- `/layouts`: guarda las plantillas en `.html` que definirán la estructura de tu
  sitio.

- `/static`: archivos estáticos de tu página, como iconos, CSS y JavaScript.
  También se puede usar para verificar el sitio para _Google Search Console_.
  Es decir, estos archivos no se procesan.

- `/resources`: estos archivos sí necesitan procesamiento, como SASS.

- `/public`: carpeta de destino de los archivos generados, es decir, la página
  completa en HTML (se puede cambiar esta dirección).

[opciones]: https://gohugo.io/getting-started/configuration/#all-configuration-settings

<!-- TODO: https://gohugo.io/content-management/ -->


# Plantillas

Las plantillas de Go son simplemente archivos de HTML con variables y funciones,
que son accesibles entre `{{ }}`.

- `.Var`: acceder a variable ya existente (creada por Hugo?)
- `$var`: acceder a una variable propia
- `.Var.method`: acceder a métodos

- `funtion arg1 arg2 ...`: llamar a una función (eg: `add 1 2`)

Comentario

```
<!-- Comentario HTML -->
<!-- Comentario HTML -->
{{/* Comentario de Hugo */}}
```

Variables

```
{{/* */}}
{{ $address := "123 Main St." }}
<h1>{{ $address }}</h1>

```


## Partials

Para evitar tener que repetir todo el HTML de una página, puedes crear
`partials`, que son fragmentos de HTML que se pegarán en determinado sitio.

`layout/partials/name.html`

```html
<h1>partial test</h1>
```

```
{{ partial "name" scope }}
```

scope son las variables a las que tendra acceso el partial. si le pasas un `.` tendra acceso a todo, pero si le pasas una variable, solo tendra acceso a esa y a sus metodos/subtipos etc

```
<h1> {{.name}} </h1>
```
```
{{ partial "name" (dict "name" "value" "name2" "value2" ... }}
```


# a

Dos tipos de contenidos:
- List pages: mostrar una lista de single pages y sub list pages: list.html
    - Section pages: sobre escribe list.html para variar la plantilla para determinada seccion: `default/section-name/section.html`
    - Home page: sobre escribe list.html para la pagina principal: index.html
- Single pages: muestra una página, el contenido propiamente

Estructura de archivos:

- layouts
    - `_default`   /// no es necesario
        - list.html
        - single.html
        - baseof.html    // base del resto de html
    - `partials`

los bloques aparecen definidos en una base (baseof.html) y se puede añadir contenido despues dependiendo el contexto: list single-page. evita copiar-pegar html que se repite

```
{{ block "name" . }}
  {{ defaults }}
{{end}}
```

Usar el bloque

```
{{ define "name" }}
  ...
{{ end }}
```


## Taxonomias

Categorias
Etiquetas

Formas de clasificar las paginas

```
---
tags: ["tag1", "tag2"...]
categories: ["cat1"]
---
```

Se podra crear un link a una list page mostrando las single pages de la misma tag/categoria

Custom taxonomy

```
---
moods: ["abc", "bcd"]
---
```

exite moods o se lo invento el pibe este?


## config

```toml
baseUR = "..."
languageCode = "..."
title = "..."
theme = "..."

[taxonomies]
# singular - plurar
tag = "tags"
category = "categories"
mood = "moods"
```

puedes seperar la configuracion en varios archivos dentro de `config`
cada archivo representa una configuracion:

```toml
# config.toml
[Params]
foo = "bar"
```

pero se puede poner como

```toml
# config/params.toml
foo = "bar"
```

configuracion extra en `data`


# frontmatter /meta data

dan infromacion sobre el contenido, se puede usar TOML(+++), YAML (---) y JSON ({})

```
---
title: ...
date: ...
property: value
---
```

se pueden usar valores custom, todos los q quieras

se guardan en la variable `.Params`
