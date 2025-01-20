---
title: Agentes
description: >
    Introducción a los agentes: definición y sus características. Veremos
    los tipos de entornos en los que los agentes suelen operar y algunas
    arquitecturas comunes. A continuación, se comentarán los protocolos
    y lenguajes de comunicación de FIPA ACL, definición de ontologías; y para
    terminar, implementación de agentes en la plataforma de JADE.
date: 2025-01-19T00:15:18+01:00
weight: 15
math: true
---

# Antecedentes

{{< keyvalue title="Tendencias" key-header=true >}}
-% Ubicuidad :%
Cada vez sistemas de cómputo más **baratos**.
{{< arrow >}} Se ponen en cualquier lugar: coches, microondas, lavadores, TV...

-% Interconexión :%
Dichos sistemas no están aislados, sino que **dialogan con otros**. Disponen de
_Bluetooth_, _Wi-Fi_, ...

-% Inteligencia (complejidad) :%
Originalmente los estos sistemas eran bastante sencillos, pero como consecuencia
de la mejora de la capacidad de cómputo, hoy en día ya no es así.

-% Delegación :%
Cada vez se **delegan más tareas** a sistemas informáticos (coches, aviación...):

- Más seguro
- Más rápido
- No se cansan

-% Orientado a Humanos :%
Aparecen cada vez más **abstracciones de alto nivel** para que un humano pueda
operar con sistemas complejos de forma sencilla.
{{< /keyvalue >}}

-   **Progreso en la programación**: \
    Código máquina {{< arrow >}}
    Ensamblador {{< arrow >}}
    Lenguajes independientes de la máquina (gran mejora en la productividad) {{< arrow >}}
    Objetos {{< arrow >}}
    **Agentes**.

-   **Computación global**: \
    ¿Cómo gestionamos miles de procesadores? Asumamos que los modelos actuales
    no pueden.

-   **Delegación** + **Inteligencia**:
    - Construcción de sistemas que actúan en lugar de nosotros.
    - Sistemas que funcionen de forma independiente.
    - Deben defender nuestros intereses.
    { .arrow-list }

-   **Interconexión** + **Distribución**:
    - Sistemas que cooperan y llegan a acuerdos
    - Sistemas que compiten
    { .arrow-list }

> Todo esto no se estudiaba hasta hace <<poco>> {{< arrow >}} Aparece un nuevo
> campo: los **sistemas multiagente**.

# Definición de Agente

{{< block "Agente" "var(--magno-blue)" >}}
**Sistema de computación** capaz de realizar acciones **de forma independiente**
a **favor de su dueño**.
{{< /block >}}

Un agente representa a un usuario y defiende sus objetivos, intereses y metas.

- <<Sistema de computación>> = **computable**
- <<De forma independiente>> = **autónomo**
- <<A favor de su dueño>>    = **finalidad**
{ .arrow-list }

{{< block "Sistema Multiagente (SMA)" "var(--magno-blue)" >}}
Sistema que contiene un número de agentes que **interaccionan** entre sí. Para
que una interacción sea apropiada es necesaria la habilidad de **cooperar**,
**coordinarse** y **negociar** entre sí.

Características:

-   Cada agente no tiene la información completa ni la capacidad para resolver
    el problema
-   Tienen puntos de vista limitados
-   No hay un sistema de control global
-   Los datos están descentralizados
-   Computación asíncrona
{{< /block >}}

Grandes cuestiones a resolver:

- ¿Cómo construirlos? {{< arrow >}} Diseño de agentes.
- ¿Cómo hacer que cooperen? {{< arrow >}} Diseño de sociedades.
- ¿Qué lenguaje usan para comunicarse? {{< arrow >}} Diseño de ontologías.
- ¿Cómo reconocen los conflictos y llegan a acuerdos?
- ¿Cómo se coordinan para alcanzar sus metas de forma cooperativa?

{{< dropdown "Ejemplos y aplicaciones de agentes" >}}
-   Control de vehículos espaciales.

    Se deben tomar decisiones de forma rápida: no es viable que lo haga un
    humano porque la señal puede tardar varias días en llegar. Por tanto, se
    busca la construcción de naves espaciales autónomas.

    La misión [Deep Space 1] de la NASA consistía en acercarse a un cometa para
    obtener información sobre él. Como tenían poco presupuesto, aprovecharon
    para probar un montón de tecnologías: compartimentaron el sistema en módulos
    independientes, donde cada uno se comportaba como un agente. Si uno fallaba,
    el resto era capaz de reconfigurarse para poder continuar.

-   Control de tráfico aéreo.

    Si un sistema de control de tráfico aéreo falla, deja sin soporte a un
    montón de vuelos en la vecindad. Por tanto, si un sistema vecino lo detecta,
    cooperaría para gestionar los vuelos afectados.

    En este caso, los sistemas toman la iniciativa y cooperan para solucionar el
    problema más allá de las capacidades de cualquier agente individual.

-   Agentes de internet.
    -   Servicios de información de Internet: el agente realiza búsquedas en
        internet de forma automatizada, identifica información y va uniendo
        diferentes piezas.
    -   Pueden hacer planes de viaje, gestionar
    -   Comercio electrónico: comprar, negociar...
    -   Conforme más cosas pueden hacer de forma electrónica, los agentes
        software tienen mayor acceso a los sistemas del mundo real.

Más ejemplos:

- Bots de videojuegos.
- Robótica.
- Simulación de sistemas dinámicos.

[Deep Space 1]: https://en.wikipedia.org/wiki/Deep_Space_1
{{< /dropdown >}}

{{< dropdown "Es un campo multidisciplinar" >}}
Economía, Filosofía, Teoría de juegos, Lógica, Ecología, Ciencias sociales, ...\
Muchas analogías con el campo de la Inteligencia Artificial.
{{< /dropdown >}}

{{< dropdown "Puntos de vista" >}}
-   Como paradigma de la Ingeniería de Software.\
    Los ingenieros tratan de comprender la complejidad del software, y la
    _interacción_ es posiblemente su característica más importante.

-   Agentes como sistemas de intenciones: \
    "_El comportamiento de una entidad se puede predecir mediante la atribución
    de creencias y deseos_".

    Una intención es un tipo de actitudes empleadas para describir acciones.

-   Agentes para comprender a las sociedades humanas: \
    Los sistemas multiagente proporcionan una nueva herramienta para simular
    sociedades.

-   Sistemas multiagente para la búsqueda de bases teóricas: \
    Queremos construir sistemas de agentes autónomos, pero todavía no sabemos
    cómo deben ser.
{{< /dropdown >}}

