---
title: JavaScript Rendering
weight: 6
---

# Canvas

Primero, debemos crear un `HTML5 Canvas` con

```html
<canvas id="..." width="..." height="..."></canvas>
```

Y lo obtenermos desde JavaScript por su `id`, además de obtener el `ctx`:

```js
const canvas = document.getElementById("...");
const ctx = canvas.getContext("2d"); // También se puede usar OpenGL

// document.addEventListener("DOMContentLoaded", init);
```

Para comenzar a dibujar cosas en el canvas tenemos que iniciar una forma:

```js
ctx.beginPath();
ctx.closePath();

// Estilos
ctx.strokeStyle = "cualquier css color válido"; // "red", "blue", "rgba(...)"
ctx.fillStyle = "cualquier css válido";
ctx.lineWidth = n;

globalAlpha
lineCap
lineJoin
miterLimit
lineDashOffset
shadowOffsetX
shadowOffsetY
shadowBlur
shadowColor
globalCompositeOperation
font
textAlign
textBaseline
direction
imageSmoothingEnabled

ctx.fill(); // Rellena la figura desde ctx.beginPath()
ctx.stroke(); // Dibuja los bordes de la figura desde ctx.beginPath()

// Figuras
ctx.rect(x, y, w, h); // Réctangulo

arc(x, y, radio, start_angle, end_angle, sentido?);

ctx.moveTo(x, y);
ctx.lineTo(x, y);

ctx.strokeRect(x, y, w, h); // Rectángulo con bordes
ctx.fillRect(x, y, w, h); // Rectángulo relleno

// Texto
ctx.strokeText("...", x, y);
ctx.fillText("...", x, y);
ctx.measureText("..."); // width of text
```

A la hora de dibujar, los pasos son los siguientes:

- Estilo (opcional)
- `ctx.beginPath()`
    - MoveTo
    - LineTo
    - ClosePath
- Dibujar la figura con `fill()` o `stroke()`

Para evitar estar definiendo constantemente los colores, podemos usar:

```js
ctx.save(); // Guarda la configuración actual
ctx.restore(); // Carga la configuración guardada
```

# SVG

[SVG Tutorial](https://www.w3schools.com/graphics/svg_intro.asp)
