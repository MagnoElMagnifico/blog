---
title: Programación Estructurada en C
description: Uso de estructuras básicas para el control del flujo del programa.
date: 2023-07-16T14:39:52+02:00
weight: 6
---

# Introducción

Por defecto, un programa se ejecuta de arriba a abajo; pero gracias a diferentes
estructuras de control, es posible modificar y manipular este orden para
realizar tareas más complicadas.

- **Control secuencial**: control por defecto, de arriba a abajo.
- **Control selectivo**: se ejecutan solamente determinadas partes
- **Control repetitivo**: se ejectutan las mismas instrucciones varias veces

# Selectivo
## `if`

La estructura selectiva o condicional más básica es el `if`. Este toma una
condición entre paréntesis: **si se evalua a un número distinto de 0, se ejecutará
la siguiente sentencia**; de lo contrario, la saltará.

```c
if (condición)
    sentencia; // Se ejecuta si condición != 0
```

Nótese que **es posible ejecutar varias sentencias usando un bloque**:

```c
if (condición) {
    // Se ejecuta si condición != 0
    sentencia1;
    sentencia2;
    sentencia3;
}
```

### `if else`

A continuación del `if`, **se puede añadir una parte de `else`, que se ejecutará
en caso de que la condición sea falsa** (en este caso, que se evalue a 0).

```c
if (condición)
    // Se ejecuta si la condición != 0
    sentencia_if;
else
    // Se ejecuta si la condición == 0
    sentencia_else;
```

Y de la misma forma, se pueden usar bloques si es necesario:

```c
if (condición) {
    sentencia_if1;
    sentencia_if2;
} else {
    sentencia_else1;
    sentencia_else2;
    sentencia_else3;
}

if (condición)
    sentencia_if;
else {
    sentencia_else1;
    sentencia_else2;
    sentencia_else3;
}

// Y otras variantes
```

### `else if`

También es posible anidar estas estructuras, es decir, añadir unas dentro de
otras:

```c
if (condición1) {
    if (condición2) {
        sentencia1;
        sentencia2;
    } else
        sentencia3;
}
```

Y si en concreto se anida un `if` en un bloque de `else`:

```c
if (condición1)
    sentencia_if;
else {
    if (condición2) {
        sentencia_elseif;
    }
}
```

Pero normalmente se formatea de la siguiente manera:

```c
if (condición1) {
    sentencia_if;
} else if (condición2) {
    sentencia_elseif;
}
```

Y nótese también, que estos bloques **se pueden repetir las veces que se desee**
(incluso en combinación con un bloque `else` normal).

```c
if (condición) {
    sentencia_if;
} else if (condición1) {
    sentencia_elseif1;
} else if (condición2) {
    sentencia_elseif2;
} else if (condición3) {
    sentencia_elseif3;
} else if (condición4) {
    sentencia_elseif4;
} else {
    sentencia_else;
}
```

## `switch`

En algunos casos es necesario hacer comprobaciones como esta:

```c
if (variable == valor1) {
    sentencia_valor1;
} else if (variable == valor2) {
    sentencia_valor2;
} else if (variable == valor3) {
    sentencia_valor3;
} else if (variable == valor4) {
  sentencia_valor4;
} else if (variable == valor5) {
    sentencia_valor5;
} else {
    sentencia_else;
}
```

Esto resulta un poco complicado de leer, por tanto C permite crear bloques
`switch` con este propósito:

```c
switch (variable) {
    case valor1:
        sentencia_valor1;
    case valor2:
        sentencia_valor2;
    case valor3:
        sentencia_valor3;
    case valor4:
        sentencia_valor4;
    default:
        sentencia_else;
}
```

{{< block "Importante" >}}
Solo funcionan comparaciones de igualdad (`==`) con números enteros (`int`)
y caracteres (`char`).
{{< /block >}}

Sin embargo, funciona un poco diferente. Cuando **se comprueba el primer `case`,
continua con el siguiente**; lo cual es ineficiente, dado que una variable solo
puede tener un único valor. Para evitar ese problema, se escribe:

```c
switch (variable) {
    case valor1:
        sentencia_valor1;
        break;
    case valor2:
        sentencia_valor2;
        break;
    case valor3:
        sentencia_valor3;
        break;
    case valor4:
        sentencia_valor4;
        break;
    default:
        sentencia_else;
}
```

