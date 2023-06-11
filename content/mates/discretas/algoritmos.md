---
title: Algoritmos
description: >-
    Introducción al análisis de algoritmos y diferentes tipos de algoritmos.
    N vs NP.

date: 2023-06-05T14:21:08+02:00
weight: 1
math: true
---

# Algoritmos

> Se ven mejor en `Programación II: técnicas algorítmicas`.

Un algoritmo es una sucesión finita de pasos o instrucciones para realizar una
tarea, cálculo o resolución de un problema en un tiempo finito.

Debe tener las siguientes características:

- Debe terminar en un tiempo **finito** y debe de tener un número **finito** de pasos.
- Las instrucciones deben estar **ordenadas**, ser **claras** y **no ambiguas**.
- Recibe unos datos de entrada (_Input_) y produce una salida (_Output_).
- Debe ser **correcto** y **efectivo**: produce salidas correctas y cada paso se puede realizar (efectivo $\ne$ eficiente).
- Tiene un **objetivo concreto y general**.

Intuitivamente, un algoritmo de puede entender como una receta: se describen
unas acciones ordenadamente y detalladamente para realizar una tarea.

## Pseudocódigo

Es una descripción de alto nivel de un algoritmo o programa informático, y
utiliza convenciones estructurales (condicionales, bucles, funciones, etc) de
un lenguaje de programación, pero está pensado para la lectura de un humano y
no de una máquina.

## Tipos de algoritmos

- **Algoritmos de búsqueda**: El objetivo es encontrar un elemento dado en una lista.
    - Lineal / secuencial: comprueba todos los elementos uno por uno.
    - Binario: en una lista ordenada, separa los valores mayores de los menores
      y busca en la sublista más apropiada.

- **Algoritmos de ordenamiento**: El objetivo es ordenar los elementos de una
  lista, tanto de forma ascendente como descendente.
    - Ejemplos: bubble sort, insertion sort, selection sort, merge sort, quick sort...

{{< block "Definición" "var(--magno-blue)" "black" >}}
**Problemas de optimización**

Problemas que requieren que se maximice o minice un valor en concreto que está
en función de una variable independiente.

Por ejemplo: encontrar el camino más corto.
{{< /block >}}

- **Algoritmos voraces / codiciones / greedy**: algoritmos dedicados a resolver
  problemas de optimización, que en lugar de buscar la mejor solución global,
  producen una local al paso actual. Nunca reconsideran una de estas
  decisiones. Generalmente estos algoritmos no proporcionan la mejor solución,
  pero son bastante eficientes.
    - Ejemplo: problema del cambio de la moneda. El algoritmo seleccionará las
      monedas de mayor tamaño posible y menores a la cantidad restante que hay
      que pagar.

## Problemas indecidibles

Alan Turing mostró que existen problemas que no se pueden resolver mediante
algoritmos, como por ejemplo el **Problema de la Parada** o _The Halting
Problem_:

> Es posible escribir un programa de ordenador (procedimiento) que nos diga si
> dado un programa cualquiera y un conjunto de datos de entrada, podemos decidir
> si el programa termina, o no, su ejecución. ¿Parará alguna vez?

{{<
    youtube
    id="S1PVPluvV9I"
    title="8 Borrachos Pueden Revolucionar Todas las Matemáticas - QuantumFracture"
>}}

En este vídeo se explica muy bien el concepto de algoritmo y se <<demuestra>> porqué
el problema de la parada no se puede resolver mediante algoritmos.

# Big $O$, $\Omega$ y $\Theta$

{{< block "Definición" "var(--magno-blue)" "black" >}}
$$
f(x) \in O(g(x))      \iff |f(x)| \le C |g(x)| \text{, si } x > k \\
f(x) \in \Omega(g(x)) \iff |f(x)| \ge C |g(x)| \text{, si } x > k \\
f(x) \in \Theta(g(x)) \iff f(x) \in O(g(x)) \land g(x) \in \Omega(f(x))
$$
{{< /block >}}

{{< figure
    src="../img/big-o-omega-theta.svg"
    caption="Gráfico representativo del orden de complejidad"
    alt="Gráfico representativo del orden de complejidad"
>}}

Interpretación:

- **{{< color "$O(...)$"      "var(--magno-red)"   >}}** crece **{{< color "más" "var(--magno-red)" >}}** que $f$.
- **{{< color "$\Omega(...)$" "var(--magno-blue)"  >}}** crece **{{< color "menos" "var(--magno-blue)" >}}** que $f$.
- **{{< color "$\Theta(...)$" "var(--magno-green)" >}}** crece **{{< color "igual" "var(--magno-green)" >}}** que $f$.

{{< block "Observación" >}}
No son funciones únicas, existen muchas $O$ y $\Omega$.
{{< /block >}}

