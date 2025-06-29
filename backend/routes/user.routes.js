const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller')


router.get("/signin",(req,res)=>{
    res.send("wait frontend ban rha hai")
})


router.post("/register",userController.registerUser)

router.post("/login",userController.LogInUser)

module.exports = router

