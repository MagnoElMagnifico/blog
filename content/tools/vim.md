---
title: Vim y Neovim
description: Una pequeña overview de las principales funcionalidades de Vim con sus comandos
weight: 2
extra:
  show_toc: true
  show_details: true
  ref_link:
    name: El último tutorial de Vim
    link: https://danielmiessler.com/study/vim
---

> **Nota**: La mejor forma para aprender Vim es practicándolo, no intentes
> memorizar todos los comandos de golpe, sino incorpóralos progresivamente y
> ve mecanizándolos poco a poco.

# Porqué Vim

1. **Ligero**
2. **Super personalizable**
3. **Ergonómico**, con los atajos de teclado puedes trabajar muy rápido y cómodo
4. **Muy poderoso**: infinidad de opciones que no tendrás en otros editores
5. **Escalable**: puedes editar un simple archivo de 50 líneas o todo un proyecto
  con miles de archivos.

# Niveles de poder en Vim

No sé, pero creo que es curioso e interesante mencionarlos:

1. No saber Vim
2. Vim básico
3. Usar el modo visual
4. Usar varios movimientos
5. No usar el modo visual

# La ayuda de Vim

Otra increíble característica de Vim es su maravillosa documentación y manual
de ayuda. De forma offline y sin salir del editor, puedes buscar lo que 
necesites saber gracias al comando `:help` o `:h`.

En la documentación habrá unas **etiquetas** que funcionarán como enlaces en una
página web. Estas están entre `|`, pero se esconden cuando el resaltado de
sintaxis está activado. Para seguir el enlace usa `<C-]>` (o buscar ayuda 
sobre donde está el cursor) y para regresar `<C-o>`.

Si no estás seguro de lo que estás buscando, puedes autocompletar el contenido
del comando `:help` con `<C-d>`, que te mostrará todas las etiquetas 
relacionadas.

Para navegar más rápido entre las distintas secciones de la documentación, usa
`gO` para mostrar la **tabla de contenidos**, y usa enter para moverte a cada
una de ellas.

## Consejos de búsqueda

- `'foo'`: opción de configuración del editor (también puedes mirar en `options.txt`
  o en `option-list` para una breve descripción de todas ellas).
- `foo`: comando a buscar para modo _normal_ (o una _tag_ directamente, si no encuentra nada)
- `i_foo`: comando del modo _insert_
- `v_foo`: comando del modo _visual_
- `c_foo`: comando del modo _command line_
- `:foo`: comando del modo _ex_, es decir, un comando del editor
- `>foo`: comando a buscar para _debugging_
- `-foo`: opción a buscar de CLI (argumentos de consola de cuando inicias Vim)
- `+foo`: opción a buscar optativa
- `E<número> W<número>`: buscar un error, advertencia

Comandos de búsqueda para el manual de usuario:
- Tabla de contenidos en `usr_toc.txt`
- `:help 10.1`: ir directamente a la sección y capítulo dado

Alternativamente puedes usar `:helpg <patrón>`, que busca en todos los archivos
de la ayuda, no solamente en las etiquetas. Para ver el siguiente _match_ usa
`:cnext` o `:cn`; y el anterior con `:cprevious` o `:cp`. También puedes abrir
todos los resultados en una ventana aparte con `:cwindow` o `:copen`.

- `:helpg Foo`: case sensitive
- `:helpg foo\c`: case insensitive
- `:helpg foo@es`: buscar la ayuda en español

## Estructura de la ayuda

La ayuda de Vim consiste en dos partes:

- **Manual de usuario**, que se debería leer como un libro; ya que introduce
  progresivamente los diferentes conceptos del editor, de sencillo a complejo.
  Está orientado a las tareas a realizar.

- La **referencia**, donde se explica todo Vim detalladamente; comandos,
  configuración, como funciona, etc.

En lugar de leer tanto texto al comenzar (¡aburridooo!), puedes usar la guia
interactiva que proporciona Vim: el _Vim Tutor_. Es un tutorial de unos 30
minutos que te enseñará lo más básico. Ejecútalo con `:Tutor`.

La página principal de la ayuda está en `help.txt`, a la que puedes acceder
simplemente con el comando `:help`, `:h` o `:help help.txt`. Esta es el índice
para el resto de elementos de la ayuda, ya que contiene todos los enlaces a los
demás archivos, incluyendo (al final de todo) la documentación de cada plugin a
mayores que instales. Encontrarás un link a la página y su tema principal.

En la página `index.txt` se muestran todos los comandos (por defecto) del 
editor, con una breve descripción y un link para más información. Es buena 
idea consultar esta página cuando creas tu configuración y cambias los atajos,
ya que podrías estar inhabilitando otros comandos útiles. Si no quieres ver
absolutamente todos, y que habrá algunos que en tu vida usarás, ve a
`quickref.txt`.

