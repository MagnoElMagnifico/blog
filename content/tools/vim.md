---
title: Vim y Neovim
weight: 2
---

> **Nota**: La mejor forma para aprender Vim es practicándolo, no intentes
> memorizar todos los comandos de golpe, ve usándolos y mecanizándolos poco a
> poco.

# Comandos Básicos
## Moverse
- `h j k l`: izquierda, abajo, arriba, derecha.
- `H M J`: arriba, centro, abajo de la pantalla
- `C-u C-d`: media pantalla
- `{ }`: párrafo (entre líneas vacías)
- `0 $`: inicio, fin de línea
- `zz`: centrar cursor en la pantalla
- En mayúscula también avanza la puntación:
    - `w`: siguiente palabra
    - `e`: final de la siguiente palabra
    - `b`: palabra enterior
    - `ge`: final de la palabra anterior
- Ir a:
    - `%`: ir a la pareja de ( ), [ ] o { }
    - `<number>gg` / `<number>G`: ir a la línea `number`
    - `gg G`: inicio, final del archivo
    - `gd`: ir a la declaración

## Insertar
- `i a`: antes, después del cursor
- `I A`: principio, final de la línea
- `o O`: nueva línea debajo, arriba
- `ea`: insertar después de palabra

## Editar
- Reemplazar:
    - `r`: caracter
    - `cw`: palabra
    - `cc`: línea
- `J`: juntar con la línea siguiente
- `<< >>`: mover texto a la derecha, izquierda
- Copiar
    - `yw`: hasta el principio de la palabra siguiente
    - `yiw`: palabra
    - `yy`: línea
    - `y$`: hasta el final de la línea
- Cortar
    - `x`: caracter
    - `dw`: hasta el principio de la palabra siguiente
    - `diw`: palabra
    - `dd`: línea
    - `d$ D`: hasta el final de la línea
- `p P`: pegar antes, después

## Seleccionar
- `v`: iniciar modo visual (`V` selecciona toda la línea)
- `i_`: selecciona todo / `a_`: selecciona lo de dentro
    - `w`: palabra
    - `b (`: bloque con ( )
    - `B {`: bloque con { }
    - `t`: bloque con <>
- `o O`: moverse al otro lado de la selección, bloque
- `u U`: minúsculas, mayúsculas
- `< >`: identar
- `y`: copiar
- `x d`: cortar

## Buscar
- `f<char>`: en la misma línea
- `F<char>`: en la misma línea detras
- `t<char>`: 1 posición antes de `char`
- `; ,`: siguiente, anterior `char` en la busqueda

### Registros
- `"<name><acción>`: usar el registro
- `""`: registro sin nombre (por defecto)
- `"_`: registro agujero negro (no se guarda?)
- `"<0-9>`: registro de copiar (0 más nuevo, 9 más viejo)
- `".` `"%` `":` `"#`: readonly (último texto insertado, relative current path, recent command, alternate file?)
- `:reg`: para ver el contenido
