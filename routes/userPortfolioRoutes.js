//import packages
const express = require('express');
const router = express.Router();
//Lets destructure our functions in our controller
const{createCrypto,getCryptos,updateCrypto,deleteCrypto} = require('../controllers/userPortfolioController')

router.post('/addcrypto',createCrypto);
router.get('/getCrypto',getCryptos);
router.put('/updateCrypto/:id',updateCrypto);
router.delete('/deleteCrypto/:id',deleteCrypto);

module.exports = router;