const express = require('express');
const { getportfolioInsights } = require('../controllers/portfolioInsights');
const router = express.Router();

// Middleware for authentication (assume it adds `req.user`)
// const authMiddleware = require('../middlewares/authMiddleware');

router.get('/insights', getPortfolioInsights);

module.exports = router;
