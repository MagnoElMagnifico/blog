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
> ve usándolos y mecanizándolos poco a poco.

# Porqué Vim
1. Ligero
2. Super personalizable
3. Ergonómico / con los atajos de teclado puedes trabajar muy rápido y cómodo
4. Muy poderoso: infinidad de opciones que no tendrás en otros editores
5. Escalable: puedes editar un simple archivo de 50 líneas o todo un proyecto
  con miles de archivos.

# Niveles de poder en Vim
No sé, pero creo que es curioso e interesante mencionarlos:

1. No saber Vim
2. Vim básico
3. Usar el modo visual
4. Usar varios movimientos
5. No usar el modo visual

# La ayuda de Vim
Otra increible característica de Vim es su maravillosa documentación y manual
de ayuda. De forma offline y sin salir del editor, puedes buscar lo que 
necesites saber gracias al comando `:help` o `:h`.

En la documentación habrá unas etiquetas que funcionarán como enlaces en una
página web. Estas están entre `|`, pero se esconden cuando el resaltado de
sintaxis está activado. Para seguir el enlace usa `<C-]>` (o buscar ayuda 
sobre donde está el cursor) y para regresar `<C-o>`.

Si no estás seguro de lo que estás buscando, puedes autocompletar el contenido
del comando `:help` con `<C-d>`, que te mostrará todas las etiquetas 
relacionadas.

Para navegar más rápido entre las distintas secciones de la documentación, usa
`gO` para mostrar la tabla de contenidos, y usa enter para moverte a cada
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
La página principal de la ayuda está en `help.txt`, a la que puedes acceder
simplemente con el comando `:help`, `:h` o `:help help.txt`. Esta es el índice
para el resto de elementos de la ayuda, ya que contiene todos los enlaces a los
demás archivos, incluyendo (al final de todo) la documentación de cada plugin a
mayores que instales.

Por un lado estan los manuales del usuario, que sería bastante recomendable
leerlos. Contienen información de como empezar a usar el editor de una forma
más progresiva, en lugar de tener que acceder a la referencia por elementos 
aislados.

En la página `index.txt` se muestran todos los comandos (por defecto) del 
editor, con una breve descripción y un link para más información. Es buena 
idea consultar esta página cuando creas tu configuración y cambias los atajos,
ya que podrías estar inhabilitando otros comandos útiles.

Mi página favorita de la ayuda es `quickref.txt`.

# Entendiendo la edición modal
Vim es un editor modal, lo que quiere decir que existen diferentes modos de
funcionamiento y comportamiento dependiendo en qué modo te encuentres.

El modo _normal_ donde pasarás la mayor parte del tiempo ya que aquí están
los principales comandos de movimiento y sirve de transición hacia los otros
modos. Toda tecla que pulses se tomará como un comando, no para escribir texto.

Para hacer esto último, debes acceder al modo _insert_ presionando la tecla `i`.
Ahora podrás escribir texto como en otros editores. Para regresar al modo normal
usa la tecla _Escape_ (`<Esc>`).

El modo _visual_ se inicia al hacer una selección de texto, permitiéndote operar
con él. Este modo selecciona caracter por caracter, pero existen los modos
_visual line_, que selecciona líneas enteras, y _visual block_, selección en bloque
o por columnas. A partir de estas selecciones, podemos hacer cambios solamente en
el texto seleccionado con otros comandos.

El modo _terminal_ emula una consola de comandos que puedes utilizar dentro del
propio editor, sin necesidad de cerrarlo. Para salir al modo normal, presiona
`<C-\><C-n>`.

<!-- TODO --> 
_command_
_select_
_operator pending_

En todos estes modos (excepto el _normal mode_) se te indicará en cual de ellos te
encuentras abajo de todo de la pantalla. En el caso del _command line mode_, estarás
escribiendo en ese espacio.

# Vim como un lenguaje

> A partir de ahora, los comandos que aparecen listados se ejecutarán desde el 
> modo _normal_ a menos que se diga lo contrario.

Realmente, los comandos en Vim pueden entenderse como un lenguaje por sí mismo,
así que cuando empieces a pensar en este lenguaje, podrás entender mucho mejor
el editor.

Verbos: acciones
- `d`: borrar (_delete_)
- `c`: cambiar (_change_)
- `y`: copiar (_yank_)
- `v`: seleccionar (_visual mode_)

<!-- TODO: Algunos de estos no son completamente precisos --> 
Nombres / Sustantivos: objetos a los que realizar las acciones
- `w`: palabra (_word_)
- `s (`: frase (_sentence_)
- `p {`: párrafo (_paragraph_)
- `t`: etiqueta de HTML o XML
- `b`: bloque de código
Los nombres también se pueden usar para moverte entre ellos. Más información
en los ejemplos.

