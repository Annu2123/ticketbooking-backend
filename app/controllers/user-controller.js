const {validationResult}=require("express-validator")
const User=require('../models/usrs-model')
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const usersCntrl={}
usersCntrl.register=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    try{
        const user=User(body)
        const salt=await bcryptjs.genSalt()
    const encryptedpassword=await bcryptjs.hash(user.password,salt)
    user.password=encryptedpassword
    const count= await User.countDocuments()
    // console.log(count)
    if(count ==0){
     user.role='admin'
    }else{
        user.role='customer'
    }
        await user.save()
        res.status(201).json(user)
    }catch(err){
        res.status(500).json({error:"internal server error"})
    }
}
usersCntrl.login=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
   try{
      const user= await User.findOne({email:body.email})
      if(!user){
          return res.status(404).json({error:"invalide email /password"})
      }
      const checkpassword=  await bcryptjs.compare(body.password,user.password)
      if(!checkpassword){
         return res.status(404).json({error:"invalide email/password"})
      }
      const tokenData={
         id:user._id,
         role:user.role
      }
    const token= await jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:"7d"})
    res.json({user:user,token:token})
      
   }catch(err){
      console.log(err)
      res.status(500).json({error:"internal server errror"})
   }
}
module.exports=usersCntrl
