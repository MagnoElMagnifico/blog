---
title: Máquinas de Turing
description: >
    Definición de una máquina de Turing y algunas de sus variaciones.
    Demostración de que dichas variaciones son equivalentes a la máquina de
    Turing estándar. Máquina de Turing Universal. Computación de funciones y la
    tesis de Church-Turing. Autómatas Linealmente Acotados.
date: 2025-01-13T23:17:52+01:00
weight: 6
math: true
---

# Máquina de Turing (MT)

{{< block "Máquina de Turing" "var(--magno-blue)" >}}
Una Máquina de Turing (MT) es un autómata que cuenta con un dispositivo de
almacenamiento denominado **cinta**.

Asociada con la cinta, existe una **cabeza de lectura/escritura** capaz de
interpretar y manipular los símbolos de la cinta.
{{< /block >}}

En una Máquina de Turing:

- La **entrada está escrita** en la cinta al comienzo
- La **salida se escribirá** en la cinta durante la operación de la MT

$$ M = (Q, \Sigma, \Gamma, \delta, q_0, B, F) $$

- $Q$ conjunto de estados del autómata
- $\Sigma$ es el alfabeto de entrada
- $\Gamma$ es el alfabeto de la cinta
- $\delta$ es la función de transición
- $q_0 \in Q$ es estado inicial
- $B \in \Gamma$ es el espacio en blanco de la cinta ($B \notin \Sigma$)
- $F \subseteq Q$ conjunto de estados finales

{{< arrow "var(--magno-green)" >}} $\Sigma \subseteq \Gamma - \set{B}$ el
alfabeto de entrada es un subconjunto del alfabeto de la cinta sin el espacio
en blanco.

Más concretamente, la función de transición $\delta$:

$$
\delta : Q \times \Gamma \to Q \times \Gamma \times \set{L, R} \\
\delta(q, a) = (p, b, R)
$$

-----

La máquina de Turing puede realizar las siguientes acciones:

- Leer el símbolo a donde apunta la cabeza
- Escribir un nuevo símbolo
- Cambiar de estado
- Mover la cabeza a la izquierda ($L$) o a la derecha ($R$) una única posición

Por tanto, la representación de las transiciones sobre el diagrama tiene este
formato:

```
simbolo_cinta : escritura_cinta, L/R
```

La máquina terminará el procesamiento cuando llega a un estado de parada.

-   **No hay transiciones** definidas para esa combinación de entrada y símbolo.
-   Se asumen que **los estados finales no tienen transiciones definidas**.
    Siempre se detendrá cuando alcance un estado final.

{{< arrow >}} **No es necesario leer todo el contenido** para aceptar. En
cambio, los [AF] y los [AP] sí requieren de leer toda la entrada.

Nótese que la máquina de Turing no solo está limitada a **aceptar cadenas de un
lenguaje**, sino que también puede **realizar computaciones** y dejar el
resultado sobre la cinta.

{{< dropdown "Resumen de las características de la MT estándar" >}}
- Cinta infinita en ambas direcciones.
- Función de transición determinista: máximo 1 movimiento por configuración.
- No hay entrada ni salida específicas: se codifican en la cinta.
{{< /dropdown >}}

# Descripción instantánea

Para mostrar el estado de un determinado momento de una MT, es necesario:

- **Estado**
- Contenido de la **cinta**, incluyendo algunos blancos si son relevantes
- **Posición** de la cabeza de lectura/escritura

Entonces, para $M = (Q, \Sigma, \Gamma, \delta, q_0, B, F)$ una descripción instantánea:

$$ a_1 \ldots a_{k-1} q_1 a_k \ldots a_n $$

Con los $a_i$ representando la cinta ($a_i \in \Gamma$) y $q_1$ siendo el estado
actual y denotando la posición de la cabeza ($q_1 \in Q$). El símbolo sobre el
que se encuentra la cabeza, se representa justo a la derecha de dicho estado
$q_1$.

-   Si $\delta(q_1, a_k) = (q_2, b, R)$, quiere decir que se debe mover a la
    **derecha**:
    $$ a_1 \ldots a_{k-1} q_1 a_k \ldots a_n \vdash a_1 \ldots a_{k-1} b q_2 q_{k+1} \ldots a_n $$

-   Si $\delta(q_1, a_k) = (q_2, b, L)$, quiere decir que se debe mover a la
    **izquierda**:
    $$ a_1 \ldots a_{k-1} q_1 a_k \ldots a_n \vdash a_1 \ldots a_{k-2} q_2 b q_k \ldots a_n $$

