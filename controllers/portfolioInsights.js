//Import our database
const db = require('../config/dbConfig');

exports.getportfolioInsights = async(req,res) =>{
    try{
        // const userId =  const userId = req.user.id; // Assuming user ID is obtained via authentication middleware
         // Fetch user portfolio data
         const portfolio = await db.query(
            `SELECT cryptocurrencyname,quantity FROM user_portfolio WHERE userid = ?`, 
            [userId]
        );

        //Check if the portfolio has data
        if (portfolio.length === 0) {
            return res.status(200).json({ 
                message: 'Portfolio is empty.', 
                totalValue: 0, 
                percentageGrowth: 0 
            });
        }
         // Fetch latest prices
         const currentPrices = await db.query(
            `SELECT symbol, price FROM live_prices WHERE symbol IN (?) AND timestamp = (
                SELECT MAX(timestamp) FROM  live_prices
            )`, 
            [portfolio.map(item => item.symbol)]
        );
         // Fetch prices 24 hours ago
         const previousPrices = await db.query(
            `SELECT symbol, price FROM live_prices WHERE symbol IN (?) AND timestamp = (
                SELECT timestamp FROM live_prices WHERE timestamp < NOW() - INTERVAL 24 HOUR
                ORDER BY timestamp DESC LIMIT 1
            )`, 
            [portfolio.map(item => item.symbol)]
        );
         // Calculate current portfolio value
         const currentValue = portfolio.reduce((total, item) => {
            const price = currentPrices.find(p => p.symbol === item.symbol)?.price || 0;
            return total + (item.quantity * price);
        }, 0);
        // Calculate portfolio value 24 hours ago
        const previousValue = portfolio.reduce((total, item) => {
            const price = previousPrices.find(p => p.symbol === item.symbol)?.price || 0;
            return total + (item.quantity * price);
        }, 0);

        // Calculate percentage growth
        const percentageGrowth = previousValue > 0 
            ? ((currentValue - previousValue) / previousValue) * 100 
            : 0;

        return res.status(200).json({
            totalValue: currentValue,
            percentageGrowth: percentageGrowth.toFixed(2),
        });

    }catch(error){
        console.error('Error fetching portfolio insights:', error);
        return res.status(500).json({ error: 'Internal server error' });

    }
}
