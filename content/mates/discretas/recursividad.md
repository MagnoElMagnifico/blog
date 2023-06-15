---
title: Recursividad
description: >
    Definiciones recursivas y cómo resolver relaciones de recurrencia.

date: 2023-06-15T12:34:48+02:00
weight: 8
math: true
---

# Sucesión

{{< block "Definición" "var(--magno-blue)" "black" >}}
Una **sucesión** de un conjunto $S$ es una aplicación de la forma:

$$
\begin{align*}
    \N &\longrightarrow S \newline
    0 &\longmapsto S_0   \newline
    1 &\longmapsto S_1   \newline
    \vdots
\end{align*}
$$
{{< /block >}}

# Recursividad

{{< block "Definición" "var(--magno-blue)" "black" >}}
**Recursión** es definir un <<objeto>> en términos de sí mismo. Son más fáciles
de programar, pero generalmente son menos eficientes.
{{< /block >}}

{{< dropdown "Ejemplos" >}}
- Algoritmo de Euclides: $\gcd(a, b) = \gcd(b, a \text{ mod } b)$.
- $n! = n (n - 1)!$
- Torres de Hanoi
- Triángulo de Pascal: $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$.
{{< /dropdown >}}

{{< block "Definición" "var(--magno-blue)" "black" >}}
Una **función recursiva** de una sucesión específica cumple

- Uno o más términos iniciales
- **Relación de recurrencia**: una regla para determinar términos siguientes
  a partir de los anteriores.

  Es una ecuación o fórmula que expresa $a_n$ con un subconjunto de $\Set{a_0,
  a_1, \ldots, a_{n-1}}$.

El **término general** o **solución** de la sucesión es la expresión que permite
calcular cualquier término, sin depender de los anteriores.

**Resolver una relación de recurrencia** consiste en encontrar las soluciones,
dando una fórmula para calcular el término n-ésimo.
{{< /block >}}

{{< dropdown "$7, 17, 27, 37, \ldots$" >}}
- Relación de recurrencia: $ a_n = a_{n-1} + 10 $.
- Solución: $ S_n = 7 + n10 $.
{{< /dropdown >}}

{{< dropdown "$1, 1, 2, 5, \ldots$" >}}
- Relación de recurrencia: $ a_n = a_{n-1} + a_{n_2}$.
- Solución: $a_n = \frac{\sqrt{5}}{5} \left(\frac{1 + \sqrt{5}}{2}\right)^n \\;-\\; \frac{\sqrt{5}}{5} \left(\frac{1 - \sqrt{5}}{2}\right)^n$.

Esta es una serie bastante famosa, conocida como la **sucesión de Fibonacci**.
{{< /dropdown >}}

{{< dropdown "Torres de Hanoi" >}}
- Relación de recurrencia: $ a_n = a_{n-1} + 1 + a_{n_1} = 2a_{n-1} + 1$.
    1. Primero se mueven los elementos de arriba: $a_{n-1}$.
    2. Luego se mueve el que queda: $1$.
    3. Y finalmente, los del principio se vuelven a poner por encima: $a_{n-1}$.
{{< /dropdown >}}

# Progresiones

## Progresión Aritmética

$$ \Set{a,\\; a+d,\\; a+2d,\\; a+3d,\\; \ldots} $$

Se suma repetidamente $d$, que es la **diferencia de la suceción**. La relación
de recurrencia es $$ a_n = a_{n-1} + d. $$

## Progresión Geométrica

$$ \Set{a,\\; ar,\\; ar^2,\\; ar^3,\\; \ldots} $$

Se multiplica repetidamente $r$, que es la **razón de la suceción**. La relación
de recurrencia es $$ a_n = ra_{n-1}.$$

# RRLHCC

{{< block "Definición" "var(--magno-blue)" "black" >}}
Se llama **Relación de Recurrencia Lineal Homogénea con Coeficientes
Constantes** (RRLHCC) a una expresión de la siguiente forma:

$$ a_n = c_1 a_{n-1} \\; + \\; \ldots \\; + \\; c_k a_{n-k} $$

Donde $c_i$ son constantes y $c_k \ne 0$.
{{< /block >}}

{{< block "Definición" "var(--magno-blue)" "black" >}}
$$
\begin{align*}
    a_n &= c_1 a_{n-1} \\; + \\; \ldots \\; + \\; c_k a_{n-k} \newline
    r^n &= c_1 r^{n-1} \\; + \\; \ldots \\; + \\; c_k r^{n-k} \newline
    r^n r^{k-n} &= c_1 r^{n-1} r^{k-n} \\; + \\; \ldots \\; + \\; c_k r^{n-k} r^{k-n}\newline
    r^k &= c_1 r^{k-1} \\; + \\; \ldots \\; + \\; c_{k-1} r \\; + \\; c_k = 0 \newline
