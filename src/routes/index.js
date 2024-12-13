const express = require('express');
const authRoutes = require('./authRoutes');
const courseRoutes = require('./courseRoutes');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/course', authMiddleware, courseRoutes)

module.exports = router;