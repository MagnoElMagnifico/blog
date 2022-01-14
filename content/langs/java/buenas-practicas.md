# Buenas prácticas en Java
## Variables
+ Las variables deberían inicializarse donde se declaran (o lo antes posible) y
  deberían declararse en el ámbito más pequeño posible.
+ Las conversiones de tipos deben hacerse siempre explícitas.
+ Aquellos que tengan poco ámbito, su nombre debe de ser corto y viceversa.
+ Las variables nunca deben tener más de una función.
+ Las variables de clase nunca se deberían declarar públicas.
+ Las variables relacionadas del mismo tipo se pueden declarar en una sentencia
  común.
+ Los arreglos deberían declararse con corchetes junto al tipo.
+ Las constantes de punto flotante siempre se deberían escribir con punto
  decimal y con al menos un decimal. Además, deben llevar algún dígito antes de
  la coma decimal.

## Bucles
+ Debería evitarse el uso de ciclos do-while.
+ Los iteradores deberían inicializarse inmediatamente antes del bucle.
+ Se debería evitar el uso de break y continue en las repeticiones.

## CONDICIONALES
+ Se debe evitar las expresiones condicionales, mejor usar una booleana temporal.
+ El condicional debería colocarse en una línea separada.
+ Debe evitarse las sentencias ejecutables en los condicionales.


## Nomenclatura
+ En inglés por favor.
+ Los acrónimos y siglas van en minúsculas.
+ Sin abreviaciones.

+ Paquetes en Minúsculas `texto.de.ejemplo`.
+ Tipos/Clases deben ser in sustantivo empezando por mayúscula con CamelCase
  `TextoEjemplo`.
+ Variables/Métodos también en CamelCase. Si son privadas se añade "_" al
  principio `textoDeEjemplo`.
+ Constantes/Variables final: Mayúsculas separados por "_" `TEXTO_DE_EJEMPLO`.

> Nota: En general, es mejor usar métodos: `int getConstant() { return 0; }`
> En lugar de: `public static final constant = 0;`

+ Parámetros: Los genéricos llevan el nombre que su tipo`setColor(Color color)`.
+ Booleans/Métodos booleans: Deben empezar por "is" `isVisible`.
+ Listas: Van en plural `values`.
+ Iteradores: `i`, `j`, `k`...

## Prefijos y sufijos
+ P: get/set: Getters y Setters de una clase.
+ P: is (has/can/should): Booleans y métodos que devuelven booleans.
+ P: n: Donde se guarda un número de objetos.
+ P: compute: Donde algo se calcula.
+ P: find: Donde algo se busca.
+ S: En JFC (Java Swing), los componentes deberían llevar de sufijo su tipo.
+ S: Exception: Derivadas de esta clase.

### Otros
get/set, add/remove, create/destroy, start/stop, insert/delete,
increment/decrement, old/new, begin/end, first/last, up/down, min/max,
next/previous, old/new, open/close, show/hide.

## Archivos
+ La sentencia package debe ser la primera sentencia del archivo.
+ La sentencia import debe seguir a las sentencia package. Deben separarse en
  grupos por espacios.
+ Las clases deberían declararse en archivos individuales con un nombre de
  archivo que concuerde con el nombre de la clase.
+ El contenido del archivo debe mantenerse en 80 columnas.

1. Corte después de una coma.
2. Corte después de un operador.
3. Alinear la nueva línea con el inicio de la expresión en la línea anterior.
+ Debe evitarse caracteres especiales como TAB (2 espacios) y salto de página.

## Declaraciones
### Clases
1. Documentación de la Clase/Interface.
2. Sentencia `class `o interface.
3. Llave de apertura (en nueva línea)
4. Variables de clase (estáticas) en el orden `public`, `protected`, `package`
  (sin modificador de acceso), privadas.
5. Variables de instancia en el orden `public`, `protected`, `package`
  (sin modificador de acceso), `private`.
6. Constructores.
7. Métodos (sin orden específico):

```java
<acceso> static abstract synchronized <inusual> final native
{
  // Código
}
```
+ `<acceso>`: `public`, `protected` & `private`
+ `<inusual>`: `volatile` & `transient`
