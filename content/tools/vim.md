---
title: Vim y Neovim
description: Un pequeño overview de las principales funcionalidades de Vim con sus comandos y mi configuración
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
representa las diferentes teclas que puedes usar para los comandos.

# Entendiendo la edición modal
Vim es un **editor modal**, lo que quiere decir que existen diferentes modos de
funcionamiento y comportamiento dependiendo en qué modo te encuentres.

El modo _normal_ donde pasarás la mayor parte del tiempo ya que aquí están
los principales comandos de movimiento y sirve de transición hacia los otros
modos. Toda tecla que pulses se tomará como un comando, no para escribir texto.

Para hacer esto último, debes acceder al modo _insert_ presionando la tecla `i`.
Ahora podrás escribir texto como en otros editores. Para regresar al modo normal
usa la tecla _Escape_ (`<Esc>`).

El modo _visual_ se inicia al hacer una selección de texto, permitiéndote operar
con él. Este modo selecciona carácter por carácter, pero existen los modos
_visual line_, que selecciona líneas enteras, y _visual block_, selección en bloque
o por columnas. A partir de estas selecciones, podemos hacer cambios solamente en
el texto seleccionado con otros comandos.

El modo _terminal_ emula una consola de comandos que puedes utilizar dentro del
propio editor, sin necesidad de cerrarlo. Para salir al modo normal, presiona
`<C-\><C-n>`.

<!-- TODO --> 
_command_
_select_

En todos estos modos (excepto el _normal mode_) se te indicará en cual de ellos te
encuentras abajo de todo de la pantalla. En el caso del _command line mode_, estarás
escribiendo en ese espacio.

# Vim como un lenguaje

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

- `h j k l`: carácter a la izquierda, abajo, arriba, a la derecha. De esta
  forma no tienes que mover los dedos del teclado hacia las flechas. Para
  recordarlo piensa la `j` como una flecha hacia abajo, y `h`-`l` están a la
  derecha-izquierda respectivamente.
