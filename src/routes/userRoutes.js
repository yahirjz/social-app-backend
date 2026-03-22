const express = require('express');
const router = express.Router();
const autenctificación = require('../middlewares/authMiddleware');
const {updateProfile} = require('../controllers/userController');

router.put("/profile", autenctificación, updateProfile);

module.exports = router;