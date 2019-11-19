const express=require("express")
const app=express()



app.use(express.json())
// console.log(typeof(express.json()))







const port=process.env.PORT||7211
app.listen(port,()=>{
    console.log(`server is up on port ${port}`)
})
