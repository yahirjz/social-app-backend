const User = require('../models/User');
// Función para seguir
const postFollow = async (req, res) => {
    const { id } = req.params;

    try{
        const user = await User.findByPk(req.user.id); // <-- Usuario que hace la petición
        const userFollow = await User.findByPk(id)  // <-- Usuario que queremos seguir 

        if(!user|| !userFollow ){
          return res.status(404).json({ message: "Usuario no encontrado"})
        }
        // Verificació de usuario seguido
        const currentUser = await user.hasFollowing(userFollow);
        if(currentUser){
            return res.status(400).json({ message: "Ya sigues a este usuario" });
        }
        //Creamos el nuevo follow
        const newFollow = await  user.addFollowing(userFollow);
        res.status(201).json({ message: " Usuario seguido extosamente ", newFollow})
    }catch(error){
        res.status(500).json({ message: "Error al seguir"})
    }
}

// Función para borrar
const deleteFollow = async(req, res) =>{
    const { id } = req.params;
    try{
        const user = await User.findByPk(req.user.id); // <-- Usuario que hace la petición
        const userUnFollow = await User.findByPk(id)  // <-- Usuario que queremos dejar de seguir

        if(!user || !userUnFollow ){
            return res.status(400).json({ message: "Usuario no encontrado"});
        }
        //Removemos el usuario 
        const currentFollow = await user.removeFollowing(userUnFollow);
        //verificamos
       if(!currentFollow){
            return res.status(401).json({ message: "No se puede eliminar"})
        }
        res.status(201).json({ message: "Se elimino usuario"});
     
    }catch(error){
        res.status(500).json({ message: "Error al eliminar",error});
    }
}
//Función para obtener seguidores
const getMyFollows = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id)
        const myFollowers = await user.getFollowing();
        res.status(200).json(myFollowers);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener seguidos" });
    }
}

// Función para obtener quien me sigue
const getMyFollowers = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        const misSeguidores = await user.getFollowers(); 
        res.status(200).json(misSeguidores);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener seguidores" });
    }
}


module.exports = { postFollow, deleteFollow, getMyFollows, getMyFollowers};