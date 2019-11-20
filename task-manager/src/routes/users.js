const express=require("express")

const Route=express.Router()
const User=require("../models/users")

Route.post("/users/login",async(req,res)=>{
    console.log(req.body)
    try{
        const user=await User.findbyCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthtoken()
        console.log(token)
        res.send({user,token})
    }catch(e){
        res.status(400).send()
    }
})
Route.post("/users",async(req,res)=>{
    
    const user=new User(req.body)
    // user.save().then(()=>{
    //     res.send(user)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
    try{
        await user.save()
        res.send(user)
    }catch(e){
        res.send(e)
    }
    
})
Route.get("/users",(req,res)=>{
    User.find({}).then((user)=>{
        res.send(user)
    }).catch((e)=>{
        res.send(e)
    })
})
Route.get("/users/:id",(req,res)=>{
    const _id=req.params.id
    User.findById(_id).then((user)=>{
        res.send(user)
    }).catch((e)=>{
        res.send(e)
    })
})
Route.patch("/users/:id",async (req,res)=>{
    try{
        const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    if(!user){
      return  res.status(404).send()
    }
    res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})
Route.delete("/users/:id",async (req,res)=>{

    try{
        const user=await User.findByIdAndDelete(req.params.id)
    if(!user){
        return res.status(400).send()
    }
    res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports=Route