---
title: SOs para C
weight: 0

draft: true

extra:
    show_toc: true
    show_details: true
---

### Sistemas Operativos
La siguiente lista muestra por orden las diferentes capas de hardware y software
para un sistema operativo.

1. Hardware &#8594; CPU, RAM, Disco Duro...
2. Drivers &#8594; Los programas que se necesitan para poder comunicarse con el
hardware (son distribuidos por los venderes del dispositivo).
3. Kernel &#8594; El núcleo del SO: Lo conto
4. Servicios
5. Interfaz de Usuario
6. Aplicaciones

#### CPU, GPU, RAM, BIOS/UEFI...

```
Da acceso al Hardware desde Software
```
```
Controla todo el sistema
```
```
Gestión de archivos, memoria, seguridad...
```
```
Permite la interacción: gráfica o comandos
```
```
Navegadores, juegos, editores...
```

### Interfaz de comandos / CMD / Shell / Terminal / ...


### Interfaz de comandos / CMD / Shell / Terminal / ...

```
● echo <mensaje>: imprime en pantalla el mensaje
● cd <carpeta>: cambia la carpeta actual (.. para ir atrás)
● ls / dir: muestra los archivos en la carpeta actual
● mkdir <carpeta>: crea una carpeta dentro de la actual
● copy <archivo> <destino>: copia un archivo a otro lugar
● del <archivo>: borra un archivo
● rmdir <carpeta>: borra una carpeta
● rename <archivo> <nombre>: renombra un archivo
● cls: limpia la pantalla
● exit: cierra la terminal
● help: muestra ayuda
● type <archivo>: permite ver un archivo desde la terminal
● time: muestra la hora
● color -h: configura el color de la consola
```

### Algunos trucos

```
● No distingue mayúsculas de minúsculas
● Si un archivo tiene espacios, da todo su nombre entre comillas (“”)
● Usa el tabulador para el autocompletado
● Ctrl + C: detiene un programa
● Las teclas de función (F1, F2, ...) tienen cada una su uso
● Flechas: navegar entre comandos anteriores
● <comando> && <comando>: varios comandos a la vez
● Tuberías (redirigen la salida de un comando a otro)
● <comando> | find “<query>”: filtra la salida
● <comando> | more: imprime la salida línea a línea.
● <comando> | clip: copia la salida
● <comando> > <archivo>: guarda la salida en un archivo
● echo “hola” > test.txt: escribe hola en un archivo llamado test.txt
● echo “hola” >> test.txt: añade hola a un archivo llamado test.txt
```
https://www.lifewire.com/list-of-command-prompt-commands-
https://www.makeuseof.com/tag/command-prompt-vs-windows-powershell-whats-difference/


### Más cosas sobre CMD

Hay dos tipos de comandos:

● **Internos** : son aquellos que están dentro del propio CMD.exe, y se cargan a la

vez que el SO.
● **Externos** : se encuentran en diversos directorios, y se cargan en memoria

```
cuando es necesario gracias a la variable del entorno PATH.
```

### Variables del entorno

```
● Las variables del entorno son
valores que guarda el sistema
operativo.
```
```
● Constan de un nombre y un
valor, ambos texto.
```
```
● El valor es normalmente un
directorio.
```
```
● Podemos usarlas como atajos,
en lugar de escribir las
direcciones enteras, mediante
%<nombre>%
```

### Variables del entorno: PATH

```
● Esta variable es especial, define aquellas carpetas donde
guardamos los programas que ejecuta CMD.
● De lo contrario, para ejecutar un programa en la consola,
tendríamos que escribir su dirección completa:
```
```
● En lugar de simplemente python example.py
```
C:/Users/usuario/AppData/Local/Programs/Python/Python38-32/python.exe example.py


### Bonus

Podemos extraer todo esto de los comandos a programas ejecutables simplemente
escribiendo los comandos en una línea nueva de un archivo .sh (Unix) o .bat (Windows)

```
https://www.windowscentral.com/how-create-and-run-batch-file-windows-
```

### ¿Qué se necesita para programar en C?

● Un compilador es el programa encargado de pasar nuestro código

(texto) a un ejecutable (binario): [http://mingw-w64.org/doku.php](http://mingw-w64.org/doku.php)
● A mayores podríamos necesitar un lugar dónde escribir el código,

```
pero esto es opcional.
```
## Compilador .exe


### Tipos de aplicaciones

● Consola: cualquier comando, compiladores, herramientas...
● Escritorio: como Discord, LibreOffice, juegos...
● Web (servidor, navegador: gracias a web assembly)
● Móviles


# #include <stdio.h>

# void main() {

# printf(“Hello World”);

# }
