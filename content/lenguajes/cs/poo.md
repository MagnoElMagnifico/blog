---
title: POO en C#
weight: 3
draft: true
---

## Y ALGUNAS CONVENCIONES A SEGUIR

- Las clases, métodos y atributos (aunque estos no deberían ser públicos) que sean _public_
    deben comenzar con letra mayúscula (notación _PascalCase_ ).
- Los que no, deben comenzar por letra minúscula (notación c _amelCase_ ).
- Los nombres del campo de clase se recomienda (para diferenciarlos) añadir “_”;

# EXCEPCIONES

Existen dos tipos de errores, unos de **sintaxis** (debidos a un error de sintaxis, valga la
redundancia, por ejemplo que falte un punto y coma, una palabra mal escrita, etc. Estos solo se
pueden evitar modificando el código) y los de **excepciones** (son errores surgidos mientras se
ejecuta el programa y que se dan en determinada ocasión sucede algo que no se puede realizar
por x motivo. Veamos algunos ejemplos).

Algunos ejemplos son: memoria corrupta, acceso a archivos que no existen, cuando se intenta
cambiar de _string_ a _int_ pero no es posible ... Estas excepciones aparecen en la consola cuando se
dan, además de su tipo, que especifica cuál es el error. A partir de la línea de código que ahí
aparece se detiene el programa.

```
Para evitar estos estos errores debemos usar la estructura try-catch
```
## TRY-CATCH

En la parte _try_ se mete el código que puede generar los errores, y en la parte _catch_ se mete el
código a ejecutar cuando este error suceda. Se añaden unos paréntesis con un objeto del tipo de
excepción que ha dado, para que solamente se capture ese tipo de error. Por eso también se
pueden añadir todos los _catch_ que queramos.

La parte de _finally_ es opcional, y el código se su interior se ejecutará siempre, da igual si hay
excepción, como si no la hay, como si se captura, etc.

```
try
{
//Código que da error
}
catch (TipoExcepción nombre)
{
//Código que se ejecutará cuando suceda un error
}
finally
{
//Código que se ejecutará siempre
}
```
Si hemos iniciado una variable dentro del _try_ , el programa piensa que ese código podría no
ejecutarse, y entonces debemos iniciar la variable otra vez.


Las excepciones tienen una jerarquía, algunas de ellas engloban a otras, por ejemplo la
_Exception_ (es igual a no poner los paréntesis del _catch_ , pero no es recomendable) es la más
general de todas lo cual engloba todos los errores (es recomendable especificar lo máximo posible,
pero en algunos casos no nos vamos a parar a escribir 200 posibilidades posibles). Después de esa
podemos tener una llamada _SystemException_ que engloba a las _FormatException_ y
_OverflowException_ ... Este fenómeno se llama herencia, que veremos próximamente.

Dará un error si al tener un _catch_ genérico le añadimos otro genérico más abajo en la
jerarquía. Si queremos hacer eso, debemos escribir el _catch_ más concreto primero.

También podemos darle un tratamiento genérico las excepciones excepto a una de ellas, usando
filtros con la palabra when y después se debe incluir unos paréntesis con la siguiente sintaxis:

```
catch (ExcepciónGenérica e)
when (e.getType() != typeof (ExcepciónConcreta))
{...}
//Captura todas las excepciones menos la ExcepciónConcreta
```
Existe un método E _xcepción.Message_ , que devuelve el error concreto que ha sucedido (en
inglés).

### CHECKED Y UNCHECKED

En algunos casos, debido a decisiones de rendimiento (por ejemplo, cuando una variable llega a
su límite de memoria, en lugar de dar un error cada 2 por 3, se continua con una respuesta
errónea) algunas excepciones no se pueden dar. Para eso debemos usar la estructura checked:

```
checked
{
//Código
}
//////////////////////
checked (//Código)
```
Pero, si en determinado caso ya estamos usando a _checked_ , pero hay determinado línea en la
que no interesa hacer eso podemos usar unchecked

```
unchecked
{
//Código
}
///////////////////////
unchecked(//Código);
```
```
NOTA : Solo funciona con int y long.
```

### THROW

También, al crear nuestros métodos, clases, etc, es posible que nos hemos encontrado con la
posibilidad de un error. La mejor manera para esto es usar la palabra throw para lanzar una
excepción en concreto que se ajuste a nuestro error.

```
throw new TipoDeExcepción ();
```

# PROGRAMACIÓN ORIENTADA A OBJETOS (POO)

Se trata de diferentes formas de programar ( **Paradigmas** ): Programación Orientada a
Procedimientos (lo implementan los lenguajes antiguos) y Programación Orientada a Objetos (lo
implementan los lenguajes modernos).

En el pasado, los lenguajes eran orientados a procedimientos, pero con el paso del tiempo se
requería cada vez más y había muchos problemas. Por ello inventaron una forma totalmente
distinta de programar.

## DESVENTAJAS DE LA PROGRAMACIÓN ORIENTADA A PROCEDIMIENTOS (POP)

```
Ejemplos de estos tipos de lenguajes: Fortran, COBOL, Basic...
```
- Demasiado código.
- Es difícil de leer
- No es fácil reutilizar código
- Si hay un fallo, cae todo el programa
- Es muy difícil seguir el hilo de ejecución con tantas expresiones _GOTO_
- Es muy difícil de encontrar errores y corregirlos
La idea para corregir todo esto fue la de asemejar la programación a la vida real, a la naturaleza,
con objetos. Cada objeto debe de tener lo siguiente:

```
[Ejemplo de objeto: coche]
```
- **Estado** : Parado, en marcha, aparcado...
- **Propiedades** : Color, peso, tamaño...
- **Comportamiento** : Arrancar, frenar, girar...

