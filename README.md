[![Netlify Status](https://api.netlify.com/api/v1/badges/f5780fca-8fa1-4eb6-a8ff-1d8ca6821311/deploy-status)](https://app.netlify.com/sites/magnoblog/deploys)

# Magno Blog

Este es el código de [mi web personal](https://magnoblog.netlify.com), publicada
en los servidores de [Netlify](https://netlify.com) utilizando el generador de
sitios estáticos [Hugo](https://www.gohugo.io).

El HTML, CSS y JS los he creado yo, no esto usando ningún _tema_. Esta es la
estructura:

```
                      ┌──────────────┐        ┌───────────────────┐             ┌──────────┐
                      │ partials     ╠════════╣ baseof.html       ╠═════════════╣ base.css │
                      ├──────────────┤        ├───────────────────┤             └──────────┘
                      │ social-media │        │ » head            │
                      │ page-entry   │        │    ├─ metadata    │
                      └──────────────┘        │    ├─ styles      │
                                              │    └─ fonts       │
                                              │ » body            │
                                              │    ├─ intro       │
                                              │    ├─ header      │
                                           ╔══╣▒▒▒▒├─ main ▒▒▒▒▒▒▒│
                                           ║  │    └─ footer      │
                                           ║  │ » scripts         │
                                           ║  └───────────────────┘
                                           ║
           ╔═════════════════════╦═════════╩═════════╦════════════════════╗
           ║                     ║                   ║                    ║
┌──────────╩──────────┐  ┌───────╩────────┐  ┌───────╩───────┐  ┌─────────╩─────────┐
│ home.html           │  │ list.html      │  │ single.html   │  │ 404.html          │
├─────────────────────┤  ├────────────────┤  ├───────────────┤  ├───────────────────┤
│ » #animation #start │  │ » .main-title  │  │ » .main-title │  │ » #not-found      │
│    └─ animation.js  │  │ » article      │  │ » .toc        │  │    └─ .main-title │
│ » #about            │  │ » .categories  │  │ » article     │  └───────────────────┘
│    └─ .social_media │  │ » .post        │  └───────╦───────┘
│ » #portfolio        │  └───────╦────────┘          ║
│    ├─ .project      │          ║                   ║
│    ├─ .project      │          ║                   ║
│    └─ ...           │          ╚═════════╦═════════╝
│ » #portfolio        │                    ║
│ » #blog             │                    ║
│    └─ .entry        │                    ║
└──────────╦──────────┘                    ║
           ║                               ║
     ┌─────╩─────┐                   ┌─────╩─────┐
     │ home.css  │                   │article.css│
     └───────────┘                   ├───────────┤
                                     │ » .info   │
                                     │ » code    │
                                     │ » table   │
                                     │ » quote   │
                                     └───────────┘
```

TOC a la derecha en pantallas grandes
TOC al principio en móvil

CSS Medias

-  320px —  480px: móvil
-  481px —  768px: tablet
-  769px — 1024px: portátil
- 1025px - 1200px: escritorio
- 1201px - infinito: TV

# TODOs

## Posts

General:

- Usar más imágenes: onclick="window.open(this.src)" https://gohugo.io/templates/render-hooks/ (imagenes con link)
- Usar más etiquetas `<meta>`: palabras clave...
los header separados del texto, respetar los parrafos

Mover + convertir todos los nombres a español?
- c/SOs -> content/SOs/{Linux, Windows} (?)
- rust/usos -> rust/\_index (?)
- javascript -> javascript-render
- python-setup -> python-setup-libs

- Añadir descripciones y fechas

-----------------------------------------------------------

Drafts:

- !prog: HTML, CSS, Regex, YAML
- C: General
- C++: básico, OpenGL
- C#
- Java
- Otros langs: paradigmas, shaders
- Linux: arch-install, bash, files, raspberry, man-whatis
- Windows: configuración, Powershell
- Tools: nvim-config, package-managers (choco, apt, pacman)
- Network

-----------------------------------------------------------

Expandir, pero decente:

- C: \_index
- C++: \_index, debug, setup (tutorial FreeCodeCamp C++)
- Langs: \_index (completar TODOs, actualizar, indicar usos para algunos _langs_)
- Python-setup (pip en detalle)
- Win-comandos
- Rust:
  \_index,
  cargo-docs-crates (video lightsaber),
  errores (crate LGR errores),
  macros (derive etc),
  wasm (testear)

-----------------------------------------------------------

TODOs sin importancia

- Cpp: cmake
- Rust: \_index (resolver quejas contra Rust, datos de su web, etc)
- Rust: memoria (revisar)
- Javascript (revisar)
- Linux: \_index (resolver TODOs)
- Linux: filesystem (comparación con Windows, inodos?)
- Tools: \_index (???)
- Tools: git-github (expandir: aprender más git)

## Mejoras

- Crear una cabecera para moverme entre categorías.
  - Leer el nombre de las subcarpetas/subsections
  - Generarla desde base.html? Todas las páginas del blog deberían tener la
    cabecera, al igual que el footer

- index.html: añadir botón para listar todo

- Probar si aparecen las descripciones en las previsualizaciones de los links
- Revisar la página desde el móvil
- Mejorar el _footer_ en las páginas cortas
- Mejorar los divisores con `-----`
- Escalar las tablas en dispositivos pequeños

## Nuevas características

- imagen con link para verla o hacer clic para ampliar

- Transiciones / animaciones CSS
  - Para la descripción del Blog: <https://codepen.io/kazed972/pen/bQOQGR>
  - Matrix: <https://codepen.io/syropian/pen/bLzAi>
  - Terminal: <https://codepen.io/Tbgse/pen/dYaJyJ>
  - Glitch: <https://codepen.io/elisabethdiang/pen/WNbBxXq>

- Imágenes de diferentes tamaños
- Robots.txt
- Taxonomies -> Pagination -> Feed
- Sitemap

# Links

- [Tera Lang docs](https://tera.netlify.app/docs/)
- [Zola docs](https://www.getzola.org/documentation/getting-started/overview/)
- [Iconos de Google](https://fonts.google.com/icons)
- [CSS media sizes](https://stackoverflow.com/questions/25211090/how-to-auto-adjust-the-div-size-for-all-mobile-tablet-display-formats)
