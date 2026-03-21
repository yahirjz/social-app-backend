const Post = require('../models/Post');

//Función para crear 
const createPost = async (req, res) => {
    const {content, img_url } = req.body;
    const user_id =req.user.id;

    try{
        // Creamos el contenido
        const newPost = await Post.create({content, img_url, user_id});
        res.status(201).json({ message: newPost});
    }catch(error){
        res.status(500).json({ message: "Error al crear el publicar"});
    }
}

//Función para obtener el 
const getPost = async ( req, res ) => {
    try{
        // Obtenemos todo el contenido del usuario
        const Allpost = await Post.findAll({ where: {user_id: req.user.id}});
        res.status(200).json( Allpost )
    }catch(error){
        res.status(500).json({ mensaje: "Error al obtener los Post"})
    }
}

//Funcion borrar
const deletePost = async (req, res) => {
    const { id } = req.params;
    try{
        // Verificamos si existe nuestro Post
        const currentPost = await Post.findOne({ where: {id,user_id: req.user.id} })
        if(!currentPost){
            return res.status(400).json({ message: " No esncontrado "})
        }
        //Borramos el contenido
        const clearPost = await Post.destroy({ where: {id, user_id: req.user.id}});
        res.status(200).json({ message: "Borrado", clearPost});
    }catch(error){
        res.status(500).json({ message: "Error al eliminar",error});
    }
}

//Función para actualizar
const updatePost = async (req, res) =>{
    const { id } = req.params;
    const { content, img_url } = req.body;
    try{
        //Actualizamos el contenido
        const update = await Post.update( {content, img_url},{ where: {id, user_id:req.user.id}});
        res.status(200).json({mensaje: "Contenido actualizado", update});
    }catch(error){
        res.status(500).json({ message: "Error al modificar mensaje"});
    }
}
module.exports = { createPost, getPost, deletePost, updatePost }; 