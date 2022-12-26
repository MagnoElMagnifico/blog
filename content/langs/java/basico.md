---
title: Java Básico
weight: 1
draft: true
---


# Parte 1: Programar.

### VARIABLES

- **boolean** : solo true y false.
- **byte** : números hasta 255.
- **short** : números pequeños.
- **int** : números enteros.
- **long** :números enteros grandes.
- **double** : números dobles.
- **float** : números flotantes.
- **char** : solo un caracter.
- String: cadena de texto.
- **Tipovariable** Variable[]= **new TipoVariable** [número siguiente al máximo de objetos de la
    lista]:arreglo.
- **Tipovariable** Variable[][]= **new TipoVariable** [número siguiente al máximo de objetos de la
    lista][número siguiente al máximo de objetos de la lista]: Matriz, lista con más capacidad.

**LISTA**
Debemos importar “ **import** java.until.LinkedList;”

- LinkedList nombre= **new** LinkedList(): nueva lista.
- Nombre.add= (indice, valor): añade un nuevo valor con el número del indice.
- Nombre.addFirst= (indice, valor): añade un valor al principio.
- Nombre.addLast= (indice, valor): añade un valor al final.
- Nombre.get (indice): obtiene el valor del indice.
- Nombre.getFirst (indice): obtiene primer el valor.
- Nombre.getLast (indice): obtiene el último valor.
- Nombre.remove (indice): borra el valor.
- Nombre.removeFirst (): borra el primer valor.
- Nombre.removeLast (): borra el último valor.
- Nombre.size (): longitud de la lista.

**STACKS (O PILA).**
Una pila es como una lista que cuando metes un valor este es el último en salir, también no
podemos pasar a otro objeto sin que el último esté borrado. Debemos importar “ **import**
java.until.Stack;”

- Stack nombre= **new** Stack(): nueva pila.
- Nombre.push(valor): nuevo objeto.
- Nombre.pop(): borra el último objeto.
- Nombre.pick(): devuelve el último valor.
- Nombre.empy(): para saber si la pila está vacía.

**COLAS**
Debemos importar “ **import** java.until.LinkedList;”. Esto funciona como una pila solo que lo que
entra es el primero en salir.

- LinkedList nombre= **new** LinkedList(): nueva lista.
- Nombre.offer(valor): añade un valor a la lista.
- Nombre.poll(): devuelve el valor y lo borra.
- Nombre.pick(): devuelve el último valor.
**OPERADORES**
- < u >: comparación.


- ==: igual que.
- <=:Menor o igual que.
- >=: Mayor o igual que.
- !=:distinto a.
- +: sumar. En casos especiales puede unir texto con variables.
- -:restar.
- *:multiplicar.
- /:dividir.
- %:resto de la división.
- ++:incremento.
- - -: disminución.
- &&: significa and, es para unir dos condiciones.
- ||: significa or, es para que se cumpla una de las condiciones.
- !: significa not, es lo contrario a una de las condiciones.
- .equal(): igual a, pero solo se usa en variables de texto.
- .concat(): une valores con variables String.
- .toLowerCase(): en variables String convierte en minúsculas.
- .toUpperCase(): en variable String convierte en mayúsculas.
- .lenght(): mide la longitud de las variables String.
- TipoDeVariable.parseTipoDeVariable(variableDeTexto): Pasa de variable numérica a de
    texto.
- Integet.toString()
- String.valueOf(): Pasar de variable de texto a una númerica.
- /n: En escritura de textos, enter.

**CONDICIONES**

- **_if_** _( condición ) { Bloque de código }_ **_else_** _{ Bloque de código }_ : Si la condición se cumple se
    ejecuta el bloque de código. Si no se cumple la condición se ejecutará el bloque de código.
    NOTA: no poner “;” después de los paréntesis.

