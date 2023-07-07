---
title: Package Managers
description: TODO
weight: 6
date: TODO
draft: true
---


# Links

[Pacman CheatSheet][pc]

[pc]: https://devhints.io/pacman

# snap

[snap docs]: https://snapcraft.io/docs/getting-started

Se instalan en `/snap/bin`

Invertigar Interfaces

Most snaps use strict confinement to isolate both their execution environments
and their data from your system (see Snap Confinement for further details).
A confined snap that needs user-access to files will most likely use the home
interface to bridge this confinement gap, allowing you to save and load files
from your home directory automatically.

    snap connections <name>
