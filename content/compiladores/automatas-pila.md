---
title: Autómatas de Pila
description: >
    Autómatas de Pila por vaciado de pila, estados finales o deterministas. Cómo
    pasar de APN a APF y viceversa. Equivalencia con gramáticas independientes
    del contexto. Lema del Bombeo para lenguajes independientes del contexto.
date: 2025-01-13T18:18:40+01:00
weight: 5
math: true
---

Para poder representar lenguajes no regulares como $L = \set{0^n 1^n | n \ge
1}$, se necesita tener la capacidad de contar un número indefinido
potencialmente infinito, lo que es imposible de conseguir con un número finito
de estados. Por tanto, estos lenguajes no se pueden generar mediante AF (tampoco
verifica el [lema del bombeo]).

Nótese que sí se pueden generar mediante [gramáticas independientes de
contexto].

Sin embargo, con una pequeña modificación para crear los Autómatas de Pila, será
posible.

# Autómatas de Pila

Un Autómata de Pila (AP) es un [AFN] con [transiciones $\lambda$] en la que se
pueden almacenar una cadena de <<símbolos de pila>> en orden _Last In, First
Out_ (**LIFO**).

-   Puede **recordar una cantidad infinita** de información.
-   Solo pueden **leer un único elemento a la vez**, el de la cima de la pila;
    pero pueden **apilar varios símbolos** a la vez.
-   Reconocen **todos los LIC y sólo estos**. \
    Existen otros lenguajes que no son LIC, por ejemplo: $L = \set{0^n 1^n 2^n | n \ge 1}$. \
    {{< arrow "var(--magno-green)" >}} El proceso de lectura es destructivo:
    comparo el número de 0 con el número de 1, pero ya no puedo contar 2 ahora.

{{< block "Autómata de Pila" "var(--magno-blue)" >}}
$$ P = (Q, \Sigma, \Gamma, \delta, q_0, Z_0, F) $$

-   $Q$ conjunto finito de estados.
-   $\Sigma$ conjunto finito de **símbolos de entrada**.
-   $\Gamma$ **alfabeto de pila** finito. Normalmente contiene algunos símbolos
    del alfabeto de entrada y $Z_0$.
-   **Función de transición** $\delta$: dada una entrada, estado y cima de la
    pila, devuelve un nuevo estado y lo que se añade en la pila.
    $$ \delta: Q \times \Sigma \times \Gamma \to Q \times P(\Gamma) \\ \delta(q_i, a, \gamma_i) = (q_j, \set{\gamma_j})$$
-   $q_0$ estado **inicial** ($q_0 \in Q$).
-   $Z_0$ **símbolo inicial de la pila** ($Z_0 \in \Gamma$).
-   $F$ conjunto de estados de aceptación o **estados finales**.
{{< /block >}}

{{< block "Importante" "var(--magno-red)" >}}
Un AP no determinista no tiene porqué tener un AP determinista equivalente.
{{< /block >}}

{{< block "Importante" "var(--magno-red)" >}}
Todos los hilos o ramas de exploración tienen su propia pila. Si un estado añade
algo a la pila, otro estado no se verá afectado.
{{< /block >}}

Funcionamiento:

1.  Se consume un símbolo de la entrada (o bien $\lambda$).
2.  Se pasa a un estado nuevo.
3.  Se reemplaza el símbolo de lo alto de la pila por una cadena.

{{< arrow "var(--magno-green)" >}} En cada paso se hace `pop` de la pila, por lo
que para conservar el valor, **es necesario volver a insertarlo**. Pero si
realmente se quiere borrar, simplemente **se inserta $\lambda$** en la pila.

Los AP se representan en **diagramas de transiciones**, con cada transición
anotada con el siguiente formato:

```
entrada , cima / añadir_pila
entrada , cima : añadir_pila   <-- Notación alternativa
```

{{< dropdown "Ejemplo de diseño de un AP" >}}
Diseñar un AP para $L_{WWR} = \set{ww^R | w \in (0 + 1)^\*}$.

1.  Se comienza en el estado $q_0$
    1.  Suponemos que la cadena $w$ aún no ha finalizado.
    2.  Se van almacenando los símbolos de entrada leídos en la pila
