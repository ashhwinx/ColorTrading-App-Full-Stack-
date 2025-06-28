const userModel = require('../model/user.model')
const userService = require("../services/user.services")


module.exports.registerUser = async (req,res,next)=>{
    try{
        
        const {fullName,email,password} = req.body

    isUserAlready = await userModel.findOne({email})

    if (isUserAlready){
        return res.status(400).json({message: 'user already exist'})
    }

    const hasedPassword  = await userModel.hashPassword(password)

    const user = await userService.createUser({
        fullName,
        email,
        password:hasedPassword,
        money:1000
    })

    const token = user.generateAuthToken();

    return res.status(201).json({token,user})
    } catch (error){
        return res.status(500).json({message: 'Server error', error: error.message})
    }
}


module.exports.LogInUser = async (req,res,next)=>{
    try{
        const {email,password} = req.body

        user = await userModel.findOne({email}).select("+password")

        if(!user){
            return res.send(400).json({message:"credentials are worng"})
        }

        const isMatch = await user.comparePassword(password)

        if(!isMatch){
            return res.send(400).json({message:"credentials are worng"})
        }


         token = user.generateAuthToken()

         res.cookie('token',token)



         res.status(201).json({token,user})


    } catch(error){
        return res.status(500).json({message: 'Server error', error: error.message})
    }
}
