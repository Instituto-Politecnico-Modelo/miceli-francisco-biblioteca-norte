# Diagrama de Clases - Biblioteca Popular Pueyrredon Norte

Este diagrama es una version simple y de analisis para usar como guia inicial del proyecto.

```mermaid
classDiagram
    class Biblioteca {
        +nombre: String
        +direccion: String
        +telefono: String
        +libros: Libro[]
        +usuarios: Usuario[]
        +eventos: Evento[]
        +prestamos: Prestamo[]
        +agregarLibro()
        +registrarUsuario()
        +crearEvento()
    }

    class Usuario {
        +id: int
        +nombre: String
        +correo: String
        +telefono: String
        +solicitarPrestamo()
        +devolverLibro()
        +verEventos()
    }

    class Administrador {
        +codigoAdministrador: String
        +agregarLibro()
        +quitarLibro()
        +gestionarPrestamos()
        +gestionarEventos()
    }

    class Libro {
        +id: int
        +titulo: String
        +autor: String
        +categoria: String
        +estado: String
        +marcarComoPrestado()
        +marcarComoDisponible()
    }

    class Prestamo {
        +id: int
        +fechaPrestamo: Date
        +fechaVencimiento: Date
        +estado: String
        +usuario: Usuario
        +libro: Libro
        +registrarPrestamo()
        +cerrarPrestamo()
    }

    class Evento {
        +id: int
        +titulo: String
        +fecha: Date
        +descripcion: String
        +capacidad: int
        +participantes: Usuario[]
        +publicarEvento()
        +actualizarEvento()
    }

    Usuario <|-- Administrador
    Biblioteca "1" o-- "*" Libro
    Biblioteca "1" o-- "*" Usuario
    Biblioteca "1" o-- "*" Evento
    Biblioteca "1" o-- "*" Prestamo
    Usuario "1" -- "*" Prestamo
    Libro "1" -- "*" Prestamo
    Usuario "*" -- "*" Evento : participa en
```

## Relaciones principales

- `Administrador` hereda de `Usuario`.
- `Biblioteca` administra libros, usuarios, eventos y prestamos.
- `Usuario` puede tener varios prestamos.
- `Libro` puede participar en varios prestamos a lo largo del tiempo.
- `Usuario` puede participar de distintos eventos de la biblioteca.

