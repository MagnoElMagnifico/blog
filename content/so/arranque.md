---
title: Arranque y Proceso Hardware
description: >
    Pasos que realiza el Sistema Operativo cuando se inicia y su funcionamiento
    normal, llamado proceso hardware.
date: 2023-12-28T13:48:37+01:00
weight: 2
math: true
---

# Arranque del sistema

{{<
  figure
  src="../arranque-sistema.png"
  alt="Figura de arranque del sistema"
>}}

1. Se inicia el reloj del sistema.

2. Como hay que estar ejecutando instrucciones continuamente, incluso desde el
   primer tick de reloj, se debe cargar una instrucción de memoria y actualizar
   el contador del programa.

3. Se lee de una memoria ROM que contiene el programa de arranque escrito desde
   fábrica, normalmente llamado **POST**. Este programa consta de chequeos
   e inicializaciones para verificar que todo funciona correctamente.

4. Cuando termina, se salta a la **BIOS** (_Basic Input Output System_). Este,
   realiza chequeos de Entrada/Salida: cuánta RAM hay instalada, qué
   dispositivos están instalados...

     - La BIOS dispone procedimientos para leer el teclado, escribir en la
       pantalla y realizar operaciones básicas de E/S como por ejemplo acceder al
       disco.
     - La BIOS está también en la memoria ROM de la placa base del ordenador.
     - El usuario puede cambiar la configuración de la BIOS, como por ejemplo,
       cambiar el Sistema Operativo a usar.
     - Esta configuración se almacena en una memoria no volátil de lectura
       y escritura. En la figura se representa como CMOS (tipo de transistores
       utilizados).

5. Finalmente, la BIOS determina y carga el programa de arranque en la RAM desde
   el disco duro. Se comienza a ejecutar las instrucciones del **programa de
   arranque** desde la memoria principal.

6. Este programa de arranque es el encargado de llamar al cargador, que copia el
   código del kernel del Sistema Operativo a memoria principal.

7. Una vez hecho eso, será el kernel quien se encargue de todo, y mientras el
   ordenador siga encendido, el kernel seguirá en memoria.

# Proceso Hardware

{{<
  figure
  src="../proceso-hardware.png"
  alt="Figura del Proceso Hardware"
>}}

Tras completar el proceso de arranque y de haber cargado el kernel en memoria,
se debe de escoger qué tarea ejecutar a continuación. De esto se encarga el
**Gestor de Procesos**.

En el caso de la figura solo se dispone de un core para ejecutar las tareas
$P_1, P_2, \ldots, P_n$. Si hubiesen más cores, también se tendría que decidir
qué hace cada uno, y en la figura se representaría por líneas paralelas, dado
que se ejecutan simultáneamente.

Las aplicaciones del usuario (e.g.: un navegador) puede generar cada una muchas
de estas tareas, pero hay otras que también se ejecutan, llamadas **demonios**
(_daemons_). Siempre tiene que existir una tarea a ejecutar, dado que la CPU
siempre debe estar ejecutando instrucciones. Por eso, existe la tarea
_**idle**_, que simplemente ejecuta _noop_ (no hacer nada) continuamente. Debe
ser una intrucción que consuma poco. Esta tarea es la última elegible por el
Gestor de Procesos.

Como se puede ver en la figura, se cambia de tarea constantemente, por ejemplo
cuando hay una operación de Entrada/Salida. Se vuelve al gestor de procesos para
decidir qué ejecutar a continuación, porque la tarea anterior está
**bloqueada**, dado que necesita que se termine la operación de Entrada/Salida.

Por otro lado, las **interrupciones** son avisos que vienen de fuera, de
dispositivos de Entrada/Salida: teclado, ratón, disco duro... El SO interrumpe
la ejecución actual y salta al **gestor de interrupciones** para determinar su
causa y cómo resolverla. Dicha interrupción podría ser que el usuario termina el
`scanf` de otra tarea. Después de la interrución, es necesario llamar al gestor
de procesos para decidir quién continua, puede ser la misma tarea de antes
o otra distinta.

Resumiendo:

 1. Se completa el Arranque del Sistema.
 2. Se carga el Sistema Operativo en memoria principal.
 3. Se llama al Gestos de Procesos para decidir qué tarea ejecutar.
 4. Se decide ejecutar $P_1$.
 5. Después de un rato, $P_1$ solicita una operación de Entrada/Salida que lo
    bloquea.
 6. Se vuelve al planificador y se escoge otra tarea.
 8. Después de repetir el proceso un par de veces, mientras se ejecuta la tarea
    $P_n$, se recibe una interrupción.
 9. Se llama al gestor de interrupciones para descubrir la causa.
10. Se vuelve al planificador, que selecciona la tarea $P_2$. Por lo visto, la
    operación Entrada/Salida que había solicitado, ya está completada.
11. ...

Este es el funcionamiento normal del Sistema Operativo.

