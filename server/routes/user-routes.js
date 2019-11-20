const express = require ('express');
const router = express.Router();
const User = require ('../models/user');
const helper = require ('./helper');
const auth = require ('./auth');

//list all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json({users})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//user login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body)
        // console.log(user)
        const user = await User.findByCredential(email, password)
        // console.log(user)
        if (!user) {
            return res.status(401).send({message: 'Login failed!'})
        }
        // console.log(user)
        // console.log(token)
        const token = await user.generateAuthToken()
        // console.log(token)
        res.send({token})
    } catch (err) {
        // console.log(token)
        res.status(400).send({message: 'bad requffest'})
    }
})

//user me
router.get('/user/me/:id', auth, async (req, res) => {
    //view logged in user profile
    res.send(req.user)
})


//create new user
router.post('/post', async (req, res) => {
    if (req.body.password === req.body.password2) {
        res.send({message: 'your password is correct'})
    }
    const user = new User (req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//logout
router.post('/me/logout/:id', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send({message: 'You have logged out'})
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router;