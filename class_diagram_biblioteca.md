# Diagrama de Clases - Biblioteca Popular Pueyrredon Norte

Este diagrama es una version simple y de analisis para usar como guia inicial del proyecto.

```mermaid
classDiagram
    class Library {
        +name: String
        +address: String
        +phone: String
        +addBook()
        +registerUser()
        +createEvent()
    }

    class User {
        +id: int
        +name: String
        +email: String
        +phone: String
        +borrowBook()
        +returnBook()
        +viewEvents()
    }

    class Admin {
        +adminCode: String
        +addBook()
        +removeBook()
        +manageLoans()
        +manageEvents()
    }

    class Book {
        +id: int
        +title: String
        +author: String
        +category: String
        +status: String
        +markAsBorrowed()
        +markAsAvailable()
    }

    class Loan {
        +id: int
        +loanDate: Date
        +dueDate: Date
        +status: String
        +createLoan()
        +closeLoan()
    }

    class Event {
        +id: int
        +title: String
        +date: Date
        +description: String
        +capacity: int
        +publishEvent()
        +updateEvent()
    }

    User <|-- Admin
    Library "1" o-- "*" Book
    Library "1" o-- "*" User
    Library "1" o-- "*" Event
    User "1" -- "*" Loan
    Book "1" -- "*" Loan
```

## Relaciones principales

- `Admin` hereda de `User`.
- `Library` administra libros, usuarios y eventos.
- `User` puede tener varios prestamos.
- `Book` puede participar en varios prestamos a lo largo del tiempo.
- `Event` es abierto a cualquier usuario del sistema.

