const validateInputs = async(name,quantity,purchasePrice) =>{
    if (!name || typeof name !== 'string') {
        return 'Invalid cryptocurrency name';
    }
    if (quantity !== undefined && (isNaN(quantity) || quantity < 0)) {
        return 'Quantity must be a non-negative number';
    }
    if (purchasePrice !== undefined && (isNaN(purchasePrice) || purchasePrice < 0)) {
        return 'Purchase price must be a non-negative number';
    }
    return null;
}
 
module.exports = validateInputs