{{< dropdown "Comparativa con otros campos" >}}
-   No son simplemente sistemas concurrentes porque:
    -   Los agentes son autónomos
    -   Los agentes tienen sus propios intereses

-   No es simplemente Inteligencia Artificial porque:
    -   No es necesario implementar técnicas de Inteligencia Artificial para
        crear un agente.
    -   La IA clásica ignoraba aspectos sociales importantes de la actividad
        inteligente del mundo.
    -   Aún así, cuanto más complejo es el agente, más se utilizan estas
        técnicas.

-   No son simplemente economía o teoría de juegos porque:
    -   Algunas suposiciones allí consideradas pueden no ser útiles o válidas en
        sistemas multiagente.
    -   La teoría de juegos no proporciona todas las soluciones. Nos interesa
        tener agentes computaciones con recursos limitados.

-   No son simplemente ciencias sociales porque:
    -   No hay ningún motivo por el que una sociedad de agentes deba parecerse
        a una humana.
{{< /dropdown >}}

# Características

{{< keyvalue title="Entidades autónomas" key-header=true >}}
-% Autonomía :%
Los agentes trabajan sin la intervención directa del usuario y toman sus propias
decisiones. \
Es la única característica realmente **obligatoria**.

-% Reactividad :%
Los agentes perciben su entorno y responden a sus estímulos, por lo que
se pueden ver como sistemas de control.

<!-- TODO: figura de sistema de control: agente + entorno + actuadores + sensores -->

-   En la mayor parte de los casos, el agente tiene **control parcial** sobre el
    entorno, incluso algunos agentes pueden cambiarlo. Por tanto, suelen ser
    entornos **no deterministas**.

-   El agente tiene una serie de **precondiciones y unas acciones asociadas**
    a ellas. El principal problema que debe resolver es **decidir qué acción**
    se lleva a su objetivo.

-   Además, los agentes deben estar **preparados para fallar** o incluso **no
    saber si han tenido éxito** o no.

-% Iniciativa :%
El agente necesita cumplir una serie de objetivos, lo que determinará su
comportamiento.

{{< keyvalue-sep title="Inteligencia (= complejidad)" >}}

-% Razonamiento :%
- Decide qué **objetivo** perseguir o a qué **evento** reaccionar
- Decide **cómo actuar** para conseguir un objetivo
- Puede decidir **suspender o abandonar un objetivo** para centrarse en otro

-% Aprendizaje :%
Puede **adaptarse** progresivamente al usar técnicas de aprendizaje.

-% Principio de Racionalidad <br> (Allen Newel, 1982) :%
Si un agente tiene el conocimiento de que una de sus acciones le llevará a uno
de sus objetivos, entonces el agente seleccionará esa acción.

- Existe una clara conexión entre objetivos y comportamientos
- Esto no implica que el agente tomará la mejor decisión siempre
{ .arrow-list }

{{< keyvalue-sep title="Interacción" >}}

-% Concurrencia :%
-   Resolución de problemas mediante la estrategia de Divide y Vencerás, que
    permite usar concurrencia.
-   Esto aporta flexibilidad, escalabilidad, tolerancia a fallos y gestión de
    recursos.

-% Heterogeneidad :%
**Heterogeneidad** y especialización: **se reparten las responsabilidades**. \
La diferencia con una red P2P es que los nodos son heterogéneos, diferentes
entre sí, cada uno con diferentes objetivos.

-% Test de Huhns-Singh (1999) :%
Un sistema que contenga uno o más agentes, debe cambiar sustancialmente si otro
de los agentes se agrega al sistema.

Condiciones:

- El entorno del agente no es estático: pueden suceder eventos.
- El entorno es lo suficientemente observable (que no tiene porqué serlo).
- El tipo de los agentes que se incorporan es alguno ya existente en el sistema.
<!---->
- Comportamiento emergente: aparecen comportamientos no programados.
- Mejora el rendimiento
{.arrow-list}

{{< keyvalue-sep title="Habilidad social" >}}

-% Habilidad social :%
-   **Interaccionan**: dialogan entre ellos.
-   **Delegan**: asignan tareas a otros agentes.
-   **Cooperan**: trabajo en común para llegar a un fin común.
-   **Negocian**: formulan acuerdos cuando varios agentes compiten.
-   **Se coordinan**: organizan el proceso de solución del problema evitando
    interacciones nocivas.

{{< arrow "var(--magno-green)" >}} Usan un lenguaje complejo y rico:

- KQML
- FIPA ACL (JADE)

Algunos autores consideran que hablar estos lenguajes es suficiente para
considerar una aplicación un agente.

{{< keyvalue-sep title="Movilidad" >}}

-% Agentes móviles :%
-   Los agentes pueden migrar de un nodo a otro en una red, preservando su
    estado en cada salto.
-   Esto se puede conseguir mediante intérpretes y máquinas virtuales, como la
    JVM (usa Java RMI por debajo), que es independiente de plataforma.

{{< /keyvalue >}}

<!-- TODO: ventajas de uso de los agentes -->

<!-- TODO: utilidad y aplicaciones de los agentes -->
<!-- TODO: sistemas multiagente vs orientados a objetos -->
<!-- TODO: sistemas mulitagente vs sistemas expertos -->
<!-- TODO: metodología -->

# Entornos

{{< keyvalue title="Tipos de entornos" key-header=true >}}
-% Accesible vs Inaccesible :%
-   **Accesible**: el agente puede obtener información completa y exacta del
     entorno.
-   La mayoría de los entornos son inaccesibles.
-   Cuando más accesible, más fácil es desarrollar agentes.

-% Determinístico vs No determinístico :%
- **Determinístico**: una acción tiene un solo posible efecto.
- Los entornos no determinísticos complican el desarrollo de agentes.

-% Episódico vs No episódico :%
-   **Episódico**: las prestaciones de un agente dependen de un número discreto
    de episodios, no del escenario completo.

    Es decir, no existe dependencia entre incidente actual y anterior. En un
    entorno no episódico o secuencial, las decisiones anteriores pueden afectar
    al futuro.

-   Son más simples de desarrollar: no necesita razonar respecto de
    interacciones entre el episodio actual y futuros episodios.


-% Estático vs Dinámico :%
-   **Estático**: el entorno solo se modifica por las interacciones del agente.
-   **Dinámico**: existen otros procesos que modifican el entorno, sin que el
    agente tenga control sobre ello. Dichos procesos pueden interferir en las
    decisiones del agente.

-% Continuo vs Discreto :%
- **Discreto**: número fijo y finito de acciones a tomar y percibir.

Ejemplo:

- Discreto: partida de ajedrez.
- Continuo: conducir un coche.
{{< /keyvalue >}}

# Arquitecturas de agentes

