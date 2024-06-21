---
title: Introducción
description: >
    En esta introducción a los gráficos por computador se discutirán cuestiones
    básicas como pantallas, _Frame Buffer_, resolución, profundidad del color,
    etc. También se hará una overview de APIs gráficas como OpenGL, Vulkan
    o Direct X.
date: 2024-03-04T09:08:04+01:00
weight: 1
math: true
draft: true
---

# Ideas generales

## Visión humana

{{< block "Persistencia" "var(--magno-blue)" >}}
La **persistencia** del cerebro de interpolar entre varias imágenes, lo que da
sensación de movimiento.

- Cine: 24 FPS (porque no es interactivo)
- Dibujos animados: 12 FPS (menos dibujos)
- Videojuegos: 30 - 60 FPS (hoy en día hasta mucho más)
{{< /block >}}

## Tecnología de las pantallas
### Tubo de rayos catódicos (TRC)

- Tecnología más usada hasta 2005
- Se aceleran electrones para conseguir un haz de electrones.
- Se usa un electroimán para modificar su trayectoria y que colisionen en un
  lugar concreto.
- **Pantalla de fósforo**: al impactar, estes brillan.
- Este brillo debe de estar presente durante 1 frame, por lo que la frecuencia
  mínima de refresco está determinada por la **persistencia del fósforo**. Esto es
  el tiempo que tarda en reducir un 10% su brillo inicial, normalmente de 10 a 60
  microsegundos.
- Esto implica una frecuencia (_Critical Fricker Frecuency_) de 50Hz.

{{< figure
    src="https://edea.juntadeandalucia.es/bancorecursos/file/b8bd9335-c9ae-4a90-83f8-2d566dc58308/1/es-an_2011052513_9103742.zip/ODE-8db85497-49af-3010-bd6e-04304479eb89/rayos_catodicos.JPG"
    link="https://edea.juntadeandalucia.es/bancorecursos/file/b8bd9335-c9ae-4a90-83f8-2d566dc58308/1/es-an_2011052513_9103742.zip/ODE-8db85497-49af-3010-bd6e-04304479eb89/rayos_catodicos.JPG"
    caption="Funcionamiento de una pantalla TRC"
>}}

### Terminales vectoriales

Inicialmente, solo se guardaban en memoria las órdenes de dibujo:

    move 20 30
    line 30 40
    jump

La unidad de procesamiento gráfica sería la encargada de procesar estas
instrucciones para mover el rayo de tubos catódicos.

La ventaja de esto es que se pueden **escalar**.

Esto todavía sigue presente en la actualizad en formatos de imágenes
vectoriales, como los SVGs.

### Terminales raster

En los 70, aparecen los terminales raster que son usados en la televisión
y aplicados posteriormente en la computación. En estas terminales existe un
direccionamiento de líneas (625 en Europa) (también llamadas **Scan Lines**).

Este concepto de líneas es extrapolado a una **matriz bidimensional** de datos
que son los que se muestran por pantalla. El haz de electrones **no** recorre
libremente la pantalla, sino de forma ordenada desde la parte superior izquierda
hasta la inferior derecha.

{{< block "Píxel" "var(--magno-blue)" >}}
Cada punto iluminable de una pantalla se conoce como **píxel**.
También se puede considerar la insersección de una fila y una columna.
{{< /block >}}

{{< figure
    src="https://techdifferences.com/wp-content/uploads/2019/01/Raster-Scan-2.jpg"
    link="https://techdifferences.com/wp-content/uploads/2019/01/Raster-Scan-2.jpg"
    height="300"
    caption="Ejemplo de dibujo rasterizado"
>}}

### Nuevas tecnologías

- Pantallas de plasma (PDP)
- _Liquid Crystal Display_ (LCD)
  - LED Backlit LCD
  - QLED
- LED
    - OLED
    - AMOLED
    - Quantum Dot Display (QLED)

Se mejora la tasa de refresco, la resolución y la profundidad del color.
Esto disminuye el cansancio ocular del usuario.

En la actualidad también aparecen otros tipos de dispositivos:

- Pantallas táctiles
- Realidad Virtual
- Workbenchs

# Frame Buffer o Color Buffer

