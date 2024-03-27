const express=require('express');
const User=require('../models/User');
const router=express.Router();
const {body,validationResult}=require('express-validator');
var bcryptjs=require('bcryptjs');
var jwt=require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser');
const JWT_SECRET='gayatripsk';


router.post('/createuser',[
    body('name','enter valid name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5}),
],async(req,res)=>{
    success=false;
        const errors=validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors:errors.array()});
        }
var user=await User.findOne({email:req.body.email});
if(user)
{
    return res.status(400).json({error:"sorry already exisit"})
}
const salt=await bcryptjs.genSalt(10);
secPass=await bcryptjs.hash(req.body.password,salt);
    user=await User.create({
            name:req.body.name,
            email:req.body.email,
            //password:req.body.password,
            password:secPass
        })
        const data={
            user:{
                id:user.id
            }   
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
       // console.log(authtoken);
       success=true;
       res.json({success,authtoken});

        //  res.json(user)
    
})
//api/auth/logincode

router.post('/login',[
    body('email',"enter valid email").isEmail(),
    body('password',"pass cant blank").exists(),

],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.body;
    try {
        var user=await User.findOne({email});
        if(!user)
        {
            return res.status(404).json({error:'sorry user does not exisit'});
        }
        const passwordCompare=await bcryptjs.compare(password,user.password);
        if(!passwordCompare)
        {
            success=false;
            return res.status(404).json({success,error:'sorry user does not exisit'});

        }
        const data={
            user:{
                id:user.id
            }   
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authtoken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('internal server some error occured');

        
    }
    

});

//api/auth/getuser
router.post('/getuser',fetchuser,async(req,res)=>{

try {
     userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    res.send(user)
} catch (error) {
        console.log(error.message);
    res.status(500).send('internal server some error occured');

    
}
})
module.exports=router