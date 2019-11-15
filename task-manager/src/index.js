const express=require("express")
const app=express()
const User=require("./models/users")
const Task=require("./models/Task")

app.use(express.json())
// console.log(typeof(express.json()))


app.post("/users",async(req,res)=>{
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
app.get("/users",(req,res)=>{
    User.find({}).then((user)=>{
        res.send(user)
    }).catch((e)=>{
        res.send(e)
    })
})

app.get("/user/:id",(req,res)=>{
    const _id=req.params.id
    User.findById(_id).then((user)=>{
        res.send(user)
    }).catch((e)=>{
        res.send(e)
    })
})

app.post("/tasks",(req,res)=>{
    const task=new Task(req.body)
    task.save().then(()=>{
        res.send(task)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

const port=process.env.PORT||7211
app.listen(port,()=>{
    console.log(`server is up on port ${port}`)
})