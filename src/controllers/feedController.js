const Post = require('../models/Post');
const User = require('../models/User')
const Followers = require('../models/Followers');

// Función para obtener todos los POST
const feedGlobal = async (req, res) => {
    try{
        const allPost = await Post.findAll({
            include:[
                {
                    model: User,
                    attributes:['id', 'username', 'foto_url']
                }
            ]
        })
        // mostramos nuestros POSTS (Publicaciones)
        res.status(200).json( allPost);
    }catch(error){
        res.status(500).json({ message: " No se pudieron obtener la Publicaciones"})
    }
}

module.exports = { feedGlobal}