## VENTAJAS DE LA POO

```
Ejemplos de estos lenguajes: C++ , Java , Python , C#...
```
- **Modularización** : Se pueden dividir los programas en pequeños trozos, llamados clases
    (recomendado).
- **Herencia** : Es muy reutilizable.


- **Tratamiento de excepciones** : Si existe algún fallo, el programa continuará, porque el código
    está dividido en partes, y mientras los otros funcionen todo irá bien mientras que puedo
    arreglar solamente el trozo que no funciona.
- **Encapsulamiento** : Cuando tú tienes tantos trozos, no se puede entrar en ellos para conocer
    su funcionamiento. Se trata de una medida de seguridad. Cuando no es necesario o no
    queremos que accedan a determinado método, podemos encapsularlo para que eso no
    pase. Es recomendable hacerlo siempre con los atributos de clase.

### CLASE

Una clase es un modelo donde se redactan las características comunes de un grupo de objetos.
Es como una plantilla.

Para entendernos, una clase podría ser un chasis, pues es una característica que todos los
coches tienen.

### OBJETO

Es un ejemplar perteneciente a una clase, es decir, son aquellos que derivan de esa clase o
plantilla, partiendo de las mismas características, tienen otras nuevas que los diferencian entre sí.

Si continuamos con el ejemplo anterior, un coche es un objeto de la clase chasis, pues tiene esa
característica. Y el coche, aparte de eso, tiene determinada carrocería, color, etc;, distinta a otro
coche.

```
Cada objeto tiene sus propiedades / atributos y comportamientos:
```
- **Atributos** :
    ◦ Color
    ◦ Peso
    ◦ Alto
- **Comportamientos** ( **métodos** ):
    ◦ Arrancar
    ◦ Frenar
    ◦ Girar


# SINTAXIS DE LA POO

## CÓMO HACER UNA CLASE

```
Usando la palabra class:
```
```
class NombreClase
{
//Código de la clase
}
```
_Ejemplo_ : Hagamos un ejemplo con un círculo, debemos darle sus _atributos_ (o propiedades) y
_métodos_ (o comportamientos):

```
class Circulo
{
//Atributo de la clase
const double pi= 3.1416;
//Método de la clase. ¿Qué puede hacer el círculo?
double CalculoArea(int radio)
{
return pi * radio * radio;
}
}
```
```
NOTA : Ninguna clase está vacía, es decir, que no tenga métodos, pues hay
algunos que los recibe por herencia (ver próximamente).
```
## CÓMO HACER UN OBJETO

Para poder usar todos estos métodos y atributos debemos crear un objeto que provenga de
esta clase, es decir, crear una variable a partir de una clase:

```
NombreDeLaClase NombreDelObjeto;
```
```
Y para inicializarla solo debemos usar la palabra new y volver a escribir el nombre de la clase:
```
```
NombreDelObjeto = new NombreDeLaClase();
```
```
NOTA : También se puede hacer todo junto, como en las variables normales:
```
```
NombreDeLaClase NombreDelObjeto = new NombreDeLaClase();
```
```
Ejemplo :
```

```
Circulo miCirculo= new Circulo();
```
```
Para poder utilizar los métodos y atributos debemos usar la nomenclatura del punto :
```
### NOMENCLATURA DEL PUNTO

Se utiliza el operador. para acceder a los diferentes métodos y atributos de determinado
objeto:

- Accediendo a atributos del objeto:

```
Circulo.pi(); //Devuelve el valor de pi
renault.color = "rojo"; //Establece el color a rojo
renault.peso = 1500; //Establece el peso a 1500
```
- Accediendo a métodos del objeto:

```
Circulo.CalculoArea(x); //Devuelve el área del círculo de radio x
renault.arranca(); //Llama el método arrancar del coche
```
Es posible que nos salte un error al hacer esto, que se debe a la propiedad del encapsulamiento,
que protege los métodos y argumentos de ser accedidos por otros programas no deseadamente.
Para cambiar eso, debemos usar los modificadores de acceso:

### Modificadores de acceso (a variables y métodos)......................................................................

- public: Accesible desde cualquier clase (no es recomendable en variables).
- private: Accesible solo desde la propia clase y en su ámbito(también no se puede poner
    nada, pero es recomendable).
- protected: Accesible solo desde una clase hija y la propia clase (herencia).
- protected internal: Accesible desde el mismo ensamblado o clase derivada de otro
    ensamblado.
- private protected: Accesible desde la misma clase o clase derivada del mismo
    ensamblado.
Continuemos con nuestro ejemplo de antes:

```
namespace paquete
{
class ClasePrincipal
{
public static void Main(string[] args)
{
Circulo miCirulo= new Circulo();
Console.WriteLine(miCirculo.CalculoArea(5));
```

```
}
}
class Circulo
{
const double pi= 3,1416;
public double CalculoArea(int radio)
{
return pi * radio * radio;
}
}
}
```
Sin embargo, no siempre necesitamos crear un objeto para poder utilizar los métodos y
atributos de determinada clase. Nosotros no hemos creado un objeto de tipo _Console_ para poder
imprimir en pantalla. Esto se debe a que es static, es decir, que no pertenece al objeto, sino a la
propia clase (esto significa que si es un atributo, no podremos modificar su valor desde el objeto,
solo desde la clase). Para llamar a estos métodos y atributos debemos escribir el nombre de la
clase.

```
NOTA : Las constantes de la clase son siempre static por defecto.
```
```
private static int ...; //Da igual el orden
public static void ...{}
```
Si estamos utilizando constantemente determinada clase con métodos _static_ , podemos
importarla para no tener que repetir el nombre de la clase. No es muy recomendable utilizar esto,
pues puede crear algunas confusiones.

