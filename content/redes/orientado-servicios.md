---
title: Arquitecturas Orientadas a Servicios
description: >
    Las arquitecturas orientadas a servicios (SOA) intentan mejorar la
    interoperabilidad de los servicios para que sean independientes del lenguaje
    de programación y se puedan usar para modelos de datos diferentes.
date: 2025-01-20T14:27:39+01:00
weight: 12
---

# Descripción del problema

Un método invoca la ejecución de otros métodos para **obtener algo** que no
puede alcanzar por sí mismo.

-   Una clase **ofrece un servicio**.
-   Otra clase usa los métodos que ofrece una clase para completar su
    funcionalidad: **consume el servicio**.

Sin embargo, esto plantea varios problemas:

-   ¿Qué ocurre si las dos clases no están en la misma máquina?
-   ¿**Dónde** están realmente la clases? ¿Cómo se pueden localizar o descubrir
    las clases con la funcionalidad necesaria?
-   ¿De qué método se **envía información** entre clases? ¿Cómo se entienden
    entre sí y qué protocolo usan?
-   ¿Qué sucede si no se encuentra ninguna clase? ¿Se puede combinar la
    funcionalidad de varias clases?

Algunas soluciones basadas en [llamadas a procedimientos remotos]:

- _Distributed Component Object Model_ (DCOM)
- _Common Object Request Broker Architecture_ (CORBA)
- _Remote Method Invocation_ (RMI)

También hay algunas soluciones basadas en la Web como una capa de software
adicional:

- CGIs
- Servlets
- Servicios Web

# RPC

RPC esconde los detalles de comunicación e interacción a la hora de invocar la
ejecución de un método que se encuentra en una máquina diferente.

<!-- TODO: diagramas de ejemplo -->

En [Java RMI], la descripción del servicio depende del lenguaje: todo es Java.
Sin embargo, se pueden describir los métodos con un **lenguaje IDL** que **hace
al mecanismo RPC independiente del lenguaje de programación**.

A través de un compilador se genera automáticamente el código del cliente y el
servidor.

-   Implementa las operaciones de codificación y decodificación de parámetros
    (_marshalling_ / _unmarshalling_).
-   El método del cliente llama al del servidor, y el servidor registra sus
    métodos para que se le asigne una dirección IP y puerto.
-   Los clientes generalmente conocen de antemano la definición del método, pero
    no siembre es así: **CORBA permite la invocación dinámica de servicios**.

|                     | DOCM                | CORBA               | Java RMI                      |
|---------------------|---------------------|---------------------|-------------------------------|
| Protocolo RPC       | RPC                 | IIOP                | IIOP o JRMP                   |
| Formato del mensaje | NDR                 | CDR                 | Serialización de objetos Java |
| Descripción         | IDL                 | OMG IDL             | Java                          |
| Descubrimiento      | Registro de Windows | Registro de nombres | Registro RMI o JNDI           |
{ .header }

- Estas tecnologías no interoperan entre sí
- Es necesaria una **arquitectura independiente**
    - del lenguaje
    - de la plataforma
    - de las características de los objetos
    - del mecanismo de llamada
{ .arrow-list }

# Servlets

Es uno de los servicios web más sencillos que hay.

Consiste en añadir una capa de web a las soluciones basadas en RPC:

-   El navegador del usuario realiza una petición a través de la web a un
    servidor web.
-   Dicho servidor web realizará una llamada al servlet correspondiente.
-   El servlet procesará la petición y generará un HTML de respuesta.
-   Se le envía dicho HTML al servidor web y se lo reenvía de vuelta al cliente.

Como consecuencia, el resultado se construye en una página de respuesta que
contiene la información solicitada.

El principal problema de esta estrategia es que **no hay tipos de datos**, sino
que **todo se encapsula en cadenas de texto** en las que se codifican los
parámetros de entrada y la respuesta se elabora en HTML.

Otros problemas:

-   Los métodos que se pueden invocar están predefinidos (POST y GET)
    -   La ejecución de otros métodos requiere de un parámetro de entrada en el
        que vaya codificado un lenguaje de invocación de métodos.
-   No es posible indicar parámetros de entrada/salida que no sean cadenas de
    texto.
-   **No es lo suficientemente flexible** para la integración de aplicaciones
    o para la reutilización de la funcionalidad ofrecida por el servlet.

# Arquitectura SOA

Los servlets tienen bastantes limitaciones y son un método bastante ineficiente
de realizar lo mismo que ya hacíamos con Java RMI. Por este motivo, vamos
a tender a soluciones basadas en arquitecturas SOA.

Las **arquitecturas orientadas a servicios** (SOA) **no están ligadas a una
tecnología concreta**:

- Una arquitectura SOA no tiene porqué estar implementada con servicios web
- No todo ser un servicio web

{{< keyvalue title="Elementos de una SOA" key-header=true >}}
-% Servicios :%
-   Componentes software **bajamente acoplados**
-   Esto permite que se reutilicen desde otros componentes de la misma
    arquitectura. Son **independientes**.
