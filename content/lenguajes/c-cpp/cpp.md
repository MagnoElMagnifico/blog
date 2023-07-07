---
title: C++ Básico
description: >
    Introducción al lenguaje de programación C++
date: 2023-06-24
weight: 0 # temporal
draft: true
---

{{< block "Recursos" >}}
El mejor recurso para aprender a programar es sin duda
[learncpp.com](https://www.learncpp.com) (en inglés).
{{< /block >}}

# Las librerías

Una librería es una colección de funciones que podemos implementar en nuestro
código para realizar diferentes operaciones.

Cabe destacar que tenemos algunas librerías a nuestra disposición integradas en
el propio lenguaje, **la librería estándar de C++**, y dado que este lenguaje de
programación es una extensión de C, también podemos usar las librerías de
C aquí. Por lo normal sus nombres empiezan por la letra c (ejemplo: _cmath_
, _cstdlib_ ). Otras están disponibles en nuestro sistema operativo (tenga
cuidado con estas, pues si intenta usar el programa en otro sistema operativo,
no se encontrarán y saltará un error), o si no, podemos crearlas nosotros.

Su extensión puede ser la `.h` (pertenecientes al lenguaje C, pero también
válidas aquí) o `.hpp`, aunque en casos raros podemos declararla como un archivo
de código fuente normal `.cpp`.

Para incluir una librería, usaremos las [directivas de
preprocesador](#el-preprocesador):

```cpp
#include <librería.h>
```

Aquí estaríamos incluyendo una librería llamada `librería.h`. La que estaremos
usando con más frecuencia es la llamada `iostream` ( _Input and Output Stream_
o flujo de entrada y salida). Con ella podremos mostrar mensajes por consola
y leer esta misma, entre otras cosas.

Si es una librería creada por nosotros y se encuentra en nuestra carpeta donde
tenemos nuestros archivos del programa, debemos usar las comillas dobles en
lugar de los símbolos de mayor o menor. Además de eso, podemos importar
librerías que se encuentren en otras carpetas indicando su dirección:

```cpp
#include "___/___.h"
```

{{< block "Nota" >}}
Para más información sobre esto, puede consultar el post sobre [Instalación
y compilación de C++]({{< relref "compilacion" >}})
{{< /block >}}

## La función principal

Incluiremos ahora la función principal. Esta es de tipo entero (`int`) y debemos
llamarla `main`.

```cpp
int main() {
    ...
}
```

Como es de tipo entero, es aconsejable que se devuelva un valor de este mismo
tipo al final de la función, para que el sistema operativo determine si el
programa ha terminado exitosamente. Normalmente se devuelve el número 0, que
indica que el programa ha terminado con éxito, y 1 cuando ha surgido algún
error. También podemos escribir `EXIT_SUCCESS` o `EXIT_FAILURE` (de la librería
`iostream`). Recuerde además que toda sentencia de C++ debe de estar acabada en
un punto y coma (`;`).

```cpp
int main() {
    return EXIT_SUCESS;
}
```

Esta es la otra alternativa de función principal, la que incluye parámetros de
consola:

```cpp
int main (int __, char * __[]) { ... }
```

# Sentencias y bloques

Todas las instrucciones en C++ deben terminar en un `;` como se ha comentado
anteriormente. Cada una de estas representa una sentencia:

```
sentencia1;
sentencia2;
sentencia3;
...
```

Al principio esto puede parecer un poco tonto, pero ayuda al
[compilador](#compilar) a entender mejor el código. Además, se pueden hacer
cosas como esta:

```
sentencia1; sentencia2; sentencia3;
```

Si no se usasen los `;` sería muy difícil determinar donde acaba cada
instrucción.

Además de las sentencias, se disponen de bloques, que son una agrupación de
sentencias:

```
{
    sentencia1;
    sentencia2;
    sentencia3;
}
```

Posteriormente se verá como estos pueden ser útiles, pero generalmente ayuda
a agrupar y ordenar el código.

{{< block "Nota" >}}
No es obligatorio, pero es particularmente conveniente añadir unos espacios
delante de cada sentencia dentro de un bloque, para que quede mucho más claro
que estas están dentro de dicho bloque. Esto de llama **identación**.
{{< /block >}}

# Comentarios

Los comentarios funcionan igual que en otros lenguajes de programación, tenemos
dos tipos:

```cpp
// Esto es un comentario de una línea

/*
  Esto es un
  comentario de
  varias líneas
*/
```

# Código básico

Para imprimir algo en pantalla o en la consola (habiendo incluido previamente la
librería `iostream`) escribiremos lo siguiente:

```cpp
std::cout << "Hola Mundo" << std::endl;
```

Como puede ver, usamos una función llamada `cout` dentro de un
[`namespace`](#namespaces) llamado `std`, concatenamos (juntamos) los contenidos
con el operador `<<` (significa mueve _esto_ hacia _eso_ ) con el `endl` (sería
equivalente a escribir `\n` , un salto de línea). También podemos hacerlo con
una variable.

```cpp
std::cout << "El número es " << num << std::endl;
```

Para pedir datos por consola al usuario mediante la entrada estándar, debemos
escribir lo siguiente:

```cpp
std::cin >> num;
```

Lo que escriba el usuario se almacenará en la variable `num`. Incluso podemos
pedir dos datos separados por espacios:

```cpp
std::cin >> num1 >> num2;
```

Disponemos también de otros métodos de entrada menos utilizados en C++:

```cpp
cin.get()
getline(cin, string, __)
```

Para obtener un número aleatorio debemos usar la librería `ctime` y `cstdlib`:

```cpp
srand(time(NULL));
int numRandom = num_min + rand() % (num_max + 1 – num_min);
```

# Namespaces

Los _namespaces_ son maneras para dividir y modularizar el código. Además, como
ventaja, si existen variables o funciones con el mismo nombre que no se
confundirán entre estas dos. Podemos crearlos muy fácilmente:

```cpp
namespace Nombre {
    ...
}
```

Y para acceder al interior de su código usa los dobles dos puntos (`::`):

```cpp
namespace Ejemplo {
    void foo() {
        std::cout << "Hola Mundo!" << std::endl;
    }

    int bar = 0;
}

Ejemplo::foo();
std::cout << Ejemplo::bar << std::endl;
```
Pero si resulta muy pesado escribirlo todo el rato, podemos hacer lo siguiente
y usar el método normalmente:

```cpp
using namespace Ejemplo;
using namespace std;
cout << var << endl;
foo();
```

Pero tenga cuidado ahora al nombrar sus variables y métodos...

# Compilar

{{< block "Nota" >}}
Aquí se discutirá cómo funciona la compilación en C++ y qué etapas tiene. Para
ver cómo compilar con comandos, revise la
[Instalación y Compilación de C++]({{< relref "compilacion" >}}).
{{< /block >}}

C++ es un lenguaje compilado, lo que significa que tenemos que pasar un proceso
llamado compilación para ejecutar nuestro programa.

Partimos de un archivo de código fuente C++, que es simplemente un archivo de
texto. Sin embargo, el ordenador no puede ejecutar las instrucciones
directamente, dado que este solo entiende instrucciones máquina en binario.

Por tanto, el compilador es un traductor que convierte un archivo de texto plano
en un binario ejecutable por el ordenador.

Exiten 3 fases de compilación tradicionales:

- Preprocesado
- Compilado
- Enlazado

## El preprocesador

El preprocesador recibe un fichero de entrada y lo transforma en uno de salida
aplicando las directivas incluidas en el fichero de entrada. Estas directivas
permiten incluir código de otros ficheros (habitualmente archivos de cabecera),
substituir unos textos por otros (esto son las macros) y elegir si se incluye
o no cierto código (esto es la compilación condicional).

{{< block "Es decir" >}}
El preprocesador simplemente elimina, copia y pega código C++.
{{< /block >}}

El preprocesador solo entiende las directivas de preprocesado, las que empiezan
por `#`, y es completamente independiente del resto de la sintaxis de C++.

El estándar de C++ define las siguientes directivas:

- `include`
- `define` `undef`
- `if` `ifdef` `ifndef` `else` `elif` `endif`
- `line`
- `error`
- `pragma`

Para una explicación más detallada mira el post sobre [el Preprocesador].

[el Preprocesador]: {{< relref "preprocesador" >}}


# Datos
## Variables
## Constantes
## Tipos de datos
### Números

### Texto

Aquí los tipos de datos primitivos que soporta C++ (de menor a mayor capacidad):

- Caracteres: **_char_** (declarar entre comillas simples (‘), las comillas dobles (”) son para

cadenas) también es un entero, por lo podemos hacer operaciones con ellos, según el

código ASCII)

Existen algunos caracteres que no se pueden escribir, pero que un _char_ puede contener:

{{< keyvalue >}}
-% `\\`   :% `\`
-% `\'`   :% `'`
-% `\"`   :% `"`
-% `\n`   :% salto de línea
-% `\f`   :% salto de página
-% `\t`   :% tabulador
-% `\v`   :% tabulador vertical
-% `\b`   :% retroceso
-% `\r`   :% retorno de carro
-% `\a`   :% alerta
-% `\000` :% carácter ASCII (`000` dígitos octales)
-% `\x00` :% carácter ASCII (`00` dígitos hexadecimales)
-% `\0`   :% nulo (caracter ASCII 0)
{{< /keyvalue >}}

- Números enteros (se pueden declarar potencias con e/E): **_int_**
- Números decimales (no es necesario el 0 antes del punto decimal (.) ): **_float_** (en la

declaración añadir F/f para hacerlo más claro) o **_double_**_._ Depende de lo largo que sea la

parte decimal, _float_ para números más pequeños.

Con el método _cout.presision(int)_ podemos decirle cuantos decimales queremos mostrar

en la consola

- Booleanos (solo _true_ o _false_ ): **_bool_**
- Vacío: **_void_**


Combinando con las siguientes palabras, podemos modificar los tipos numéricos: char (hemos

dicho que es un entero), _int_ , _float_ y _double_.

- **_short_** (solo para _int_ ): el tamaño máximo se reduce, quedando menor o igual que el original.
- **_long_** (solo para _int_ , _double_ o _long int_ ): aumenta el tamaño máximo, quedando mayor o

igual al original. Se puede añadir l/L para dejar más claro que es un tipo _long_.

- **_unsigned_** (solo para _char_ o _int_ ): todos lo valores son mayores o iguales que 0.
- **_signed_** (solo _char_ o _int_ , está por defecto): los valores pueden ser positivos, negativos o 0.

Si prescindimos de escribir el tipo ( _int_ , _char_ ...) se entiende que es un _int_.

##### 3.1.1. Conversiones de tipos................................................................................................

El compilador es capaz de hacer ciertas conversiones de tipos de forma automática (o implícita).

Por ejemplo, ir de _char_ a _int_ o de este a _float_ es algo que hace el compilador sin que nos demos

cuenta cuyo comportamiento por defecto es no es el deseado

```
int a = 10, b = 7;
float c = a / b; // c = 1.0 y no 1.4, como podría esperarse
```
Podemos usar la sintaxis de C ( _tipo(objecto)_ o _(tipo)objeto_ ):

```
int a = 10, b = 7;
float c = float(a / b);
```
Se puede usar también un _static_cast<tipo>_ :

```
int a = 10, b = 7;
float c = static_cast<float>(a / b);
```
#### 3.2. Math...................................................................................................................................

Esta librería se usa para hacer operaciones matemáticas, _cmath_.

- _sqrt(int):_ raíz cuadrada
- _pow(int base, int exponente):_ potencia

#### 3.3. Variables.............................................................................................................................

Podemos declarar variables como en todos los otros lenguajes de programación, escribiendo el

tipo de dato, su nombre, y darle un valor (no necesariamente en la misma línea):

```
int numero = 0;
```

También podemos declarar muchas variables en una misma línea:

```
int num1, num2, num3 = 0, num4; //Solamente num3 tiene valor (0)
```
Podemos añadir algunas palabras clave para modificar el comportamiento de las variables:

- **_extern_** : será un campo que se puede acceder desde fuera de su ámbito
- **_static_** : pertenece al módulo y no a una instancia
- **_const_** : declaración de una constante cuyo valor no se puede modificar
- **_volatile_** : son variables no solo modificadas por el programa, si no también por el

hardware y o el Sistema Operativo.

- **_register_** : esta variable se usa a menudo, y con esta palabra se le indica eso y se hace

mucho más eficiente.

El operador **::** accede a variables de un ámbito superior que tengan el mismo nombre que una

de este ámbito.

Podemos operar también entre estos tipos de datos con los operadores aritméticos: **_+ - * / %_**

Y en lugar de escribir _num = num + 1_ podemos usar los operadores de asignación: **_++ - - += -= *=_**

**_/=_**

Para intercambiar el valor de dos variables se hace de la siguiente manera:

```
int num1, num2, aux;
aux = num1;
num1 = num2;
num2 = aux;
```
#### 3.4. Vectores y Matrices............................................................................................................

Los vectores son como guardar una cantidad de variables determinada con el mismo nombre.

Podemos pensar que se tratan como un estante donde nosotros podemos poner elementos: al

principio, al final, etc.

Podemos crear vectores añadiendo a la declaración de una variable unos [ ]:

```
int vector[_largo_max_];
```
len es el número máximo de elementos que se van a almacenar. Cabe destacar que los

elementos en los vectores se empiezan a contar desde 0 y no desde 1.

Para darle valores podemos hacerlo de las dos siguientes maneras:

```
int v1[2], v2[] = {1, 2, 3, 4, 5};
v1[0] = 3;
```

```
v1[1] = 4;
v1[2] = 1;
```
Las matrices son exactamente lo mismo, solamente que esta vez son estanterías completas,

pues podemos añadir otra dimensión más añadiendo otro par de [ ].

```
Nota : Si se accede a una tabla con un índice incorrecto se manipulan datos en
una zona de memoria incorrecta y el programa continua su ejecución, pueden
```
_suceder dos cosas:_

_La primera es que la memoria a la que ha accedido por error esté fuera de los_

_límites del programa. En este caso la ejecución termina de manera abrupta y en el_

_intérprete de comandos se muestra el mensaje “segmentation fault”._

```
La otra posibilidad es que se acceda a otro lugar dentro de los datos del
programa. Esta situación seguramente producirá un error cuyos síntomas sean
```
_difíciles de relacionar con el acceso incorrecto._

#### 3.5. String..................................................................................................................................

Para poder usarla usamos la librería _string_. Se trata de cadenas de caracteres, es decir _arrays_ de

_char_.

```
char palabra[] = “Magno”;
char palabra2[] = {‘M’, ‘a’, ‘g’, ‘n’, ‘o’};
```
o bien y más sencillo:

```
string palabra = “Magno”;
```
También podemos darle un número máximo de caracteres cuando no sabemos qué palabra va a

almacenar, pero si se queda corto, no se guardará. Además que el programa detecta que la cadena

se acaba cuando encuentra un espacio.

Podemos solucionar el tema del espacio usando el método _gets(char[])_ , que usará tanta

memoria como sea necesaria para almacenarla. Pero esto no es aconsejable, pues se está

adueñando de memoria que no es suya. Es mejor usar _cin.getline(char[], int caracteres_max, char_

_ultimo_caracter)._

- _strlen(char[]):_ devuelve la longitud de la cadena
- _strcpy(char[] vacía, char[] contenido)_ : copia el contenido de una cadena a otra
- _strcmp(char[], char[])_ : compara cadenas (devuelve 0 si _true_ , 1 _false_. También se puede usar

para ordenarlos alfabéticamente)


- _strcat(char[], char[])_ : concatenar cadenas
- _strrev(char[])_ : invertir una cadena
- _strupr(char[])_ : pasar a mayúsculas ( _toupper(string)_ )
- _strlwr(char[]):_ pasar a minúsculas ( _tolower(string)_ )
- _stoi(int)_ : pasar a _int_
- _atof(float):_ pasar a _float_

#### 3.6. Enumerados.......................................................................................................................

Los enumerados son listas de las posibles constantes que podemos darle a una variable. Por

ejemplo, queremos definir las estaciones. Podríamos usar un entero y que cada número

representase una diferente, pero solo necesitamos 4 números.

```
enum _nombre_ { _const1_, _const2_, ...};
```
Podemos también dale algunos valores a las constantes:

```
//Esto es equivalente a no escribir nada, ya se hace por defecto
enum Estacion { PRIMAVERA= 0, VERANO= 1, OTONO= 2, INVIERNO= 3 };
```
Incluso podemos especificar que valor le estamos dando, no tiene porque ser un entero:

```
enum Booleano : bool { VERDADERO = true, FALSO = false };
```
Y podemos convertir un enumerado a su tipo con un _static_cast_ :

```
Booleano b = static_cast<Booleano>(true);
```
Para que un enumerado tome un valor, debemos escribir la constante simplemente:

```
Booleano a = VERDADERO;
Booleano b = FALSO;
```
Pero podemos darle un identificador añadiendo _class_ / _struct_ (son equivalentes) para

diferenciarlos si tenemos varios enumerados similares.

```
enum class Booleano : bool { V = true, F = false};
Booleano a = Booleano::V;
Booleano b = Booleano::F;
```
Para más información consultar la referencia.


### 4. Estructuras de Control...............................................................................................................

#### 4.1. Condicionales.....................................................................................................................

Podemos comparar valores haciendo uso de los operadores booleanos: **_== != > < <= >=_**

Además, podemos operar con booleanos con los operadores lógicos: **_&& ||! & |_**

La sentencia **_if_** ejecuta determinado pedazo de código dependiendo de una condición lógica.

Solamente podemos tener un _if_ y un _else_ (opcional), pero podemos tener tantos _else if_ como

queramos. También podemos prescindir de las { } si solamente es una línea de código.

```
if (_condición_)
{
//Código que se ejecuta si condicion1 es verdadera
}
else if (_condición2_)
{
//Código que se ejecuta si condicion1 es verdadera
}
else
{
//Código que se ejecuta si ninguna condición es verdadera
{
```
Podemos también, en lugar de escribir un _if_ para dar un valor a una variable podemos usar esta

estructura:

```
int var = (_condición_)? _valor_true_ : _valor_false_;
```
La sentencia **_switch_** es una estructura de condición múltiple, compara si un valor es igual a

determinadas constantes. Si no usamos la sentencia _break_ , el programa seguirá comprobando las

siguientes condiciones y no saldrá de la estructura. Además podemos añadir tantos _case_ como

queramos, pero solo podemos tener un _default_.

```
switch (_valor_)
{
case _constante1_:
//Código que se ejecuta si valor es igual a constante
break;
case _constante2_:
//Código que se ejecuta si valor es igual a constante 2
break;
default:
//Si ningún caso es igual a valor se ejecuta esto
break;
}
```
#### 4.2. Bucles.................................................................................................................................

Los bucles son estructuras que repiten código un cierto número de veces.


El bucle _while_ repite el código de su interior mientras la condición sea cierta. También podemos

quitar las { } si solamente hay una línea de código en el interior.

```
while (_condición_)
{
```
```
}
```
El bucle _do-while_ funciona exactamente igual, solamente que esta vez se ejecuta el código al

menos una vez, antes de comprobar la condición.

```
do
{
```
```
} while (_condición_);
```
El bucle _for_ funciona igual que el _while_ , pero esta vez tenemos que usar un _iterador_ , una

variable que controle el bucle.

```
for (_declaracionIterador_; _condición_; _cambioIterador_)
{
```
###### }

El bucle for-each es un bucle for especial pensado para acceder a datos rápidamente a un array,

vector, matriz, etc. El iterador (del mismo tipo que el array, cambia su valor por cada uno de los

elementos en el array.

```
for (_tipo_vector_ _iterador_ : _vector_)
{
```
```
}
```
#### 4.3. Funciones...........................................................................................................................

Ejecutan una sola acción.

Todo programa C++ debe seguir esta estructura:

```
directivas del procesador (#include...)
declaraciones (variables globales y funciones)
int main () {...; return EXIT_SUCESS;}
definición de funciones
```
Podemos hacer también que "devuelva" más de un valor haciendo uso de parámetros por

referencia. Todos los cambios que se hagan en esa variable (como darle un nuevo valor) afectarán

a la variable que estemos pasando por parámetro desde la llamada a la función. Para eso, en la

declaración del parámetro se añade un **&**.

Las matrices y vectores siempre se pasan por referencia. Es también recomendable pasar

también el número de columnas y/o filas.


Estas funciones son recursivas, se pueden llamar a sí mismas.

También estas funciones se pueden sobrecargar, tener el mismo nombre, pero llevar

parámetros distintos (distinto número y/o tipo).

### 5. Estructuras.................................................................................................................................

Una estructura es una colección de uno o más tipos de elementos denominados campos, cada

uno de los cuales puede ser un tipo de dato diferente. Funciona como un array pero podemos

almacenar variables de distinto tipo.

```
struct _nombre_
{
...
};
```
Podemos hacer variables de estas estructuras, cada una de ellas tendrá los campos. Para eso

usamos el nombre de nuestra estructura como un tipo de dato normal o incluso desde la propia

estructura podemos darle el nombre a las variables.

```
struct estructura { ... };
int main()
{
estructura var1;
return EXIT_SUCESS;
}
```
o bien

```
struct estructura { ... } var1;
```
También se puede prescindir de dar un nombre a la estructura, siempre que se haga de esta

segunda manera, declarar el nombre de la instancia, si no no tiene sentido crear una estructura

que no se puede usar.

Se acceden a los distintos elementos de cada instancia mediante el operador punto (.):

```
struct Persona
{
string nombre;
int edad;
};
int main()
{
Persona Magno;
Magno.edad = 2000;
Magno.nombre = “El Magnifico”;
return EXIT_SUCESS;
}
```

También podemos crear estructuras anidadas, una dentro de otra, incluso ella misma:

```
struct Persona
{
string nombre;
int edad;
Persona mejorAmigo;
};
```
#### 5.1. Uniones..............................................................................................................................

Son exactamente iguales que las estructuras pero con una diferencia fundamental: solamente

se guarda uno de sus valores a la vez. Al guardar uno nuevo se borrará el anterior.

### 6. Punteros.....................................................................................................................................

Un puntero es una variable que almacena la posición de memoria de otra variable. Se tiene que

declarar a qué tipo de variable apunta ( _int_ , _float_ , _struct_ ...) y añadir un *****.

```
int * puntero;
```
Para obtener lo que contiene esa posición de memoria se usa *****.

La posición de memoria de una variable cualquiera se obtiene añadiendo **&** delante.

Los vectores se almacenan en posiciones de memoria todas seguidas, por lo que podemos

recorrerlo usando punteros y distintos operadores:

```
int v[] = {1, 2, 3, 4, 5};
int * p = &v[0]; // o bien v, simplemente
for (int i = 0; i < 5; i++)
cout << *p++ << “ ”;
```
Un puntero puede también apuntar a una función:

```
_tipo_return_ (* _puntero_a_función_ ) (_parámetros_);
```
o a una _struct_ (para acceder a los datos se usa ->):

```
struct Persona
{
int edad;
string nombre;
} persona, * yo = & persona;
yo->edad = 16;
yo->nombre = "Magno";
```

### 7. New y Delete..............................................................................................................................

Con estos operadores podemos asignar dinamicamente el número máximo de posiciones con

_new_. Devuelve un puntero.

Es importante al acabar el programa que liberemos la memoria tomada por _new_ con _delete_ (se

añade [] si es un arreglo).

Con esto podemos crear matrices dinámicas, haciendo un puntero a punteros ( _int_ ** - un

puntero que apunta a otro puntero que este apunta hacia un número entero) que apunte a las

distintas posiciones donde se almacenarán los datos.

```
int nFilas, nCol;
int ** matriz = new int * [nFilas]; //Nuevo array de punteros
```
```
for (int i = 0; i < nFilas; i++)
matriz[i] = new int[nCol]; //Por cada fila creamos un array
```
```
//La matriz ya está creada
```
```
//Imprimimos la matriz
for (int i = 0; i < nFilas; i++)
for (int j = 0; j < nCol; j++)
cout << *(*(matriz + i) + j) << “ ”; // o matriz[i][j]
delete[] matriz;
```
### 8. Colecciones................................................................................................................................

Tenemos varios tipos de colecciones (vectores dinámicos), como las listas, las pilas, las colas, las

listas enlazadas, los árboles y los diccionarios. Existen más posibilidades que puedes crear con lo

que aprendas de este código, además de consultar las otras librerías disponibles en la referencia.

#### 8.1. Listas...................................................................................................................................

Esta lista funciona exactamente igual que un vector, solamente que trae algunos métodos

adicionales que expanden las posibilidades, como añadir nuevos elementos dinamicamente.

##### 8.1.1. Vector.........................................................................................................................

Se crean haciendo un objeto de esta clase y añadiendo su tipo de dato a guardar:

```
vector<int> lista;
```
Aquí algunos métodos y funciones interesantes (puede consultar más aquí):

- **_size_** : devuelve el tamaño de la lista.


- **_empty_** : devuelve si está vacía la lista o no.
- **_clear_** : limpia la lista
- **_push_back_** : añade un elemento al final de la lista.
- **_pop_back_** : elimina el elemento al final de la lista.
- **_insert_** : inserta los elementos en una posición determinada.
- **_erase_** : elimina un elemento o rango de elementos.
- **_front_** : devuelve una referencia al elemento inicial (esta lista se puede recorrer

también con punteros).

- **_end_** : devuelve una referencia el elemento final.
- **_[]_** : con este operador podemos acceder a las diferentes posiciones de memoria. O

bien usando el método **_at_**.

#### 8.2. Pilas....................................................................................................................................

Una pila es una colección similar a un vector, cuya limitación es que solo podemos obtener

elementos del principio de la pila, así como añadirlos. Por eso se llaman estructuras **LIFO** (Last-In

Firt-Out, último en entrar, primero en salir).

Para poder trabajar con estas pilas podemos programarla nosotros mismos o simplemente usar

la librería stack.

##### 8.2.1. Stack...........................................................................................................................

Pertenece a la Librería Estándar, debemos crearla añadiendo también el tipo de dato que se va a

almacenar:

```
stack <int> pila;
Aquí algunos métodos:
```
- **_empty_** : cierto (true) si la pila está vacía.
- **_pop_** : borra el elemento en el tope de la pila.
- **_push_** : agrega un elemento en el tope de la pila.
- **_size_** : regresa el numero de elementos en la pila.
- **_top_** : regresa el último elemento en la pila.
- **_swap_** : intercambia contenido con otra pila.

##### 8.2.2. Código.........................................................................................................................

Vamos a crear una struct que guarde un elemento (dato) y un puntero que apunte hacia otro

nodo y poder así relacionar toda la pila.


```
struct Nodo
{
int dato;
Nodo * siguiente;
};
```
Ahora vamos a crear los métodos básicos de una pila, añadir y eliminar elementos:

```
void push (Nodo * & pila, int elemento)
{
//Creamos un nuevo nodo con new
Nodo * nuevoNodo = new Nodo();
```
```
//Damos los valores a este nodo
nuevoNodo->dato = elemento;
nuevoNodo->siguiente = pila;
```
```
//El nuevo nodo se sitúa en la pila
pila = nuevoNodo;
}
int pop (Nodo * & pila)
{
//Creamos un nodo para no eliminar directamente la pila
Nodo * auxiliar = pila;
```
```
//Guardamos el valor para devolverlo
int elemento = auxiliar->dato;
```
```
//Ahora la pila apunta al siguiente elemento
pila = auxiliar->siguiente;
```
```
//Se borra el nodo
delete auxiliar;
```
```
return elemento;
}
```
La pila simplemente será un puntero que apunta a una struct de tipo Nodo. Si está vacía, será

igual a NULL. Aparte de eso, podemos añadir otros métodos, como un contador de elementos,

mostrar la pila, etc.

#### 8.3. Colas...................................................................................................................................

Las colas funcionan exactamente igual que una pila, solamente con la diferencia que siguen la

estructura FILO (First-In First-Out, primero en entrar, primero en salir). Podemos escribir nosotros

el código, o usar la Librería Estandar de C++ queue.

##### 8.3.1. Queue.........................................................................................................................

Se crean igual que las pilas y poseen unos métodos muy similares.

- **_empty_** : cierto (true) si la cola está vacía.
- **_pop_** : borra el elemento del frente de la cola.


- **_push_** : agrega un elemento al frente de la cola.
- **_size_** : regresa el número de elementos en la cola.
- **_front_** : regresa una referencia al primer elemento en la cola.
- **_back_** : regresa una referencia al último elemento en la cola.

También existe una cola que en lugar de seguir la estructura FILO, va almacenando los valores

por orden. Para saber más consulte _priority_queue_.

##### 8.3.2. Código.........................................................................................................................

Vamos a usar la misma estructura para guardar los datos que en la pila, pero ahora, en lugar de

tener una sola referencia para la cola, tendremos dos: una para el inicio y otra para el final.

```
void add (Nodo * & inicio, Nodo * & fin, int elemento)
{
//Creamos un nuevo nodo y le damos datos
Nodo * nuevoNodo = new Nodo();
```
```
nuevoNodo->dato = elemento;
nuevoNodo->siguiente = NULL;
```
```
//Si la cola está vacía, también es el primer nodo
if (colaVacia(inicio)) inicio = nuevoNodo;
```
```
//sino, actualizamos el último que ya existía
else fin->siguiente = nuevoNodo;
```
```
//Al añadir un nodo, este pasa a ser el último
fin = nuevoNodo;
}
bool colaVacia(Nodo * cola) { return cola == NULL;}
void pop (Nodo * & inicio, Nodo * & fin)
{
//Guardamos el valor para devolverlo después
int elemento = inicio->dato;
```
```
Nodo * auxiliar = inicio;
```
```
//Si los dos apuntan a la misma posicion, solo hay 1 nodo
if (inicio == fin)
{
incio = NULL;
fin = NULL;
}
```
```
//Actualizamos el inicio sino.
else inicio = inicio->siguiente;
```
```
delete auxiliar;
return elemento;
}
```

#### 8.4. Listas enlazadas..................................................................................................................

Existen diferentes tipos de listas enlazadas:

- Lista simplemente enlazada : lista normal, cada nodo con un enlace que apunta a otro.
- Lista doblemente enlazada : lista con dos enlaces, uno al nodo anterior y otro al

siguiente.

- Lista circularmente enlazada : el último nodo apunta también al primer nodo.
- Lista circularmente doblemente enlazada : combina la lista doblemente enlazada con
    la lista circularmente enlazada.

Viendo como funcionan las pilas y las colas, no será muy difícil programar cualquiera de estas

listas, ya que solamente son variaciones.

#### 8.5. Árboles...............................................................................................................................

Simplemente se trata de unos nodos conectados entre sí (ramas. Su nodo principal se llama raíz

y los otros hijos. Aquellos hijos que no tienen más descendientes se les llaman hojas. Los nodos

hermanos son aquellos que están al mismo nivel y comparten su mismo padre.

Su longitud de camino es la cantidad de ramas por las que hay que pasar hasta llegar a

determinado nodo desde la raíz.

Su altura es a cuantos niveles de profundidad se encuentra desde el nodo raíz.

##### 8.5.1. ÁRBOL BINARIO

Es una estructura recursiva que tiene 3 subconjuntos:

- Nodo raíz.
- Sub-árbol derecho.
- Sub-árbol izquierdo.

Tipos:

- Lleno: todos los nodos están completos
- Completo: como el lleno, pero en la parte derecha hay menos que en la izquierda.
- Degenerado: solo un hijo por cada nodo (lista)


## 8.5.2. ÁRBOL BINARIO DE BÚSQUEDA

Los datos de la izquierda son menores a la raíz y a los datos que hay en la derecha.

# 9. ALGORITMOS

## 9.1. ORDENAMIENTOS

## 9.1.1. MÉTODO BURBUJA

Funciona revisando cada elemento de la lista que va a ser ordenada con el siguiente,

intercambiándolos si están en orden equivocado. Es necesario revisar varias veces toda la lista.

```
#include <iostream.h>
#include <conio.h>
using namespace std;
int main()
{
int numeros [] = {4 , 1, 2, 3, 5};
int i, j, aux;
for (i = 0; i < size(numeros); i++)
{
for (j = 0; j > size(numeros); j++)
{
if (numeros[j] > numeros[j + 1])
{
aux = numeros[j];
numeros[j] = numeros [j+1]
numeros[j+1] = aux;
}
}
}
for (i = 0; i < size(numeros); i++)
cout << numeros[i] << “ ”;
getch();
return 0;
}
```
## 9.1.2. MÉTODO DE INSERCIÓN

Es una forma muy natural de ordenar, O(n²). Consiste en comprobar si el elemento de su

izquierda es menor que él.

```
#include <iostream>
#include <conio.h>
using namespace std;
int main ()
{
int numeros[] = {4, 2, 3, 1, 5};
int i, pos, aux;
for (i = 0; i < size(numeros); i++)
{
pos = i;
aux = numeros[i];
while ((pos > 0) && (numeros[pos – 1] > aux))
```

###### {

```
numeros[pos] = numeros[pos – 1]
pos--;
}
numeros[pos] = aux;
}
for (i = 0; i < size(numeros); i++)
cout << numeros[i] << “ “;
getch();
return 0;
}
```
##### 9.1.3. MÉTODO POR SELECCIÓN

Necesita O(n²) operaciones. Primero se busca el elemento más pequeño y se coloca al principio.

A continuación buscamos el elemento más pequeño del resto de la lista y se coloca en la siguiente

posición. Y así sucesivamente hasta que se acaba la lista.

```
#include <iostream>
#include <conio.h>
using namespace std;
int main ()
{
int numeros [] = {3, 2, 1, 5, 4};
int i, j, aux, min;
for (i = 0; i < size(numeros); i++)
{
min = i;
for (j = 0; j < size(numeros); j++)
{
if (numeros[j] < numeros[min])
min = j
}
aux = numeros[i];
numeros[i] = numeros[min];
numeros[min] = aux;
}
for (i = 0; i < size(numeros); i++)
cout << numeros[i] << " ";
getch();
return 0;
}
```
#### 9.2. BÚSQUEDAS EN ARREGLOS

##### 9.2.1. BÚSQUEDA SECUENCIAL

Va mirando todas las posiciones del arreglo.

```
#include <iostream>
#include <conio.h>
using namespace std;
int main()
{
int a[] = {3, 4, 2, 1, 5};
int i = 0, dato;
bool band = true;
while (band && (i < 5))
```

###### {

```
if (a[i] == dato)
band = false;
i++;
}
if (band)
cout << “El número ” << dato << “se encontro en ” <<
a[i-1] << endl;
else
cout << “No existe el número ” << dato << “ en el
arreglo” << endl;
getch();
return 0;
}
```
##### 9.2.2. BÚSQUEDA BINARIA

Se trata de un algoritmo mucho más eficiente, pero tiene que estar ordenado

ascendentemente.

```
#include <iostream>
#include <conio.h>
using namespace std;
int main()
{
int numeros[] = {1, 2, 3, 4, 5};
int inf = 0, sup = size(numeros), mitad, dato = 4;
bool band = false;
while (inf <= sup)
{
mitad = (inf + sup) / 2;
if(numeros[mitad] == dato)
{
band= true;
break;
}
if (numeros[mitad] > dato)
{
sup = mitad;
mitad = (inf + sup) / 2;
}
if (numeros[mitad] < dato)
{
inf = mitad;
mitad = (inf + sup) / 2;
}
}
if (band)
cout << "El numero " << dato << " ha sido encontrado
en la posicion " << mitad << endl;
else
cout << "El numero" << " dato no ha sido encontrado en
el arreglo" << endl;
getch();
return 0;
}
```

# 10. MANEJO DE ARCHIVOS

Para manejar archivos vamos a usar la librería fstream, en la cual tenemos dos clases: ofstream

(output file stream) y ifstream (input file stream).

Para crear un txt, hacemos una instancia de ofstream y usamos algunos de sus métodos:

- open(string _dirección_, ios::out): para crear un archivo.
- fail(): devuelve true si falló la creación del archivo.
- <<: con este operador podemos añadir valores al archivo.
- close(): recuerda cerrar el archivo al final.

Y ahora, si queremos leer el archivo, tenemos que usar ifstream:

- open(string _dirección_, ios::in): para abrir un archivo y empezar a leerlo.
- fail(): devuelve true si falló al abrir del archivo.
- eof(): devuelve true si es el final del archivo.
- close(): recuerda cerrar el archivo al final.

# 11. POO

## 11.1. CONCEPTOS BÁSICOS

**Clase** : es un agrupamiento de objetos con características ( **atributos** ) y acciones ( **métodos** )

similares. Por ejemplo un coche, de los cuales existen diferentes marcas, colores, etc; pero sigue

siendo un coche con sus propias acciones: conducir, frenar, acelerar...

**Objeto** : es un conjunto de atributos (características) y métodos (acciones) que derivan de una

clase. Entonces si continuamos con el ejemplo anterior, un Nissan es un objeto de la clase coche

con un atributo que puede ser su color, así como un Mercedes, pero este tiene un color distinto.

Como ves ambos pertenecen a la misma clase, pero son distintos.

**Abstracción** : es el proceso mental de extracción de las características esenciales de algo,

ignorando detalles superfluos. Es decir, el proceso de crear clases y objetos a partir de una cosa en

la realidad; como hemos hecho nosotros con el coche.

**Encapsulación** : es el proceso por el cual se ocultan detalles del soporte de las características de

una abstracción. En un coche, por ejemplo, no necesitamos saber como el coche frena. Nosotros

debemos saber como decirle que frene, pero no nos importa como funcione su mecanismo.


**Herencia** : una clase se crea a partir de otra, que herede de sus atributos y métodos. Por

ejemplo un vehículo. Un vehículo tiene un número de ruedas, un color, una marca, etc; y puede

acelerar, frenar... Y podemos hacer que un coche (un subtipo de vehículo) tenga estas

características simplemente heredando de ella, e incluso añadir unos atributos más específicos. A

la clase vehículo se le llama la **clase padre** o **superclase** y al coche la **clase hija** o **subclase**.

**Polimorfismo** : es aquella cualidad que poseen los objetos para responder de distinto modo

ante el mismo mensaje. En nuestro ejemplo del coche, podemos decirle que vaya a repostar. Y no

todos los coche lo hacen de la misma manera, pues hay unos que son eléctricos, otros de gasolina,

otros de gas...

#### 11.2. SINTAXIS

Como crear una clase:

```
class _nombre_
{
...
};
```
Se recomienda que el nombre de la clase empiece por mayúscula y el nombre esté en singular.

Ahora vamos a crear una clase llamada Persona y añadir unos atributos:

```
class Persona
{
private:
int edad;
string nombre;
};
```
Como ves, tiene dos características: su edad y su nombre. También puedes ver que estos son

privados, como bien indica el encapsulamiento, para que solo sean accesibles desde las propias

acciones de la clase y solo esta pueda modificarlos. Añadamos ahora unos métodos públicos:

```
class Persona
{
private:
int edad;
string nombre;
public:
Persona(int, string); //Constructor
void leer();
void correr();
};
```
Si te fijas hay un método extraño, el Persona(). Este es un constructor, el método encargado de

iniciar los atributos de la clase cuando se crea un objeto. Siempre lleva el mismo nombre que la

clase y sus parámetros son los atributos para que podamos ingresar un valor inicial.


A estos métodos también podemos hacerle sobrecarga, incluso al método constructor.

Y tal como existe un método constructor, también existe un método destructor, el encargado de

borrar los datos de los objetos al final del programa automáticamente. Podemos llamarlo en

determinado momento cuando queramos destruir un objeto que no vamos a usar más.

```
class Persona
{
private:
int edad;
string nombre;
public:
Persona(int, string); //Constructor
~Persona(); //Destructor
void leer();
void correr();
};
```
Añadamos ahora los _getters_ y _setters_ , que son los métodos encargados de modificar y obtener

los atributos desde fuera de la clase. Podemos añadir solamente los de los valores que queramos

que se modifiquen, como buena práctica en el encapsulamiento:

```
class Persona
{
private:
int edad;
string nombre;
public:
Persona(int, string); //Constructor
~Persona(); //Destructor
```
```
//Métodos de la clase
void leer();
void correr();
```
```
//Setters
void setEdad(int);
void setNombre(string);
```
```
//Getters
int getEdad();
string getNombre();
};
```
Vamos ahora a escribir los que hacen los métodos, lo cual podemos hacer dentro de la clase en

su misma declaración o fuera de esta. Recuerde indicar a que clase pertenece con el operador

doble dos puntos (::):

```
Persona::Persona(int n, string s)
{
edad = n;
nombre = s;
}
```
```
//En este caso no hay un tratamiento especial al borrar
Persona::~Persona() {}
```

```
void Persona::leer()
{
cout << “Soy “ << nombre << “ y estoy leyendo” << endl;
}
void Persona::correr()
{
cout << “Soy "<< nombre << “ y estoy corriendo” << endl;
}
```
```
void Persona::setEdad(int n) { edad = n; }
void Persona::setNombre(string s) { nombre = s; }
```
```
int Persona::getEdad() { return edad; }
string Persona::getNombre() { return nombre; }
```
Creemos ahora un objeto de esta clase:

```
Persona p1 = Persona (2000, “Magno”); //Llamamos al constructor
```
Para acceder a sus métodos (recuerde que solamente podemos usar los públicos) usamos el

operador punto (.):

```
p1.leer();
```
Y podemos crear a todos los objetos que queramos:

```
Persona p2 (19, “Pepe”); //Otra forma de llamar al constructor
p2.correr();
```
#### 11.3. HERENCIA

La herencia, como ya hemos visto, es la capacidad de una clase de obtener los métodos y

atributos de otras. Esto permite una fácil reutilización de código.

```
class Persona
{
private:
string nombre;
int edad;
public:
Persona (string nombre_param, int edad_param)
{
nombre = nombre_param;
edad = edad_param;
}
void show()
{
cout << “Nombre: " << nombre << endl;
cout << "Edad: " << edad << endl;
}
};
```
```
class Alumno : public Persona
{
private:
string codigo;
```

```
float nota;
public:
Alumno (string nombre_param, int edad_param, string
codigo_param, float nota_param) : Persona(nombre_param,
edad_param)
{
codigo_alumno = codigo_param;
nota = nota_param;
}
void show()
{
Persona::show();
cout << "Codigo: " << codigo << endl;
cout << "Nota: " << nota << endl;
}
};
```
Para heredar de otra clase, usamos los dos puntos (:), un modificador de acceso que determina

cómo se tratarán los componentes públicos de la clase que estamos heredando y su nombre.

Podemos llamar al constructor de la clase padre para inicializar los valores de esta. Vea el código

de ejemplo de arriba, volvemos a usar los dos puntos y llamamos al constructor con los

parámetros necesarios.

En resumen, con lo que hemos conseguido aquí es ahorrarnos tener que escribir otra vez los

atributos y métodos de la clase Persona (que este caso son pocos, pero si trabajamos con

proyectos más grandes, es bastante útil).

#### 11.4. POLIMORFISMO

Como hemos visto, el polimorfismo es hacer la misma cosa de diferentes maneras. Pero hay

varias maneras de hacer eso

##### 11.4.1. POLIMORFISMO ESTÁTICO (O SOBRECARGA)

Este tipo de polimorfismo ya lo hemos “visto” con las funciones, porque es muy similar a la

sobrecarga de estas:

```
class Base
{
public:
void metodo() { cout << “Clase Base” << endl; }
};
class Derivada : public Base
{
public:
void metodo() { cout << “Clase Derivada” << endl; }
};
```

Como ves, tenemos el mismo método pero en clases distintas, y se llamará a uno o a otro

dependiendo de qué clase sea el objeto que lo llame:

```
Base b;
Derivada d;
b.metodo();
d.metodo();
//Resultado
Clase Base
Clase Derivada
```
##### 11.4.2. POLIMORFISMO DINÁMICO – SIN ACABAR

https://es.stackoverflow.com/questions/62746/polimorfismo-en-c

11.5. Clases abstractas y Interfaces

Una clase abstracta es aquella de la que no se pueden declarar instancias, dicho de otra manera

no se pueden declarar objetos de una clase abstracta. La finalidad de una clase abstracta es servir

como clase base (mediante herencia) para otras a las que generalmente se conoce como clases

"concretas".

La característica que distingue a una clase abstracta es la de poseer por lo menos un método

virtual puro, es aquel que se declara utilizando la palabra reservada virtual e igualando su

definición a cero:

```
virtual void f(int x) = 0;
```
Este método se deja para las clases derivadas para que se defina. Pero tenga en cuenta que si

una clase cualquiera hereda de una clase abstracta y no define los métodos virtuales puros

heredados entonces esa clase automáticamente se convierte en una clase abstracta también.

Veamos un ejemplo:

```
class Poligono
{
private: int lados;
public:
virtual double area() = 0;
virtual double perimetro() = 0;
void setLados(int n){ lados = n; }
Poligono(int n) {setLados(n);}
};
class Cuadrado : public Poligono
{
private: double altura;
public:
double area() { return pow(altura, 2); }
double perimetro() { return altura*4; }
Cuadrado(double n) : Poligono(4) { altura = n; }
};
```

Una interfaz es una clase abstracta pura (no tiene variables de clase y todos sus métodos son

virtuales puros).

Este tipo de clases son implementadas comúnmente por los arquitectos y diseñadores de

software, aquí el diseñador especifica el nombre y el tipo de retorno y los tipos de los parámetros

de entrada del método, pero deja a consideración del desarrollador la implementación interna de

la funcionalidad.

El uso de interfaces es particularmente útil cuando se implementan algunos patrones de diseño

de software que involucran clases polimórficas (como hemos visto tienen que ser métodos

completamente iguales), lo cual es muy común en "frameworks" de desarrollo de software, por

ejemplo de interfaces gráficas de usuario (GUIs) donde la mayoría de objetos gráficos que se

pueden integrar a la interfaz gráfica implementan interfaces en común que declaran

funcionalidades generales de todos los elementos gráficos pero que se implementan con distintas

variaciones en cada uno de los elementos gráficos. Ejemplo:

```
class ElementoGraficoGenerico
{
public:
virtual void setColor(int r, int g, int b) = 0;
virtual void setPos(double xpos, double ypos) = 0;
virtual void setLabel(const string lb) = 0;
virtual void onClickPressed() = 0;
};
```
Esta interfaz sería implementada por un elemento gráfico, que necesita tener estos métodos

para que funcione correctamente.

#### 11.5. PLANTILLAS (TEMPLATES)

Una plantilla es una manera especial de escribir funciones y clases para que estas puedan ser

usadas con cualquier tipo de dato, similar a la sobrecarga, en el caso de las funciones. Así evitando

el trabajo de escribir cada versión de la función.

El truco está en no definir un tipo de dato, si no dejarlo para algo posterior y usar algo que

permita usar varios de ellos:

```
template <class _identificador_> función/clase;
template <typename _identificador_> función/clase;
```
Depende de el tipo de valor que se vaya a usar es primitivo o una clase se usa class o typename.

El identificador que uses se usará como si fuese cualquier otro tipo de dato cualquiera, e incluso

puedes usar dos identificadores a tipos distintos, ambos separados por comas (,). Creo que será

más fácil de entender con un ejemplo.

```
template <typename T> T suma (T a, T b) { return a + b; }
```

```
template <typename T> class Punto
{
private: T x, y;
public:
T getX() {return x;}
T getY() {return y;}
void setX(T _x) {x = _x;}
void setY(T _y) {y = _y;}
Punto(T _x, T _y) {setX(_x); setY(_y);}
~Punto(){}
};
Punto<int> p(10, 10);
cout << suma<int>(p.getX(), p.getY()) << endl;
```
# 12. EXCEPCIONES

En multitud de lenguajes de programación se distinguen dos tipos de errores genéricos: los de

sintaxis y las excepciones.

El primer tipo son aquellos errores que comentemos al escribir mal el código (como bien dice su

nombre), por ejemplo: confundirse al escribir un nombre de variable, olvidarse un punto y coma (;)

o incluso confundir la sintaxis y hacer algo que no está permitido en C++. Eso por lo general es

sencillo de solucionar, pues el compilador nos avisa donde hemos metido la pata y algunos incluso

nos dan alguna pista de como arreglarlo.

El segundo tipo son los errores que suceden en tiempo de ejecución, pues los otros nos avisa el

compilador y ya no se genera ningún ejecutable. Un caso sería de intentar convertir un string a int

cuando hay alguna letra por el medio, o en una función dividir, intentar hacerlo entre 0. Y esta

clase de errores no se suelen poder arreglar tan sencillamente.

Por eso existe la siguiente estructura, el try-catch. En el interior del primer bloque añadimos el

código problemático y en el catch escribimos qué hacer cuando surja un error.

```
try
{
// Código problemático
}
catch ( _tipo_de_excepción_ )
{
//Código si hay algún error
}
```
Dependiendo de qué tipo de error suceda se lanzará un tipo de excepción o otra, por lo que

podemos manejar varios añadiendo múltiples catch. Si no, también podemos usar un catch

genérico, usando solamente puntos suspensivos (catch(...) {} ).

Veamos ahora como crear nuestros propias excepciones. Para ello usaremos la palabra throw.

Podemos lanzar un tipo primitivo o podemos crear uno detallado gracias a la clase exception.

```
Int division (int a, int b)
```

###### {

```
if (b == 0) throw “Error: No se puede dividir entre 0”;
return a/b;
}
int main ()
{
try
{
cout << division(4, 0) << endl;
return EXIT_SUCESS;
}
catch (string msg)
{
cerr << msg << endl;
return EXIT_FAILURE;
}
}
```
#### 12.1. LA CLASE EXCEPTION

Esta clase nos va a ayudar a crear errores más concretos para nuestros programas. La idea es

simplemente heredar de esta clase (o sus derivadas, para concretar aún más, más información) y

hacer las modificaciones necesarias, que por lo general, no es más que modificar un método: el

que devuelve el código de error.

Esta es la clase _exception_ :

```
class exception
{
public:
exception() throw() { }
virtual ~exception() throw();
virtual const char* what() const throw();
};
```
La clausula _throw_ () que aparece en las funciones está en desuso, así que no te preocupes por

eso.

```
class Error: public std::exception
{
private: std::string msg;
public:
Error () {}
Error (std::string _msg) {msg = _msg;}
~Error(){}
const char * what() const throw() override
{
return (msg.empty())? "Error" : msg.c_str();
}
};
```
Con esta clase modelo, podrás crear errores más personalizados: puedes lanzar un mensaje con

el constructor y concretar más.


Entrada de datos por consola

POO: polimorfimo, usar operadores en clases, modificadores de acceso

Delegados : predicados, lamba

expresiones regulares

ficheros

interfaces graficas: elementos, layouts ,imagenes, pintar, 3d

eventos

hilos

BBDD
