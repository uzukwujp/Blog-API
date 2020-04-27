const User = require('../models/user');
const bcrypt = require('bcrypt');
const {validateUserInput} = require('../inputValidation/user');
const jwt = require('jsonwebtoken');


exports.signup = (req,res,next)=>{
    validateUserInput(req.body)
    .then((result)=>{
        bcrypt.hash(result.password)
        .then((hash)=>{
            const user = new User({
                userName: result.userName,
                email: result.email,
                password: hash,
                phone: result.phone,
                isAdmin: result.isAdmin
            })
            user.save()
            .then(()=>{
                res.status(201).json({"message": "registartion successful"})
            })
            .catch((error)=>{
                res.status(400).json({"error": error})
            })
        })
        .catch((error)=>{
            res.status(500).json({"error":error})
        })

    })
    .catch((error)=>{
        res.status(400).json({"error": error})
    })
}


exports.login = (req,res,next) =>{
    //find the user if not available throw error
    User.findOne(req.body.email)
    .then((user)=>{
        if(!user){
            return res.status(400).json({"error": new Error('invalid password or email')})
        }
        bcrypt.compare(req.body.password, user.password)
        .then((valid)=>{
            if(!valid){
                return res.status(400).json({"error": new Error('invalid password or email')})  
            }
            const token = jwt.sign({user_id : user._id}, 'ratusratusopopotamus',{expiresIn: '12h'})
            res.status(200).json({"token": token, "user_id": user._id})
        })
        .catch((error)=>{
            res.status(500).json({"error": error})
        })
    })
    .catch((error)=>{
        res.status(500).json({"error": error})
    })
    
}