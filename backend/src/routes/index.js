const express = require('express');
const router = express.Router();
const segmentTreeRoutes = require('./segmentTreeRoutes');

router.use('/', segmentTreeRoutes);

module.exports = router;
