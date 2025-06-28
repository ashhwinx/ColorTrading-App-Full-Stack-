const userModel = require("../model/user.model")

module.exports.createUser = async ({fullName,email,password})=>{
    if(!fullName || !email || !password){
        throw new Error('All fields are require')
    }

    const user = userModel.create({
        fullName,
        email,
        password,
        money,
    })

    return user
}