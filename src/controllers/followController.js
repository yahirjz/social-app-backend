const Follwer = require('../models/Followers');

// Función para seguir
const postFollow = async (req, res) => {
    const { id } = req.params;

    try{
        if(req.user.id === id){
            return res.status(401).json({ message: "No sepuede seguir "})
        }
        //Buscamos si ya se sigue
        const follow = await Follwer.findOne({ where: { follower_id:req.user.id, followed_id: id }});
        if(follow){
            return res.status(400).json({ message: " ya sigues a este usuario "})
        }
        //Creamos el nuevo follow
        const newFollow = await  Follwer.create({ follower_id: req.user.id, followed_id: id})
        res.status(201).json({ message: " Usuario seguido extosamente ", newFollow})
    }catch(error){
        res.status(500).json({ message: "Error al seguir"})
    }
}

// Función para borrar
const deleteFollow = async(req, res) =>{
    const { id } = req.params;
    try{
        //verificamos
       const currentFollow = await Follwer.findOne({ where: { follower_id:req.user.id, followed_id: id }});
       if(!currentFollow){
        return res.status(401).json({ message: "No se puede eliminar"})
       }
       const clearFollow = await Follwer.destroy({ where: { follower_id:req.user.id, followed_id: id}});
       res.status(200).json({ message: "Dejar de seguir", clearFollow})
    }catch(error){
        res.status(500).json({ message: "Error al eliminar",error});
    }
}

module.exports = { postFollow, deleteFollow};