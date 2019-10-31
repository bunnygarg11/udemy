const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/task-manager-api",{
    useNewUrlParser:true,
useCreateIndex:true})

const user=mongoose.model("user",{
    name:{
        type:String
    },

    age:{
        type:Number
    }
})
const me=new user({
    name:"bunny",
    age:22
})
me.save().then(()=>{
    console.log(me)
}).catch((err)=>{
    console.log("error",err)
})