{{< keyvalue title="Arquitecturas basadas en capas" key-header=true >}}
-% Horizontal :%
Todas las tareas están conectadas con las percepciones y acciones.

Hay una función mediadora:

- Decide qué capa tiene el control del agente
- Asegura la consistencia
- Es el cuello de botella del sistema

```goat
.---.                   .---.
| S |                   | A |
| E |-------------------| C |
| N | Explorar          | C |
| S |-------------------| I |
| O | Evitar obstáculos | O |
| R |-------------------| N |
| E | ...               | E |
| S |-------------------| S |
'---'                   '---'
```

{{< keyvalue key-header=true >}}
-% Ventajas :% **Paralelismo**.
-% Desventajas :%
-   Todas las capas tienen que tener un **alto conocimiento** sobre el entorno.
-   Coste de control de coordinación (función mediadora) , ¿qué tarea se va
    a realizar?
{{< /keyvalue >}}

-% Vertical :%
Las tareas funciona por capas, con la posibilidad de tener varias pasadas por
capa:

- Una primera capa encargada de la percepción.
- El resto de capas son abstracciones.
- La última realiza las acciones.

```goat
.---------------------.
|      ACCIONES       |
+---------------------+
| Toma de decisiones  |
+---------------------+
|... Abstracciones ...|
+---------------------+
| Percepción          |
+---------------------+
|      SENSORES       |
'---------------------'
```

{{< keyvalue key-header=true >}}
-% Ventajas :% Menor conocimiento del control.
-% Desventajas :%
- Mayor complejidad en la capa que interactúa con los sensores.
- No tolerante a fallos.
{{< /keyvalue >}}
{{< /keyvalue >}}

{{< keyvalue title="Arquitecturas según su procesamiento" key-header=true >}}
-% Basadas en lógica :%
Se representa el estado interno como un conjunto de sentencias lógicas de
primer orden. Luego se utilizan reglas de deducción lógicas para tomar
decisiones.

{{< dropdown "Funciones" >}}
Sea

- $L$, un conjunto de sentencias de primer orden
- $D$, un conjunto de bases de datos de $L$ ($D = P(L)$)
- $A$, las posibles acciones del agente

Entonces, las funciones que forman un agente:

- **Ver**: $S \to P$ (estímulo genera una Percepción).
- **Próximo**: $D \times P \to D$ (Conocimiento y Percepción da Conocimiento -- actualizar el estado interno)
- **Acción**: $D \to A$ (sabiendo algo, tomamos una Acción).
{{< /dropdown >}}

{{< keyvalue key-header=true >}}
-% Ventajas :% Representación clara y elegante.
-% Desventajas :%
- Complejidad temporal elevada.
- Es difícil encontrar una representación simbólica para todo.
{{< /keyvalue >}}

-% Arquitecturas deliberativas :%
Modela el mundo y el conocimiento sobre el mismo de forma simbólica,
explícitamente representado, en donde las decisiones se toman utilizando
mecanismos de razonamiento lógico según patrones y manipulaciones.

Típicamente se sigue la teoría clásica de la planificación:

- Estado inicial
- Conjunto de planes
- Estado objetivo

El agente contiene un sistema de planificación que determina qué paso debe
realizar para llegar del estado inicial al estado objetivo.

------

Un ejemplo es la **arquitectura BDI** (_Believes -- Desires -- Intentions_):

- **Creencias**: conocimiento del agente sobre el entorno.
- **Deseos**: metas y objetivos
- **Intenciones**: manejan y conducen a acciones dirigidas hacia las metas.
  Influyen en las creencias.

Se trata de un modelo intuitivo, pero es difícil equilibrar una conducta para
que sea reactiva y tenga iniciativa:

-   **Agentes audaces**: no se paran para reconsiderar sus intenciones, por lo
    que tienen un coste temporal y computacional bajo. Son aptos para entornos
    que no cambian rápidamente
-   **Agentes cautos**: se paran constantemente para reconsiderar sus
    intenciones, para explorar nuevas posibilidades. Aptos para entornos que
    cambian rápidamente.

{{< dropdown "Funciones" >}}
Sea

- $B$, $D$, $I$ los conjuntos de Creencias, Deseos e Intenciones.
- Por tanto, el estado interno será $(B, D, I)$.

Funciones:

- $\operatorname{Brf}:      P(B) \times P \to P(B)$
- $\operatorname{Opciones}: P(B) \times P(I) \to P(D)$
- $\operatorname{Filtro}:   P(B) \times P(D) \times P(I) \to P(I)$
- $\operatorname{Ejecuta}:  P(I) \to A$

<!-- TODO: diagrama de flujo de las funciones. -->
{{< /dropdown >}}

{{< keyvalue key-header=true >}}
-% Ventajas :% Modelos intuitivos
-% Desventajas :% Difíciles de equilibrar en iniciativa y reactividad.
{{< /keyvalue >}}

-% Arquitecturas reactivas :%
El argumento principal de estas estrategias es que no se necesita utilizar el
modelo simbólico para tener inteligencia. Entonces:

- No incluye un modelo simbólico del mundo
- No usa razonamiento complejo

{{< arrow "var(--magno-green)" >}} Se usa el modelo **Estímulo-Respuesta**.

-   Uso de **arquitecturas verticales** para el **procesamiento descendiente**:
    patrones que se activan bajo ciertas condiciones de los sensores y tienen un
    efecto directo sobre los actuadores
-   Se utilizan capas por prioridades, que bloquean las anteriores.

-----

Un ejemplo típico de estas arquitecturas es la propuesta de Roodney Brooks,
conocida como la **arquitectura de subsunción**:

- Muchas tareas pueden dispararse simultáneamente
- Las conductas siguen una jerarquía, normalmente por abstracción

```goat
                       +--------+
                 .---->| Capa 2 |--.
                 |     +--------+   v
                 +---->| Capa 1 |-----.
.----------.     |     +--------+      v    .------------.
| Sensores |-----+---->| Capa 0 |---------->| Actuadores |
'----------'           '--------'           '------------'
```

{{< dropdown "Funciones" >}}
Sea

- $c$ un conjunto de percepciones
- $a$ una posible acción
- $(c, a)$ una conducta
- $<$ la relación binaria de inhibición en $\R^2$

Funciones:

```py
def Accion(p: P) -> A:
    conductas = {(c, a) for c, a in R and p in c }
    for (c, a) in conductas:
        if not exists (c1, a1) in conductas or (c1, a1) < (c, a):
            return a
    return None
```
{{< /dropdown >}}

