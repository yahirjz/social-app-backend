const express = require('express');
const router = express.Router();
// Importamos el middleware
const authenticateToken = require('../middlewares/authMiddleware')
// importamos los contoladores
const { createPost, getPost, deletePost, updatePost } = require('../controllers/postController');

//Creamos las rutas de los post protegidas
router.post("/", authenticateToken, createPost );
router.get("/", authenticateToken, getPost);
router.delete("/:id", authenticateToken, deletePost);
router.put("/:id", authenticateToken, updatePost);

module.exports = router;