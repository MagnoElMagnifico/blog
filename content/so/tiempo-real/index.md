---
title: Sistemas Operativos en tiempo real
description: >
    En este artículo se definirá lo que es un Sistema Operativo en Tiempo Real
    y cómo se soluciona su mayor problema: la planificación de procesos para llegar
    a tiempo.
date: 2024-05-27T00:18:50+02:00
weight: 9
math: true
---

# Sistema en Tiempo Real

{{< block "Sistema en Tiempo real" "var(--magno-blue)" >}}
Un Sistema en tiempo Real (STR) debe **ejecutar un proceso en un tiempo
límite**. Esto implica que el planificador debe darle la CPU el tiempo
necesario.
{{< /block >}}

{{< block "Calendarizable" "var(--magno-blue)" >}}
Si un sistema es capaz de **procesar los estímulos a tiempo**, se dice que es
**calendarizable** o **planificable**.
{{< /block >}}

Esto sistemas suelen responder a estímulos: es necesario responder ante ese
estímulo antes de que llegue el siguiente. Esto se consigue dividiendo el
programa en varios procesos, donde el comportamiento de cada uno es precedible
y se conoce de antemano.

En vista a esto, se pueden definir dos tipos según la periodicidad de los
estímulos:

- **Aperiódicos**: no hay un tiempo límite bien definido, los estímulos llegan
  de forma impredecible.
- **Periódico**: los estímulos llegan en un intervalo regular de tiempo.

O también según las consecuencias de cumplir o no con los requisitos:

- **Duro**: no cumplir con el procesamiento a tiempo tiene graves consecuencias
  (pe: aplicaciones multimedia, un reproductor de vídeo debe poder descomprimir
  a una tasa mayor o igual a la de reproducción).
- **Suave**: no procesar todos los estímulos a tiempo no tiene consecuencias
  importantes. Aún así, no hacerlo puede suponer un deterioro del sistema en
  general (pe: un videojuego).

# ¿Cuando un STR es calendarizable?

Si hay $n$ eventos periódicos, $i$ con el período $T_i$ y necesitando $C_i$
segundos de CPU, la carga será manejable si el factor de uso $U$ no supera el
100%.

$$ U = \sum^n_{i=1} \frac{C_i}{T_i} \le 1 $$

Se toma el porcentaje de uso de CPU durante el período para cada evento, y se
acumula todo para determinar si eso supera el 100%. Sin embargo, esto no tiene
en cuenta la sobrecarga por el cambio del contexto:

$$ U = \frac{t_{\text{cambio contexto}}}{Q} + \sum^m_{i=1} \frac{C_i}{P_i} \le 1 $$

El primer término es el porcentaje del período usado para la planificación,
siendo $Q$ la duración del quántum. En la práctica es despreciable, suele estar
entre el 1% y 10% del total.


# Algoritmos de planificación

## _Rate Monotonic Scheduling_ (RMS)

El algoritmo de programación monotónica es un ejemplo de tiempo real estático
clásico para procesos **periódicos**.

Se deben cumplir las siguientes condiciones:

1. Cada proceso periódico se debe completar dentro de su periodo
2. Ningún proceso depende de otro
3. Cada proceso tarda lo mismo en ejecutarse en cada periodo
4. Ningún proceso no períodico tiene tiempo respuesta

Supongamos también que el tiempo de planificación es despreciable, para hacerlo
más sencillo.

RMS asignará a cada proceso una **prioridad fija igual a la frecuencia de
ocurrencia de su evento de activación**. El planificador siempre escogerá al
proceso listo con más prioridad, reemplazando el proceso actual si es necesario.

Un proceso que se ejecute cada 30ms, obtendrá una prioridad de 33; o un proceso
que se ejecute cada 40ms tendrá una prioridad de 25.

Este mecanismo solo funciona bien cuando el porcentaje de uso de la CPU no es
demasiado alto. Se ha demostrado que el margen es:

$$ \sum^m_{i=1} \frac{C_i}{T_i} \le n (2^{1/m} - 1) $$

## Menor tiempo de respuesta primero (EDF)

El algoritmo EDF es **dinámico** y por eso se puede utilizar con procesos
**aperiódicos** y no requiere que la ráfaga CPU sea constante.

Cada vez que un proceso necesita la CPU debe decir cuanto tiempo tardará: la
idea es de la lista de procesos listos se selecciona siempre **el de menor
tiempo de respuesta** (**tiempo restante**).

Este algoritmo no tiene la restricción de RMS, encontrará la mejor planificación
para casos donde el porcentaje de uso de CPU es del 100%. El precio a pagar es
un algoritmo más complejo.

## Ejemplos

{{< figure
    src="tiempo-real.png"
    link="tiempo-real.png"
    caption="Ejemplo de programación en tiempo real"
>}}

En el caso de RMS:

- A tiene una prioridad de 33 (prioridad máxima)
- B tiene una prioridad de 25
- C tiene una prioridad de 20

Fíjese como en el instante 90, se cambia de contexto de B3 a A4, dado que tiene
más prioridad. C solo se ejecutará si la CPU está libre.

{{< figure
    src="tiempo-real-2.png"
    link="tiempo-real-2.png"
    caption="Otro ejemplo de programación en tiempo real"
>}}

En este otro ejemplo se puede ver que RMS y EDF no dan siempre el mismo
resultado.
