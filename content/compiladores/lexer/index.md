---
title: Análisis Léxico
description: >
    Primera fase del proceso de compilación: el análisis léxico del código
    fuente. Esto consiste en la transformación del archivo de entrada en una
    secuencia de componentes léxicos o _tokens_ para facilitar el trabajo de
    fases posteriores. Veremos que está muy relacionado con la teoría de
    autómatas.
date: 2025-05-24T14:12:06+02:00
weight: 11
draft: true
math: true
---

# Introducción

{{<
    figure
    src="../fases-compilacion.png"
    link="../fases-compilacion.png"
    caption="Fases y estructura de un compilador"
    alt="Fases y estructura de un compilador"
>}}

El análisis léxico o _lexer_ (_**lex**ical analyz**er**_) es la primera fase del
proceso de compilación, y funciona en sintonía con la fase siguiente del
análisis sintáctico: siguen el **patrón productor-consumidor**. Recibe de
entrada **el código fuente**, una secuencia de caracteres hasta un fin de
fichero; y produce una **secuencia de componentes léxicos**.

Por tanto, funcionamiento es el siguiente:

1.  El analizador sintáctico inicia el proceso de compilación.
2.  Como necesita componentes léxicos de entrada, se los pide al analizador
    léxico.
3.  El analizador léxico accede al sistema de entrada para leer el archivo de
    código fuente.
4.  Consumirá los caracteres necesarios para generar un componente léxico.
5.  A medida que recibe los caracteres, el autómata finito del analizador léxico
    realizará las transiciones de estado pertinentes.
5.  Finalmente devolverá el componente léxico reconocido al analizador
    sintáctico para que lo analice.

Este proceso se repite, mientras el analizador sintáctico va creando su
estructura interna según la gramática del lenguaje.

{{<
    figure
    src="productor-consumidor.png"
    link="productor-consumidor.png"
    height="500"
    caption="Modelo productor-consumidor de las primeras fases de un compilador"
>}}


{{< block "Tareas del analizador léxico" >}}
1.   Reconocer los **componentes léxicos** del lenguaje.
2.   Eliminar los caracteres del código fuente sin significado: **espacios en
     blanco**, **saltos de línea**...
3.   Eliminar los **comentarios**.
4.   Reconocer los **identificadores** de variables, funciones, constantes, etc;
     y registrarlos en la tabla de símbolos.
5.   Reportar los **errores léxicos** detectados. Relacionar el error con la
     posición dentro del archivo del código fuente.
{{< /block >}}

## Ventajas

En general, esta separación es beneficiosa dado que aporta modularidad
y claridad al compilador (**divide y vencerás**).

-   **Formalización de las expresiones regulares**: existe un método sistemático
    para la generación de analizadores léxicos eficientes.
-   **Simplificación del análisis**: se aisla el análisis sintáctico de la
    llegada de caracteres inesperados, por lo que solo trabaja con la estructura
    del lenguaje.
-   **Mejor eficiencia**: dado que cada fase está especializada en unas
    determinadas tareas, se pueden aplicar técnicas específicas de mejora en
    cada una.
-   **Mejor portabilidad**: se puede modificar el analizador léxico (para
    implementar alfabetos diferentes, por ejemplo) sin afectar el resto del
    compilador.

## Diseño

El diseño del analizador léxico se puede separará en varias etapas:

1.  [Especificación] mediante [expresiones regulares] de los términos léxicos del
    lenguaje fuente.
2.  Obtención de un [autómata finito] que implemente dichas expresiones
    regulares.
3.  [Minimizar el autómata] para que el reconocimiento sea lo más eficiente
    posible.
4.  Diseño e implementación del [sistema de entrada].
5.  Diseño e implementación de la [tabla de símbolos].
6.  Diseño e implementación de una estrategia de [manejo de errores].

## Definiciones

{{< block "Componente léxico <br> _Token_" "var(--magno-blue)" >}}
Formalmente, se trata de un símbolo terminal de la [gramática] que define el
lenguaje fuente.

Secuencia significativa de caracteres del código fuente, para que luego sea más
fácil manipularlos luego. Se les pueden añadir atributos e información extra que
pueda ser de utilidad al compilador.

