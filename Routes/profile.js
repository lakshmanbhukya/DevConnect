const express=require("express");
const router=express.Router();
const Profile=require("../models/Profile");
router.get("/profiles",async(req,res)=>{
    try{
        const profile= Profile.find();
        res.json(profile);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Error in fetching profiles");
    }
})

router.post("/addProfile", async (req, res) => {
    try {
        const { user, bio, skills, githubusername, social } = req.body;

        const profile = new Profile({
            user,
            bio,
            skills,
            githubusername,
            social
        });

        await profile.save();
        res.status(201).json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error in creating profile");
    }
});
module.exports=router;