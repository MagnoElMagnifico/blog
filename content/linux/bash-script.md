---
title: Creación de scripts en Bash
description: >
    Es posible utilizar los comandos vistos en artículos anteriores para crear
    scripts con Bash.
date: 2025-01-09T23:19:58+01:00
weight: 5
draft: true
---

<!-- TODO: expandir y formatear mejor -->

# Scripting

La [Bourne Shell], aunque se use como intérprete de comandos, también se pensó
para que se utilizase como un **lenguaje de scripting**.

La idea es básicamente tomar los comandos que estábamos ejecutando en la línea
de comandos y guardarlos en un archivos para reutilizar luego. La extensión
típica para los scripts de Bash es `.sh`, pero técnicamente solo son archivos de
texto plano.

Para ejecutar el archivo se puede le puede pasar a Bash directamente: `bash
script.sh`. Otra alternativa es ejecutarlo como un programa normal, pero es
necesario asignar permisos adecuadamente:

```sh
chmod u+x script.sh
./script.sh
```

Como existen otros lenguajes de scripting que se pueden utilizar (Python,
Perl...) con este método es necesario indicar el intérprete a utilizar en la
primera línea con un **shebang**:

```sh
#!/bin/bash
```

Aquí tienes una [cheatsheet](https://devhints.io/bash) bastante útil.

## Variables útiles

{{< keyvalue title="Parámetros de script o función" >}}
-% `$0`:% es el nombre del script.
-% `$1` a `$9`:% son los primeros parámetros
-% `${10} ${11} ...`:% si hace falta usar más
-% `$#`:% número de todos los parámetros
-% `$* $@`:% lista de todos los parámetros
{{< /keyvalue >}}

{{< keyvalue title="Otras" >}}
-% `$?` :% código de retorno del comando anterior
-% `$$` :% PID del script actual
{{< /keyvalue >}}

## Estructuras de control

Para los condicionales solo se chechea el código de retorno del comando `$?`.

En los bucles también se pueden usar `break` y `continue` (se les puede pasar un
número para salir de ese número de bucles).

```bash
if cmd1
then
    cmd2
elif cmd3
then
    cmd4
else
    cmd5
fi
```

```bash
case valor in
    patron1)
        cmd
        ;;

    patron2)
        cmd
        ;;

    *)      # Caso por defecto
        cmd;
        ;;
esac
```

```bash
for variable in lista
do
    cmd $variable
done
```

Lista debe ser texto, cada elemento estará separado por espacios. Por tanto, es
posible usar las expansiones de Bash vistas anteriormente.

```bash
for ((i=0; i < 5; i++))
do
    cmd $i
done
```

```bash
while cmd
do
    cmd $i
done
```

```bash
until cmd
do
    cmd $i
done
```

## Checks

{{< keyvalue title="Operadores" >}}
-% `[[ ! EXPR ]]` :% Negación
-% `[[ EXPR && EXP ]]` :% Y lógico
-% `[[ EXPR || EXP ]]` :% O lógico
-% `[[ !(EXPR && (EXPR || EXP)) ]]` :% Se pueden usar paréntesis
{{< /keyvalue >}}

{{< keyvalue title="Comprobaciones de strings" >}}
-% `[[ -z "STR" ]]` :% Vacio
-% `[[ -n "STR" ]]` :% No vacio
-% `[[ "STR" == "STR" ]]` :% Son iguales
-% `[[ "STR" != "STR" ]]` :% No son iguales
-% `[[ "STR" ~= REGEX ]]` :% Comprueba expresión regex
{{< /keyvalue >}}

{{< keyvalue title="Comprobaciones numéricas" >}}
-% `[[ NUM -eq NUM ]]` :% Iguales
-% `[[ NUM -ne NUM ]]` :% Diferentes
-% `[[ NUM -lt NUM ]]` :% Menor
-% `[[ NUM -gt NUM ]]` :% Mayor
-% `[[ NUM -le NUM ]]` :% Menor o igual
-% `[[ NUM -ge NUM ]]` :% Mayor o igual
-% `(( NUM == NUM ))` :% Alternativamente se puede usar esta sintaxis para poder
usar los símbolos matemáticos habituales.
{{< /keyvalue >}}

{{< keyvalue title="Comprobaciones de archivos" >}}
-% `[[ -e ARCHIVO ]]` :% Existe
-% `[[ -s ARCHIVO ]]` :% Si su tamaño es mayor que 0 bytes
-% `[[ -d ARCHIVO ]]` :% Es directorio
-% `[[ -f ARCHIVO ]]` :% Es archivo
-% `[[ -r ARCHIVO ]]` :% Se puede leer
-% `[[ -w ARCHIVO ]]` :% Se puede escribir
-% `[[ -x ARCHIVO ]]` :% Se puede ejecutar
{{< /keyvalue >}}

## Comando `read`

El comando `read` se puede utilizar para bastantes cosas. Por ejemplo, leer de
teclado a una variable:

```bash
read -p "Introduzca un dato: " res
printf "Ha instroducido: \"$res\""
```

Leer la primera línea de un fichero (dado que el delimitador es `\n`. Esto se
puede cambiar con `-d`):

```bash
read linea < archivo.txt
```

También se puede iterar sobre un archivo:

```bash
i=1
while read buff
do
    printf "$i: $buff\n"
    i=$[$i+1]
done < archivo.txt
```


## Funciones

```bash
nombre() {
    cmd
    return 0
}
```

Para pasar parámetros se usa la misma sintaxis que con los parámetros de un
script: `$1 ... $9 ${10} ...`, `$*` o `$@`. Para obtener el nombre de la función
debes usar `${FUNCNAME[0]}`, dado que `$0` siempre es el nombre del script.

## Rendimiento

- El shell no es eficiente a la hora de ejecutar trabajos pesados
- Es mejor **dejar que los procesos hagan todo el trabajo**: evitar `expr`, usar
  `$[]` o `$(())`.
- El uso de **lazos con ficheros es muy ineficiente**. Mejor usar comandos que
  operen con ellos (internamente tienen lazos eficientes escritos en C).
- Usar **comandos internos** cuando sea posible.
- **Useless use of any comand** (UUC):
  ```bash
  cat /etc/passwd | grep root
  # es equivalente a
  grep root /etc/passwd
  ```
- **Disminuir redirecciones a fichero** de tipo `>` y `>>`. Los pipes `|` suelen
  ser bastantes eficientes