Pueden ser **signos de puntuación** (`.,()[]{}`), **operadores** (`+-*/% == <= =`),
**palabras reservadas** (`while`, `for`, `if`, `else`), **identificadores**
(nombres de variables, métodos, tipos de datos, clases, etc)...

[gramática]: {{< ref "gramaticas.md#definición-de-gramática" >}}
{{< /block >}}

{{< block "Patrón" "var(--magno-blue)" >}}
[Expresión regular] que define el conjunto de cadenas correspondientes con un
componente léxico.

[Expresión regular]: {{< ref "lenguajes-regulares.md" >}}
{{< /block >}}

{{< block "Lexema" "var(--magno-blue)" >}}
Cadena de caracteres presente en el código fuente y que coincide con un patrón
de un componente léxico.
{{< /block >}}

Por ejemplo, `[0-9]+` es un patrón que identifica el lexema `317`, un componente
léxico de tipo literal entero.

{{< block "Atributos" "var(--magno-blue)" >}}
Acompaña a cada componente léxico encontrado, y permite su identificación
y análisis posterior. En la práctica, un único atributo apunta a una entrada de
la tabla de símbolos.
{{< /block >}}

# Especificación del analizador

{{< block "Nota" >}}
Revisar los artículos sobre [lenguajes regulares] y [autómatas finitos].

[lenguajes regulares]: {{< ref "lenguajes-regulares.md" >}}
[autómatas finitos]: {{< ref "automatas-finitos.md" >}}
{{< /block >}}

## Expresiones regulares

{{< block "Importante" "var(--magno-red)" >}}
El analizador léxico debe detectar el componente léxico con el **lexema más
largo** posible.

Por ejemplo, debe poder diferenciar entre `>` y `>=`, `=` y `==`, o reconocer
números; y esto solo lo puede hacer en el **carácter siguiente al último**.
Nótese que no todos los componentes léxicos requieren eso, por ejemplo los
comentarios de bloque.
{{< /block >}}

Una expresión regular $r$ permite representar patrones de caracteres. El
conjunto de cadenas representado por $r$ se denomina **lenguage generado por
$r$** y se denota como $L(r)$.

{{< dropdown "Recordatorio de Expresiones Regulares" >}}
Para un alfabeto de símbolos $\Sigma$, podemos construir palabras (o cadenas)
tomando secuencias de dichos símbolos. Un lenguaje es un conjunto de estas
palabras.

- $\varnothing$ es una expresión regular y $L(\varnothing) = \set{}$
- La cadena vacía $\lambda$ es una expresión regular y $L(\lambda) = \set{\lambda}$
- Cualquier símbolo $a \in \Sigma$ es una expresión regular y $L(a) = \set{a}$

A partir de estas expresiones se pueden lenguajes y combinarlos entre sí con las
siguientes operaciones:

-   **Concatenación**: si $r$ y $s$ son expresiones regulares, entonces $rs$
    representa la concatenación de ambas. Además, $L(rs) = L(r) L(s)$.

-   **Unión**: si $r$ y $s$ son expresiones regulares, entonces $r | s$ también;
    y $L(r | s) = L(r) \cap L(s)$.

-   **Cierre o clausura**: si $r$ es una expresión regular, entonces $r^\ast$
    también; y $L(r^\ast) = L(r)^\ast$.

Adicionalmente, aunque no son estrictamente necesarias, se añaden las siguientes
operaciones:

-   **Clausura 1 o más**: $r^+ = r r^\ast$
-   **Opcional**: $r? = r | \lambda$
-   **Grupos**: $[abc] = a | b | c$. \
    También se permiten rangos de caracteres, ambos inclusive (según su
    codificación ASCII): $[a{-}z] = a | b | c | \ldots | z$.
{{< /dropdown >}}

{{< dropdown "Ejemplos" >}}
- $a|b = \set{a, b}$
- $(a|b)(a|b) = aa | ab | ba | bb = \set{aa, ab, ba, bb}$
- $a|b = \set{a, b}$
- $a^\ast = \set{\lambda, a, aa, aaa, \ldots}$
- $a^+ = \set{a, aa, aaa, \ldots}$
- $(a|b)^\ast = (a^\ast b^\ast)^\ast = \set{\lambda, a, b, aa, ab, ba, bb, aaa, \ldots}$
{{< /dropdown >}}

