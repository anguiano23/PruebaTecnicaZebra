//Aqui codificamos la conexión con la base de datos (en este caso usamos SQL Server)

var sql = require('mssql');
require('dotenv').config();

var config_db = {
    server: 'localhost', //Servidor SQL Server
    port: 1433, //Puerto TCP/IP
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        trustServerCertificate: true, //Confiamos en el certificado del servidor
        encrypt: false,
        instanceName: 'SQLEXPRESS'
    }
};




// Creamos el pool de conexiones y lo exportamos como promesa
var poolPromise = new sql.ConnectionPool(config_db)
    .connect()
    .then(pool => {
        console.log('✅ Conectado a SQL Server');
        return pool;
    })
    .catch(err => {
        console.log('❌ Error en la conexión de base de datos:', err);
    });

module.exports = { sql, poolPromise };