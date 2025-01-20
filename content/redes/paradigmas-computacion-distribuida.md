---
title: Paradigmas de la Computación Distribuida
description: >
    Tema introductorio a la Computación Distribuida. Se discutirán los
    temas principales que se tratarán en posteriores artículos.
date: 2024-12-22T19:46:25+01:00
weight: 8
math: true
---

{{< block "Paradigma" >}}
Patrón, ejemplo o modelo simplificado para ayudar a resolver o estudiar un
problema: aporta una estrategia base desde la que partir.
{{< /block >}}

Nótese que, en la práctica, muy pocos sistemas siguen un único paradigma el pie
de la letra: o realizan algunas modificaciones, o combinan varios de ellos
dependiendo del caso.

# Características

Las características de una aplicación o programa distribuido son:

-   **Comunicación entre procesos**: participación de dos o más [procesos] y que
    intercambien datos entre ellos ([IPC]).
-   **Sincronización de eventos**: envío y recepción de forma sincronizada. Una
    comunicación solo es efectiva cuando uno transmite y otro recibe, y en el
    orden preciso: el receptor debe estar preparado antes de la transmisión o se
    podrían perder datos.

# Abstracciones

{{< block "Abstracción" >}}
Proceso mental que consiste en extraer las características esenciales
e ignorar detalles superfluos, con el propósito de **simplificar** determinadas
operaciones y realizar la **programación más fácil**.

Se trata de uno de los principios de la programación: **esconder los detalles**
de un sistema complejo para hacerlo más accesible.

Lógicamente, esto causa un peor rendimiento y dificulta las optimizaciones.
$$ \text{Abstracción} \uparrow\uparrow \implies \text{Rendimiento} \downarrow\downarrow $$
{{< /block >}}

{{< block "Middleware" >}}
Software intermedio que aumenta el nivel de abstracción, normalmente en forma de
librerías o _frameworks_. En algunos casos puede actuar de intermediario entre
varios procesos independientes.
{{< /block >}}

Se debería escoger el nivel más alto de abstracción que permita hacer la
solución. Se **prima la velocidad de desarrollo**, no la eficiencia del programa
final.

Esto puede dar lugar los problemas que se discuten en [Computer, Enhance!],
[Thirty million line problem], [Preventing the Collapse of Civilization],
[Better Software Conference] y muchos otros seguidores de esta nueva tendencia
de volver a software más sencillo. Sin embargo, la abstracción es la dirección
que lleva la industria.

# Paradigmas

{{< keyvalue key-header=true >}}
-% Paso de mensajes :%
- Nivel más bajo
- **Operaciones básicas**: Envía / Recibe, Conecta / Desconecta (si es orientado a conexión)
- **Abstracción**: Entrada/Salida como un archivo (API de sockets)
- PROBLEMA: No gestiona sincronización

-% Arquitectura Cliente - Servidor :%
- Abstracción eficiente para proveer servicios de red
- **Roles asimétricos**
    - El servidor escucha conexiones de forma pasiva.
    - El cliente inicia la conexión.
    - Luego, dependiendo del protocolo, pueden suceder muchas cosas
- **Sincronización simplificada**: realizar una petición y esperar repuesta
  (siguiendo un protocolo).
- PROBLEMA: modelo centralizado, el servidor es el cuello de botella.

-% Igual a Igual <br> Peer to Peer :%
- Se intercambian recursos/servicios de forma directa
- Los usuarios funcionan como clientes y servidores
- Cada usuario tiene roles iguales y responsabilidades equivalentes
- Algunos funcionan como routers para llegar a un tercero
- **Más eficiente**: escala mejor que cliente-servidor
- **Menos centralizado**: mayor privacidad

-% Sistema de mensajes :%
- Sofisticación del paso de mensajes
- Un servidor actúa de intermediario
    - Enruta los mensajes
    - Los procesos envía de forma asíncrona y desacoplada
- El receptor almacena los mensajes en colas
- PROBLEMA: las colas tienen capacidad máxima, cuando están llenas se pueden perder mensajes

<table class="keyvalue">
<th colspan="2">Tipos</th>
<tr>
<td class="header">Punto a punto (asíncrono)</td>
<td>

