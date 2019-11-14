const express=require("express")
const app=express()
const User=require("./models/users")

app.use(express.json())
// console.log(typeof(express.json()))


app.post("/users",(req,res)=>{
    const user=new User(req.body)
    user.save().then(()=>{
        res.send(user)
    }).catch((e)=>{
        res.send(e)
    })
    
})

const port=process.env.PORT||7211
app.listen(port,()=>{
    console.log(`server is up on port ${port}`)
})