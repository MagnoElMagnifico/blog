---
title: Sistemas Conexionistas
description: >
    Conceptos básicos sobre redes neuronales artificiales. El Perceptrón.
    Aprendizaje automático supervisado, no supervisado, aprendizaje por
    refuerzo.
date: 2025-01-06T17:50:03+01:00
weight: 13
draft: true
math: true
---

# Neurona natural

Una [neurona natural] funciona como una función de integración espacio-sensorial
que recibe estímulos externos de otra neurona a través de neurotransmisores. El
impulso eléctrico se transmite a una velocidad de 30 m/s, bastante lenta en
comparación con la que se puede conseguir en un circuito integrado.

{{<
    figure
    src="grafica-neurona-natural.png"
    link="grafica-neurona-natural.png"
>}}

El potencial de acción de una neurona comienza a un bajo nivel (**umbral de
estimulación**) y aumenta al llegar un estímulo (**pico de potencial de
acción**), después, se empieza a reducir (**repolarización**) hasta llegar a un
nivel inferior que el inicial (**hiperpolarización**).

# Neurona artificial

Se tratan de modelos que:

-   **Bioinspirados**: las neuronas del cerebro son muy complejas
-   Permite resolver problemas muy complejos que son muy difíciles de plantear
    algorítmicamente.
-   Tiene la capacidad de **aprender**.

## Neurona más simple

{{<
    figure
    src="neurona-simple.png"
    link="neurona-simple.png"
    caption="Modelo más sencillo de una neurona"
    alt="Modelo más sencillo de una neurona"
    height="300"
>}}

- $x_i$: entrada de la neurona ($n$ entradas).
- $w_i$: peso de la entrada $x_i$.
- $y$: salida, que se calcula como una **suma ponderada de las entradas**:

$$
y = \sum_{i=1}^{n} x_i w_i = x_1 w_1 + \ldots + x_n w_n
$$

## Neurona binaria con umbral

Definida por [McCulloc & Pitts] en 1943 (ver [introducción]), donde añaden un
**valor umbral** a la salida de la neurona:

$$ z = b + \sum_i x_i w_i $$

Donde $b$ es el **término independiente** o _bias_. Después, sobre este
resultado, se aplica una **función paso _Heaviside_**:

$$
y = \begin{cases}
    1 \quad \text{si } z \ge 0 \\\\
    0 \quad \text{en otro caso} \\\\
\end{cases}
$$

Esta última función se le llama la **función de activación**.

{{<
    figure
    src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Dirac_distribution_CDF.svg"
    link="https://en.wikipedia.org/wiki/Heaviside_step_function"
    height="300"
>}}

Con esto, la neurona se activará cuando $z \ge 0$,

$$ b + \sum_i x_i w_i \ge 0 \implies \sum_i x_i w_i \ge -b $$

Entonces, el umbral de activación $\theta = -b$.

Gracias a esto, **ya es posible implementar ciertas funciones lógicas**. Sin
embargo, tiene un gran problema: **la función paso no se derivable** en todos
los puntos. Esto es importante porque se necesita para los algoritmos de
aprendizaje.

## Otras funciones de activación

Para arreglar el problema de la derivada, solo se necesita cambiar la función de
activación. Por ejemplo, una **neurona lineal rectificada**:

$$
y = \begin{cases}
    z \quad \text{si } z \ge 0 \\\\
    0 \quad \text{en otro caso} \\\\
\end{cases}
$$

O una **neurona sigmoidal**:

$$ y = \frac{1}{1 + e^{-z}} $$

Este es el **modelo de neurona más utilizado** ya que es derivable en todos los
puntos. Sin embargo, su principal inconveniente es que a veces la derivada es
muy pequeña, lo que puede suponer un problema para el algoritmo del descenso del
gradiente.

{{<
    figure
    src="https://static.platzi.com/media/user_upload/activation_functions-2414e59d-97b1-4b60-a937-3064a1899882.jpg"
>}}

## Representación común de una Neurona Artificial

Por tanto, una representación más general de una Neurona Artificial se puede ver
en el diagrama de la figura.

{{<
    figure
    src="representacion-neurona.png"
    link="representacion-neurona.png"
    caption="Representación común de una Neurona Artificial"
    alt="Representación común de una Neurona Artificial"
>}}

