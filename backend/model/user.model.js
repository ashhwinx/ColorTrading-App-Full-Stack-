const mongoose  = require("mongoose")
const bcrypt = require('bcrypt')
const jwt  = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        requrie: true,
         minlength: [2, "Fullname name must be at least 2 characters long"]
    },
    email:{
      type:String,
      require:true,
      unique:true,
      minlength:[5,'Email must be at least 5 characters long']
    },
    password:{
      type:String,
      require:true,
      minlength:[6,'password must be at least 6 characters long'],
      select:false,
    },
    money:{
        type:Number,
        require:true
    }
})


userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET, {expiresIn:'24'})
    return token
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)

}


userSchema.statics.hashPassword= async function(password){
    return await bcrypt.hash(password,10)
    
}



const userModel = mongoose.model("user",userSchema)

module.exports = userModel