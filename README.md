[![Netlify Status][nt-status]][nt-deploy]

[nt-status]: https://api.netlify.com/api/v1/badges/f5780fca-8fa1-4eb6-a8ff-1d8ca6821311/deploy-status
[nt-deploy]: https://app.netlify.com/sites/magnoblog/deploys

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
                      │ latex        │        │    ├─ styles      │
                      └──────────────┘        │    └─ fonts       │
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
│ » #animation #start │  │ » .main-title  │  │ » .main-title │  │ » custom styles   │
│    └─ animation.js  │  │ » article      │  │ » .toc        │  │ » #not-found      │
│ » #about            │  │ » nav          │  │ » article     │  │    └─ .main-title │
│    └─ .social_media │  │ » .blog-entry  │  │ » .prev-next  │  └───────────────────┘
│ » #portfolio        │  └────────────────┘  └───────────────┘
│    ├─ .project      │
│    ├─ .project      │
│    └─ ...           │
│ » #portfolio        │
│ » #blog             │
│    └─ .entry        │
└──────────╦──────────┘
           ║
     ┌─────╩─────┐
     │ home.css  │
     └───────────┘
```

# Formatos

- [x] Negrita, itálica
- [x] Uso de LaTeX para expresiones matemáticas
- [x] Código en línea
- [x] Código en bloque
- [x] Citas
- [x] Bloques: notas, observaciones, teoremas, definiciones, etc
- [x] Enumeraciones
- [x] Listas
- [x] Tablas
- [x] Desplegables

## Notas sobre Markdown

Combinaciones especiales que convierten caracteres ASCII a tipográficos:

- `--`, `---`
- `'`, `"`, `<<`, `>>`
- `...`
- Entre `::` se pueden especificar emojis, por ejemplo `:warning:` ([referencia]).

[referencia]: https://www.webfx.com/tools/emoji-cheat-sheet/

------------------------------------------------------------

Listas con párrafos muy largos: cada punto es un párrafo, por tanto se añadirá
un margen.

```md
- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat nibh
  ex, eu convallis dolor efficitur a. Lorem ipsum dolor sit amet, consectetur
  adipiscing elit. Sed vulputate mauris non interdum posuere. Suspendisse nisl
  tellus, ultricies nec eleifend id, suscipit in mi.

- Praesent malesuada sed arcu at eleifend. Aliquam erat volutpat. Ut et mi
  magna. Nunc quis tortor ante. Integer vitae convallis augue. Pellentesque
  laoreet, dolor eu molestie porttitor, orci diam bibendum quam, non lacinia
  nisl metus nec sapien.

- Aliquam erat volutpat. Maecenas pellentesque convallis libero, at convallis
  nibh mollis non. Curabitur pretium ligula eu auctor vestibulum. 
```

Listas con párrafos cortos: no añade espacio entre los puntos

```md
- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
- Sed vulputate mauris non interdum posuere. Suspendisse nisl tellus, ultricies
  nec eleifend id, suscipit in mi.
- Aliquam feugiat nibh, eu convallis dolor efficitur a.
```

Para separar dos listas puedes usar un comentario vacio.

------------------------------------------------------------

También se pueden hacer links a modo de referencias:

```md
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat nibh
ex, eu convallis dolor efficitura [^1]. Lorem ipsum dolor sit amet, consectetur
adipiscing elit. Sed vulputate mauris non interdum posuere. Suspendisse nisl
tellus, ultricies nec eleifend id, suscipit in mi.

...

[^1]: https://example.com
```

------------------------------------------------------------

Especificando `goat` como resaltado de sintaxis en un bloque de código, puedes
dibujar diagramas usando ASCII.

