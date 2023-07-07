---
title: El Binomio Newton y el Triángulo de Pascal
description: >
    El binomio de Newton y el multinomio de Leibniz. La identidad y el triángulo
    de Pascal. El principio de inclusión-exclusión.

date: 2023-06-12T02:18:48+02:00
weight: 7
math: true
---

# Binomio de Newton

{{< block "Teorema" "var(--magno-red)" "black" >}}
$$ (x + y)^n = \sum_{k = 0}^{n} \binom{n}{k} x^k y^{n - k} = \sum_{k = 0}^{n} \binom{n}{k} y^k x^{n - k}$$
{{< /block >}}

Con esto se puede realizar la expansión de cualquier binomio:

$$ (x + y) \\; \ldots \\; (x + y) $$

Y después de desarrollar el producto, quedan las combinaciones posibles de $x$s
e $y$s.

{{< block "Observación" >}}
$$ (x - y)^n = \[x + (-y)\]^n $$
{{< /block >}}

Ejemplos:

$$
\begin{align*}
    (x + y)^2 &= x^2 + y^2 + 2xy \newline
    (x + y)^3 &= x^3 + y^3 + 3x^{2}y + 3y^{2}x \newline
    (x + y)^4 &= x^4 + y^4 + 4x^{3}y + 6x^{2}y^{2} + 4xy^2 \newline
\end{align*}
$$

{{< dropdown "Demostración de $|\mathcal{P}(A)| = 2^{|A|}$ con el Binomio de Newton" >}}
$$ 2^n = (1 + 1)^n = \sum_{k = 0}^{n} \binom{n}{k} \\; 1^k \\; 1^{n - k} = \sum_{k = 0}^{n} \binom{n}{k} = \binom{n}{0} + \binom{n}{1} + \ldots + \binom{n}{n} $$

Donde $\binom{n}{0}$ es el número de subconjuntos de $A$ con 0 elementos,
$\binom{n}{1}$ es el número de subconjuntos con 1 elemento, ... y $\binom{n}{n}$
es el número de elementos de $A$: $|A| = n$.
{{< /dropdown >}}

{{< dropdown "Hay tantos numeros pares como impares" >}}
$$
\begin{align*}
    0 &= (1 + (- 1))^n = \sum_{k = 0}^{n} \binom{n}{k} \\; 1^{n-k} \\; (-1)^k = \newline
      &= \binom{n}{0} - \binom{n}{1} + \binom{n}{2} - \ldots + (-1)^n \binom{n}{n} \newline
      &\implies \binom{n}{0} + \binom{n}{2} + \ldots = \binom{n}{1} + \binom{n}{3} \ldots
\end{align*}
$$
{{< /dropdown >}}

# Multinomio de Leibniz

Nótese que este es una generalización del binomio de Newton, dado que se obtiene
dicha expresión si $k = 2$.

{{< block "Teorema" "var(--magno-red)" "black" >}}
$$ (x_1 + x_2 + \ldots + x_k)^n = \sum_{n = n_1 + n_2 + \ldots + n_k} \binom{n}{n_1 \ldots n_k} \\; x_1^{n_1} \\; x_2^{n_2} \\; \ldots \\; x_k^{n_k} $$
{{< /block >}}

Recuerda que $$ \binom{n}{n_1, \ldots, n_k} = \frac{n!}{n_1! \\; n_2! \\; \ldots \\; n_k!} $$

**Ejemplo**: $$ (x + y + z)^3 = \binom{3}{3 \\; 0 \\; 0} x^3 y^0 z^0 \\;\\; + \\;\\; \binom{3}{2 \\; 1 \\; 0} x^2 y^1 z^0 \\;\\; + \\;\\; \ldots$$

# Identidad de Pascal

{{< block "Teorema" "var(--magno-red)" "black" >}}
$$ \binom{n}{k} = \binom{n - 1}{k - 1} + \binom{n - 1}{k} $$
{{< /block >}}

{{< dropdown "Demostración combinatorial" >}}
Sea un conjunto de $n$ elementos. Sabiendo que el número de subconjuntos de $k$
elementos es $\binom{n}{k}$:

```goat
.----.                                                         (n - 1)   \
| a1 |                            .-----> Contiene a ai -----> (k - 1)    o
| a2 |                           /                                        |
| :: |  Seleccionar k elementos o                                         |-> Principo de adición
| :: |                           \                             (n - 1)    |
| an |                            '---->  No contiene a ai --> (  k  )    o
'----'                                                                   /
```
{{< /dropdown >}}

## Triángulo de Pascal

Gracias a la identidad anterior, se puede dibujar el siguiente triángulo para
calcular el número combinatorio $\binom{n}{k}$, siendo el número de fila $n$
(empezando desde 0) y la posición de columna $k$ (empezando desde 0).

```goat
n=0                         1
n=1                     1       1
n=2                 1       2       1
n=3             1       3       3       1
n=4         1       4       6       4       1
n=4     1       5       10      10      5       1
```

El nuevo valor será la suma de los dos números inmediatamente encima él,
siguiendo la identidad de Pascal: una fila menos ($n-1$) y la posición de
columna actual y anterior ($k$ y $k-1$).

Otra observación es que el triángulo es **simétrico**.

# Principio de inclusión-exclusión

Cuando se cuenta la cantidad de elementos que hay en la unión de dos conjuntos $A$
y $B$, primero se cuentan los elementos de $A$, $|A|$, se añaden los elementos de
$B$, $|B|$, y se eliminan los elementos en común, dado que se han contado dos
veces, $|A \cap B|$.

$$ |A \cup B| = |A| + |B| - |A \cap B| $$

Lo mismo sucede cuando tenemos tres conjuntos $A, B, C$:

$$
\begin{align*}
    |A \cup B \cup C| = &|A| + |B| + |C| \newline
                        - &|A \cap B| - |A \cap C| - |B \cap C| \newline
                        + &|A \cap B \cap C|
\end{align*}
$$

Y en general, se puede extender la definición. En primer lugar se suman todos
los cardinales por separado, luego se restan las interseccion dos a dos, luego
se suman las intersección de tres en tres, etc.

