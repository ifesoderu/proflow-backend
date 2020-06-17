const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    const { authorization } = req.headers
    const { email } = req.params
    if (!authorization) return res.status(401).json('Unauthorized')
    jwt.verify(authorization, 'THIS_IS_A_JWT_TOKEN', (err, decoded) => {
        console.log(email)
        if (err) {
            return res.status(401).json('Unauthorized')
        }
        return next()
    });
}

module.exports = {
    requireAuth
}