```
using static NameSpace.Class;
```
### Dividir Clases.............................................................................................................................

Cuando estamos trabajando con clases muy grandes, es posible dividirlas para facilitar el
manejo de estas clases gigantes. Debemos incluir en la declaración de la clase la palabra partial,
y podemos sacar el código que no queremos que esté en ese trozo y pasarlo a otra distinta que use
la misma palabra _partial_ (ambas deben llevar el mismo nombre, obviamente);

```
partial class NombreClase
{
//Parte del código de la Clase
}
partial class NombreClase
{
//Otra parte del código de la Clase
}
```
Aunque también podemos crear clases en otros archivos (siempre _.cs_ con el mismo nombre
que la clase) (en VS aparecen en el explorador de soluciones, que muestra las clases, archivos,
métodos, etc).


## Métodos en la POO........................................................................................................................

### Constructores............................................................................................................................

Es un método especial con el mismo nombre que la clase en la que está, tiene que ser _public_
para que podamos crear objetos desde otras clases y no puede devolver nada (aunque no lleve ni
_void_ ni _return_ ). Sí puede recibir parámetros. Este método se llama al declarar un nuevo objeto
de esa clase. Se utiliza para establecer un estado inicial a un objeto concreto, aunque luego sea
modificado.

```
class Clase
{
public Clase ()
{
//Definición del estado inicial
}
}
```
¿Y cómo debemos establecer ese estado inicial? Pues muy sencillo, además de realizar aquellas
operaciones necesarias debemos inicializar ahí dentro los atributos de la clase.

También se puede sobrecargar los constructores, puedes tener varios con diferentes
parámetros.

```
Si no creamos un constructor, se llamará al predeterminado, que es uno vacío y sin parámetros.
```
### Getters y Setters........................................................................................................................

Estos son los métodos encargados de gestionar los atributos, ya que no es buena práctica
utilizamos estos métodos. Los setters se encargan de dar un valor a un atributo (set, de ajustar) y
los getters de obtener esos valores (get, de obtener). También se puede hacer con varios
parámetros a la vez.

```
public TipoDelArgumento getNombre() => Argumento;
public void setNombre(TipoDelArgumento nuevoArgumento) Argumento=
nuevoArgumento;
```
```
NOTA : Hay que tener cuidado de no llamar igual al parámetro que al atributo,
pues el programa no podrá determinar cuál es cual. Si no deseamos cambiar el
nombre, podemos usar la palabra this, que hace referencia a los atributos y
métodos de la clase dónde se encuentra.
```
```
public void setColor(string color) this.color= color;
```

## Herencia.........................................................................................................................................

Funciona igual que en la realidad, en una jerarquía. Un padre tiene unos hijos y unos bienes, y
esos bienes acaban siendo de los hijos. Esa jerarquía, en la programación, se llama la jerarquía de
clases. ¿Cómo sabemos entonces cuál va más arriba? Pues es muy sencillo, debemos encontrar
aquellas clases que puedan ser otras, pero no al revés.

Usemos un ejemplo, la clase Empleado, la clase Jefe y la clase Director. El Jefe y el Director
ambos son Empleados, pero no todos los Empleados son Directores o Jefes. De esta manera, el
Empleado estaría arriba en la jerarquía. Si seguimos analizando este ejemplo, un Director es un
Jefe también, y entonces el Jefe debe estar más arriba en la jerarquía.

Resumiendo, la clase que sea más genérica y que pueda englobar otras clases debe estar más
por encima; llamada **superclase** o **clase padre** , y la que está más por debajo se llaman
**subclases** o **clase hija**.

Sigamos con el ejemplo. Tenemos varias características comunes para todos ellos (Nombre,
Salario...) y comportamientos (hacer informes, va a trabajar...)

Esta es una excelente manera para reutilizar el código, pues no tienes que repetir lo mismo en
todas las clases.

### Sintaxis......................................................................................................................................

En primer lugar, debemos crear una superclase que tenga unos conceptos generales para cada
subclase. Vamos a usar un ejemplo que los mamíferos pueden ser humanos.

```
class Mamifero
{
public void Respirar()
{
Console.WriteLine("Soy capaz de respirar");
}
}
```
Ahora vamos a crear una subclase, la subclase Humano. De esta manera, ahora esta clase
también posee los mismos métodos que la clase Mamífero, aparte de los nuevos que aporte el
Humano:

```
class Humano : Mamifero //Humano hereda de Mamífero.
{
public void Pensar()
{
Console.WriteLine("Puedo pensar");
}
```

```
}
```
Ahora, si usamos un objeto de tipo Humano, podremos acceder también a los métodos de la
clase Mamífero de la misma manera que hemos hecho siempre.

```
Humano Yo= new Humano();
Yo.Pensar();
Yo.Respirar();
```
Si, por ejemplo, hubiésemos creado una nueva clase llamada Caballo que heredase también de
la Mamífero y tuviese un método llamado galopar, la clase Humano no podría acceder a ese
método, pues es exclusivo de la clase Caballo y nadie le está heredando.

Siempre que crees una clase que no herede de ninguna otra, estará heredando métodos de la
clase Object. Esto se hace por defecto, hagas lo que hagas siempre estarás heredando de esta
clase (aunque heredes de otra clase, esa está heredando a su vez de otra clase o de _Object_ ), la
llamada **superclase cósmica**.

#### Constructores en la herencia................................................................................................

El constructor de la subclase siempre llama al de la superclase en el caso de que no hayamos
dado un constructor a esta última, y aunque no lo veamos, se está llamando al constructor por
defecto.

Sin embargo, al crear nosotros un constructor en la superclase, y más importante aún si lleva
parámetros, debemos crear otros en las clases hijas para poder inicializar sus valores. Para ello se
añade después de la declaración del constructor :base(), que llama al constructor superior. Si
este tiene parámetros se les deben pasar entre sus paréntesis. Pongamos un ejemplo:

```
class Mamifero
{
private string NombreSerVivo;
public Mamifero (string nombre)
{
this.NombreSerVivo = nombre;
}
public void Respirar()
{
Console.WriteLine("Soy capaz de respirar");
}
}
class Humano : Mamifero
{
public Humano(string nombre) : base (nombre){} //Con esto ya
le habríamos pasado el parámetro a la superclase
public void Pensar()
{
Console.WriteLine("Puedo pensar");
}
}
```

#### Principio de sustitución........................................................................................................

Muchas veces no tenemos claro cuál debe ser la jerarquía de clases de nuestro programa, y
entonces se ideó este método para facilitarlo.

Consiste en preguntarse siempre “ **es siempre un** ”. Usemos el ejemplo anterior. ¿Un mamífero
es siempre un humano? No. ¿Y un humano es siempre un mamífero? Sí. Cuando la respuesta sea
afirmativa y la contraria negativa, es que debe haber una jerarquía, uno por encima del otro. De lo
contrario ambas clases deberán heredar de la misma y estar al mismo nivel de jerarquía.

¿Pero entonces cuál sabemos la que va por encima? Fijémonos en la pregunta afirmativa, el
humano está en la primera posición de la pregunta, por lo que eso indica que debe ir por debajo.

Si esto no ayuda, a mi me gusta pensar en sacar factor común. Tenemos varias clases, pero
ambas necesitan compartir algunos métodos y atributos. Pues lo que tenemos que buscar es sacar
esos comunes y extraerlos a una clase nueva de la que heredarán esos métodos comunes sin tener
que reescribirlos. Puede parecer una tontería para cosas pequeñas, pero cuando se trabaja con
aplicaciones enormes entonces se agradece que no tengamos que repetir código y tenerlo más
ordenado.

```
Siguiendo este principio, podemos hacer lo siguiente:
```
```
Mamifero animal= new Mamífero(“Marcos”);
Humano persona= new Humano(“Marcos”);
animal = persona;
persona = animal;
```
```
O bien lo siguiente:
```
```
Mamifero animal= new Humano(“Marcos”);
```
```
Entonces, ¿podemos hacer lo mismo con la superclase cósmica, la clase Object? Pues claro:
```
```
Object persona= new Humano(“Pepe”);
Object animal = new Mamifero (“Perro”);
```
La utilizad que tiene esto puede ser variada, pero principalmente puede ser utilizada para crear
matrices de distinto “tipo”. El único problema es que solo vamos a poder acceder a los métodos de
la superclase que estamos usando para la matriz.

### Polimorfismo.............................................................................................................................

Es la capacidad de un objeto de comportarse de muchas formas distintas. Entonces, viendo
esto, podremos crear matrices de distintas clases.


¿Qué pasa cuando creamos un método igual (que tenga el mismo nombre, devuelva el mismo
tipo de dato y tenga los mismos parámetros)en una superclase a otro método que esté en una
subclase? Lo que sucede entonces es que al llamar a ese método de la superclase estará oculto en
la subclase y sustituido por este nuevo. Para que quede más claro debemos añadir la palabra new.
Esto se llama **principio de ocultación**. Entendámoslo mejor con un ejemplo:

```
class Mamifero
{
private string NombreSerVivo;
public Mamifero (string nombre)
{
this.NombreSerVivo = nombre;
}
public void Respirar()
{
Console.WriteLine("Soy capaz de respirar");
}
}
```
```
class Humano : Mamifero
{
public Humano(string nombre) : base (nombre){}
public void Pensar()
{
Console.WriteLine("Puedo pensar");
}
new public void Respirar()
{
Console.WriteLine(Soy un humano que respira");
}
}
```
```
Al llamar al método:
```
```
Humano persona= new Humano ("Marcos");
persona.Respirar(); //Esto imprimirá "Soy un humano que respira"
y no "Soy capaz de respirar", porque este último método está
oculto.
```
Sin embargo, si queremos modificar o concretar el método (en lugar de ocultarlo) desde una
subclase, debemos declarar ese método como virtual, lo permite a todas las clases hijas a tener
ese mismo método sobrescrito, y que lleve la palabra override (y modificarlo, si es necesario).

```
class Mamifero
{
private string NombreSerVivo;
public Mamifero (string nombre)
{
this.NombreSerVivo = nombre;
}
public virtual void Respirar()
{
Console.WriteLine("Soy capaz de respirar");
}
}
```

```
class Humano : Mamifero
{
public Humano(string nombre) : base (nombre){}
public void Pensar()
{
Console.WriteLine("Puedo pensar");
}
public override void Respirar()
{
Console.WriteLine(Soy un humano que respira");
}
}
```
### Interfaces...................................................................................................................................

Es una clase especial que al heredar de ella se marcan un conjunto de directrices que deben
llevar las subclases. Funciona como una plantilla para determinadas clases. Por ello, solo se puede
declarar métodos, no añadir código.

Tiene como utilidad ordenar y, al trabajar en grupo, obligar, si crean una clase, a implementar
determinado comportamiento (sigue las convenciones de una clase normal).

