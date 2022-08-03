---
title: OpenGL
weight: 5

draft: true

extra:
    show_details: true
    show_toc: true
---

[1]: https://www.youtube.com/watch?v=W3gAzLwfIP0&list=PLlrATfBNZ98foTJPJ_Ev03o2oq3-GGOS2&index=1
[2]: https://www.youtube.com/c/TheChernoProject
[3]: https://www.youtube.com/watch?v=45MIykWJ-C4&list=WL&index=26
[4]: https://www.youtube.com/channel/UC8WizezjQVClpWfdKMwtcmw
[5]: https://github.com/VictorGordan/opengl-tutorials

# Links Interesantes
+ [Series de tutoriales][1] de [TheCherno][2].
+ Un [curso][3] genial por [Victor Gordan][4].
    - [Aquí][5] el código que se muestra en el tutorial.

# Introducción
OpenGL es una `API` (Application Programming Interface) para generar gráficos
mediante el acceso a la tarjeta gráfica de nuestro ordenador. Solamente
especifica qué es lo que puedes hacer con esas funciones, dado que es un
estándar, no se descarga, ya está implementada en tus controladores de tu
gráfica. Por eso, se pueden ver de forma diferente en diferentes sistemas.
Tampoco es Open-Source, no puedes ver el código, dado que depende de cada
fabricante.

Es, dentro de lo que cabe, portable a todas las plataformas. Pero por eso no es
la mejor API, para hacer un programa muy serio, se necesitarían muchas librerías
específicas de cada plataforma.

Diferencia entre `Legacy` y `Modern OpenGL`: Modern permite utilizar Shaders por
lo que es mucho más programable.

