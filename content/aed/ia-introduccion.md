---
title: Introducción a la Inteligencia Artificial
date: 2025-01-01T18:11:15+01:00
weight: 10
---

{{< block "Una posible definición" >}}
No existe una definición canónica, pero la mejor que tenemos es:

> La Inteligencia Artificial se refiere a los sistemas que muestran
> **comportamientos inteligentes** mediante el **análisis de su entorno**
> y toman acciones con cierto nivel de **autonomía** para alcanzar determinado
> **objetivo**.
> <br><br>
> --- "A definition of IA: Main capabilities and scientific ones" <br>
> High-Level Expert Group on Artificial Intelligence, Comisión Europea (Abril de 2019)

En definitiva:

- **Autonomía**
- Riqueza de comportamientos
- Capaz de **aprender** según su propia experiencia
- Alto grado de competencia en áreas especializadas {{< arrow >}} **Manejan conocimiento**
{{< /block >}}

Pueden ser sistemas basados puramente en software, actuando en el mundo virtual
(asistentes de voz, análisis de imagen) o integrado en dispositivos hardware
(robots, coches autónomos).

Por un lado es una disciplina científica porque busca avanzar en el
conocimiento; pero también utiliza técnicas de la ingeniería, la inteligencia
artificial se aplica principalmente para resolver problemas.

# Historia

A lo largo de la historia de la Inteligencia Artificial se formaron grandes
<<picos y valles>> (**Primaveras e Inviernos**), porque se generaron enormes
expectativas que al final no se cumplieron.

1943

: Se publica un artículo científico de un **modelo matemático de una
  neurona**. Se trata de un modelo muy simple, basado en la biología. Lo único que
  se quería mostrar era que era capaz de hacer computaciones.

1950

: En la revista _Mind_, Alan Turing publica _Computing Machinery and
  Intelligence_, planteando la pregunta: <<¿Pueden pensar las máquinas?>>.
  Justo el año antes, propuso el [Test de Turing]. Es importante decir que
  en 1980 se publicó un contraargumento, la [habitación China].

1956

: Conjetura presentada en la [Fundación Roquefeller]. Se planteaba que cualquier
  aspecto de la inteligencia o la memoria humana es susceptible de ser **simulada en
  un computador**. A partir de esta fecha, nace el campo formalmente.

1973

: Se publica el modelo de un **perceptrón**, una única capa de neuronas capaz de
  hacer clasificaciones simples en base a unos parámetros: es equivalente
  a calcular coeficientes de un hiperplano. Tiene el problema de que si los
  elementos no son linealmente separables, el sistema no funciona tan bien.

: Este problema se puede solucionar añadiendo más capas, pero en el momento no
  se disponía del algoritmo de entrenamiento.

1974 - 1980

: Hay un arranque de investigación bastante optimista, pero esto creó mucha
  **expectación** entre la población. Sin embargo, durante este período, se
  produce un primer **invierno**.

1980 - 1987

: Fase de recuperación

1988 - 1993

: Segundo inverno

1994 - 2010

: Relanzamiento

1997

: **Hito de la IA**: Un ordenador vence al campeón del mundo en ajedrez: [DeepBlue vs Kasparov].

2010 - Actualidad

: Ahora hay una **gran ambición** alrededor de la Inteligencia Artificial.
  Parece estar en una **gigantesca burbuja** debido a las
  grandes cantidades de capital privado que están invirtiendo las grandes empresas
  para no quedarse atrás.

: El motivo de este _boom_ en la actualidad se debe a un crecimiento exponencial
  gracias a **computadores más potentes** ([ley de Moore]), **muchos más datos**
  y más disponibles gracias a Internet y **mejores algoritmos**.

: En el pasado de usaban muchas técnicas diferentes, pero hoy en día la mayor
  investigación se centra en las **redes neuronales**.

: ChatGPT pasa el test de Turing.

2016

: **Hito de la IA**: Un ordenador vence al campeón del mundo en el juego Go: [AlphaGo vs Sedol].
  El Go, que es un juego mucho más complejo que el Ajedrez, supuso un gran reto
  para los desarrolladores.

# Tipos

En función de las capacidades del sistema, podemos diferenciar varios tipos:

- **IA actual**: _Narrow Intelligence_, muy orientada a tareas específicas y con
  capacidades comparables o superiores a las humanas. P.e. una IA puede ser muy
  buena jugando al ajedrez, pero no puede jugar al 3-en-raya.

