const express=require("express")
const app=express()
const routeuser=require("./routes/users")
const routeTask=require("./routes/task")

app.use(express.json())

app.use(routeuser)
app.use(routeTask)




// console.log(typeof(express.json()))







const port=process.env.PORT||7211
app.listen(port,()=>{
    console.log(`server is up on port ${port}`)
})
