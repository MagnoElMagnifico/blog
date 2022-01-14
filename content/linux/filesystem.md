---
title: Estructura directorios
weight: 2

draft: true
---

+ `/`: (root)
+ `bin`: ejecutables (está en `path`) &#8594; `ls`, `curl`
+ `sbin`: ejecutables del sistema (solo se ejecutan por el administrador)
+ `lib`: librerías compartidas &#8594; `.so`, `.a`
+ `usr`:
  - `lib`: librerías compartidas del usuario &#8594; `.so`, `.a`
  - `bin`: binarios del usuario (no esenciales para el SO: Apps)
  - `local/bin`: binarios compilados por el usuario
  - `.config` o otro dotfile: configuración del usuario
+ `etc`: archivos de configuración
+ `home`: carpetas de usuarios (atajo: `~`)
+ `boot`: archivos necesarios para iniciar el ordenador
+ `dev` (DEVice files): drivers/hardware
+ `opt` (OPTional): addons, plugins
+ `var`: variables del sistema operativo (logs, cache)
+ `tmp`: información temporal, se borra al apagar
+ `proc`: carpeta imaginaria, se encarga de gestionar procesos
+ `share`: ??

> `path` guarda alguna de estas direcciones para saber donde guscar los
> programas del terminal. Usa `which` para conocer su carpeta concreta de un
> comando.
