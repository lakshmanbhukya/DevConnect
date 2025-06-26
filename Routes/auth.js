const express=require("express");
const dotenv=require("dotenv").config();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const rotuer=express.Router();

const User= require("../models/User");

rotuer.post("/login", async(req,res)=>{
        const {email,password}=req.body;
        try{
            const user= await User.findOne({email});
            if(!user){
                return res.status(400).json({msg:"Invalid Credentials"});
            }
            const isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({msg:"Invalid Credentials"});
            }
            const payload={
                user:{
                    id:user.id
                }
            }
            jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:360000},(err,token)=>{
                if(err) throw err;
                res.json({token}); // generation of token indicates the Successfull login
            })
        }
        catch(err){
            console.error(err.message);
            res.status(500).send("Server Error");
        }
})
module.exports=rotuer;