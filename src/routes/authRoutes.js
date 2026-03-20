const express = require('express');
const router = express.Router();
// importamos las funciones de los controladores de autenctificación
const {register, login} = require('../controllers/authController'); 

// Definimos los routers para definir que post vamos a usar para manejar la petición
router.post('/register', register); 
router.post('/login', login)

module.exports = router;