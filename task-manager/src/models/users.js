const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")

mongoose.connect("mongodb://localhost:27017/task-manager-api",{
    useUnifiedTopology:true,
    useNewUrlParser:true,
useCreateIndex:true})
// const Schema=mongoose.Schema()
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
        },
    
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },

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
userSchema.pre("save",async function(next){
    comsole.log("before saving")
    if(this.isModified("password")){
        this.password= bcrypt.hash(this.password,8)
    }
    next()
})
const user=mongoose.model("user",userSchema)

module.exports=user