La instrucción `break` fuerza la salida de la estructura, evitando que se siga
comprobando tontamente el resto de valores.

El motivo por el que se ha diseñado de esta forma es lo siguiente:

```c
char x = 'a';
switch (x) {
    case 'a':
    case 'b':
    case 'c':
        sentencia1; // En caso de que x sea 'a', 'b' o 'c'
        break;
    case 'd':
        sentencia2; // En caso de que x sea 'd'
        break;
    default:
        sentencia3;
}
```


# Repetitivo / bucles
## `while`

```c
while (condición)
    sentencia;
```

**Se repetirá `sentencia` _mientras_ la `condición` sea verdadera**, es decir,
mientras se evalue a un número no nulo.

Recuerda que también puedes usar un bloque para repetir varias sentencias:

```c
while (condición) {
    sentencia1;
    sentencia2;
    sentencia3;
}
```

### `do while`

Esta estructura es exactamente igual que el `while`, **pero evalua la condición
después de ejecutar las sentencias del bucle**. Es decir, que dichas sentencias
**se ejecutarán al menos una vez** si la condición es falsa.

```c
do {
    sentencia1;
    sentencia2;
    sentencia3;
} while (condición);
```

## Bucles infinitos

Teniendo en cuenta que un bucle `while` se ejecuta siempre que la condición es
verdadera, es posible crear algo así:

```c
while (0)
    sentencia;
```

Esto ejecutará `sentencia` **infinitamente**, lo que [por definición] no es un
algoritmo válido.

Nótese que esto produce el mismo efecto:

```c
int x = 10;
int y = 10;
while (x > 0)
    y--;
```

Para detectar estos _bucles infinitos_ hay que analizar si la condición es
constante y si alguno de las variables que se utilizan en ella cambian **dentro
del bucle**.

[por definición]: {{< ref "mates/discretas/algoritmos#algoritmos" >}}

## `for`

Para muchos problemas será necesario del siguiente código con la siguiente
forma:

```c
int contador = 0;
while (contador < 10) {
    sentencia;
    contador++;
}
```

De esta forma, `sentencia` ejecutará exactamente 10 veces, con la variable
contador almacenando en cual se encuentra.

Por este motivo, C proporciona el bucle `for`, para acortar el código:

```c
for (int contador = 0; contador < 10; contador++) {
    sentencia;
}
```

Y en general:

```c
for (<creación del contador>; <condición>; <actualización del contador>) {
    sentencia;
}

// Equivalente a
<creación del contador>;
while (<condición>) {
    sentencia;
    <actualización del contador>;
}
```

{{< block "Conceptos" >}}
Cada vez que se repite un bucle se llama **iteración** y la variable que
controla el bucle se llama **iterador**, por eso generalmente se usan nombres
como `i`, `j` y `k` para los bucles. En el futuro veremos estructuras más
complejas que también se utilizan para controlar los bucles.
{{< /block >}}

## `break`

La instrucción `break` ayuda a controlar mejor los bucles, dado que **cuando se
ejecuta, sale directamente del bucle**.

Por ejemplo, es posible hacer lo siguiente:

```c
int i = 0;
while (0) {
    i++;
    if (i == 10)
        break;
}
```

Aparentemente, la condición del `while` es constante, pero este bucle termina
tras 10 iteraciones.

## `continue`

De forma similar a `break`, `continue` ayuda a controlar los bucles, pero
**cuando se ejecuta, en lugar de salir, salta a la siguiente iteración**.

Por ejemplo, este es un bucle infinito porque siempre se salta la instrucción
que cambia la condición, por tanto esta es constante:

```c
int i = 0;
while (i < 10) {
    continue;
    i++;
}
```

Pero sin embargo eso no pasa en un bucle `for`, que simplemente lo repite 10
veces:

```c
for (int i = 0; i < 10; i++) {
    continue;
}
```

## Bucles anidados

Al igual que los `if`s dentro de otros `if`s, es posible meter bucles dentro de
otros.

Por ejemplo:

```c
for (int i = 0; i < 5; i++) {
    sentencia1;
    for (int j = 0; i < 3; j++) {
        sentencia2;
    }
}
```

Nótese que `sentencia1` está dentro del primer bucle, que solo da 5 vueltas. El
segundo bucle está también dentro del primero, por tanto también se repite
5 veces. Por otro lado, `sentencia2` se repite 3 veces de cada vez, y en total
3x5=15 veces.