Entonces, volviendo a lo que se comentó en el apartado anterior, $M$ **termina
su ejecución** partiendo de $x_1 q_i x_2$, si para algún $\delta(q_j, a)$ **no
definido**:

$$ x_1 q_i x_2 \vdash^{*} y_1 q_j a y_2 $$

-   **Computación**: secuencia de configuraciones que llegan a la parada (entre
    ellas, alcanzar un estado final).
-   **No parada**: $x_1 q_i x_2 \vdash^{\*} \infty$

# Máquina de Turing y Lenguajes

-   Los espacios en blanco se usan para delimitar la cadena de entrada.
-   La cadena vacía no forma parte del lenguaje para poder limitar la región en
    la que se busca la entrada.

$$ L(M) = \set{w \in \Sigma^+ / q_0 w \vdash^* x_1 q_f x_2, \enspace q_f \in F, x_1,x_2 \in \Gamma^*} $$

Una máquina de Turing **acepta las cadenas en las que su ejecución termina en un
estado final**: este conjunto de cadenas determina un lenguaje. Pero si se le
proporciona una cadena que no reconoce, esto es $w \notin L(M)$:

- $M$ se **para en un estado no final**: la rama ha muerto.
- $M$ entra en un bucle infinito: **nunca termina**.

# Computación de funciones

<!-- TODO: yapping sobre el teorema de incompletitud de Gödel -->
<!-- TODO: Hilbert+Turing y la decibilidad -->

{{< block "Turing-Computable" "var(--magno-blue)" >}}
Una función $f$ con dominio $D$ es **Turing-computable** o computable sin más,
si existe una MT $M$ de forma que:

$$ q_0 w \vdash^* q_f f(w) $$

Siendo $q_f$ un estado final ($q_f \in F$) para cualquiera $w$ del dominio
($\forall w \in D$).
{{< /block >}}

{{< block "Teorema" "var(--magno-red)" >}}
Todas las funciones matemáticas comunes, no importa lo complejas que sean, son
Turing-computables.
{{< /block >}}

Ejemplos:

-   MT que, dados dos enteros $x$ e $y$ en unario, compute $x+y$. \
    $w(x) 0 w(y) \vdash^{\*} w(x+y)0 $
-   MT que duplique cadenas de 1s
-   MT que realiza la resta de dos números en formato unario. \
    Un ejemplo: $q_0 111 - 11 = \vdash^{\*} q_f 111 - 11 = -11$

## Combinación de máquinas de Turing

Si podemos computar una función $f(x)$, nada impide computar $f(g(x))$, y muchas
otras combinaciones más complicadas.

Ejemplo:
$$
f(x, y) = \begin{cases}
    x + y & \text{ si } x \ge y \\
    0     & \text{ si } x < y \\
\end{cases}
$$

- Comparador:
    - $q_{C,0} w(X) 0 W(y) \vdash^{\*} q_{A,0} w(x) 0 w(y)$ si $x \ge y$.
    - $q_{C,0} w(X) 0 W(y) \vdash^{\*} q_{A,0} w(x) 0 w(y)$ si $x \ge y$.

- Sumador:
    - $q_{A,0} w(X) 0 W(y) \vdash^{\*} q_{A,f} w(x+y)$

- Borrador:
    - $q_{E,0} w(X) 0 W(y) \vdash^{\*} q_{E,f} 0$

## Tesis de Church-Turing

{{< block "Tesis de Church-Turing" "var(--magno-red)" >}}
**Hipótesis**: cualquier problema de decisión resoluble puede ser transformado
en un problema equivalente para una MT.
{{< /block >}}

Argumentos:

-   Cualquier problema que se pueda resolver en una computadora también se puede
    resolver con una MT. **Los ordenadores actuales son MT optimizadas**.
-   No se ha encontrado **ningún problema resoluble por un algoritmo para el que
    no se pueda resolver mediante una MT**.
-   Se han propuesto modelos alternativos de computación, pero **ninguno ha
    probado ser más potente que la MT**.

Con estos argumentos, lo más probable es que la tesis sea cierta, aún así no ha
sido probada. Usando esta tesis, podemos sustituir en la defición "MT" por
"programa en C", "programa en Java", etc.

{{< block "Definición de algoritmo" "var(--magno-blue)" >}}
Un algoritmo para cualquier función $f: D \to R$ es una MT, la cual dada
cualquier entrada $d \in D$ en su cinta, finalmente se para con la respuesta
correcta $f(d) \in R$ en la cinta:

$$ q_0 d \vdash^* q_f f(d)$$

