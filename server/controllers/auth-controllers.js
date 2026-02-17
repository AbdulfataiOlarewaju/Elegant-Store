const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')





const registerUser = async (req, res)=>{
    try {
        const {userName, email, password} =req.body

        const checkExistingUser = await User.findOne({email})
        if(checkExistingUser){
            return res.status(400).json({
                success : false,
                message : 'User already exit'
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newlyCreatedUser = new User({       
            userName,
            email,
            password: hashedPassword
        })
        await newlyCreatedUser.save()
        if(newlyCreatedUser){
            return res.status(201).json({
                success : true,
                message : 'Registration successful'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'something went wrong! please again'     
        })
    }
}

// login 

const loginUser = async (req, res)=>{

    try {
        const {email, password} =req.body

        const checkUser = await User.findOne({email})
        if(!checkUser){
            return res.status(404).json({
                success : false,
                message : "user does't exit! please register"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, checkUser.password)
        if(!isPasswordMatch){
            return res.status(404).json({
                success : false,
                message : 'incorrect password! please try again'
            })
        }
        const token = jwt.sign({
            id : checkUser._id,
            userName : checkUser.userName,
            role : checkUser.role,
            email : checkUser.email
        }, process.env.JWT_SECRETE_KEY,  
    {expiresIn : '700m'})

        res.cookie('token', token, {httpOnly : true, secure : false}).json({
            success : true,
            message : "Logged in successfully",
            user : {
                userName : checkUser.userName,
                email : checkUser.email,
                role : checkUser.role,
                id : checkUser._id 
            },
            token
        })
    } catch (error) {
         console.log(error);
        res.status(500).json({
            success : false,
            message : 'something went wrong! please try again later'
        })
    }
}

// logout

const logOutUser = async(req, res)=>{
    res.clearCookie('token').json({
        success : true,
        message : 'Logged out succefully!'
    })
}


// middileware
const authMiddleWare = async(req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            success : false,
            message : 'Unauthorized User!'
        })
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRETE_KEY)
        req.user = decodedToken
        next()
    } catch (error) {
         console.log(error);
        res.status(401).json({
            success : false,
            message : 'Unauthorized User!' 
        })
    }
}

module.exports = {registerUser, loginUser, logOutUser, authMiddleWare}   