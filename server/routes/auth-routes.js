const express = require('express')

const router = express.Router()
const {registerUser, loginUser, logOutUser, authMiddleWare} = require('../controllers/auth-controllers')



 
router.post('/register', registerUser) 
router.post('/login', loginUser) 
router.post('/logout', logOutUser) 
router.get('/check-auth', authMiddleWare, (req, res)=>{
    const user = req.user;
    console.log("auth-middleware");
    
    res.status(200).json({
        success : true,
        message : "Authenticated User",   
        user 
    })          
})


 

  
 
module.exports = router    