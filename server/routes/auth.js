const jwt = require ('jsonwebtoken');
const User = require ('../models/user');

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    // const bearer= token.replace('Bearer ', '');
    const data = jwt.verify(token, process.env.JWT_KEY)
    try {
        const user = await User.findOne({_id: data._id, 'tokens.token': token})
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (err) {
        res.status(401).send({message: 'not authorized to access this'})
    }
}

module.exports = auth;