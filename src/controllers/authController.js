const User = require('../models/User');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');

//Función para registrarse 
 const register = async (req, res) =>{
    const { username, email, password } = req.body;

    try{
        // Buscamos en la base de datos
        const userEmail = await User.findOne({ where: { email }});
        //Bucamos el usuario
        const userName = await User.findOne({ where:{ username }});
         
        //verificamos 
        if(userEmail) {
            return res.status(400).json({ message: `Ya hay un usuario con este email: ${email}`}); 
        }
        if( userName ){
            return res.status(400).json({ message: `El nombre de ususario ya esta ocupado`});
        }
    
        //Hasheo del password
        const hashedPassword = await bcrypt.hash(password, 10)
    
        // Creamos el ususario
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })
        res.status(201).json(" Usuario creado con exito ");

    }catch(error){
        res.status(401).json({menssage: 'Error en el servidor', error});
    }
}      

// Función  login
const login = async (req, res) => {
    const { email, password} = req.body;

    try{
        //Buscamos el email
        const userSearch = await User.findOne({where: {email}});
        // comparamos si existe el email
        if(!userSearch){
          return res.status(400).json({ message: ' Usuario o Contraseña incorrectos'})
        }

        // Comparamos el password
        const passwordCorrect = await bcrypt.compare(password, userSearch.password);
        
        //Si no coincide el password
        if(!passwordCorrect){
            return res.status(401).json({ message: 'Usuario o Contraseña son incorrectos'})
        }

        //JWT
        const token = jwt.sign(
            {id:userSearch.id, username: userSearch.username}, //el payload
            process.env.JWT_SECRET,
            {expiresIn: '24h'} // Expiración de 24Hrs
        )

        // Si todo esta ok
        res.status(200).json({ message: `Bienvenido ${userSearch.email}`, token})

    }catch(error){
        res.status(500).json({ message:' Error al iniciar sesión ', error})
    }
    

}

module.exports = {register, login}