---
title: Encapsulación
description: >
    En este primer artículo, se verá el concepto de Encapsulación, Clase
    y Objeto. Además, se explorarán los constructores, _getters_, _setters_
    y métodos funcionales.
date: 2024-01-13T19:07:48+01:00
weight: 2
---

{{< block "Teorema del Programa Estructurado" >}}
Es posible crear cualquier función computable con 3 estructuras lógicas
(llamadas **estructuras de control**):

- secuencial
- condicional (`if`)
- iterativo (`for`, `while`)

Más información: [Wikipedia](https://es.wikipedia.org/wiki/Teorema_del_programa_estructurado)
{{< /block >}}

Todo programa se puede entender como una serie de instrucciones que operan sobre
un conjunto de datos de entrada y generan otro conjunto de datos de salida. Por
eso, los tipos de datos son conceptos fundamentales de un lenguaje de
programación.

En Java:

- **Tipos de datos primitivos**: equivalentes a los de C, vinculados a la
  representación en el computador.
- **Clases**: tipos de datos abstractos (TADs) de alto nivel, no representables
  directamente en el computador.

Los `struct`s de C permiten crear tipos de datos complejos, **pero no es posible
restringir el valor que toman ni quién puede modificarlos (integridad de
datos)**. Aunque se pueden hacer estructuras opacas, no es particularmente
conveniente y se basa en trucos con punteros.

# Encapsulación

{{< block "Encapsulación" "var(--magno-blue)" >}}
<!-- TODO: diagrama de encapsulación 12-9-2023 -->

La **encapsulación** es una forma de abstracción de datos, que consiste en la
agrupación unos datos con los métodos (funciones) que los manipulan. Estos
especifican los estados posibles y las operaciones permitidas.

Se utiliza para ocultar los valores o estados internos, **evitando el acceso
directo a ellos por el resto del programa**, porque de lo contrario, se podrían
dar errores de estados inválidos. Los métodos actúan de intermediarios para que
esto no ocurra.

El usuario utiliza los métodos que tiene accesibles para operar sobre los datos,
sin preocuparse por su representación interna ni otros detalles de
implementación, a modo de caja negra. **Lo importante es qué hacen, no cómo lo
hacen**.

Es la característica fundamental de la Programación Orientada a Objetos.
{{< /block >}}

<!-- TODO: link a TADS de Prog2 -->

- **Integridad de datos**: limite al código que puede acceder a los datos.
- **Principio de ocultación**: solo un trozo de código puede acceder a los datos
  y ninguno otro puede.

Este concepto facilita mucho la modularidad de los programas y reduce los
errores.

# Clases y objetos

{{< block "Clase" "var(--magno-blue)" >}}
Una clase es una plantilla para la creación de objetos. Define unas
características comunes mediante unas variables llamadas **atributos** y una
serie de acciones mediante funciones llamados **métodos**.

Están vinculados a entidades de alto nivel del programa, y se utilizan tipos de
datos primitivos para representarlas.
{{< /block >}}

{{< block "Objeto" "var(--magno-blue)" >}}
Un objeto es **una instancia concreta de una clase**. Esto implica que el objeto
tiene una dirección de memoria concreta y un valor para cada uno de los
atributos.
{{< /block >}}

Coloquialmente, una clase es un `struct` con una colección de funciones que
operan sobre ella, y cuando el `struct` está en memoria, se le llama objeto.

Lo mejor es ver un ejemplo:

La clase Persona tiene:
- Atributos: `nombre`, `edad`
- Métodos: `presentarse()`

```java
public class Persona {
    private String nombre;
    private int edad;

    public Persona(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    public void presentarse() {
        System.out.printf("Hola! Me llamo %s ya tengo %d años\n", nombre, edad);
    }

    // ...
}
```

Entonces:

```java {linenos=false}
Persona pepe = new Persona("Pepe Fernández", 27);
pepe.presentarse();
// Imprime: "Hola! Me llamo Pepe Fernández y tengo 27 años"
```

`pepe` es un objeto de la clase `Persona`. Tiene un nombre concreto (Pepe
Fernández) y una edad concreta (27). No confundir el nombre de variable que se
le ha puesto (`pepe`) con el atributo de nombre.

## Estructura de una clase en Java

```
public <modificador clase> class <NombreClase> {
    // Atributos
    <tipo acceso> [<modificador atributo>] <TipoDato> <nombreAtributo>;

    // Constructor
    public <NombreClase> (<argumentos>) {
       // ...
    }

    // Getters
    public <TipoAtributo> get<NombreAtributo>() {}
        return <nombreAtributo>;
    }

    // Setters
    public void set<NombreAtributo>(<TipoAtributo> <nombreAtributo>) {
        // Comprobación del argumento
        this.<nombreAtributo> = <nombreAtributo>;
    }

    // Métodos funcionales
    <modificador acceso> [<modificador método>] <TipoDato>
    <nombreMétodo>(<TipoDado> <nombreParam>, ...) [throws <NombreExcepción>]
    {
        // ...
    }
}
```

Donde `<modificador clase>` uno de:

- `final`: la clase no puede ser superclase.
- `abstract`: la clase puede tener métodos abstractos y no se puede crear con `new`.

Y `<modificador atributo>` y `<modificador método>` puede ser cualquier número
de (hay algunos que colisionan y no pueden ir juntos, el compilador dará un
error):

- `final`: atributos/métodos no se pueden sobreescribir.
- `static`: pertenecen a la clase, en lugar de al objeto.
- `transient`: se saltan cuando se serializa el objeto.

Solo para `<modificador atributo>`:

- `abstract`: el método no tiene una implementación definida.
- `synchronized`: solo se puede acceder al método un thread a la vez.

-----------------------------------------------------------

Para llamar a un método se usa la sintaxis `<objeto>.<método>(<params>)`, y para
acceder a un atributo `<objeto>.<atributo>`.

Nótese que **un atributo es una variable de ámbito de clase** (todos los métodos
tienen acceso), si se declara una variable se declara dentro de un método, solo
**será local al método**, por lo que el resto de no lo verán y se borrará cuando
termine.

## Tipos de acceso en Java

| Tipo de acceso   | Palabra clave        | Clase              | Paquete            | Subclase           | Otros              |
|:----------------:|:--------------------:|:------------------:|:------------------:|:------------------:|:------------------:|
| Público          | `public`             | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Protegido        | `protected`          | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x:                |
| Acceso a paquete | :white_large_square: | :white_check_mark: | :white_check_mark: | :x:                | :x:                |
| Privado          | `private`            | :white_check_mark: | :x:                | :x:                | :x:                |

{{< block "Buenas prácticas" "var(--magno-purple)" >}}
- **Los atributos de una clase siempre deben ser privados**, de lo contrario se
  pierde la encapsulación. Para acceder y modificar los datos, se usan los
  _getters_ y _setters_.
- **Los métodos pueden ser públicos o privados**. Un método privado sirve de
  ayuda a otros métodos.
- **Los _setters_ deben incluir comprobaciones** para escribir valores erróneos
  como `null`.
- **Todo atributo debe tener su _getter_ y _setter_**, salvo casos donde el
  atributo sea solo lectura o interno a la clase.
{{< /block >}}

# Métodos de clase
## Constructores

Para tipos de datos que no son clases, los tipos de datos primitivos, se realiza
una reserva de memoria y se inicia con su valor por defecto de forma automática.

| Tipo                        | Valor inicial   |
|:----------------------------|:----------------|
| `boolean`                   | `false`         |
| `char`                      | `'\0'`          |
| `byte` `short` `int` `long` | `0`             |
| `float` `double`            | `+0.0`          |

Sin embargo, para crear [objetos], **no se reservará memoria automáticamente**,
dado que se desconoce cuánto ocupará. En su lugar, **se asigna el valor `null`**
por defecto, por lo que si se intenta usar dará un `NullPointerException`
(similar a un `Segmentation Fault`).

```java {linenos=false}
Persona pepe; // Aquí pepe es null
```

Como el compilador ya sabe que contiene el valor `null`, da `error: variable
pepe might not have been initialized` cuando se intente llamar a algún método.

La reserva de memoria se hace con **el operador `new` y llamando al
constructor**.

```java {linenos=false}
Persona pepe = new Persona("Pepe Fernández", 27);
//             ~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//     Uso de new   Llamada al constructor
```

{{< block "Constructor" "var(--magno-blue)" >}}
Un constructor es un método especial que **se invoca una única vez por cada
objeto** (si se llama dos veces, se crean dos objetos distintos) para:

- Reservar memoria para el objeto
- Reservar memoria para los atributos
- Asignar los valores iniciales a los atributos (desde parámetro o valores por
  defecto)

**Nunca devuelve nada** y **se llama igual que la clase**.
{{< /block >}}

{{< block "Constructor por defecto" "var(--magno-blue)" >}}
Si el programador no ha creado de forma explícita un constructor, **Java
automáticamente añade el constructor por defecto**.

- No tiene argumentos
- Inicializa todo por defecto: clases a `null` y datos primitivos según la
  tabla anterior.

Por tanto, es equivalente a añadir el siguiente código:

```java {linenos=false}
public <NombreClase>() {}
```

Si no fuese por este mecanismo, nunca sería posible crear instancias de esta
clase.
{{< /block >}}

{{< block "Buenas prácticas" "var(--magno-purple)" >}}
Siempre se debe crear un constructor e iniciar todos los atributos.
{{< /block >}}

## _Getters_ y _setters_

Los _getters_ (de la palabra _get_), devuelven el valor que tienen los atributos
en cada momento, llamados por convención `get<NombreAtributo>`.

Los _setters_ (de la palabra _set_), escriben en valor que se pasa por
parámetros en el atributo, siempre y cuando cumplan determinadas condiciones (no
ser `null`, estar entre un rango de valores, etc). Se llaman por convención
`set<NombreAtributo>`.

Solo hay como máximo un único getter y un único setter por cada atributo. Esta
es la única forma que tiene el usuario de la clase para acceder/modificar al
atributo, por lo que si es programador decide que no quiere que se modifique
cierto valor, simplemente no añade un setter.

## Métodos funcionales

Son el resto de métodos que **implementan la funcionalidad** de la clase.
**Pueden acceder directamente sobre los atributos de la clase**, no hace falta
que se use también los getters/setters.

## Métodos (y atributos) estáticos

La palabra clave `static` se puede usar tanto en atributos como en métodos,
y significa _propio de la clase y no del objeto_. Esto requiere que **el método
o atributo esté siempre en memoria estática** por si se usa, a diferencia del
resto que requieren de un objeto: cuando se carga el objeto, se trae consigo sus
métodos y se reserva memoria para sus atributos.

Para métodos, esto quiere decir que **se puede invocar sin haber creado un
objeto de la clase**. Esto implica que **no se puedan hacer llamadas a métodos
no estáticos** desde un método estático:

```java
public class Consola {
    public static void imprimir(String msg) {
        System.out.printf("Método estático: %s\n", msg);
    }
}

// ...
Consola.imprimir("HOLA");
```

Para atributos, el valor se conserva independientemente del objeto en el que se
utilice. Esto resulta útil para mantener un estado global entre todos, como para
hacer un generador de identificadores:

```java
public class Jugador {
    public static int ultimoId = 0;
    public final int id;

    public Jugador() {
        ultimoId++;
        this.id = ultimoId;
    }
}
```

## Sobrecarga de métodos

Se pueden tener varios métodos con el mismo nombre, siempre y cuando **tengan
parámetros distintos** (no aplica a valor de retorno).

```java {linenos=false}
public void cargarDatos(File archivo) { ... }
public void cargarDatos(Dato dato) { ... }
public void cargarDatos(Arraylist<Dato> datos) { ... }
```

Condiciones de uso:

- El objetivo el método debe ser el mismo en todas las implementaciones.
- Se desaconseja el uso de condiciones sobre los argumentos.
- Es más habitual la **sobrecarga de constructores**.

# Métodos especiales
## Método `toString`

Todas las clases de Java heredan de la clase `Object`, que implementa el método
`toString`. Esta **devuelve una representación en texto de un objeto**. Es
posible reimplementar este método en cada subclase para cambiar el
funcionamiento por defecto (muestra el nombre de la clase junto con un código,
lo que no es muy útil):

```java {linenos=false}
@Override
public String toString() {
    return """
           {
               nombre: %s
               edad: %d
           }
           """.formatted(this.nombre, this.edad);
}
```

En general nos interesa que **todas las clases deriven este método para
describir el objeto incluyendo los datos de los atributos más relevantes**.

## Método `equals`

¿Cómo consideramos que dos métodos son iguales?

- **Opción 1**: que tengan la misma dirección de memoria.

  ```java {linenos=false}
  public boolean equals(Object obj) {
      return this == obj;
  }
  ```

  Es una definición muy restrictiva, pero es lo que se usa por defecto.

- **Opción 2**: comprobar los atributos de cada objeto, implementando un
  **criterio de igualdad**. Esto lo debe hacer el programador de la clase.

Para esta segunda opción, hay que comprobar 3 condiciones:

- **Dirección de memoria**: si se apunta a la misma posición, entonces los
  objetos son iguales.
- **Tipo de clase**: si son clases distintas, entonces son objetos distintos
- **Criterio de igualdad**

```java
@Override
public boolean equals(Object obj) {
    // Comprobar la dirección de memoria
    if (this == obj) {
        return true;
    }

    // Comprobar que no sea null
    if (obj == null) {
        return false;
    }

    // Comprobar que sea del mismo tipo
    if (this.getClass() != obj.getClass()) {
        return false;
    }

    <NombreClase> <nombre> = (<NombreClase>) obj;
    return <criterio de igualdad>;
}
```

{{< dropdown "Reglas de igualdad" >}}
Requisitos que debe cumplir el método `equals`:

```{linenos=false}
x != null ==> x.equals(null) = false
x != null ==> x.equals(x)    = true

x, y    != null ==> x.equals(y) = y.equals(x)
x, y, z != null ==> x.equals(y) and y.equals(z)
                ==> x.equals(z)
```
{{< /dropdown >}}


Dicho criterio de igualdad debe hacerse sobre atributos de valor inmutable, que
no se puedan modificar usando [aliasing].

Además, este método se usa internamente en las colecciones de datos (`contains`
y otros), por lo que al implementarlo se reutiliza mucho código.

{{< block "Buena práctica" "var(--magno-purple)" >}}
Se debe implementar siempre el método `equals`.
{{< /block >}}

## Método `hashCode`

Este método devuelve un entero generado un algoritmo de hash, que necesitan
ciertas estructuras de datos como el `HashMap` o el `HashSet`. La implementación
por defecto del método es específico a la JVM que se esté usando.

- El método `hashCode` debe devolver el mismo valor de forma consistente para el
  mismo objeto.
- Si dos objetos son iguales según el método `equals`, su código hash debe ser
  el mismo.
- Dos objetos son diferentes, no tienen porqué devolver hashes diferentes.

Nótese que `return 1` es un método `hashCode` que cumple todos los requisitos,
pero no es particularmente bueno. Cuanto mejor sea la función hash, mejor será
el rendimiento de las estructuras de datos que lo utilicen.

```java {linenos=false}
@Override
public int hashCode() {
    return (int) id * name.hashCode() * email.hashCode();
}
```

Existen muchas formas de implementar un una función hash, unas mejores que
otras. En este [link] puede encontrar algunos ejemplos.

## Método `main`

El programa comienza llamando al método `main` (análogo a lenguajes como C, que
inician en la función `main`) y **debe tener muy poco código**: debe limitarse
a crear una clase que se encargará de todo.

```java
public class MainClass {
    public static void main(String[] args) {
        // Código
    }
}
```

La clase principal también debe ser muy pequeña y **no tener atributos**.

# Registros

En Java 14 se introdujo los `record`s, clases inmutables que carecen de
_setters_, por lo que no se puede modificar los valores de sus atributos en
tiempo de ejecución. Tienen las siguientes restricciones:

- Todos sus atributos son privados (`private final`).
- Todo atributo tiene su _getter_ correspondiente.
- Los atributos no tienen setters ni ningún otro método para modificar los
  atributos.
- Tienen un constructor llamado **constructor canónico**, cuyos argumentos
  determinan los atributos del `record`. Dado que no se pueden modificar, se deben
  asignar cuando se crea el objeto.
- El [método `toString`] incluye el nombre de la clase y el nombre de los
  atributos con sus correspondientes valores.
- El [método `equals`] devuelve `true` cuando todos los atributos tienen el mismo
  valor.
- El [método `hashCode`] devuelve el mismo valor cuando todos los atributos son
  iguales.

```java
public record Persona(String nombre, int edad) {
    // Se puede reimplementar el constructor canónico para añadir chequeos
    // y otras operaciones relevantes
    public Persona {
        Objects.requireNonNull(nombre); // assert nombre != null
        System.out.println(nombre + " creado");
    }

    // Se pueden añadir constructores adicionales que llaman al canónico
    public Persona(String nombre) {
        this(nombre, 18);
    }

    // Métodos funcionales que no modifiquen los atributos
    // ...
}
```

Su gran ventaja es que ahorra al programador tener que escribir mucho código
para producir este mismo resultado.

[objetos]:           #block-objeto
[método `toString`]: #método-tostring
[método `equals`]:   #método-equals
[método `hashCode`]: #método-hashcode
[link]:              https://www.baeldung.com/java-hashcode#standard-hashcode-implementations
[aliasing]:          {{< relref "referencias" >}}
