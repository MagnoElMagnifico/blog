---
title: Aritmética Modular
date: 2023-06-07T20:24:38+02:00
weight: 4
math: true
---

# Números coprimos

{{< block "Definición" "var(--magno-blue)" "black" >}}
$a$ y $b$ (enteros) son **primos entre sí** / **coprimos** / **relativamente
primos** si y solo si $$\gcd(a,b) = 1.$$
{{< /block >}}

Esta definición también se puede extender a un conjunto de números, siendo estos
coprimos dos a dos.

# Aritmética modular

Los números enteros se pueden representar en la recta real:

{{< figure
    src="../img/recta-entera.svg"
    alt="La recta de enteros"
    height="100"
>}}

Pero si tomamos una estructura como la siguiente:

{{< figure
    src="../img/reloj-modular.svg"
    alt="Reloj de aritmética modular"
    height="300"
>}}

Los números regresan al 0 cuando se llega a un valor en concreto, llamado
**módulo**. Por este motivo, algunas veces también se le llama aritmética del
reloj. Veamos un reloj como ejemplo, que es de módulo 12. Si son las 10 y pasan
4 horas, podemos decir que son las 2, porque $14 \text{ mod } 12 = 2$.

Por tanto, la aritmética modular consiste en encontrar el resto.

Además, también se pueden tomar números negativos:

{{< figure
    src="../img/reloj-modular-negativos.svg"
    alt="Reloj de aritmética modular con números negativos"
    height="300"
>}}

Esta es la definición intuitiva. A continuación de describe la notación
y algunos teoremas fundamentales.

# Teoremas fundamentales y propiedades de la aritmética modular

La aritmética modular fue introducida en 1801 por _Carl Friedrich Gauss_[^1],
y consiste en una relación de equivalencia llamada **congruencia**. Esta es la
notación que utilizó Gauss:

{{< block "Definición" "var(--magno-blue)" "black" >}}
$$ m \\, | \\, (a - b) \iff a \equiv b \pmod{m} $$
donde $a$, $b$ y $m$ son enteros y $m > 0$.
{{< /block >}}

$a \equiv b \pmod{m}$ se lee como _$a$ y $b$ son **congruentes** módulo $m$_, lo
que quiere decir que su resta es un múltiplo de $m$.

Otra notación puede ser $[a]_m = [b]_m$.

{{< block "Teorema" "var(--magno-red)" "black" >}}
$$
\begin{align*}
a \equiv b \pmod{m} \iff& a \text{ mod } m = b \text{ mod } m \\\\
a \equiv b \pmod{m} \implies& \exists \\, k \in \Z \quad / \quad a = b - km \\\\
\end{align*}
$$
{{< /block >}}

Alternativamente, la congruencia se da cuando los restos de dividir entre $m$
son iguales.

{{< block "Definición" "var(--magno-blue)" "black" >}}
La clase de restos módulo $m$ se denota con $\Z_{/m\Z}$.
{{< /block >}}

{{< block "Teorema" "var(--magno-red)" "black" >}}
$$
\begin{rcases}
    a \equiv b \\\\
    c \equiv d \\\\
\end{rcases}
\implies
\begin{cases}
    a + c &\equiv b + d \\\\
    ac    &\equiv bd    \\\\
\end{cases} \pmod{m}
$$
{{< /block >}}

La congruencia es una relación de equivalencia, por lo que sigue funcionando lo
de sumar y multiplicar por ambos lados valores congruentes. Esto quiere decir
que es compatible con las operaciones del anillo de enteros (suma
y multiplicación).

{{< block "Corolario" "var(--magno-red)" "black" >}}
$$
\begin{align*}
(a + b) \text{ mod } m      &= \[(a \text{ mod } m) + (b \text{ mod } m)\] \\\\
(a \times b) \text{ mod } m &= \[(a \text{ mod } m) \times (b \text{ mod } m)\]
\end{align*}
$$
{{< /block >}}

Y este corolario resulta particularmente interesante cuando se trabaja con
enteros grandes en módulos pequeños, porque en lugar de sumar dichas cantidades,
se pueden sumar los restos, que serán cantidades más pequeñas.

[^1]: https://es.wikipedia.org/wiki/Aritm%C3%A9tica_modular

# Tipos de números en aritmética modular

Un problema de la aritmética modular es el producto de dos enteros no
nulos, puede ser 0 (si el resultado es múltiplo del módulo). Por este motivo, la
resolución de ecuaciones se complica.

Por este motivo, es importante distingir los casos donde se puede dar esta
situación.

- **Divisores de 0**: $\exists \\, b \\, / \\, ab \equiv 0 \pmod{m}$.
- **Unidades en $\Z_{/m\Z}$**: $\exists \\, b \\, / \\, ab \equiv 1 \pmod{m}$.
    - $a$ es una unidad si y solo si $\gcd(a, m) = 1$, es decir, **$a$ y $m$ son coprimos**.
    - Caso particular: si $m$ es primo, entonces todos son unidades.

Donde $a$ y $b$ son enteros no nulos.

# Resolución de congruencias lineales

En los números enteros, la ecuación lineal de una variable $ax = b$ tiene
solución si solo si $a \\, | \\, b$.

