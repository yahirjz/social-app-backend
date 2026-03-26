const express = require('express');
const router = express.Router();
//importamos el middleware
const authenticateToken = require('../middlewares/authMiddleware');
const { postFollow, deleteFollow, getMyFollows, getMyFollowers} = require('../controllers/followController');

router.post("/:id/follow", authenticateToken, postFollow);
router.delete("/:id/unfollow", authenticateToken, deleteFollow);
router.get('/following', authenticateToken, getMyFollows);
router.get('/followers', authenticateToken, getMyFollowers);

module.exports = router;