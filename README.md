TODO: Use a color palette
TODO: Header in page
TODO: Improve the end of the page on sections
TODO: CSS Transitions / Animations
TODO?: Improve how the page scales on mobiles

FUTURE: Career

Pagina de inicio
----------------

Cabecera con logo y nombre del blog (transicion)

sobre mi
    descripcion
    redes sociales

Posts recientes  | secciones del blog
 · link          | titulo y descripcion
 · link          |     apuntes de programacion
 · link          |     proyectos

# Zola
+ `base.html`: html basico
+ `index.html`: entrada a la web
+ `test_index.html`: entrada a la seccion test
+ `test_post.html`: base del post

# Tera lang
More info [here](https://tera.netlify.app/docs/).

+ {{ and }} for expressions
+ {% and %} for statements
+ {# and #} for comments
+ {%- and -%} to remove extra whitespace

+ {{ __tera_context }} print current context

No se procesa lo que hay en el interior del bloque `raw`:

```tera
{% raw %}
{{ some statement }}
{% endraw %}
-> {{ some statement }}
```

## Literals

+ Boolean: `true` `false`
+ Integers and floats
+ Strings with `""` `''` ` `` `
+ Array: `[1, 2, 3]`

Dot notation: `name.member`
Bracket notation: `name["something"]`

+ Operators: `+ - * / % == != <= >= < > and or not in`
Concatenate strings: `"Hello " ~ "world"`
+ Variables: `set name = value`
+ Variable exterior a bucle: `set_global name = value`
+ Filtros (`|`): `name | lower | replace(from="doctor", to="Dr.")`

+ Control flow:
```tera
{% if number is odd %}
Odd
{% endif %}
```