2.  En cualquier momento, se puede suponer que $w$ ha terminado y se procede
    a leer $w^R$.
    1.  El final de $w$ estará en la cima de la pila.
    2.  Se transita al estado $q_1$.
    3.  AP no determinista:
        -   Podemos suponer que hemos llegado al final de $w$.
        -   También podemos continuar en $q_0$ y seguir almacenando entradas en
            la pila.
3.  En el estado $q_1$, se compara el símbolo recibido con el de la cima de la
    pila.
    -   Si son iguales {{< arrow >}} Se elimina el símbolo de la pila.
    -   Si no son iguales {{< arrow >}} No hemos llegado al final de $w$. **Esta
        rama muere**.
    -   Si la pila se vacía, hemos leído todo $ww^R$ y se acepta la entrada.

<!-- TODO: diagrama de transición para el AF -->
{{< /dropdown >}}

## Descripción instantánea de un AP

$$ (q, w, \gamma) $$

-   $q$ es el estado
-   $w$ es la entrada que **falta** por leer
-   $\gamma$ es el contenido de la pila. La cima se muestra a la izquierda de
    $\gamma$, y el fondo a la derecha.

A partir de esta descripción y a medida que el autómata avanza, se va creando un
árbol con toda la computación.

<!-- TODO: diagrama -->

# Tipos de Autómatas de Pila

Existen dos tipos de AP según su aceptación:

-   **Por estado final**: se acepta la entrada cuando se llega a un estado
    final.
-   **Por vaciado de pila**: se acepta la entrada cuando la pila está vacía
    (incluyendo $Z_0$).

Ambos métodos **son equivalentes** y se puede convertir fácilmente de uno
a otro.

{{< block "Por estado final (APF)" "var(--magno-blue)" >}}
Para todo APF $P = (Q, \Sigma, \Gamma, \delta, q_0, Z_0, F)$ se define el
lenguaje que acepta como:
$$ L(P) =\set{w | (q_0, w, Z_0) \vdash^* (q, \lambda, \alpha) }$$
Para algún estado $q$ de F y cualquier cadena de pila $\alpha$.
{{< /block >}}

{{< block "Por vaciado de pila (APN)" "var(--magno-blue)" >}}
Para todo APN $P = (Q, \Sigma, \Gamma, \delta, q_0, Z_0)$ se define el lenguaje
que acepta como:
$$ N(P) = \set{w | (q_0, w, Z_0) \vdash^* (q, \lambda, \lambda) }$$
Para cualquier estado $q$.
{{< /block >}}

El operador $\vdash^\*$ denota que el autómata realiza cualquier número de
transiciones hasta terminar en el siguiente estado, de forma similar a la
[función de transición extendida].

## Conversión de vaciado de pila a estado final

{{< block "Teorema" "var(--magno-red)" >}}
Sea $L$ el lenguaje de un autómata de pila por vaciado de pila (APN) $P_N$. Entonces,
existe un autómata por estados finales (APF) que genera el lenguaje $L$.
{{< /block >}}

Es decir, siempre podemos convertir un APN a un APF.

**Prueba**:
{.center-text}

$P_F = (Q \cup \set{p_0, p_F}, \Sigma, \Gamma \cup \set{X_0}, \delta_F, p_0, X_0, \set{p_F})$,
donde **$p_0$ es el nuevo estado inicial** y **$p_F$ es el nuevo y _único_
estado final**. $\delta_F$ se define como:

1.  $\delta_F(p_0, \lambda, X_0) = \set{(q_0, Z_0 X_0)}$.

    Se introduce automáticamente en la pila el símbolo $Z_0$. Este será el
    símbolo que borrará $P_N$ cuando termine.

2.  $\forall q \in Q, a \in \Sigma \cup \set{\lambda}, \gamma \in \Gamma$,
    **$\delta_F(q, a, \delta)$ contiene todos los pares de $\delta_N(q, a,
    \gamma)$**.

    Es decir, mantener a $P_N$ como un subautómata del nuevo.

