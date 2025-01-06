---
title: Tipos de archivos
weight: -1
description: TODO
date: TODO
draft: true
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

# Comprimidos

## tar

`tar` es una utilidad que permite recolectar varios archivos en uno solo,
llamado _tarball_.

```sh
tar [OPTIONS] [file.tar] [list of files]
```

Opciones:

- `-c` `--create`
- `-v` `--verbose`
- `-f` `--file`: especificar el nombre del archivo
- `-r` `--append`: añadir archivos al final
- `-x` `--extract` `--get`: obtener los contenidos
- `-l` `--list`: listar los contenidos
- `-a` `--auto-compress`: además comprime el archivo usando varios métodos según
  la extensión dada:
  - `.tar.gz` gunzip
  - `.tar.bz2` bzip2
  - `.tar.xz` xz
  - `.tar.zst` Zstandard
  - etc

Ejemplos

```sh
# Crear un tar con README.md y src
tar -cvf archivo.tar README.md src

# Comprimir con gzip
tar -cvaf archivo.tar.gz README.md src

# Listar contenidos
tar -l archivo.tar[.gz]

# Extraer en la carpeta actual
tar -xvf archivo.tar[.gz]
```

Más información: [Wikipedia](https://en.wikipedia.org/wiki/Tar_(computing))


## gzip

Software para comprimir y descomprimir basado en el algoritmo DEFLATE
(combinación de L777 y códigos Huffman).
