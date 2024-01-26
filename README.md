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

- Código en línea y bloque con resaltado de sintaxis
- Listas y enumeraciones
- Tablas
- Uso de LaTeX para expresiones matemáticas
- Diagramas con [Mermaid] y [GoAT]
- Bloques: notas, observaciones, teoremas, definiciones, etc
- Desplegables

# Notas sobre Markdown

Hugo utiliza [goldmark], y en combinación con mi CSS personalizado, hay algunos
matices a tener en cuenta al escribir artículos en MarkDown para magnoblog.

Combinaciones especiales que convierten caracteres ASCII a tipográficos:

- `--`, `---`
- `'`, `"`, `<<`, `>>`
- `...`
- Entre `:` se pueden especificar emojis, por ejemplo `:warning:` ([referencia],
  [referencia oficial]).
- Para crear un salto de línea se puede usar `<br>` o dos espacios en blanco al
  final de la línea.

Si se separa cada elemento de una lista con líneas en blanco, se considera cada
uno un párrafo diferente, lo que implica varios `<p>`. Estos tienen un margen,
por lo que se añade un espacio entre cada uno. **Ideal para elementos con mucho
texto**.

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

Si no hay espacios entre los elementos, se considera todo un párrafo y no se
añade separación:

```md
- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
- Sed vulputate mauris non interdum posuere. Suspendisse nisl tellus, ultricies
  nec eleifend id, suscipit in mi.
- Aliquam feugiat nibh, eu convallis dolor efficitur a.
```

Para separar dos listas solamente en un punto en concreto puedes usar un
comentario vacio.

También se pueden hacer links a modo de referencias:

```md
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat nibh
ex, eu convallis dolor efficitura [^1]. Lorem ipsum dolor sit amet, consectetur
adipiscing elit. Sed vulputate mauris non interdum posuere. Suspendisse nisl
tellus, ultricies nec eleifend id, suscipit in mi.

...

[^1]: https://example.com
```

# Diagramas

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

# LaTeX

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

# Front matter

- string `title` (obligatorio)
- int `weight`: peso para ordenar las diferentes páginas dentro
  de la sección
- string `description`
- string[] `keywords`
- boolean `draft`
- boolean `toc`: determina si muestra una tabla de contenidos
- boolean `math`: permite añadir fórmulas con LaTeX
- boolean `mermaid`: permite añadir diagramas con [Mermaid].

# Shortcodes

## `arrow`

Renderiza una flecha en el texto. No necesita argumentos. También se puede usar
de la siguiente forma (los `·` denotan un espacio en blanco):

```
- Ejemplo de lista··
  {{< arrow >}} Consecuencia 1··
  {{< arrow >}} Consecuencia 2··
  {{< arrow >}} Consecuencia 3
```

Está implementado con el tipo de fuente [Fira Code] usando ligaduras, por lo que
si se copia y pega, el resultado será `==>`.

## `inlineHTML`

Inserta el HTML directamente en el resultado. **Deprecated**: ahora se puede
usar HTML directamente sobre el Markdown.

- Argumento de bloque (obligatorio)

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

## `keyvalue`

Crea una tabla de dos columnas: valor y descripción. Una nueva fila empieza por
`-%` y la descripción por `:%`.

- Argumento de bloque (obligatorio)
- string `title`: título de la tabla
- string `key` `value`: título de la primera y segunda columna respectivamente.
  No se puede combinar con `title`, en ese caso, se usará el valor de `title`
- boolean `key-header` si es `true`, formatea la columna de las claves como la
  cabecera.
- boolean `fill`: si es `true`, la tabla rellena todo es espacio horizontal
  disponible

```md
{{< keyvalue >}}
-% `Valor` :% Descripción
{{< /keyvalue >}}
```

## `color`

- string (obligatorio): contenido a cambiar de color
- color CSS (obligatorio): color deseado. Se pueden usar variables CSS definidas en el estilo
  base para utilizar la misma paleta: `--magno-red`, `--magno-blue`,
  `--magno-green`, `--magno-yellow`, `--magno-purple`, `--magno-orange`.

```
{{< color "test" "var(--magno-red)" >}}
{{< color "test" "#fca" >}}
{{< color "test" "yellow" >}}
```

## `block`

Crea un bloque con una cabecera y un cuerpo, perfecto para resaltar detalles sin
tener que usar citas.

Se pueden crear links a estos bloques: la dirección usada es el nombre en
minúsculas con guiones en lugar de espacios con el prefijo `block`. Se eliminan
signos de puntuación. Por ejemplo: `Memoria Virtual (MV)` es
`block-memoria-virtual-mv`.

- string (obligatorio): título del bloque
- color CSS: color de fondo para el título. Por defecto es `--magno-green`
- color CSS: color de la fuente por si fuese necesario mejorar el contraste
- Argumento de bloque (obligatorio): contenido del bloque

```
{{< block "Teorema" "red" "white" >}}
Si en un triángulo rectángulo hay catetos de longitud $a$ y $b$, y la
medida de la hipotenusa es $c$, entonces se cumple la siguiente relación:

$$ a^2 + b^2 = c^2 $$
{{< /block >}}
```

## `dropdown`

Crea un bloque clickable que muestra un contenido previamente escondido.

- string: título del bloque
- argumento de bloque (obligatorio) (contenido sin esconder): 

```
{{< dropdown "Haz click aquí" >}}
Holis :)
{{< /dropdown >}}
```

## `mermaid`

Crea un diagrama [Mermaid] con el código dado. En su página puedes encontrar la
[sintaxis de Mermaid] y un [editor visual]. Para poder usar esto, la opción
`mermaid` debe estar a `true` en el _front matter_.

- color CSS `bg-color`: color de fondo del diagrama
- Argumento de bloque (obligatorio)

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

Alternativamente puedes usar un bloque de código:

    ```mermaid
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
    ```

[Fira Code]: https://github.com/tonsky/FiraCode
[GoAT]: https://github.com/bep/goat
[Katex]: https://katex.org
[Mermaid]: https://mermaid.js.org
[editor visual]: https://mermaid.live/
[goldmark]: https://github.com/yuin/goldmark/
[referencia oficial]: https://gohugo.io/quick-reference/emojis/
[referencia]: https://www.webfx.com/tools/emoji-cheat-sheet/
[sintaxis de Mermaid]: https://mermaid.js.org/intro/
[símbolos]: https://katex.org/docs/supported.html
