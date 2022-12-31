---
title: Markdown
description: Guía rápida de cómo escribir Markdown
date: 2021-06-10
weight: 3
---

**Guía rápida** de como escribir en **Markdown**.

**Markdown está basado en HTML**, así que cualquier archivo HTML es Markdown
válido, lo que significa que podemos usar elementos HTML en su interior. Por
ejemplo, si se usa un comentario, el texto no aparecerá en el documento final.
Sin embargo, dentro de un elemento HTML no podrás continuar usando sintaxis
Markdown dentro de él.

La implementación de Markdown cambia de acuerdo al _parser_ (el programa que
transforma el Markdown a HTML). Esta guía servirá para clarificar cuales
características son universales y cuales son específicas de cada uno.

## Estilo y caracteres
- *Cursiva*: Uso de `*` o `_` alrededor de la palabra.
- **Negrita**: Uso de `**` o `__` alrededor de la palabra.
- ***Ambos estilos***: Uso de `***`, `___`, `*__`, `**_` y demás variantes
  alrededor de la palabra.
- `Código`: Uso de \` alrededor de la palabra.
- ~~Tachado~~: Uso de `~~` alrededor de la palabra.
- Caracteres especiales: Uso de \\ antes del carácter.
- Salto de `<br>`: Uso de `---` o `***` (se admite con espacios en el medio).

### Otros caracteres especiales
Markdown, al poder escribir HTML, podemos usar la sintaxis propia de este para
insertar más caracteres. A continuación hay algunos ejemplos:

- Flecha derecha (`&#8594;`): &#8594;

[Aquí](https://unicode-table.com/es/) puedes encontrar una buena lista con sus
correspondientes codificaciones y formato).

## Enlaces
- Texto entre `[]` y el enlace entre `()`.
- Cuando estos enlaces son muy largos, podemos darles una etiqueta (o incluso
  no poner nada) la que luego anidaremos con el enlace en cuestión.

    ```md
    [link] y más texto por aquí. Y aquí hay [otro][1] ejemplo.

    :
    :

    [link]: https://www.example.com
    [1]: https://www.example.com
    ```

- Si no queremos que cambie el texto, simplemente lo situamos entre `<>`.
- Se le puede añadir una tarjetita de información entre los paréntesis con `""`.
- También funciona con rutas relativas a otros archivos (e.g.:
  `/documentation/LICENSE.md`).
- Incluso podemos poner enlaces en el mismo documento, en lugar de dar una
  dirección escribimos un `ID` (precedido de un `#`) que referencie a otra parte
  del documento donde incluimos una etiqueta `<a id= ""></a>`.

### Imágenes o GIFs
Con este mismo método de los enlaces, tanto usando URLs como direcciones a
archivos, podemos añadir imágenes a nuestro documento, simplemente añadiendo
`!` delante.

## Párrafos
### Títulos
- Uso de `#` tantas veces como pequeño sea el título. Es decir:
    - `#`: `<h1>`
    - `##`: `<h2>`
    - `###`: `<h3>`
    - `####`: `<h4>`
    - ...
- Uso de `=` a modo de subrayado para títulos grandes y `-` para títulos más
  pequeños.

```md
Ejemplo de título
=================

Ejemplo de subtítulo
--------------------
``` 

### Nuevo párrafo:
- **Doble ENTER**: El simple se ignora, y si añades más de 2 también.
- **Poner `\` al final**: Esto separará el párrafo sin tener que darle dos veces.
- **Etiqueta br**: salto de HTML.

### Listas
- Uso de `-`, `+` o `*` para listas no enumeradas.
- Uso de números (`1.`, `2.`, `3.`, ...) para listas numeradas.
- Para hacer sublistas añadir identación (4 espacios generalmente).

Además, se pueden alternar con una lista no enumerada con una sublista
desordenada y viceversa.

### Citas
- Uso de `>` (se puede añadir `>` adicionales y crear citas anidadas).

### Código
- Uso de `~~~` para declarar un bloque de código.
- Uso de \`\`\` para declarar un bloque de código (GitHub Flavored Markdown).
- Uso de identación (4 espacios generalmente).

### Tablas
Solamente disponible en GitHub Flavored Markdown.

- Los elementos se sitúan entre `|`.

#### Estilo
> Nota: se le puede añadir más guiones para separar los elementos.

- Centrado: `:-:`
- Izquierda: `:-`
- Derecha: `-:`

## Ejemplos ##
> **Nota**: Mejor ver esta sección en el [repositorio](https://github.com/MagnoElMagnifico/blog)



<!-- Esto es un comentario que no aparecerá en el resultado final -->
Texto normal

_Texto en cursiva_ \
*Otro texto en cursiva*

**Texto en negrita** \
__Otro texto en negrita__

***Ahora soy un texto con ambos estilos*** \
**_Tengo los dos estilos otra vez_** \
__*Vaya, otra vez*__

`Esto resulta ser un pedazo de código`

~~¿Por qué estoy tachado?~~

Aquí algunos caracteres raros: \` \* \\ \_

<br>

-----------

***********

[Enlace a Google](www.google.com) \
<www.google.com> \
[Otro enlace a Google](www.google.com "Google") \
[Enlace al final del documento](#enlace-ejemplo)

![Imagen](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

# h1
## h2
### h3
#### h4
##### h5
###### h6

Otro h1
==========

Otro h2
----------

Esto es un párrafo.
Sigo estando en el mismo párrafo.

Ahora estoy en otro párrafo. \
Y ahora en otro.

- Elemento 1 de una lista
- Elemento 2 de una lista
    - Subelemento 1 de la lista
    + Subelemento 2 de la lista
    * Subelemento 3 de la lista
- Elemento 3 de una lista

1. Elemento 1 de una lista ordenada
2. Elemento 2 de una lista ordenada
    1. Subelemento 1 de la lista ordenada
    2. Subelemento 2 de la lista ordenada
    3. Subelemento 3 de la lista ordenada
3. Elemento 3 de una lista ordenada

> Esto es una cita
>> Esto es una subcita

```
Bloque de código 1
```

~~~
Bloque de código 2
~~~

    Bloque de código 3
        Código con identación

| Col1 | Col2 | Col3 |
| :--: | :--- | ---: |
| Centrado | Derecha | Izquierda |

| Columna 1           | Columna 2 | Columna 3 |
| :-----------------: | :-------- | ----------------------------------------: |
| Texto un poco largo | Texto     | Esto es un texto muy más largo que el otro |

- [x] Checkbox marcado
- [ ] Checkbox vacío


# {#enlace-ejemplo}
