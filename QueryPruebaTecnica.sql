-- Creamos nuestra base de datos
CREATE DATABASE prueba_tecnica;

-- usamos nuestra base de datos
use prueba_tecnica;

-- Creamos la tabla usuarios (para nuestro login)
CREATE TABLE usuarios (
    id       INT PRIMARY KEY IDENTITY(1,1),
    usuario  VARCHAR(50)  NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

-- Creamos nuestra tabla clientes
CREATE TABLE clientes (
    id       INT PRIMARY KEY IDENTITY(1,1),
    nombre   VARCHAR(100) NOT NULL,
    correo   VARCHAR(100) NOT NULL,
    telefono VARCHAR(20)  NOT NULL,
    estatus  VARCHAR(20)  NOT NULL
);

-- Creamos usuario de prueba
INSERT INTO usuarios (usuario, password) 
VALUES ('admin', '1234');

--Creamos clientes de prueba
INSERT INTO clientes (nombre, correo, telefono, estatus) VALUES
('Alejandro Hernández',   'alejandro@mail.com',   '4771234567', 'Activo'),
('Diego Hernández',  'diego@mail.com',  '4779876543', 'Activo'),
('Juan Hernández',  'juan@mail.com', '4771112233', 'Inactivo');

select * from clientes;
select * from usuarios;

EXEC xp_readerrorlog 0, 1, N'Server is listening on';

SELECT 
    local_tcp_port
FROM 
    sys.dm_exec_connections
WHERE 
    session_id = @@SPID;