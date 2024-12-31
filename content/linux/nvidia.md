
```sh
switcherooctl list
```

Muestra las tarjetas gráficas y el orden de uso (cuál es la predeterminada).

Por defecto probablemente sea la integrada, lo que es bueno para no consumir
tanta batería para aplicaciones no tan intensivas. Para activar la tarjeta
nvidia hay que especificar el entorno que muestra el comando.

Puedes hacer un script como el siguiente para ejecutar cualquier comando usando
la tarjeta dedicada:

```sh
#!/bin/bash

# Taken from: https://medium.com/@bigdsdojo/utilizing-nvidia-gpu-for-specific-applications-on-linux-a-simple-script-approach-6bb122cc5b3c

# Check if at least one argument is provided
if [[ $# -lt 1 ]]; then
    echo "Usage: $0 <program> [arguments]"
    exit 1
fi

# Get the program name and the arguments
program=$1
shift  # Shift the arguments to remove the first one
arguments="$@"

# Run the program with the NVIDIA GPU
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia $program $arguments
```

```sh
glxinfo | grep -e OpenGL.vendor -e OpenGL.renderer
```

Muestra el renderer de OpenGL usado por defecto.

```sh
lspci -n -n -k | grep -A 2 -e VGA -e 3D
```

Lista los drivers en uso.


# Fedora

Para usar los drivers propietarios de nvidia, añade un repositorio. Al usar KDE
Plasma, la forma más fácil es ir a `Discover > Settings > Fedora Linux XX (KDE
Plasma)` y activar el repositorio `RPM Fusion for Fedora XX - Nonfree - NVIDIA
Driver`.

Luego instala `akmod-nvidia`:

```sh
sudo dnf install akmod-nvidia
```
