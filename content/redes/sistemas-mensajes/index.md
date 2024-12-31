---
title: "Sistemas de Mensajes: RabbitMQ"
description: >
    Con el propósito de transferir información entre sistemas heterogéneos, se
    crearon los sistemas de mensajes, que reciben los mensajes y los almacenan
    en colas hasta que los receptores están disponibles.
date: 2024-12-30T23:01:55+01:00
weight: 13
mermaid: true
---

# Contexto histórico

1960
: - Incorporación de _mainframes_ para operaciones críticas
  - Las operaciones de entrada eran reducidas
  - Interconectividad inexistente
  - No hay procesamiento en paralelo

1970
: - Se permite el acceso a los _mainframes_ desde varias terminales
  - Se permite el acceso concurrente
  - Se empiezan a interconectar los diferentes _mainframes_ a través de la red

1980
: - Aparecen las primeras interfaces gráficas, los _Personal Computers_ (PC)
  - La emulación de terminales es cada vez más frecuente

La conexión entre fuente y destino no era sencilla: cada hardware, protocolo
y formato requería un adaptador diferente. Esto dificultaba el mantenimiento
y el sistema no era escalable.

## Mensajería empresarial

Con esto, se pretendía **trasferir información entre sistemas heterogéneos**
mediante el envío de mensajes, lo que incluye a diversas tecnologías:

- [Llamadas a Procedimientos Remotos]({{< ref "/redes/objetos-distribuidos/#remote-procedure-call-rpc" >}})
  (RPC) a modo de _middleware_ para otras tecnologías como COM y CORBA
- Notificación de eventos
- Comunicación entre procesos
- Colas de mensajes
- Mensajería asíncrona y fiable

Por tanto, surgen los **MOM** (_Message Oriented-Middleware_) parar cubrir esta
necesidad de comunicación y transferencia de datos entre sistemas heterogéneos.

# Sistemas de mensajes

{{< block "Sistema de mensajes" "var(--magno-red)" >}}
Un sistema de mensajes es un método de comunicación entre componentes software
a través de un **MOM**, un _middleware_ orientado a mensajes.
{{< /block >}}

Ventajas:

- **Débilmente acoplado**
- El emisor y el receptor no tienen porqué estar disponibles al mismo tiempo
  {{< arrow >}} **Comunicación asíncrona**
- El emisor y el receptor no necesitan saber nada uno del otro, **solo el formato
  del mensaje y el destino** {{< arrow >}} Varias aplicaciones pueden comunicarse
  incluso estando escritas en lenguajes de programación diferentes.

El primero que llega crea una cola y el mensaje se colocará en ella. Cuando el
receptor esté disponible para leer el mensaje, consulta la cola.

{{<
    figure
    src="arquitectura-mom.png"
    link="arquitectura-mom.png"
    caption="Arquitectura de un sistema MOM"
    alt="Arquitectura de un sistema MOM"
>}}

# RabbitMQ

RabbitMQ es un _middleware_ de mensajería que permite la transmisión de mensajes
mediante varios protocolos, entre ellos **AMPQP**, **STOMP** o **HTTP**.

{{< block "Sistema de mensajes" "var(--magno-red)" >}}
AMQP (_Advanced Message Queueing Protocol_) es un protocolo **fiable
y asíncrono** de envío de mensajes. Estos se almacenan en **colas** seguras
hasta que el receptor se conecte o se cumpla cierto criterio.
{{< /block >}}

Los elementos más comunes de AMQP son los siguientes:

- **Mensaje** a enviar. Tiene dos partes:
    - **Clave**: valor que indica a qué cola se debe enviar
    - **Contenido**: datos del mensaje
- **Productor**: encargado de crear el mensaje y enviarlo
- **Consumidor**: receptor del mensaje
- **Cola**: estructura personal de cada consumidor en el que se almacenan los
  mensajes por orden de llegada y de forma segura. Se comporta como un buzón que
  vive dentro de RabbitMQ. Aunque los mensajes viajan por la red y a través del
  sistema de mensajes, solo se pueden almacenar en colas.
