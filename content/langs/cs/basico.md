---
title: C# Básico
weight: 2

draft: true

extra:
    show_toc: true
    show_details: true
---

# Características

- Lenguaje líder de Windows y Microsoft.
- Permite crear de todo tipo: escritorio, web, móvil, videojuegos...
    ◦ **Aplicaciones de consola** : se ejecutan en la consola de comandos (CMD, símbolo
       del sistema, terminal, etc).
    ◦ **Aplicaciones de escritorio** : se ejecutan con una IGU (interfaz gráfica de usuario).
    ◦ **Aplicaciones web** : se ejecutan en un navegador.
- Muy similar a C++ y Java.
- Es actual.
- Distingue entre minúsculas y mayúsculas (CaseSensitive).
- Puedes añadir todos los espacios en blanco que quieras, pero no es necesario, como
    mucho un solo espacio para separar distintas partes y ordenarlo.

## Información Adicional
- **API**
- **C# en general**
- **https://docs.microsoft.com/es-es/**
- **https://docs.microsoft.com/es-es/dotnet/csharp/**
- **https://docs.microsoft.com/es-es/dotnet/standard/class-libraries**

# Programa Básico
Nuestro primer programa debe estar almacenado en un archivo **.cs** , y debe tener lo siguiente,
una **clase** con un método **_Main_** , que será lo primero que se ejecutará al iniciar el programa. Se
puede añadir un **namespace** , pero es opcional:

```cs
namespace NombreNamespace
{
//Clases
}
class NombreDeLaClase
{
static void Main()
{
//Código
}
}
```

También se puede añadir entre los paréntesis del _Main_ una matriz que almacenará los datos
que se pasen por parámetros al ser ejecutado:

```
string[] NombreParametros
```
#### Como ejecutar un programa C#..................................................................................................

Para poder ejecutar estos programas debemos compilarlos, es decir, convertir el código fuente
( _.cs_ ) en código máquina. Para ello necesitamos un compilador, que normalmente viene ya con
Windows en la dirección (siendo vX.X.XXXX la versión que tienes tú, compruébala visitando esa
dirección):

```
C:\Windows\Microsoft.NET\Framework\vX.X.XXXX
```
Entonces, para compilarlo, debemos usar un programa de esa carpeta llamado **csc** , pero
debemos ubicarnos en la carpeta del archivo fuente desde el _CMD_ .Para poder llamar a ese
programa, podemos escribir toda su dirección cada vez que compilemos o añadir esa dirección a
las variables del entorno, en concreto a _PATH_ que guardará esa dirección y solo tendremos que
escribir el comando siguiente:

```
csc.exe NombreArchivo .cs
```
Si el código está correcto, debería crearse un nuevo archivo **_.exe_** con el mismo nombre que el
archivo fuente. Ya puedes ejecutar tu código. Enlace para más información.


**PD** : Puede que si tu aplicación funciona en consola, al abrir el archivo fuera de esta, la consola
no esté abierta por mucho tiempo... Por eso te recomiendo añadir un mensaje de aviso que el
programa terminó y que pulse _ENTER_ para cerrar, además de añadir la línea de código siguiente al
final de todo:

```
Console.ReadLine();
```
#### ¿Qué es un bloque?....................................................................................................................

Es un espacio delimitado por **{ }** , y tiene un **ámbito** /contexto/alcance, es decir, las variables y
objetos que se declaren ahí dentro no existirán fuera de ese bloque o ámbito (para más
información ver el vídeo)

A cada nuevo bloque, se debe **indentar** su código que vaya dentro, es decir, aplicarle una
sangría para facilitar su legibilidad. No es obligatorio pero es una **convención**.

```
bloque 1
{
······bloque 2
{
bloque 3
{
·······//Código
}
}
}
```
```
El código está formado por sentencias, acabadas en ; excepto aquellas que requieran un bloque.
```
```
sentencia1;
sentencia2;
sentencia3;
```
Las convenciones de un lenguaje de programación son aquellas reglas que deberíamos seguir
en todo momento para facilitar la comprensión del código. En este archivo se describirán algunas,
pero para más información visitar este link.

#### Tipos de clases............................................................................................................................

- **Clases propias** : las que creamos nosotros.
- **Clases predefinidas** : Ya las da el propio lenguaje (biblioteca de clases, API). Por eso hay que
    indicar de que _namespace_ pertenece, usando using. Si no, deberás escribirlo todo el rato:
       System.Console.WriteLine("Hola Mundo");
       System.Console.WriteLine("Que tal?");

