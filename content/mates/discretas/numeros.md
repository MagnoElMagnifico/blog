---
title: Números
description: >-
    Números enteros, divisibilidad, el algoritmo de división y números primos.

date: 2023-06-07T14:54:29+02:00
weight: 2
math: true

draft: true
---

# Números

Siempre vamos a trabajar con números enteros ($\Z$) a partir de ahora. Estos
son los únicos números con los que el ordenador trabaja cómodamente, porque los
números flotantes están sujetos a aproximaciones y errores de precisión.

$\Z$ es un anillo conmutativo (ver Álgebra), no es un cuerpo, por lo tanto es
posible que un número no tenga inverso. Entonces no hay división para todos los
números enteros.

## División Entera

{{< block "Definición" "var(--magno-blue)" "black" >}}
$$ a \\, | \\, b \iff \exists c \in \Z / ac = b \qquad a,b \in \Z$$
{{< /block >}}

Se lee: _a divide a b_, _a es factor de b_, _b multiplica a a_.

{{< block "Teorema" "var(--magno-red)" "black" >}}
$$
\begin{align*}
a | b, \\, a | c \implies& a | (b+c)     \\\\
a | b            \implies& a | (bc)      \\\\
a | b, \\, b | c \implies& a | c         \\\\
a | b, \\, a | c \implies& a | (mb + nc) \\\\
\end{align*}
$$
{{< /block >}}

## Algoritmo de división

El algoritmo de división nos permite encontrar los dos únicos enteros $q$ y $r$
que cumplen:

$$
a = bq + r \implies r = a - bq
$$

con $0 \le r < b$.

Esto permite crear la siguiente definición:

{{< block "Definición" "var(--magno-blue)" "black" >}}
$$
\begin{align*}
    a \text{ mod }{b} &:= a - bq \\\\
    q &:= \bigg\lfloor \frac{a}{b} \bigg\rfloor
\end{align*}
$$
{{< /block >}}

$a \text{ mod } b$ es la operación que devuelve el resto de la división entera entre $a$
y $b$, y la operación _suelo_ sobre un número real $x$, $\lfloor x \rfloor$,
es el mayor entero $z$ tal que $z \le x$.

```goat
           +
     a     | b
  -.   .-  +------
   | r |     q
    '-'
```

Este es el código Python que implementa el algoritmo de división:

```py
def cociente_positivo(a, b):
    q = 0
    while a - q*b >= b:
        q += 1
    return q

def cociente_negativo(a, b):
    q = -1
    while a - q*b < 0:
        q -= 1
    return q

cociente = lambda a, b:
    cociente_positivo(a, b) if a >= 0 else cociente_negativo(a, b)
resto    = lambda a, b: a - cociente(a, b)*b
```

## Máximo común divisor

{{< block "Definición" "var(--magno-blue)" "black" >}}
$\gcd(a, b) = d$ es el **mayor entero** tal que $$d \\,|\\, a \\, \land \\,
d \\,|\\, b$$ siendo $a$ y $b$ dos enteros positivos no nulos.
{{< /block >}}

Se puede calcular tomando los factores primos comunes de $a$ y $b$ elevados al
menor exponente. Pero ojo, **factorizar es NP**!. Para ello es mejor usar el
algoritmo de Euclides.

{{< block "Lema" "var(--magno-red)" "black" >}}
$$ \gcd(a, b) = 1 \land a \\, | \\, (bc) \implies a \\, | \\, c$$
siendo $a$ y $b$ enteros primos positivos no nulos.
{{< /block >}}

{{< block "Lema" "var(--magno-red)" "black" >}}
$$ p \\, | \\, (a_1 \ldots a_n) => \implies p \\, | \\, a_i \text{    (para algún i)}$$
siendo $p$ un número primo y $a_1, \ldots, a_n$ enteros.
{{< /block >}}


### Algoritmo de Euclides

Se trata de un algoritmo de complejidad computacional logarítmica $\Theta(\log
n)$ temporalmente y $\Theta(1)$ espacialmente, por tanto es muy eficiente (mucho
más que factorizando).

Para comprender su funcionamiento, es necesario conocer el siguiente lema:

{{< block "Lema" "var(--magno-red)" "black" >}}
$$ \gcd(a, b) = \gcd(b, a \text{ mod } b) $$
{{< /block >}}

Se comprenderá mejor con un ejemplo:

```goat
  gcd(414, 248)   =   gcd(248, 166)   =   gcd(166, 82)   =   gcd(82, 2)      = gcd(2, 0) = 2
          .                   .                  .                   .
   414    | 248        248    | 166       166    | 82          82    | 2
-.     .- +-----    -.     .- +-----    -.    .- +-----    -.     .- +-----
 | 166 |    1        |  82 |    1        |  2 |    2        |   0 |    41
  '---'               '---'               '--'               '---'
```

Este es el código Python que implementa este algoritmo:

