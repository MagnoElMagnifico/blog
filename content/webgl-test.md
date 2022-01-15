---
title: Prueba de WebGl y de canvas en el blog
weight: 2
---

<!-- TODO: Move to projects -->

<canvas id="canvas" height="600" width="600"></canvas>
<script>
function main() {
    const canvas = document.getElementById("canvas");
    const gl = canvas.getContext("webgl");

    if (gl === null) {
        alert("Unable to initialize WebGL");
        return;
    }

    let r = 0.0;

    setInterval(() => {
        if (r >= 0.0 && r <= 1.0) {
            r += 0.1;
        } else {
            r = 0.0;
        }

        // Color para limpiar la pantalla
        gl.clearColor(r, 0.0, 0.0, 1.0);
        // Limpia el buffer con el color especificado
        gl.clear(gl.COLOR_BUFFER_BIT);
    }, 100);
}

window.onload = main;
</script>