- `w`: palabra (_word_)
- `0 $`: inicio, fin de línea; similares a `<Home> <End>`
- `f<char> F<char>`: hasta encontrar el carácter dado avanzando, retrocediendo (_find_)
- `t<char> f<char>`: hasta el carácter dado y se detiene antes avanzando, retrocediendo (_'til_)

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

# Entrar al modo _insert_
- `i a`: antes, después del cursor
- `I A`: principio, final de la línea
- `o O`: nueva línea debajo, arriba
- `ea`: insertar después de palabra

# Operadores
Reemplazar:
- `r<nuevo_char>`: remplazar el carácter debajo del cursor y volver al modo normal (_replace_)
- `c<nombre>`: cambiar (_change_), es decir, borrar y entrar en _insert mode_.

Eliminar texto, o más bien, cortarlo; ya que todo lo que borremos se almacenará:
- `x`: carácter (_exterminate_)
- `d<nombre>`: eliminar (_delete_)

Copiar y pegar:
- `y<nombre>`: copiar (_yank_)
- `p P`: pegar antes, después (_paste_)

Formatear texto:
- `J`: juntar con la línea siguiente (_join_)
- `<< >>`: identar
- `gq gw`: formatear el texto, sin mover el cursor
<!-- TODO: ¿Con qué se formatea? --> 

Mayúsculas y minúsculas:
- `g~`: cambiar de mayúsculas a minúsculas y viceversa
- `gU`: cambiar todo a mayúsculas
- `gu`: cambiar todo a minúsculas
- _visual_ `U`: cambiar todo a mayúsculas
- _visual_ `u`: cambiar todo a minúsculas

## Seleccionar
- `v<nombre>`: iniciar modo _visual_ (operador)
- `V`: iniciar modo _visual line_
- `<C-v>`: iniciar modo _visual block_

- `gv`: recuperar el modo visual anterior
- `o O`: moverse al otro lado de la selección (solo modo visual)
- `u U`: minúsculas, mayúsculas
- `< >`: identar

<!-- TODO: Explicar operadores en este modo --> 
- `y`: copiar
- `x d`: cortar

# Movimientos y nombres 
- `H M L`: arriba, centro, abajo de la pantalla (High - Medium - Low)
- `<C-u> <C-d>`: moverse media pantalla (Up - Down)
- `zz`: centrar cursor en la pantalla

- `{ }`: avanzar, retroceder un párrafo (entre líneas vacías)

Estos son movimientos relacionados con las **palabras**. Vim separa las
palabras con determinados caracteres, pero si quieres que sea una palabra
estricta, es decir solamente separada por espacios (saltándose la puntuación),
usa la versión en mayúscula.

<!-- TODO: Añadir más (motion.txt) -->
- `w`: siguiente palabra
- `e`: final de palabra siguiente
- `b`: principio de palabra anterior
- `ge`: final de la palabra anterior

- `s (`: frase (_sentence_). Vim separa las frases con `.`, `!` o `?` (inclusive). Una frase también termina cuando lo haga el párrafo. El modificador es obligatorio
- `p {`: párrafo (_paragraph_). Vim separa las frases con líneas vacías o espacios en blanco. El modificador es obligatorio
- `t`: etiqueta de HTML o XML
- `b`: bloque de código

- `w`: palabra
- `b (`: bloque con ( )
- `B {`: bloque con { }
- `t`: bloque con <>

Commandos para ir a:

- `%`: la pareja de ( ), [ ] o { }
- `<number>gg <number>G`: número de línea
- `gg G`: inicio, final del archivo
- `gd gD`: ir a la declaración local, global
- `gf gF`: ir al archivo debajo del cursor, en determinada línea
- `gx`: abrir URL

## Buscar
Estos comandos también funcionan como movimientos y nombres.
- `f<char>`: en la misma línea
- `F<char>`: en la misma línea detrás
- `t<char>`: 1 posición antes de `char`
- `; ,`: siguiente, anterior `char` en la búsqueda

- `/<patrón>`: realiza una búsqueda en todo el archivo y se desplaza al primer _match_ desde el cursor.
- `?<patrón>`: igual que el anterior, pero busca hacia arriba
- `n N`: repite la búsqueda anterior, hacia arriba

## Marcas
<!-- TODO: No confundir nombres (lenguaje vim) con estos nombres, mejor llamarlos identificadores <id> -->
Sirven como una especie de marcapáginas: se colocan en determinadas posiciones
de un archivo, para posteriormente regresar a ellas con un simple comando.

- `m<nombre>`: establece una marca en la posición del cursor
- `&#96;<nombre> '<nombre>`: regresa a la marca, regresa al primer carácter no blanco de la línea marcada

El nombre de las marcas será una letra:
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
`delm[arks] <nombre>` borrarlas (solo a-zA-Z0-9).

Cada uno de los saltos que realices, se guardarán en la _jump list_ (cuyo
contenido puedes ver con `:jumps`o `:ju`) y los comandos `<C-o>` y `<C-i>` te
permitirán regresar a un salto anterior o posterior respectivamente.

## Movimiento avanzado
<!-- TODO -->
- `[<char> ]<char>`: moverse al anterior, siguiente <char> sin pareja (siendo
  <char> `(`, `[` o `{`)
- `[( [{`

# Buffers, ventanas y pestañas
`:tabn :tabp`: siguiente, anterior pestaña
`g<Tab>`: última pestaña

# Otras funcionalidades
## Registros
Cuando eliminamos texto, realmente no lo estamos eliminando, sino cortando.
Dicho texto queda almacenado en los registros (automáticamente nombrados del
0 al 9, al menos que no se especifique uno manualmente), para que puedas
volver a utilizarlo o pegarlo en otro lugar.

Para ver el contenido de tus registros usa `:reg`

- `"<nombre><acción>`: usar el registro
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

-------------------------------------------------------------------------------

TODO
Sentence
Search: * #
gd gD
gv gi
windows / buffers
tabs: open (:tab :tabe :tabf), close (:tabc), move them (:tabm [+-]<num> position after) /myself (:tabn :tabp gt gT)
ex mode
ZZ ZQ
do dp
ga
q: q/ q?
textwidth=<number>
[{ [( ]) ]} motion.txt
<C-g>

quickfix: :c...
list commands: :l...

autocommands: events
abreviations

select mode
:map <C-U> <C-Y><C-Y><C-Y><C-Y><C-Y><C-Y><C-Y><C-Y><C-Y><C-Y><C-Y><C-Y><C-Y><C-Y><C-Y><C-Y>
:map <C-D> <C-E><C-E><C-E><C-E><C-E><C-E><C-E><C-E><C-E><C-E><C-E><C-E><C-E><C-E><C-E><C-E>
:map ' \`
	" start of line
	:cnoremap <C-A>		<Home>
	" back one character
	:cnoremap <C-B>		<Left>
	" delete character under cursor
	:cnoremap <C-D>		<Del>
	" end of line
	:cnoremap <C-E>		<End>
	" forward one character
	:cnoremap <C-F>		<Right>
	" recall newer command-line
	:cnoremap <C-N>		<Down>
	" recall previous (older) command-line
	:cnoremap <C-P>		<Up>
	" back one word
	:cnoremap <Esc><C-B>	<S-Left>
	" forward one word
	:cnoremap <Esc><C-F>	<S-Right>

Check quickref.txt

syntax highlighting -> treesitter.txt -> tree-sitter
LSP -> lsp.txt -> nvim-lspconfig lua
diagnostic
vim-surround !lua -> nvim-surround surround.nvim
vim-commentary !lua
telescope lua
rust.vim !lua
vim-airline !lua (?)
vim-polyglot (?)
terminal-execute (?)

A buffer is the in-memory text of a file.
A window is a viewport on a buffer.
A tab page is a collection of windows.