3.  Además, $\forall q \in Q \quad (p_F, \lambda) \in \delta_F(q, \lambda, X_0)$.

    Para todos los estados de $P_N$, insertar una transición que van al nuevo
    estado final $p$ automáticamente (entrada $\lambda$) cuando en la cima de la
    pila queda $X_0$. Esto último significa que $P_N$ ha quitado $Z_0$ y ha
    terminado.

<!-- TODO: diagrama -->

## Conversión de estado final a vaciado de pila

{{< block "Teorema" "var(--magno-red)" >}}
Sea $L$ el lenguaje $L(P_F)$ de algún autómata de pila $P_F = (Q, \Sigma,
\Gamma, \delta_F, q_0, Z_0, F)$. Entonces, existe un AP $P_N$ de forma que $L
= N(P_N)$.
{{< /block >}}

Es decir, al igual que antes, siempre podemos convertir un APF a un APN.

**Prueba**:
{.center-text}

$P_N = (Q \cup \set{p_0, p}, \Sigma, \Lambda = \Gamma \cup \set{X_0}, \delta_N, p_0, X_0)$,
donde **$p_0$ es el nuevo estado inicial** y **$p$ es el nuevo estado final**.
$\delta_F$ se define como:

donde $\delta_N$ se define como:

1.  $\delta_N(p_0, \lambda, X_0) = \set{(q_0, Z_0, X_0)}$.

    Se introduce automáticamente en la pila el símbolo $Z_0$. Este será el
    símbolo que usará $P_F$ para detectar que la pila está vacía.

2.  $\forall q \in Q, a \in \Sigma \cup \set{\lambda}, \gamma \in \Gamma$,
    **$\delta_N(q, a, \gamma)$ contiene todos los pares de $\delta_F(q, a,
    \gamma)$**.

    Es decir, mantener a $P_F$ como un subautómata del nuevo.

3.  $\forall q \in F, \gamma \in \Lambda$, **$\delta_N(q, \lambda, \gamma)$
    contiene $(p, \lambda)$**.

    Para todos los estados finales de $P_F$, añadir una transición con la cadena
    vacía hacia nuestro nuevo estado final $p$.

4.  $\forall \gamma \in \Lambda$, **$\delta_N(p, \lambda, \gamma) = \set{(p,
    \lambda)}$**.

    En este estado final $p$, se eliminarán todos los símbolos que la pila aún
    podría contener para finalmente terminar.

<!-- TODO: diagrama -->

# Equivalencia entre AP y GIC

El objetivo es demostrar que los 3 siguientes lenguajes son todos de la misma
clase:

1. Lenguajes independientes de contexto
2. Lenguajes aceptados por estado final por algún AP
3. Lenguajes aceptados por vaciado de pila por algún AP

Ya hemos demostrado la equivalencia entre (2) y (3) en el apartado anterior.
Demostraremos ahora que de (1) se sigue (3), aunque no necesariamente de (3)
a (1).

{{< block "Conversión de GIC a APN" >}}
Sea la GIC $G = (V, T, Q, S)$. EL AP que acepta $L(G)$ por pila vacía será:
$$P = (\set{q}, T, V \cup T, \delta, q, S)$$

$\delta$ se define como:

1. $\forall A \in V, \enspace \delta(q, \lambda, A) = \set{(q, \beta) | A \to \beta \in P}$
2. $\forall a \in T, \enspace \delta(q, a, a) = \set{(q, \lambda)}$

{{< /block >}}

Características del AP equivalente:

- Tendrá solo un estado
- Aceptará como entradas los símbolos terminales
- La pila almacenará tanto terminales como variables
- La variable axioma será el símbolo inicial de la pila

Y las transiciones se construirán como:

-   Cuando se encuentre la variable $A$ en la cima de la pila, cambiarla por el
    cuerpo de su producción.
-   Cuando se reciba un símbolo terminal de entrada y está en la cima de la
    pila, eliminarlo.

# Autómatas con pilas deterministas

Los APD aceptan un conjunto de lenguajes a _medio camino_ entre los regulares
y las GIC.

Los analizadores sintácticos generalmente se comportan como AFD.

