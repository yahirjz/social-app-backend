const express = require('express');
const router = express.Router();
//importamos el middleware
const authenticateToken = require('../middlewares/authMiddleware');
const { postFollow, deleteFollow } = require('../controllers/followController');

router.post("/:id/follow", authenticateToken, postFollow);
router.delete("/:id/unfollow", authenticateToken, deleteFollow);

module.exports = router;