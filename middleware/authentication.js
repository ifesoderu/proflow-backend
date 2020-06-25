const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    const { authorization, useremail } = req.headers
    if (!authorization) return res.status(401).json({ success: false, message: "Unauthorized" })
    jwt.verify(authorization, 'MYJSON_WEB_TOKEN_SECRET', (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }
        if (decoded.data !== useremail) return res.status(401).json({ success: false, message: "Unauthorized" })
        return next()
    });
}

module.exports = {
    requireAuth
}