- $x_i$: señales de entrada
- $w_{ki}$: pesos de la sinapsis
- $b_k$: término independiente o _bias_
- $\sum$: función de suma
- $v_k$: resultado de la suma
- $\phi(\cdot)$: función de activación
- $y_k$: salida de la neurona

Todo esto para una neurona $k$.

También es posible representar el término independiente o _bias_ como el peso
$w_0$, que se corresponde con una variable de entrada $x_0 = 1$ que siempre es
constante.

## Red Neuronal Artificial

Una **Red Neuronal Artificial** (RNA) es una estructura compuesta por neuronas
artificiales profusamente conectadas entre sí. Tiene la capacidad de
**aprender** a partir de los datos de entrada mediante la modificación de sus
pesos sinápticos.

Existen diferentes modelos o arquitecturas dependiendo del tipo de neurona y su
organización.

{{<
    figure
    src="https://dc722jrlp2zu8.cloudfront.net/media/uploads/2023/04/04/4.png"
    link="https://openwebinars.net/blog/que-son-las-redes-neuronales-y-sus-aplicaciones/"
    caption="Ejemplo de una RNA hacia delante"
    height="300"
>}}

# Aprendizaje automático

Consiste en una serie de **regresores**, algoritmos basados en fundamentos
matemáticos (<<matemáticas que aprenden>>) con capacidad de aprender a resolver
ciertos tipos de problemas.

{{< block "Definición de Tom Mitchell" >}}
Programa informático que aprende de la experiencia $E$ en relación a una tarea
$T$, usando una medida de rendimiento $P$.

Si mejora sus prestaciones medidas por $P$ en la realización de $T$ a través
de $E$, quiere decir que ha aprendido.