- Sistema de mensajes intermediario
- Procesos desacoplados
- Los receptores tienen colas de mensajes
{{< arrow >}} Equivalente a paso de mensajes + hilos

</td>
</tr>

<tr>
<td class="header">Publica / Subscribe</td>
<td>

Más eficiente que hacer pulling constantemente
- El cliente se subscribe a un evento
- Cuando se da dicho evento, el servidor notifica a todos los subscriptores
- Abstracción útil en comunicaciones multicast

</td>
</tr>
</table>

-% Llamar a procedimientos remotos <br> Remote Procedure Call (RPC) :%
- Llamadas a funciones o procedimientos en máquinas remotas **como si fuesen locales**

- Hacerlo manualmente es propenso a errores {{< arrow >}} Se delega al compilador <br>
    **Se generan automáticamente unos _proxies_**

    - Proxy cliente: serializa parámetros y envía el mensaje.
    - Proxy servidor: deserializa parámetros, llama al método real y devuelve el resultado.

    Todo esto es transparente al programador

- APIs principales
    - _Open Network Computing RPC_ (_Sun Microsystems_)
    - _Open Group Distributed Computing Environment_
    {{< arrow >}} ambas usan la herramienta `rpcgen` para generar los proxies

-% Objetos distribuidos :%
- **Versión Orientada a Objetos**: Objetos (métodos + atributos) distribuidos en máquinas diferentes
- Los objetos remoto proporcionan servicios a través de sus métodos

<table class="keyvalue">
<th colspan="2">Tipos</th>
<tr>
<td class="header">Remote Method Invocation (RMI)</td>
<td>

- Equivalente Orientado a Objetos de RPC
- Invoca los métodos de un objeto remoto situado en otra máquina
{{< arrow >}} Ejemplo: Java RMI

</td>
</tr>

<tr>
<td class="header">Network Services<br>Servicios de red</td>
<td>

- Los objetos de servicios se registran en un directorio
- Hay un directorio por cada máquina
- Se accede al directorio para:
    - Ver los servicios disponibles
    - Saber dónde están y obtener una referencia
- Cada entrada del directorio tiene una validez máxima
{{< arrow >}} Extensión de RMI. Ejemplo: Jini

</td>
</tr>

<tr>
<td class="header">Object Request Broker (ORB)</td>
<td>

- El ORB reenvía la petición al objeto deseado
- Similar a RMI y Network Services, pero:
    - El ORB es un middleware para acceder a objetos remotos
    - Registro único
    - Sus entradas no caducan
    - Interoperabilidad con objetos heterogéneos
{{< arrow >}} Base de la arquitectura CORBA

</td>
</tr>

<tr>
<td class="header">Object Spaces<br>Espacios de objetos</td>
<td>

- Paradigma OO más abstracto
- Los objetos están en una memoria compartida en la red
- Un proveedor coloca sus objetos a modo de entradas
- El cliente accede a las entradas directamente
- Esconde la localización real de los objetos
{{< arrow >}} Ejemplo: JavaSpaces

</td>
</tr>
</table>

-% Basado en componentes :%
- Principales objetos diseñados para interactuar entre sí a través de interfaces estándar.
- Los servidores de aplicaciones son middlewares para acceder a los objetos
  y componentes correspondientes.

-% Agentes móviles :%
- Un agente es un programa transportable
- Tiene la capacidad de saltar entre máquinas: uso de máquinas virtuales (JVM)
- Lo hace siguiendo un itinerario
- En cada parada, el agente accede a los recursos necesarios y realiza tareas
- Complejos lenguajes, ontologías y protocolos para comunicarse

-% Aplicaciones colaborativas :%
- Los procesos participan en una sesión colaborativa
- Cada uno puede contribuir una parte o la totalidad
- Implementaciones
    - Multicasting
    - Pizarras virtuales que permiten leer/escribir en una pantalla compartida
{{< /keyvalue >}}

[procesos]: {{< ref "so/procesos" >}}
[IPC]: {{< ref "so/comunicacion-procesos" >}}
[Computer, Enhance!]: https://www.computerenhance.com/
[Preventing the Collapse of Civilization]: https://youtu.be/ZSRHeXYDLko
[Better Software Conference]: https://bettersoftwareconference.com/
[Thirty million line problem]: https://youtu.be/kZRE7HIO3vk
