const mongoose = require ('mongoose');
const validator = require ('validator');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    tokens:[{token: {
        type: String,
        required: true
    }}]
})

userSchema.methods.generateAuthToken = async function() {
    //generate an auth token for the user
    const user = this
    console.log(user)
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    console.log(token)
    return ({token})
} 

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email } )
    // console.log(user)
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    console.log(password)
    console.log(user.password)
    // const isPasswordMatch = await user.compare(password, user.password)
    if (password === user.password) {
        // throw new Error({ error: 'Invalid login credentials' })
        // console.log(user)
        return user

    }
    return user
}


const User = mongoose.model('User', userSchema)

module.exports = User