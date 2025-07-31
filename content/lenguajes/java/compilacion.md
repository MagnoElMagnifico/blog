---
title: Compilación en Java
description: >
    Instalación del entorno de desarrollo y el proceso de compilación de un
    programa Java.
date: 2024-01-10T14:22:19+02:00
weight: 1
---

# Estructura de archivos de Java

Java es muy específico con la estructura de archivos. Una carpeta es un paquete
y un archivo `.java` es un clase.

- No pueden haber dos clases `public` en el mismo archivo (error de compilación)
- Si un archivo `.java` está dentro de una carpeta, la primera línea del archivo
  debe ser `package <nombrecarpeta>` desde el subdirectorio raíz (separando cada
  nombre con `.`.
- No hace falta usar `import`s, también se puede escribir el nombre completo de
  la clase (incluyendo paquetes). Esto no es demasiado práctico. Nótese que
  `java.lang` se importa automáticamente.

# Instalación

Existen varias distribuciones que podemos descargar en función de lo que
queramos:

-   **Java Standard Edition** (SE): contiene la máquina virtual de Java (JVM) y
    los archivos correspondientes del _Java Runtime Environment_ (JRE),
    necesarios para poder ejecutar programas Java.
-   **Java Development Kit** (JDK): contiene las clases _core_, _Java Runtime
    Environment_ (`java`), el compilador (`javac`) y otras herramientas que se
    puedan necesitar para crear programas Java (`jar`, ...).
-   **Java Enterprise Edition** (JEE): contiene tecnología web, construida sobre
    Java SE: _servlets_, JSPs, JSF, ...

{{< todo >}}
El instalador viene en la versión de `JDK`. Dirección predeterminada del
compilador es la siguiente: (siendo `xxx` su versión):

```
C:\Program Files\Java\jdkxxx\bin
```
{{< /todo >}}

# Proceso de compilación y ejecución

Para compilar, se debe llamar al compilador `javac`. Recomiendo añadir la flag
`-Xlint:all` para que te de consejos sobre cómo mejorar tu código, mostrar
_warnings_ varios, etc.

```bash
javac -Xlint:all -d <build_dir> <src_dir>/**/*.java
```

Con la opción `-d` se especifica dónde almacenar los archivos `.class`
compilados. Estos equivalen a sendas clases (deben tener la misma estructura de
directorios), y el compilador es lo suficientemente inteligente como para saber
en qué orden compilar cada uno.

Para ejecutar hay que especificar dónde está la clase principal usando
la `classpath`:

```bash
java -cp <build_dir> <MainClass>
```

En caso de que la clase principal esté dentro de un paquete, se especifica
`paquete.MainClass`, no como si fueran directorios (`paquete/MainClass`).

{{< block "Condiciones para la clase principal" "var(--magno-green)" >}}
Para que funcione, como mínimo debe existir una clase pública que lleve un
método también público y estático llamado `main`, que a su vez tenga de
parámetro una matriz de `String`s.

```java
// Archivo Clase.java
public class Clase {
  public static void main(String[] args) {
    // Código
  }
}
```
{{< /block >}}

## Ejecutar un solo archivo

Para ejecutar directamente, nos situamos en la dirección de ese archivo en el CMD y usamos el
siguiente comando:

```bash
java NombreDelArchivo.java
```

Este comando no generará archivos, sino que lo ejecutará directamente.

El problema que surge con este sistema es que no se pueden crear otras clases
fuera de ese archivo (no se aplica la regla de solo una clase pública por
archivo), de lo contrario, hay que compilar con el proceso visto antes.

## Creación de un archivo `.jar`

{{< block "Ejecutables Java" "var(--magno-blue)" >}}
Un archivo `.jar` es archivo comprimido (usa el mismo método de compresión que
un `.zip` normal) con todo lo necesario para ejecutar: los `.class` compilados y
otros recursos que necesite, como por ejemplo imágenes.

La idea de este sistema es simplificar la distribución de los archivos
compilados. También funciona para librerías.
{{< /block >}}

Los archivos `.jar` deben llevar un archivo que incluya los metadatos necesarios
para que la JVM sepa cómo ejecutar el programa (si no es una librería). Su
primera línea deberá decir qué clase contiene el método `main` de la siguiente
manera:

```mf
Main-Class: NombreDeLaMainClass
```

Usamos el comando `jar` con los atributos:
- `c`: para crear un archivo
- `f`: para darle un nombre al jar
- `m`: para incluir el `MANIFEST`

Escribimos después en un orden que se corresponda con las letras dadas el nombre
del archivo `.jar` (especificando la extensión), el nombre del _MANIFEST_ y el
nombre de los archivos `.class`:

```bash
jar -cfm NombreDelJAR.jar MANIFEST.mf *.class
```

Finalmente, para ejecutar este archivo `.jar` se usa el comando:

```bash
java -jar Nombre.jar
```

Se puede hacer un archivo `.bat` que lo haga automáticamente y así que el
usuario solo tenga que hacerle doble click:

```bat
@echo off
java -jar Nombre.jar
pause
exit
```

Como pasar a `.exe` (ejecutable de Windows que no necesita tener Java instalado)
(se necesita un programa externo)

En caso de que los `.jar` sean librerías, para que el compilador las encuentre
se deberán agregar a la _classpath_, y lo mismo sucederá para ejecutar.

```sh
javac -cp lib1.jar;lib2.jar Program.java
java -cp lib1.jar;lib2.jar Program
```

# Otras herramientas del JDK

Teniendo un `.class` se puede ver su contenido usando `javap`:

- `javap -p <.class>`: muestra todas las clases y miembros
- `javap -v <.class>`: mucha información, tamaño del stack, argumentos de
  métodos, _Constant pool_, etc.
- `javap -c <.class>`: desensambla la clase

{{< todo >}}
# _Build Systems_: Gradle

```
mkdir gradle-tutorial
cd gradle-tutorial
gradle init
```

Escoge 1 basic
para el lenguaje del build script vamos a usar Groovy
project name

- project: aplicacion que quieres compilar (incluyendo la configuración para
  hacerlo)
- task: tareas individuales dentro del build script que se ejecutan desde el CLI.
  Una puede ser para compilar, otra para testear, para crear un .jar, etc.
- plugin: añade automaticamente algunas tareas para que no tengas q definirlas
  tu siempre

```sh
# muestra las tareas posibles
./gradlew tasks
./gradlew nombre-tarea
```

Estructura básica:

- settings.gradle: configuracion del proyecto como su nombre
- build.gradle: script de compilación del proyecto
- gradlew (mac / linux) y gradlew.bat (windows): (wrapper) permiten compilar el proyecto sin
  instalar gradle (lo instalará localmente cuando se llame, asegurandose de la
  version correcta). El paquete de gradle de antes lo usaremos para crear el
  proyecto inicial.
- .gitignore: .gradle (cache de gradle) build (salida compilada)

- src/main/java: directorio por defecto del codigo
- src/main/resources: directorio por defecto de los tests

  ```groovy
  // build.gradle

  sourceSets {
    main.java.srcDirs = ['src']
    main.resources.srcDirs = ['tests']
  }
  ```

Groovy (Gradle Groovy DSL (domain specific language: usa algunas apis de gradle y un subconjunto de groovy))

- dinámico

  ```groovy
  def variable = 'asdf'
  println variable
  ```

- `; ( )` son opcionales (`()` solo si hay un parametro)

  ```groovy
  def multiply (a, b) {
      println a * b
  }

  multiply 2, 3
  ```

- closure: código que se pasa por ahi y que se ejecutara luego

  ```groovy
  def closure = {
      println 'Estoy dentro'
  }

  closure()
  ```

- funciona sobre la JVM

configuración básica:

```groovy
// build.gradle

// llamada al metodo plugins con un closure como parametro
// dentro del cual se listan los plugins a usar con el metodo id
plugins {
  // esto añade las tasks:
  // - assemble: assemble the output of this project (?)
  // - build: assemble and test
  // - clean
  // - jar: assemble jar with main clases
  // - classes: assemble main classes
  id 'java'
}
```

```sh
./gradlew build
# genera build/classes/.../*.class compilados
# genera build/lib/.../*.jar compilado
java -jar build/libs/gradle-tutorial.jar
# > error: no main manifest attribute
```
hay que añadir `Main-Class: ****` al manifiesto, vamos a crear un task para eso

```groovy
// build.gradle

// se configura la task jar declarada anteriormente (como plugin)
jar {
  manifest {
    attributes 'Main-Class': 'com.tomgregory.GradleTutorial'
  }
}
```

# tests

```java
// src/main/resources/com/tomgregory/GradleTutorialTest.java (?)
// src/test/java/com/tomgregory/GradleTutorialTest.java
package com.tomgrerory;
import org.junit.Test; // dependencia

public class GradleTutorialTest {
    @Test
    public void verifyNoExceptionThrown() {
        GradleTutorial.main(new String[]{});
    }
}
```
```groovy
// build.gradle
repositories {
  // indicamos de donde descargar las dependencias
  mavenCentral()
}

dependencies {
  testImplementation group: 'junit', name: 'junit', version: '...'
}
```

# gradle 2

```groovy
// build.gradle
plugins {
    id 'application' // incluye lo mismo que 'java' pero añade la task run
}

application {
    // Nombre de la clase que contiene el main para saber cual ejecutar
    mainClassName = 'paquete.Main'
}
```

```gitignore
.gradle/
build/

# jdtls
bin/
.settings/
.classpath
.project
```

```gitattributes
# Linux start script should use lf
/gradlew        text eol=lf

# These are Windows script files and should use crlf
*.bat           text eol=crlf
```

# Debug código Java

uso de jdb, muy similar de gdb

```sh
jdb -classpath build/classes/java/main -sourcepath src Main
```

recuerda compilar con -g:

```
javac -g ...
```

muy buena guia [aqui](https://foojay.io/today/jdb/)

```
stop at <Class>:<Line>      breakpoint
stop at <Class>.<Method>    breakpoint
step                        execute current function
step into                   execute into current function
step up                     execute to end of method
print <Expression>          print values
locals                      print all local variables
list                        show source code
```
{{< /todo >}}
