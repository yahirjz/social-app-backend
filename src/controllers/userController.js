const User = require('../models/User');

const updateProfile = async(req, res) => {
    const { username, bio, foto_url, phone } = req.body;
    const id = req.user.id
    try{
        const currentUser = await User.findOne({ where: { id }});
        if(!currentUser){
            return res.status(400).json({ message: " No se puede actualizar "});
        }
        const updateUser = await User.update({ username, bio, foto_url, phone}, {where: { id:req.user.id}});
        res.status(200).json({ message: "Actualizacion existosa", updateUser});
    }catch(error){
        res.status(500).json({ message: " No se pudo actualizar", error});
    }
}

module.exports = {updateProfile}