{{< keyvalue key-header=true >}}
-% Ventajas :%
- Respuesta inmediata.
- No tiene los problemas de la representación simbólica.
-% Desventajas :%
- Es difícil diseñar agentes puramente reactivos con capacidad de aprendizaje.
- Interacciones difíciles de entender con agentes con muchas conductas.
{{< /keyvalue >}}

-% Arquitecturas híbridas :%
Dado que no es del todo acertado utilizar arquitecturas totalmente deliberativas
o totalmente reactivas, se plantean versiones híbridas que combinan varios
modelos. Generalmente se trata de un sistema formado por **dos o más
subsistemas**, que pueden seguir varias estrategias:

- **Deliberativo**: mundo simbólico.
- **Reactivo**: procesar estímulos que no necesitan deliberación.

Estructuración por capas:

- **Vertical**: solo una capa tiene acceso a los sensores y actuadores.
- **Horizontal**: todas las capas tienen acceso.

También es posible realizar **abstracciones** dentro de este modelo:

- **Reactivo** (nivel bajo): decisiones en base a los datos recopilados
- **Conocimiento** (nivel medio): conocimiento que se posee del medio (simbólico)
- **Social** (nivel alto): maneja aspectos sociales de otros agentes (deseos, intenciones, ...)

{{< keyvalue key-header=true >}}
-% Ventajas :% Óptima para equilibrar las diferentes conductas del agente
(reactividad e iniciativa).
-% Desventajas :%
- Falta de claridad
- Hay un número muy elevado de posibles interacciones entre las distintas capas
{{< /keyvalue >}}
{{< /keyvalue >}}

# Comunicación entre agentes

{{< block "Teoría de los actos del habla (_Speech acts_)" >}}
La comunicación entre agentes se basa en esta teoría: _quien habla no solo
declara sentencias verdaderas o falsas, sino que también realiza **actos del
habla**: peticiones, sugerencias, promesas, amenazas_...

- **Locución**: acto de decir algo
- **Ilocución**: intención del mensaje.
- **Performativa**: conjunto de ilocuciones clasificadas por su objetivo.
    - Asertivas: informar
    - Directivas: pedir y preguntar
    - Permisivas, Prohibitivas y Declarativas: causan eventos
    - Expresivas: emociones y evaluaciones
- **Perlocución**: efecto de la ilocución sobre el receptor.

Objetivos:

- **Completitud** para cubrir un amplio rango de situaciones de comunicación
- **Simplicidad** para no sobredimensionar agentes simples
- **Concisión** para minimizar la redundancia y ambigüedad
{{< /block >}}

Niveles de comunicación:

- Inferior: método de interconexión de mensajes.
- Medio (sintaxis): formato de la información.
- Superior (semántica): significado de la información.

Tipos de mensajes:

- Planificables vs Servidos por eventos
- Síncronos vs Asíncronos
- Direcciones físicas vs Rol
- Unicast vs Multicast vs Broadcast

Hay varias implementaciones posibles: CORBA, RMI, DCOM...

A mayores se utilizan **lenguajes de comunicación**: deben tener su semántica
bien definida formalmente. Algunas implementaciones son KQML, FIPA ACL, basados
en XML, ...

## Protocolos de comunicación

{{< block "Protocolo" >}}
Los protocolos son patrones fijos de intercambios de mensajes que modelan las
posibles comunicaciones, un mismo protocolo puede explicar múltiples
conversaciones distintas.
{{< /block >}}

{{< block "Conversación" >}}
Una conversación es una instancia particular de uno de los diálogos definidos
por un protocolo.
{{< /block >}}

Un protocolo sería el equivalente a una clase, y una instancia de dicha clase
sería un diálogo propiamente dicho.

Cualquier participante en una conversación **debe conocer el protocolo** que se
está utilizando para que la comunicación sea efectiva. Este debe estar definido
formalmente e implementado por algún estándar.

Posibles implementaciones:

- FIPA ACL
- Pre- y post- condiciones (Labrou & Finin)

## Servicio de transporte

{{< block "Servicio de transporte" >}}
Es capaz de recibir un mensaje, codificarlo como una secuencia de bytes,
y enviarlo a través de la red.
{{< /block >}}

Generalmente, se espera que el servicio de transporte tenga las siguientes
características:

- **Servicio de confianza**: los mensajes llegan a su destino.
- **Servicio fiable**: se recibe el mensaje tal y cómo se envía.
- **Servicio ordenado**.
- Permite decidir a los agentes si enviar de forma **asíncrona** o **síncrona**.
- **Detecta errores** si el mensaje está mal formado, el agente no es alcanzable, etc.

Cada agente tendrá un nombre que le permita al servicio remitir el mensaje
correctamente. Es capaz de determinar el mecanismo subyacente a utilizar
(TCP/IP, HTTP) y **permitir cambios en la ubicación** del agente.

Asociado a los mensajes, puede haber **metainformación** y otros parámetros.
Esto no se codifica en el cuerpo del mensaje, sino en la interfaz proporcionada
para el envío del mensaje.

## FIPA ACL

{{< block "FIPA" >}}
_Foundation for Intelligent Physical Agents_ es un organismo que estandariza
lenguajes y protocolos de agentes.
{{< /block >}}

{{< block "FIPA ACL" >}}
El _Agent Communications Language_ es el lenguaje estándar de comunicación de
agentes de FIPA.
{{< /block >}}

### Requisitos

1.  Los agentes envía `not-understood` si no reconocen un mensaje. \
    Los emisores deben estar preparados para recibir `not-understood` de otros.
2.  Un agente puede implementar cualquier subconjunto de ACL (mensajes y protocolos). \
    Pero dicha implementación debe ser correcta bajo su semántica.
3.  Si usa nombres según ACL, deben estar implementados correctamente según su
    semántica.
4.  Los agentes pueden usar otros nombres no definidos, pero son responsables de
    asegurarse que otros agentes comprenden el significado. \
    No deben definir nuevos actos que coincidan con alguno de los estándares.
5.  Un agente debe ser capaz de generar mensajes sintácticamente bien formados. \
    Debe ser capaz de traducir una secuencia de caracteres a la sintaxis del mensaje.

### Modelo de comunicaciones

Generalmente la estructura tiene los siguientes elementos:

-   **Agente iniciador**: manda el mensaje.
-   **Agente receptor**: recibe el mensaje.
-   **Mensaje**: acto comunicativo. Tiene una serie de elementos que forman
    parte de su metainformación.
    -   Tipo: el mensaje puede ser de varios tipos (ver apartado siguiente).
    -   Emisor
    -   Receptor o receptores
    -   Contenido del mensaje propiamente dicho
    -   _Responder con_ o _En respuesta a_ sirven para crear hilos de
        conversación.
    -   Ontología
    -   Protocolo
    -   Conversación