```
Comentario que había en el video que a lo mejor os ayuda:
```
```
Cuando ya sabes un algo de programación y te aventuras a programar, por
ejemplo, en unity, descubrirás que usan C# y que en Unity ya hay hechas un montón
de clases, métodos...
```
```
Todo esto a sido programado por alguien y ese alguien se habrá dado cuenta, en
su momento, de que hay cierta clases que darían problemas si no tiene
obligatoriamente ciertos métodos.
```
```
Nada te impide programarlo todo desde cero, pero en Unity eso ya esta hecho,
precisamente para que no pierdas tiempo y puedas dedicar más tiempo a
desarrollar tu juego, además, si te pones a programarlo todo desde cero muy
probablemente te topes con muchos problemas que tendrás que ir resolviendo para
poder hacer algo en condiciones, en lo que logras resolver unos cuantos problemas
de estos otra persona igual va por su tercer juego terminado, que no digo que no sea
recomendable probar, por lo menos para aprender, entonces programando en unity
puede ser que sea una buena opción usar interfaces para ciertas cosas y estas te
obligaran a usar ciertos métodos. Esto de las interfaces tiene pinta de que es algo de
programadores para otros programadores.
```

#### Sintaxis..................................................................................................................................

```
interface NombreInterfaz //Funciona como una clase normal
{
TipoMétodo NombreMétodo(); //Método de ejemplo
}
```
Para implementar esta interfaz, debemos hacer como si la heredásemos, y si ya estamos
heredando, añadiremos una coma y luego el nombre de la interfaz. Y al hacer esto, debemos
implementar el método de la propia interfaz. Su nombre debe coincidir, así como el tipo de dato
que devuelve y el número de parámetros.

```
Se pueden implementar más de una interfaz (separada por comas).
```
Podemos tener varias interfaces con métodos iguales (igual nombre, tipo y parámetros), y el
método que hagamos de esa inferfaz responderá a esas dos. Para evitar esto podemos escribir el
nombre de la interfaz más un punto y el nombre del método.

```
interface interfaz {void metodo();}
interface interfaz2{void metodo();}
class clase : interfaz, interfaz2{void interfaz.metodo(){//} void
interfaz2.metodo(){//}}
```
#### Limitaciones de las interfaces..............................................................................................

- Los métodos no deben llevar modificadores de acceso (todos son public)
- No se puede definir atributos en una interfaz (variables).
- No se pueden definir constructores
- No se pueden definir destructores (ya hablaremos de eso en un futuro).
- No se pueden crear estructuras (clases, bucles, condicionales...)
- Otro problema de las interfaces es que no podemos llamar a los métodos que implementan
    directamente, porque son privados y no podemos cambiar los modificadores de acceso.
    Para poder llamar al método entonces debemos usar el principio de sustitución: creamos
    un objeto de esa interfaz y lo igualamos a otro objeto de la clase.
       Interfaz objeto = new ObjetoDeLaClase();
       objeto.MétodoInterfaz();


## Otro tipo de clases.........................................................................................................................

### Clase Anónima...........................................................................................................................

Se trata de una "clase" especial que no tiene nombre. Se utiliza únicamente para almacenar
atributos públicos que deben estar iniciados, no métodos. Estos atributos no pueden llevar un tipo
de datos ni ser _static_ , pues el compilador ya se encargará de eso. La sintaxis es la siguiente:

```
var ObjetoDeLaClase = new { //Atributos separados por , };
var persona = new { Nombre = "Magno", Edad = 15 };
```
Después, ese objeto funciona como cualquier otro, se pueden obtener los atributos y
modificarlos. El compilador entenderá también si otra clase anónima tiene el mismo número de
parámetros, del tipo de estos parámetros y su orden; entenderá que es la misma clase. Por ello
podemos hacer algo así:

```
var persona = new { Nombre = "Magno", Edad = 15};
var persona2 = new { ñd= "Nombre", fasd= 321};
//Los nombres no tienen porque ser iguales
persona = persona2;
```
### Clases Abstractas.......................................................................................................................

Una clase abstracta es aquella clase que tiene un mínimo de un método abstracto. Funciona
como una interfaz, pero es un poco más flexible, pues se acerca mucho más a ser una clase que ser
un a interfaz.

```
abstract class NombreClaseAbstracta {
//Código de la clase
ModificadorDeAcceso abstract TipoDeDato NombreMetodo();
}
```
Podemos crear métodos abstractos (vacíos, como en las interfaces, terminados en ;) que al
heredar esta clase se deben implementar, además de crear otros métodos con su propio código.

```
Al implementar sus métodos en la subclase debemos añadir el modificador override.
```
### Clases selladas (sealed classes).................................................................................................

Son aquellas clases que no pueden ser superclases y que no pueden tener subclases, es decir,
aquellas que no pueden heredar de otra. Se añade la palabra sealed delante de la declaración de
la clase:

```
sealed class NombreDeLaClase
```

```
{
//Código de la clase
}
```
También podemos añadir esta palabra a los métodos, para evitar que se sobrescriban.

```
ModificadorDeAcceso sealed TipoDato NombreMetodo()
{
//Código del método
}
```

## Properties.......................................................................................................................................

Se trata de una manera más sencilla de modificar los campos de clase encapsulados. Tenemos
que declarar una variable del mismo tipo que el campo (por convención es en mayúsculas) y unas
llaves. Dentro de estas, podemos incluir _gettters_ y _setters_ de la siguiente manera:

```
private int campoClase;
public int CAMPOCLASE
{
get
{
return campoClase;
}
set
{
//Value es el valor asignado a la variables
campoClase = value;
}
}
```
```
Con este método, podemos también incluir condiciones de manera muy sencilla:
```
```
private int campoClase;
//Este método se encarga de controlar la variable. En este caso,
no deja que sea menor que 10.
private int metodoControl (int a)
{
if (a < 10)
return 10;
else
return a;
}
public int CAMPOCLASE
{
get
{
return campoClase;
}
set
{
campoClase = metodoControl(value);
}
}
```
```
Se puede simplificar un poco esta sintaxis con el operador lambda:
```
```
public int CAMPOCLASE
{
get => campoClase;
set => campoClase = metodoControl(value);
}
```
```
También incluso se puede hacer una propiedad de solo escritura, eliminando el get :
```
```
public int CAMPOCLASE
```

