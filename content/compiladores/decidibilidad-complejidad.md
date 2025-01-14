---
title: Decidibilidad y Complejidad
description: >
    Lenguajes generados por las máquinas de Turing. Análisis de la complejidad
    de una máquina de Turing y las clases de complejidades P y NP. Decibilidad
    y el problema de la parada.
date: 2025-01-14T13:19:14+01:00
weight: 7
math: true
---

# Lenguajes recursivos (LRC) y recursivamente enumerables (LRE)

{{< block "Lenguaje Recursivamente Enumerable (LRE)" "var(--magno-blue)" >}}
Un lenguaje $L$ es recursivamente enumerable (LRE) si existe una [máquina de
Turing] que **acepta cualquier cadena del lenguaje y se para**:

$$ q_0 w \vdash^* x_1 q_f x_2 $$

Si $w$ es una palabra del lenguaje ($w \in L$) y $q_f$ es un estado final ($q_f
\in F$).

Sin embargo, si $w$ no es del lenguaje ($w \notin L$), la máquina se **parará en
un estado no final** o **entrará en un bucle infinito**.

[máquina de Turing]: {{< ref "compiladores/maquinas-turing" >}}
{{< /block >}}

Es decir, los LRE son la clase de lenguajes que aceptan las máquinas de Turing.

{{< block "Lenguaje recursivo (LRE)" "var(--magno-blue)" >}}
Un lenguaje $L$ sobre un alfabeto $\Sigma$ es recursivo (LRC) si existe una MT
que acepta $L$ y **se para con cualquier cadena** de $\Sigma^+$, se acepte o no.
{{< /block >}}

Los lenguajes LRC garantizan que la MT que los acepta terminará siempre y nunca
entrará en un bucle infinito.

**Hay lenguajes que no son LRE**. La demostración es compleja, puesto que todos
los lenguajes descritos de forma algorítmica son aceptados por MT.

# Decidibilidad

Ya [hemos visto] que una función $f$ es [computable] en un dominio si existe una MT
que computa el valor de $f$ para todos los argumentos del dominio.

Si **el resultado de la computación de un problema es Sí / No**, se habla de
decidibilidad / indecidibilidad (respectivamente).

{{< block "Decidibilidad" "var(--magno-blue)" >}}
Los problemas decidibles son aquellos en los que existe una MT que da la
**respuesta correcta** (Sí o No) para cada argumento del dominio. Esto significa
que si **un problema es computable, también será decidible**.
{{< /block >}}


## Problema de la parada

Sea $M$ una MT cualquiera, descrita por la cadena $w_M$, y sea $w$ una cadena
de entrada a la máquina $M$.

Una solución al problema de la parada sería una [máquina de Turing universal] $H$ en la que, para
cualquier máquina $M$ (cualesquiera $w_M$ y $w$), se ejecuta una computación
para determinar si **$M$ entra en un bucle infinito o no**:

- $q_0 w_M w \vdash^\* x_1 q_y x_2$, si $M$ aplicada a $w$ se para
- $q_0 w_M w \vdash^\* x_1 q_n x_2$, si $M$ aplicada a $w$ no se para

$q_y$ el es estado final representando la respuesta _Sí, se para_ y $q_n$ de la
respuesta _No, no se para_, para la máquina $H$.

No existe ninguna MT $H$ que se comporte como se require para el problema de la
parada: **es un problema indecidible**. De lo contrario, entonces todos los LRE
sería LRC.

{{< youtube S1PVPluvV9I >}}

{{< block "Nota" >}}
Ver también el artículo sobre [algoritmos]({{< ref "mates/discretas/algoritmos/#problemas-indecidibles" >}})
{{< /block >}}

<!-- TODO: ya explicado en mates/discretas/algoritmos -->

# Complejidad computacional

Para determinar la complejidad computacional de cualquier algoritmo:

- Usaremos máquinas de Turing
- El tamaño del problema será $n$
- Interesa saber cuánto aumenta el tiempo al incrementar $n$

{{< block "Complejidad temporal" "var(--magno-blue)" >}}
Si cualquier cadena $w$ de $L$ y con menos símbolos que $n$ ($|w| \le n$) **es
aceptada en $O(T(n))$ movimientos**, entonces se dice que la MT acepta $L$ en
tiempo $T(n)$.

Por tanto, si una computación tiene una complejidad temporal $T(n)$, significa
que **puede ser resuelta en no más de $T(n)$ movimientos de una MT** para un
tamaño de problema $n$.
{{< /block >}}

Es decir, que una computación o MT **tiene complejidad temporal de $T(n)$ si
acepta o termina en menos de esos movimientos** sea cual sea la entrada.
Generalmente, no nos interesará el tiempo exacto, pero sí el [orden de
magnitud].

Desde el punto de vista de la decidibilidad, todas las MT son equivalentes; pero
**desde el punto de vista de la complejidad no**. Por ejemplo, para reconocer el
lenguaje $L = \set{a^n b^n | n \ge 1}$:

- MT estándar: $O(n^2)$
- MT con dos cintas: $O(n)$

{{< dropdown "Problema de la satisfacibilidad (SAT)" >}}
Partiendo de expresiones en forma normal conjuntiva: $e = t_i \lor \ldots \lor
t_k $, donde $t_i = s_m \land \ldots \land s_q$ y con $s_i$ variables o sus
negaciones.

Dada una expresión $e$, ¿hay alguna asignación de valores a sus variables que
haga $e$ verdadera?

Algunos ejemplos:

- $e_1 = (\neg x_1 \lor x_2) \land (x_1 \lor x_3)$
- $e_2 = (x_1 \lor x_2) \land \neg x_1 \land \neg x_2$

Entonces, la complejidad:

- MT estándar: $O(2^n)$
- MT no determinista: $O(n)$
{{< /dropdown >}}

## Complejidades P y NP

{{< block "Nota" >}}
Ver también el artículo sobre [algoritmos]({{< ref "mates/discretas/algoritmos/#p-vs-np" >}})
{{< /block >}}


{{< block "Teorema" "var(--magno-red)" >}}
Para cualquier cadena $w$ de $L$, existe al menos una secuencia de movimientos
$O(T(|n|))$ en una **máquina de Turing no determinista** que lleva a la
aceptación.
{{< /block >}}

-   Un lenguaje $L$ pertenece a la clase $\operatorname{TD}(T(n))$ si hay una
    **MT multicinta determinista** que acepta $L$ en tiempo $T(n)$.
-   Un lenguaje $L$ pertenece a la clase $\operatorname{TND}(T(n))$ si hay una
    **MT multicinta no determinista** que acepta $L$ en tiempo $T(n)$.

$$ \operatorname{TD}(T(n)) \subseteq \operatorname{TND}(T(n)) $$


{{< block "P" "var(--magno-blue)" >}}
$P$ es el conjunto de lenguajes aceptados por una **MT determinista** en tiempo
polinómico.
$$ P = \bigcup_{i \ge 1} \operatorname{TD}(n^i) $$
{{< /block >}}

{{< block "NP" "var(--magno-blue)" >}}
$NP$ es el conjunto de lenguajes aceptados por una **MT no determinista** en
tiempo polinómico.
$$ NP = \bigcup_{i \ge 1} \operatorname{TND}(n^i) $$
{{< /block >}}

Sabemos que $P \subseteq NP$, pero... $$ P \overset{?}{=} NP $$ Este es un
**problema del milenio**, todavía sin resolver.

{{< block "Problemas intratables" "var(--magno-blue)" >}}
Problemas computables pero que requerirían, para entradas grandes, tal cantidad
de recursos (tiempo y memoria) que **su implementación no es viable** en la
práctica.
{{< /block >}}

{{< block "Tesis Cook-Karp" "var(--magno-red)" >}}
Los problemas de la clase $P$ son tratables y el resto son intratables.
{{< /block >}}

{{< block "Lenguajes reducibles en tiempo polinómico" "var(--magno-blue)" >}}
Un lenguaje $L_1$ es reducible en tiempo polinómico a otro lenguaje $L_2$ si
existe una MT determinista tal que cualquier cadena $w_1 \in \Sigma_1^+$ **puede
ser transformada en tiempo polinómico en otra cadena** $w_2 \in \Sigma_2^+$ de
forma
que:
$$  w_1 \in L_1 \iff w_2 \in L_2$$
{{< /block >}}

-   Si $L_1$ es reducible en tiempo polinómico a $L_2$ y $L_2 \in P$, entonces $L_1
    \in P$.
-   De igual forma, si $L_2 \in NP$, entonces $L_1 \in NP$.

Es decir, que es posible transformar un problema (o computación, representado
como una cadena de un lenguaje) a otro por una MT en tiempo polinómico. Si uno
de estos problemas es de la clase $P$ o $NP$, entonces el otro también lo será,
dado que **se puede convertir de uno a otro sin un gran coste adicional**.

{{< block "$NP$-completo" "var(--magno-blue)" >}}
Un lenguaje $L$ es $NP$-completo si $L \in NP$ y todo $L' \in NP$ es reducible
en tiempo polinómico a $L$.
{{< /block >}}

Además, existe un conjunto de problemas $NP$, donde todos son reducibles en
tiempo polinómico entre sí.

[hemos visto]: {{< ref "compiladores/maquinas-turing/#computación-de-funciones" >}}
[computable]: {{< ref "compiladores/maquinas-turing/#block-turingcomputable" >}}
[orden de magnitud]: {{< ref "mates/discretas/algoritmos/#big-o-omega-y-theta" >}}
[máquina de Turing universal]: {{< ref "compiladores/maquinas-turing/#mt-universal-mtu" >}}