\end{align*}
$$

La ecuación característica de una RRLHCC de orden $k$, es decir, que tiene $k$
condiciones iniciales, es de la forma:

$$ r^k = c_1 r^{k-1} \\; + \\; \ldots \\; + \\; c_{k-1} r \\; + \\; c_k = 0 $$
{{< /block >}}

## Resolver RRLHCCs

{{< block "Teorema" "var(--magno-red)" "black" >}}
Sea $ a_n = c_1 a_{n-1} \\; + \\; \ldots \\; + \\; c_k a_{n-k} $ la RRLHCC de
orden $k$ y las **raices distintas y reales** de la sucesión característica
$r_1, \\; \ldots, \\; r_k$.

$$ a_n = \alpha_1 r_1^n \\; + \\; \ldots \\; + \\; \alpha_k r_k^n $$

Con las condiciones iniciales, obtenemos un sistema y calculamos $\alpha_1, \\;
\ldots, \\; \alpha_k$.
{{< /block >}}

{{< block "Teorema" "var(--magno-red)" "black" >}}
Dada la relación de recurrencia, y suponemos que las raíces reales de la ecuación
característica son $r_1, \\; \ldots, \\; r_s$ de multiplicidades (veces que se
repiten) $m_1, \\; \ldots, \\; m_s$ respectivamente.

$$
\begin{align*}
    a_n = &(\alpha_{1 \\; 0} \\;+\\; \alpha_{1 \\; 1}n \\;+\\; \alpha_{1 \\; 2}n^2 \\;+\\; \ldots \\;+\\; \alpha_{1 \\; m_1 - 1} n^{m_1 - 1}) r_1^n \newline
          &(\alpha_{2 \\; 0} \\;+\\; \alpha_{2 \\; 1}n \\;+\\; \alpha_{2 \\; 2}n^2 \\;+\\; \ldots \\;+\\; \alpha_{2 \\; m_2 - 1} n^{m_2 - 1}) r_2^n \newline
          &\ldots \\; + \newline
          &(\alpha_{s \\; 0} \\;+\\; \alpha_{s \\; 1}n \\;+\\; \alpha_{s \\; 2}n^2 \\;+\\; \ldots \\;+\\; \alpha_{s \\; m_s - 1} n^{m_s - 1}) r_s^n \newline
        = &\sum_{i=0}^{s} \left( \sum_{j=0}^{m_s - 1} \alpha_{i \\; j} n^j \right) r_i^n
\end{align*}
$$
{{< /block >}}

{{< dropdown "**Ejemplo**: $a_n = a_{n-1} + a_{n-2}$" >}}
1. Obtener la ecuación característica:
   $$ r^n = r^{n-1} + r^{n-2} \implies r^2 = r + 1 \implies r^2 - r - 1 = 0 $$

2. Obtener las raíces, en este caso $\Set{\frac{1 + \sqrt{5}}{2}, \frac{1 - \sqrt{5}}{2}}$

3. Por tanto, la solución general es $a_n = \alpha_1 (\frac{1 + \sqrt{5}}{2})^n \\;+\\; \alpha_2 (\frac{1 - \sqrt{5}}{2})^n$.

4. Se calcula una solución particular a partir de las condiciones iniciales $a_0 = 1$ y $a_1 = 1$.

   $$
   \begin{align*}
        n = 0 \qquad &a_0 = 1 = \alpha_1 \left(\frac{1 + \sqrt{5}}{2}\right)^0 \\;+\\; \alpha_2 \left(\frac{1 - \sqrt{5}}{2}\right)^0 = \alpha_1 + \alpha_2 \newline
        n = 1 \qquad &a_1 = 1 = \alpha_1 \left(\frac{1 + \sqrt{5}}{2}\right)   \\;+\\; \alpha_2 \left(\frac{1 - \sqrt{5}}{2}\right)
   \end{align*}
   $$

   Resolver el sistema: $\alpha_1 = \frac{\sqrt{5}}{5}$ y $\alpha_2 = -\frac{\sqrt{5}}{5}$.

5. Finalmente, la solución es: $$ \frac{\sqrt{5}}{5} \left(\frac{1 + \sqrt{5}}{2}\right)^n \\;-\\; \frac{\sqrt{5}}{5} \left(\frac{1 - \sqrt{5}}{2}\right)^n .$$
{{< /dropdown >}}

# RRLnHCC

