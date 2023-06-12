---
title: Combinatoria
description: >
    Combinatoria es la rama de las matemáticas que estudia la enumeración,
    construcción y existencia de propiedades de configuraciones que satisfacen
    ciertas condiciones establecidas. También estudia las ordenaciones
    o agrupaciones de un determinado número de elementos. En este artículo se
    comentarán principios básicos y sencillos de esta disciplina.

date: 2023-06-11T21:28:55+02:00
weight: 6
math: true
---

# Principio de adición

{{< block "Teorema" "var(--magno-red)" "black" >}}
Sean $A$ y $B$ dos **conjuntos finitos disjuntos** ($A \cap B = \empty$).
Entonces:

$$ | A \cap B | = |A| + |B| $$
{{< /block >}}

> Si un suceso $A$ puede ocurrir $m$ veces distintas y otro suceso $B$ puede
> ocurrir de $k$ maneras distintas, y **ambos sucesos no pueden ocurrir
> simultáneamente**; entonces, el suceso $A$ o $B$ puede ocurrir de $m+k$
> formas.

Por ejemplo: ¿Cuantas formas hay de vestirse con 3 camisetas y 2 polos? Hay $3+2
= 5$ formas.

## Principio de la diferencia

{{< block "Corolario" "var(--magno-red)" "black" >}}
Sea $U$ el universo de todos los sucesos posibles ($U = A \cup \overline{A}, \\;
A \cap \overline{A} = \empty$).

$$ |U| = |A| + |\overline{A}| \implies |A| = |U| - |\overline{A}| $$
{{< /block >}}

# Principio de la multiplicación

{{< block "Teorema" "var(--magno-red)" "black" >}}
Si una tarea puede dividirse en 2 subtareas consecutivas de manera que hay $m$
formas de realizar la primera, y para cada una de ellas hay $k$ formas de
realizar la segunda subtarea, entonces hay $m \times k$ formas distintas de
completar la tarea.

$$ |A \times B| = |B \times A| = |A| \\, |B| $$
{{< /block >}}

Por ejemplo:

- El número de contraseñas posibles con 4 dígitos sin que se repitan: $10 \times
  9 \times 8 \times 7$.
- El número de formas de vestire con 3 pantalones y 2 camisetas: $3 \times
  2 = 6$.

# Principio de biyección

{{< block "Teorema" "var(--magno-red)" "black" >}}
Sean $A$ y $B$ dos conjuntos finitos y la siguinte aplicación biyectiva:

$$ f: A \longrightarrow B $$

Entonces, hay el mismo número de elementos en los dos conjuntos.

$$ |A| = |B| $$
{{< /block >}}

# Principio del palomar / Dirichlet

{{< block "Teorema" "var(--magno-red)" "black" >}}
Si tenemos $n$ palomas (objetos) y $k$ nidales (cajas); entonces, al menos algún
nidal contendendrá:

$$ \bigg\lceil \frac{n}{k} \bigg\rceil $$
{{< /block >}}

# Selecciones de objetos

- **Variaciones** / **permutations**: influye el orden.
- **Combinaciones** / **combinations**: no influye el orden.

## Variaciones: Selecciones ordenadas sin repetición

Sea $A = \Set{a_1, \ldots, a_n}$ un conjunto finito de $n$ elementos y $r$ un
número natural ($r \ge 0$) con la condición de que $r \le n$.

{{< block "Definición" "var(--magno-blue)" "black" >}}
Una variación de orden $r$ de los $n$ elementos es una lista o selección
ordenada de $r$ elementos distintos de $A$.

$$ V(n, r) = \frac{n!}{(n - r)!} $$

Se lee **variaciones de $n$ elementos de orden $r$**.
{{< /block >}}

