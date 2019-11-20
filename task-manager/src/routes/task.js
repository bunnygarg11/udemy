const express=require("express")
const Route=express.Router()
const Task=require("../models/Task")

Route.get("/tasks",(req,res)=>{
    Task.find({}).then((task)=>{
        res.send(task)
    }).catch((e)=>{
        res.send(e)
    })
})
Route.get("/tasks/:id",(req,res)=>{
    const _id=req.params.id
    Task.findById(_id).then((task)=>{
        res.send(task)
    }).catch((e)=>{
        res.send(e)
    })
})

Route.patch("/tasks/:id",async (req,res)=>{
    const allowedUpdates=["description","completed"]
    const updates=Object.keys(req.body)
   const isvalidoperation= updates.every((update)=>{
        return allowedUpdates.includes(updates)
    })

    if(!isvalidoperation){
        return res.status(400).send({error:"invalid operation"})
    }
    try{
        const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!task){
            return res.status(400).send()
        }
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }

})

Route.delete("/tasks/:id",async (req,res)=>{
    try{
        const task=await Task.findByIdAndDelete(req.params.id)
    if(!task){
        return res.status(400).send()
    }
    res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})
Route.post("/tasks",(req,res)=>{
    const task=new Task(req.body)
    task.save().then(()=>{
        res.send(task)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

module.exports=Route