```
o bien
```

```
using System;
Console.WriteLine("Hola Mundo");
Console.WriteLine("Que tal?");
```
#### Comentarios................................................................................................................................

Un **comentario** es un recordatorio, un aviso, nota o un mensaje que dejas en código para
explicar que es lo que hace a ti o otros compañeros con lo que estáis programando. El ordenador
no los lee, no influyen en el programa. Por este motivo, puedes decir al ordenador que no ejecute
algunas partes del código que no podría funcionar bien. Existen dos tipos:

- El comentario de una línea es comienza a partir de //
- El comentario de varias líneas va entre /* y */
    //Comentario de una línea
    /*
    * Comentario de varias líneas
    */

##### Comentarios TODO.................................................................................................................

Los comentarios TODO son aquellos comentarios que indican dónde nos quedamos
programando en la última sesión, se trata como un marcador cuando tenemos archivos muy largos
(desde VS se pueden buscar estos comentarios mucho más rápido: Ver>Lista de Tareas /// Ctrl +
T?)

```
//TODO: Explicación
```

### Tipos de Datos..................................................................................................................................

Los tipos de datos son las diferentes posibilidades que tenemos para almacenar datos en un
programa. Se usan principalmente **int** , **long** , **float** , **double** , **bool** , **char** , **string** ,
**enumerados** y **clases** / **estrucuras**.

- **Por referencia** : punteros (almacenan la dirección de memoria del verdadero dato – Esto es
    más avanzado).
- **Por valor** :
    ◦ **Primitivos** :
       ▪ **Enteros** : valor numérico sin decimales
          - **Con signo** : Distingue entre positivos y negativos
             ◦ **sbyte** : [-127, 128] (8 bits de RAM)
             ◦ **short** : [-32 768, 32 767] (16 bits de RAM)
             ◦ **int** : [-2 147 483 648, 2 147 483 647] (32 bits de RAM)
             ◦ **long** : [-9 223 372 036 854 775 808, 9 223 372 036 854 775 807] (64 bits)
          - **Sin signo** : No hay diferencia entre positivos y negativos
             ◦ **byte** : [0, 255] (8 bits de RAM)
             ◦ **unshort** : [0, 65 535] (16 bits de RAM)
             ◦ **uint** : [0, 4 294 967 295] (32 bits de RAM)
             ◦ **ulong** : [0, 18 446 744 073 709 551 615] (64 bits de RAM)
       ▪ **Reales** : valor numérico con decimales (es posible que los intervalos estén mal)
          - **float** : hasta 9 dígitos [+-1,5 · 10-45, +- 3,4 · 1038] (4 bytes de RAM)
          - **double** : hasta 17 dígitos [+-5 · 10-324, +-1,7 · 10308] (8 bytes de RAM)
          - **decimal** : hasta 29 dígitos [+-10] (128 bytes de RAM)
       ▪ **Booleanos** : Operaciones lógicas, solo dos estados posibles: encendido/apagado,
          True/False, 1/0...
          - **bool** : 1bit
       ▪ **Char** : Carácter (16 bits)
    ◦ Enumerados
    ◦ Estructuras/Clases
       ▪ string o String (cadenas de texto – Siempre entre "")
       ▪ ...


### Variables...........................................................................................................................................

Se trata de un e spacio en la memoria _RAM_ donde se almacenará un valor que podrá cambiar
durante la vida del programa y borrarse cuando este acabe. En cuestión de programación, es como
decirle un nombre al ordenador y que lo relacione con ese dato. Debemos ajustar lo máximo
posible el valor al rango útil para aprovechar la memoria al máximo.

#### Convenciones de las variables....................................................................................................

- No es recomendable hacer variables que se diferencien por un carácter o por
    mayúsculas o minúsculas.
- El nombre de la variable siempre empieza por minúscula (no es obligatorio, es
    convención).
- Si el nombre de la variable ocupa varias palabras, la segunda palabra sepárala
    poniéndole una mayúscula (CamelCase).
- No utilizar notación húngara, es decir, que en su nombre lleve su tipo.

#### Declarar e inicializar variables.....................................................................................................

¿Qué es **declarar** una variable? Es reservar espacio en la memoria del ordenador para
almacenar datos.

```
¿Qué es iniciar / inicializar una variable? Darle un valor a la variable para que lo almacene.
```
Se puede declarar e inicializar en sentencias distintas no consecutivas, aunque se puede hacer
en la misma línea.

