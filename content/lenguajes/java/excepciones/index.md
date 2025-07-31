---
title: Excepciones
description: >
    Aquí veremos cómo se gestionan los errores en Java, también siguiendo el
    paradigma orientado a objetos.
date: 2024-01-20T19:18:17+01:00
weight: 6
draft: true
---

# Gestión de errores

Una de las tareas más importantes que es necesario realizar en el desarrollo de
un programa es la **gestión de los errores** durante la ejecución, de modo que
se traten correctamente y el programa sea más mantenible.

Para ello, se busca una **separación lógica** entre entre los diferentes tipos
de código:

- Código asociado a la funcionalidad
- Código asociado a la interacción con el usuario
- Código asociado al acceso a datos
- **Código asociado a la gestión de errores**

Imagina el caso donde un _Método 1_ llama a un _Método 2_, que puede fallar por
algún motivo. Mostrando estos tipos de código en este caso:

{{<
    figure
    src="deteccion-tratamiento-junto.png"
    link="deteccion-tratamiento-junto.png"
    caption="El método al que llamamos puede no tener el contexto necesario para tratar el error."
>}}

En tal caso, podemos dejar que el _Método 1_ sea el que trate el error por
conocer mejor las condiciones. Lo que nos dejaría con algo así:

{{<
    figure
    src="deteccion-tratamiento-separado.png"
    link="deteccion-tratamiento-separado.png"
    caption="Ahora el código del método se mezcla con el que gestiona el error."
>}}

Nótese que ahora tenemos código que se implementa la lógica del método en sí,
pero entre medias también tenemos el código que trata los posibles errores de
cada función a la que llama. Esto es incómodo y en casos donde los métodos se
vuelven más grandes, puede verse afectada su facilidad de mantenimiento.

{{<
    figure
    src="excepciones.png"
    link="excepciones.png"
    caption="Aquí existe una clara separación entre el código del tratamiento y de la funcionalidad."
>}}

De modo que si separamos la funcionalidad del método, el tratamiento no se verá
afectado y viceversa.

{{< block "Nota" "var(--magno-green)" >}}
No tiene porqué ser necesariamente errores, sino también otras **situaciones de
interés durante la ejecución del programa** (parte lógica).

Por ejemplo:

-   División entre 0: error
-   Comando incompleto: no es un error, es una condición que es necesario tratar
    (mostrar un mensaje de uso correcto, por ejemplo).
{{< /block >}}

# Definición de excepciones

Antes de nada, es necesario especificar las excepciones a usar y los métodos en
donde se pueden dar.

{{< block "Excepción" "var(--magno-blue)" >}}
Una excepción se especifica como una clase derivada de `Throwable`. Se crean
instancias de estas clases y se lanzan con la palabra reservada `throw`, que
luego se pueden capturar y gestionar usando la sintaxis `try {...} catch (...) {...}`.
{{< /block >}}

`Throwable` tiene los siguientes métodos:

-   `String getMessage()` : mensaje explicativo del error ocurrido.
-   `void printStackTrace()`: imprime en la consola la pila de llamadas de la
    excepción.

{{< keyvalue title="Tipos de excepciones" key-header=true fill=true >}}
-% Chequeadas / _Checked_ <br> Derivadas de `Exception` :%
Se sabe en tiempo de compilación en qué métodos **puede** ocurrir determinada
excepción. **Son errores recuperables**, no impiden que el programa continue.

Esto significa que el programador **deberá anotar sus métodos de forma explícita
con las excepciones que se pueden dar**.

```java
public void unMetodo(String parametro)
    throws MiExcepcion1, MiExcepcion2 {
    // ...
}
```

Nótese que aquí **también se puede usar Polimorfismo**: es posible especificar
solo `MiExcepcion` si es la clase padre de `MiExcepcion1` y `MiExcepcion2`.

-% No Chequeadas / _Unchecked_ <br> Derivadas de `RuntimeException` o `Error` :%
Pueden ocurrir en cualquier parte del código.
{{< /keyvalue >}}

{{<
    figure
    src="tipos-excepciones.png"
    link="tipos-excepciones.png"
    caption="Jerarquía de excepciones en Java"
    alt="Jerarquía de excepciones en Java"
>}}

Algunos ejemplos son los siguientes:

    RuntimeException
        NullPointerException
        IndexOutOfBoundsException
        ClassCastException

    Error
        AssertionError
        LinkageError
        VirtualMachineError

## Ejemplo de creación de una excepción

```java
public class DivX0 extends Exception {
    public DivX0(String message) {
        super(message);
    }
}
```

{{< block "Nota" "var(--magno-green)" >}}
Normalmente se le llama a las excepciones algo que termine en `Exception` para
diferenciarlas de las clases normales.
{{< /block >}}

En estas clases se suelen añadir:

-   Un **mensaje descriptivo** donde se explica el motivo de la excepción (que
    luego se puede recuperar llamando a `getMessage()`). El constructor de la
    clase `Exception` toma este mensaje.
-   **Referencias a objetos** que se pueden usar en el tratamiento del error.
    Estos se pueden añadir a la clase derivada como atributos y sus respectivos
    _getters_ y _setters_ (como en una clase normal).

Y para lanzar esta esta excepción, por ejemplo:

