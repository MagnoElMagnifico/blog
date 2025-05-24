---
title: Introducción a los Compiladores
description: >
    Los compiladores traducen lenguajes de programación a código máquina,
    permitiendo que el computador los ejecute. Existen diferentes tipos de
    compiladores e intérpretes, cada uno con sus ventajas y desventajas. Veremos
    además los diagramas de Tombstone, herramientas visuales para comprender
    mejor el diseño de compiladores.
date: 2025-01-30T19:03:22+01:00
weight: 10
---

# Introducción

Para escribir un programa se emplea un lenguaje de programación para describir
las instrucciones que se deben llevar a cabo. Sin embargo, el computador solo
puede ejecutar código máquina, por lo que es necesario un proceso de traducción
del lenguaje de programación al código máquina. El programa encargado de eso se
llama compilador.

# Aplicaciones

Los conocimientos sobre compiladores, aparte del obvio beneficio de la creación
de nuevos lenguajes de programación, también son útiles para:

-   **Comprender las implicaciones de cada línea de código** de un lenguaje de
    alto nivel, conocer lo que realmente ejecuta la máquina. Este es realmente
    el principal objetivo.
-   Edición de textos con formato, por ejemplo Latex.
-   Reconocimiento de patrones, tanto texto, habla o visión por computadora.
-   Desarrollo de editores de lenguajes estructurados, que necesitan entender
    estos lenguajes para proporcionar mejor soporte.
-   Cálculo simbólico, como por ejemplo MAPLE.
-   Diseño de circuitos integrados mediante lenguajes como Verilog o VHDL.
-   Traducción binaria para portar software entre plataformas.
-   Simulación de arquitecturas hardware para distintos conjuntos de datos
    e incluso antes de su fabricación.

# Tipos de lenguajes

La principal clasificación de lenguajes de programación es la siguiente:

-   **Lenguaje máquina**: utiliza códigos numéricos representados en binario
    para describir instrucciones, y son estos códigos los que lee y entiende la
    CPU. Los accesos a memoria se realizan mediante su dirección directamente.
    Específico de cada arquitectura.

-   **Lenguaje ensamblador**: aplica una serie de mnemotécnicos o nombres
    simbólicos a las instrucciones, direcciones de memoria y registros.
    También es específico de cada arquitectura.

-   **Lenguaje de alto nivel**: implementa primitivas de control de flujo como
    bucles y condicionales. Se describen cálculos con una sintaxis matemática
    (operadores, expresiones, procedimientos) y se utilizan variables con tipos
    de datos y otros tipos abstractos de datos. Generalmente son independientes
    de la plataforma. Dentro de esta categoría, también se pueden clasificar en
    subtipos:

    -   **Lenguajes de sistemas**: lenguajes orientados a la programación de
        sistemas de bajo nivel, dado que ofrecen un gran control sobre la
        memoria. Algunos ejemplos con C, C++, Rust o Zig.
    -   **Lenguajes de _scripting_**: diseñados para programar rápidamente
        o basados en comandos Algunos ejemplos son JavaScript, Python, Bash, R...

-   **Lenguajes orientados a problemas**: lenguajes diseñados para una única
    operación en concreto. En lugar de describir la operaciones que debe hacer el
    computador, generalmente describen cómo debe ser el resultado, lo que reduce
    el tiempo de programación. Un ejemplo claro es SQL.

Sin embargo, existen otras muchas clasificaciones:

-   Imperativo vs Declarativo
-   Tipado fuerte vs débil
-   Tipado estático vs dinámico

Y también clasificaciones según su paradigma:

-   Lenguaje Von Neumann
-   Lenguaje orientado a objetos
-   Lenguaje funcional

# Procesadores de lenguajes

## Compiladores

{{< block "Compilador" "var(--magno-blue)" >}}
Programa **traductor** de un lenguaje de programación a código objeto
equivalente.
{{< /block >}}

{{< block "Código objeto" "var(--magno-blue)" >}}
Se trata del resultado de una compilación. Puede ser código máquina
o _bytecode_, y cada archivo puede corresponderse con un archivo de código
fuente. Para generar el ejecutable final, será necesario _enlazarlos_ entre sí
y añadir librerías externas.
{{< /block >}}

Generalmente, el lenguaje objeto es ejecutable por la computadora, por lo que
también es un lenguaje máquina.

La ventaja principal de este método, es que el compilador **tiene todo el
contexto del programa**, y lo analiza en su totalidad. Como consecuencia, los
**mensajes de error pueden ser más descriptivos**.

