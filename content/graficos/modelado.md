---
title: Modelado
description: >
    En este artículo se tratará el proceso de dar la forma a un objeto para
    poder mostrarlo por pantalla.
date: 2024-03-04T09:30:09+01:00
weight: 2
draft: true
math: true
---

# Definición de modelado

Modelar es el proceso de darle forma a un objeto. En el contexto de los gráficos
por ordenador, esto consiste en dar las posiciones de los vértices de dicho
objeto, para que puedan ser representados.

Existen varias formas de modelar un objeto: **exterior** e **interior**.


{{< dropdown "Modelado interior: Objetos sólidos" >}}
Para representar objetos que están sólidos en su interior, se usan técnicas
como:

- _**Spatial Partition**_: se describe el interior del objeto dividiéndolo en
regiones sólidas que no se solapan entre sí.
- _**Marching Cubes**_.

Útil en aplicaciones médicas.
{{< /dropdown >}}

{{< dropdown "Modelado exterior: Representación de superficies" >}}
Define el contorno del objeto sin hacer referencia al su volumen interior.

La superficie debe ser cerrada y no se puede entrecortar.

- Información sobre la geometría de la superficie
- Propiedades de la luz: color y textura
- Alguna propiedad física en el caso de simulaciones. Por ejemplo, la elasticidad.
{{< /dropdown >}}

# Vertex Data

Para especificar la geometría a OpenGL, se usa lo que se llama _**Vertex
Data**_, información que se almacena por cada vértice. Cada campo de información
se le llama **atributo**:

- Posición en 3D del vértice: $(x, y, z)$
- Vector normal: $(n_x, n_y, n_z)$
- Coordenadas de textura: $(u, v)$
- Color del vértice: $(r, b, g)$ o $(r, g, b, a)$
- Información adicional que puede ser completamente arbitraria

# Ejes de coordenadas

Por convención, OpenGL es un **sistema diestro**, lo que implica que se puede
aplicar la regla de la mano derecha:

- El pulgar apunta hacia direcciones de X positivas (derecha)
- El índice apunta hacia direcciones Y positivas (arriba)
- El dedo corazón apunta hacia direcciones Z positivas (sale de la pantalla hacia el observador)

{{< figure
  src="https://learnopengl.com/img/getting-started/coordinate_systems_right_handed.png"
  link="https://learnopengl.com/img/getting-started/coordinate_systems_right_handed.png"
  height="300"
  caption="Sistema de coordenadas de OpenGL"
>}}

Una vez que las coordenadas del vertex hayan sido procesadas, deben de estar en
_**Normalized Device Coordinates**_ y restringidas un pequeño espacio de
1 unidad cúbica, dado que toda coordenada (sea X, Y o Z) que no esté entre -1
y 1 se descartará.

Es importante distinguir estas coordenadas de las **coordenadas de la ventana**
o **coordenadas de pantalla**:

- Las NDC el centro es `(0, 0, 0)`
- El punto `(0, 0)` de las coordenadas de ventana es la esquina superior izquierda.

{{< figure
    src="https://lh3.googleusercontent.com/-JrBGeY69kOM/UfAbao8c-CI/AAAAAAAAAN4/qYvBCLHPjmc/s800/windowndc.png"
    link="https://lh3.googleusercontent.com/-JrBGeY69kOM/UfAbao8c-CI/AAAAAAAAAN4/qYvBCLHPjmc/s800/windowndc.png"
    caption="Normalized Device Coordinates vs Screen Coordinates"
>}}

# Teselación

Como se ha comentado en la introducción, en esta etapa se convierten figuras más
complejas a series de triángulos.

Se escogieron triángulos particularmente porque es la figura más sencilla,
además de definir unívocamente un plano. Esto simplifica los algoritmos de
rasterización.

# _Face Culling_

{{< block "Face Culling" "var(--magno-blue)" >}}
El orden de los vértices determina si la cara se va a ver o no.

Este proceso se hace desde el punto de vista del observador.
{{< /block >}}

Se puede activar y desactivar este comportamiento, pero no es recomendable
porque se están renderizando muchos elementos que no se van a ver.

```c {linenos=false}
glEnable(GL_CULL_FACE);
glDisable(GL_CULL_FACE);
```

También se puede escoger qué caras son las que se van a quitar:

```c {linenos=false}
glCullFace(GL_FRONT); // Elimina las caras hacia delante
glCullFace(GL_BACK);  // Elimina las caras hacia atrás
glCullFace(GL_FRONT_AND_BACK); // Elimina todas las caras,
                               // solo se muestran puntos y líneas
```

Y para decidir qué cara es la de delante y cuál es la de atrás se puede
configurar de la siguiente forma:

```c {linenos=false}
glFrontFace(GL_CW);  // Sentido horario
glFrontFace(GL_CCW); // Sentido anti-horario
```

Por defecto, **las caras que se van a mostrar deben ir en sentido
anti-horario**.

# Normales

Un vector normal de una cara apunta

- Normales por cara:


## Tablas

# OpenGL 1.2

```c
glBegin(GL_TRIANGLES);
  glNormal3f(nx, ny, nz);
  glTexCoord2f(u, v);
  glVertex3f(x, y, z);
glEnd();
```


## Primitivas
### Punto
### Líneas
### Triángulos
## Modo poligonal
## Listas de visualización

```c
unsigned int lista = glGenLists(1);

glNewList(lista, GL_COMPILE);
  glBegin(...);
  // ...
  glEnd();
glEndList();
```
## GLUT: Formas básicas

# OpenGL 3.3
## Vertex Buffer Object
## Vertex Array Object
## Element Buffer Object
