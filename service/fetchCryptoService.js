//Import our database
const db = require('../config/dbConfig');
require('dotenv').config();
const axios = require('axios');
//Lets create a Redis Client
const redisClient = redis.createClient(
    {
        host:process.env.REDIS_HOST,
        port:process.env.REDIS_PORT
    }
);
//Check if the connection is successful
redisClient.on('error', (err) => console.error('Redis Error:', err));
//Lets make our API CALL 
exports.getTopCryptos = async() =>{
    const url = process.env.COINMARKETCAP_BASE_URL;
    const apiKey = process.env.COINMARKETCAP_API_KEY;
    //Error handling using the try,catch block
    try{
        const response = await axios.get(url, {
            headers: { 'X-CMC_PRO_API_KEY': apiKey },
            params: {start: 1, limit: 10, convert: 'USD' },
        });

    }
    catch(error){

    }
    
}