{{< block "Frame Buffer" "var(--magno-blue)" >}}
El conjunto del valor de los píxeles se almacena en un área de memoria que se
llama **Frame Buffer** o **Color Buffer**. Los programas modifican esta memoria
para luego volcar los datos (**swap**) en un momento determinado.
{{< /block >}}

{{< block "Profundidad del color" "var(--magno-blue)" >}}
La profundidad de color (_Color Depth_ o _Bit Depth_) es la cantidad de bits que
se utilizan para representar un único píxel o una componente del color del
mismo.

- `bpp`: Bits Por Píxel
- `bpc`: Bits Por Color/Componente/Canal o incluso _Sample_ (`bps`)
{{< /block >}}

{{< block "Paleta de color" "var(--magno-blue)" >}}
Alternativamente, se puede utilizar una paleta de colores, es decir, un conjunto
de colores predefinido. Por tanto, para representar un color solo es necesario
aportar un índice de esta paleta.

Actualmente solo se suele utilizar en archivos de imagen para mejorar la
compresión.
{{< /block >}}

El color se representa con un número que se puede separar en varias componentes:

- **RGB**: componentes **{{< color "rojo" "var(--magno-red)" >}}**, **{{< color
  "verde" "var(--magno-green)" >}}** y **{{< color "azul" "var(--magno-blue)" >}}**.
- **RGBA**: incluye una componente extra, el **Canal Alfa**, que indica la
  transparencia del píxel.


| bpp          | Número de colores     | Nombre              |
|--------------|-----------------------|---------------------|
| 1            | 2                     | Monocromo           |
| 2            | 4                     | CGA                 |
| 3            | 8                     | Zx Spectrum         |
| 4            | 16                    | EGA, MAC Original   |
| 8 (1 byte)   | 256                   | VGA                 |
| 24 (3 bytes) | 16 777 216            | True Color          |

[Comparativa] en la Wikipedia.

{{< block "Resolución de Display" "var(--magno-blue)" >}}
La **resolución** es el número de píxeles en cada dimensión que se pueden
mostrar. Normalmente se expresa como $\text{ancho} \times \text{alto}$.

La relación entre el alto y el ancho es el **Aspect Ratio** o **Relación de
Aspecto**. En la Wikipedia podrá encontrar una [tabla con las resoluciones más
comunes].

Esto realmente no dice nada acerca de la **densidad de píxeles**, que es la
cantidad de píxeles por área. Se suele medir en PPI, píxeles por pulgada.

[tabla con las resoluciones más comunes]: https://en.wikipedia.org/wiki/Display_resolution#Common_display_resolutions
{{< /block >}}


{{< figure
  src="https://upload.wikimedia.org/wikipedia/commons/6/63/Vector_Video_Standards.svg"
  link="https://upload.wikimedia.org/wikipedia/commons/6/63/Vector_Video_Standards.svg"
  caption="Comparativa de distintas resoluciones"
>}}

# Double buffer

A la hora de renderizar dos frames consecutivos se utilizan dos frame buffers
completamente separados:

1. Mientras se presenta el **buffer principal** por pantalla, se modifica el
   **buffer secundario** para preparar el siguiente frame.
2. Luego se intercambian (_**swap**_) presentando la nueva imagen. Durante este
   paso se puede sincronizar con la velocidad de refresco de la pantalla para
   evitar _**Screen Tearing**_ (_**V-Sync**_).

Al escribir siempre sobre el buffer secundario, nunca se ve por pantalla cómo se
genera la imagen, lo que evita que el _**flickering**_.

Lógicamente, esto requiere el **doble de memoria** para dibujar cada frame. En
el pasado era un problema, pero hoy en día no, incluso hay sistemas que usan un
triple buffer.

{{< dropdown "Triple Buffer" >}}
Cuando el triple buffer está activado, se renderiza el frame en uno de los
buffers secundarios. Puede que lo haga tan rápido que la pantalla todavía en ese
momento se esté cambiando el buffer anterior.

En lugar de pasar tiempo esperando, se puede seguir renderizando en un buffer
secundario aparte. El resultado es que no se pierda nada de tiempo y la pantalla
tiene un flujo constante de frames que presentar. Como consecuencia, el _frame
rate_ es mayor que el de _double buffer_ utilizando V-Sync sin _Screen Tearing_.
{{< /dropdown >}}