Siendo $q_f$ un estado final de la MT ($q_f \in F$) y para cualquier valor del
dominio ($\forall d \in D$).
{{< /block >}}

# Otros modelos de máquinas de Turing

Se han propuesto otros modelos de máquinas de Turing con pequeñas variaciones:

- MT con opción de no-movimiento
- MT con cinta semi-infinita
- MT con cinta de entrada

Modelos con almacenamiento más complejo:

- MT multicinta
- MT multidimensional

Otras variaciones:

- MT no deterministas
- ...

Se puede demostrar que todas ellas pueden ser simuladas en una MT estándar
y por tanto **son todas equivalentes**.

## MT con opción de no-movimiento

$$ \delta: Q \times \Gamma \to Q \times \Gamma \times \set{L, S, R} $$

Esencialmente, además de moverse a la derecha o a la izquierda, se añade la
posibilidad de **mantener la cabeza en la posición actual**.

{{< block "Teorema" "var(--magno-red)" >}}
La clase de MT con opción de no-movimiento es equivalente a la clase MT
estándar.
{{< /block >}}

Simulación de una MT con opción de no-movimiento ($\delta$) con una MT
($\delta'$):

-   Por cada transición hacia la izquierda o derecha se dejan inalteradas. \
    $\delta(q_i, a) = (q_j, b, L/R) \implies \delta'(q_i, a) = (q_j, b, L/R)$
-   Por cada transición que no se mueva, simplemente se incluye un paso hacia la
    derecha y luego se regresa a la izquierda.
    $$
    \delta(q_i, a) = (q_j, b, S) \implies
    \begin{cases}
        \delta'(q_i, a) = (q_{jS}, b, R) \\
        \delta'(q_{jS}, c) = (q_j, c, L) \quad \forall c \in \Gamma \\
    \end{cases}
    $$

## MT con cinta semi-infinita

Se trata de una MT cuya **cinta está limitada en un extremo**.

Para simular una MT estándar $M$ por medio de una MT con cinta semi-infinita
$P$, se considera una cinta $P$ con dos pistas. La idea es utilizar una de ellas
cuando la máquina se mueve hacia $+\infty$ y la otra hacia $-\infty$:

-   **Pista superior**: contenido de la cinta de $M$ a la derecha de la
    referencia (situación inicial de $M$).
-   **Pista inferior**: contenido de la cinta de M a la izquierda de la
    referencia y en **orden inverso**.

Los estados de $P$ se dividen en dos conjuntos: un conjunto trabaja con la pista
superior y otro con la inferior. Unos marcadores especiales (como `#`) en el
extremo izquierdo permiten detectar el final de cada pista y cambiar a la otra.

## MT con cinta de entrada

La entrada está escrita en una cinta aparte de sólo lectura.

-   Las transiciones se realizan en función del estado, el símbolo leído de la
    entrada y el símbolo leído por la cabeza lectura/escritura en la cinta.
-   La simulación de una MT estándar es muy sencilla: **copiar el contenido de
    la cinta de entrada a la cinta normal** y operar normalmente desde allí.

Sin embargo, nos interesa simular la MT con cinta de entrada ($M_1$) en una MT
estándar ($M_2$):

-   La MT estándar deberá tener 4 pistas:
    -   Pista 1 con los valores de entrada y otra (2) para indicar dónde está la
        cabeza de lectura (`1` en esa celda, `0` en el resto).
    -   Pista 3 con la cinta normal y otra (4) para indicar la posición de la
        cabeza.

-   La simulación requiere varios movimientos en $M_2$ por cada movimiento de
    $M_1$:

    1.  Posición de partida: extremo izquierdo de la cinta.
    2.  Buscar la posición de la cabeza de lectura en la pista 2.
    3.  Leer el símbolo correspondiente en la pista 1.
    4.  Buscar la posición de la cabeza de lectura/escritura en la pista 4.
    5.  Leer el símbolo correspondiente en la pista 3.
    6.  Escribir en las pistas para representar el movimiento de $M_1$.
    7.  Vuelta a la posición de partida para simular el siguiente movimiento.

## MT multicinta

$$ \delta: Q \times \Gamma^n \to Q \times \Gamma^n \times \set{L, R}^n $$

Básicamente tenemos $n$ cintas independientes (no pistas) sobre las que la
máquina puede operar.

Para simular el comportamiento de una MT multicinta $M_1$ su comportamiento en
una MT estándar $M_2$, se utiliza una técnica similar a la del apartado
anterior: $M_2$ tiene $2n$ pistas:

- Pistas impares: representan el contenido de las cintas
- Pistas pares: representan la posición de la cabeza en cada cinta.

## MT multidimensional

En este tipo de MT, se considera que la cinta es infinita en más de una
dirección, por lo que los movimientos permitidos son izquierda ($L$), derecha
($R$), arriba ($U$), abajo ($D$) y otros (dependiendo del número de
dimensiones). Por ejemplo, para una MT bidimensional:

$$ \delta: Q \times \Gamma \to Q \Gamma \times \set{L, R, U, D} $$

Simulación de una MT bidimensional con una MT estándar: una cinta con dos
pistas:

-   Pista 1: almacena el contenido de la celda bidimensional
-   Pista 2: contiene las direcciones asociadas al contenido de la pista 1
-   Para simular el movimiento, se busca en la pista 2 la dirección de la celda
    a la que se debe desplazar la cabeza de lectura escritura.

Este método se puede expandir fácilmente a cualquier número de dimensiones.

## MT no determinista

$$
\delta: Q \times \Gamma \to 2^{Q \times \Gamma \times \set{L, R}} \\
\delta(q, a) = \set{(p_1, b, R), (p_2, c, L)}
$$

Una MT no determinista puede verse como una MT que puede replicarse a sí misma
cuando sea necesario: por cada posible transición se crea una réplica.

Simulación de una MT no determinista con una MT estándar:

-   Se crea una cinta con $2n$ pistas, donde $n$ es el número de máquinas
    a simular.
-   Cada nueva MT implica la inicialización de dos nuevas pistas.
-   Una pista representa el contenido de la cinta y la otra el estado.

## MT universal (MTU)

-   La diferencia fundamental de una MTU es que son **reprogramables**.
-   Dada una descripción de cualquier MT $M$ y una cadena $w$, una MTU puede
    simular la computación de $M$ para $w$.

Descripción de una MT:

- $Q = \set{q_1, \ldots, q_n}$ siendo $q_1$ el estado inicial y $q_n$ el final.
- $\Gamma = \set{a_1, \ldots a_m}$ siendo $a_1$ un espacio en blanco

Codificación de una MT:

- $q_1 = 1, \enspace q_2 = 11, \ldots$
- $a_1 = 1, \enspace a_2 = 11, \ldots$
- $L = 1, \enspace R = 11$
- $0$ es el símbolo separador

{{< arrow "var(--magno-green)" >}} **Cualquier MT puede ser codificada por 0s
y 1s**. Por ejemplo, la transición $\delta(q_1, a_2) = (q_2, a_3, L)$ se
codifica como: $$ 10110110111010 $$

Funcionamiento de una MTU:

-   Tiene 3 cintas:
    1. Descripción de la máquina a simular
    2. Contenido de la cinta de la máquina
    3. Estado interno de la máquina
-   Se examina el contenido de las cintas 2 y 3, que representan la
    configuración de $M$.
-   Se consulta la cinta 1 para determinar la transición a realizar.
-   Se modifican las cintas 2 y 3 como resultado del movimiento realizado.

Una MT, dado cualquier programa, puede realizar las computaciones especificadas
y es, por tanto, un modelo adecuado de una computadora de propósito general.

# Autómatas Linealmente Acotados (ATA)

{{< block "Autómata Linealmente Acotado (ATA)" "var(--magno-blue)" >}}
Un ALA es un **MT determinista** $M$ con la restricción de que su alfabeto de
entrada $\Sigma$ debe contener dos símbolos especiales:

- `]`: marcador izquierdo, con transiciones del tipo $\delta(q_i, \]) = (q_j, \], R)$
- `[`: marcador derecho,   con transiciones del tipo $\delta(q_i, \[) = (q_j, \[, L)$

$$ L(M) = \set{w \in \Sigma^+ | \enspace q_0[w] \vdash^* [x_1 q_f x_2], \enspace
q_f \in F, \; x_1, x_2 \in \Gamma^* } $$
{{< /block >}}

Restricciones en el uso de la cinta:

-   Funcionamiento tipo pila: autómata con pila
-   Uso de una parta finita de la cinta: autómata de estado finitos
-   Uso de la parte de la cinta ocupada por la cadena de entrada: ALA. Cuanta
    mayor longitud tenga la cadena de entrada, mayor es el espacio a utilizar.

Los ALA son más potentes que los [AP] pero menos que las MT.

[AF]: {{< ref "compiladores/automatas-finitos" >}}
[AP]: {{< ref "compiladores/automatas-pila" >}}