[Tom Mitchell](https://en.wikipedia.org/wiki/Tom_M._Mitchell)
{{< /block >}}

Las diferentes estrategias normalmente se clasifican en las tres siguientes
clases:

-   **Aprendizaje supervisada**: (aprender de ejemplos)

    Durante la experiencia $E$ se indica cómo realizar $T$, dado que dispongo
    de los pares _dato-salida deseada_.

    De este modo, a la hora de diseñar el sistema, es necesario encontrar los
    valores de los pesos que produzcan la salida deseada (**minimice el
    error medido por $P$** respecto al valor deseado). Funciona **a partir de
    ejemplos**.

    -   **Conjunto de entrenamiento**: formado por pares _dato-salida deseada_,
        lo suficientemente representativos del problema a resolver (datos de
        calidad).

    -   **Ajuste de pesos**: se entrena la RNA ajustando los pesos para que en
        la medida de lo posible la red responda con la salida deseada.

-   **Aprendizaje no supervisado**: (clasificar)

    Durante la experiencia $E$ no se indica cómo realizar $T$, pero se dispone
    de un criterio para poder **realizar clasificaciones** entre datos de
    entrenamiento lo suficientemente parecidos. Se maximizan las similitudes de
    los elementos de cada clasificación.

-   **Aprendizaje por refuerzo**:

    Se dan indicios si la **realización de $T$ está bien o mal**. Se fortalecen
    las decisiones correctas y se debilitan los caminos que dan lugar
    a decisiones incorrectas.

    Además, se especifican criterios que permitan determinar de forma temprana
    decisiones erróneas. Se suelen usan en problemas donde la variable temporal
    es significativa (robótica).

## Problema de regresión

{{< block "Regresión" "var(--magno-blue)" >}}
Consiste en estimar las relaciones entre una variable dependiente y una o más
variables independientes (también llamadas regresores o predictores).

Es decir, se trata de aprender la función que mejor representen lo datos de
entrenamiento.
{{< /block >}}

Esto se utiliza principalmente para predecir nuevos valores que sigan con la
tendencia de los datos actuales.

Los elementos a tener en cuenta son:

-   Los datos de actuales
-   Función a seleccionar al modelo (más o menos complicadas: parábolas,
    polinomios...).

{{< dropdown "Ejemplo: precios de viviendas" >}}
En función del tamaño de una vivienda (variable independiente), se desea
predecir el precio de venta (variable dependiente).
{{< /dropdown >}}

### Regresión lineal

{{< block "Regresión lineal" "var(--magno-blue)" >}}
La **regresión lineal** es un problema de regresión (aprendizaje supervisado)
que consiste en encontrar una recta (o hiperplano) que mejor se ajuste a los
datos de entrenamiento según algún criterio matemático.
{{< /block >}}

Como es un problema de regresión, se intentará encontrar una **función
hipótesis** $h(x)$. Al ser lineal, se tratará de una recta, cuya ecuación es:

$$ h(x) = \theta_1 x + \theta_0 $$

Por tanto, es necesario encontrar el valor en el origen $\theta_0$ y la
pendiente $\theta_1$. Esto es un **problema de minimización**: encontrar los
parámetros $\theta_0$ y $\theta_1$ de modo que

$$ |h(x) - y| $$

sea mínimo. Nótese que solo nos interesa que ambas funciones sean iguales (<<$h$
es un imitador de $y$>>), por lo que también se puede minimizar $(h(x) - y)^2$.

Como tenemos un conjunto de datos, podemos usar el **error
cuadrático medio**, que consiste en medir las distancias entre la función de
hipótesis y los resultados deseados (se dejan elevadas al cuadrado dado que
computar raíces cuadradas es lento y no son necesarias para el cálculo) para
luego calcular su media:

$$ J(\theta_0, \theta_1) = \frac{1}{2m} \sum^m_{i=1} \left( h(x^{(i)} - y^{(i)} \right)^2 $$

Esta será nuestra **función de error** o **función de coste**, donde $x^{(i)}$
es el $i$-ésimo dato de entrada, $y^{(i)}$ su salida que se desea y $m$ el
número de ejemplos de entrenamiento. El 2 del denominador es para que se cancele
cuando derivemos.

El algoritmo iterativo para minimizar el valor de $J(\theta_0, \theta_1)$ es:

1. Iniciar en un valor dado de $\theta_0$ y $\theta_1$
2. Variar estos valores de forma que $J(\theta_0, \theta_1)$ disminuya
3. Repetir hasta que se llegue a un mínimo (puede ser local)

¿Cómo se varían los parámetros?

En general:

$$ \theta_j := \theta_j - \alpha \frac{\partial}{\partial \theta_j} J(\theta_0, \theta_1) $$

$$
\begin{align*}
    \frac{\partial}{\partial \theta_j} J(\theta_0, \theta_1) =&
    \frac{\partial}{\partial \theta_j} \left( \frac{1}{2m} \sum^m_{i=1} \left(h(x^{(i)}) - y^{(i)}\right)^2 \right)
    \newline
    =& \frac{1}{m} \sum^m_{i=1} \left(h(x^{(i)}) - y^{(i)}\right)
    \left( \frac{\partial}{\partial \theta_j} \left(h(x^{(i)}) - y^{(i)}\right) \right)
    \newline
\end{align*}
$$

Pero para $\theta_0$ y $\theta_1$:

$$
\begin{align*}
    j = 0:& \quad \frac{\partial}{\partial \theta_0} \left(\theta_0 + \theta_1 x^{(i)} - y^{(i)}\right) =& 1 + 0 - 0 = 1 \newline
    j = 1:& \quad \frac{\partial}{\partial \theta_1} \left(\theta_0 + \theta_1 x^{(i)} - y^{(i)}\right) =& 0 + 1 - 0 = 1 \newline
\end{align*}
$$

Por tanto, el gradiente es:

$$
\begin{align*}
    \frac{\partial}{\partial \theta_0} J(\theta_0, \theta_1) =& \frac{1}{m} \sum^m_{i=1} \left(h(x^{(i)}) - y^{(i)}\right) \newline
    \frac{\partial}{\partial \theta_1} J(\theta_0, \theta_1) =& \frac{1}{m} \sum^m_{i=1} \left(h(x^{(i)}) - y^{(i)}\right) \newline
\end{align*}
$$

#### Algunas consideraciones

-
    Los cálculos anteriores sirven también para varias variables de entrada,
    simplemente $x^{(i)}$ es ahora un vector.

    - $n$: número de características o variables de entrada
    - $m$: número de ejemplos de entrenamiento
    - $x^{(i)}$: vector de características para el ejemplo $i$
    - $x_j^{(i)}$: es la característica $j$ para el ejemplo $i$

    Y la función de hipótesis tiene esta pinta (hiperplano):

    $$ h(x) = \sum^n_{k=0} \theta_k x_k = \theta^T x$$

    Donde $x_0=1$ por conveniencia.

-
    La función hipótesis $h$ puede tener multitud de mínimos locales en los que
    el algoritmo de minimización puede quedarse estancado y no encontrar una
    solución mejor.
-
    Es importante que los datos estén en el mismo rango, dado que nuestra
    función de coste es una distancia entre ellos. Se puede solucionar
    **normalizando**:

    $$ x_j^{(i)} = \frac{x_j^{(i)} - \mu_j}{s_j}$$

    Donde $\mu_j$ es el valor medio y $s_j$ es la desviación estándar.

    $$ \mu_j = \frac{1}{m} \sum^m_{i=1} x_j^{(i)} $$
    $$ s_j = \sqrt{\frac{1}{m} \sum^m_{i=1}\left(x_j^{(i)} - \mu_j \right)^2} $$
-
    El parámetro $\alpha$ o _learning rate_ se modifica manualmente mediante
    prueba y error.

{{<
    figure
    src="learning-rate.png"
    link="learning-rate.png"
>}}

### Regresión polinómica

<!-- TODO: continuar aquí -->

### Regresión logística

## Problema de clasificación

{{< block "Clasificación" "var(--magno-blue)" >}}
Consiste en aprender el decisor que mejor discrimine los datos de entrenamiento:
**buscar un criterio umbral**.
{{< /block >}}

{{< dropdown "Tasa de error" >}}
La tasa de error o medida de rendimiento **describe cómo el modelo creado se
ajusta a los resultados deseados**. Su valor óptimo depende del problema: por
ejemplo, cuando se quiere detectar células cancerígenas, mejor tener muchos
falsos positivos que falsos negativos.

Aunque, si hay muchos falsos positivos, tampoco tiene mucha utilidad (efecto
psicológico).

Este es un aspecto muy importante a tener en cuenta en los problemas de
clasificación.
{{< /dropdown >}}


Si el sistema no es capaz de aprender de los datos y extraer el mejor umbral, es
posible que se necesiten otras variables o que sobre algunas que no son
relevantes.

# Perceptrón

{{< block "Perceptrón" "var(--magno-blue)" >}}
Un [perceptrón] es una RNA con una única capa de neuronas, cuya función de
activación es normalmente una función paso. Al ser una única capa, todas las
neuronas son y producen resultado independientes.

Se trata de un algoritmo de aprendizaje supervisado (a partir de ejemplos) de
clasificación binaria lineal.

[perceptrón]: https://en.wikipedia.org/wiki/Perceptron
{{< /block >}}

Se propuso a [finales de los 50][introducción]. En aquel momento, fue de las
primeras aportaciones al campo del aprendizaje automático. Permitía la
resolución de problemas partiendo de datos y sin necesidad de codificar
exactamente la solución usando un algoritmo conocido.

Supongamos que tenemos un problema de clasificación en el que se debe
discriminar entre 2 clases, cuyos elementos se representan con dos variables.
Partimos de un conjunto de elementos del que ya conocemos su clasificación
(**conjunto de entrenamiento**), y se desea que cuando se introduzcan unos
nuevos, se determine a cuál pertenece.

Nótese que el funcionamiento del clasificador dependerá de la calidad de los
datos iniciales: si no son **representativos del problema**, los resultados
serán malos.

Para ello, se puede utilizar una neurona con 2 entradas (una por cada variable)
y los pesos se **ajustarán a través de un algoritmo de aprendizaje**, que
**inicialmente se escogerán aleatoriamente**. Se utilizará una función de
activación signo.

Como resultado, esta neurona dividirá en dos clases el espacio de posibles
entradas.

## Algoritmo de convergencia del perceptrón

A partir del ejemplo anterior, solo queda diseñar un algoritmo que calcule los
pesos de la neurona.

- $x(n)$: vector de entradas
- $w(n)$: vector de pesos
- $b$: bias
- $y(n)$: vector de salida del sistema
- $d(n)$: vector de salidas deseadas
- $n$: _time step_ o iteración
- $\eta$: _learning rate_ o coeficiente de aprendizaje

\[Que sean vectores da igual, para los siguientes cálculos se pueden suponer
valores escalares.\]

{{< dropdown "Learning rate" >}}
Se trata de un valor en el intervalo $(0, 1)$ (normalmente muy pequeño) que
representa el cambio que se aplicará sobre el peso. Su función es limitar el
aprendizaje de modo que los cambios en cada ciclo sean pequeños.

-   **Muy alto**: creará un comportamiento oscilatorio y es posible que diverga
    en lugar de converger.
-   **Muy bajo**: el entrenamiento será muy lento.

Los valores concretos dependen del problema.
{{< /dropdown >}}

Para el ejemplo, usaremos:

$$ y(n) = \operatorname{sign}( w^T(n) x(n) )$$

Al multiplicar un vector horizontal por uno vertical, esencialmente se realiza
una suma ponderada. $\operatorname{sign}$ se define como:

$$
\operatorname{sign}(x) = \begin{cases}
    1 \quad \text{si } x > 0 \\\\
    0 \quad \text{si } x = 0 \\\\
   -1 \quad \text{si } x < 0 \\\\
\end{cases}
$$

Entonces, si $d(n)_i=1$ quiere decir que $x(n)_i$ pertenece a la primera clase,
y si $d(n)_i=-1$ entonces $x(n)_i$ es de la segunda clase.

{{< block "Algoritmo" >}}
El siguiente valor de los pesos será:

$$ w(n+1) = w(n) + \eta\[d(n) - y(n)\]x(n) $$

Al peso actual $w(n)$ se le suma lo que falta por llegar a valor deseado
($d(n) - y(n)$), pero multiplicado por el _learning rate_ y que el proceso sea
iterativo (computar una integral).
{{< /block >}}

{{< dropdown "Pseudocódigo" >}}
Entrenamiento (calcular los pesos):

```py
w[0] = random()

sign = lambda x: 1 if x > 0 else -1

for n in steps():
    y[n] = sign(transpose(w[n]) * x[n])
    w[n+1] = w[n] + learning_rate * (d[n] - y[n]) * x[n]
```

Evaluación:

```py
y = sign(transpose(w) * x)
```
{{< /dropdown >}}

Explicación de su funcionamiento:

-
    Si $y(n) = d(n)$ \
    {{< arrow >}} $w(n+1) = w(n)$ \
    {{< arrow >}} No hay cambios porque ya es el valor que queremos.

-
    Si $y(n) < d(n)$ \
    {{< arrow >}} Queremos que $w(n+1)$ aumente para hacer la salida más grande \
    {{< arrow >}} $
    \textcolor{red}{d(n)} - \textcolor{aqua}{y(n)} > 0 \implies
    \textcolor{red}{\eta} \[\textcolor{red}{d(n) - y(n)}\] \textcolor{red}{x(n)} > 0
    \implies w(n+1) > w(n)
    $
    (rojo positivo y azul negativo)

-
    Si $y(n) > d(n)$ \
    {{< arrow >}} Sucede lo mismo, solo que $w(n+1)$ disminuye.

Por tanto, **si obtenemos la salida deseada, no hay cambios**. Sino, se
**aumenta o se disminuye el peso** para obtener el resultado deseado.

Si las clases son linealmente separables, finalizará cuando el error sea 0; de
lo contrario, intentará llegar al error mínimo. Para llevar a ese punto, suelen
ser necesarios muchos _epochs_.

{{< block "Epoch" "var(--magno-blue)" >}}
Un **epoch** es una pasada del conjunto de entrenamiento completo por la entrada
de la neurona.
{{< /block >}}

{{<
    figure
    src="combinar-neuronas.png"
    link="combinar-neuronas.png"
>}}

[neurona natural]: https://en.wikipedia.org/wiki/Neuron
[McCulloc & Pitts]: https://home.csulb.edu/~cwallis/382/readings/482/mccolloch.logical.calculus.ideas.1943.pdf
[introducción]: {{< ref "aed/ia-introduccion/#historia" >}}
