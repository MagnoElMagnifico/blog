---
title: SVG
description: >
    Guía básica para crear tus propios SVGs

date: 2023-05-23T14:40:37+02:00
weight: -1
draft: true
---

# SVG

SVG son las siglas de _Scalable Vector Graphics_ y mediante el formato [XML]
(texto, no binario) define el contenido de una imagen en 2D.

A diferencia de las imágenes convencionales (mapas de bits o _bitmaps_), donde
se almacenan los colores de cada pixel; en una imagen vectorial se describen
las formas, posiciones y colores de cada una de ellas. Por tanto, será
responsabilidad del software que represente la imagen darle los colores cada
uno.

Otra consecuencia interesante es que estas imágenes se pueden escalar sin
perder calidad (por tanto imprimir a cualquier resolución), se pueden indexar y
buscar por su contenido, comprimir, etc.

En lugar de crear los SVGs a mano (lo que puede ser bastante complejo,
dependiendo de cada imagen), es recomendable utilizar una herramienta como
[Inkscape].

[Inkscape]: https://inkscape.org/es/
[XML]: {{< relref "xml" >}}


# Características

SVG soporta:

- Imágenes con metadatos
- Pueden ser interactivos (con JavaScript)
- Estilos con CSS
- Animaciones
- Compresión con gzip (`SVGZ`): típicamente 20-50% más pequeños que el tamaño
  original.

Tres tipos de objetos gráficos:

- Gráficos vectoriales: líneas rectas y curvas, figuras, etc
- Bitmaps
- Texto

Se pueden agrupar, darles estilo (CSS), transformarlas...


# SVG base

```svg
<!-- Especifica la versión de XML y codificación del archivo -->
<?xml version="1.0" encoding="UTF-8"?>

<!-- xmlns y xmlns:xlink son opcionales, pero no se reconoce en Firefox como SVG -->
<svg width="100" height="100"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">

    <!-- Descripción del contenido: figuras, colores, etc -->
</svg>
```

# Formas básicas

{{< keyvalue >}}
-% `<rect>` :% Rectángulo
-% `<circle>`:% Círculo
-% `<ellipse>`:% Elipse
-% `<line>`:% Line
-% `<polyline>`:% Línea poligonal
-% `<polygon>`:% Polígono (línea poligonal cerrada)
-% `<path>`:% "Camino"
-% `<text>`:% Texto
{{< /keyvalue >}}

```html
<rect x="10" y="10" width="200" height="150"/>
```


```svg
<svg width="500" height="500" style="background-color:white">
    <rect x="10" y="10" width="200" height="150"
        fill="hsl(0 90% 50%)"/>

    <circle cx="150" cy="150" r="70"
        fill="hsl(30 90% 50%)"/>

    <ellipse cx="230" cy="230" rx="100" ry="50"
        fill="hsl(50 90% 50%)"/>

    <line x1="0" y1="500" x2="500" y2="0"
        stroke="hsl(120 90% 50%)" stroke-width="6"/>

    <polyline points="0,0 0,100 100,100 100,200 200,200 200,300 300,300 300,400 400,400 400,500"
        fill="None" stroke="hsl(180 90% 50%)" stroke-width="6"/>

    <polygon  points="0,400 100,300 200,400 300,300 400,400 500,300 500,400"
        fill="hsl(270 90% 50%)"/>

    <text x="200" y="450" fill="hsl(300 90% 50%)" font-size="40">
        Magno Blog
    </text>
</svg>
```

{{< inlineHTML >}}
<svg width="500" height="500" style="background-color:white">
    <rect     x="10"   y="10" width="200" height="150" fill="hsl(0 90% 50%)"/>
    <circle  cx="150" cy="150" r="70"                  fill="hsl(30 90% 50%)"/>
    <ellipse cx="230" cy="230" rx="100" ry="50"        fill="hsl(50 90% 50%)"/>
    <line    x1="0"   y1="500" x2="500" y2="0"     stroke="hsl(120 90% 50%)" stroke-width="6"/>
    <polyline points="0,0 0,100 100,100 100,200 200,200 200,300 300,300 300,400 400,400 400,500"
        fill="None" stroke="hsl(180 90% 50%)" stroke-width="6"/>
    <polygon  points="0,400 100,300 200,400 300,300 400,400 500,300 500,400"
        fill="hsl(270 90% 50%)"/>
    <text x="200" y="450" fill="hsl(300 90% 50%)" font-size="40">Magno Blog</text>
</svg>
{{< /inlineHTML >}}

Nótese que los objetos se renderizan de arriba a abajo, por tanto, las figuras
del final se colocarán por encima del las figuras definidas al principio.

# Parámetros

## Colores

Existen varias formas de especificar los colores (al igual que en CSS):

- En **hexadecimal**: `#AABBCCDD`. Si se repiten, se puede reducir a `#ABCD`.
    - `AA`: representan la componente roja (R).
    - `BB`: representan la componente verde (G).
    - `CC`: representan la componente azul (B).
    - `DD`: representan el alfa o la opacidad (A). Esta es opcional

- En **decimal**: `rgb(r g b)` o `rgba(r g b a)`
    - `r`, `g`, `b`: componentes del color en decimal de 0 a 255 (ambos inclusive).
    - `a`: alfa o opacidad, que es un número de 0 a 1. Opcional, por defecto a 1.

- `hsl(h s% l%)` o `hsla(h s% l% a)`: _hue_ (0 a 359), _saturation_ y _lightness_.
- Usando [colores predeterminados]: `red`, `blue`, `orange`...

Puedes usar el [Color Picker de Mozilla].

[colores predeterminados]: https://www.w3schools.com/cssref/css_colors.php
[Color Picker de Mozilla]: https://mdn.github.io/css-examples/tools/color-picker/

Los colores se pueden especificar en todas la figuras con los siguientes
atributos.

- Color de línea: `stroke`
- Color de relleno: `fill`

## Tamaños

Se disponen de las mismas unidades que en CSS:

**Absolutas**: siempre miden los mismo

- Si no se especifica, se toma por defecto en pixels (`px`). Nótese que
  estos son relativos al dispositivo, dado que pueden tener menores
  resoluciones.
- `cm`: centímetros
- `mm`: milímetros
- `in`: pulgadas (1in = 96px = 2.54cm)
- `pt`: puntos (1in = 1/72in)

**Relativas**:

- `em`: tamaño de fuente del elemento (`2em` significa 2 veces la fuente del elemento)
- `rem`: tamaño de fuente del elemento raíz
- `ch`: ancho del caracter `0`
- `vw`: 1% del ancho del viewport
- `vh`: 1% del alto del viewport
- `%`: relativo al elemento padre


# Referencias

- [Wikipedia]
- [W3Schools]
    - [Unidades] de CSS
- [Mozilla Web Docs]
    - [Colores] de CSS

[Wikipedia]: https://en.wikipedia.org/wiki/SVG
[W3Schools]: https://www.w3schools.com/graphics/svg_intro.asp
[Unidades]: https://www.w3schools.com/cssref/css_units.php
[Mozilla Web Docs]: https://developer.mozilla.org/en-US/docs/Web/SVG/
[Colores]: https://developer.mozilla.org/es/docs/Web/CSS/color


