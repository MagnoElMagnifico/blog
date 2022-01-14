---
title: JSON
# description: >-
#    ¿Qué es JSON? ¿Cómo se utiliza? ¿Cómo es su sintáxis?
weight: 1

extra:
    show_details: true
---

JSON se utiliza para tranferir información entre servidores y clientes, similar
a XML. Sin embargo, los JSON tienen algunas ventajas sobre XML.

+ Su estructura es estándar: su sintaxis proviene de JavaScript, por lo que su
sintaxis hace que sea sencillo de leer y escribir.
+ Es un formato ligero.
+ Es independiente de cualquier lenguaje.

Ahora miremos a su sintaxis, que es básicamente son parejas de valores: un valor
clave y un dato. La única condición es que deben ir entre comillas dobles ("):

```json
{
    "clave1" : "valor1",
    "clave2" : "valor2"
}
```

Como ves, todo el JSON tiene que estar entre dos llaves que se abren y se
cierran. Además, los dos valores van separados por comas.

No solo podemos darle cadenas de caracteres, podemos añadir números, booleanos
(`true`/`false`) y `null`:

```json
{
    "clave1" : "valor",
    "clave2" : 1,
    "clave3" : 3.4325,
    "clave4" : true,
    "clave5" : null
}
```

Además de estos tipos simples, podemos añadir objetos (con `{}`) que son
enumeraciones de todos estos tipos anteriores:

```json
{
    "objeto" :
    {
        "clave1" : "valor",
        "clave2" : 1,
        "clave3" : 3.4325,
        "clave4" : true,
        "clave5" : null
    }
}
```

O bien listas (con `[]`), similares a los objetos, pero sin necesidad de proveer
una clave cada vez:

```json
{
    "vector" : [1, 2, 3, 4],
    "matriz" : [[1, 2], [3, 4]]
}
```