```py
def gcd(a, b):
    dividendo = a
    divisor   = b
    while resto > 0:
        resto     = dividendo % divisor
        dividendo = divisor
        divisor   = resto
    return dividendo
```

Y alternativamente, se puede formular de forma recursiva:

```py
def gcd_re(a, b):
    if min(a, b) == 0:
        return max(a, b)
    else:
        return gcd_re(b, a%b)
```

## Mínimo común múltiplo

{{< block "Definición" "var(--magno-blue)" "black" >}}
$\text{lcm}(a, b) = m$ es el **menor entero** tal que $$a \\,|\\, m \\, \land \\,
b \\,|\\, m$$ siendo $a$ y $b$ dos enteros positivos no nulos.
{{< /block >}}

También se puede calcular tomando los factores primos de $a$ y $b$ elevados al
mayor exponente, pero es mucho más cómodo calcular $$\text{lcm}(a,b)
= \frac{ab}{\gcd(a,b)}.$$

El código en Python para este, ya resulta mucho más sencillo:

```py
lcm = lambda a, b: int(a * b / gcd(a, b))
```

## Teorema de Bézout

{{< block "Teorema" "var(--magno-red)" "black" >}}
$$ \exists \\, s,t \in \Z \quad / \quad \gcd(a, b) = sa + tb $$
siendo $a$ y $b$ dos números enteros.
{{< /block >}}

Esta identidad cobrará particular importancia en Aritmética Modular.

### Algoritmo de Euclides Extendido

Este algoritmo, utiliza la mismas iteraciones que el algoritmo de Euclides, pero
además nos permite calcular los coeficientes de Bézout.

Para ello se reutilizarán las expresiones calculadas en el ejemplo visto en el
algoritmo de Euclides:

$$
\begin{align}
166 =& \\, 414 - 1 \times 248 \\\\
82  =& \\, 248 - 1 \times 166 \\\\
2   =& \\, 166 - 2 \times 82  \\\\
0   =& \\, 82  - 2 \times 41
\end{align}
$$

Y ahora, simplemente se opera:

$$
\begin{align*}
\gcd(414, 248) = 2 =& \overbrace{166 - 2 \times 82}^{(3)}\\\\
                   =& 166 - 2 \times (\overbrace{248 - 1 \times 166}^{(2)}) = 3 \times 166 - 2 \times 248 \\\\
                   =& 3 \times (\overbrace{414 - 1 \times 248}^{(1)}) - 2 \times 248 = 3 \times 414 - 5 \times 248 \\\\
\end{align*}
$$

Por lo que se concluye con que $s=3$ y $t=-5$.

Y este es el código Python correspondiente:

```py
def gcd_ex(a, b):
    (r_ant, r) = (a, b)
    (s_ant, s) = (1, 0)
    (t_ant, t) = (0, 1)
    while r != 0:
        cociente = r_ant // r
        (r_ant, r) = (r, r_ant - cociente * r)
        (s_ant, s) = (s, s_ant - cociente * s)
        (t_ant, t) = (t, t_ant - cociente * t)
    return s_ant, t_ant
```


# Números primos

{{< block "Definición" "var(--magno-blue)" "black" >}}
- **Número primo** $p \in \Z$: solo es divisible entre él mismo y 1; y además $p > 1$.
- **Número compuesto** $n \in \Z$: entero que tiene más divisores que él mismo y 1.
{{< /block >}}

{{< block "Teorema" "var(--magno-red)" "black" >}}
Existen infinitos números primos.
{{< /block >}}

Por ejemplo los **primos de Marsenne**, que son de la forma $2^p - 1$ son buenos
candidatos a ser primos, pero no todos lo son.

{{< block "Teorema fundamental de la aritmética" "var(--magno-red)" "black" >}}
Todo número entero se puede descomponer de forma **única** en producto de
factores primos.
{{< /block >}}

{{< block "Teorema" "var(--magno-red)" "black" >}}
Si $n \in \Z$ es compuesto $\implies \exists \\, p \in \Z \quad / \quad p < \sqrt n$.
{{< /block >}}

Por eso factorizar es un problema NP, se puede comprobar que un número es primo
en tiempo polinómico, porque solo se tiene que iterar hasta la raiz del número.

<!-- TODO: arreglar \sqrt -->

## Unidades e inversos

{{< block "Definición" "var(--magno-blue)" "black" >}}
$a$ es una **unidad** $\iff \exists \\, b \in \Z \quad / \quad ab = 1$.
{{< /block >}}

Por ejemplo, el conjunto de unidades de los enteros es $\set{-1, 1}$.

{{< block "Definición" "var(--magno-blue)" "black" >}}
$a^{-1}$ es el **inverso multiplicativo** de a $\iff aa^{-1} = 1$.
{{< /block >}}

Si se combinan estas dos definiciones, se puede decir que $a$ es una unidad si
tiene un inverso multiplicativo.