Pero por conveniencia, cambiaremos la notación para poder dar nombres a las
diferentes expresiones:

$$
\begin{align*}
    \text{digito} &\rightarrow [0{-}9] \\
    \text{digitos} &\rightarrow \text{digito}^+ \\
    \text{fraccion} &\rightarrow . \text{digitos}? \\
    \text{exponente} &\rightarrow (E (+|-)? \text{digitos})? \\
    \text{numero} &\rightarrow \text{digitos} \: \text{fraccion} \: \text{exponente} \\
\end{align*}
$$

## Autómatas finitos

Podremos utilizar [autómatas finitos] para implementar las expresiones regulares
que definen el lenguaje fuente, siguiendo un método sistemático. Se ha probado
que este mecanismo es capaz de reconocerlas en $O(n)$, por lo que se trata de un
método muy eficiente.

Por tanto, a partir de las expresiones regulares del lenguaje:

1.  Generar el AFN-$\lambda$ equivalente con la [Construcción de Thompson].
2.  Transformar a su AFD correspondiente mediante el método de [construcción
    de subconjuntos].
3.  [Minimizar el autómata].

Un analizador léxico no es más que un conjunto de autómatas finitos que
reconocen los diferentes componentes léxicos de las expresiones regulares del
lenguaje fuente.

## Herramienta flex

Existen herramientas que generan analizadores léxicos de forma automática
a partir de las expresiones regulares. Una de las más populares es **flex**,
_Fast Lexical Analyzer Generator_.

Flujo de trabajo en Flex:

1. Escribir la especificación usando expresiones regulares: `lang.l`
2. Compilar con `flex`: `lang.yy.c`
3. Compilar con un compilador de C: `exe`
4. Ejecutar: recibe un programa fuente y genera la secuencia de componentes léxicos.

Formato del archivo de especificación `lang.l`:

```c
/* Sección de definiciones */
delim   [ \t\n]
espacio {delim}+
letra   {A-Za-z]
digito  [0-9]
id      {letra}({letra}|{digito})*

%%

/* Sección de expresiones regulares */
{eb}
"if"       {return(IF);}
"then"     {return(THEN);}
"else"     {return(ELSE);}
{id}       {yylval = inserta_tabla(); return(ID);}

%%

/* Sección de rutinas auxiliares */
void inserta_tabla() {
    /* inserta el token en la tabla de símbolos */
}
```