#  Set Up
## Crear una ventana
Para poder realizar gráficos, necesitamos un lugar donde dibujarlos, por lo que
necesitamos una ventana. Esto depende mucho del sistema operativo, por lo que
vamos a usar una librería multiplataforma: [GLFW](https://www.glfw.org/).

Existen otras opciones como `SDL2`, `GLUT`, `SFML`... pero esta es la más
sencilla.

Puedes compilar esta librería tú, o descargar ya los archivos compilados (32/64
bits se refieren a la plataforma a la que te enfoques, a la que tú vayas a
compilar).

Para que funcione, añádela como una librería normal: incluye los `.h` y, como
siempre, es recomendable unir los binarios estáticamente. Puedes realizar
algunas pruebas con el código de la
[documentación oficial](https://www.glfw.org/documentation.html), o copiar lo
siguiente, simplemente para comprobar si funciona:

```cpp
// Abre una ventana de consola y la cierra tras un segundo

#include <GLFW/glfe3.h>
#include <thread>

int main()
{
  glfwInit();
  std::this_thread::sleep_for(std::chrono::seconds(1));
  return 0;
}
```

La configuración de la ventana se puede hacer de la siguiente forma:

```cpp
// Version 3.2
glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 2);

// Soporte para funcionalidad básica (core)
glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);

// Es complicado calcular lo del cambio de tamaño
glfwWindowHint(GLFW_RESIZABLE, GL_FALSE);

// Crear una ventana 800x600 px
GLFWwindow* window = glfwCreateWindow(800, 600, "title", nullptr, nullptr);
// Crear una ventana a pantalla completa
GLFWwindow* window = glfwCreateWindow(800, 600, "title", glfwGetPrimaryMonitor(), nullptr);

// Acticar el contexto para OpenGl
glfwMakeContextCurrent(window);
```

Lo siguiente es el código básico que necesitamos para mantener la ventana
abierta y manejar algunos eventos sencillos, como cerrar la propia ventana.

```cpp
while (!glfwShouldClose(window))
{
  glfwSwapBuffers(window);
  glfwPollEvents();

  // Si se presiona la tecla <Esc> cierra la aplicación
  if (glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS)
    glfwSetWindowShouldClose(window, GL_TRUE);
}
```

## Activar modern OpenGL
Es necesario añadir las funciones para Modern OpenGL como archivos de cabecera
(Windows solo tiene los `.h` de la versión `1.1`). Esta acción también depende
del SO, además son muchas de funciones para añadir.

Por eso vamos a usar otra librería que genere los `.h` por nosotros, buscaría
las funciones en los controladores y las enlazaría con los ejecutables
correspondientes en el momento de compilación:
[GLEW](https://www.glew.sourceforge.net/).

```cpp
#define GLEW_STATIC
#include <GL/glew.h>

int main()
{
  glewExperimental = GL_TRUE;
  glewInit();

  GLuint vertexBuffer;
  glGenBuffers(1, &vertexBuffer);

  printf("%u\n", vertexBuffer);
}
```

> ¿Seguro? Porque [glad](https://github.com/Dav1dde/glad) tiene mucha mejor
> pinta...

# OpenGL
OpenGL es una máquina por estados, no usa objetos ni nada por el estilo.

Documentación de OpenGL recomendada por TheCherno: [esta](https://www.docs.gl)

## Vertex Buffers
_Buffer_: array de memoria específico de OpenGL (se guarda en `VRAM`)

`glGenBuffers(n,  &id);`
+ Crear un Buffer en la memoria de la tarjeta gráfica VRAM
  - `n`: número de buffers para crear
  - `unsigned int* (GLuint*) id`: identificador para el Buffer

`glBindBuffer(GL_ARRAY_BUFFER, id);`
+ Seleccionar el Buffer

`glBufferData(GL_ARRAY_BUFFER, size, data, DRAW_TYPE);`
+ Añadir datos al Buffer seleccionado
  - `size`: tamaño del Buffer en bytes ( `6*sizeof(float)` )
  - `data`: el array de datos
  - `DRAW_TYPE`: uso (para que sea mas eficiente):
    * `GL_STATIC_DRAW`: se crea una vez y no se cambia
    * `GL_DYNAMIC_DRAW`: se crea una vez y se cambia mucho
    * `GL_STREAM_DRAW`: se crea una vez y se dibuja una vez

**Los datos ahora están en la gráfica**

`glDrawArrays(PRIMITIVE_TYPE, start_index, count);`
+ Para dibujar en la pantalla (en el bucle de render)
  - `PRIMITIVE_TYPE`: `GL_TRIANGLES`
  - `start_index`: posición del primer elemento a dibujar en el Buffer seleccionado (0)
  - `count`: cuantos vértices se van a dibujar (3)

`glVertexAttribPointer(index, size, type, normaliced, stride, pointer);`
+ Especificamos como está dispuesto los datos en el Buffer (Vertex Attributes)
  - `index`: posición de tu atributo (0)
  - `size`: número de datos por vertex (2)
  - `type`: tipo de dato que estamos pasando (`GL_float`)
  - `normaliced`: tiene que estar en un float entre 0 y 1, puedes dejar que lo cambie OpenGL o hacerlo tú a mano (`GL_TRUE`, `GL_FALSE`)
  - `stride`: cantidad de bytes de cada vertex (`2 * sizeof(float)`)
  - `pointer`: cantidad de bytes entre cada dato del vertex (`[(const void*)] 0`, solo hay posición)

`glEnableVertexAttribArray(index) // 0`
+ Ahora hay q activar estos atributos

## Shaders
Un Shader es un programa que se ejecuta en tu GPU. Algunas gráficas proporcionan
un shader por defecto.

Tipos
+ `Vertex Shader`: coloca los vértices en la pantalla (se llama una vez por vertex)
+ `Fragment (pixel) Shader`: coloca los colores (se llama una vez por pixel q va a ser rasterizado: llenar el espacio con píxeles coloreados)
+ `...` hay y muchos más tipos, pero en general solo se pueden hacer muchas cosas con estos.

```cpp
static unsigned int CreateShader(const std::string& vertex, const std::string& fragment) {
  // Podemos usar GLuint pero tendriamos q incluir OpenGL en todas partes
  unsigned int program = glCreateProgram();

  // Dos archivos compilados para linkear
  unsigned int vs = CompileShader(GL_VERTEX_SHADER, vertex);
  unsigned int fs = CompileShader(GL_FRAGMENT_SHADER, fragment);

  glAttachShader(program, vs);
  glAttachShader(program, fs);
  // program: el programa final
  // shader: el shader para añadir

  glLinkProgram(program);
  glValidateProgram(program);

  // Podemos borrar los shaders porq ya estan en un programa
  glDeleteShader(vs);
  glDeleteShader(fs);

  return program;
}
```

```cpp
static unsigned int CompileShader(const unsigned int type, const std::string& source) {
  unsigned int id = glCreateShader(type);
  const char* src = source.c_str();

  glShaderSource(id, 1, &src, nullptr);
  // shader: el shader q queremos dar el source
  // count: cantidad de shaders
  // source: puntero a source
  // length: por si no queremos usar todo el source

  glCompileShader(id);

  // Error handling
  int result;
  glGetShaderiv(id, GL_COMPILE_STATUS, &result);
  if (result == GL_FALSE) { // o solamente if (!result)
    int length;
    glGetShaderiv(id, GL_INFO_LOG_LENGTH, &length);
    char* message = (char*)alloca(length * sizeof(char));
    glGetShaderInfoLog(id, length, &length, message);
    std::cerr << "Faile to compile " <<
        (type ==  GL_VERTEX_SHADER? "vertex shader" :
        (type == GL_FRAGMENT_SHADER? "frament shader" : "shader"))
        << " : " << message << std::endl;
    glDeleteShader(id);
    return 0;
  }

  return id;
}
```

```cpp
std::string vertex =
  "#version 330 core\n"
  // usar la version 330
  // core: no deja usar deprecated
  "layout(location=0)in vec4 position\n"
  // shader input de posicion
  // su localizacion debe de coincidir con los valores dados en attribpointer
  // es un vector de 4 posiciones porq gl_Position lo requiere, se cambia implicitamente
  "void main()\n";
  "{\n"
  "  gl_Position = position\n"
  "}\n";

std::string fragment =
  "#version 330 core\n"
  "layout(location=0) out vec4 color\n"
  "void main()\n";
  "{\n"
  "  color = vec4(1.0, 0.0, 0.0, 1.0);\n" // rgba(1, 0) red
  "}\n";

unsigned int shader = CreateShader(vertex, fragment);
glUseProgram(shader);
// ...
glDeleteProgram(program);
```

Este estilo de poner los shaders es muy propenso a errores y por eso vamos a
extraerlo a su propio archivo ".shader". Podemos especificar el tipo de shader:

```cpp
#shader vertex
// vertex shader

#shader fragment
// vertex fragment

struct ShaderProgramSource {
  std::string VertexSource;
  std::string FragmentSource;
};

static ShaderProgramSource ParseShader(const std::string& filepath) {
  enum ShaderType { NONE = -1, VERTEX = 0, FRAGMENT= 1 };
  ShaderType type = ShaderType::NONE;

  std::ifstream stream(filepath); // <fstream>
  std::string line;
  std::stringstream ss[2]; // <sstream>

  while(getLine(stream, line)) { // <string>
    if (line.find("#shader") != std::string::npos) {
      if (line.find("vertex") != std::string::npos)
        type = ShaderType::VERTEX;
      else if (line.find("fragment") != std::string::npos)
        type = ShaderType::FRAGMENT;
    } else {
      ss[(int)type] << line << '\n';
    }
    return { ss[0].str(), ss[1].str() };
  }
}

ShaderProgramSource source = ParseShader("path");
```

## Index Buffers
Todo está basado en triángulos, por lo que si intentamos hacer un cuadrado, este
deberá ser simplificado a triángulos. Si escribimos todas las posiciones de los
triángulos, habrá algunos que estén repetidos porque estos están juntos. Para
eso vamos a escribir en nuestro vertex buffer las posiciones únicas y luego el
orden por el cual se deben leer/ejecutar.

```cpp
float position[] = {
  -0.5, -0.5, // 0
   0.5, -0.5, // 1
   0.5,  0.5, // 2
  -0.5,  0.5  // 3
};
unsigned int indices[] = {
  0, 1, 2,
  2, 3, 0
};

// vertex buffer set up

unsigned int index;
glGenBuffer(1, &index);
glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, index);
glBufferData(GL_ELEMENT_ARRAY_BUFFER, 6 * sizeof(unsigned int), indices, GL_STATIC_DRAW);

// Ahora hay que dibujar con este método
glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_INT, nullptr);
// Mode: se mantiene igual
// count: vamos a dibujar 6 índices
// type: tipo de dato que son los datos
// data: puntero a la memoria de los índices, como ya está seleccionado, no hace falta añadir nada.
```