Además, permite implementar **técnicas de optimización** para hacer el código
más eficiente. Los compiladores modernos son capaces de escribir código máquina
muy eficiente, probablemente mucho más de lo que lo podría hacer un programador
humano.

{{<
    figure
    src="compilacion-ejecucion.png"
    link="compilacion-ejecucion.png"
    caption="Proceso de compilación y ejecución"
    alt="Proceso de compilación y ejecución"
>}}

Existen muchos ejemplos de lenguajes de programación compilados: Fortran, Cobol,
C, C++, Pascal, Ada, Rust, Odin, Zig, ...

## Intérpretes

{{< block "Intérprete" "var(--magno-blue)" >}}
Aparenta **ejecutar directamente** las instrucciones del lenguaje de
programación.
{{< /block >}}

{{<
    figure
    src="interprete-ejecucion.png"
    link="interprete-ejecucion.png"
    caption="Funcionamiento de un intérprete"
    alt="Funcionamiento de un intérprete"
    height="250"
>}}

Ejemplos de lenguajes interpretados: BASIC, Lisp, Prolog, Python, PHP, Ruby, ...

| Compilador                                      | Intérprete                             |
|-------------------------------------------------|----------------------------------------|
| Se compila una vez y se ejecuta muchas          | El programa se traduce cada vez        |
| Ejecución más rápida (mejores optimizaciones)   | Ejecución más lenta                    |
| La compilación es costosa (temporal y espacial) | No tiene este problema                 |
| Mejores errores (se analiza todo)               | -                                      |
| Mejores para producción                         | Mejores para experimentación           |
| Necesidad de _debuggers_                        | Se permite la interacción en _runtime_ |

## Compilador-Intérprete

{{< block "Compilador-Intérprete" "var(--magno-blue)" >}}
Se **compila** a un **lenguaje intermedio** (o _bytecode_), un código de una
máquina abstracta imaginaria. Para poder ejecutarlo, se utiliza una **máquina
virtual** que ejecute dicho código intermedio.
{{< /block >}}

{{<
    figure
    src="compilacion-mv.png"
    link="compilacion-mv.png"
    caption="Funcionamiento de un Compilador-Intérprete"
    alt="Funcionamiento de un Compilador-Intérprete"
>}}

Como consecuencia, se obtienen los beneficios de un proceso de compilación
(detección de errores, optimización) e interpretación (portabilidad).

{{< dropdown "Estrategia para acelerar el desarrollo de compiladores" >}}
Suponer el caso de que deseamos compilar 4 lenguajes en 4 plataformas.

{{<
    figure
    src="codigo-intermedio.png"
    link="codigo-intermedio.png"
    height="200"
>}}

En lugar de crear 16 compiladores, uno por cada lenguaje y plataforma, lo que se
puede hacer es:

1. Transformar cada lenguaje a un código intermedio común
2. Transformar el código intermedio a cada plataforma

Lo que nos deja con solo 8 artefactos que hay que desarrollar.
{{< /dropdown >}}

Algunos ejemplos son:

- [Java] y la [JVM], la Máquina Virtual de Java
- [.NET] y su runtime
- [Erlang] y [BEAM], la Máquina Virtual de Erlang

## Compilador _Just-In-Time_

{{< block "Compilador _Just-In-Time_ (JIT)" "var(--magno-blue)" >}}
A la hora de ejecutar, se realiza una rápida compilación para generar las
instrucciones máquina directamente a la memoria.
{{< /block >}}

{{<
    figure
    src="compilador-interprete.png"
    link="compilador-interprete.png"
    caption="Funcionamiento de un Compilador _Just-In-Time_"
>}}

{{< todo >}}
Revisar:

- https://kipp.ly/jits-impls/
- https://kipp.ly/jits-intro/
{{< /todo >}}

Se trata de una combinación de la compilación convencional (a veces llamada
[ahead-of-time compilation]) y la interpretación. Esto se puede hacer mediante
la traducción del **código fuente directamente**, pero es más común que se haga
con **código intermedio**: así es como se implementan las máquinas virtuales.

Tiene la ventaja de que se **mejora la velocidad de ejecución**. No es necesario
que se compile en su totalidad al inicio, sino que también se puede ir por
fragmentos.

Ejemplos: Julia, Lua, JavaScript, HolyC...

# El proceso de traducción

{{<
    figure
    src="proceso-traduccion.png"
    link="proceso-traduccion.png"
    caption="El proceso de traducción"
    alt="El proceso de traducción"
>}}

A partir del código fuente almacenado en un archivo de texto:

1.  **Preprocesador**: en una primera fase se procesa el texto para eliminar
    los comentarios. Además, en lenguajes como C y C++, se expanden los macros
    (`#define`), se incluyen otros archivos (`#include`), y otros.
2.  **Compilación**: el código fuente modificado se analiza y se genera el
    código ensamblador equivalente.
3.  **Ensamblado**: dicho ensamblador es transformado a código objeto mediante
    la codificación de las instrucciones en binario.
4.  **Enlazador**: finalmente se combinan todas las _compilation units_ (o
    códigos objeto) y se añaden las librerías necesarias para generar el
    ejecutable final.
 
## Estructura de un compilador

{{<
    figure
    src="../fases-compilacion.png"
    link="../fases-compilacion.png"
    caption="Fases y estructura de un compilador"
    alt="Fases y estructura de un compilador"
>}}

Estas últimas dos fases generalmente se combinan y se mezclan: el compilador
hace varias pasadas de generación y optimización, dependiendo de cada
implementación.


{{< block "Tabla de Símbolos" "var(--magno-blue)" >}}
Estructura de datos que registra los **nombres** de los elementos del código
fuente (variables, procedimientos, etc) junto con sus **atributos**.

Estos atributos son información de utilidad sobre cada uno:

-   Variables: dirección de memoria, tipo de dato, alcance, precisión, si se ha
    declarado, si se ha inicializado...
-   Procedimientos: número y tipos de argumentos, paso por valor o referencia,
    tipo devuelto, recursividad...
{{< /block >}}

Dentro del proceso de compilación, se diferencian varios pasos.

{{< keyvalue title="Fase de análisis o _Frontend_" key-header=true >}}
-%%%% Analizador léxico <br> _Lexer_ :%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
- Entrada: flujo de **caracteres**, normalmente en ASCII
- Salida: flujo de componentes léxicos o **tokens**

{{< block "Token" "var(--magno-blue)" >}}
Secuencia significativa de caracteres del código fuente para que sea más fácil
manipularlos luego: `<tipo,valor/atributo>`.
{{< /block >}}

Algunos ejemplos de tokens:

-   **Palabras clave**: usadas por el lenguaje de programación: `if`, `for`,
    `switch`, `int`, `float`...
-   **Identificadores**: nombres de variables, funciones, tipos de datos...
-   **Operadores**: `+`, `-`, `*`, `/`, `%`, `&`, `|`, `&&`, `||`, ...
-   **Delimitadores**: `;`, `,`, `{ }`

{{< dropdown "Ejemplo" >}}
```
posicion = inicial + velocidad * 60
```

Se convierte en los tokens:

```
<id,1> <=> <id,2> <+> <id,3> <*> <num,60>
```

Con la tabla de símbolos siguiente:

| Número | Nombre    | Valor |
|:------:|:----------|:-----:|
| 1      | posicion  | ...   |
| 2      | inicial   | ...   |
| 3      | velocidad | ...   |
{ .header }
{{< /dropdown >}}

-%%%% Analizador sintáctico <br> _Parser_ :%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
-   Entrada: flujo de tokens del _lexer_
-   Salida: **árbol sintáctico** y comprueba que el programa es sintácticamente
    correcto.

{{< block "Árbol sintáctico (AST)" "var(--magno-blue)" >}}
Representación intermedia en forma de árbol de la estructura de tokens. \
Cada nodo interior representa una operación y los hijos sus argumentos.
{{< /block >}}

<!-- TODO: ejemplo -->

-%%%% Analizador semántico :%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
- Entrada: árbol sintáctico del _parser_

Operaciones:

-   Comprueba que el programa es coherente y tiene sentido usando el árbol
    sintáctico y la tabla de símbolos
-   ***Type checking***: Verifica los tipos de datos sean correctos
-   **Coerciones**: si el lenguaje lo permite, realiza modificaciones de tipos
    en tiempo de compilación

-%%%% Generación de código intermedio :%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
Se linealiza el árbol semántico a una secuencia de instrucciones de una máquina
abstracta simple.

Normalmente es un **código de 3 direcciones**: se asumen que solo hay
un máximo de 3 operandos por instrucción.

{{< keyvalue-sep title="Fase de síntesis o _Backend_" >}}

-%%%% Optimizador de código :%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

Se trata de mejorar el código intermedio:

- Más corto
- Más rápido
- Menor consumo de recursos
- ...

Por lo general, el compilador deberá encontrar el balance entre estas
características, y las versiones actuales son muy buenos.

-%%%% Generación de código :%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