```
{
set => campoClase = metodoControl(value);
}
```
Y viceversa, de solo lectura, eliminando el _set_ :

```
public int CAMPOCLASE
{
get => campoClase;
}
```

## Structs (estructuras)......................................................................................................................

Se trata de una estructura muy similar a las clases, pueden tener campos de clase, métodos,
constructores... La única diferencia que existe en cuando a sintaxis es cambiar class por struct
¿Pero que diferencia existe entre las clases y las _structs_? La memoria en la que se almacenan.

En la memoria _RAM_ distinguimos dos tipos, la memoria por valor ( **_stack_** ) y la memoria por
referencia ( **_heap_** ). En la primera se almacenan los tipos primitivos, y las clases en la memoria _heap_.
Pero existe una referencia a esa clase en la memoria _stack_.

```
Stack Heap
Tipos primitivos -
Referencia a la instancia de clase Instancia de clase
```
```
Pero ahora si creásemos una segunda instancia de la clase, se crearía lo siguiente:
```
```
Stack Heap
Referencia a la instancia de clase 1 Instancia de clase 1
Referencia a la instancia de clase 2 Instancia de clase 2
```
Y si igualamos una instancia con la otra, ambas referencias apuntarán a la misma instancia de
_heap_.

```
Stack Heap
Referencia a instancia de clase Instancia de clase
Segunda referencia a instancia de clase
```
¿Qué sucede entonces con las _structs_? Estas se almacenan directamente en la memoria _stack_ ,
pero a cada nueva instancia se duplica la _struct_ , en lugar de tener referencias. A la hora de
modificar los datos, se cambian solamente en la copia, no en la original.

```
Stack Heap
struct -
Instancia de struct (copia de struct ) -
```
Entonces si igualamos dos _structs_ y modificamos un valor, solo se modifica la copia; lo cual no
sucede con clases, después de igualarlas, si hacemos un cambio en una, también se realizará en la
otra instancia.


Otra diferencia es que las _structs_ son más eficientes y más rápidas porque la memoria _stack_ es
más rápida, porque los datos que guardamos se pierden más rápido que los de la memoria _heap_ ,
por lo que lo hace esta es ideal para guardar variables globales, objetos, etc, que estaremos
usando durante todo el programa. También _stack_ funciona como una pila **LIFO** (Last In, Fist Out), a
la hora de requerir más memoria, el primer valor que se almacenó se elimina para poder
almacenar el siguiente.

### Diferencias con las clases..........................................................................................................

- No permite la declaración del constructor por defecto.
- Los campos no se inician por el compilador, tienes que iniciarlos en el constructor.
- No existe la sobrecarga de constructores.
- No heredan de otras clases, pero sí implementan interfaces.
- Son selladas ( _sealed_ ).

### Cuando usar un struct...............................................................................................................

- Cuando se necesita trabajar con muchos datos: representación de primitivos, números
    complejos, puntos tridimensionales, matrices con muchos datos...
- Cuando las instancias no deban cambiar, que sean inmutables.
- Cuando la instancia tenga menos de 16 bytes.
- Cuando no necesites convertir un objeto ( _boxed_ ).
- Por razones de rendimiento.


## Enum o tipos enumerados.............................................................................................................

Se trata de un conjunto de constantes con nombre, y se usan para representar datos fijos en un
programa, de esta manera tenemos mejor control sobre los datos que se pueden estar usando. Se
pueden declara donde queramos (método, clase, _namespace_ ).

```
enum Nombre
{
nombre1, nombre2, nombre3 ...
};
enum Estaciones
{
PRIMAVERA, VERANO, OTOÑO, INVIERNO
};
```
Con esto definimos las estaciones, solo hay cuatro y representan esos valores, para evitar que
alguien cree una estación que no existe. Por defecto se asignan unos valores según su posición
(PRIMAVERA= 0, VERANO= 1, ...).

```
Para usar el enumerado se declara como una variable normal:
```
```
Estaciones alergia = Estaciones.PRIMAVERA;
```
Estamos obligados a darle algunos de los 4 valores: PRIMAVERA, VERANO, OTOÑO o INVIERNO;
ninguno otro. Si le quieres dar un valor nulo tienes que añadir_?_ :

```
Estaciones? alergia = null;
```
```
También podemos dar unos valores al enum.
```
```
Enum nivelAlergia
{
//Cuanto más alto el número, más alergia.
PRIMAVERA= 80, VERANO= 60, OTOÑO= 40, INVIERNO= 20
};
```
```
NOTA : Una constante de un enum (ej: Estaciones.OTOÑO) no es un string. Se está
cambiando implícitamente.
```
```
Si queremos usar su valor debemos hacer un casting.
```

## Destructores...................................................................................................................................

El **garbaje collector** , o **recolector de basura** es el encargado de limpiar la memoria de aquellas
variables o datos que no se están usando (al salir de un ámbito, por ejemplo) con el fin de liberar
recursos. Esto puede ser un proceso que da muchos errores, por lo que, en los lenguajes más
modernos, esto está automatizado.

De eso se encarga un destructor, será el código a ejecutar que llamará el recolector de basura
para eliminar un recurso en memoria, como puede ser: cerrar conexiones con Bases de Datos,
cerrar _Streams_ con ficheros, eliminación de objetos en matrices...

```
La siguiente clase lee un archivo:
```
```
using System;
using System.IO;
public class ManejoArchivos
{
StreamReader archivo = null;
int contador = 0;
string linea;
public ManejoArchivos (string direccion)
{
archivo = new StreamReader(direccion);
while ((linea = archivo.ReadLine()) != null)
{
Console.WriteLine(linea);
contador++;
}
}
public void mensaje()
{
Console.WriteLine($“Hay {contador} líneas”);
}
}
```
Como ves, estamos usando un _StreamReader_ , que si no se cierra, continuará consumiendo
recursos. Para eso creamos un método destructor de la siguiente manera:

```
~ManejoArchivos()
{
archivo.Close();
}
```
### Otras características..................................................................................................................

- Los destructores solo se usan para clases
- Cada clase solo puede tener un destructor.
- No se pueden heredar ni sobrecargar.
- Se invocan automáticamente, no se llaman.
- No tienen modificadores de acceso ni parámetros.


**_NOTA_** _: No es muy recomendable usar destructores, es mejor que el recolector de
basura trabaje, a no ser que sea completamente necesario usarlo._


## Programación genérica..................................................................................................................

Consiste en crear clases comodín que permiten utilizar cualquier tipo de objeto. La principal
característica es la reutilización de código, similar a la herencia, pero de esta manera se hace más
sencillo, gracias a un parámetro de tipo. Se usa de la manera siguiente:

```
Clase <tipo> nombre = new Clase <tipo>();
Clase <string> nombre = new Clase <string>();
Clase <File> nombre = new Clase <File>();
```
```
La sintaxis de la clase es muy simple:
```
```
public class Clase<T> //Una letra, por convención T
{
}
```
```
Ahora podemos utilizar T como cualquier tipo de dato.
```
### Añadir restricciones..................................................................................................................

En algunas ocasiones no queremos que nuestra clase genérica soporte ciertos objetos, entonces
podemos crear algunas restricciones usando interfaces. Todos los objetos que se soportarán
deberán implementar determinada interfaz:

```
public class Clase<T> where T: Interfaz
{
...
}
```

## Colecciones....................................................................................................................................

Se tratan de clases genéricas ( **_System.Collection.Generic_** ) que nos permiten almacenar elementos.
Estas, a diferencia de las matrices no tienen limitaciones, a cambio de mayor uso de recursos.
Permiten:

- Ordenar
- Añadir
- Eliminar
- Buscar
- Etc

### List<T>.......................................................................................................................................

```
Parecidos a las matrices pero con métodos adicionales que comentábamos.
```
```
//Se añade un elemento
lista.Add(T);
//Se obtiene un elemento en determinado índice
Console.WriteLine(lista[int]);
//Obtiene el número de elementos totales
lista.Count();
//Elimina el número de determinado índice
lista.RemoveAt(int);
//Para más información consultar la API de C#: Lists
```
### LinkedList<T>.............................................................................................................................

Son de acceso aleatorio, y por ello más eficientes. En una lista, todos los elementos se
encuentran a continuación del anterior, y al eliminar uno se tienen que desplazar el resto, lo que
consume muchos recursos.

_LinkedList_ es una lista de de nodos ( _LinkedListNode<T>_ ) con dos enlaces, uno al elemento
anterior y otro al siguiente. Al eliminar uno de ellos, solamente se tienen que cambiar el enlace del
elemento anterior y el siguiente.

```
//Se añade un elemento al principio.
lista.AddFirst(T);
//Se añade un elemento al final
lista.AddLast(T);
```

```
//Borra un elemento al principio o al final
lista.RemoveFirst();
lista.RemoveLast();
//Borra el primer valor que se especifica
lista.Remove(T);
//Se puede recorrer la lista con un simple foreach
foreach (T elemento in lista){...}
////TAMBIEN SE PUEDE TRABAJAR CON LOS NODOS/////
//Borra un nodo
lista.Remove(numeros.First());
//Pero también se pueden usar las propiedades de las LinkedList:
//Se crea una LinkedListNode al que se le pasa el primer
parámetro de nuestra lista, y mientras este no sea nulo, se
obtiene el siguiente.
for (LinkedListNode<T> nodo = lista.First(); nodo != null
nodo = nodo.Next)
{
//Devuelve el valor almacenado en el nodo
T elemento = nodo.Value();
Console.WriteLine(elemento);
}
//Para más información consultar la API de C#: LinkedLists
```
### Queue<T>..................................................................................................................................

Colas, siguen la estructura FIFO (First In, First Out – el primer elemento en entrar será el último
en salir).

```
//Para añadir un elemento a la cola
cola.Enqueue(T);
//Para sacar un elemento al principio de la cola
cola.Dequeue();
//Número de elementos de la cola
cola.Count();
//Para más información consultar la API de C#: Queues
```
### Stack<T>....................................................................................................................................

Pilas, siguen la estructura LIFO (Last In, First Out – el primer elemento en entrar es el último en
salir).

```
//Para añadir un elemento a la cola
pila.Push(T);
//Para sacar (borra y devuelve) un elemento al final de la cola
pila.Pop();
//o sin borrar
pila.Peek();
```

```
//Número de elementos de la cola
pila.Count();
//Para más información consultar la API de C#: Stacks
```
### Dictionary<Tkey, Tvalue>...........................................................................................................

Almacena elementos con estructura de clave-valor, se trata de una lista que almacena valores
(Tvalue) pero que se relaciona con un elemento clave (Tkey) en lugar de que sea específicamente
un índice entero. Cabe destacar que estas estructuras consumen muchos recursos.

```
//Creamos un diccionario
Dictionary<Tkey, Tvalue> diccionario = new Dictionary<Tkey,
Tvalue>();
//Para añadir un elemento
dicionario.Add(Tkey, Tvalue);
diccionario[Tkey] = Tvalue;
//Para sacar un elemento al principio de la cola
diccionario.Dequeue();
//Número de elementos de la cola
diccionario.Count();
//Para recorrer esta lista, se manejan dos valores:
foreach (KeyValuePair <Tkey, Tvalue> i in diccionario)
{
Console.WriteLine($"Nombre: {i.Key}, Valor: {i.Value}");
}
//Para más información consultar la API de C#: Diccionarys
```

