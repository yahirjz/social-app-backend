const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Definimos el modelo de los post
const Post = sequelize.define('Post',{
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    user_id:{
        type: DataTypes.UUID,
        allowNull: false,
        // referencia foranea
        references:{
            model: 'Users',
            key: 'id'
        }
    },
    content:{
        type: DataTypes.STRING,
        allowNull: false
    },
    img_url:{
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    timestamps: true
});

module.exports = Post;