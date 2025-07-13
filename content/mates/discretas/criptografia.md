---
title: Criptografía
description: >-
    Introducción a la criptografía básica. Claves simétricas y asimétricas.
    Cifrado RSA.

date: 2023-06-10T21:24:35+02:00
weight: 5
math: true
---

# Criptografía

Se trata de la disciplina que estudia los **códigos secretos**. La palabra
proviene del griego y significa literalmente <<escritura secreta>> o <<escritura
oculta>>.

```goat
.-------------.       Encriptar       .---------------.
| Texto plano | --------------------> | Texto cifrado |
'-------------'                       '---------------'

.-------------.      Desencriptar     .---------------.
| Texto plano | <-------------------- | Texto cifrado |
'-------------'                       '---------------'
```

$$
\begin{align*}
    m    \quad \longmapsto& \quad E(m) \newline
    E(m) \quad \longmapsto& \quad D(E(m)) = m
\end{align*}
$$

## Características básicas

- Tiene que ser fácil cifrar un mensaje y descifrarlo si estás autorizado.
- Tiene que ser muy difícil descrifar un mensaje si no estás autorizado.
- El mensaje debe poder recuperarse completamente.

# Clave privada o clave simétrica

En estas técnicas de cifrado se utiliza la **misma clave para cifrar que para
descrifrar**.

El problema principal de estos métodos es: ¿Cómo se transmite la clave?

## Cifrado César

Método de cifrado por sustitución de caracteres mediante la translación:
desplazar el alfabeto determinado número de veces (clave).

1. Se asigna cada letra a un número, por ejemplo: $0 \mapsto A$, $1 \mapsto B$,
   etc.
2. Si es $k$ la clave privada, se cifrará sumando la clave a cada letra:

    $$
    \begin{align*}
        \Z_{/26\Z} &\longrightarrow \Z_{/26\Z} \newline
        x          &\longmapsto x+k
    \end{align*}
    $$

3. Y para descrifrar se hace la operación inversa, restar la clave:

    $$
    \begin{align*}
        \Z_{/26\Z} &\longrightarrow \Z_{/26\Z} \newline
        x          &\longmapsto x-k
    \end{align*}
    $$

<!-- TODO: añadir ejemplo -->

# Clave pública o clave asimétrica

Con estos mecanismos se pretende solucionar el problema de transmisión de
claves:

- Hay claves distintas para cifrar y para descifrar.
    - **Clave pública**: todos la conoces y se utiliza para cifrar.
    - **Clave privada**: solo la conoce una persona y se utiliza para descifrar.

- Se utilizan algoritmos basados en funciones matemáticas.

- Funciones unidireccionales: fáciles de aplicar en un sentido, pero
  prácticamente imposibles de deshacer.
    - Por ejemplo: multiplicar dos primos ($O(n^2)$, siendo $n$ el número de
      cifras) y factorizar un número (NP-Completo).

## Cifrado RSA

Es un criptosistema creado por Rivest, Shamir y Adlman en 1977 (sus iniciales
conforman el nombre del sistema); y es posiblemente el sistema asimétrico más
utilizado hoy en día.

Se usan dos números primos grandes y su producto como claves, dado que es muy
difícil factorizar estos números, será un criptosistema muy robusto. Para poder
quebrar estos cifrados, se tendría que resolver un problema matemático que lleva
abierto varios siglos.

En {{< color "verde" "var(--magno-green)" >}} se denotará lo que es público y en
{{< color "rojo" "var(--magno-red)" >}} lo que es privado.

1. Se toman dos números primos grandes: {{< color "$p$" "var(--magno-red)" >}}
   y {{< color "$q$" "var(--magno-red)" >}}.

2. Se calcula el producto: {{< color "$n$" "var(--magno-green)" >}} $= pq$.

3. Se calcula $\Phi(n) = (p - 1)(q - 1)$. Para romper el criptosistema habría
   que calcular esta función sin conocer $p$ y $q$, lo que es muy costoso.

4. Se toman dos números {{< color "$e$" "var(--magno-green)" >}} y {{< color "$d$" "var(--magno-red)" >}},
   de forma que $ed \equiv 1 \pmod{\Phi(n)}$.
    - Para ello, se escoge $e < \Phi(n)$ y $\gcd(e, \Phi(n)) = 1$
    - Mediante el Algoritmo de Euclides Extendido se calcula el inverso
      multiplicativo de $e$ módulo $\Phi(n)$: $d$.

5. Para encriptar:

    $$
    E(m) = m^e \equiv M \pmod{n}
    $$

6. Y para desencriptar, teniendo en cuenta que $ed \equiv 1 \pmod{\Phi(n)}
   \implies ed = 1 + k \Phi(n)$:

    $$
    D(M) = M^d \equiv (m^e)^d = m^{1 + k \Phi(n)} = m (\overbrace{m^{\Phi(n)}}^{\text{Teorema de Euler}})^k \equiv m \times 1^k = m \pmod {n}
    $$

$m$ es el mensaje sin encriptar y $M$ es el mensaje encriptado, ambos
codificados de la siguiente forma:

1. Se convierten los caracteres a números, completando con 0s: $00 \mapsto A, 01
   \mapsto B$, \ldots, 25 \mapsto Z$. Se podría utilizar el código Unicode de
   cada caracter.
2. Se concatenan los números en bloques menores que $n$.
3. Estos bloques recibirán las mismas operaciones ($m$).

Por eso se dice que RSA es un sistema de cifrado por bloques.

[Aquí] hay una implementación de ejemplo utilizando SageMath.

[Aquí]: https://gist.github.com/MagnoElMagnifico/5eaea617c2675c9b88783c36976810cc

