---
title: Shaders
weight: 3
draft: true
---

- Posición del pixel actual `gl_FragCoord` Lo mejor es normalizarlo (0.0 → 1.0) → `gl_FragCoord.xy / u_resolution`

# Uniforms
Son valores que pasamos del CPU a la GPU readonly.

- `vec2 u_resolution` → tamaño en pixeles del lienzo
- `float u_time` → tiempo transcurrido
- `vec2 u_mouse` → posición del ratón en la pantalla en pixeles

# Math
- Trigonometria (radianes) → `sin(n)`, `cos(n)`, `tan(n)`, `asin(n)`, `acos(n)`, `atan(n)`
- Potencias → `pow(n, m)`, `exp(n)` → $e ^ n$, `log(n)` → *ln n*, `sqrt(n)`
- `abs(n)`
- `sign(n)` → if n < 0: -1, if n == 0: 0, if n > 0: 1
- `floor(n)` → truncar a las unidades
- `ceil(n)` → truncar a las unidades + 1
- `fract(n)` → devuelve los decimales (n - floor(n))
- `mod(n, m)` → devuelve el resto entre n / m (n - m * floor(n/m))
- `min(n, m)`, `max(n, m)`
- `clamp(n, min_v, max_v)` → (le da un rango) devuelve n entre los valores min_v y max_v (min(max(x, min_v), max_v))

# Interpolation
```glsl
vec2 st = gl_FragCoord.xy / u_resolution;
float y = pow(st.x, 2.0); // o cualquier otra función
vec3 color = vec3(y);
gl_FragColor = vec4(color, 1.0);
```

- step(limite, valor): if valor < limite: 0, if valor > limite: 1
- smoothstep(min_limite, max_limite, valor): igual que step(), pero suaviza los valores intermedios

# Color
- `mix(a, b, porcentaje)` → mezcla colores dependiendo de algunos porcentajes (0 → 1)