## Teorema y propiedades

{{< block "Teorema" "var(--magno-red)" "black" >}}
$$ p_n(x) \in O(x^n) $$ siendo $p_n(x)$ un polinomio cualquiera de grado $n$.
{{< /block >}}

Sabiendo que $f_1 \in O(g_1)$ y $f_2 \in O(g_2)$, se cumplen las siguientes propiedades:

- $(f_1 + f_2) \in O( \max( g_1, g_2 ) )$
- $(f_1 \times f_2) \in O( g_1 \times g_2 )$
- $(a f) \in O(g)$, siendo $a$ una constante
- $f \in O(g), g \in O(h) \implies f \in O(h)$ (propiedad transistiva)

## Ejemplos

{{< dropdown "$1 + 2 + \ldots + n \in O(n^2)$" >}}
$$ 1 + 2 + \ldots + n \le n + \ldots + n \le n^2 $$
{{< /dropdown >}}

{{< dropdown "$n! \in O(n^n)$" >}}
$$ n! = 1 \times 2 \times 3 \times \ldots \times n \le n^n $$
{{< /dropdown >}}

{{< dropdown "$\log n \in O(\log n) = O(\ln n) = O(\log_{a} n)$" >}}
$$ \log_a n = \frac{\log n}{\log a} $$
$\log a$ es una constante, por el teorema visto, no afecta al crecimiento total.
{{< /dropdown >}}

{{< dropdown "$\log(n!) \in O(n \log n)$" >}}
$$\log(n!) \le \log(n^n) = n \log n$$
{{< /dropdown >}}

{{< dropdown "$\log^{a} n \in O(n) \text{, si } a > 1$" >}}
Se puede comprobar experimentalmente.
{{< /dropdown >}}

## Complejidad de algoritmos

Se puede analizar un algoritmo desde varios puntos de vista:

- Complejidad temporal: cuantas **operaciones** necesita un algoritmo para una
  entrada dada. Estas operaciones pueden ser comparaciones, sumas, restas,
  multiplicaciones...
- Complejidad espacial: cuanta **memoria** necesita el algoritmo para funcionar.

Y también se puede analizar en distintos casos:

- Peor caso: $O(\ldots)$
- Caso promedio: $O_p(\ldots)$
- Mejor caso: $\Theta(\ldots)$

## Tipos de problemas

    O(1)          Constante
    O(log n)      Logarítmico
    O(sqrt n)     Sublineal
    O(n)          Lineal
    O(n log n)    Quasilineal / Superlineal
    O(n ^ a)      Polinómico                  TRATABLES
    ------------------------------------------------------
    O(a ^ n)      Exponencial                 NO TRATABLES
    O(n!)         Factorial
    O(n ^ n)      Superexponencial

Con $a > 1$.

{{< keyvalue >}}
- **Resolubles**:
    -: **Tratables**, terminan en un tiempo razonable; como máximo polinómico.
    -: **Intratables**, acaba en tiempo exponencial, factorial o superexponencial.
- **Irresolubles**: No se pueden resolver mediante algoritmos.
{{< /keyvalue >}}

## P vs NP

- **{{< color "Clase P" "var(--magno-red)" >}}**:
  problemas tratables en tiempo polinómico.

- **{{< color "Clase NP" "var(--magno-green)" >}}**
  (Non-deterministic Polynomial): se desconoce si hay un algoritmo que acaba en
  tiempo polinómico; pero sí **se puede comprobar una solución en tiempo
  polinómico**.

- **{{< color "Clase NP-Completo" "var(--magno-blue)" >}}**:
  si hay un algoritmo capaz de resolver uno de estos problemas en tiempo
  polinómico, **los demás de esta categoría también**.

{{< inlineHTML >}}
<svg width="600" height="280">
  <text x="90" y="165" fill="var(--magno-red)" font-size="40">P</text>
  <circle cx="100" cy="150" r="50" fill="None" stroke="var(--magno-red)" stroke-width="5"/>

  <text x="300" y="165" fill="var(--magno-blue)" font-size="40">NP-Completo</text>
  <rect x="280" y="120" width="280" height="65" fill="None" stroke="var(--magno-blue)" stroke-width="5"/>

  <text x="210" y="100" fill="var(--magno-green)" font-size="40">NP</text>
  <rect x="10" y="50" width="570" height="170" fill="None" stroke="var(--magno-green)" stroke-width="5"/>
</svg>
{{< /inlineHTML >}}

Ejemplos de problemas NP:

- Torres de Hanoi
- Factorización entera
- Isomorfismo de grafos

Ejemplos de problemas NP-Completo:

- Colorear con 3 tres colores un grafo
- Calcular un ciclo hamiltoniano
- Problema del viajante
- Problema de la mochila
- Resolver el Candy-Crush

