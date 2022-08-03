[![Netlify Status](https://api.netlify.com/api/v1/badges/f5780fca-8fa1-4eb6-a8ff-1d8ca6821311/deploy-status)](https://app.netlify.com/sites/magnoblog/deploys)

# Magno Blog
This is the code for [my personal website](https://magnoblog.netlify.com) hosted
in [Netlify](https://netlify.com) using the [Zola](https://www.getzola.org).
static site generator.

The HTML, CSS and JS were all created by me, I am not using a _theme_.

# TODOs

## Posts

- Current: content/tools/vim.md content/tools/nvim-config.md

General:
- ¿Es el changelog necesario?
- Improve descriptions
- Render `.odt` files to `.pdf` and then use the [converter](https://pdf2md.morethan.io)
  to pass it to `.md`

Drafts: 
- !prog/{html, css}
- c/general
- cpp/{basico, opengl}
- cs
- java
- paradigmas
- shaders
- linux/arch-install
- linux/bash-keybindings
- linux/bash 
- linux/files
- linux/raspberry
- tools/package-managers (choco, apt, pacman)
- network
- powershell
- ...

Expandir, pero decente:
- c/\_index
- cpp/{\_index, debug, setup (gcc clang windows, tut freecodecamp c++ etc)}
- rust/{
  \_index,
  cargo-docs-crates (video lightsaber),
  errores (crate LGR errores),
  macros (derive etc),
  wasm (testear)
}
- langs/\_index (completar TODOs, actualizar, añadir mi tier list, indicar usos para algunos _langs_)
- python-setup (pip en detalle)
- win-comandos

TODOs sin importancia
- cpp/cmake
- rust/\_index (resolver quejas contra Rust, datos de su web, etc)
- rust/memoria (revisar)
- javascript (revisar)
- linux/\_index (resolver TODOs)
- linux/filesystem (comparación con Windows, inodos?)
- tools/\_index (???)
- tools/git-github (expandir: aprender más git)

Mover + convertir todos los nombres a español?
- c/SOs -> content/SOs/{Linux, Windows} (?)
- rust/usos -> rust/\_index (?)
- javascript -> javascript-render
- python-setup -> python-setup-libs
- linux/bash-keybindings -> linux/bash
- unicode -> gist.github.com

## Mejoras

- Usar más imágenes
- Añadir descripciones y fechas
- Separar los títulos con `#` del texto

- Only show the recent blog posts, not all the content in the entry page (index.html)
  - Gather all the blog posts in a list, sort it by date and get the 5-10 first

- Crear una cabecera para moverme entre categorías.
  - Leer el nombre de las subcarpetas/subsections
  - Generarla desde base.html? Todas las páginas del blog deberían tener la cabecera, al igual que el footer

Blog style:
- Test if the description show up
- Review mobile styles
- Improve the footer in shorter pages
- Table scaling in small devices

## New features:
- Add Russian chars to the animation (?)
- CSS Transitions / Animations
  - Blog description: <https://codepen.io/kazed972/pen/bQOQGR>
  - Matrix: <https://codepen.io/syropian/pen/bLzAi>
  - Terminal: <https://codepen.io/Tbgse/pen/dYaJyJ>
  - Glitch: <https://codepen.io/elisabethdiang/pen/WNbBxXq>
- Different sized imgs
- Robots.txt
- Taxonomies -> Pagination -> Feed
- Sitemap
- Make multilingual (for now in Spanish)

# Links
- [Tera Lang docs](https://tera.netlify.app/docs/)
- [Zola docs](https://www.getzola.org/documentation/getting-started/overview/)
- [Icons from Google](https://fonts.google.com/icons)
- [CSS media sizes](https://stackoverflow.com/questions/25211090/how-to-auto-adjust-the-div-size-for-all-mobile-tablet-display-formats)
