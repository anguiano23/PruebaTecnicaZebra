# ZebraLogistics — Prueba Técnica Fullstack

Descripción: Aplicación web Fullstack que incluye autenticación de usuarios y mantenimiento de un catálogo de clientes.

# Tecnologías utilizadas en este proyecto

| Capa                 | Tecnología                                      |
| -------------------- | ----------------------------------------------- |
| Frontend             | Angular 21 + Bootstrap 5                        |
| Backend              | Node.js + Express                               |
| Base de datos        | SQL Server Express(nueva versión de SQL Server) |
| Autenticación        | express-session                                 |
| Control de versiones | Git                                             |

# Requisitos Previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- Node.js v22.13.1 o superior
- Angular CLI v21 o superior
- SQL Server Express
- SQL Server Management Studio (SSMS)
- Git

#### Instrucciones para Ejecutar el Proyecto

## Colonamos el repositorio

# git clone

# cd ZebraLogistics

## Configurar el backend

# cd backend, npm install

# Edita el archivo '.env' con tus datos:

```env
PORT=3000
DB_SERVER=localhost
DB_DATABASE=prueba_tecnica
DB_USER=sa
DB_PASSWORD=tu_password
SESSION_SECRET=mi_secreto_super_seguro
```

### Levanta el servidor

npm run dev

# El backend se correra en: `http://localhost:3000`

#### Configuramos el Frontend y estara corriendo

# url: `http://localhost:3000`

############# Credenciales de acceso al sistema

# usuario: admin

contraeña: 1234

###### Explicaión del proyecto

## Autenticación

Se implementó autenticación mediante 'express-session' en el backend. Al iniciar sesión correctamente, el servidor crea una sesión y el frontend la almacena en 'localStorage'. El 'AuthGuard' de Angular protege las rutas privadas verificando si existe una sesión activa.

## CRUD de Clientes

El frontend consume la API REST del backend mediante servicios de Angular ('ClientesService'). Cada operación (crear, leer, actualizar, eliminar) corresponde a un endpoint específico del backend que interactúa directamente con la base de datos SQL Server.

## Autor

Desarrollado por: Alejandro Hernández Anguiano

###### SCRIPT DB

-- Creamos nuestra base de datos
CREATE DATABASE prueba_tecnica;

-- usamos nuestra base de datos
use prueba_tecnica;

-- Creamos la tabla usuarios (para nuestro login)
CREATE TABLE usuarios (
id INT PRIMARY KEY IDENTITY(1,1),
usuario VARCHAR(50) NOT NULL UNIQUE,
password VARCHAR(100) NOT NULL
);

-- Creamos nuestra tabla clientes
CREATE TABLE clientes (
id INT PRIMARY KEY IDENTITY(1,1),
nombre VARCHAR(100) NOT NULL,
correo VARCHAR(100) NOT NULL,
telefono VARCHAR(20) NOT NULL,
estatus VARCHAR(20) NOT NULL
);

-- Creamos usuario de prueba
INSERT INTO usuarios (usuario, password)
VALUES ('admin', '1234');

--Creamos clientes de prueba
INSERT INTO clientes (nombre, correo, telefono, estatus) VALUES
('Alejandro Hernández', 'alejandro@mail.com', '4771234567', 'Activo'),
('Diego Hernández', 'diego@mail.com', '4779876543', 'Activo'),
('Juan Hernández', 'juan@mail.com', '4771112233', 'Inactivo');

Malandro10%
