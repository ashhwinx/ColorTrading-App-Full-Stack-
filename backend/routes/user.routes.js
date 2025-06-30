const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller')
const userMiddleware = require('../middleware/user.middleware')


router.get("/signin",(req,res)=>{
    res.send("wait frontend ban rha hai")
})


router.post("/register",userController.registerUser)

router.post("/login",userController.LogInUser)

router.get("/profile",userMiddleware.authUser, userController.profile)

router.put('/update',userMiddleware.authUser, userController.update)

module.exports = router

