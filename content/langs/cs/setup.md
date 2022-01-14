---
title: Setup
weight: 1

draft: true

extra:
    show_toc: true
    show_details: true
---

El instalador ya lo trae Windows, aunque es posible que no sea su última versión:

```
C:\Windows\Microsoft.NET\Framework\vX.X.XXXX
```

Debes consultar que versión tienes tú (`vX.X.XXXX`). También puedes descargar la
versión libre multiplataforma de `.NET Core` para actualizarlo.

El comando para compilar a `.exe`:

```sh
$ csc NombreDelArchivo.cs
```

Para que funcione, como mínimo debe existir una clase pública que lleve un
método público y estático llamado `Main` que tenga de parámetro una matriz de
strings.

```cs
public class Clase
{
    public static void Main (string[] args)
    {
        //Código
    }
}
```

Al compilar varios archivos se deben enumerar. Aunque también puedes
convertirlos todos en librerías .dll con el argumento `/t:library` para después
poder ser llamados desde un `.exe`. Estas clases no pueden contener un método main.

+ **TODO**: Como importar un dll.
