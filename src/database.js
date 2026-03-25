require('dotenv').config();
const { Sequelize } = require('sequelize');
// Conectamos sequelize a la DB
const sequelize = new Sequelize( process.env.DATABASE_URL,{
    dialect:'postgres',
    dialectOptions:{
        ssl:{
            require: true,
            rejectUnauthorized: false
        }
    }
} )

async function checkConexion() {
    try{
        await sequelize.authenticate();
        await sequelize.sync({alter:true}); // <-- Sincronocimos con la base de datos para crear las tablas
        console.log(" Conexión establecida correctamente ")
    }catch(error){
        console.log(" Error en conexión: ", error)
    }
}
// En entorno de pruebas no sincronizamos ni dejamos procesos colgados
if (process.env.NODE_ENV !== 'test') {
    checkConexion();
}

module.exports = sequelize;
