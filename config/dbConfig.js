const mysql = require('mysql2')
require('dotenv').config();

const pool = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD
});
//Connection Confirmation
pool.getConnection((err,connection) =>{
    if(err){
        console.log('Database connection failed',err.message);
    } else{
        console.log('Database connected successfully ....')
        connection.release();
    }
})

module.exports = pool.promise()