```java
public float dividir(float a, float b) throws DivX0 {
    if (b == 0)
        throw new DivX0("No se puede dividir entre 0");

    return a / b;
}
```

El patrón general para lanzar excepciones es algo así:

```java
if (<condicion>) {
    throw new <excepcion>(<mensaje>, <objetos de ayuda>);
}
```

{{< block "Importante" "var(--magno-red)" >}}
La palabra reservada `throw` termina con la ejecución del método actual, igual
que un `return`. Sin embargo, la función no devuelve ningún valor.
{{< /block >}}

# Gestión de excepciones

## Bloque `try`: llamar métodos que lanzan excepciones

Cuando un método intenta ejecutar otro que pueda producir una excepción, deberán
ir **obligatoriamente** dentro de un bloque `try`, o de lo contrario se dará un
**error de compilación**:

```java
// ...
try {
    // posible error si b == 0
    calculadora.dividir(a, b); 
}
// ...

```

Este bloque puede contener a más llamadas a otros métodos, no solo los que
generan excepciones. De hecho, así es más legible:


{{< columns >}}
```java
met1();
met2();
try {
    met3();
} // ...
met4();
```

**Poco legible**, sobre todo cuando hay muchos métodos que lancen excepciones y
tengan el mismo tratamiento del error.

%%%%%%%%%%%%%%%%%%%

```java
try {
    met1();
    met2();
    met3();
    met4();
} // ...
```

Esto es **más legible**, sobre todo cuando incorporemos el tratamiento del
error. El `try` puede ocupar todo el cuerpo del método.
{{< /columns >}}

## Bloque `catch`: tratar el error

{{< block "Importante" "var(--magno-red)" >}}
Una vez que se lanza la excepción, el objeto lo **captura** el bloque `catch`,
el encargado de su gestión.

Esencialmente se realiza un salto a ese bloque, por lo que el método anterior
**no termina**, no se devuelven valores.
{{< /block >}}

La excepción lanzada se recibe en el bloque como un <<argumento>> y se puede
usar como un objeto normal dentro del bloque `catch`: recuperar el mensaje de
error, mostrarlo al usuario, etc.

```java
try {
    // ...
} catch (<TipoExcepcion> e) {
    // Tratamiento del error aquí
}
```

{{< block "Relación `1:*` entre los bloques `try` y `catch`" >}}
El bloque `catch` va siempre junto al bloque `try`:

- Cada `try` debe tener mínimo 1 bloque `catch`
- No puede haber bloques `catch` sin `try`

Se puede tener más de 1 bloque `catch`:

-   1 por cada tipo de excepción lanzada
-   **Polimorfismo**: se pueden atrapar X casos concretos y el resto usar una
    excepción genérica.
-   Sintaxis multi-`catch`: se captura en el mismo bloque todas las excepciones
    listadas, pero no pueden se clase y subclase.
    ```java
    catch (<TipoExcepcion1> |  <TipoExcepcion2> | ... e) {
        // ...
    }
    ```
{{< /block >}}

Hay que tener cuidado cuando se usa Polimorfismo, porque si se pone el caso más
genérico primero, se dará un error de compilación:

    exception has already been caught

Primero deben ir los casos más restrictivos y luego los más generales, dado que
tiene un funcionamiento similar a `if-else if-else`.

## Bloque `finally`

Se trata de un bloque opcional que se ejecuta siempre, haya error o no.

- Un bloque `try` puede tener como máximo 1 bloque `finally`.
- Siempre se ejecutará después después de todos los `catch` asociados (si hubo error).
- Se ejecutará incluso si no se produce un error (después de terminar el `try`).

El uso más habitual del `finally` es **liberar recursos**: cerrar un archivo, un
socket, etc; dado que realizar operaciones con ellos (al ser de entrada/salida)
son propensos a lanzar excepciones, y haya error o no, siempre queremos liberar
los recursos apropiados.

## _Try-with-resources_

Dado que el uso más habitual de `finally` es liberar recursos, existe la
interfaz en `java.lang` llamada `AutoCloseable`.

Esta interfaz requiere que implementes el siguiente método:

```java
void close() {
    // ...
}
```

Entonces, si la clase `Recurso` implementa esta interfaz, se permite la
siguiente construcción:

```java
try (Recurso r = new Recurso() /* Más si los necesito */) {
    // Uso del recurso...
}
```

Por tanto, se cerrará automáticamente el recurso llamando a su método `close`.

Nótese que esto solo es _syntactic sugar_ para lo siguiente:

```java
Recurso r;
try {
    r = new Recurso();
    // Uso del recurso...
} catch (...) {
    // ...
} finally {
    r.close();
}
```

Aún así, nótese que los bloques `catch` de los _try-with-resources_ son
opcionales. También se pueden añadir `finally` adicionales. En todos ellos, el
recurso aparecerá como ya cerrado.

# Excepciones en cascada

No es necesario que un método que invoca a otro que produce una excepción
implemente un `try-catch`, sino que puede etiquetar como que lanza una excepción
y dejar el manejo de errores a otros métodos.

{{<
    figure
    src="cadena-excepciones.png"
    link="cadena-excepciones.png"
    caption="`met1` lanza una excepción y como `met2` no tiene un _try-catch_ se la pasa a `met3`..."
>}}