En el apartado de `key-notation`, puedes obtener más información de como Vim
representa las diferentes teclas que puedes usar para los comandos. En este
post estoy usando esa notación. Para escribir teclas más rápidamente puedes
usar (en _command mode_) `<C-v>` y la tecla deseada.

# Entendiendo la edición modal

Vim es un **editor modal**, lo que quiere decir que existen diferentes modos de
funcionamiento y comportamiento dependiendo en qué modo te encuentres.

El modo _normal_ donde pasarás la mayor parte del tiempo ya que aquí están
los principales comandos de movimiento y sirve de transición hacia los otros
modos. Toda tecla que pulses se tomará como un comando, no para escribir texto.

Para hacer esto último, debes acceder al modo _insert_ presionando la tecla `i`.
Ahora podrás escribir texto como en otros editores. 

También existe el _replace mode_, al que se accede con `R`, y hace exactamente
lo que dice: reemplazar el carácter actual por el nuevo que escribas.

El modo _visual_ se inicia al hacer una selección de texto con `v`,
permitiéndote operar con él. Este modo selecciona carácter por carácter, pero
existen los modos _visual line_ (`V`), que selecciona líneas enteras, y _visual_
_block_ (`<C-v>`), selección en bloque o por columnas. A partir de estas
selecciones, podemos hacer cambios solamente en el texto seleccionado con otros
comandos.

Paralelamente existe el _select mode_ (accesible con `gh gH g<C-h>`
-_go highlight_-, y con `<C-g>` alternas a/desde _visual mode_), muy similar al
_visual mode_, pero en cambio se comporta de forma similar a los programas de
edición de texto de Windows: seleccionas texto y al comenzar a escribir se
sustituye el texto.

> **Nota**: al sustituir el texto seleccionado al comenzar a escribir algo, 
> `h j k l` dejan de funcionar y solo puedes usar las flechas del teclado. Si
> configuras las flechas a otras acciones, este modo resulta inútil. Además, se
> puede simular su funcionamiento desde _visual mode_, por lo que no es un modo
> esencial.

El modo _terminal_ emula una consola de comandos que puedes utilizar dentro del
propio editor, sin necesidad de cerrarlo. Para salir al modo normal, presiona
`<C-\><C-n>`.

El modo _cmd_ o _command line mode_ es el usado cuando escribes commandos Ex `:`,
patrones de búsqueda `/ ?` y filtros `!`.

En todos estos modos (excepto el _normal mode_) se te indicará en cual de ellos
te encuentras abajo de todo de la pantalla. En el caso del _command line mode_,
estarás escribiendo en ese espacio. Y para regresar al modo normal usa la tecla
_Escape_ (`<Esc>`) (excepto en _terminal mode_).

Para describir en qué modo se está ejecutando determinado comando, se añade `<char>_` antes de la notación de las teclas:
- `i_`: _insert_
- `v_`: _visual_
- `c_`: _command_
- ~~`n_`~~: _normal_, no hay
- ~~`t_`~~: _terminal_, no hay

# Vim como lenguaje

> A partir de ahora, los comandos que aparecen listados se ejecutarán desde el 
> modo _normal_ a menos que se diga lo contrario.

Realmente, los comandos en Vim pueden entenderse como un lenguaje por sí mismo,
así que cuando empieces a pensar en este lenguaje, podrás entender mucho mejor
el editor. Se diferencian en operadores, movimientos/nombres y modificadores
(hay quien les llama preposiciones). Combinándolos podrás crear las frases de
este lenguaje para describir los cambios que quieras en tu archivo de texto.

> Para leer sobre estos en la ayuda de Vim busca `:h motion` `:h operador`
> `:h aw` (continua leyendo las siguientes entradas en este último),
> recomendable en este orden.

**Operadores**: son los verbos del lenguaje de Vim, realizan acciones; y estos
dependen del modo en el que te encuentres.
- `c`: cambiar (_change_), es decir, borrar e iniciar _insert mode_
- `d`: borrar (_delete_)
- `y`: copiar (_yank_)
- `p`: pegar (_paste_)

**Movimientos / Nombres**: estos se pueden usar tanto como para mover el cursor,
como ser los objetos a los que realizar las acciones. Por ejemplo, puedo moverme
una palabra y entonces considera un _movimiento_. En cambio puedo usar un 
operador para borrar y combinarlo con un movimiento de palabra. En este caso,
yo lo considero un _nombre_, ya que está describiendo dónde el operador tiene
que actuar. Pero ojo, no todos los operadores necesitan un nombre, pero sí la
mayoría de ellos.