En $\Z_{/m\Z}$, una ecuación lineal es de la forma $ax \equiv b \pmod{m}$ y se
puede resolver con el siguiente algoritmo:

1. Calcula $\gcd(a, m) = d$.
2. Si $d$ no divide a $b$, entonces **no hay soluciones**.
3. Si $d \\, | \\, b$ podemos distinguir dos casos:
    - **Si $d = 1$**, es decir, si $a$ y $m$ con coprimos:
        1. Calcular los coeficientes $s$ y $t$ de Bézout.
        2. $\gcd(a, m) = d = 1 \equiv sa + \xcancel{tm} \equiv sa \pmod{m}$.
        3. $sa \equiv 1 \implies asx \equiv bs \implies x \equiv bs \pmod{m}$
        4. **La solución es $x \equiv bs \pmod{m}$ y es única**.

    - **Si $d \not= 1$**: Resolver como en el caso anterior: $\frac{a}{d}x
      \equiv \frac{b}{d} \pmod{\frac{m}{d}}$, dado que $\gcd(\frac{a}{d},
      \frac{m}{d}) = 1$.

$$
\gcd(a, m) := d \implies
\begin{cases}
    d \not | \\,\\, b \implies \textbf{No hay soluciones} \\\\
    d \\, | \\, b \implies
        \begin{cases}
            d = 1 \implies 1 \equiv sa + \xcancel{tm} \equiv sa \pmod{m}
            \implies x \equiv bs \pmod{m} \textbf{ Solución única} \\\\
            d \ne 1 \implies \frac{a}{d} x \equiv \frac{b}{d} \pmod{\frac{m}{d}}
            \implies \gcd(\frac{a}{d}, \frac{m}{d}) = 1 = s\frac{a}{d}
            + \xcancel{t\frac{m}{d}} \equiv s\frac{a}{d} \pmod{\frac{m}{d}}
            \implies \textbf{$d$ soluciones de la forma: } x_0 + k\frac{m}{d},
            k \in [0, d)
        \end{cases} \\\\
\end{cases}
$$

# Función $\Phi$ de Euler

Esta función permite conocer cuantas unidades hay en $\Z_{/m\Z}$, o cuantos
números tienen inverso multiplicativo.

{{< block "Definición" "var(--magno-blue)" "black" >}}
$$
\begin{cases}
    \Phi(p) = p - 1               \\\\
    \Phi(p^k) = p^{k - 1} \Phi(p) \\\\
    \Phi(n) = \Phi(p_1^{k_1} \ldots p_s^{k_s}) = \Phi(p_1^{k_1}) \ldots \Phi(p_s^{k_s})
\end{cases}
$$
donde $p$ es un número primo, $k$ es un número entero y $n = p_1^{k_1} \ldots p_s^{k_s}$.
{{< /block >}}

# Pequeño teorema de Fermat

{{< block "Teorema" "var(--magno-red)" "black" >}}
Si $p$ es primo y $p \\, \not | \\, a$, entonces $a^{p-1} \equiv 1 \pmod {p}$.
{{< /block >}}

{{< block "Corolario" "var(--magno-red)" "black" >}}
Para cualquier $a$, $a^p \equiv a \pmod{p}$.
{{< /block >}}

{{< dropdown "<<Demostración>> del corolario" >}}
- Si $p \\, | \\, a \implies a \equiv 0 \pmod{p}$
- Si $p \not | \\, a \implies a^{p-1} \equiv 1 \implies aa^{p-1} = 1 \cdot
  a \implies a^p \equiv a \pmod{p}$
{{< /dropdown >}}

# Extensión: Teorema de Euler

{{< block "Teorema" "var(--magno-red)" "black" >}}
$$ \gcd(a, m) = 1 \iff a^{\Phi(m)} \equiv 1 \pmod{m} $$
{{< /block >}}

# Teorema chino de los restos

Con este teorema se pueden resolver sistemas de congruencias lineales.


{{< block "Teorema" "var(--magno-red)" "black" >}}
- Sean $m_1, \ldots, m_k$ primos relativos entre sí.
- Sean $a_1, \ldots, a_k$ enteros arbitrarios.

$$
\begin{cases}
x \equiv a_1 \pmod{m_1} \\\\
\vdots \\\\
x \equiv a_k \pmod{m_k}
\end{cases}
$$

Existe una **única solución**: $0 \le x < m = m_1 \ldots m_k$

$$
x \equiv
a_1 \frac{m}{m_1} \bigg[\frac{m}{m_1}\bigg]^{-1}\_{m_1} + \ldots +
a_k \frac{m}{m_k} \bigg[\frac{m}{m_k}\bigg]^{-1}\_{m_k}
$$

Donde $\big[ \frac{m}{m_i} \big]^{-1}\_{m_i}$ es el inverso multiplicativo de
$\frac{m}{m_i}$ módulo $m_i$.
{{< /block >}}

# Curiosidades

{{< youtube
    id="tRaq4aYPzCc"
    title="The Strange Number System Where Infinity Is Tiny - Veritasium"
>}}

Aunque este video se centra en otros números, guarda bastante relación,
y además, hay una buena explicación sobre la aritmética modular en el `15:52`.
