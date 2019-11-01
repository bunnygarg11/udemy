const mongoose=require("mongoose")
const validator=require("validator")

mongoose.connect("mongodb://localhost:27017/task-manager-api",{
    useUnifiedTopology:true,
    useNewUrlParser:true,
useCreateIndex:true})

const user=mongoose.model("user",{
    name:{
        type:String,
        required:true,
        trim:true
        }
    ,

    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error("must be positive")
            }

        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw Error("enter valid email")
            }

    }
}
})
const me=new user({
    name:"bunny ",
    age:22,
    email:"MOHITGARG083@GMAIL.COM"
})
me.save().then(()=>{
    console.log(me)
}).catch((err)=>{
    console.log("error",err)
})