```
No se puede usar una variable que no se ha iniciado.
```
El flujo de ejecución de un programa es lineal, se ejecutan las cosas que hay primero escritas
antes que las que después. Por este motivo, n o se puede usar una variable antes de inicializarla (e l
primer programa que se ejecuta es el bloque _Main_ ).

Esto significa que primero debemos declarar una variable, luego inicializarla y ya podremos
utlilizarla; de orden de arriba a abajo.


##### ¿Cómo hacerlo?......................................................................................................................

```
Declaración : se escribe el tipo de dato y su nombre:
```
```
int edad ;
```
```
Iniciación : nombre de la variable, operador de asignación ( = ) y el valor a guardar:
```
```
edad = 28;
```
```
O bien todo junto:
```
```
int edad= 28;
```
```
También puedo declarar varias a la vez:
```
```
int var1 , var2 , var3 ;
```
```
o inicializarlas:
```
```
var = var1 = var2 = 3;
```
```
O bien todo junto
```
```
int var1= 10, var2= 43, var3= 4;
```
Si usas, en lugar de darle un tipo de valor concreto, la palabra reservada var puede tomar el
valor más óptimo (por ahora no tiene aplicaciones, ya lo veremos próximamente).

#### Constantes...................................................................................................................................

Estas funcionan como las variables, cuya diferencia es que su valor no puede cambiar durante la
ejecución del programa, no se les puede dar un nuevo valor.

Primero hay que usar la palabra reservada const, luego el tipo de valor, el nombre y se
inicializa; se tiene que declarar y inicializar en la misma línea:

```
const int VAR= 37;
```
```
Por convención se escriben siempre sus nombres en mayúsculas.
```

#### Operadores Aritméticos............................................................................................................

- **Suma** (se usa también para sumar cadenas de texto, también llamado **concatenar** ): +
- **Resta** : -
- **Multiplicación** : *
- **División** : /
- Residuo, **resto** , módulo: %
- **Incremento** , suma 1 valor: ++
- **Decremento** , resta 1 valor: - -
    Pueden ir como sufijo (primero devuelve valor, luego opera) o como prefijo (primero
    opera, y luego devuelve el valor).
- **Incremento** de x: += x
- **Decremento** de x: -= x

#### Conversiones de variables.........................................................................................................

##### Interpolación de Strings.......................................................................................................

En lugar de usar el operador para concatenar, se puede escribir **$** antes del _string_ y entre llaves
escribir el nombre de la variable a concatenar:

```
$”tienes una edad de {edad}”
```
##### Conversión explícita o casting..............................................................................................

Se trata de cambiar un valor de un tipo a otro. Se hace escribiendo el tipo de dato al que vamos
a cambiar entre paréntesis. En caso de pasar de un número decimal a entero realiza un
truncamiento, es decir, no redondea; deja la parte entera tal cual.

```
int var1= (int) 3.7; //Se guardará 3
```
##### Conversión implícita.............................................................................................................

Se puede igualar una a la otra con variables de la misma rama, es decir, reales con reales,
enteros con enteros, etc.

```
int var1= 574239085720349889475092 //Este número es un long
```
##### Conversión de texto a número.............................................................................................

Se escribe el tipo de dato al que vamos a pasar y entre los paréntesis se escribe el texto a
convertir (si no es posible hacerlo, salta una excepción – Ya lo veremos más adelante) .Parse();

```
int var1= int.Parse("37");
```

### Métodos.........................................................................................................................................

Son un grupo de sentencias o instrucciones a las que se les da un nombre identificativo que
realizan una tarea en concreto en un momento determinado, cuando el método sea llamado (de lo
contrario nunca se ejecutará). También sirve para no tener que repetir código, se crea un método,
y cuando se necesite, en lugar de escribirlo otra vez, se llama a dicho método. Se puede le llamar
todas las veces que queramos. Su sintaxis es:

- **Se escribe el tipo de dato que va a devolver** (en el caso de no devolver nada se escribe
    void), no tiene porque ser primitivo.
- Luego se indica el **nombre** del método acompañado de unos **paréntesis**
    ◦ Se pueden incluir **parámetros** (opcional), que son variables necesarias para el
       funcionamiento del método. Por eso, siempre que llamemos a un método con
       parámetros, debemos incluir los datos necesarios.
    ◦ El primer valor que le demos corresponderá con el primer valor declarado en el método
       y así.
    ◦ Estas se separan por comas.
    ◦ Solo necesitan ser declaradas, ya se inicializarán cuando se llame al método. Pero
       también se les puede dar un valor por defecto, que este no necesita ser rellenado al
       llamar al método. Este parámetro pasa a ser opcional (funciona como una sobrecarga),
       y debe ir escrito siempre a continuación de los obligatorios.
    ◦ No tienen porque ser del mismo tipo.