{{< block "Más información" >}}
- [Repositorio de flex](https://github.com/westes/flex)
- [Manual de flex](https://www.ksi.mff.cuni.cz/teaching/nswi098-web/download/flex.pdf)
{{< /block >}}

# Sistema de entrada

{{< block "Sistema de entrada" "var(--magno-blue)" >}}
Conjunto de rutinas que interactúan con el sistema operativo para la lectura de
datos del programa fuente.
{{< /block >}}

Se trata de una separación lógica, no corresponde con una nueva etapa análisis.
Esta separación tiene varias ventajas:

-   **Eficiencia**: al ser una parte especializada del compilador, se puede
    hacer más eficiente. Por ejemplo, en lugar carácter a carácter, se lee un
    buffer completo y se accede a memoria en lugar de al disco. También se debe
    tener en cuenta que algunos sistemas tienen limitaciones de memoria.

-   **Portabilidad**: gracias a este diseño modular, tan solo sería necesario
    escribir un sistema de entrada para cada plataforma, sin tener que modificar
    el resto del código.

Con esta separación, se replicará el **patrón productor-consumidor**.

## Memoria intermedia

El analizador léxico debe leer el [lexema más grande], lo que implica que
necesitemos leer caracteres **de un modo anticipado**.

```fortran
DO J = 1.10   ! Asignación variable J a 1.10
DO J = 1,10   ! Bucle de 1 a 10 con contador J
```

En el ejemplo anterior, cuando el compilador llegue al `.` deberá decidir de qué
sentencia se trata; y por lo tanto volver atrás y procesarlo.

Para ello, se debe incorporar una memoria intermedia:

-   Permita almacenar un bloque de caracteres del disco y apuntar el fragmento
    ya analizado.
-   En caso de devolución de caracteres al sistema de entrada, se puede mover el
    puntero tantas posiciones como caracteres a devolver.

Características de nuestro sistemas de entrada:

-   Lo más **rápido** posible, dado que se ha a estar accediendo a él
    constantemente.
-   Permitir un **acceso eficiente al disco**.
-   Hacer un uso eficiente de la memoria.
-   Soportar lexemas de una longitud considerable.
-   Tener disponibles el lexema actual y el anterior.

## Método del par de memorias intermedias

Este método divide la memoria intermedia en dos mitades de $n$ bytes cada una.
$n$ debe ser múltiplo de la [unidad de asignación] para que el acceso sea más
eficiente.

{{<
    figure
    src="2buffers.png"
    link="2buffers.png"
    caption="Representación de los buffers"
>}}

Punteros utilizados:

- `inicio`: primer carácter del lexema.
- `delantero`: cursor del analizador que va avanzando a medida que se leen caracteres.

Inicialmente, ambos punteros apuntan al mismo carácter, pero `delantero` irá
avanzando por los bloques de la entrada. Tras recorrer el componente léxico, se
podrá copiar el lexema para no perderlo y mover a `inicio` junto a `delantero`
para preparase para el siguiente _token_.

Por lo tanto, cuando se obtiene un carácter del buffer, se deben **comprobar las
siguientes condiciones**:

- **Fin del archivo** (EOF).
- **Fin del bloque $A$**: se carga nuevo contenido en el bloque $B$ y se continúa por él.
- **Fin del bloque $B$**: se carga el contenido en $A$ y se continúa leyendo por él.

Funciona básicamente como una lista circular.

Un problema de esta implementación es que el tamaño del bloque limita el tamaño
máximo del lexema.

{{< block "Tamaño máximo del lexema" "var(--magno-red)" >}}
El tamaño máximo es $2n$, pero el **mínimo es solamente $n$**, dado que se
necesita poder leer el carácter siguiente para poder aceptar. Podría darse el
caso donde el lexema empiece en el último hueco del buffer anterior, lo por lo
que no se podrá cargar uno nuevo o se perdería ese carácter.
{{< /block >}}

Sin embargo, el problema más importante es que esto **no es muy eficiente**,
porque se están haciendo muchas comprobaciones en cada carácter.

## Método del centinela

En el método del centinela también se usan dos buffers para irlos alternando,
pero su particularidad es que añaden un **carácter centinela** (EOF) al final de
cada uno.

{{<
    figure
    src="centinela.png"
    link="centinela.png"
    caption="Representación de los buffers"
>}}

De esta forma, solo se hace una comprobación lógica cada vez que se obtiene el
siguiente carácter. Si la comprobación es positiva, se puede pasar a analizar
qué caso es; pero en el resto, el número de comprobaciones es mucho más pequeño.

# Tabla de símbolos

{{< block "Tabla de símbolos" "var(--magno-blue)" >}}
Estructura de datos usada por el compilador para gestionar los
**identificadores** del programa fuente.

Cuando se encuentra un identificador, este se inserta en la tabla de símbolos
junto con información relevante sobre el mismo (**atributos**).

Cuando el identificador se vuelve a referenciar en el programa, el compilador
**consultará** la tabla de símbolos para obtener la información que necesite.
Futuras fases del compilador, también tendrán acceso para realizar su trabajo
y podrán añadir información adicional:

-   **Analizador léxico**: si no existe, lo añade con su tipo de identificador
    y lexema.
-   **Análisis sintáctico**: añadirá información estructural, entre otros.
-   **Análisis semántico**: durante la verificación de tipos, se realizarán
    consultas.
-   **Generación de código**: consultará la dirección de memoria y el tamaño.
{{< /block >}}

Se trata básicamente de una **base de datos** de los identificadores del
programa fuente. El lexema será la **clave primaria**, dado que es el valor por
el que queremos buscar. Debe soportar operaciones de

- **Inserción**: al encontrarse un nuevo identificador
- **Buscar**: cuando se encuentra un identificador y se quiere saber si está definido
- **Actualizar**: añadir más datos al identificador
- **Borrar**: cuando el identificador sale de ámbito

En los lenguajes de programación, cada identificador normalmente tiene un
**ámbito** concreto en el que se puede usar. Una vez fuera de él, se eliminará
de la tabla dado que no se usará más. Nótese que esto es posible por el patrón
productor-consumidor: en todo momento se están ejecutando todas las fases.

Existen diferentes formas de implementar una tabla de símbolos:

- **No ordenadas**: la programación es más simple, pero la eficiencia es baja.
- **Ordenadas**: existen muchas implementaciones con distintas estructuras de datos.

## Palabras reservadas

```fortran
if then then
    then = else;
else
    else = then;
end
```

Aunque este código es correcto, resulta muy lioso a la hora de leerlo.
Lenguajes más modernos no consideran que esto sea una buena idea.

El analizador sintáctico necesita saber qué palabra reservada aparece en el
código fuente, por lo que el analizador léxico deberá poder reconocerlas de
forma independiente. Existen varias implementaciones posibles:

-   Disponer de una expresión regular para cada palabra clave: esto es poco
    escalable.
-   Tabla de símbolos dedicada a las palabras reservadas
-   Insertar las palabras clave en la tabla de símbolos al inicio del programa,
    y se dará un error cuando el programador intente crear un identificador con
    ese nombre (porque ya existe en la tabla).

# Tratamiento de errores

Cuando en un momento del proceso de compilación, se detecta un error:

-   Se debe mostrar un **mensaje claro y exacto** que permita al programador
    encontrar y corregir fácilmente el error. **Los errores del compilador son
    la principal interfaz con el programador**.
-   Debe **recuperarse del error** e ir a un estado que permita continuar
    analizando el programa en búsqueda de otros errores. Se debe evitar una
    cascada de errores, o pasar por alto otros.
-   **No se debe retrasar** excesivamente el procesamiento de programas
    correctos.

El proceso de recuperación puede adoptar algunas medidas como las siguientes:

- **Ignorar** los caracteres inválidos hasta formar un componente léxico correcto.
- **Eliminar** caracteres que dan lugar a error.
- Intentar **corregir** el error {{< arrow "var(--magno-green)" >}} Intentar
corregir un error puede ser peligroso, posibles acciones indeseadas.

{{< keyvalue title="Errores más característicos" key-header=true key-width="150px" >}}
-% Nombres ilegales de identificadores :%
El nombre del identificador contiene caracteres inválidos. Por ejemplo: `v@r¡a.ble`.

-%  Números inválidos :%
- Caracteres inválidos: `0xFZ`
- Formados incorrectamente: `1.14.749`
- Demasiado grande y produce desbordamiento: `9999999999999999999`

-% Cadenas de caracteres inválidas :%
Cadena demasiado larga, probablemente porque falta alguna comilla.

-% Errores de ortografía en palabras reservadas :%
- Caracteres omitidos: `wile`
- Caracteres adicionales: `whikle`
- Caracteres incorrectos: `whule`
- Caracteres mezclados: `whiel`

-% Fin de archivo :%
Se detecta un fin de archivo durante un análisis de un componente léxico.
{{< /keyvalue >}}

[lexema más grande]:  #block-importante
[Especificación]:     #especificación-del-analizador
[sistema de entrada]: #sistema-de-entrada
[tabla de símbolos]:  #tabla-de-símbolos
[manejo de errores]:  #tratamiento-de-errores
[expresiones regulares]:        {{< ref "lenguajes-regulares.md" >}}
[Construcción de Thompson]:     {{< ref "lenguajes-regulares.md#conversión-de-er-a-autómata-finito" >}}
[autómata finito]:              {{< ref "automatas-finitos.md" >}}
[autómatas finitos]:            {{< ref "automatas-finitos.md" >}}
[construcción de subconjuntos]: {{< ref "automatas-finitos.md#equivalencia-entre-afd-y-afn" >}}
[Minimizar el autómata]:        {{< ref "automatas-finitos.md#minimización-de-un-autómata" >}}
[unidad de asignación]: {{< ref "so/archivos/index.md#block-bloque-de-disco" >}}
