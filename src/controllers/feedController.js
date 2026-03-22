const Post = require('../models/Post');
const Followers = require('../models/Followers');

// Función para obtener todos los POST
const feedGlobal = async (req, res) => {
    try{
        // Buscamos a quien seguimos
        const following = await Followers.findAll({ where: { follower_id: req.user.id}});

        // Extraemos su id de quien seguimos
        const followedIds = following.map(f => f.followed_id);

        //Buscamos sus posts
        const posts = await Post.findAll({ where: { user_id: followedIds}});
        
        // mostramos nuestros POSTS (Publicaciones)
        res.status(200).json( posts);
    }catch(error){
        res.status(500).json({ message: " No se pudieron obtener la Publicaciones"})
    }
}

module.exports = { feedGlobal}