```goat
  .---.              .-----.
 /  1  \             |  a  |    1  ---->  puede ir a    n    posiciones
.   2   .            |  b  |    2  ---->  puede ir a  n - 1  posiciones
|   3   |            |  c  |    3  ---->  puede ir a  n - 2  posiciones
|   4   | ---------> |  d  |    4  ---->  puede ir a  n - 3  posiciones
|   5   |            |  e  |    :            :          :      :
'   6   '            |  f  |  r - 1 --->  puede ir a  n - (r - 2) posiciones
 \  7  /             |  g  |    r   --->  puede ir a  n - (r - 1) posiciones
  '---'              '-----'
                        A
```

## Caso particular: Permutaciones

Cuando $n = r$:

$$ V(r, n) = \frac{n!}{(n - r)!} = \frac{n!}{(n - n)!} = \frac{n!}{0!} = n! $$

## Permutaciones con repetición

Las distintas ordenaciones ordenadas son permutaciones con repetición de $n$
objetos con $n_1, n_2, \ldots, n_r$ repeticiones.

{{< block "Definición" "var(--magno-blue)" "black" >}}
Si disponemos de $r$ tipos de objetos distintos con la condición de que los
objetos de un mismo tipo son iguales entre sí y diferentes de los otros tipos:

$$
\begin{cases}
    n_1 \text{ objetos del tipo 1} \\\\
    n_2 \text{ objetos del tipo 2} \\\\
    \vdots \\\\
    n_r \text{ objetos del tipo r} \\\\
\end{cases}
$$

$$ PR(n; \\; n_1, n2, \ldots, n_r) = \frac{n!}{n_1! \\; n_2! \\; \ldots \\; n_r!} $$

Donde $n = n_1 + n_2 + \ldots + n_r$.
{{< /block >}}

**Caso particular**: solo dos tipos:

$$ PR(n; \\; n_1, \\; n_2) = \frac{n!}{(n - n_1)! \\; n_1!} = \binom{n}{n_1} = \binom{n}{n_2} $$

## Variaciones ordenadas con repetición

Sea $A = \Set{a_1, \ldots, a_n}$ un conjunto finito de $n$ elementos y $r$ un
número natural cualquiera.

{{< block "Definición" "var(--magno-blue)" "black" >}}
$$ VR(n, r) = n^r $$
{{< /block >}}

Esto representa el número de aplicaciones de un conjunto con $r$ elementos
y otro de $n$ elementos. También representa la cantidad de formas de distribuir
$r$ objetos diferentes en $n$ cajas diferentes.

```goat
  .---.              .-----.
 /  1  \             |  a  |    1  ---->  puede ir a n posiciones
.   2   .            |  b  |    2  ---->  puede ir a n posiciones
|   3   |            |  c  |    3  ---->  puede ir a n posiciones
|   4   | ---------> |  d  |    4  ---->  puede ir a n posiciones
|   5   |            |  e  |    :            :       :    :
'   6   '            |  f  |  r - 1 --->  puede ir a n posiciones
 \  7  /             |  g  |    r   --->  puede ir a n posiciones
  '---'              '-----'
                        A
```

## Combinaciones: Selecciones no ordenadas sin repetición

Sea $A = \Set{a_0, \ldots, a_n}$ un conjunto finito de $n$ elementos y $r$ un
número natural $r \le n$ (no se pueden repetir).

{{< block "Definición" "var(--magno-blue)" "black" >}}
Una combinación de orden $r$ de los $n$ elementos de $A$ es un subconjunto (no
influye el orden) de $r$ elemento de $A$.

$$ C(n, r) = \frac{V(n, r)}{r!} = \frac{n!}{(n - r)! r!} = \binom{n}{r} $$
{{< /block >}}

