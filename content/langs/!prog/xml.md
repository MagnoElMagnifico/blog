---
title: XML
weight: 2

extra:
    show_details: true
    show_toc: true
---

Lenguaje de marcado para guardar información.
Distingue de mayúsculas de minúsculas.

## Comentarios
`<!-- Este es un comentario -->`

## Etiquetas
como es un lenguaje de marcado se utilizan etiquetas (una de apertura y otra de
cierre) para ordenar la información. Se escribe así:

```xml
<etiqueta></etiqueta>
```

Podemos darle el nombre que queramos a la etiqueta.

Lo que se sitúa en su interior se llama contenido, y es la información que
queremos guardar. Se puede incluir en su interior otras etiquetas para ordenar
mejor el contenido.

El espacio del contenido es significativo, pero no el que está dentro de un
elemento.

Una etiqueta vacía, sin contenido, se puede simplificar así:

```xml
<etiqueta/>
```

Podemos usar la etiqueta `CDATA` para tomar todo el texto directo de su interior,
por lo que no se permite etiquetas en su interior (excepto `]]>`):

```xml
<![CDATA[ ... ]]>
```

## Document Prolog - Declaración
Es opcional, pero es recomendable y debe ser el primer elemento del documento.
Los argumentos deben seguir este orden:

+ `version` indica con qué versión de XML se trabaja (`1.0`).
+ `encoding` espedifica el tipo de codificación para los caracteres. Por medio
de este, los convertimos en una representación binaria de los mismos.
+ `standalone` indica si el documento depende de información que esté en una
fuente externa.

```xml
<?xml version="1.0" encoding="utf-8"?>
```

## Atributos
Especifica una propiedad que tiene un elemento, añadiendo información. Se pueden
tener varios, pero todos deben de ser distintos. Tambiénn se usan para
distinguir elementos con el mismo nombre.

+ Cadenas de texto
+ Tokenized (ya predefinidos)
    - `ID`       &#8594; Identifica al elemento
    - `IDREF`    &#8594; Referencia a un ID
    - `IDREFS`   &#8594; Referencia a todos los ID de unos elementos
    - `ENTITY`   &#8594; Representa una entidad externa
    - `ENTITIES` &#8594; Representa entidades externas
    - `NMTOKEN`  &#8594; Tiene restricciones sobre que dato puede ser parte del atributo
    - `NMTOKENS` &#8594; Similar al anterior, varios datos
+ Enumerados
    - `NotationType` &#8594; Elemento referenciado a una NOTACIÓN declarada
    - `Enumeración`  &#8594; Lista de valores que el atributo puede tener

```xml
<etiqueta atributo1= "valor1" atributo2= "valor2">Contenido</etiqueta>
```

## Referencias
Predefinidas

+ `<` &#8594; `&lt;`
+ `>` &#8594; `&gt;`
+ `&` &#8594; `&amp;`
+ `'` &#8594; `&apos;`
+ `"` &#8594; `&quot;`

Tiene un `#` seguido de un número, que es el código Unicode para el caracter.
Si lo queremos usar en hexadecimal se añade un x delante del número

+ `<` &#8594; `&#60;` `&#x3C;`
+ `>` &#8594; `&#63;` `&#x3E;`
+ `&` &#8594; `&#38;` `&#x26;`
+ `'` &#8594; `&#39;` `&#x27;`
+ `"` &#8594; `&#34;` `&#x22;`

## Instrucciones de procesado
Transmiten información a la aplicación que usará el XML, pero no forman parte de
los datos del documento.

```xml
<?target instruction?>
```
+ `target`      &#8594; identifica la aplicación
+ `instruction` &#8594; información que esta procesa

```xml
<?xml-stylesheet href = "estilo.css" type = "text/css"?>
```

## Validación
Proceso en el cual se verifica su un XML es válido: si tus contenidos estás de
acuerdo con los elementos, atribtos definidos en el DTD (Document Type
Declaration).

+ `Well-Formed XML Document` &#8594; Documento bien formado
+ `Valid XML Document`       &#8594; Documento válido

### DTD - Document Type Declaration
Verifica el vocabulario y la validez de la estructura con las reglas de un
leguaje XML en particular. Puede especificarse en otro documento/s

Se inicia con:

```xml
<!DOCTYPE element DTD identifier [declaraciones]>
```

+ `element`    &#8594; A partir de qué elemento es la raíz
+ `identidier` &#8594; Dirección hacia un archivo

```xml
<! ELEMENT nombreElemento (interior: elementos/CDATA)>
<! ATTLIST nombreAtributo CDATA "" <-(default)>
```

### XSD - XML Schema Definition
Se usan para validar y describir los XML. Se define usanso su nombre y el tipo:

```xml
< xs:element name = "x" type = "y" />
```
+ `name` &#8594; nombre del elemento
+ `type` &#8594; xs:integer xs:string xs:date o tipos complejos

Estos tipos se declaran detro de esta etiqueta, con una etiqueta
`<xs:complexType>` y otra de `<xs:sequence>`:

```xml
<xs:element name = "nombre">
    <xs:complexType>
        <xs:sequence>
            <xs:element name = "atributo1" type = "xs:string">
        </xs:sequence>
    <xs:complexType>
</xs:element>
```

## DOM - Documento Object Model
Por medio de `DOM` describimos los elementos y sus relaciones. Está basado en un
árbol. También nos ofrece una `API` que nos permite trabajar con los nodos para
añadir, editar o borrarlos.

## NameSpace
XML nos permite tener namespaces, podemos agrupar lógicamente elementos.
El namespace tiene un `URI` (Uniform Resource Identifier)

Se declara por medio del atributo `xmlns`:

```xml
<elemento xmlns:nombre = "URI">
```