- **IA multitarea**: puede hacer varias tareas como ChatGPT, traducir texto,
  escribir código...

- **IA general**: todavía no se ha inventado ni se sabe cómo conseguirla
  realmente. Imaginamos una IA con competencias en todos los dominios y tiene
  capacidades de generalización, razonamiento...

# Comparativa con el cerebro humano

| Elemento de comparación      | Cerebro                          | Ordenador                                    |
|------------------------------|----------------------------------|----------------------------------------------|
| Tamaño                       | ~1 500 cc                        | 720 m^2 y más de 100 toneladas               |
| Consumo                      | 20 W                             | 17.6 MW (24 MW con la refrigeración)         |
| Almacenamiento               | 3 500 TB                         | 12.4 PT                                      |
| Procesamiento                | 2 200 TFLOPS                     | 33.86 TFLOPS                                 |
| Aprendizaje                  | Enorme                           | Lento, alto consumo y gran cantidad de datos |
| Evolución                    | Poco en los últimos 100 000 años | Muy rápida en cálculo y almacenamiento       |
| Cálculo                      | Lento                            | Muy rápido                                   |
| Problemas (algoritmos)       | Lento                            | Muy rápido                                   |
| Percepción y acción          | Muy rápido                       | Muy lento                                    |
| Razonamiento y sentido común | Muy rápido*                      | Muy lento                                    |

Con esto queda bastante claro la gran capacidad que tiene nuestro cerebro, cobre
todo con un consumo mucho más pequeño que un ordenador.

{{< block "Paradoja de Moravec" >}}
La [paradoja de Moravec] dice que, al contrario de la intuición, el razonamiento
requiere de relativamente poca computación mientras que habilidades motoras
y sensoriales no conscientes requiere un esfuerzo computacional mucho mayor.

[paradoja de Moravec]: https://en.wikipedia.org/wiki/Moravec%27s_paradox
{{< /block >}}

# Diferentes aproximaciones

| IA             | Como personas      | Racionalmente                |
|----------------|:------------------:|:----------------------------:|
| Pensamiento    | Modelado cognitivo <br> (simular el pensamiento) | Leyes del pensamiento lógico <br> (matematizar) |
| Comportamiento | Test de Turing     | Agentes racionales           |

Inicialmente, las motivaciones principales para desarrollar el campo de la
inteligencia artificial es, a través de dispositivos electrónicos, **modelar el
pensamiento humano**. Se pretendía hacer que las máquinas piensen como nosotros
(**modelo cognitivo**).

Esta vía no dio grandes resultados, y luego se pasó a **máquinas con capacidad
de razonamiento lógico**, no necesariamente humano (matematizar el pensamiento).

Luego, el interés cambió a hacer que las máquinas se **comporten como personas**
([Test de Turing]), para avanzar en el campo de la robótica. Últimamente se
busca que **resuelvan un problema**, sin necesariamente imitar cómo lo hacen los
humanos.

Para ello se usan varias aproximaciones, entre las que se pueden encontrar:

- **Aproximación subsimbólica** (redes neuronales): la IA nace a través de la
    bioinspiración cuando se intentan replicar modelos neuronales para realizar
    computaciones. Estas neuronas se distribuyen en capas, cada una con sus
    valores de configuración producto de su entrenamiento.

    El problema es que estos sistemas son una **caja negra**: su funcionamiento
    no tiene un significado para el humano directamente. Es muy complicado
    entender porqué el sistema da estos resultados, es decir, hacerlo
    **explicable**. En determinadas áreas (como medicina) es una característica
    muy importante.

- **Aproximación simbólica**: en lugar de replicar la forma y estructura del
    cerebro, se intenta replicar su funcionamiento. Esta estrategia pretende
    representar el razonamiento mediante una serie de **hechos y reglas** que se
    analizan en un **procesador lógico**. Proporciona una mejor explicabilidad, pero
    es mucho más difícil de diseñar y construir.

[Fundación Roquefeller]: https://www.rockefellerfoundation.org/
[ley de Moore]: https://en.wikipedia.org/wiki/Moore's_law
[Test de Turing]: https://en.wikipedia.org/wiki/Turing_test
[habitación China]: https://en.wikipedia.org/wiki/Chinese_room
[DeepBlue vs Kasparov]: https://en.wikipedia.org/wiki/Deep_Blue_versus_Garry_Kasparov
[AlphaGo vs Sedol]: https://en.wikipedia.org/wiki/AlphaGo_versus_Lee_Sedol