**if** (comparación)
{
Código;
} **else**
{
Código;
{

- **if** (condición){Bloque de código} **else if** (condición){Bloque de código}: Esto funciona como un
    “ **if** ” normal solo que al final del “ **else** ” se puede meter otro “ **if** ”. NOTA se puede meter
    innumerables “ **else if** ”.

**if** (comparación)
{
Código;
} **else if** (comparación)
{
Código;
{


- Para que no tengamos que escribir un “if” para declarar una variable con un valor o otro,
    debemos escribir (condicion)? 'valor' : 'valor'.

**Boolean** nombre = ( **true** )? ' **true** ' : ' **false** ';

- **_switch_** _( variable ){_ **_case_** _número a comparar : bloque de código._ **_Default_** _: bloque de código }:_ Si
    la variable coincide con el número a comparar se ejecutará el código. Si no coincide se
    ejecutará el código de default. NOTA: Si no usas la acción “ **break** ” se seguirá ejecutando
    hasta acabar.

**Switch** (variable)
{
**case** números a comparar:
{
Código;
}
**Default** :
{
Código;
}
}

**CICLOS**

- **_while_** _( condición ){ bloque de código }_ : Se ejecuta mientras la comparación sea correcta.

**while** (comparación)
{
Código;
}

- **_for_** _( crear variable ; comparación ; incremento, disminución ;) { bloque de código }_ : El bloque
    se ejecute mientras la comparación sea correcta. NOTA: no poner “;” después de los
    paréntesis.

**for** ( **int** variable; comparación; variable++ u - -)
{
Código;
}

**ACCIONES**

- System. **out** .println(): Imprime en la pantalla el texto escrito entre comillas. Para una
    variable poner el nombre de la variable. NOTA: para abreviar puedes poner “syso” + Ctrl +
    espacio + entrer.
- **break** : detiene un ciclo.
- **continue** : reinicia un ciclo, pero solo reinicia el bloque de código.
- JoptionPane.showMessageDialog( **null** , “texto”); mensaje
- JoptionPane.showConfirmDialog( **null** , “texto”); si no y cancelar
- JoptionPane.show.InputDialog(“texto”); escribimos


# Parte 2: Programación orientada a objetos.

## PROGRAMACIÓN ORIENTADA A OBJETOS.

### OBJETIVO

La programación orientada a objetos consiste en crear una nueva “ _Class_ ” (detallado en crear
“ _Class_ ”). Estas actúan como una gran variable.

**CREAR.**
Debemos crear una nueva “ _Class orientada a objetos_ ”.
Al principio de la clase principal debemos escribir “ **import** ” más nombre del “ _Package_ ”y nombre
de la “Class”.

**import** package.class;

**CREAR NUEVO OBJETO.**
Una vez que tenemos el objeto importado y la “ _Class_ ” creada debemos iniciar el objeto como una
variable. Colocamos el nombre de la “ _Class_ ” y el nombre deseado del objeto. Luego lo declaramos
“ _new_ ” y el nombre del objeto “()”.

Class nombre= **new** Class();

**USAR UN METODO EN LA “CLASS” PRINCIPAL.
Usar un método.**
Para usar un método debemos poner el nombre del objeto, añadir un punto y el nombre del
método. Esto irá a la otra “ _Class_ ” y ejecutará el pedazo de código que hay allí.

Objeto.metodo();

**Usar un método como variable.**
Este funciona igual, pero en lugar de ejecutar se el código, devuelve una variable.

Variable= Objeto.metodo();

**Usar un método para cambiar los valores.**
Cuando declaramos el objeto podemos cambiar sus valores metiendo entre paréntesis los nuevos
valores.

Class nombre= **new** Class(valor, valor);

**CREAR UN MÉTODO EN LA “CLASS” ORIENTADA A OBJETOS.**
Debemos declarar las variables que usaremos y dentro de un “ **public** ” le declaramos su valor
correspondiente.

**Crear un método.**
Escribimos “ **public void** ”, nombre del método y “()”. Abrimos llaves y escribimos el código que
queremos que se ejecuta.


**public void** método()
{
Código para ejecutar;
}

**Crear un método como variable.**
Escribimos “ **public** ”, nombre de la variable que se presentará, nombre del método y “()”. Abrimos
llaves y escribimos el código. Para que devuelva la variable escribimos “ **return** ” y la variable. Para
hacer referencia a las variables de esta “ _Class_ ” es conveniente escribir “ **this.** ”.

**public int** método()
{
**return this** .variable;
}

**Crear un método como para cambiar los valores.**
Escribimos “ **public** ”, nombre del método y “()”. Abrimos llaves y escribimos el código. Para. Para
hacer referencia a las variables es conveniente escribir “this.”.

**public** método( **int** variable1, **int** variable2)
{
**this** .variable= variable1;
**this** .variable= variable2;
}

## LA HERENCIA.

### QUE ES.

Esto es una característica de la programación orientada a objetos. Consiste en crear un nuevo
objeto pero con parecidas características a el objeto principal.

**CREAR NUEVO OBJETO A PARTIR DE OTRO.**
El procedimiento es el mismo. En la propia “ _Class_ ” orientada a objetos del objeto del que variará es
donde trabajaremos. Pero para iniciarlo debemos ir a la “ _Class_ ” principal, debemos iniciar el objeto
como una variable. Colocamos el nombre de la “ _Class_ ” y el nombre deseado del objeto. Luego lo
declaramos “ **new** ” y el nombre del objeto a partir de otro“()”.

Class nombre= **new** ClassAPartirDeOtro();

**USAR UN METODO EN LA “CLASS” PRINCIPAL A PARTIR DE OTRO.**
Para declarar el nuevo objeto debemos seguir el mismo procedimiento, pero en lugar de poner el
nombre de la “Class” ponemos el del nuevo objeto.

Objeto.metodo();
Variable= Objeto.metodo();
Class nombre= **new** Class(valor, valor);

**CREAR UN MÉTODO A PARTIR DE OTRO.**
Este sistema funciona casi igual al principal. Para declarar el nuevo objeto escribimos “ _Class_ ” el
nombre del objeto más “ **extends** ” y el objeto original. Lo demás funciona igual.


**Class** objetoAPartirDeOtro **extends** objetoPrincipal
{
**public** método( **int** variable1, **int** variable2)
{
**this** .variable= variable1;
**this** .variable= variable2;
}
public **void** método()
{
Código para ejecutar;
}

**public int** método()
{
**return this** .variable;
}
}

**POLIMORFISMO**
Esto no es otra cosa que al hacer una herencia puedes tener un método con el mismo nombre que
ejecutan cosas diferentes.

En el objeto principal:

**public void** información ()
{
System.out.println(“Estoy dando información”);
}
Resultado: Estoy dando información

En el otro objeto:

**public void** información ()
{
System.out.println(“Este mensaje va a ser distinto al anterior”);
}

Resultado: Este mensaje va a ser distinto al anterior

**EJECUTAR VARIOS PROCESOS AL MISMO TIEMPO.
CREAR**
Para usar esto debemos usar una nueva “ _Class_ ” orientada a objetos.

**USAR EN LA CLASE PRINCIPAL.**
Para usar este método debemos inicializar el objeto:

Thread nombre = **new** nombreMétodo(“nombreProceso”);


Y para que se ejecute el proceso:

nombre.start();

**CREAR EL METODO.**
Para crear el método en la “ _Class_ ” orientada a objetos debemos escribir esto:

**public Class** nombreMétodo **extends** Thread
{
**public** nombreMétodo (String msg)
{
**super** (msg);
{

**public void** run ()
{
//aquí escribiremos lo que se ejecutará.
{
}

# Parte 3: Variables de texto.

### CREAR

Para hacer esto debes importar un archivo, “ _java.io.*_ ”

**import** java.io*;

**LEER TEXTO**
Una vez importado el archivo, colocaremos lo siguiente:

InputScreamReader in= **new** InputScreamReader (System.in);
BufferedReader buffer= **new** BufferedReader (in);

**try**
{
variableDeTexto= buffer.readLine();
} **catch** (IOExcepcion e) {};

**CREAR UN ARCHIVO.**
Debemos crear un nuevo archivo en el “ _Package_ ” y importar “ _java.io*_ ”

**import** java.io*;

**LEER EL ARCHIVO**
Una vez importado el archivo, colocaremos lo siguiente esto solo imprimirá la primera linea:

**try**
{
FileReader r = **new** FileReader (NombreArchivo);


BufferedReader buffer= **new** BufferedReader (r);
System.out.println(buffer.readLine());
} **catch** (Excepcion e)
{
System.out.println(“e.getMessage()”);
};

Para leer todo el archivo debemos escribir esto.

**try**
{
FileReader r = **new** FileReader (NombreArchivo);
BufferedReader buffer= **new** BufferedReader (r);
String temp= “”;
**while** (temp != **null** )
{
System.out.println(buffer.readLine());
**if** (temp== **null** )
{
**break** ;
}
System.out.println(temp);
} **catch** (Excepcion e)
{
System.out.println(“e.getMessage()”);
};

**CREAR UN ARCHIVO DESDE EL PROGRAMA.
import** java.io*;
File file= **new** File (NombreArchivo);
**try**
{
FileWriter write= **new** FileWriter(file);
BufferedWriter bw= **new** BufferedWriter(write);
PrintWriter pw= **new** PrintWriter(bw);

pw.write u pw.appent (“Texto a seguir”);
pw.close;
be.close;
} **catch** (IOExcepcion e) {};

# Parte 4: Aplicaciones Gráficas.

### LIBRERIAS NECESARIAS.

- **import** java.awt.* : Dependen del sistema operativo.
- **import** javax.swing.* : No dependen del sistema operativo.
- Otra opccion es ignorarlo todos, y luego que el entorno de desarrollo te ayude a especificar
    los “ **import** ”


### EMPEZAR.

Para poder hacer aplicaciones gráficas debemos crear una “ _Class_ ” orientada a objetos y
importamos una librería. Luego debemos extender (“ **extends** ”) de una librería llamada “ _Jframe_ ”.

**OBJETOS DE LA APLICACIÓN.**
Import java.swing.JFrame;
import java.swing.JPanel;
Public class ventana extends Jframe{
Jpanel panel;
public ventana(){
panel= new JPanel();

```
this.add(Jpanel);
Jpanel.add(JLabel);
```
**this** .setDefaultCloseOperation(javax.swing.WindowConstants. **_EXIT_ON_CLOSE_** );
}
}

**OBJETOS DE LA APLICACION.**

- JPanel: Panel que contiene la aplicación.
- JLabel: texto en la aplicación.
- JButton: un botón en la aplicación.
- JtextField: una barra para escribir.

**Jpanel**.

- Jpanel.setbackground(color.color); selecciona el color de fondo.

**JLabel.**

- jlabel.setText(“Text”): añadimos texto a un objeto.
- Jlabel.setFont(new java.awt.Font(“font” modo/*0 normal, 1 negrita, 2 cursiva, 3 cursiva y
    negrita*/, tamaño); seleccionamos el tipo de letra.
- jlabel.setForeground(color.color); selecciona el color.

**Jbutton**.

- Jbutton.addActionLIstener(this); añade un evento.
- Jbutton.setText(“text”); añade texto.
- jbutton.setForeground(colo.color); selecciona el color.
- Jlabel.setFont(new java.awt.Font(“font” modo/*0 normal, 1 negrita, 2 cursiva, 3 cursiva y
    negrita*/, tamaño);

**LAYOUTS**

- FlowLayout: es horizontal, de izquierda a dercha, y se puede seleccionar el espaciado entre
    cada componente.
- GridLayout: coloca los elementos en cuadricula.
- BorderLayout: coloca los elementos en diferentes areas, el norte, el sur, el este, el oeste y el
    centro y otras cosas.

**Como hacerlo.**


Para poner el layout de todos los JPanel:
this.setLayout(new layout);

Para poner layout al JPanel:
//se hace cuando se añade al Jframe
this.add(Jpanel, layout);

### EVENTOS.

**ActionListener-> Implementar arriba en clase**

**public class ñlfkjasld implements ActionListener{}**

**E implementar todos los métodos abstractos + en el boton .addActionListener(this);**

**public actionPerformed(ActionEvent a){
if (a.getSource() = = un objeto){lo que quieras que haga}
}**

**KeyListener-> Implementar arriba en clase**

**E implementar todos los metodos abstractos+en todo .addKeyListener(this);**

**public keyTyped(){}
public keyPressed(){}
public keyReleased(){}**

**dentro:
if (e.getKeyCode() == numero de tecla){}**

**WindowListener-> añadir esto**

**this.addWindowListener(new WindowAdapter() {**

**public void windowOpened(WindowEvent e) {
System.out.println("opened");
}**

**public void windowClosing(WindowEvent e) {
System.out.println("closing");
}**

**public void windowClosed(WindowEvent e) {
System.out.println("closed");
}**

**public void windowIconified(WindowEvent e) {**


**System.out.println("iconified");
}**

**public void windowDeiconified(WindowEvent e) {
System.out.println("deiconified");
}**

**public void windowActivated(WindowEvent e) {
System.out.println("ativated");
}**

**public void windowDeactivated(WindowEvent e) {
System.out.println("deactived");
}**

**});**

# Parte 5: Algoritmos.

## ALGORITMOS

- Algoritmo para mostrar números impares.

**for** ( **int** i= 0; i<= ,números que llega la serie, i++)
{
**if** ((i % 2) != 0)
{
System.out.println(i);
{
}

- Serie fibonacci. Serie de la suma de su anterior.

**int** x= 1;
**int** anterior= 0;
**int** temp;
**Switch** ( **true** )
{
System.out.println(x);
temp= x;
x = x + anterior;
anterior = temp;
**if** (x > , números más alto de la serie)
{
**break** ;
}
}

**ORDENAR**

- Ordenamiento de burbuja.


**int** aux;
**boolean** cambios= **false** ;
**while** ( **true** )
{
**for** ( **int** i=1; i < array.lenght(); i++)
{
**if** (array[ i ] < array[i – 1])
{
aux = array [i];
array[i] = array[i – 1];
array [i – 1] = aux;
cambios = **true** ;
}
}
}

- Ordenamiento por inserción ( _Insertion sort_ ).
**int** aux;
**int** cont1;
**int** cont2;
**for** (cont1 = 1; cont1 < array.lenght; cont1++)
{
aux = array [cont1];
**for** (cont2 = cont1; cont2 >= 0 && array[cont2]> aux; cont2- -)
{
array[cont2+1] = array [cont2];
array [cont2] = aux;
}
}
