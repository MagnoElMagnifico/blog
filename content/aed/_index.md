---
title: Algoritmos y Estructuras de Datos
params:
  small_title: AED
content_title: true
---

{{< block "Algoritmo" "var(--magno-blue)" >}}
Conjunto de pasos para resolver un problema.
{{< /block >}}

Propiedades:

- **Definible**: debe estar bien definido, sin dejar dudas en su interpretación.
- **Finito**: debe tener un número finito de pasos.

{{< block "Algoritmia" "var(--magno-blue)" >}}
La algoritmia es la ciencia que estudia técnicas para construir algoritmos
eficientes y técnicas para medir la eficiencia de dichos algoritmos.

Dado un problema concreto, encontrar la mejor forma de solucionarlo.
{{< /block >}}

```goat
              .----------.   Algoritmos    .----------.
              | Problema |  ===== + ====>  | Programa |
              '----------'   Estructuras   '----------'
                              de datos

.--------------------.    .--------------.    .----------------------.
| Modelo matemático  |===>| TADs         |    | Estructuras de datos |
| Algoritmo informal |    | Pseudocódigo |===>| Programa en C        |
'--------------------'    '--------------'    '----------------------'
```

- **Estructuras de datos**: parte <<estática>>, almacenada en memoria
- **Algoritmo**: parte <<dinámica>>, modifican los datos

Por eso es muy importante seleccionar la estructura de datos correcta.

{{< keyvalue title="Temas a tratar" >}}
-% Estructuras de datos :%
- Estructuras de datos lineales
    - Pilas
    - Colas: colas de prioridad, dicolas
    - Listas
- Árboles binarios
    - Árbol binario de búsqueda
    - Montículo binario (_Heap_)
    - Árbol equilibrado (AVL)
    - Árbol B
    - Árbol B+
- Grafos
- Tablas hash (recolocación y encadenamiento)

-% Estrategias algorítmicas :%

- Complejidad computacional
- Fuerza bruta
- Divide y vencerás
- Algoritmos voraces
- Programación dinámica

-% Búsqueda y ordenación :%

- Búsqueda lineal
- Búsqueda binaria
- Método de burbuja (_Bubble sort_)
- Método de selección (_Selection sort_)
- Método de la inserción (_Insertion sort_)
- Ordenación rápida (_Quick sort_)
{{< /keyvalue >}}

