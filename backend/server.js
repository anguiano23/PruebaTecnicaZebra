//Importamos la configuración principal de Express que se ejecuta en app.js
var app  = require('./src/app');

//Cargamos las variables del archivo .env(PORT, DE_SERVER)
require('dotenv').config();

//Tomamos el puerto .env, si no existe usaremos 3000 por defecto
var PORT = process.env.PORT || 3000;

//Ponemos en escucha al servidor.
app.listen(PORT, function(){
    console.log('El servidor está corriendo en el puerto ' + PORT);
});