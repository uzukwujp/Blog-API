const jwt = require('jsonwebtoken')

module.exports =  (req,res,next) => {
    const token = req.headers.authorisation.split(' ')[1] || req.headers('x-auth-token');
    if(!token) return res.status(401).json({"error": new Error('Access denied. no token found')});
    try{
        const decodedToken =  jwt.verify(token, 'ratusratusopopotamus')
        req.user_id = decodedToken.user_id;
        next()

    }catch(error){
        res.status(400).json({"error": error})

    }

}