const userModel = require('../model/user.model')
const jwt =require('jsonwebtoken')


module.exports.authUser = async (req,res,next)=>{
   
    const token =  req.headers.authorization?.split(' ')[1];



    if(!token){
        return res.status(401).json({message:'unautorized'})
    }

    try{
      
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        const user = await userModel.findById(decoded._id)

        req.user = user;
        console.log(req.user)
        return next()
    }catch (err){
         return res.status(401).json({message:"unauthorized453453454okokok"})
    }
}