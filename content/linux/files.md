---
title: Tipos de archivos
weight: 1

draft: true

extra:
    show_toc: true
    show_info: true
---

[1]: https://www.howtogeek.com/448446/how-to-use-the-ls-command-on-linux/
[2]: https://www.geeksforgeeks.org/how-to-find-out-file-types-in-linux/
[3]: https://www.linux.com/training-tutorials/file-types-linuxunix-explained-detail/

En Linux existen tres tipos de archivos diferentes:

- Archivos normales
- Directorios (carpeta)
- Especiales

# Código de archivo con el comando `ls`
El comando `ls` lista en la consola todos los archivos en el directorio actual.
Si añadimos el parámetro `-l`, los mostrará en forma de lista con información
extra.

```
drwxr-xr-x 2 magno magno    4096 Dec 15 16:45 Desktop
-rw-r--r-- 1 magno magno 2768882 Sep 21  2017 image.jpg
-rw-r--r-- 2 magno magno     249 Jan 27 17:50 hard
lrwxrwxrwx 1 magno magno      26 Jan 27 17:50 link -> originals/example-soft.txt
-rw-r--r-- 1 magno magno     375 Jan 27 19:12 file.txt
```
