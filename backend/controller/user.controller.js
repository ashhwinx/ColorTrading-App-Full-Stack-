const userModel = require('../model/user.model')
const userService = require("../services/user.services")


module.exports.registerUser = async (req,res,next)=>{
    try{
        console.log(req.body)
        const {fullName,email,password,money} = req.body

    isUserAlready = await userModel.findOne({email})

    if (isUserAlready){
        return res.status(400).json({message: 'user already exist'})
    }

    const hasedPassword  = await userModel.hashPassword(password)

    const user = await userService.createUser({
        fullName,
        email,
        password:hasedPassword,
        money
    })

    const token = user.generateAuthToken();

    return res.status(201).json({token,user})
    } catch (error){
        return res.status(500).json({message: 'Server error', error: error.message})
    }
}


module.exports.LogInUser = async (req,res,next)=>{
   
        const {email,password} = req.body

        user = await userModel.findOne({email}).select("+password")


        if(!user){
            return res.status(400).json({message:"credentials are worng"})
        }

        const isMatch = await user.comparePassword(password)
        console.log(isMatch)

        if(!isMatch){
            return res.status(401).json({message:"isMtach are worng"})
        }


         token = user.generateAuthToken()

         res.cookie('token',token)



         res.status(201).json({token,user})


   
}