-   **Se combinan entre sí** para proporcionar las funcionalidades requeridas
    por los clientes (**orquestración**).

-% Proveedor :%
-   Componente que ofrece un conjunto de servicios con una funcionalidad dada.
-   Los servicios son directamente accesibles desde internet: **están expuestos
    a través de URLs**.
-   Se utiliza un **lenguaje de descripción** estándar de servicios.

-% Consumidor :%
-   Componente que **invoca o consume** la funcionalidad de los servicios
    ofrecidos por el proveedor.
-   Utiliza un protocolo de invocación.

-% Registro :%
Componente que contiene los servicios ofrecidos por el proveedor.
{{< /keyvalue >}}

{{< block "Servicios Web" >}}
Los Servicios Web son interfaces que describen las características de una
colección de operaciones o métodos.

-   Invocación: son **accesibles a través de la red** usando protocolos estándar
    (basados en XML). Es necesario encapsular argumentos, los resultados, etc.
-   Descripción: los métodos, atributos, propiedades, etc están representadas
    usando un lenguaje estándar basado en XML.

Los formatos XML definen la estructura de los protocolos de invocación y de la
descripción de los servicios.
{{< /block >}}

La institución encargada de estandarizar los lenguajes y protocolos de la Web es
el [Consorcio W3C]. En la tecnología de servicios Web se hace uso de los
siguientes estándares que están representados en XML.

- Protocolo de comunicaciones: [HTTP]
- Formato del mensaje: [SOAP]
- Descripción de los servicios: [WSDL]
- Protocolo de registro: [UDDI]

<!-- TODO: diagrama de la arquitectura -->

La arquitectura SOA recuerda a las soluciones basadas en RPC, pero hay grandes
diferencias en el uso de **protocolos estándar** y en el énfasis en la
**composición de servicios**.

1.  El proveedor **despliega** el conjunto de operaciones que desea hacer
    accesibles a través de internet.
    -   Son accesibles como **direcciones URL** que apuntan a archivos descritos
        en lenguaje WSDL.
    -   Estas operaciones serán accesibles solo si conoce las URLs.

{{< block "WSDL" >}}
\[Equivalente a la interfaz remota de Java RMI.\] \
**Define interfaces** en los que se indica:

- el nombre,
- las entradas y
- las salidas de las operaciones.

También indica de **qué modo se invocarán** las operaciones.
{{< /block >}}

2.  El proveedor puede publicar a través del protocolo UDDI las características
    de los servicios en un registro. Los clientes pueden consultar dicho
    registro.

{{< block "UDDI" >}}
El registro UDDI es a los servicios Web lo que son los DNS a las direcciones
Web.

-   En el registro UDDI se indican las características no funcionales de los
    servicios, tales como la descripción de la empresa, categoría, etc.
-   También se indica la **URL correspondiente al archivo WSDL** que contiene
    las características funcionales del servicio.
-   Para acceder a dicho registro, se usa un conjunto de APIs para dar de
    alta/baja los servicios.

No es muy habitual el uso de UDDI (y por esto no forma parte del Consorcio),
dado que el cliente normalmente ya conoce la URL de los diferentes servicios. Es
uno de los componentes con menor implantación en el mercado.
{{< /block >}}

3.  El consumidor buscar los servicios en el registro UDDI que tienen las
    características deseadas.
    -   La búsqueda se realiza usando **palabras clave** que referencian a sus
        características.
    -   Se pueden indicar **entradas y salidas** que deben tener.
    -   Como resultado, se devuelve la **URL del archivo WSDL**.

4.  El consumidor obtiene el WSDL y **genera automáticamente el código
    necesario** para realizar la invocación de las operaciones descritas.
    -   Se generan clases que representan los **tipos de datos** de los
        parámetros.
    -   Se generan las clases que **codifican** y **decodifican** los parámetros
        de las operaciones.

5.  El consumidor **usa el protocolo SOAP para invocar** la ejecución de una de
    las operaciones definidas.

## Conclusión

El uso de XML para describir e invocar operaciones, permite la integración de
aplicaciones que:

- Están implementadas en lenguajes de programación diferentes.
- Usan modelos de datos diferentes.

El uso de servicios como componentes bajamente acoplados permite a los
consumidores:

- **Reutilizar** las operaciones en diferentes aplicaciones.
- **Combinar** las operaciones entre sí para obtener nuevas funcionalidades.

[Consorcio W3C]: https://www.w3.org/
[SOAP]: https://www.w3.org/TR/soap/
[HTTP]: https://www.w3.org/Protocols
[WSDL]: https://www.w3.org/TR/wsdl/
[UDDI]: https://uddi.xml.org/
[llamadas a procedimientos remotos]: {{< ref "redes/objetos-distribuidos/#remote-procedure-call-rpc" >}}
[Java RMI]: {{< ref "redes/objetos-distribuidos/#java-remote-method-invocation-java-rmi" >}}
