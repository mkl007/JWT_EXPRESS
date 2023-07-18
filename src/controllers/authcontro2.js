const { Router } = require('express');

const router = Router();

const jwt = require('jsonwebtoken');

const verifyToken = require('./verifytoken')

const config = require('../config');

const User = require('../models/User')

router.get('/ejemplo', async (req, res, next) => {
    console.log("estoy aqui")
    res.json({"msg": "Si estoy aqui bro!!"})
})

router.post('/signup', async (req, res, next) => {

    const { username, email, password } = req.body;
    const newUser = new User({
        username,
        email,
        password
    });

    newUser.password = await newUser.encryptPassword(newUser.password);
    newUser.save()
    // crear el token para el usuario con su ID
    const token = jwt.sign({ id: newUser._id }, config.secret, {
        expiresIn: 60 * 60 * 24
    });

    res.json({ auth: true, token: token })
    consol
})

router.get('/me', verifyToken, async (req, res, next) => {
  
    // usar este ejemplo para evitar mostrar some data in the client such as 
    // Password, email or other
    // const user_found = await User.findById(req.userId, {password: 0, email: 0});
    const user_found = await User.findById(req.userId);
    if (!user_found) {
        return res.status(404).send('User not found')
    }
    res.json(user_found);
});

//SI QUIERO TENER OTRA RUTA Y QUIERO HACER EL MISMO PROCESSO
router.get('/dashboard', verifyToken, async (req, res, next) => {
    res.json({'message': "Dashboard!"})
})

//SIGNIN RUOTE
router.post('/signin', async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email:email});
    if(!user){
        return res.status(404).send("Email not found.")
    }

    const valiPassword = await user.validatePassword(password);
    if(!valiPassword){
       return res.status(401).json({auth: false, token: null})
    }
    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60 * 24
    })

    res.json({auth:true, token})

})

module.exports = router;


// ,
//     (err, token) => {
//         if(err) console.log(err);
//         res.cookie('token', token)
//         res.json({msg: "User Successfully Logged in", token})
//     });