```goat
.------------------.              .-----------------.
| Agente iniciador |-------+------| Agente receptor |
'------------------'       |      '-----------------'
                   Acto comunicativo
            Tipo query | request | inform | subscribe
            Emisor          :sender
            Receptor        :receiver
            Contenido       :content
            Responder con   :reply-with <expr>
            En respuesta a  :in-reply-to <expr>
            Inf. transporte :envelope
            Lenguaje        :language <word>
            Ontología       :ontology <word>
            Protocolo       :protocol
            Conversación    :conversation-id
```

### Tipos de mensajes

{{< columns >}}
Ejemplo de mensaje

```
(   request
    :sender an-agent
    :receiver other_agent
    :content
        (action an-agent
            (search
                (:other-agent-description
                    (:services
                        (:service-type email)))
    :language SL0
    :ontology fipa-agent-management
    :protocol FIPA-request
)
```
%%%%%%%%%%%%%%%%%
|                   |              |                  |                    |
|-------------------|--------------|------------------|--------------------|
| `accept-proposal` | `disconfirm` | `not-understood` | `reject-proposal`  |
| `agree`           | `failure`    | `propose`        | `request`          |
| `cancel`          | `inform`     | `query-if`       | `request-when`     |
| `cfp`             | `inform-if`  | `query-ref`      | `request-whenever` |
| `confirm`         | `inform-ref` | `refuse`         | `suscribe`         |
{{< /columns >}}

### Protocolos

{{< keyvalue title="Algunos protocolos de FIPA ACL" key-header=true >}}
-% `FIPA-query` :%
Solicitar una acción tipo inform (`query-if,` `query-ref`)

-% `FIPA-request` :%
Solicitar que otro realice una acción

-% `FIPA-request-when` :%
Análogo al anterior + precondición que debe esperar

-% `FIPA-contract-net` :%
Uno desea que otro realice una acción. Hay varios candidatos y se desea
minimizar una función que caracteriza la tarea.

-% `FIPA-iterated-contract-net` :%
Igual que el anterior, pero con varias iteraciones o ronda.

-% `FIPA-english-auction` :%
Subasta al alza

-% `FIPA-dutch-auction` :%
Subasta a la baja

-% `FIPA-brokering` :%
Intermediación entre agentes. El broker envía la petición a un conjunto de
agentes y proporciona las respuestas.

-% `FIPA-recruiting` :%
Análogo al anterior, pero los agentes responden al iniciador y no al broker

-% `FIPA-subscribe` :%
Se le notificará cuando se cumpla la condición dada

-% `FIPA-propose` :%
Propone la realización de una acción. Suele ir seguida de una notificación de
estado.
{{< /keyvalue >}}

## KQML

_Knowledge Query and Manipulation Language_ es otro lenguaje para comunicar
actitudes sobre la información, indiferente sobre el formato de la información.

Define la comunicación a 4 niveles:

- **Transporte**: cómo se envían y reciben los mensajes.
- **Lenguaje**: qué significa cada mensaje.
- **Política**: cómo se estructuran las conversaciones (protocolos).
- **Arquitectura**: cómo conectar los sistemas.

## Ontologías

Cómo se representa la información en el mensaje es responsabilidad del
programador. Para ello, tiene varias estrategias que puede usar:

- **Datos en `String`** (texto)
    - Fácil de leer y comprender por personas.
    - Difícil de leer para la máquina: es necesario _parsear_ sus contenidos.

- **Objetos serializables** de Java (binario) (`java.io.Serializable`)
    -   No es necesario _parsear_ el mensaje, ya lo hace Java automáticamente.
    -   Codificación ilegible para un ser humano.
    -   Todos los agentes deben estar implementados en el mismo lenguaje de
        programación

- **Ontología** (conjunto de clases)
    - Definir objetos que se pueden traducir a un mensaje ACL y viceversa.
    - Proporciona interoperabilidad entre sistemas multiagente.

Nótese que las secuencias de caracteres o bytes son mejores a la hora de
transmitir, pero los objetos son más fáciles de manipular por los agentes.

{{< block "Ontología" >}}
Nomenclatura y **definición formal de los tipos y propiedades** de los objetos de
determinado contexto, así como sus relaciones.

Es un modelo que representa un dominio, y permite describir las estructuras
y relaciones de un dominio sin ambigüedades.
{{< /block >}}

Una ontología es un diccionario que contiene las definiciones de las palabras
y sus sinónimos, para resolver ambigüedades. Se utiliza para **representar el
conocimiento** de distintos universos de discurso.

Problemáticas que resuelven:

-   **Ambigüedad**
    - Uso de diferentes términos para el mismo concepto
    - Uso del mismo término para diferentes conceptos
    - Uso de diferentes sistemas de clases
-   **Comprensión**: múltiples entidades tienen un modelo común del mismo
    dominio.
-   **Interoperabilidad**: dos entidades que adopten la misma ontología se
    entenderán entre sí, independientemente del lenguaje de programación y su
    implementación.

Sin embargo, también plantea el problema del **diseño de ontologías**: es
complejo (sobre todo para dominios inestables y constantemente cambiantes)
y altamente dependiente del dominio. Normalmente se diseñan por expertos en el
ámbito.

Algunas implementaciones:

- OIL
- Ontolingua
- KIF
- RDF
- Esquemas XML
- DTD

# JADE

{{< block "JADE" >}}
_Java Agent Development Environment_ es un middleware _open source_ para el
desarrollo de sistemas multiagente en Java. Está basado en FIPA ACL.
{{< /block >}}

-   Simplifica el desarrollo de estas aplicaciones.
-   Completamente compatible con el ecosistema Java.
-   Cumple con el estándar de FIPA {{< arrow >}} Interoperabilidad con otros
    sistemas que también lo implementen.

Implementa las siguientes características:

- Ciclo de vida y movilidad de los agentes.
- Servicio de páginas amarillas y blancas.
- Transporte de mensajes.
- Gestión de las tareas de los agente.
- Conjunto de utilidades para la monitorización y depuración.

## Arquitectura

{{<
    figure
    src="arquitectura-jade.png"
    link="arquitectura-jade.png"
    alt="Diagrama de la arquitectura de JADE"
    caption="Diagrama de la arquitectura de JADE"
>}}

Una aplicación basada en JADE está compuesta de una colección de activos
llamados agentes:

-   Cada agente tiene un **nombre único en todo el sistema** (AID). Se usará
    para poder comunicarse entre sí.
-   Forman parte de una **red P2P** puesto que pueden comunicarse de forma
    direccional con cualquier otro agente. Sin embargo, los agentes pueden ser
    heterogéneos (cosa que no son los nodos de una red P2P).
