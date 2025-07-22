const jwt = require('jsonwebtoken');


// Generate a JWT token for a user.
const generateToken = (id , name , role) => {
    return jwt.sign(
        { id, name , role },
        process.env.JWT_SECRET, 
        { expiresIn: process.env.EXPIRES_IN } 
    );
}



module.exports = {
    generateToken
}