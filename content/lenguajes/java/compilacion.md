---
title: Compilación en Java
description: >
    TODO
weight: 0
draft: true
---

# Java
El instalador viene en la versión de `JDK`. Dirección predeterminada del
compilador es la siguiente: (siendo `xxx` su versión):

```
C:\Program Files\Java\jdkxxx\bin
```

Para ejecutar, nos situamos en la dirección de ese archivo en el CMD y usamos el
siguiente comando:

```
>> java NombreDelArchivo.java
```

Para que funcione, como mínimo debe existir una clase pública que lleve un
método también público y estático llamado main, que a su vez tenga de parámetro
una matriz de Strings.

```java
public class Clase {
  public static void main (String[] args) {
    //Código
  }
}
```

El problema que surge con este sistema es que no se pueden crear otras clases
fuera de ese archivo. De lo contrario, hay que compilar. Entonces, para compilar
el código fuente se usa el comando:

```
>> javac NombreDelArchivo.java
```

Y para después ejecutar el archivo `.class` que se genera:

```
>> java NombreClaseMain
```

Si se están usando paquetes, el archivo `.class` resultante debe de estar en una
carpeta llamada como el paquete. Además, ese archivo se debe llamar igual que la
clase que contiene.

Ejecuta todo el programa desde el paquete base, la raíz de todos los
directorios.

Y para crear un archivo `.jar` (archivo comprimido con todo lo necesario para
ejecutar: `.class`, imágenes...) necesitamos crear otro archivo (no es necesario
que tenga una extensión específica, mejor `.mf`) cuya primera línea ponga que
clase contiene el método main de la siguiente manera:

```
Main-Class: NombreDeLaMainClass (salto de línea)
```

Usamos el comando `jar` con los atributos `c` (para crear un archivo) `f` (para
darle un nombre al jar) `m` (para incluir el MANIFEST). Escribimos después en un
orden que se corresponda con las letras el nombre del archivo .jar (mejor con
esta extensión), el nombre del MANIFEST y el nombre de los archivos .class (o
*.class):

```
>> jar -cfm NombreDelJAR.jar MANIFEST.mf *.class
```

Para ejecutar este archivo `.jar` se usa el comando:

```
>> java -jar Nombre.jar
```

Se puede hacer un archivo `.bat` que haga eso por nosotros:

```bat
@echo off
java -jar Nombre.jar
pause
exit
```
Como pasar a `.exe` (ejecutable de Windows que no necesita tener Java instalado)
(se necesita un programa externo)

```sh
javac -cp lib1.jar;lib2.jar Program.java
# -cp: class path
```

# gradle

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

# debug

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
