const User = require('../models/userModel')
const bcrypt = require('bcrypt')
// DESC Add new user
// route POST /api/user/register
// access public
const registerUser = async(req, res) => {

    const {name, email, password} = req.body

    // validate
    if(!name || !email || !password){
        res.status(400)
        res.json({message: 'Dude.....Input all fields'})
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    // check if user already exist
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        return res.json({message: 'Email already exist'})
    }

    // register user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })   
    if(user){
        res.status(200)
        res.json({
            id: user.id,
            name,
            email,
            password: hashedPassword
        })
    }else{
        res.status(400)
        return res.json({message: 'User not created'})
    }
}

// DESC Login user
// route POST /api/user/login
// access public
const loginUser = async(req, res) => {
    const {email, password} = req.body

    const userExist = await User.findOne({email})
   
    if (userExist && await bcrypt.compare(password, userExist.password)){
        res.status(200).json({
            id: userExist.id,
            name: userExist.name,
            email,
        })
    }else{
        return res.status(400).json({message: 'Invalid credentials'})
    }
}

module.exports = {
    loginUser,
    registerUser,
}