{{< figure
    src="https://www.gpumag.com/wp-content/uploads/2020/07/Screen-tearing-examplee.jpg"
    link="https://www.gpumag.com/wp-content/uploads/2020/07/Screen-tearing-examplee.jpg"
    caption="Ejemplo de _Screen Tearing_"
>}}

# Determinar el orden de aparición de los objetos

{{< block "Algoritmo del pintor" "var(--magno-blue)" >}}
Los objetos se dibujan el en orden el que llegan.
{{< /block >}}

Esto plantea algunos problemas que no se puede solucionar.

{{< figure
    src="https://www.seekpng.com/png/detail/763-7630665_algoritmo-del-pintor.png"
    link="https://www.seekpng.com/png/detail/763-7630665_algoritmo-del-pintor.png"
    height="300"
    caption="Dibujo imposible de realizar utilizando el algoritmo del pintor."
>}}

{{< block "Depth Buffer" "var(--magno-blue)" >}}
El **buffer de produndidad** o **Z-Buffer** es un buffer que almacena un valor
de profuncidad de cada píxel.
- Tiene el mismo alto y ancho que el buffer de color
- Tiene una profundidad de 16, 24 o 32 bits (normalmente 24)
- Contiene valores decimales (`float`) entre 0 y 1

Cuando _Depth Testing_ está activado, se comparará el valor de cada nuevo píxel
que se quiere renderizar con el píxel ya existente. En función del resultado, se
sustituye o no, actualizando el nuevo valor del _Depth Buffer_.

Es decir, en función de la profundidad del valor anterior, se dibujará o no.

Se basa en la siguiente fórmula:

$$ F_{\text{depth}} = \frac{1/z - 1/\text{near}}{1/\text{far} - 1/\text{near}} $$

Cómo hacerlo en OpenGL:

```c
// Activar
glEnable(GL_DEPTH_TEST);

// Limpiar la pantalla, tanto el color como la profundidad
glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

// Se puede desactivar escribir al Depth Buffer poniendo
// la máscara a falso (todo 0s).
glDepthMask(GL_FALSE);
```
{{< /block >}}


# Pipeline gráfica

{{< figure
    src="https://learnopengl.com/img/getting-started/pipeline.png"
    link="https://learnopengl.com/img/getting-started/pipeline.png"
    caption="Pipeline gráfica básica"
>}}

El proceso de transformación de coordenadas en 3D a figuras de 2D la maneja la
**pipeline gráfica**. Para hacerlo más comprensible, lo he dividido en dos
fases.

Primera fase: transformación de los vértices

1. La aplicación envía la geometría 3D a dibujar.
2. **Transformación de geometría**: se transforman las coordenadas 3D en 2D.
    - _Local Space_ a _World Space_ usando la _Model Matrix_.
    - _World Space_ a _View Space_ usando la _View Matrix_ (cámara).
    - _View Space_ a _Clip Space_ usando la _Projection Matrix_ (cámara).
3. (Opcional) **Teselación** o **Triangulación**: aquellas primitivas se
   converten en otras más sencillas para poder renderizarlas.
4. (Opcional) Es posible tomar de entrada esta geometría inicial y generar
   nuevos vértices a partir de ella.
5. **Ensamblado de primitivas**: se toman todos los vértices y se unen para
   construir las figuras primitivas que forman, normalmente triángulos.
6. **Clipping**: se descartan aquellos fragmentos que se están fuera de la vista
   para aumentar el rendimiento.
7. **Face culling**: se descarta más geometría por no estar mirando hacia la
   cámara (más detalles el en artículo de modelado).

Segunda fase: coloreado de las primitivas

1. **Rasterizado**: se proyectan los vértices de la primitiva creada para
   asociarlos con los píxeles de la pantalla, resultando en unos **fragmentos**
   que se deben colorear. En esta etapa también se realiza la **interpolación**
   de los datos de los vértices para asignar un valor intermedio a cada
   fragmento.
2. **Coloreado**: se da un color o una textura a los fragmentos generados. Esto
   puede llegar a ser bastante complejo por tener que calcular la iluminación,
   sombras, etc.
3. **Test de profundidad, alfa test y blending**: se comprueba el valor del
   _Depth Buffer_ en esta etapa. También se tiene que tener en cuenta la
   transparencia del fragmento para mezclarlo con el resto de objetos.