- **Las llaves del método**. En algunos casos, no es necesario. Se puede escribir el operador =>
    y escribir a continuación el valor que se va a devolver. Solo funciona si solo tiene una
    sentencia.
- En el interior de esas llaves se escribe el código de su tarea.
- Para llamar al método, debemos escribir su nombre con los paréntesis, y en ellos incluir los
    parámetros si fuesen necesarios.
       _NombreDelMétodo_ ( _YoSoyUnParámetro_ );

Si el método no es _void_ , es necesario que se escriba return (siempre debe ser la última
sentencia del método) y a continuación el valor correspondiente al método que se devolverá
(devolver se refiere a cuando se escribe el método, este puede ser usado como una variable que
tiene un valor).

Cuando llamamos a un método, el ordenador busca ese método hasta que lo encuentra y no
realiza ninguna otra tarea. Cuando haya acabado de ejecutar el método, regresará a donde estaba
y continuará con el flujo normal del programa.


```
Todo método debe ir siempre dentro de una clase.
```
```
TipoDeDato NombreDelMétodo ( Parámetros )
{
//Cuerpo del Método
}
void ImprimeHola()
{
Console.WriteLine(“Hola”);
}
```
```
int Suma (int var, int var2)
{
return var1 + var2;
}
---------
int Suma (int var1, int var2) => var2 + var2;
```
_Ejemplo_ : Un método con parámetros y que devuelva un valor puede funcionar como una
máquina expendedora. Los parámetros son los botones que pulsamos para tener el producto (es
decir, el resultado) que queremos, y dejamos a la máquina trabajar. En este momento hemos
llamado a nuestro método. Una vez que acaba, nos deja en la bandeja el producto que hemos
pedido (gracias al código _return_ ) y tendremos que recogerlo (imprimirlo en la consola, guardarlo
en una variable, etc).

Si nos paramos a pensar en el código que siempre debe tener nuestros programas (visto en la
página 1), este es un método que se encuentra dentro de una clase, y no devuelve nada porque es
_void_ , además de tener un parámetro llamado _args_ (no te preocupes por los corchetes por ahora,
y tampoco por el _static_ ).

**IMPORTANTE** : Si llamamos un método desde otro que sea _static_ , nos saltará un error, debido
a cosas que por ahora no comprendemos. Para solucionar eso, debemos escribir static antes de
la declaración del método:

```
static void Main (string[] args)
{
ImprimeHola();
}
static void ImprimeHola ()
{
Console.WriteLine ("Hola");
}
```
#### Sobrecarga de métodos............................................................................................................

Es cuando tienes en el mismo ámbito (clase) dos métodos con el mismo nombre. Estos deben
diferenciarse en sus parámetros: o bien en su tipo o por su número de parámetros (no influye el
nombre del parámetro).


```
int suma(int s1, int s2)=> s1 + s2;
int suma(int s1, int s2, int 3)=> s1 + s2+ s3;
double suma (double s1, double s2)=> s1 + s2;
```
Al llamar al método suma, el ordenador buscará el que mejor se ajuste a los parámetros.

```
//Se ejecutará el primero porque los parámetros son dos int.
suma(37, 17);
//Se ejecutará el segundo porque los parámetros son tres int.
Suma(37, 17, 317);
```

### Condicionales.................................................................................................................................

```
Son aquellas estructuras que ejecutan determinado código según determinada condición.
```
#### Variables Booleanas..................................................................................................................

Es aquel valor que solo puede tomar dos valores, **true** o **false**. Funciona como una variable
normal:

```
bool haceFrio= false;
```
#### Operadores Booleanos..............................................................................................................

- **Igual** que: ==
    Es mucho mejor usar el método:
       String.Compare(StringAComparar1, StringAComparar2, IgnorarMayúsculas);
    El último parámetro es booleano, si es verdadero, no tendrá en cuenta si hay mayúsculas o
    minúsculas) para comparar strings. Devuelve 0 si las cadenas son iguales y 1 si no lo son).
- **Diferente** que: !=
- **Menor/mayor** que: < / >
- **Menor/mayor o igual** que: <= / >=
- Operador **negación** (alterna de true a false y viceversa):!
- **Y lógico** (todas deben de ser true para que devuelva true): &&
- **O lógico** (si una sola es true devolverá true): ||

