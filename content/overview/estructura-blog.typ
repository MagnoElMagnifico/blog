#import "@preview/cetz:0.4.1"
#set page(margin: 1em, width: auto, height: auto)

#let no-empezado(content) = text(fill: red, content)
#let a-medias(content)    = text(fill: blue, content)

#let texto = ([*MagnoBlog*],
  ([Teoría],
    ([Matemáticas], [
      - #a-medias[Discretas]
        // - Algoritmos, big-O
        // - Teoría de números y aritmética modular
        // - Lógica: cálculo de predicados
        // - Teoría de conjuntos, aplicaciones
        // - Recursividad
        // - Combinatoria
      - #no-empezado[Álgebra lineal]
        // - Números, estructuras algebraicas, etc
        // - Matrices y determinantes (y sus operaciones)
        // - Matriz inversa, escalonada, elementales,
        // - Sistemas de ecuaciones lineales
        // - Espacios vectoriales, sistemas generadores, bases
        // - Aplicaciones lineales, matrices asociadas, núcleo, imagen, cambio de base
        // - Diagonalización, autovalores
        // - Cálculo: eliminación Gaussiana, factorización LU, algoritmo de Thomas y Cholesky
      - #no-empezado[Estadística]
        // - Tipos de variables y representaciones
        // - Estadísticos
        // - Probabilidad
        // - Variable aleatoria discreta y continua
        // - Inferencia estadística y contrastes de hipótesis
      - #no-empezado[Cálculo]
        // - Números máquina y errores (intersección con Arquitectura)
        // - Desigualdades, valor absoluto
        // - Rectas, planos, cónicas, trigonometría
        // - Interpolación y polinomio de Taylor
        // - Límites, continuidad, derivadas, optimización, gradiente...
        // - Método del descenso rápido
        // - Integrales: definida, indefinida, regla de Leibniz, racionales, impropias, integración numérica
        // - Ecuaciones diferenciales
    ]),
    a-medias[Grafos],
      // - Definiciones, tipos de grafos
      // - Representación
      // - Recorridos
      // - Componentes conexas, matriz de caminos, puntos de articulación
      // - Ordenación topológica, Warshall, Dijkstra, Floid-warshall, flujo, Prim y Kruskal
    a-medias[AED],
      // - TADs: pila, cola, listas (intersección con AED)
      // - Árboles: recorridos, binarios, montículos, equilibrados, B y B+
      // - Hash: funciones hash, colisiones, redispersión
      // - Complejidad computacional (intersección Discretas)
      // - Estrategias algorítmicas: voraz, recursivo, dinámica, backtracking, poda (intersección discretas e IA)
      // - Búsqueda y ordenación (intersección discretas)
  ),

  ([Básicos], [
    - #no-empezado[Bases de Datos]
      // - Fases de diseño, peligros y errores frecuentes
      // - MER: conjuntos de entidades, relaciones, atributos, restricciones, extensión
      // - ER: claves primarias y foráneas
      // - Conversión y normalización
      // - Lenguajes formales de consulta: algebra relacional y calculo relacional de tuplas
      // - SQL: lenguaje de definición de datos y manipulación de datos.
      // - Tablas y vistas, consultas
      // - Tipos de datos, índices, usuarios y roles, permisos
      // - Transacciones: propiedades ACID, estructuras de almacenamiento, estados, fenómeno fantasma 
      // - Control de concurrencia: bloqueos, interbloqueos, aislamiento, insertar y borrar
      // - Recuperación: fallos, almacenamiento estable, acceso a datos, registro histórico, algoritmo de recuperación
      // - Seguridad
      // - Implementación, JDBC
    - Sistemas Operativos
    - #a-medias[Redes]
      // ya están creados los archivos
    - #no-empezado[Arquitectura]
      // - Analógico vs digital
      // - Ley de Moore, ordenador Von-Neuman, jerarquía de diseño...
      // - Sistemas de numeración binarios y operaciones aritméticas
      // - Puertas lógicas, Karnaout, equivalencia entre puertas
      // - Combinacional modular: decodificador, codificador, multiplexor, demultiplexor, sumadores, restadores, comparadores
      // - Secuenciales: máquina de Mealy/Moore, simplificación de estados, biestables (RS, JK, D, T)
      // - Sistemas síncronos, contadores, registros
      // - Códigos detectores de error
      // ----
      // - Medidas de rendimiento
      // - Representación de números flotantes (intersección con Cálculo)
      // - Tipos de instrucciones y direccionamientos, registros, 
      // - Implementación de una ALU
      // - Sistema de control
      // - Gestión de memoria, tipos de memorias, caches asociativas, conjuntos...
      // ----
      // - Tipos de paralelismo, retardo en circuitos, ancho de banda, multinúcleo, tecnología de fabricación
      // - Consumo de energía
      // - Segmentación: pipeline, riesgos de ejecución
      // - Paralelismo a nivel de instrucción, especulación, predictores
      // - Coherencia cache
    - #a-medias[Compiladores]
      // - Autómatas finitos, lenguajes regulares
      // - Autómatas de pila, gramáticas independientes de contexto
      // - Máquinas de Turing...
      // ---
      // - Análisis léxico, sistema de entrada, tabla de símbolos
      // - Análisis sintáctico, parsing
      // - Análisis semántico
      // - Optimización y generación de código
    - #no-empezado[Gráficos]
      // - Software Rendering
      // - Ray Tracing
      // - Hardware Accelerated: OpenGL
      // ----
      // - Introducción
      // - Pipeline
      // - Modelado 3D
      // - Texturas
      // - Iluminación
    - #no-empezado[Ciberseguridad]
      // - Fundamentos de seguridad
      // - Criptografía
      // - Seguridad en programas: programación segura, vulnerabilidades
      // - Seguridad web
      // - Seguridad en redes: cortafuegos, VPN, sistemas de detección y prevención de intrusiones
  ]),

  ([Lenguajes], [
    - #a-medias[Aprender con C/C++]
      // - Ordenador, estructura básica, programas (ensamblador, lang máquina, ...), el compilador
      // - Variables, sentencias, operadores, precedencia de operadores
      // - Condicionales y bucles
      // - Entrada salida básica
      // - Arrays, matrices, strings
      // - Structs, enums, unions, tagged unions
      // - Funciones (parámetros de entrada y salida, por valor y referencia) y módulos (compilation units)
      // - Archivos
      // - Bibliotecas
      // - Punteros, arrays dinámicos
    - #a-medias[POO con Java]
    - #no-empezado[Funcional con OCaml]
    - $...$
  ]),

  ([Herramientas], [
    - #no-empezado[Typst]
    - #no-empezado[Latex]
    - #a-medias[Vim]
    - #a-medias[Git]
    - $...$
  ]),

  [Linux],
)

#cetz.canvas({
  import cetz.draw: *
  import cetz.tree: tree

  tree(
    name: "tree",
    direction: "down",
    grow: 2,
    spread: 1,
    draw-edge: (from, to, ..) => {
      line(from, to, mark: (end: ">"))

      // let midpoint = (from, 50%, to)
      // let vertices = (
      //   from,
      //   (from, "|-", midpoint),
      //   (midpoint, "-|", to),
      //   to,
      // )
      // line(..vertices, mark: (end: ">"))
    },
    draw-node: (node, ..) => {
      content((0, 0), box(
        stroke: 1pt,
        inset: 1em,
        radius: 4pt,
        node.content
      ))
    },
    texto
  )

  content("tree.south", box(
    [
      - #no-empezado[Contenido no empezado]
      - #a-medias[Contenido a medias]
    ]
  ))
})