- **Intercambio** (_Exchange_): mecanismo que redirige los mensajes enviados por
  un productor a la cola correspondiente de un productor. Nótese que este
  componente no es estrictamente parte del paradigma del sistema de mensajes, pero
  proporciona bastante flexibilidad.

{{<
    figure
    src="rabbitmq-componentes.png"
    link="rabbitmq-componentes.png"
    caption="Ejemplo básico del envío de un mensaje con RabbitMQ"
    alt="Ejemplo básico del envío de un mensaje con RabbitMQ"
>}}

1. El productor genera un mensaje.
2. Se le envía al exchange.
3. En función de su tipo y las reglas que tenga definidas, reenvía el mensaje.
4. El mensaje se coloca en una cola del consumidor correspondiente.
5. Cuando el consumidor esté disponible, accederá a la cola y comprobará que
   tiene un mensaje nuevo.

## Tipos de Exchanges

- **Fanout**: el mensaje se envía a todas las colas conectadas (_broadcast_)
- **Directo**: el mensaje se envía a 1 cola si la clave del mensaje y la de la
  conexión sean exactamente iguales.
- **Topic**: igual que el anterior pero admite que sean parcialmente iguales.
- **Header**: compara el valor de la cabecera del mensaje con la clave de conexión.
- **Default**: compara el valor de la clave con el nombre de la cola (_exchange_ por defecto).

## Ejemplo

La instalación de RabbitMQ es algo compleja, en la [guía oficial de instalación]
detallan todos los pasos. Básicamente consiste en instalar el servidor de
RabbitMQ junto con sus dependencias, y para ello se tiene que añadir un nuevo
repositorio al sistema. Cuando esté instalado, solo falta iniciar el servicio
`rabbitmq-server`.

\[Probablemente lo más sencillo sea ejecutarlo desde Docker.\]

Luego se puede interactuar con el servidor con diferentes comandos:

```bash
sudo rabbitmqctl list_queues
```

-------

Para crear una aplicación con RabbitMQ, primero, si estás usando Gradle, añade
la librería de cliente al proyecto:

```groovy
dependencies {
    compile 'com.rabbitmq:amqp-client:5.24.0'
}
```

A continuación, un productor muy sencillo sería:

```java
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.nio.charset.StandardCharsets;

public class Productor {
    private final static String QUEUE_NAME = "hola";

    public static void main(String[] argv) throws Exception {
        // Crear la conexión al servidor de RabbitMQ que está en la máquina local
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");

        try (
            // Crear la conexión y el canal
            Connection connection = factory.newConnection();
            Channel channel = connection.createChannel()
        ) {
            // Enviar el mensaje a la cola
            String message = "Hola Mundo!";
            channel.basicPublish(
                "",         // Usar el exchange por defecto
                QUEUE_NAME, // Cola a la que enviar
                null,       // No hay más parámetros
                message.getBytes(StandardCharsets.UTF_8) // El mensaje que enviar
            );
            // Nótese que en la cola se almacenan arrays de bytes, por lo que
            // podemos almacenar cualquier cosa.
        }
    }
}
```

Y el consumidor equivalente:

```java
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;

public class Consumidor {
    private final static String QUEUE_NAME = "hola";

    public static void main(String[] argv) throws Exception {
        // Igual que antes, conectarse al servidor
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");

        // Crear también la conexión y en canal
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        // Crear la cola del consumidor.
        // Esta es una operación idempotente: si ya existe, no hace nada.
        channel.queueDeclare(
            QUEUE_NAME
            true,  // La cola será durable, incluso si el servidor de RabbitMQ cierra
            false, // La cola no es exclusiva
            true,  // Se borrará automáticamente cuando no se use
            null   // No hay más argumentos
        );

        // Función que se ejecuta cuando se recibe un mensaje.
        // Se ejecutará en otro hilo.
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println("Recibido '" + message + "'");
        };

        // Y ahora, consumir el mensaje de la cola
        channel.basicConsume(
            QUEUE_NAME, // Cola de la que consumir
            true,       // Enviar ACKs automáticamente
            callback,   // Registrar el procedimiento para cada mensaje
            consumerTag -> {}
        );
    }
}
```

[guía oficial de instalación]: https://www.rabbitmq.com/docs/download
