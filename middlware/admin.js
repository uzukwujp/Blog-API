const User = require('../models/user');

module.exports = (req,res,next) => {
    User.findOne({_id: req.user_id})
    .then((user)=>{
        if(!user){
            return res.status(401).json({"error": new Error('Access denied. User not authenticated')});
        }else if(user.isAdmin){
            next()
        }else{
            return res.status(403).json({"error": new Error('request Forbidden')})
        }
    })
    .catch((error)=>{
        res.status(400).json({"error": error})
    })

}