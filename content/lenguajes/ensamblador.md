---
title: MIPS
description: >-
    TODO
date: 2023-2-23
weight: -1
draft: true
---

# MIPS (32 bits)

Segmento de datos y segmento de código.
Etiquedas
Pseudo instrucciones
Registros

Segmento de datos

```nasm
.data
cadena1: .asciiz “Hola”
cadena2: .space 200 # Reserva 200 bytes para la cadena cadena2

# Corregido
.text
.globl main
main:
```
<instruccion>i     operacion con constante

tamaño de instruccion 32 bits, direcciones de memoria 32 bits
00001 | 1110 |
parte de instruccion | registro
la = lui + ori
la pseudoinstruccion

# Registros

Cada registro tiene un uso propio
Contador de programa (PC): donde esta la instruccion siguiente

# Llamadas al sistema

codigo de llamada hace una cosa distinta
dicho codigo se guarda en $v0
syscall 

Primero ensamblar, luego ejecutar

```asm
# segmento de texto
.text
.globl main

main:
    addi $a0, $zero, 4660   # Sumar 0 + 4660 en $a0
    addi $a1, $zero, 65244
    add $a0, $a0, $a1 # a0 = a0+a1

    addi $v0, $zero, 1
    syscall # Imprimir resultado

    addi $v0, $zero, 10
    syscall # Fin de ejecucion
```

| Código               | Contenido PC     | Contenido $t0    |  Contenido $a1     | Contenido $a2 |
|:---------------------|:-----------------|:-----------------|:-------------------|:----------|
| `lui $t0, 0x1001`    | 0040 0004        | 1001 0000        |  0000 0000         | 0000 0000 |
| `ori $t0,$t0 0x0000` | 0040 0008        | 1001 0000        |  0000 0000         | 0000 0000 |
| `lw $a1, 0($t0)`     | 0040 000c        | 1001 0000        |  1234 5678         | 0000 0000 |
| `lui $t0, 0x1001`    | 0040 0010        | 1001 0000        |  1234 5678         | 0000 0000 |
| `ori $t0,$t0 0x0004` | 0040 0014        | 1001 0004        |  1234 5678         | 0000 0000 |
| `lw $a1, 0($t0)`     | 0040 0018        | 1001 0004        |  1234 5678         | fedc ba98 |

```asm
# segmento de datos
.data
a:  .word 305419896
b:  .word -19088744
c:  .word 0

# segmento de texto
.text
.globl main

main:
    la $t0, a # Carga la direcci ́on de a en $t0
    lw $a1, 0($t0) # Carga el valor contenido en a en $a1

    la $t0, b # Carga la direcci ́on de b en $t0
    lw $a2, 0($t0) # Carga el valor contenido en b en $a2

    la $t0, c # Carga la direcci ́on de c en $t0
    lw $a0, 0($t0) # Carga el valor contenido en c en $a0

    add $a0, $a1, $a2 # Hace $a0 = $a1+$a2
    sw $a0, 0($t0) # Guarda el valor contenido en $a0 en

    # la direcci ́on indicada por $t0
    addi $v0, $zero, 1 # Codigo syscall 1 = imprime el entero en $a0
    syscall # Llamada al sistema

    addi $v0, $zero, 10 # Codigo syscall 10 = Finaliza ejecuci ́on
    syscall # Llamada al sistema

# La instrución la expande a:
                # t0 0000 0000
lui $t0, 0x1111 # t0 1111 0000   cargar 16 bits
ori $t0, 0x2222 # t0 1111 2222   hace un or a los 16 bits del final
```

```asm
# segmento de datos:
.data
cadena: .asciiz "Hola Mundo!"

# segmento de texto
.text
.globl main
main:
    la $a0, cadena    # Dirección de la cadena en $a0
    addi $v0, $0, 4   # Codigo syscall 4 = imprimir cadena de texto
    syscall           # Llamada al sistema.

    addi $v0, $zero, 10  # Codigo syscall 10 = Finaliza ejecuci ́on.
    syscall           # Llamada al sistema

# en memoria: 0x61 6c 6f 48   0x
#                a  l  o  H
```

Es un sistema Litte-Endian

```asm
.data
cadena: .ascii "Ho"
num: .word 2

# en memoria: 0x00 00 6f 48   0x00 00 00 02
#                      o  H           int 2
```

busca el primer hueco donde le quepa el entero


```nasm
.data
cadena1: .ascii "Ho"
num: .word 2
cadena2: .ascii "l"
cadena3: .ascii "a"

# en memoria: 0x00 00 6f 48   0x00 00 00 02 0x00 00 61 6c
#                      o  H           int 2          a  l
```

# Estructura

```
.data
# Variables ....

.text
.globl main

main:
# Instrucciones
```

# Instruciones comunes

```
la $t1, var ----> t1 = &var

add $1, $2, $3 ----> s1 = s2 + s3
sub $1, $2, $3 ----> s1 = s2 - s3
and $1, $2, $3 ----> s1 = s2 & s3
or  $1, $2, $3 ----> s1 = s2 | s3

lw $1, i($2) ----> s1 = *(s2 + i)
sw $1, i($2) ----> *(s2 + i) = s1

lb $1, i($2) ----> s1 = *(s2 + 1) (primer byte)
sb $1, i($2) ----> *(s2 + i) = s1 (primer byte)
```

```
beq $1, $2, E ----> if $1 == $2 goto E
bne $1, $2, E ----> if $1 != $2 goto E
```

# Syscalls

```
1   print_int     a0
2   print_float   f12
3   print_double  f12 f13
4   print_string  *a0

5   read_int      v0
6   read_float    f0
7   read_double   f0 f1
8   read_string   a0 (len a1)

10  exit
```

