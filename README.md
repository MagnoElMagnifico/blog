[![Netlify Status][nt-status]][nt-deploy]

[nt-status]: https://api.netlify.com/api/v1/badges/f5780fca-8fa1-4eb6-a8ff-1d8ca6821311/deploy-status
[nt-deploy]: https://app.netlify.com/sites/magnoblog/deploys

# Magno Blog

Este es el código de [mi web personal](https://magnoblog.netlify.com), publicada
en los servidores de [Netlify](https://netlify.com) utilizando el generador de
sitios estáticos [Hugo](https://www.gohugo.io).

El HTML, CSS y JS los he creado yo, no esto usando ningún _tema_. Esta es la
estructura:

<!-- TODO: Update -->

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


# Mejoras

Plantillas, HTML, CSS, JS

- Probar si aparecen las descripciones en las previsualizaciones de los links
- Mejorar el _footer_ en las páginas cortas
- Convertir todos los nombres a español?

-----------------------------------------------------------

Drafts:

- C: General
- C++: básico, OpenGL
- C#
- Java
- Otros langs: paradigmas, shaders
- Linux: arch-install, bash, files, raspberry, man-whatis
- Windows: configuración, Powershell
- Tools: nvim-config, package-managers (choco, apt, pacman)
- Network
- Unix

-----------------------------------------------------------

Expandir, pero decente:

- C: \_index
- C++: \_index, debug, setup (tutorial FreeCodeCamp C++)
- Langs: \_index (completar TODOs, actualizar, indicar usos para algunos _langs_)
- Python-setup (pip en detalle)
- Win-comandos
- Rust:
    - \_index,
    - cargo-docs-crates (video lightsaber),
    - errores (crate LGR errores),
    - macros (derive etc),
    - wasm (testear)

-----------------------------------------------------------

TODOs sin importancia

- C++: CMake
- Rust: \_index (resolver quejas contra Rust, datos de su web, etc)
- Rust: memoria (revisar)
- Javascript (revisar)
- Linux: \_index (resolver TODOs)
- Linux: filesystem (comparación con Windows, inodos?)
- Tools: \_index (???)
- Tools: git-github (expandir: aprender más git)


# Nuevas características

- Imagen con link para verla o hacer clic para ampliar, de diferentes tamaños
    - `onclick="window.open(this.src)"`
    - Imágenes con link: <https://gohugo.io/templates/render-hooks/>

- Animaciones CSS
    - Animación de HOME: varios generaciones de código a la vez
    - Para la descripción del Blog: <https://codepen.io/kazed972/pen/bQOQGR>
    - Matrix: <https://codepen.io/syropian/pen/bLzAi>
    - Terminal: <https://codepen.io/Tbgse/pen/dYaJyJ>
    - Glitch: <https://codepen.io/elisabethdiang/pen/WNbBxXq>

- Robots.txt (?)
- Taxonomies -> Pagination -> Feed (?)
- Sitemap (?)


# Links

- [Iconos de Google](https://fonts.google.com/icons)
- [CSS media sizes](https://stackoverflow.com/questions/25211090/how-to-auto-adjust-the-div-size-for-all-mobile-tablet-display-formats)
