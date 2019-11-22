const express=require("express")
const app=express()
const routeuser=require("./routes/users")
const routeTask=require("./routes/task")
const Task=require("./models/Task")
const User=require("./models/users")


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(routeuser)
app.use(routeTask)




// console.log(typeof(express.json()))







const port=process.env.PORT||7211
app.listen(port,()=>{
    console.log(`server is up on port ${port}`)
})

// const main=async ()=>{

    
//     const task= await Task.findById("5dd7add7f1a2f236cd6c8ed1")
//     await task.populate("owner").execPopulate()
//     console.log(task.owner)
// }
// main()
const main=async ()=>{
    
    const user= await User.findById("5dd7aa4c61957735b53ae5d2")
    await user.populate("tasks").execPopulate()
    console.log(user.tasks)
}
main()