---
title: Hash
description: >
    TODO
date: 2024-01-18T23:38:42+01:00
weight: 4
draft: true
math: true
---

<!--
TODO:
# Búsqueda interna

Se desea encontrar un determinado dato en una estructura de datos residente en
memoria principal.

Ejemplos:

- Búsqueda lineal: $\\; \Omega(1) \\; O(n)$
- Búsqueda binaria: $\\; \Omega(1) \\; O(\log(n))$
- Direccionamiento directo: acceder a una posición en un array. Tiene una
  complejidad $\Theta(1)$, lo que implica que es independiente del tamaño de los
  datos. -->


# Tablas Hash

Queremos implementar de forma eficiente las operaciones de inserción, borrado
y búsqueda de elementos.

Buscamos una implementación que se ejecute de forma independiente al número de
elementos almacenados, en tiempo constante.

A cada elemento se le asigna una posición según una función matemática llamada
**función hash** {{< arrow >}} La inserción, borrado y búsqueda es
inmediatamente $O(1)$.

Se usan cuando el conjunto de claves es mucho mayor que el de las claves reales
a almacenar.

{{< block "Desventajas de las tablas hash" >}}
- Se usa un array {{< arrow >}} El **tamaño de la tabla está limitado** y se fija en
  la compilación. Si se implementa una redispersión, será muy costoso copiar los
  datos al nuevo array.
- **No se puede recorrer de forma directa**: no todas las posiciones consecutivas
  tienen que estar ocupadas.
- **Los datos no están ordenados**: el uso de la función hash no garantiza que
  queden ordenados.
- **Colisiones** (el mayor problema): la función hash devuelve la misma posición
  para dos claves distintas.
{{< /block >}}

# Funciones Hash

Características fundamentales:

- **Rápida** de calcular
- Que produzca **pocas colisiones** {{< arrow >}} Debe distribuir las claves de
  forma uniforme.

```goat
         hash
Clave  ------->  {0,..., N}
```

Siendo $N$ el tamaño de la tabla Hash.

## Funciones Hash para claves enteras

{{< block "Módulo" >}}
$$ \text{hash}(K) = K \mod N $$

Es conveniente que **$N$ sea primo**, dado que se producen menos colisiones.
{{< /block >}}

{{< block "Cuadrado" >}}
$$ \text{hash}(K) = \text{dígitosCentrales}(K^2) $$

Se toman $\log N$ dígitos.
{{< /block >}}

{{< block "Plegamiento" >}}
Dividir el número en $\log N$ dígitos y sumarlos.
{{< /block >}}

## Funciones Hash para claves textuales

{{< block "División" >}}
$$ \text{hash}(K) = \sum \text{ascii}(K[i]) $$

No funciona bien para $N$ grande y se producen muchas colisiones si las claves
siguen algún patrón.
{{< /block >}}

{{< block "Suma ponderada" >}}
$$ \text{hash}(K) = \text{sumaPonderada}(\text{ascii}(K[i])) $$
{{< /block >}}

# Resolución de colisiones

## Resumen de costes

{{< keyvalue title="Comparativa" key-header=true >}}
-% Recolocación :%
- $L$ recomendado: $\frac{1}{2}$
- Peor caso, todas las operaciones son $O(n)$
- Uso de menos memoria si las claves son pequeñas: $2·n·\text{tamClave}$

-% Encadenamiento :%
- $L$ recomendado: $\frac{3}{4}$
- Inserción en $O(1)$ garantizado
- Uso de memoria: $n·(\text{tamClave} + \text{tamPuntero}) + N·\text{tamPuntero}$
{{< /keyvalue >}}