Un AP $P = (Q, \Sigma, \Gamma, \delta, q_0, Z_0, F)$ es determinista si:

-   $\forall q \in Q, a \in \Sigma \cup \set{\lambda}, X \in \Gamma, \enspace
    \delta(q, a, X)$ tiene como máximo un elemento.
-   $\exists a \in \Sigma, \enspace \delta(q, a, X)$ no está vacío, pero
    $\delta(q, \lambda, X)$ sí debe estar vacío.

Es decir, **no hay estados simultáneos** ni **tampoco transiciones con la cadena
vacía**.

# Lema del bombeo para LIC

Para un LIC, el cumplimiento del lema del bombeo es una **condición necesaria**,
pero **no suficiente**.

{{< block "Lema del Bombeo" "var(--magno-red)" >}}
Sea $L$ un LIC. Entonces existe una constante $n$, tal que, para toda cadena $z$
del lenguaje, de longitud $n$, podemos dividirla en $uvwxy$ de forma que se
cumpla:

- $|vwz| \le n$
- $vx \ne \lambda$
- $\forall k \ge 0, uv^kwx^ky \in L$

Formalmente:

$$
\exists n / \quad \forall z \in L, |z| \ge n, \enspace z = uvwxy, \quad
L \in \text{LIC} \implies \begin{cases}
    |vwz| \le n \\
    vx \ne \lambda \\
    \forall k \ge 0, uv^kwx^ky \in L \\
\end{cases}
$$
{{< /block >}}

1.  Elegimos $L$ del que queremos demostrar que no es LIC.
2.  El valor de $n$ es desconocido, por lo que debemos considerar cualquier
    posible valor.
3.  Elegimos $z$
4.  Repetir para todas las descomposiciones:
    1.  Escoger una descomposiciones de $z$ en $uvwxy$, sujeta a las
        restricciones:
        - $vx \ne \lambda$
        - $|vwx| \le n$
    2.  Si $uv^kwx^ky$ pertenece a $L$ para todo $k$
        1. Se verifica el Lema del Bombeo.
        2. No se puede afirmar que el lenguaje sea independiente de contexto.
        3. No es necesario probar otras descomposiciones.
5.  Si el paso anterior no se cumple para ninguna descomposición, no se verifica
    el LB, y por tanto el lenguaje no es LIC.

{{< dropdown "Ejemplo" >}}
$$ L = \set{a^n b^n c^n | n \le 1} $$

1.  Elegimos $z = a^n b^n c^n$.
2.  Como se tiene que cumplir $|vwx| \le n$, $vwx$ no pueden contener al mismo
    tiempo los tres símbolos del alfabeto. Tampoco $vx$, pero al menos tendrá un
    símbolo.
3.  Si consideramos $uv^0wx^0y = uwy$, esta cadena no puede pertenecer a $L$,
    porque faltan elementos de $vx$ para tener el mismo número de $a$, $b$
    y $c$.
{{< /dropdown >}}

# Ejemplos de lenguajes no independientes de contexto

-   $L = \set{0^n 1^n 2^n | p \ge 1}$. \
    Un LIC no puede emparejar 3 grupos de símbolos de acuerdo con su igualdad
    o desigualdad.
-   $L = \set{0^i 1^j 2^i 3^j | i \ge 1 \land j \ge 1}$. \
    Un LIC no puede emparejar dos pares de números que se entrelacen.
-   $L = \set{ss | s \in (0 + 1)^\*}$
    Un LIC no puede emparejar cadenas de longitud arbitraria si se usa un
    alfabeto de más de un símbolo.

[gramáticas independientes de contexto]: {{< ref "compiladores/gramaticas/#gramática-independiente-de-contexto" >}}
[AFN]: {{< ref "compiladores/automatas-finitos/#autómatas-finitos-no-determinista-afn" >}}
[transiciones $\lambda$]: {{< ref "compiladores/automatas-finitos/#afn-lambda" >}}
[lema del bombeo]: {{< ref "compiladores/lenguajes-regulares/#lema-del-bombeo" >}}
[función de transición extendida]: {{< ref "compiladores/automatas-finitos/#función-de-transición-extendida" >}}