Finalmente se traduce el código intermedio al lenguaje destino (generalmente
código máquina).

También en esta fase, se seleccionan los registros para cada una de las
variables.
{{< /keyvalue >}}

# Diagramas de Tombstone

{{< block "Construcción de compiladores" >}}
En la construcción de un compilador hay que especificar:

- El lenguaje **fuente** que se va a compilar
- El lenguaje **objeto** y la plataforma de ejecución
- El lenguaje de **implementación** en el que está escrito el compilador
{{< /block >}}

{{< block "Diagrama de Tombstone" >}}
Herramienta visual que facilita la comprensión del diseño de compiladores
e intérpretes.
{{< /block >}}

{{<
    figure
    src="tombstone.svg"
    link="tombstone.svg"
    caption="Elementos básicos de un diagrama de Tombstone"
>}}

-   **Compilador**: recibe de entrada un lenguaje fuente y lo convierte a un
    lenguaje objeto. Se ha escrito en un lenguaje de implementación.
-   **Intérprete**: recibe de entrada un lenguaje fuente y lo ejecuta sobre una
    máquina.
-   **Programa**: realiza una acción y ha sido escrito en un lenguaje.
-   **Máquina**: plataforma de ejecución.


{{< block "Unión de diagramas" "var(--magno-red)" >}}
Dos diagramas se pueden unir si los lenguajes (o máquinas) son iguales.
{{< /block >}}

{{<
    figure
    src="tombstone-basicos.svg"
    link="tombstone-basicos.svg"
    caption="Diagramas de Tombstone básicos"
>}}

La principal ventaja de esta herramienta es describir la unión de compiladores:

1.  Escribimos un compilador de Fortran a Mac en C.
2.  Disponemos de un compilador de C a la plataforma Mac, y dicha plataforma.
3.  Podemos compilar el compilador de Fortran usando el compilador de C. Esto
    genera un nuevo compilador que se puede ejecutar directamente sobre Mac.

En lenguaje natural es bastante lioso, pero con un diagrama queda bastante
claro:

{{<
    figure
    src="tombstone-union.svg"
    link="tombstone-union.svg"
    caption="Compilación de un compilador"
>}}

## Compilador cruzado

Es una técnica que permite desarrollar compiladores para máquinas diferentes
a la de desarrollo.

Esto permite **simular una arquitectura** para poder realizar benchmarks sin la
necesidad de construir el chip.

{{<
    figure
    src="tombstone-compilador-cruzado.svg"
    link="tombstone-compilador-cruzado.svg"
    caption="Compilación cruzada"
>}}

El compilador C3 nos permite compilar programas a otra arquitectura. Nótese
también que mediante esta técnica, la nueva arquitectura ya tendrá disponible un
compilador de Fortran, lo que implica que podrá ejecutar aplicaciones escritas
en Fortran.

## Bootstrapping

Bootstrapping es una técnica que consiste en una compilación de varias etapas
para mejorar la expresividad y rendimiento de un compilador.

-   Una forma puede ser la construcción de un compilador de un lenguaje en una
    versión reducida de ese mismo lenguaje.
-   Luego, a partir de sucesivas versiones, se amplia y se mejora el lenguaje de
    programación.
-   Las mayores ventajas se obtienen cuando el compilador está implementado en
    el mismo lenguaje que compila.
-   Un **autocompilador** es aquel que es capaz de compilar su propio código
    fuente.

{{<
    figure
    src="tombstone-boostraping.svg"
    link="tombstone-boostraping.svg"
>}}

## Compilador-Intérprete

Como vimos antes, el uso de un código intermedio facilita la portabilidad entre
plataformas. Veamoslo con un diagrama de Tombstone:

{{< block "Máquina virtual" >}}
La unión del intérprete y la plataforma recibe el nombre de máquina virtual.
{{< /block >}}

{{<
    figure
    src="tombstone-compilador-interprete.svg"
    link="tombstone-compilador-interprete.svg"
>}}

Nótese que no es necesario recompilar para ejecutar el mismo programa en Linux,
solo se debe cambiar la máquina virtual.

[Java]: https://en.wikipedia.org/wiki/Java
[JVM]: https://en.wikipedia.org/wiki/Java_virtual_machine
[.NET]: https://dotnet.microsoft.com/
[erlang]: https://www.erlang.org
[BEAM]: https://en.wikipedia.org/wiki/BEAM_(Erlang_virtual_machine)
[ahead-of-time compilation]: https://en.wikipedia.org/wiki/Ahead-of-time_compilation
