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
