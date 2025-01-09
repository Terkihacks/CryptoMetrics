//Import our database
const db = require('../config/dbConfig');
const validateInputs = require('../utils/validateInputs')

//Add Crypto
exports.createCrypto = async(req,res) =>{
    try{
     const{name,quantity,purchasePrice} = req.body;
     //Validate Inputs
     const validationErr = validateInputs;
     if(validationErr) return res.status(400).json({message: validationErr})
     //Check if the crypto is available to avoid a double entry
     const[rows] = await db.execute('SELECT * FROM user_portfolio WHERE cryptocurrency_name = ?,'[name])
     if(rows > 0) return res.status(400).json({message:'Crypto currency already exists in your portfolio'})
        await db.execute(
        `INSERT INTO user_portfolio(cryptocurrency_name,quantity,purchase_price)
        VALUES(?,?,?)
        `,[name,quantity,purchasePrice]
        )
        res.status(200).json({message:'Crypto Currency has been added Successfully'});
    }catch(error){
        console.log(error)
        res.status(500).json({message : 'Error adding crypto currency',error})
    }
}

//Read

exports.getCryptos = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM user_portfolio');

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No cryptocurrencies found in the portfolio' });
        }

        res.status(200).json({ message: 'Cryptocurrencies retrieved successfully', data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving cryptocurrencies', error });
    }
};

//Update

exports.updateCrypto = async (req, res) => {
    try {
        const { id } = req.params; // "id" is the unique identifier for each cryptocurrency
        const { quantity, purchasePrice } = req.body;

        // Check if the cryptocurrency exists
        const [rows] = await db.execute('SELECT * FROM user_portfolio WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Cryptocurrency not found in the portfolio' });
        }

        await db.execute(
            `UPDATE user_portfolio
            SET quantity = ?, purchase_price = ?
            WHERE id = ?`,
            [quantity, purchasePrice, id]
        );

        res.status(200).json({ message: 'Cryptocurrency has been updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating cryptocurrency', error });
    }
};

//Delete

exports.deleteCrypto = async (req, res) => {
    try {
        const { id } = req.params; // "id" is the unique identifier for each cryptocurrency

        // Check if the cryptocurrency exists
        const [rows] = await db.execute('SELECT * FROM user_portfolio WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Cryptocurrency not found in the portfolio' });
        }

        await db.execute('DELETE FROM user_portfolio WHERE id = ?', [id]);

        res.status(200).json({ message: 'Cryptocurrency has been deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting cryptocurrency', error });
    }
};