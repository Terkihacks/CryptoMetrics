const db = require('../config/dbConfig');
const storePrices = async (prices, db) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Clear old prices and insert new ones
        const deleteQuery = 'DELETE FROM live_prices';
        const insertQuery =
            'INSERT INTO live_prices (name, symbol, price,market_cap_rank) VALUES ?';
        const values = prices.map(({ name, symbol, price,market_cap_rank}) => [
            name,
            symbol,
            price,
            market_cap_rank,
        ]);

        await connection.query(deleteQuery); // Clear old prices
        await connection.query(insertQuery, [values]); // Insert new prices

        await connection.commit(); // Commit transaction
        console.log('Prices updated successfully...');
    } catch (err) {
        await connection.rollback(); // Rollback on error
        throw err;
    } finally {
        connection.release(); // Release connection back to the pool
    }
};

const fetchPrices = async (db) => {
    const query = 'SELECT * FROM live_prices ';
    const [results] = await db.query(query);
    return results;
};

module.exports = { storePrices, fetchPrices };
