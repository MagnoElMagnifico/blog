---
title: Hilos en Java
description: >
    Repaso rápido de cómo funcionan los hilos de Java y cómo gestionar las
    posibles carreras críticas.
date: 2024-12-28T14:42:18+01:00
weight: 10
---

{{< block "Nota" >}}
Conviene leer el artículo sobre [Procesos e Hilos]({{< ref "so/procesos" >}}),
sobre todo:

- [Cambios de contexto]({{< ref "so/procesos/#block-cambio-de-contexto" >}})
- [Quantum]({{< ref "so/procesos/#block-quantum" >}})
- Hilos en [modo usuario]({{< ref "so/procesos/#hilos-en-el-espacio-de-usuario" >}}) y [modo kernel]({{< ref "so/procesos/#hilos-en-el-espacio-de-kernel" >}})

Y además comprender los problemas que pueden suceder con el uso de hilos, las
[carreras críticas]({{< ref "so/comunicacion-procesos/#carreras-críticas" >}}).
{{< /block >}}

La [JVM] permite planificar [LWP] en el kernel o en modo usuario con hilos de
Java, en función de si la plataforma los soporta.

Por defecto, se crea un hilo principal a partir de la función `main()`, y el
resto tienen un padre que los ha creado. El padre tiene una referencia para
poder interactuar con ellos, deternerlos, etc.


# Clase `Thread`

La clase [`java.lang.Thread`] implementa la interfaz [`java.lang.Runnable`], es
decir, una operación que no devuelve ningún valor.

Por tanto, para que el hilo realice una tarea, es necesario implementar `void
run()` para darle sus instrucciones.

```java
public class MiHilo extends Thread {
    public MiHilo(String nombre) {
        super(nombre);
    }

    @Override
    public void run() {
        // Trabajo útil...
    }
}

// ...

public static void main(String[] args) {
    MiHilo hilo = new MiHilo("NombreDelHilo");
    hilo.start();
}
```

En caso de que la clase ya tenga que ser hija de otra (y dado que en Java no hay
herencia múltiple), es posible implementar directamente `Runnable`:

```java
public class MiHilo extends OtraClase implements Runnable {
    @Override
    public void run() {
        // Trabajo útil...
    }
}

// ...

public static void main(String[] args) {
    Thread hilo = new Thread(new MiHilo(), "NombreDelHilo");
    hilo.start();
}
```

Otra alternativa, es pasarle el `Runnable` directamente:

```java
Thread hilo = new Thread(new Runnable() {
    @Override
    public void run() {
        // Trabajo útil...
    }
}, "NombreDelHilo");
```

Y gracias a la interfaz funcional de Java, es posible simplificar toda esta
sintaxis a lo siguiente:

```java
Thread hilo = new Thread(() -> {
    // Trabajo útil...
});
```

{{<
    figure
    src="estados-hilo.png"
    link="estados-hilo.png"
    alt="Posibles estados de un hilo y sus transiciones"
    caption="Posibles estados de un hilo y sus transiciones"
>}}

## Métodos

La clase `Thread` aporta:

- `void start()`: inicia el hilo para que ejecute su tarea {{< arrow >}} Es una
  llamada no bloqueante. Si ha sido exitoso, `boolean isAlive()` devuelve `true`.
  **Importante**: no sirve llamar a `run()` directamente, porque no se creará el
  hilo.

- `void join()`: bloquea el hilo actual hasta que el otro termine. Se le puede
  especificar un _timeout_.

- `void yield()`: cede la CPU en favor de otros hilos. Es un _hint_, por lo que
  no siempre funciona.

- `void interrupt()`: envía la excepción `InterruptedException` al hilo. No hay
  forma de detenerlo, pero esta es una forma para enviarle una señal para que
  termine. Se puede comprobar también con `boolean isInterrupted()`.

- `String getName()`: todos los hilos tienen un nombre, lo que lo hace útil
  luego para debuggear. También se puede obtener su ID: `long threadId()`.

