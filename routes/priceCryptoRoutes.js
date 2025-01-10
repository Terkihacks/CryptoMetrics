//Import packages
const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig'); // Database connection
const { storePrices, fetchPrices } = require('../service/priceCryptoService')
const axios = require('axios');

// Fetch live prices and store in the database
router.post('/updatePrices', async (req, res) => {
    try {
        
        const apiKey = process.env.COINMARKETCAP_API_KEY;
        // Call CoinMarketCap API

        const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
            headers: { 'X-CMC_PRO_API_KEY': apiKey },
            params: {start:1, limit: 10, convert: 'USD' },
        });

        const prices = response.data.data.map((crypto) => ({
            name: crypto.name,
            symbol: crypto.symbol,
            price: crypto.quote.USD.price,
            market_cap_rank:crypto.cmc_rank
        }));

        await storePrices(prices, db); // Save prices to the database
        res.status(200).json({ message: 'Prices updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update prices.' });
    }
});

// Fetch stored prices
router.get('/prices', async (req, res) => {
    try {
        const prices = await fetchPrices(db);
        res.status(200).json(prices);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch prices.' });
    }
});

module.exports = router;