-   Viven en un **contenedor**, el que le proporciona su entorno de ejecución.
-   Los contenedores se agrupan en **plataformas**. En cada plataforma se
    diferencia un **contenedor principal** y el resto son secundarios.
-   El contenedor principal es aquel que contiene dos agentes especiales
    desplegados que dan soporte al entorno: el AMS y el DF.

Si se desea mandar un mensaje dentro de la misma plataforma, llega con usar el
nombre del agente. Sin embargo, si está en otra plataforma, se le debe añadir
el nombre de la plataforma también.

## Arranque

```sh
jade -cp jade.jar jade.Boot [opciones] [agentes]
```

Opciones:

- `-help`
- `-container`: crea un contenedor y lo enlaza con la plataforma actual.
- `-host <hostname>`: especifica el host de la plataforma.
- `-name <plaform>`: especifica el nombre de la plataforma.
- `-port <port>`
- `-gui`: lanza el agente de monitorización remota.
- `-conf <file>`: crea o carga un archivo de configuración.

Especificadores del agente:

```
<agentname>:<package>.<agentClass>(<params>)
```

Los parámetros de los agentes se especifican separados por comas (`,`), y más
agentes con puntos y comas (`;`).

## Agentes auxiliares

{{< keyvalue title="Agentes auxiliares" key-header=true >}}
-% AMS :%
El _Agent Management System_ representa la autoridad en la plataforma JADE. Se
encarga de la **monitorización** y **gestión de la plataforma**:

-   Creación y eliminación de contenedores (tanto locales como remotos).
-   Ciclo de vida de los agentes: creación, suspensión, reactivación,
    eliminación, migración y clonación.
-   Componer mensajes a cualquier agente.
-   Lanzar otras herramientas gráficas.

Otros agentes pueden solicitarle que realice acciones utilizando `FIPA-request`,
lenguaje `SL` y la ontología de gestión de JADE.

Se puede obtener fácilmente una referencia a través de `Agent.getAMS()`.
 
-% DF :%
El agente _Directory Facilitator_ proporciona el **servicio de páginas
amarillas**. Se trata de un registro que permite localizar a los agentes
mediante una descripción y unas propiedades.

Se opera utilizando la clase `DFService`.

-% Dummy Agent :%
Compone y envía mensajes. Lee y almacena la cola de mensajes desde un archivo.

-% Sniffer Agent :%
Muestra el flujo de interacciones entre agentes, el contenido de los mensajes
intercambiados y carga/almacena el flujo desde un archivo.

-% Introspector Agent :%
Monitoriza el estado interno de un agente y depura la ejecución.

-% Log Manager Agent :%
Es la interfaz gráfica para modificar el almacenamiento de la plataforma durante
la ejecución (_logging_).
{{< /keyvalue >}}

# Programación en JADE

Para programar un agente en JADE, es necesario crear una clase y hacer que
extienda de la clase `jade.core.Agent`:

```java

import jade.code.Agent;

public class MiAgente {
    @Override
    protected void setup() {
        // Inicio del agente

        doDelete(); // Terminar la ejecución del agente
    }

    @Override
    protected void takeDown() {
        // Rutina de terminación del agente
    }
}
```

- El agente, cuando se ejecuta, llama a `setup()`.
- Para terminar la ejecución, se llama a `doDelete()`.
- Entonces, el agente ejecuta `takeDown()` y termina.

Cada instancia de un agente se identifica por un `jade.core.AID` (_Agent ID_),
que se puede obtener con la función `Agent.getAID()`.

- Debe ser globalmente único
- Dentro de una plataforma, solo se identifican por su nombre

```java
AID id1 = getAID();
AID id2 = new AID(localname, AID.ISLOCALNAME);
AID id3 = new AID(name, AID.ISGUID);
```

- Nombre por defecto de la plataforma: `<main-host>:<main-port>/JADE`
- Nombre completo del agente: `<localname>@<platformname>`

## Envío de argumentos al agente

Se pueden obtener los parámetros enviados por línea de comandos o desde el
agente AMS con la función:

```java
Object[] arguments = getArguments();
```

## Clase `Behaviour`

El trabajo o tareas que realiza un agente se llaman comportamientos, de la clase
`jade.core.behaviours.Behaviour`.

Se pueden crear nuevos comportamientos extendiendo dicha clase:

-   `public void onStart()`: se ejecuta una vez antes de iniciar el
    comportamiento.
-   `public void action()`: definición del comportamiento.
-   `public boolean done()`: devuelve `true` cuando concluye la ejecución del
    comportamiento.
-   `public void onEnd()`: se ejecuta después de que `done()` devuelva `true`.
    Solo se ejecuta 1 vez.

Cada comportamiento tiene una referencia a su agente a través de la referencia
protegida `myAgent`.

Para ejecutar los comportamientos, se deben añadir a los agentes con
`Agent.addBehaviour()`. Si no hay ninguno para ejecutar, el agente pasa a un
estado IDLE y su thread duerme.

Con el método `Agent.removeBehaviour()` se pueden eliminar comportamientos, pero
no se ejecuta `onEnd()`.

Planificación de comportamientos:

-   Un agente pude ejecutar comportamientos de forma concurrente.
-   El funcionamiento es cooperativo: no se le quita la CPU.
-   Sin embargo, todo ocurre en un **único `Thread`** de Java.
-   Se planifica el siguiente comportamiento cuando el método `action()` del
    comportamiento actual termina.

```py
setup()
while True:
    if doDelete():
        break

    b = schedule.getBehaviour()
    b.action()
    if b.done():
        schedule.removeBehaviour(b)
takeDown()
```

{{< keyvalue title="Tipos de comportamientos" key-header=true >}}
-% `jade.core.behaviours.OneShot` :%
- Concluye de forma inmediata
- `action()` solo se ejecuta una vez
- `done()` devuelve siempre `true`

-% `jade.core.behaviours.Cyclic` :%
- Nunca termina
- `action()` siempre realiza la misma acción
- `done()` devuelve siempre `false`

-% `jade.core.behaviours.Complex` :%
- Tiene un estado interno que se va modificando
- `action()` realiza una operación diferente en base a ese estado
- `done()` devuelve `true` en determinada condición

{{< keyvalue-sep title="Planificar operaciones en momentos concretos" >}}

-% `WeakerBehaviour` :%
- La subclase debe implementar `onWake()`, que reemplaza a `action()`
- Solo se ejecuta una vez después de un cierto tiempo

