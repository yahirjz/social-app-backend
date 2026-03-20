const jwt = require('jsonwebtoken');

// Función para verificar el token
const authenticateToken = async (req, res, next) => {
    try{
        const authHeader = req.headers['authorization']; //<-- Extraemos el header
        const token = authHeader && authHeader.split(' ')[1]; // <-- separamos el token que 
        // Validamos si el token existe
        if(!token){
            return res.status(401).json({ message: ' Acceso denegado. se require un token '});
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET); // <-- Verificamos el token
        req.user = decoded //<-- Guardamos el payload para no buscar en la DB
        next();
    }catch(error){
        res.status(403).json({ message: 'Acceso denegado', error})
    }

}

module.exports = authenticateToken;