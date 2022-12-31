---
title: TODO
date: 2022-12-15
draft: true
---

El mínimo bloque es 32bytes.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    char* p = (char*) malloc(sizeof(char));
    for (int i = 0; i < SIZE+32-sizeof(size_t); i++) { // Funciona, pero con <=, runtime error de malloc
       p[i] = 'a';
    printf("%s\n", p);
    return 0;
}
```

```c
int main() {
  return 0;
}
```

