[![Netlify Status](https://api.netlify.com/api/v1/badges/f5780fca-8fa1-4eb6-a8ff-1d8ca6821311/deploy-status)](https://app.netlify.com/sites/magnoblog/deploys)

# Magno Blog
Este es el código de [mi web personal](https://magnoblog.netlify.com), publicada 
en los servidores de [Netlify](https://netlify.com) utilizando el generador de
sitios estáticos [Zola](https://www.getzola.org).

El HTML, CSS y JS los he creado yo, no esto usando ningún _tema_.

# TODOs

## Posts

- Actual: content/tools/vim.md content/tools/nvim-config.md

General:
- Mejorar descripciones
- Convertir los archivos `.pdf` a `.md` con el [convertidor](https://pdf2md.morethan.io)

Drafts: 
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
- network

- windows/config [siguiente]
- tools/package-managers (choco, apt, pacman)
- powershell
- !prog/{html, css, regex}
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
- Separar del texto los títulos con `#`

- Mostrar solo los posts recientes, no todo el contenido en la página de entrada
  (`index.html`). Una opción es crear una lista que almacene todos los posts,
  ordenarla según la fecha/fecha de actualización y coger los 5-10 primeros.

- Crear una cabecera para moverme entre categorías.
  - Leer el nombre de las subcarpetas/subsections
  - Generarla desde base.html? Todas las páginas del blog deberían tener la
    cabecera, al igual que el footer

Blog CSS:
- Probar si aparecen las descripciones en las previsualizaciones de los links
- Revisar la página desde el móvil
- Mejorar el _footer_ en las páginas cortar
- Escalar las tablas en dispositivos pequeños

## Nuevas características
- Añadir caracteres Rusos a la animación de entrada
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
