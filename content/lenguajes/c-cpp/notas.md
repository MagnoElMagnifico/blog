---
title: Notas TODO
weight: -1
draft: true
---

# Links
- [Compilador] para Windows.
- [Convenciones] interesantes para el lenguaje C.

[Compilador]: https://osdn.net/projects/mingw/
[Convenciones]: https://www.doc.ic.ac.uk/lab/cplus/cstyle.html

# Acciones Básicas
```c
int main() {
    // Código
    return 0;
}
```

Con argumentos de línea de comandos:
```c
int main(int argc, char *argv[]) {
    // Código
}

// o

int main(int argc, char **argv) {
    // Código
}
```

## stdout
```c
printf("");
```

- `%d`: `int` (same as `%i`)
- `%ld`: `long int` (same as `%li`)
- `%f`: `float`
- `%lf` `%g`: `double`
- `%c`: `char`
- `%s`: `string`
- `%x`: `hexadecimal`

Más información [aquí](https://www.it.uc3m.es/pbasanta/asng/course_notes/input_output_printf_es.html).

- `\\`: `\`
- `\"`: `"`
- `\'`: `'`
- `\n`: Nueva línea.
- `\r`: Devolver el cursor al principio de la línea (retorno de carro).
- `\b`: Borrar caráter.
- `\t`: Tabulador
- `\f`:
- `\a`: Sonido de alerta
- `\v`:
- `\?`:
- `\nnn`: Carácter con el valor octal `nnn`.
- `\xhh`: Carácter con el valor hexadecimal `hh`.
getchar();

# Tipos
Tipos de memoria &#8594; stack / heap

- Variables &#8594; typedef enum { F, T } bool; // 1 - true and 0 - false
- Constantes
- Operadores
- Conversiones de tipo
- Punteros
- Lista/arrays
- Strings (\0)
    - `atof( )`: función que convierte `string` to `float`
    - `atoi( )`: función que convierte `string` to `int`
    - `atol( )`: función que convierte `string` to `long`
    - `itoa( )`: función que convierte `int` to `string`
    - `ltoa( )`: función que convierte `long` to `string`
· Enums

    TIPOS DE DATOS
        3 basicos
            · int            &#8594; enteros
            · char           &#8594; letra
            · float / double &#8594; decimales

        modificadores
            · short/long &#8594; simplemente es mas grande, no sabemos cuanto
            · unsigned
            Nota: da igual el orden

CONTROL
· Condicionales
· Operadores booleanos
· Bucles
    - For
    - Foreach
    - While
    - Do while

ORGANIZACION
· Funciones
· Structs

STD
· Streams
· Archivos

fflush(stdin);//Vacía ns q vaina de q se llenan los strings solos

Podemos usar un dato genérico:
template <class nombreTipo>
nombreTipo funcion()

Nodo * lista = NULL;
añadir(Nodo *& lista, int n){
   Nodo * nuevoNodo = new Nodo();
   nuevoNodo->elemento=n;
   Nodo * aux = lista;
   Nodo * aux2;
   while ((lista != NULL) && (aux->elemento > n)){
      aux2 = aux;
      aux = aux->siguiente;
   }
   if (lista == aux){
      lista = nuevoNodo;
     }else{
        aux2->siguiente=nuevoNodo;
     }
     nuevoNodo->siguiente= aux;
}
mostrar(Nodo*lista){
    Nodo * actual = new Nodo ();
    actual = lista;
    while (actual != NULL){
       cout << actual->elemento;
       actual=actual->siguiente;
    }
 }
 bool buscar(Nodo *lista, int n){
    bool res=false;
    Nodo * actual = new Nodo();
    actual=lista;
    while((actual != NULL) && (actual->elemento <= n)){
       if (actual->elemento == n){
          res= true;
       }
       actual=actual->siguiente;
    }
    return res;
 }
 borrar(Nodo*lista, int n){
    Nodo * auxBorrar= lista;
    Nodo * anterior= NULL;
    while((auxBorrar != NULL)&&(auxBorrar->elemento!=n)){
       anterior=auxBorrar;
       auxBorrar=auxBorrar->siguiente;
    }
    if (auxBorrar==NULL){
       cout << "El elemento no existe";
    } else if (anterior==NULL){
       lista=lista->siguiente;
       delete auxBorrar;
    }else{
       anterior->siguiente=auxBorrar->siguiente;
    }
       delete auxBorrar;
 }
 borrarTodos(Nodo*pila, int & n){
    Nodo * aux = lista;
    n = aux->elemento;
    lista= aux->siguiente;
    delete aux;
 }
ARBOL
Son unos nodos conectados entre si (ramas). Su nodo principal se le llama raiz y a los otros hijos. Aquellos hijos q no tienen mas hijos se les llaman hojas

Nodo para arbol binario o de orden 2(dos hijos max por nodo)
struct Nodo{
   int dato;
   Nodo * izq;
   Nodo * der;
}

Longuitud de camino es la cantidad de ramas por las q hay q pasar hasta llegar a determinado nodo desde el nodo raiz.

 Altura & profundidad
Niveles=altura

Nodos hermanos: están al mismo nivel y comparten un padre

ARBOL BINARIO
Es una estructura recursiva (se repite). Tiene 3 subconjuntos:
   ~ Nodo raiz
   ~ Subarbol derecho
   ~ Subarbol izquierdo
Tipos:
   ~ Lleno: todos los nodos completos
   ~ Completo: como el lleno, pero en la parte derecha hay menls q en la izquieda
   ~ degenerado: solo 1 hijo cada nodo (lista)

ARBOL BINARIO DE BUSQUEDA
los datos de la izq son menores a la raiz q en la derecha

INSERTAR
struct Nodo{
   int dato;
   Nodo * izq;
   Nodo * der;
}
Nodo * crearNodo(int n){
   Nodo * nuevoNodo = new Nodo();
   nuevoNodo->dato=n;
   nuevoNodo->izq=NULL;
   nuevoNodo->der=NULL;
   return nuevoNodo;
}
void insertar(Nodo*arbol, int n){
   if (arbol == NULL){
       Nodo * nuevoNodo= crearNodo(n);
      arbol=nuevoNodo;
   }else{
      int valorRaiz= arbol->dato;
      if (valorRaiz > n){
         insertar(arbol->izq, n);
      }else{
         insertar(arbol->der, n);
      }
   }
}

------------------------------------------------------------

El mínimo bloque es 32bytes.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    char* p = (char*) malloc(sizeof(char));
    for (int i = 0; i < SIZE+32-sizeof(size_t); i++) { // Funciona, pero con <=, runtime error de malloc
       p[i] = 'a';
    printf("%s\n", p);
    return 0;
}
```

```c
int main() {
  return 0;
}
```