{{< dropdown "Pipeline de OpenGL completa" >}}
Primero se inicia la pipeline desde la CPU:
- Especificación de vértices
- Renderizado de vertices: `glDrawElements` y variantes

A partir de aquí, se envían los datos a la GPU, que seguirá los siguientes
pasos:

- Procesado de vértices
  - Vertex shader (Programable)
  - (Opcional) Tessellation (Programable)
  - (Opcional) Geometry shader (Programable)

- Post-procesado de vértices
  - Transform Feedback <!-- TODO -->
  - Primitive Assembly: si hay un GS o TS presente, se ejecuta una pequeña parte
    antes de eso. Esto es necesario para que estos reciban una colección de
    primitivas, no una serie de vértices.
  - Clipping
  - Face Culling

- Rasterización
- Procesado de Fragmentos (Programable). Produce un color y otro de profundidad.
  También se produce un valor para el stencil buffer, pero eso no es programable.
- Operaciones por sample
  - Pixel Ownership test: falla si el pixel no pertenece a OpenGL.
  - Scissor test: corta los valores fuera de la ventana
  - Stencil test: uso del [Stencil Buffer] para hacer sombras o portales.
  - Depth test
  - Color Blending: se mezclan los colores previos teniendo en cuenta la transparencia.
  - Logical Operation
  - Write Mask: antes de escribir en el buffer adecuado (Color Buffer, Depth
    Buffer o Stencil Buffer), se puede aplicar una máscara para prevenir que se
    escriban determinadas cosas.

Más información en la [documentación].

[Stencil Buffer]: https://en.wikipedia.org/wiki/Stencil_buffer
[documentación]: https://www.khronos.org/opengl/wiki/Rendering_Pipeline_Overview
{{< /dropdown >}}

{{< block "Fragmento" "var(--magno-blue)" >}}
Un fragmento es un conjunto de datos producidor por el Rasterizador, y se usan
para calcular el resultado final para un pixel.

Nótese también que pueden haber varios fragmentos por pixel, esto es útil para
Antialiasign.

Esta información puede ser:
- Valores arbitrarios resultado del procesamiento de los vértices: normales,
  colores, coordenadas de textura... todos ellos interpolados.
- Posición en _Screen Space_
- Valor del _Stencil Buffer_ y _Depth Buffer_
- Identificador (dado por el _Geometry Shader_)
{{< /block >}}

Una vez que se ha acabó de rellenar el Color Buffer, se realiza el `swap` para
presentarlo en la pantalla. Esto crea un **bucle de _feedback_**: se crea un
dibujo y eso causa una respuesta del usuario. Entonces el sistema deberá
renderizar otro dibujo y así sucesivamente.

# APIs gráficas
## OpenGL

OpenGL (_Open Graphics Library_) es una **especificación** mantenida por
[Khronos Group] que aporta una serie de funciones para manipular imágenes
y gráficos. Esto implica que lo que está definido solo son los resultados de
cada función, pero cada desarrollador puede realizar muchas implementaciones
diferentes.

Quien realmente programa la librería de OpenGL son los fabricantes de tarjetas
graficas y los desarrolladores del driver gráfico. Es necesario que tengan una
implementación para cada modelo.

Esto implica que cuando OpenGL se comporta de forma extraña o tiene bugs, es
probable que sea culpa de ellos. Por tanto, siempre se recomienda tener los
drivers actualizados.

{{< todo >}}
### OpenGL 1.2 (Inmediato)

Antiguamente, programar en OpenGL implicaba utilizar el **modo inmediato** o la
_**fixed function pipeline**_. Esto es una forma sencilla de alto nivel de
dibujar gráficos, por lo que la mayoría del trabajo se cargaba en OpenGL para
realizar cálculos.

Sin embargo, los desarrolladores querían más flexibilidad sobre lo que podían
hacer, por lo que la especificación cada vez incluía más

### OpenGL 3.3 (Core)
Shaders

### Máquina de estados

## Vulkan
## Direct X
{{< /todo >}}

[Khronos Group]: https://www.khronos.org/
[Comparativa]: https://en.wikipedia.org/wiki/Color_depth#Comparison

# Siguientes artículos

En los siguientes artículos se dicutirán más en detalle los elementos que se
pueden encontrar en una **escena** a renderizar.

1. Geometría y modelado
2. Cámara sintética
3. Iluminación
4. Texturizado