Se puede obtener una referencia al hilo actual con `Thread.currentThread()`.
Otro método estático es el de `Thread.sleep(long milis)`, que bloquea el hilo.

Si todavía hay hilos ejecutándose, la [JVM] no terminará su ejecución. Sin
embargo, si el hilo es de tipo _deamon_ (`void setDaemon(boolean)` y `boolean
isDaemon()`), terminará de todos modos, efectivamente matándolo.

# Carreras críticas

Los hilos tienen su propia stack privada, pero pueden compartir datos mediante
variables estáticas o recibiendo de parámetros referencias a otros objetos.

Esto es susceptible a [carreras críticas] por lo que es necesario proteger su
acceso con [candados]. Nos interesa el siguiente mecanismo:

```java
lock.close(); // Se bloquea si está cerrado
    // Sección crítica
lock.open(); // Libera el candado para el resto
```

En Java, esto está implementado a nivel del lenguaje: bloque `synchronized`:

```java
synchronized (lock) {
    // Sección critica
}
```

Al inicio del bloque se realiza `lock.close()`, y cuando se sale del bloque,
`lock.open()`.

También se puede declarar un método como `synchronized`:

```java
public synchronized void metodo() {
    // Cosas...
}
```

Que no es más que _syntactic sugar_ para lo siguiente:

```java
public void metodo() {
    synchronized (this) {
        // Cosas...
    }
}
```

Cuando una clase tiene sus métodos sincronizados, es prácticamente un [monitor].

## ¿Qué objetos usamos de candado?

En Java, cualquier objeto en memoria puede ser un candado, dado que este
mecanismo está implementado en la clase [Object].

A mayores, tiene los métodos `wait()`, `wait(long milis)`, `notify()`
y `notifyAll()` que implementan [variables de condición].

- `wait()` bloquea el hilo actual de forma indefinida y libera el candado. Solo
  tiene sentido cuando tiene el candado, por lo que debe ser llamado dentro de un
  bloque `synchronized`. `wait(long milis)` hace lo mismo, pero lanza una
  excepción si pasa el tiempo especificado.

- El hilo retorna su ejecución cuando otro ejecuta a `notify()`. En principio,
  no se sabe qué hilo despertará, pero solo lo hará 1. `notifyAll()` notifica
  a todos los hilos dormidos que ejecutaron un `wait()`.

{{< block "Conclusión" >}}
Por tanto, lo mejor es usar el objeto compartido o recurso directamente como candado. <br>
Si la clase es el recurso, se puede usar un método `synchronized`.
{{< /block >}}

## Conjuntos de datos

No es necesario utilizar `synchronized` en todas partes cuando se usan las
colecciones de Java, dado que existen unas versiones ya sincronizadas.
A continuación, se muestra una tabla de equivalencia no exhaustiva.

| No sincronizado | Sincronizado        |
|-----------------|---------------------|
| `ArrayList`     | `Vector`            |
| `HashMap`       | `ConcurrentHashMap` |


[`java.lang.Thread`]: https://docs.oracle.com/en/java/javase/23/docs/api/java.base/java/lang/Thread.html
[`java.lang.Runnable`]: https://docs.oracle.com/en/java/javase/23/docs/api/java.base/java/lang/Runnable.html
[JVM]: {{< ref "poo/referencias/#máquina-virtual-de-java" >}}
[LWP]: {{< ref "so/procesos/#LWP" >}}
[carreras críticas]: {{< ref "so/comunicacion-procesos/#carreras-críticas" >}}
[candados]: {{< ref "so/comunicacion-procesos/#mutexes" >}}
[Object]: {{< ref "poo/encapsulacion/#métodos-especiales" >}}
[variables de condición]: {{< ref "so/comunicacion-procesos/#variables-de-condición" >}}
[monitor]: {{< ref "so/comunicacion-procesos/#monitores" >}}