## Delegados.......................................................................................................................................

Se trata de punteros, pero en lugar de apuntar a memoria, apunta a métodos. Se utilizan para
llamar a eventos o métodos de otras clases y ayuda a reducir el código.

```
delegate tipo nombreDelegado (argumentos);
//Puede llamar a métodos con esta estructura:
tipo nombreMetodo (argumentos)
//Ahora se instancia
nombreDelegado delegado = new
nombreDelegado(nombreClase.nombreMetodo());
```
```
class Principal
{
public static void Main (string[] args)
{
delegate void ObjetoDelegado();
//Objeto delegado apunta a MensajeHola
ObjetoDelegado delegado = new ObjetoDelegado
(MensajeHola.Hola);
//Llamamos al método del delegado
delegado();
//Cambiamos el método que se ejecuta
delegado = new ObjetoDeledado(MensajeAdios.Adios);
//Llamamos al nuevo método
delegado();
}
}
class MensajeHola
{
public static void Hola()
{
Console.WriteLine(“Hola”);
}
}
class MensajeAdios
{
public static void Adios()
{
Console.WriteLine("Adios");
}
}
```
¿Pero qué pasaría si tuviésemos que pasar parámetros? Simplemente tendríamos que añadirlo
a la declaración del delegado y al llamar al método, incluir el parámetro.

```
class Principal
{
public static void Main (string[] args)
{
```

```
delegate void ObjetoDelegado(string s);
//Objeto delegado apunta a MensajeHola
ObjetoDelegado delegado = new ObjetoDelegado
(MensajeHola.Hola);
//Llamamos al método del delegado
delegado("Marcos");
//Cambiamos el método que se ejecuta
delegado = new ObjetoDeledado(MensajeAdios.Adios);
//Llamamos al nuevo método
delegado("Marcos");
}
}
class MensajeHola
{
public static void Hola(string s)
{
Console.WriteLine(“Hola, ” + s);
}
}
class MensajeAdios
{
public static void Adios(string s)
{
Console.WriteLine("Adios, " + s);
}
}
```
### Delegados predicados...............................................................................................................

Se tratan de unos tipos de delegados que devuelven true o false. Se pueden usar para muchas
cosas, por ejemplo filtrar listas de valores según determinada condición.

```
Predicate <T> nombrePredicado = new Predicate <T>
(funciónDelegado);
```
En la clase _List<T>_ existe un método que devuelve una lista de los valores que cumplen
determinada condición dada por un _predicate_ : List<T>.FindAll(Predicate<T>);

```
static void Main (string[] args)
{
List<int> lista = new List <int>();
//Añade una matriz a la lista
lista.AddRange(new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9, 10});
//Declaramos el delegado predicado
Predicate<int> delegado) new Predicate<int> ();
List<int> listaPares = lista.FindAll(delegado);
foreach(int num in listaPares)
Console.WriteLine(num);
}
static void Pares(a, b) => a%b == 0;
```

### Expresiones lamba....................................................................................................................

Se tratan de una funciones anónimas, que no tienen nombre. Sirven para ejecutar funciones
que no necesitan ser nombradas o para simplificar el código. En el siguiente ejemplo, usamos un
delegado para llamar a esta función anónima en lugar de tener que crear una función en la clase
con un _return_ ...

```
//Parámetros entre paréntesis si tenemos más de 1
//Si la expresión tiene más de una línea va entre {}
parámetros => expresión
delegate int OperacionesMatematicas(int numero);
OperacionesMatematicas operacion = new OperacionesMatematicas(num
=> num*num);
Console.WriteLine(operacion(2));
```
```
Con esta expresión, podemos simplificar mucho el ejemplo anterior, el de los números pares:
```
```
List<int> numeros = new List<int>{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
numeros = numeros.FindAll(i => i % 2 == 0);
numeros.ForEach(numero => Console.WriteLine(numero));
```
También podemos usar los predicados para simplificar el código sin tener que declarar
funciones.

```
delegate bool Comparar(int num, int num2);
Comparar ComparaNumeros = (num1, num2) => num1 > num2;
if (ComparaNumeros(1, 2))
Console.WriteLine("Es mayor");
else
Console.WriteLine("Es menor");
```

## Expresiones regulares....................................................................................................................

Se trata de unas secuencias de caracteres que funcionan como un patrón de búsqueda: letras,
números, caracteres... Puedes consultar aquí esos caracteres y otros detalles como cuantificadores
aquí. Se usan para validación de formularios, búsquedas en BBDD (Bases de Datos), comprobación
de entradas de usuario...

```
Para ello usaremos las siguientes clases, métodos y propiedades.
```
- ( _System.Text.RegularExpressions_ ) Regex
- Match
- MatchCollection
- GroupCollection
- Método: Matches
- Propiedad: Groups
Ejemplo: Vamos a buscar determinadas secuencias en una cadena string.

```
//Frase en la que se buscará los caracteres
string frase = “Mi nombre es Marcos y mi número de teléfono es
939 94 48 91 y mi código postal es 12092”;
//Este es el patrón que se le da para que se busque. En este caso
se buscará una M.
string patron = “[M]”;
Regex r= new Regex(patron);
MatchCollection m= r.Matches(frase);
if (m.Count > 0)
Console.WriteLine("Se ha encontrado una M");
else
Console.WriteLine("No se ha encontrado una M");
```
```
NOTA : Algunas expresiones regulares requieren de escribir \, que se interpreta
como salto de línea, retroceso, etc. Para evitar eso, escribimos delante una @.
```
```
También podemos usar operadores como | o &.
```