```goat
  .---.              .-----.         Columnas distintos elementos
 /  1  \             |  a  |         Filas en distinto orden: r!
.   2   .            |  b  |   .------------.----------------.-------------------.
|   3   |            |  c  |   | a1 ··· ar  | a2 ··· a (r+1) | a1 a3 ··· a (r+1) |
|   4   | ---------> |  d  |   '------------+----------------+-------------------'
|   5   |            |  e  |     a2 a1 ···  | a3 a2 ··· ar   | a (r+1) a3 ··· a1
'   6   '            |  f  |     ar a2 ···  | ar a3 ··· a2   | a1 a (r+1) ··· a3
 \  7  /             |  g  |       :  :     |     :     :    |    :     :     :
  '---'              '-----'
                        A
```

**Ejemplo**: cadenas de $n$ bits que tengan $r$ 0s o $n - r$ 1s: $C(n, r)$.

## Combinaciones no ordenadas con repetición

Sea $A = \Set{a_0, \ldots, a_n}$ un conjunto finito de $n$ elementos y $r$ un
número natural cualquiera.

{{< block "Definición" "var(--magno-blue)" "black" >}}
Una combinación con repetición de $n$ elementos de $A$ de orden $r$ es una
selección no ordenada (conjunto) de $r$ elementos no necesariamente distintos de
$A$.

$$ CR(n, r) = \binom{n + r - 1}{r} = \binom{n + r - 1}{n - 1} $$
{{< /block >}}

Por ejemplo: Comprar 10 helados de 4 sabores distintos: $\Set{\text{Fresa, Nata,
Chocolate, Vainilla}}$.

```goat
| F F F | N N N | C C | V V |   n sabores, r helados
'-------'-------'-----'-----'   Cadenas de n + (r - 1) bits con
  0 0 0 1 0 0 0 1 0 0 1 0 0     n 0s ó (n - 1) 1s.
```

# Números combinatorios

$$ \binom{n}{r} = \binom{n}{n - r} $$

$n$ sobre $r$, número combinatorio, número binomial.

# Resumen

| Selecciones de $n$ elementos de orden $r$ | Ordenadas | No ordenadas |
|:-----------------------------------------:|:---------:|:------------:|
| Sin repetición | **Variaciones** $$ V(n, r) = \frac{n!}{(n - r)!} $$ $$ r \le n $$  | **Combinaciones** $$ C(n, r) = \binom{n}{r} $$ $$ r \le n $$ |
| Con repetición | **Variaciones con repetición** $$ VR(n, r) = n^r $$ | **Combinaciones con repetición** $$ CR(n, r) = \binom{n + r - 1}{r} $$ |

# El problema de distribución

| $r$ objetos y $n$ cajas | Sin repetición | Cajas no vacías (al menos 1 en cada) | Máximo 1 objeto por caja |
|:-----------------------:|:--------------:|:------------------------------------:|:------------------------:|
| Objetos **diferentes** (importa el orden) | **Número de aplicaciones** $$ r \longrightarrow n $$ $$ VR(n, r) = n^r $$ | **Número de aplicaciones sobre** $$ r \longrightarrow n $$ $$ \sum_{k = 0}^{n} \binom{n}{k} (n - k)^r $$ $$ r \ge n $$ | **Número de aplicaciones inyecticas** $$ r \longrightarrow n $$ $$ V(n, r) = \frac{n!}{(n - r)!} $$ $$ r \le n $$ |
| Objetos **iguales** (no importa el orden) | $$ CR(n, r) = \binom{n + r - 1}{r} $$ | Un elemento en cada caja, el resto sin restricciones $$ CR(n, r-n) = \binom{r - 1}{r - n} $$ $$ r \ge n $$ | ¿Cuántas cadenas de $n$ bits con $r$ 1s? $$ C(n, r) = \binom{n}{r} $$ $$ r \le n $$ |

Número de aplicaciones biyectivas: $ n! $.

Objetos iguales en cajas no vacías:

```goat
|    |    |     |    |
| C1 | C2 | ··· | Cn |
+----+----+ ··· +----+
|  1 |  1 | ··· |  1 |
'----'----'-----'----'
```
Se reparte 1 elemento a cada caja, y el resto se puede rellenar sin ninguna
restricción.
