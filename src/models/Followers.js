const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Modelamos la tabla de seguidores 
const Followers = sequelize.define('Followers',{
    follower:{
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: 'Users',
            key: 'id'
        }
    },
    followed:{
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model:'Users',
            key:'id'
        }
    }
},{
    timestamps: true
});

module.exports = Followers;