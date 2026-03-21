const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Modelamos la tabla de seguidores 
const Followers = sequelize.define('Followers',{
    follower_id:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references:{
            model: 'Users',
            key: 'id'
        }
    },
    followed_id:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references:{
            model:'Users',
            key:'id'
        }
    }
},{
    timestamps: true,
    id: false,
     primaryKey: false,
});

module.exports = Followers;