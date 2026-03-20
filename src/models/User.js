const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Deffinimos el modelo del usuario 
const User = sequelize.define('User',{
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    username:{ 
        type: DataTypes.STRING, 
        unique: true, //<-- que sea unico 
        allowNull: false //<-- si es obligatorio
    },
    email:{
       type: DataTypes.STRING,
       unique: true,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    foto_url:{
        type: DataTypes.STRING,
        allowNull: true
    },
    bio:{
        type: DataTypes.STRING,
        allowNull: true
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: true
    }

},{
    timestamps: true// <-- agregacios de creación y actualización
});

module.exports = User;