```
+-------------------+                           ^                      .---.
|    A Box          |__.--.__    __.-->         |      .-.             |   |
|                   |        '--'               v     | * |<---        |   |
+-------------------+                                  '-'             |   |
                       Round                                       *---(-. |
  .-----------------.  .-------.    .----------.         .-------.     | | |
 |   Mixed Rounded  | |         |  / Diagonals  \        |   |   |     | | |
 | & Square Corners |  '--. .--'  /              \       |---+---|     '-)-'       .--------.
 '--+------------+-'  .--. |     '-------+--------'      |   |   |       |        / Search /
    |            |   |    | '---.        |               '-------'       |       '-+------'
    |<---------->|   |    |      |       v                Interior                 |     ^
    '           <---'      '----'   .-----------.              ---.     .---       v     |
 .------------------.  Diag line    | .-------. +---.              \   /           .     |
 |   if (a > b)     +---.      .--->| |       | |    | Curved line  \ /           / \    |
 |   obj->fcn()     |    \    /     | '-------' |<--'                +           /   \   |
 '------------------'     '--'      '--+--------'      .--. .--.     |  .-.     +Done?+-'
    .---+-----.                        |   ^           |\ | | /|  .--+ |   |     \   /
    |   |     | Join        \|/        |   | Curved    | \| |/ | |    \    |      \ /
    |   |     +---->  o    --o--        '-'  Vertical  '--' '--'  '--  '--'        +  .---.
 <--+---+-----'       |     /|\                                                    |  | 3 |
                      v                             not:line    'quotes'        .-'   '---'
  .-.             .---+--------.            /            A || B   *bold*       |        ^
 |   |           |   Not a dot  |      <---+---<--    A dash--is not a line    v        |
  '-'             '---------+--'          /           Nor/is this.            ---
```

## LaTeX

Se utiliza [Katex] para renderizar las fórmulas: simplemente escribe código
LaTeX entre `$` (con la opción `math` puesta a `true` en el _front matter_).
Para bloques de ecuaciones (párrafos centrados) usa `$$`. Estos [símbolos] son
los soportados.

Recuerda que en algunos casos es necesario escapar las barras:

```
\begin{align*}
    10x + 3y &=& 2 \\\\
    x - 5y &=& 8   \\\\
\end{align*}
```

[Katex]: https://katex.org
[símbolos]: https://katex.org/docs/supported.html

# Front matter

- `title`
- `description`
- `keywords`
- `draft`
- `toc`: determina si muestra una tabla de contenidos
- `weight`: peso para ordenar las diferentes páginas dentro de la sección
- `slug`: modifica el nombre de la pagina (URL)
- `math`: permite añadir fórmulas con LaTeX
- `mermaid`: permite añadir diagramas con [Mermaid].

[Mermaid]: https://mermaid.js.org


# Shortcodes

- `inlineHTML` (argumento de bloque): Inserta el HTML directamente en el
  resultado.

```md
{{< inlineHML >}}
<table>
  <tr>
    <td>Ejemplo 1</td>
    <td>Ejemplo 2</td>
  </tr>
  <tr>
    <td>Ejemplo 3</td>
    <td>Ejemplo 4</td>
  </tr>
</table>
{{< /inlineHML >}}
```

- `keyvalue` (argumento de bloque): crea una tabla de dos columnas: valor y
  descripción. Una nueva fila empieza por `-%` y la descripción por `:%`.

```md
{{< keyvalue >}}
-% Valor :% Descripción
{{< /keyvalue >}}
```

- `color` (contenido) (color CSS): permite cambiar de color un trozo de texto.

```
{{< color "test" "var(--magno-red)" >}}
{{< color "test" "#fca" >}}
{{< color "test" "yellow" >}}
```

- `block` (argumento de bloque) (nombre del bloque) (color de fondo del título)
  (color del título): crea un bloque con una cabecera y un cuerpo, perfecto
  para resaltar detalles sin tener que usar citas.

```
{{< block "Teorema" "red" "white" >}}
Si en un triángulo rectángulo hay catetos de longitud $a$, y $b$,, y la
medida de la hipotenusa es $c$, entonces se cumple la siguiente relación:

$$a^2 + b^2 = c^2$$
{{< /block >}}
```

- `dropdown`(argumento de bloque) (contenido sin esconder): crea un bloque
  clickable que muestra un contenido.

```
{{< dropdown "Haz click aquí" >}}
Holis :)
{{< /dropdown >}}
```

- `mermaid` (argumento de bloque): crea un diagrama [Mermaid] con el código
  dado. En su página puedes encontrar la [sintaxis de Mermaid] y un [editor
  visual] (la opción `mermaid` debe estar a `true` en el _front matter_).

```
{{< mermaid >}}
gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
    commit
{{< /mermaid >}}
```

[sintaxis de Mermaid]: https://mermaid.js.org/intro/
[editor visual]: https://mermaid.live/
