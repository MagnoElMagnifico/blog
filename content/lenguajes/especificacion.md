---
title: Especificación de Algorimos y TADs
description: >
    TODO
date: 2023-07-08T01:08:45+02:00
weight: -1
math: true
draft: true
---

# Especificación de Algoritmos

Se trata de una descripción clara y precisa de

- las entradas del algoritmo,
- salidas y
- la reacción ante datos incorrectos

Un algoritmo que no esté claramente especificado se puede interpretar de varias
maneras, resultando en un algoritmo que no resuelve correctamente el problema.

De este modo, también se evitan chequeos innecesarios (programación defensiva),
que que las entradas cumplen las condiciones iniciales (programación por
contrato).

{{< block "Definición" "var(--magno-blue)" "black" >}}
- **Proposición**: aquella frase a la que se le peude atribuir un valor de
  _Verdadero_ o _Falso_.
- **Operadores lógicos**: permiten crear proposiciones más complejas:

  `AND`, `OR`, `NOT`, `==`, `!=`, `<`, `>`, `<=`, `>=`.

- **Predicados**: proposiciones con elementos nuevos, llamados cuantificadores.
- **Variables**: datos conocidos sobre el problema, datos de salida, datos de
  entrada, etc.
{{< /block >}}

{{< keyvalue title="Predicados" >}}
-% $\exists i : \text{ dominio } : p(i)$ :% Existe al menos un $i$ en $\text{dominio}$ que cumple $p(i)$.
-% $\forall i : \text{ dominio } : p(i)$ :% Para todo valor de $i$ en $\text{dominio}$ se cumple $p(i)$.
-% $N i : \text{ dominio } : p(i)$       :% Número de valores de $i$ en $\text{dominio}$ que cumple $p(i)$.
{{< /keyvalue >}}

Con todo esto, un algoritmo se especifica de la siguiente forma:

$$ \Set{P} \\; A \\; \Set{Q} $$

- **Precondición** ($P$): predicado que define el estado inicial sobre los datos
  de entrada.
- **Nombre del algoritmo** $A$.
- **Poscondición** ($Q$): predicado que define el estado final sobre los datos
  de salida.

## Reglas de consecuencia

{{< block "Definición" "var(--magno-blue)" "black" >}}
$$ R \implies P \qquad R \subset P $$

- $R$ es **más fuerte** / **más restrictivo** que $P$
- $P$ es **menos fuerte** / **más débil** / ** menos restrictivo** que $R$
- Todo estado que cumple $R$, también cumple $P$.
{{< /block >}}

{{< block "Reglas de consecuencia" "var(--magno-red)" "black" >}}
- $ \Set{P} \\; A \\; \Set{Q} \quad$ y $\quad R \implies P, \quad$ entonces $\Set{R} \\; A \\; \Set{Q}$
- $ \Set{P} \\; A \\; \Set{Q} \quad$ y $\quad Q \implies T, \quad$ entonces $\Set{R} \\; A \\; \Set{T}$
{{< /block >}}

