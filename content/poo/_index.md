---
title: Programación Orientada a Objetos
content_title: true
---

Conceptos clave de la Programación Orientada a Objetos:

- [Encapsulación] (abstracción)
- Herencia
- Polimorfismo

[Encapsulación]: {{< relref "encapsulacion#block-encapsulación" >}}

# Notas sobre Java

Java es muy específico con la estructura de archivos. Una carpeta es un paquete
y un archivo `.java` es un clase.

- No pueden haber dos clases `public` en el mismo archivo (error de compilación)
- Si un archivo `.java` está dentro de una carpeta, la primera línea del archivo
  debe ser `package <nombrecarpeta>` desde el subdirectorio raíz (separando cada
  nombre con `.`.
- No hace falta usar `import`s, también se puede escribir el nombre completo de
  la clase (incluyendo paquetes). Esto no es demasiado práctico. Nótese que
  `java.lang` se importa automáticamente.

Para compilar recomiendo añadir la flag `-Xlint:all` para que el compilador te
de consejos sobre cómo mejorar tu código, mostrar _warnings_ varios, etc.

```sh {linenos=false}
javac -Xlint:all -d <build_dir> <src_dir>/**/*.java
```

Para ejecutar hay que especificar dónde está la clase principal usando
la `classpath`:

```sh {linenos=false}
java -cp <build_dir> <MainClass>
```

Para recompilar todo a un archivo `.jar`, añada todos los archivos `*.class`
mantiendo la estructura de directorios. Tenga en cuenta que un archivo `.jar` es
solo un `.zip`, asi que puede abrirlo para comprobar que está bien.

```sh {linenos=false}
jar -cfm <NombreJAR>.jar manifest.mf <archivos .class>
```

Recuerde añadir un archivo `manifest.mf` que indique la clase principal de la
siguiente forma:

```mf {linenos=false}
Main-Class: <MainClass>
```

Para ejecutar el archivo `.jar`:

```sh {linenos=false}
java -jar <NombreJAR>.jar
```

{{< block "Curiosidades" >}}
Teniendo un `.class` se puede ver su contenido usando `javap`:

- `javap -p <.class>`: muestra todas las clases y miembros
- `javap -v <.class>`: mucha información, tamaño del stack, argumentos de
  métodos, _Constant pool_, etc.
- `javap -c <.class>`: desensambla la clase
{{< /block >}}