-% `TickerBehaviour` :%
- La subclase debe implementar `onTick()`, que reemplaza a `action()`
- Se llama un número indefinido de veces hasta que se detiene con `stop()`
- `onTick()` se llama cada vez después de un cierto tiempo
{{< /keyvalue >}}

## Modelo de comunicación

Los agentes se pasan mensajes  de forma **asíncrona**. Su formato está definido por
el estándar de FIPA ACL.

La clase `jade.lang.acl.ACLMessage` representa un mensaje y proporciona
_getters_ y _setters_ a todos los cambios definidos por ACL.

```java
ACLMessage msg = new ACLMessage(ACLMessage.INFORM);
msg.addReceiver(new AID("Peter", AID.ISLOCALNAME));
msg.setLanguage("English");
msg.setOntology("Wheather-Forecast-Ontology");
msg.setContent("Today it's raining");
myAgent.send(msg);
```

Y para recibir el mensaje:

```java
ACLMessage msg = myAgent.receive();
if (msg != null) {
    // Procesar el mensaje
}

// Bloquear el comportamiento porque no hay mensajes
```

Es importante bloquear el comportamiento para permitir que otros se puedan
ejecutar, dado que el actual no puede continuar porque espera un mensaje.

{{< block "Bloquear" >}}
Un comportamiento que espera mensajes recibidos no sabe cuándo le llegará un
mensaje. Debe realizar un _poll_ llamando continuamente a `myAgent.receive()`.
{{< arrow >}} Tiempo de CPU perdido.

El método `Behaviour.block()` marca el comportamiento actual como bloqueado, lo
que no lo hace elegible a ejecutar en siguientes planificaciones.

Cada vez que se recibe un mensaje, se desbloquea y se inserta de nuevo en la
cola de comportamientos elegibles. Ahora tiene la oportunidad de procesar el
mensaje.

**IMPORTANTE**: esta llamada no bloquea la ejecución, solo cambia el estado. El
comportamiento se seguirá ejecutando hasta el final de `action()`

Por tanto, lo mejor es:

```java
ACLMessage msg = myAgent.receive();
if (msg == null) {
    block();
    return;
}

// Procesar el mensaje
```
{{< /block >}}

Alternativamente, también es posible recibir mensajes en modo bloqueante:
`Agent.blockingReceive()`.

- El bloqueo termina cuando hay un mensaje en la cola.
- Es peligroso usarlo dentro de un comportamiento:
    -   Ningún otro comportamiento podrá ejecutarse.
    -   Se recomienda `receive()` + `block()`
    -   `blockingReceive()` solo se debe usar en `setup()` y `takeDown()` del
        agente.

### Lectura selectiva de mensajes

El método `receive()` devuelve el primer mensaje de la cola de mensajes y lo
elimina. Esto puede suponer un problema cuando hay varios comportamientos
esperando mensajes: uno de le puede _robar_ el mensaje al otro.

Para evitar eso, es posible recibir solo los mensajes con determinadas
características gracias a `jade.lang.acl.MessageTemplate`.

```java
MessageTemplate tpl = MessageTemplate.MatchOntology("Test-Ontology");
ACLMessage msg = myAgent.receive(tpl);
if (msg != null) {
    // Procesar el mensaje
    assert msg.getOntology().equals("Test-Ontology");
} else {
    block();
    return;
}
```

Se pueden combinar varios usando `MessageTemplate.or()` o `MessageTemplate.and()`.

## Servicio de páginas amarillas

El servicio de páginas amarillas permite buscar y/o registrar agentes para que
otros puedan localizarlos. El **DF es un agente**, por lo tanto **se comunica
con mensajes ACL** al igual que el resto de agentes.

La clase `DFService` proporciona métodos estáticos que ya gestionan el envío de
estos mensajes:

-   **Registrar agente** `DFService.register()`: es necesario especifica una
    descripción del agente (`DFAgentDescription`). Esta contiene:
    - El AID del agente
    - Colección de servicios `ServiceDescription`:
        - Tipo de servicio
        - Nombre del servicio
        - Lenguajes, protocolos y ontologías usados
        - Colección de otras propiedades clave-valor dependientes del servicio
-   **Desregistrar agente** con `DFService.deregister()`.
-   **Modificar el registro** con `DFService.modify()`.
-   **Buscar agente** `DFService.search()`: se usa un `DFAgentDescription` con
    las características a buscar a modo de plantilla.

## Ontologías

En JADE, las ontologías se utilizan para representar los elementos que pueden
ser usados como contenido de un mensaje ACL.

Se forman de las siguientes partes:

-   Una clase derivada de la clase `Ontology` que define los elementos del
    dominio y las relaciones entre ellos mediante esquemas.
-   Una serie de clases que implementan los esquemas anteriores.

### Creación de una Ontología

Para crear una ontología en JADE hay que definir los elementos del esquema
y gestionar las expresiones de contenido como objetos Java. Se utiliza el
`ContentManager` para llenar y analizar el contenido de los mensajes.

{{< block "Java Beans" >}}
Un _Bean_ en Java es una clase especial con una forma muy concreta:

- Clase serializable
- Tiene un único constructor público sin argumentos
- Todos sus atributos son privados
- Tiene _getters_ y _setters_ para todos ellos

Es útil para herramientas de generación de código.
{{< /block >}}

Los Beans de implementación se utilizan para manipular datos como objetos Java,
y si contenido puede variar durante la ejecución.

-   Se puede usar la herencia para matizar ciertos aspectos.
-   Es buena práctica **definir interfaces** para modificar la implementación
    sin cambiar la ontología.
-   Sus atributos se conocen como **slots**: hueco genérico que rellenarán los
    agentes.

{{< keyvalue title="Tipos de clases de una Ontología" key-header=true >}}
-% `Concept` :%
Representa un **concepto básico** de la ontología y el resto de elementos se
construyen a partir de aquí.

- Pueden tener atributos y otros `Concept`s
- Se implementan como beans que implementan `jade.onto.Concept`
- **No tiene sentido usarlos directamente como contenido de los mensajes**.

```java
public class Person extends jade.onto.Concept {
    private String name;
    private int age;
    private Person parent;

    public Person() {}
    public String getName() { ... }
    public void setName(String name) { ... }
    // ...
}
```

-% `Predicate` :%
Representan predicados o hechos, **expresiones que afirman algo sobre el
entorno**.

- Pueden tomar un valor cierto o falso.
- Suelen contener `Concept`s como _slots_.

-% `AgentAction` :%
Se trata de un tipo especial de `Concept`:

-   Representan una **acción que puede tomar el agente**.
    - Petición, solicitar servicio, ofrecer un objeto, registrarse, ...
-   Al contrario que `Concept`, sí tiene sentido que sea el contenido de un
    mensaje.