{{< block "Definición" "var(--magno-blue)" "black" >}}
Se llama **Relación de Recurrencia Lineal no Homogénea con Coeficientes
Constantes** (RRLHCC) a una expresión de la siguiente forma:

$$
a_n =
    \overbrace{c_1 a_{n-1} \\;+\\; \ldots \\;+\\; c_k a_{n-k}}^{\text{Parte homegénea}}
    \\;+\\; \overbrace{L(n)}^{\text{Parte no homogénea}}
$$
{{< /block >}}

## Resolver RRLnHCC

{{< block "Teorema" "var(--magno-red)" "black" >}}
Sea $a_n = c_1 a_{n-1} \\;+\\; \ldots \\;+\\; c_k a_{n-k} \\;+\\; L(n)$.

Si $a_n^{(p)}$ es una solución particular de la RR y si $a_n^{(h)}$ es una
solución a la parte homogénea, entonces la solución es $$ a_n = a_n^{(p)}
\\;+\\; a_n^{(h)}.$$
{{< /block >}}

### Soluciones particulares

{{< block "Teorema" "var(--magno-red)" "black" >}}
Dada una RRLnHCC $a_n = c_1 a_{n-1} \\;+\\; \ldots \\;+\\; c_k a_{n-k} \\;+\\;
L(n)$ de forma que $L(n) = (p_0 \\;+\\; p_1 n \\;+\\; \ldots \\;+\\; p_t n^t)
S^n = p_t(n)S^n$.

1. Si $S$ **no es raíz** de la RRLHCC asociada, entonces, tiene como solución
   particular $$ a_n^{(p)} = (\beta_0 \\;+\\; \beta_1 n \\;+\\; \ldots \\;+\\;
   \beta_t n^t) S^n.$$

2. Si $S$ **es raíz** de la RRLHCC asociada, entonces tiene como solución
   particular $$ a_n^{(p)} = (\beta_0 \\;+\\; \beta_1 n \\;+\\; \ldots \\;+\\;
   \beta_t n^t) S^n n^m$$ siendo $m$ la multiplicidad de la raíz.
{{< /block >}}

{{< dropdown "**Ejemplo**: $a_n = 1 + 2 + 3 + \ldots + n$, $a_1 = 1$" >}}
La relación de recurrencia es $a_n = a_{n - 1} + n$. $a_{n - 1}$ es la parte
homogénea y $n$ es la parte no homogénea.

1. Solución a la parte homogénea:
   $$ a_n^{(h)} = a_{n-1} \implies r^n = r^{n-1} \implies r = 1 $$
   Por tanto se obtiene que $$ a_n^{(h)} = \alpha 1^n = \alpha.$$

2. Solución particular:
   $$ L(n) = n = (0 + 1n) 1^n \implies s = 1$$

   $s$ es una raíz de multiplicidad 1, por tanto, hay que usar la segunda
   expresión:
   $$ a_n^{(p)} = (\beta_0 + \beta_1 n) 1^n n^1 = \beta_0 n \\;+\\; \beta_1 n^2 $$

   Se sustituye en la relación de recurrencia inicial:
   $$
   \begin{align*}
                 &\beta_0 n \\;+\\; \beta_1 n^2 = \overbrace{\beta_0 (n-1) \\;+\\; \beta_1 (n-1)^2}^{a_{n-1}} \\;+\\; \overbrace{n}^{L(n)} \newline
        \implies &\beta_0 n \\;+\\; \beta_1 n^2 = \beta_1 n^2 \\;+\\; (\beta_0 + 2 \beta_1 + 1)n \\;+\\; (\beta_0 - \beta_1) \newline
        \implies &
            \begin{cases}
                \beta_1 = \beta_1 \newline
                \beta_0 = \beta_0 + 2 \beta_1 + 1 \newline
                0 = \beta_0 - \beta_1
            \end{cases} \newline
        \implies &
            \begin{cases}
                \beta_0 = \frac{1}{2} \newline
                \beta_1 = \frac{1}{2}
            \end{cases}
   \end{align*}
   $$

   Finalmente se obtiene como solución particular:
   $$ a_n^{(p)} = \frac{n^2}{2} \\;+\\; \frac{n}{2} $$

3. Despejar los coeficientes:
   $$ a_n = a_n^{(p)} + a_n^{(h)} = n\frac{n + 1}{2} + \alpha$$

   Sustituir en el caso inicial, $n = 1$:
   $$ a_1 = 1 = 1 \frac{2}{2} + \alpha = \alpha + 1 \implies \alpha = 0$$

Solución: $$ a_n = n \frac{n + 1}{2} $$
{{< /dropdown >}}
