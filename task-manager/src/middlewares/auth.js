const jwt=require("jsonwebtoken")
const User=require("../models/users")
const auth = async (req, res, next) => {
    try {
        console.log(req.body)
        const token = req.header('Authorization')
        const decoded = jwt.verify(token,"thisismongoose")
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }
        console.log(user)
        // req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth
module.exports=auth