```
IMPORTANTE : Estos últimos siguen el flujo de ejecución.
```
- El operador negación solo afecta a la variable inmediatamente después.
- Si el o lógico encuentra un _true_ , no sigue evaluando la expresión.
- Si el y lógico encuentra un _false_ , no sigue evaluando la expresión.

#### If................................................................................................................................................

Se escribe con la palabra reservada if. Las llaves se pueden omitir si solamente tenemos una
línea de código. Si la condición es _true_ , el código entre las llaves se ejecuta, si no, no.


```
if (condición)
{
//Código
}
```
```
Podemos añadir también una cláusula que se ejecute cuando la condición sea false con else
```
```
if (condición)
{
//Código que se ejecuta si la condición es igual a true
} else
//Código que se ejecuta si la condición el igual a false
{
```
También podemos añadir otras posibilidades combinando estas dos palabras (se pueden añadir
tantos else if como queramos):

```
if (condición1)
{
//Código para cuando condición1 es igual a true
}
else if (condición2)
{
//Código para cuando condición2 es igual a true
}
else
{
//Código para cuando ninguna de las condiciones se cumple
}
```
```
Podemos también incluir en estas estructuras otros ifs en su interior.
```
### Switch........................................................................................................................................

```
switch (ExpresiónDeControl){
case ExpresiónConstante:
//Código si ExpresiónDeControl == ExpresiónConstante
case ExpresiónConstante2:
//Código si ExpresiónDeControl == ExpresiónConstante
...
default:
//Código si no se cumple ninguna de las anteriores
}
```
- La _ExpresiónConstante_ no se puede repetir.
- Solo se puede evaluar tipos de datos **int** , **char** y **string** ( _float_ y _double_ deben utilizar _if_ ).
Si el case tiene código, debemos añadir la sentencia break; al final de cada case para que una
vez que se ejecute ese código, no siga evaluando el resto de posibilidades. Esta palabra reservada
rompe con el flujo de ejecución y sale del ámbito en el que se encuentra, se utiliza al final de este
en bucles y en esta clase de estructuras.


## Bucles.............................................................................................................................................

Son estructuras de control de flujo cuya función es repetir determinadas líneas de código un
número determinado o indeterminado de veces.

```
Esto nos permite ahorrar tiempo y manejar Arrays y datos grandes fácilmente.
```
- **Determinados** (se ejecutan un número concreto de veces):
    ◦ For
    ◦ For-Each
- **Indeterminados** (se ejecutan un hasta que determinada condición tome un valor concreto):
    ◦ While
    ◦ Do-While

### Determinados............................................................................................................................

#### While....................................................................................................................................

**= mientras** : Se está repitiendo mientras la condición sea cierta. Se utiliza cuando no sabemos
cuantas veces se repetirá. También se pueden omitir las llaves si solo hay una línea.

```
while (condición)
{
//Código a repetir
}
```
#### Do While...............................................................................................................................

Funciona igual que el _while_ normal, con una diferencia. Este se ejecutará al menos una vez, es
decir, primero ejecuta el código a repetir y posteriormente evalúa si debe continuar.

```
do
{
//Código a repetir
} while(condición);
```
### Indeterminados.........................................................................................................................

#### For.........................................................................................................................................

```
Funciona igual que el while , cuya diferencia es la estructura:
```
- La primera cláusula solo se ejecuta una vez y ahí se debe inicializar una variable que será el
    contador del bucle.


- A continuación se escribe la condición que detendrá el bucle cuanto sea false. Esta se
    comprueba antes de ejecutar el código en el interior de esta estructura.
- Y por último un espacio para modificar la variable que se ejecutará al final del código a
    repetir, de lo contrario la condición nunca cambiará y el bucle es infinito.
       for (inicialización; condición; variación)
       {
          //Código a repetir
       }

```
//Escribe hola 10 veces
for (int a= 0; a <= 10; a++)
{
Console.WriteLine("Hola + " a);
}
```
#### FOR-EACH.............................................................................................................................

Es un tipo de un bucle _for_ cuya función es recorrer y extraer la información de determinada
matriz (ver la parte de matrices).

La sintaxis es la siguiente, se inicia una variable (llamada **iterador** ) del mismo tipo de la matriz
que vamos a recorrer, la palabra in, y por último el nombre de dicha matriz.

El iterador irá tomando los valores que contiene la matriz en la posición en la que se encuentra
el bucle, y podemos usar esa variable para hacer los cambios que queramos a la matriz.

