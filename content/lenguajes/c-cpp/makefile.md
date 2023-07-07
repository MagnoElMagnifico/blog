---
title: Makefile
description: >
    Guía de cómo escribir Makefiles básicos para compilar proyectos C/C++ de
    forma fácil
date: 2023-07-07T23:52:48+02:00
weight: 0 # temporal

draft: true
---

<!-- TODO: Explicar la sintaxis del Makefile -->
<!-- TODO?: Makefile para C -->

{{< block "Recursos" >}}
El mejor recurso que he encontrado para aprender a usar Makefiles es [Makefile
Tutorial].

[Makefile Tutorial]: https://makefiletutorial.com/
{{< /block >}}

# Makefile para C++

**Estructura básica**:

```make
# Compilador
CXX       = g++
CXX_FLAGS = -std=c++17 -Wall -Wextra -Wpedantic -Werror -Weffc++ -Wconversion -Wsign-conversion

# Salida
BUILD_DIR  = bin
BUILD_EXE  = exe
BUILD_TYPE = debug

# Programa principal
SRC_DIRS  = src
SRC       = $(shell find $(SRC_DIRS) -wholename "*.cpp")
OBJ       = $(patsubst %.cpp, $(BUILD_DIR)/%.o, $(SRC))

INC_DIRS  = src include
INC       = $(shell find $(INC_DIRS) -wholename "*.hpp" -or -wholename "*.h")
INC_FLAGS = $(addprefix -I,$(INC_DIRS))

# Debug y Release
ifeq ($(BUILD_TYPE), release)
   CFLAGS += -O2 -DNDEBUG
else
   CFLAGS += -ggdb
endif

#### Construir el ejecutable ####
$(BUILD_DIR)/$(BUILD_EXE): $(OBJ)
    $(CXX) $(CXX_FLAGS) $(OBJ) -o $@

#### Archivos objeto ####
$(BUILD_DIR)/%.o: %.cpp $(BUILD_DIR)
    $(CXX) $(CXX_FLAGS) -c $(INC_FLAGS) $< -o $@

$(BUILD_DIR):
      mkdir -p $@
```

Construir **librería estática**:

```make
LIB_NAME      = test
LIB_DIR       = $(LIB_NAME)
LIB_FILENAME  = lib$(LIB_NAME).a
LIB_SRC       = $(shell find $(LIB_DIR) -wholename "*.cpp")
LIB_INC       = $(shell find $(LIB_DIR) -wholename "*.hpp" -or -wholename "*.h")
LIB_OBJ       = $(patsubst %.cpp, $(BUILD_DIR)/%.o, $(LIB_SRC))
LIB_INC_DIR   = $(LIB_DIR)/src $(LIB_DIR)/include
LIB_INC_FLAGS = $(addprefix -I,$(LIB_INC_FLAGS))

$(BUILD_DIR)/$(LIB_FILENAME): $(LIB_OBJ) $(BUILD_DIR)
    ar sr $@ $(LIB_OBJ)

$(BUILD_DIR)/%.o: %.cpp $(BUILD_DIR) $(LIB_INC)
    $(CXX) $(CXX_FLAGS) -c $(LIB_INC_FLAGS) $< -o $@
```

Y para usarla habría que modificar el target del ejecutable:

```make
$(BUILD_DIR)/$(BUILD_EXE): $(OBJ) $(BUILD_DIR)/$(LIB_FILENAME)
    $(CXX) $(CXX_FLAGS) $(OBJ) -L$(BUILD_DIR) -l$(LIB_NAME) -o $@
```

Para hacer una **librería dinámica**:

```make
LIB_NAME      = test
LIB_DIR       = $(LIB_NAME)
LIB_FILENAME  = lib$(LIB_NAME).a
LIB_SRC       = $(shell find $(LIB_DIR) -wholename "*.cpp")
LIB_INC       = $(shell find $(LIB_DIR) -wholename "*.hpp" -or -wholename "*.h")
LIB_INC_DIR   = $(LIB_DIR)/src $(LIB_DIR)/include
LIB_INC_FLAGS = $(addprefix -I,$(LIB_INC_FLAGS))

$(BUILD_DIR)/$(LIB_FILENAME): $(LIB_SRC) $(BUILD_DIR)
    $(CXX) $(CXX_FLAGS) -shared $(LIB_INC_FLAGS) $(LIB_SRC) -o $@
```

Por tanto el ejecutable se modifica para añadir la librería:

```make
$(BUILD_DIR)/$(BUILD_EXE): $(OBJ) $(BUILD_DIR)/$(LIB_FILENAME)
    $(CXX) $(CXX_FLAGS) $(OBJ) -Wl,-rpath,'.' -L$(BUILD_DIR) -l$(LIB_NAME) -o $@
```