-   No contiene directamente el agente que realiza la acción, sino que se
    encapsula dentro de un `Action`:
    ```java
    new Action(AID, new MyAgentAction());
    ```
{{< /keyvalue >}}

{{< block "`Ontology`" >}}
Por otro lado, la ontología se define a partir de una instancia de la clase
`jade.content.onto.Ontology`.

Esta contiene los esquemas (`jade.content.onto.Schema`) que definen las
estructura de los predicados, conceptos y acciones para su procesado. No varía
durante la ejecución del programa (se trata de un _Singleton_).

Existen clases para usar como base, por ejemplo `BasicOntology`, que ya tienen
algunos esquemas predefinidos:

- Tipos primitivos
- Predicados, conceptos y acciones
- El concepto de AID

{{< /block >}}

### Lenguajes de contenido

El siguiente paso es transformar dichos objetos al formato ACL que requiere el
estándar. JADE proporciona **codecs** o **lenguajes de contenido** para
codificar los beans según marca dicho estándar; hay 2 tipos:

{{< keyvalue title="Tipos de lenguajes de contenido" key-header=true >}}
-% `jade.content.lang.SL` :%
- Se trata del método más usado
- Los elementos se codifican como cadenas de caracteres (texto)
- Esto hace que sea legible por los humanos y más sencillo para depurar
- Compatible con un gran número de sistemas

-% `jade.content.lang.LEAP` :%
-   Los elementos se codifican como secuencias de bytes (binario)
-   No es legible por los humanos (pero el _AgentSniffer_ los traduce)
-   Es más ligero y más eficiente. Por eso se usa en contextos de alto
    rendimiento.
-   Solo es compatible con JADE.
{{< /keyvalue >}}

{{< block "Content Manager" >}}
Se trata de una clase de servicio que se encarga de administrar las ontologías
y lenguajes de contenido.

Se obtiene con el método `Agent.getContentManager()`:

-   `registerOntology()`: especifica el codec
-   `registerLanguage()`: especifica el lenguaje
-   `fillContent()`: codifica e inyecta un bean el slot de contenido de un
    ACLMessage.
-   `extractContent()`: realiza la operación inversa
{{< /block >}}

### Protégé

Diseñar una ontología es complejo y generalmente las crean expertos en el
dominio (que no son necesariamente programadores).

Por tanto, se crearon software específico para el diseño de ontologías, como
Protégé. `OntologyBeanGenerator` es un plugin que genera el código Java (los
beans y la clase Ontology)

## Otros
### `jade.proto`

El paquete `jade.proto` contiene los comportamientos para el rol de iniciador
y el que responde en la mayoría de protocolos de interacción más comunes.

Todas estas clases **manejan automáticamente el flujo de mensajes y los
_timeouts_**. Proporciona métodos de **callback** que deben ser redefinidos para
tomar las acciones necesarias cuando, por ejemplo, se recibe un mensaje
o termina un _timeout_.

### Movilidad

JADE soporta **movilidad fuerte**: se transfiere tanto el código del agente como
su estado (**el agente debe ser serializable**).

1.  Se para la ejecución del agente.
2.  Se mueve a un contenedor remoto.
3.  Se continua ejecutándose desde el punto exacto donde se detuvo.

Si el código del agente no está disponible en la nueva localización, se recupera
bajo demanda.

La migración se inicia:

- **Autoiniciada** por el propio agente: `Agent.doMove()`.
- **Forzada** por el AMS, a petición de otro agente.

También se puede clonar con `Agent.doClone()`

### Seguridad

Dado que JADE es un entorno distribuido, hay que tener en cuenta los potenciales
peligros:

-   Un agente malicioso puede pedir al AMS que mate a otro agente.
-   Un agente malicioso puede pedir al AMS que apague la plataforma.
-   Una entidad maliciosa puede sniffear o modificar información sensible de los
    mensajes.

Se previenen los principales problemas utilizando:

- Autenticación y autorización
- Integridad y confidencialidad de punto a punto
- Basado en JAAS (_Java Authentication and Authorization Service_)

Todos los aspectos de seguridad se implementaron en `SecurityHelper`, que se
puede obtener con `Agent.getHelper()`.

### Interfaz con procesos

La clase `jade.core.Runtime` y el paquete `jade.wrapper` permiten usar JADE
desde un programa externo de Java para crear contenedores y ejecutar agentes.

### Comportamientos en `Thread`s

La clase `jade.core.behaviours.ThreadedBehaviour` permite ejecutar
comportamientos normales en un thread dedicado.

### Persistencia

Permite guardar y recuperar el estado de un agente de una BD relacional. Todavía
es una característica experimental.

## Jess y JADE

Jess (_Java Expert System Shell_) es un [sistema experto] basado en CLIPS que
proporciona una programación basada en reglas y un motor de inferencia para
obtener conclusiones a partir de ellas.

La idea de que, en todo momento se tengan que revisar de nuevo todas las reglas
que determinen el comportamiento del agente es muy ineficiente.

{{< block "Algoritmo RETE" >}}
Aplica de forma eficiente las reglas de un sistema experto:

-   Se implementa mediante una red de nodos, cada uno representa un patrón
    condicional de una regla. Los nodos finales representan la acción final.
-   Durante la generación de esta red, se eliminan elementos redundantes para
    ahorrar cálculos.
-   Solo actualiza aquellos elementos del entorno que se han actualizado: activa
    o desactiva el nodo asociado.
-   Cuando todos nodos de una misma rama están activos, entonces se puede
    ejecutar la acción del nodo hoja.

Consigue un mejor tiempo de ejecución sacrificando memoria.
{{< /block >}}

Para integrar JADE con Jess, se utiliza una clase especial `Rete`, que
implementa el motor de inferencia. Basta con instanciar la clase y manipularlo
correctamente.

A continuación, se instancia otro objeto para cargar y _parsear_ la base de
conocimiento de un archivo con sintaxis tipo CLIPS. Tras comprobar que es todo
correcto, se carga dicha base de conocimientos y se arranca el sistema.

La llamada al método `Rete.run()` hará que se apliquen todas las comprobaciones
y reglas lógicas hasta que no queden más para ejecutar. Esto puede bloquear el
hilo del agente, por lo que también se puede usar alternativamente la función
`Rete.run(MAX_PASSES)`, que limita el número máximo de pasadas que se hacen por
la base de conocimiento.

La idea de esta integración es que el agente reciba estímulos del entorno, añada
hechos al sistema experto y reaccione según las reglas con alguna acción. Para
ello, puede implementarse desde Jess o implementar la clase `Jess.UserFunction`.

[sistema experto]: {{< ref "aed/sistema-conocimiento" >}}
