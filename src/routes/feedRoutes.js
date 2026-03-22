const express = require('express');
const router = express.Router();
const autenctificación = require('../middlewares/authMiddleware')
const { feedGlobal } = require('../controllers/feedController');

router.get("/", autenctificación, feedGlobal);
module.exports = router;