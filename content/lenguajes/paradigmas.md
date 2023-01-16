---
title: Paradigmas de Programación
weight: 1
draft: true
---

# Paradigmas

A continuación se muestran algunos paradigmas de programación.

![esquema](https://upload.wikimedia.org/wikipedia/commons/f/f7/Programming_paradigms.svg)
[lista completa](https://en.m.wikipedia.org/wiki/Programming_paradigm)

+ **Procedural**: se definen las acciones _paso por paso_, no hay funciones, por
  lo que es difícil reutilizar código.

+ **Orientado a objetos**: se encapsulan datos en un _objeto_ encardado de
  modificarlos.
    - Herencia: los objetos derivados de otros tienen acceso/modifican a los
      padres.
    - Composición: formar un objeto a partir de otros.

+ **Funcional**: las funciones solamente deben tomar un `input` y devolver un
  `output`, sin modificar ningún otro valor (como valores globales o los propios
  valores de entrada).

+ **Declarativo**: el paradigma funcional es bastante declarativo. Consiste en
  definir qué es lo que queremos en lugar de como.

+ **Imperativo**: a partir de un estado que es global (variables, datos), las
  funciones lo modifican.

> **FALTAN**: Imperativo(Estructurada, procedimental, modular), Declarativo
> (lógica), Reactiva, Data-Driven, Data-Oriented

## Ejemplo orientado a objectos
```py
class Sum:
    def __init__(self):
        self.sum = 0
        self.numbers = []

    def set_number(self, numbers):
        self.numbers = numbers

    def calculate(self):
        # Aqui se resuelve el problema de alguna forma

    def get_sum(self):
        return self.sum
```
En este caso, nos encontramos con un objecto encargado de manejar la suma. No
se puede acceder al valor directamente, sino que debemos usar un método para
eso.

## Ejemplo funcional:
```py
def sum(numbers):
    if len(numbers) == 1: return numbers[0]
    else: return numbers[0] + sum(numbers[1:])
```
Una función toma un parámetro pero no modifica absolutamente nada más.

## Ejemplo declarativo
```cs
var sum = Enumerable.Range(0, 99)
                    .Where(i => i % 2 == 0)
                    .Sum();
```

En este ejemplo sumamos los números del 0 al 99, pero en lugar de usar nuestra
propia lógica, se usan funciones ya establecidas que al juntarse se obtiene el
resultado deseado.

## Ejemplo imperativo
```py
numbers = [...]
sum = 0;
for i in range(11)
    sum += i
```
Tenemos un valor global (`sum`) que se modifica.

Este ejemplo también es aplicable al paradigma procedural, ya que se realiza
todo secuencialmente.
