const jwt = require('jsonwebtoken')

const SECRET = "SECRET_30483049"

class jwtService
{
    generate(payload)
    {
        try {
            const options = {
                expiresIn: '7d',
            }
            const token = jwt.sign(payload, SECRET, options)
    
            return token
        } catch (error) {
            console.log('Error generating token:', error.message)
            return null;
        }
    }

    verify(token)
    {
        const decoded = jwt.verify(token, SECRET) 
        return decoded
    }
}

module.exports = new jwtService;