```
foreach (TipoDatoMatriz NombreIterador in NombreMatriz)
{
//Código a repetir
}
```

# ARRAYS O MATRICES

Son estructuras de datos que contienen múltiples valores del mismo tipo, en lugar de solo
almacenar uno. Se utilizan para almacenar valores que tienen relación entre sí.

Se declara como una variable normal, pero se añaden unos corchetes después del tipo de dato
(también puede ser un objeto, pero después se debe iniciar llamando al constructor). Y para
iniciarlo, usamos el operador new, repetimos el tipo de dato con los corchetes, además de en su
interior se escriba la longitud de la matriz.

```
TipoDato[] NombreMatriz = new TipoDato[NúmeroMáximoDeValores];
```
```
También podemos iniciarlas dándole todos los valores iniciales:
```
```
TipoDato[] NombreMatriz = {//Lista de datos};
```
Para poder trabajar con los valores almacenados, se utilizan los índices (siempre empiezan por
0, no en el 1, por lo que el índice máximo menos uno hace referencia a la última posición).

```
NombreMatriz[Índice] = //Valor;
```
Si no se les dan ningún valor, guardarán el valor por defecto que dependerá del tipo de dato (en
el caso de _int_ será 0).

Es un error común intentar usar una posición de la matriz que no exista, así que hay que tener
cuidado con estas cosas, si no saltará una excepción de tipo _IndexOutOfRangeException_.

También se pueden usar como parámetros a un método o incluso devolverlos. Sin embargo, la
matriz original resultará modificada, no solo el parámetro.

## MATRIZ IMPLÍCITO

En estos tipos de matrices no es necesario indicar un tipo de dato, ni tampoco dar un valor
máximo de posiciones. Su sintaxis es la siguiente:

```
var NombreMatriz = new[] {//Lista de valores};
```
Los valores pueden ser de tipos distintos, pero solo de entre reales y enteros, no podemos
mezclarlos con strings.


#### MATRICES DE CLASES ANÓNIMAS

```
También se pueden crear matrices de clases anónimas de la siguiente manera:
```
var personas = new []
{
new {Nombre = "Juan", Edad = 12},
new {Nombre = "María", Edad = 49}
};
personas[0].Nombre= "Diana"; //Así se pueden trabajar con ellos
La única condición es que todas las clases anónimas sean iguales o compatibles, es decir, que su
número y tipo de atributos de las clases anónimas sean los mismos.

#### MATRICES Y BUCLES FOR

Para recorres estas matrices es muy común usar este tipo de bucles para poder operar con
facilidad. La sintaxis puede ser la siguiente (hay muchas maneras diferentes de hacer el mismo
bucle):

```
for (int i= 0; i < NúmeroDePosicionesMatriz; i++){}
for (int i= 0; i <= ÚltimaPosición; i++){}
for (int i= 0; i <= NúmeroDePosicionesMatriz – 1; i++){}
```
También, es recomendable utilizar la propiedad .Length para obtener el número de posiciones
de la matriz, porque si modificamos la matriz también deberemos modificar todos los bucles.


# COMO LEER UN ARCHIVO .TXT

System.IO.StreamReader archivo = null;
try
{
string linea;
int contador = 0;
string ruta= @"C:\Users\...\... .txt";
//La @ se pone para indicar que es una dirección de
archivo
archivo= new System.IO.StreamReader(ruta);
while((linea = archivo.ReadLine()) != null)
{
Console.WriteLine(linea);
contador++;
}
}
catch (Exception e)
{
Console.WriteLine("Error: " + e.Message);
}
finally
{
if (archivo != null)
archivo.Close();
}


# CLASES Y MÉTODOS IMPORTANTES

- Para escribir en la consola: Console.WriteLine();
    Puede llevar argumentos para concatenarlos según su índice:
       //En {0} va la variable nombre, y en {1} la variable apellido
       Console.WriteLine("Hola, {0} {1}, encantando", nombre, apellido);
- Para obtener datos de la consola: Console.ReadLine();
- Número aleatorio: class Random
- Método (devuelve número "aleatorio"): ObjetoRandom.Next(min, max);
- Funciones matemáticas avanzadas: class Math
- Raíz cuadrada: Math.Sqrt(double);
- Redondear: Math.Round(double);
- Potencia de un número (1º: Base, 2º:Exponente): Math.Pow(double, double);
- class int
- Método para conocer su rango máximo: .MaxValue();