Modificadores: entre los verbos y los nombres (opcional)
  - `i`: interno
  - `a`: alrededor
  - `<número>` para repetir la acción
  - `f<char>`: hasta encontrar el caracter dado (_find_)
  - `t<char>`: hasta el caracter dado, para antes de él (_'til_)
  - `/<patrón>`: realizar una búsqueda global de varios caracteres, pudiendo usar regex

## Construyendo frases (con ejemplos)
Al combinar `<verbo>[<modificador>]<nombre>` podemos hacer prácticamente 
cualquier acción en un solo comando muy rápidamente, y para movernos entre
el código simplemente usando los nombres: `[<modificador>]<nombre>`.

Borrar dos palabras:

```
d2w / 2dw
```

Cambiar (es decir, borrar y entrar en _insert mode_) la frase en la que se
encuentra el cursor:

```
cis
```

Y de forma similar sucede para movernos, por ejemplo avanzar dos párrafos:

```
2}
```

Los modificadores también se pueden añadir al _insert mode_:

```
3ihola ---> holaholahola
```

# Más verbos

Mayúsculas y minúsculas
- `g~`: cambiar de mayúsculas a minúsculas y viceversa
- `gU`: cambiar todo a mayúsculas
- `gu`: cambiar todo a minúsculas
- _visual_ `U`: cambiar todo a mayúsculas
- _visual_ `u`: cambiar todo a minúsculas

Formateado de texto
- `< >`: identar
- `gq gw`: formatear el texto, sin mover el cursor

# Movimiento avanzado

- `[<char> ]<char>`: moverse al anterior, siguiente <char> sin pareja (siendo
  <char> `(`, `[` o `{`)

- `[( [{`

## Marcas
sirven como una especie de marcapáginas: se colocan en determinadas posiciones
de un archivo, para posteriormente regresar a ellas con un simple comando.

- `m<nombre>`: establece una marca en la posición del cursor
- `&#96;<nombre> '<nombre>`: regresa a la marca, regresa al primer caracter no blanco de la línea marcada

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

- `'[ ']`: recuerdan el primer y último caracter de texto editado o copiado
- `'< '>`: recuerdan el primer y último caracter de texto seleccionado
- `''`: recuerda la posición anterior a un salto o donde se hizo `m'`
- `'"`: recuerda la última posición del cursor antes de salir del buffer (individual para cada buffer)
- `'^`: recuerda la última posición del cursor al salir de _insert mode_ (se usa para el comando `gi`)

Con el comando `:marks` puedes listar todas las marcas actuales, y con
`delmarks <nombre>` borrarlas (solo a-zA-Z0-9).

Cada uno de los saltos que realices, se guardarán en la _jump list_ (cuyo
contenido puedes ver con `:jumps`o `:ju`) y los comandos `<C-o>` y `<C-i>` te
permitirán regresar a un salto anterior o posterior respectivamente.

# Otras funcionalidades
## Registros
Cuando eliminamos texto, realmente no lo estamos eliminando, sino cortanto.
Dicho texto queda almacenado en los registros (automáticamente nombrados del
0 al 9, al menos que no se especifique uno manualmente), para que puedas
volver a utilizarlo o pegarlo en otro lugar.

- `"<name><acción>`: usar el registro
- `""`: registro sin nombre (por defecto)
- `"_`: registro agujero negro (no se guarda)
- `"<0-9>`: registro de copiar (0 más nuevo, 9 más viejo)
- `".` `"%` `":` `"#`: readonly (último texto insertado, relative current path, recent command, current opened file folder)
- `:reg`: para ver el contenido de los registros

## Desplegables
Más información en `:help fold.txt`

- `zf`: crear un desplegable en función de un movimiento/nombre o líneas seleccionadas en _visual mode_
- `zd zD zE`: eliminar desplegable, recursivamente, todos en la ventana actual
- `zo zO`: abrir el desplegable, recursivamente
- `zc zC`: cerrar el desplegable, recursivamente
- `za zA`: aternar entre abrir y cerrar el desplegable, recursivamente

## Buffers, ventanas y pestañas
`:tabn :tabp`: siguiente, anterior pestaña
`g<Tab>`: última pestaña

# Comandos Básicos
## Mover el cursor
- `h j k l`: izquierda, abajo, arriba, derecha. De esta forma no tienes que
  mover los dedos del teclado hacia las flechas. Para recordarlo piensa la `j`
  como una flecha hacia abajo, y `h`-`l` estan a la derecha-izquerda
  respectivamente.

- `H M L`: arriba, centro, abajo de la pantalla (High - Medium - Low)

- `{ }`: párrafo (entre líneas vacías)
- `0 $`: inicio, fin de línea
- `zz`: centrar cursor en la pantalla

- En mayúscula también avanza la puntuación:
    - `w`: siguiente palabra
    - `e`: final de palabra siguiente
    - `b`: principio de palabra anterior
    - `ge`: final de la palabra anterior

- Ir a:
    - `%`: ir a la pareja de ( ), [ ] o { }
    - `<number>gg` / `<number>G`: ir a la línea
    - `gg G`: inicio, final del archivo
    - `gd`: ir a la declaración
    - `gf`: ir al archivo debajo del cursor
    - `gF`: ir al archivo debajo del cursor en determinada línea
    - `gx`: abrir URL

- `C-u C-d`: media pantalla

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

- `<< >>`: identar

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
- `v`: iniciar modo _visual_
- `V`: iniciar modo _visual line_
- `C-v`: iniciar modo _visual block_

- `i<operator>`: selecciona todo / `a<operator>`: selecciona lo de dentro
    - `w`: palabra
    - `b (`: bloque con ( )
    - `B {`: bloque con { }
    - `t`: bloque con <>

- `gv`: recuperar el modo visual anterior
- `o O`: moverse al otro lado de la selección (solo modo visual)
- `u U`: minúsculas, mayúsculas
- `< >`: identar
- `y`: copiar
- `x d`: cortar

## Buscar
- `f<char>`: en la misma línea
- `F<char>`: en la misma línea detras
- `t<char>`: 1 posición antes de `char`
- `; ,`: siguiente, anterior `char` en la búsqueda


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
q: q/ q?
textwidth=<number>
[{ [( ]) ]} motion.txt
<C-g>
quickfix: :c...
list commands: :l...
autocommands: events

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