- `h j k l`: carácter a la izquierda/abajo/arriba/derecha. De esta forma no
  tienes que mover los dedos del teclado hacia las flechas. Para recordarlo
  piensa la `j` como una flecha hacia abajo, y `h`-`l` están a la
  derecha-izquierda respectivamente.
- `w`: palabra (_word_)
- `0 ^ $`: inicio/primer carácter no blanco/fin de línea; similares a `<Home> <End>`
- `f<char> F<char>`: hasta encontrar el carácter dado avanzando/retrocediendo (_find_)
- `t<char> f<char>`: hasta el carácter dado y se detiene antes avanzando/retrocediendo (_'til_)

También, por norma general, al no haber ningún nombre para la línea; se repite
el mismo operador para aplicarlo en la línea actual. Además, la versión en
mayúscula del operador es sinónimo de combinarlo con `$`: `D`=`d$`, `C`=`c$`...

> **Nota**: Todos los movimientos son nombres, pero no todos los nombres son
> movimientos.

**Modificadores** (opcional)
- `<número>` para repetir la acción. Se puede aplicar tanto a operadores como a movimientos y nombres.
- `i`: interno (_inner_)
- `a`: un (_a_); por ejemplo: `caw` _change a word_ (cambia una palabra). A
  diferencia de `i`, que solo afecta al nombre; `a` incluye el espacio
  que lo separa del siguiente.

> Estes dos últimos solo se pueden aplicar a nombres.

**Bonus**: 
- Vim también ofrece la posibilidad de forzar con `v V <C-v>` a forma de
  modificador, para que un nombre se interprete carácter por carácter, línea a
  línea, o en forma de bloque; a diferencia de su forma normal. Por ejemplo:

```
dj  ---> borra 2 líneas
dvj ---> borra desde el cursor hasta el carácter de debajo
d<C-v>j ---> igual que antes pero incluyendo el carácter inicial
```

## Construyendo frases (con ejemplos)

Borrar dos palabras:
```
d2w / 2dw
```

Cambiar (es decir, borrar y entrar en _insert mode_) la palabra en la que se
encuentra el cursor:
```
ciw
```

Y de forma similar sucede para movernos, por ejemplo bajar 10 líneas:
```
10j
```

Como no tenemos un modificador de línea, se repite la acción (**ojo**: ¡`dj`
borra dos líneas!):
```
dd ---> borra la línea actual
yy ---> copia la línea actual
cc ---> cambia la línea actual: la borra y entra en insert mode
```

Los modificadores también se pueden añadir al _insert mode_:
```
3ihola ---> holaholahola
```

# _Insert mode_

Entrar al _insert mode_:
- `i a`: antes/después del cursor
- `I A`: principio/final de la línea sin contar los espacios
- `gI`: principio de la línea
- `o O`: nueva línea debajo/arriba
- `ea`: insertar después de palabra
- `gi`: volver al _insert mode_ en el último lugar donde se estuvo en este
modo (marca `'^`)

## Comandos especiales en _insert mode_

- `<C-o>`: permite ejecutar un comando en _normal mode_ para después regresar a _insert mode_
- `<C-k>`: insertar un dígrafo, es decir, tildes. E.g: `<C-k>~n` = `ñ`, `<C-k>'a` = `á`
- `<C-t> <C-d>`: identar

Insertar texto ya insertado:
- `<C-e> <C-y>`: insertar carácter abajo/arriba del cursor
- `<C-a> <C-@>`: inserta el texto previamente insertado/y vuelve a _normal mode_

El comando `<C-x>` activa un _submodo_ dentro del _insert mode_, permitiendo
realizar más acciones, normalmente relacionadas con el autocompletado. Esos
comandos se tratarán en su respectivo apartado, pero `<C-x><C-e> <C-x><C-y>` se
puede usar para mover la ventana una línea hacia abajo, arriba; teniendo en
cuenta que el cursor no puede salir de la ventana ni desplazarse.

Operaciones con registros: 
- `<C-r><id>`: insertar el contenido del registro dado
- El registro `=` es especial, ya que te permite ejecutar expresiones de
  VimScript: operaciones aritméticas, leer variables de entorno, registros y
  condicionales con el operador ternario de C (`:h 41.3`)
- `<C-r><C-r><id>`: inserta contenido del registro

Borrar:
- `<C-w>`: borrar la palabra anterior (`bw`)
- `<C-u>`: borrar hasta el principio de línea (`d0`)

Curiosidades dentro de _insert mode_:
- `<Tab>` = `<C-i>`
- `<Enter>` = `<NL>` = `<CR>` = `<C-j>` = `<C-m>`

# Operadores

- `u <C-r>`: deshacer/rehacer (los cambios se guardan en la _changelist_, que la puedes ver con `:changes`)
- `g, g;`: ir a la primera/última posición de dicha lista
- `.`: repite el último comando realizado

Reemplazar:
- `r<nuevo_char>`: remplazar el carácter debajo del cursor y volver al modo normal (_replace_)
- `c<nombre>`: cambiar (_change_), es decir, borrar y entrar en _insert mode_.
- `s` = `cl`, pensado para usar como `<número>s`
- `S` = `cc`

Eliminar texto, o más bien, cortarlo; ya que todo lo que borremos se almacenará:
- `x`: carácter (_exterminate_)
- `d<nombre>`: eliminar (_delete_)

Copiar y pegar:
- `y<nombre>`: copiar (_yank_)
- `p P`: pegar antes/después (_paste_)

Formatear texto:
- `J`: juntar con la línea siguiente (_join_)
- `<< >>`: identar
- `gq gw`: formatear el texto/sin mover el cursor

El formateado del último comando se hace utilizando el contenido de las
opciones `'formatexp'` (expresión) y `'formatprg'` (programa externo). En en
caso de que ambas opciones estén vacías, el formateado se realizará con un
programa interno de Vim, teniendo en cuenta `'textwidth'` y `'formatoptions`
(ver `:h fo-table`).

Mayúsculas y minúsculas:
- `g~`: cambiar de mayúsculas a minúsculas y viceversa
- `gU`: cambiar todo a mayúsculas
- `gu`: cambiar todo a minúsculas
- _visual_ `U`: cambiar todo a mayúsculas
- _visual_ `u`: cambiar todo a minúsculas

## Seleccionar

- `v<nombre>`: iniciar modo _visual_
- `V`: iniciar modo _visual line_
- `<C-v>`: iniciar modo _visual block_

- `gv`: recuperar el modo visual anterior
- `o O`: moverse al otro lado de la selección (solo modo visual)

Los operadores funcionan diferente en este modo: en lugar de requerir un
nombre, se tomarán los caracteres marcados como el propio nombre de la
operación.

- `u U ~`: minúsculas/mayúsculas/alternar
- `x d`: cortar
- `c`: cambiar
- `y`: copiar
- `< >`: identar
- `gq`: formatear

# Movimientos y nombres 

Aparte de los movimientos ya comentados (a continuación, para recordar),
existen muchos otros.

- `h j k l`
- `w`
- `0 ^ $`
- `f<char> F<char>`
- `t<char> f<char>`

> `<C-g> g<C-g>`: muestra tu posición en el archivo actual
 
¡Más comandos!:
- `H M L`: arriba, centro, abajo de la pantalla (High - Medium - Low)
- `+ -`: bajar, subir una línea; pero poniendo el cursor en el primer carácter no blanco

## Movimientos que también pueden ser nombres

En primer lugar encontramos los movimientos relacionados con las
**palabras**. Vim separa las palabras con determinados caracteres, pero si
quieres que sea una palabra estricta, es decir solamente separada por espacios
(saltándose la puntuación), usa la versión en mayúscula.

- `w`: siguiente palabra (único de esta lista que puede llevar los modificadores `i a`)
- `e`: final de palabra siguiente
- `b`: principio de palabra anterior
- `ge`: final de la palabra anterior

Después, puedes desplazarte entre diferentes frases con `( )`. Vim las separa
con `.`, `!` o `?` (inclusive). Una frase también termina cuando lo haga el
párrafo.

```
Esto es una frase. ¡Y esto es otra frase para Vim!
Esto es
otro
ejemplo.
```

Para moverte entre párrafos usa `{ }`, y estos se consideran pedazos de texto
separados por líneas en blanco (o con caracteres en blanco). También puedes 
interpretarlo como hacer un salto hasta la siguiente línea vacía.

```
¡Hola! Este es un ejemplo
de párrafo según Vim.

Y este es otro párrafo
de ejemplo, para que veas
como debes separarlos.
```

Por último, si te quieres desplazar entre bloques de paréntesis o llaves,
puedes usar `[( ])` y `[{ ]}` respectivamente. Ten en cuenta que irá a por el
paréntesis o llave que no esté cerrado. Mira este ejemplo:

```c
int main() { // bloque 1
  ...
  { // bloque 2
    ...
  }
  ...
}
```

Si te encuentras dentro del bloque 2 y realizas `[{`, el cursor se desplazará a
la llave que tiene el comentario y dice ser el bloque 2. En cambio, si estás
fuera del bloque 2 pero en dentro del bloque 1, se moverá entre las llaves de
la primera y última línea.

Estos últimos movimientos, `( ) { } [{ ...`,  pueden usarse también como nombres, siempre y 
cuando no se usen con los modificadores `i a`, ya que se confundirían con los
siguientes.

## Nombres exclusivos con modificador

Es decir, nombres que no pueden ser movimientos; y dado que se confunden con
los movimientos normales, y por lo tanto deben ir acompañados siempre de un
modificador: `i a`.

- `s`: frase (_sentence_). Equivalente al movimiento con `( )`
- `p`: párrafo (_paragraph_). Equivalente al movimiento con `{ }`

- `( ) b`: paréntesis (_brackets_). Equivalente al movimiento con `[( ])`
- `{ } B`: llaves (_curly brackets_). Equivalente al movimiento con `[{ ]}`
- `[ ]`: corchetes (_square brackets_)
- `< >`: entre signos de `<` y `>` (_angular brackets_)
- `t`: entre etiquetas de XML/HTML (_tag_) (`<xxx>...</xxx>`)
- \` `" '`: entre comillas simples, dobles, o tildes graves

Para esclarecer un poco estos últimos, puede que sea necesario ver algunos ejemplos:

- `dip`: borra el párrafo actual
- `d}`: borra hasta el final del párrafo
- `di{` o `diB`: borra el contenido entre `{ }`
- `di"`: borra el interior de las comillas
- `da"`: borra el contenido de las comillas, estas inclusive

## Movimientos de Scroll

Movimientos de _scroll_, es decir, que mueven el contenido de la ventana y no
el cursor (el cursor debe de estar siempre en la ventana, así como consecuencia
del movimiento también es posible que se ajuste para que continue dentro). Al
no ser movimientos del cursor no se pueden usar como nombres y combinar con
operadores.

- `zz`: centrar cursor en la pantalla
- `<C-e> <C-y>`: moverse una línea abajo/arriba (_extra lines_/_???_)
- `<C-d> <C-u>`: moverse media pantalla (_Down_/_Up_)
- `<C-f> <C-b>`: moverse una pantalla abajo/arriba (_forward_/_backwards_)

Moverse cuando hay líneas cortadas (es decir, `wrap=false`):
- `z<Right> zl z<Left> zh`: mover la pantalla a la derecha/izquierda una columna/carácter
- `zL zH`: mover media pantalla a la derecha/izquierda

Más en `scroll.txt`.

También, cuando hay líneas que no aparecen completas horizontalmente en la
ventana, podemos movernos cómodamente:

- `gj gk`: bajar/subir una línea visible y no real (línea cortada vs línea real del archivo)
- `g0 g^ g$`: igual que con los comandos anteriores pero yendo al principio/primer carácter no blanco/final de línea

## Ir a

- `%`: la pareja de ( ), [ ], { }, /* */, o incluso #if #elif #else #endif...
- `<number>gg <number>G`: número de línea
- `gg G`: inicio/final del archivo
- `gf gF`: ir al archivo debajo del cursor/en determinada línea (usa la variable `'path'` para buscar los archivos)
- `gx`: abrir URL

- `gd gD`: ir a la declaración local/global

## Buscar

Estos comandos también funcionan como movimientos y nombres.

Buscan en la misma línea:
- `f<char>`: en la misma línea
- `F<char>`: en la misma línea detrás
- `t<char>`: 1 posición antes de `char`
- `; ,`: siguiente/anterior `char` en la búsqueda

Multilínea:
- `/<patrón> ?<patrón>`: realiza una búsqueda en todo el archivo y se desplaza al primer _match_ desde el cursor hacia delante, hacia atrás
- `n N`: repite la búsqueda anterior/al revés 
- `* #`: realiza una búsqueda con `/ ?` usando como patrón la palabra debajo del cursor 
- `g* g#`: igual que `* #` pero elimina `\< \>`, es decir, búsqueda parcial

## Marcas

Sirven como una especie de marcapáginas: se colocan en determinadas posiciones
de un archivo, para posteriormente regresar a ellas con un simple comando.

- `m<id>`: establece una marca en la posición del cursor
- \``<id> '<id>`: regresa a la marca/regresa al primer carácter no blanco de la línea marcada

El identificador o nombre de las marcas será una letra:
- Si es minúscula solo corresponderá al archivo actual, y se borrarán con el
  buffer, también si borras la línea en donde está la marca.
  Se pueden usar como movimientos/nombres.

- Pero si es mayúscula funciona a través archivos, ya que incluyen el nombre
  del archivo a la hora de recordar la marca. Estas se mantienen aunque se 
  borre la línea de la marca o el buffer.

Hay algunas marcas ya establecidas:

- Las que se llaman números no se pueden establecer directamente, sino que 
  recuerdan las posiciones en donde estuviste al cerrar Vim. `'0` es la última
  posición en el que lo cerraste, `'1` la penúltima, etc.

- `'[ ']`: recuerdan el primer y último carácter de texto editado o copiado
- `'< '>`: recuerdan el primer y último carácter de texto seleccionado
- `''`: recuerda la posición anterior a un salto o donde se hizo `m'`
- `'"`: recuerda la última posición del cursor antes de salir del buffer (individual para cada buffer)
- `'^`: recuerda la última posición del cursor al salir de _insert mode_ (se usa para el comando `gi`)

Con el comando `:marks` puedes listar todas las marcas actuales, y con
`delm[arks] <id>` borrarlas (solo a-zA-Z0-9).

Cada uno de los saltos que realices, se guardarán en la _jump list_ (cuyo
contenido puedes ver con `:jumps`o `:ju`) y los comandos `<C-o>` y `<C-i>` te
permitirán regresar a un salto anterior o posterior respectivamente.

Los movimientos de siguientes comandos se añadirán a la lista:
`gg G { } ( ) [{ ]} [[ ]] H M L % :tag <C-t> <C-]>`

> **TODO**: Yo personalmente uso mucho los movimientos de `{ }`, y es muy
> molesto que esos también se consideren saltos, ya que me llena la lista con
> saltos inútiles cuando realmente quería conservar otro salto; como ir al
> principio del archivo, búsqueda, etc.
> 
> Supongo que hasta encontrar una solución usaré `<C-d> <C-u>`

# Comandos Ex

<!-- TODO 
ranges
autocompletado
ventan
:checkhealth
:read
ZZ=:wq ZQ=:q! ==> Config: ZA=:qa!
ga=:as[cii]
<C-g>=:f[ile] g<C-g>
do=:diffget dp=:diffput
quickfix: :c...
list commands: :l...
-->

# Buffers, ventanas y pestañas

- Un _buffer_ es el texto cargado en la memoria de un archivo.
- Una ventana es un _viewport_ (representación gráfica) de un buffer
- Una pestaña es una colección de ventanas

Si quieres conservar la configuración actual de buffers, ventanas, opciones...
Puedes usar el comando `:mks[ession] [<nombre-archivo>]`, que crea un archivo de
VimScript que vuelve a configurar el editor. Cárgalo con `:source
<nombre-archivo>`.

## Buffers

Puedes listar los _buffers_ activos con el comando `:buffers`: el primer número
es su _id_, luego están los estados en los que se encuentra y el archivo al que
corresponde.

Un _buffer_ puede tener estar en los siguientes estados:

| Estado     | ¿Cargado en memoria? | ¿Aparece en una ventana? | `:buffers` muestra... |
| :--------: | :------------------: | :-----------------------:| :-------------------: |
| _active_   | Sí                   | Sí                       | `a`                   |
| _hidden_   | Sí                   | No                       | `h`                   |
| _inactive_ | No                   | No                       | ` `                   |

También hay otros tipos de indicadores, aparte de los del estado, y pueden
aparecer varios de ellos juntos:

- `u`: _unlisted_, solo aparece cuando se ejecuta `:buffers!`
- `%`: buffer actual
- `#`: buffer alternativo, al que se puede cambiar con `<C-^>` o `:e #`
- `+`: buffer modificado
- `-`: `'modificable'=false`
- `=`: solo lectura
- `R`: terminal ejecutando una tarea
- `F`: terminal ha terminado la tarea
- `?`: terminal sin tarea
- `x`: errores de lectura

Tipos especiales de buffers, que se consiguen combinando sus estados:

- _quickfix_: se usa para contener la lista de errores o de contenidos (ver `:h cwindow` y `:h lwindow`)
- _help_: contiene los manuales de ayuda
- _terminal_: el contenido no se puede cambiar o leer hasta que el trabajo termine
- _directory_: contenido de una carpeta, usado por plugins (`buftype=nowrite; bufhidden=delete; noswapfile`)
- _scratch_: texto que no se guarda y puede ser descartado; hay que borrarlo explícitamente (`buftype=nofile; bufhidden=hide; noswapfile`)
- _unlisted_: no aparece en la lista de buffers (`nobuflisted`)

Puedes usar los comandos `:bn[ext]` y `:bp[revious]` para moverte entre los
distintos buffers cargados en la memoria; o directamente ir al que quieras de
la lista con `:b[buffer]`, pero deberás aportar su _id_ o nombre. Hay más
comandos que puedes usar en la ayuda: `:h buffer-list`.

<!-- TODO 
sb sbn sbp 
br[ewind] = bf[irst] (go to first) sbr sbf
bl (last) sbl
bm (modified) sbm
bdelete (unload unlist) bwipeout (really delete) bun[load] (memory freed, listed)
ball (edit all)

+cmd ?
quickfix.txt: forma rápida de editar-compilar-editar
-->

## Ventanas

No hay una forma de listar las ventanas activas, pero no es necesario, ya que
se ven a simple vista.

Existen dos tipos de ventanas: _split_ es una ventana que aparece en horizontal
respecto a otra; y _vertical split_ que es una ventana que aparece en vertical.

> Estos comandos se ejecutan desde el _normal mode_, precedidos por `<C-w>`

Abrir y cerrar ventanas
- `s`: abrir nueva ventana horizontalmente (_split_)
- `v`: abrir nueva ventana verticalmente (_vertical split_)
- `n`: abrir una nueva ventana horizontalmente con un nuevo archivo (_new_)
- `q c`: cerrar ventana (_quit_, _close_) (con `q`, si es la última, cierra Vim)
- `o`: cerrar todas las ventanas menos la actual (_only_)

Moverse entre ventanas
- `<Left> <Down> <Up> <Right>`: moverse a la ventana inmediatamente a la izquierda/abajo/arriba/derecha
- `h j k l` = `<Left> <Down> <Up> <Right>` 
- `t b`: moverse a la ventana más arriba a la izquierda/abajo a la derecha (_top-left_, _bottom-right_)
- `p`: moverse a la última ventana visitada (_previous_)
- `P`: moverse a la ventana de previsualización (_preview_)
- `w W`: moverse a la ventana siguiente _counterclockwise_/_clockwise_

Mover ventanas
- `r R`: rotar ventanas hacia abajo/derecha arriba/izquierda
- `x:` cambiar (exchange) por la siguiente
- `H J K L`: mover a la izquierda/abajo/arriba/derecha lo máximo posible
- `T`: mover a una nueva pestaña

Cambiar de tamaño
- `=`: mismo tamaño
- `- +`: más alta/baja
- `< >`: más ancha/delgada

Comandos Ex para las ventanas
- `winc <argumento>` = `<C-w><argumento>`

- `:vs[plit] [<archivo>]` = `<C-w>v`
- `:sp[plit] [<archivo>]` = `<C-w>s`
- `:n[ew] [<archivo>]` = `<C-w>n`
- `:vne[w] [<archivo>]`: abrir una nueva ventana verticalmente con un nuevo archivo 
- `:sv[iew] [<archivo>]`: _split_ de solo lectura
- `:sf[ind] [<archivo>]`: _split_ del archivo, buscado como en el comando `:f[ind]`

## Pestañas

La pestañas aparecerán listadas en la parte superior.

Moverse entre pestañas:
- `gt :tabn` `gT :tabp`: siguiente/anterior pestaña
- `<C-Tab> g<Tab>`: alternar entre las últimas pestañas visitadas

Abrir y cerrar pestañas:
- `:tab <comando>`: abre una nueva pestaña ejecutando el comando dado
- `:tabn[ew] :tabe[dit] <archivo>`: edita en una nueva pestaña el archivo dado
- `:tabf[ind] <archivo>`: encuentra el archivo dado (como con `:find`) y lo edita en una nueva pestaña
- `:tabc[lose]`: cierra la pestaña
- `:tabo[nly]`: cierra todas las pestañas menos la actual

Mover pestañas con `:tabm [+-]<num>`.

# Otras funcionalidades

## Rangos

<!-- TODO -->

## Patrones de búsqueda

`magic`: algunos caracteres dentro de un patrón se toman literalmente; pero si
se preceden con una barra invertida (`\`), actúan como caracteres especiales con
un significado diferente (**TODO**: regex).

Por ejemplo: `a` se refiere al carácter `a`, mientras que `\a` se refiere a
cualquier carácter alfanumérico.
Otros casos: `.` se refiere a cualquier carácter, mientras que `\.`, se refiere
a un `.` literalmente.

\m = magic
\M = nomagic

\v todos los caracteres ASCII menos 0-9a-zA-Z y _ tienen valor especial (_very magic_)
\V solo los caracteres precedidos de `\` tienen significado especial (_very nomagic_)


<!-- TODO: pattern-overview -->

smartcase
| pattern |	matches             |
| :-----: | :-----------------: |
| word    | word, Word, WORD... |
| Word    | Word                |
| WORD    | WORD                |
| WoRd    | WoRd                |

## Sustituir

El comando `:s` permite sustituir texto usando patrones. Aquí está una versión
completa de todas sus funciones:

```
[<rango>]s[ubstitude]/<patrón-a-buscar>/<string-con-la-que-sustituir>/[<opciones>]
```

<!-- TODO: :s_flags sub-replace-special pattern-delimiter cmd-ranges -->

Opciones:
- `\c`: _ignore case_
- `\C`: _match case_

## Registros

Cuando eliminamos texto, realmente no lo estamos eliminando, sino cortando.
Dicho texto queda almacenado en los registros (automáticamente nombrados del
0 al 9, al menos que no se especifique uno manualmente), para que puedas
volver a utilizarlo o pegarlo en otro lugar.

Para ver el contenido de tus registros usa `:reg`

- `"<id><comando>`: usar el registro
- `"a-zA-Z`: registros del usuario

- `""`: registro sin nombre (por defecto)
- `"<0-9>`: historial del registro sin nombre (0 más nuevo, 9 más viejo)

Registros que no guardan nada (para evitar que se sobreescriban otros registros.
Útil para plugins):

- `"_`: registro agujero negro (no se guarda)
- `"-`: según la ayuda: 

> This register contains text from commands that delete less than one line,
> except when the command specifies a register with ["x].

Registros _read-only_:

- `".`: último texto insertado
- `":`: último comando _ex_
- `"%`: dirección relativa al archivo actual
- `"#`: otra dirección de archivo extraña. No creo que la uses

## Desplegables

Más información en `:help fold.txt`

- `zf`: crear un desplegable en función de un movimiento/nombre o líneas seleccionadas en _visual mode_
- `zd zD zE`: eliminar desplegable, recursivamente, todos en la ventana actual
- `zo zO`: abrir el desplegable, recursivamente
- `zc zC`: cerrar el desplegable, recursivamente
- `za zA`: alternar entre abrir y cerrar el desplegable, recursivamente

## Macros

<!-- TODO -->

## Autocompletado

<!-- TODO: ins-completion wildmenu wildchar-->

## Corrección de ortografía

<!-- TODO -->

# Plugins

## Netrw

Este es un plugin que viene preinstalado en NeoVim, y permite mostrar archivos
tanto locales como remotos a través de SSH, etc.

- `:Ex`: abrir Netwr
- `:Lex [<size>]`: abrir Netwr a la izquierda
- `:Tex`: abrir Netwr en una nueva pestaña

- `i`: cambiar display (lista, árbol, columnas, etc)

- `I`: esconder/mostrar la cabezera de información
- `gh`: esconder/mostrar dotfiles

- `<Enter>`: abrir el archivo
- `-`: ir a la carpeta superior

- `p`: previsualizar archivo
- `<C-w>z :pc :pclose`: cerrar previsualización
- `v`: abrir en una división vertical

- `%`: crear archivo en la carpeta actual (da un nombre)
- `<Del> D`: borrar el archivo debajo del cursor
- `d`: crear una carpeta  (da un nombre)
- `R`: renombrar
- `s`: cambiar orden (nombre, fecha, tamaño)

<!-- CONFIG
textwidth=<number>
autocommands: events
abreviations
ejecutar comandos dependiendo del tipo de archivo:
  - md: spell check, textwidht, formating, special mappings?
  - rs: rustfmt, build cmd, test cmd, load lsp...

:map <C-U> <C-Y><C-Y><C-Y><C-Y><C-Y><C-Y><C-Y><C-Y><C-Y><C-Y><C-Y><C-Y><C-Y><C-Y><C-Y><C-Y> " 16
:map <C-D> <C-E><C-E><C-E><C-E><C-E><C-E><C-E><C-E><C-E><C-E><C-E><C-E><C-E><C-E><C-E><C-E>
:map ' `

Emacs para ex mode
:cnoremap <C-A>	<Home>         " start of line
:cnoremap <C-B>	<Left>         " back one character
:cnoremap <C-D>	<Del>          " delete character under cursor
:cnoremap <C-E>	<End>          " end of line
:cnoremap <C-F>	<Right>        " forward one character
:cnoremap <C-N>	<Down>         " recall newer command-line
:cnoremap <C-P>	<Up>           " recall previous (older) command-line
:cnoremap <Esc><C-B> <S-Left>  " back one word
:cnoremap <Esc><C-F> <S-Right> " forward one word

Check quickref.txt

LSP -> lsp.txt -> nvim-lspconfig luasyntax highlighting -> treesitter.txt -> tree-sitter
diagnostic
vim-surround !lua -> nvim-surround surround.nvim
vim-commentary !lua
telescope lua
rust.vim !lua
vim-airline !lua (?)
vim-polyglot (?)
terminal-execute (?)

-->
