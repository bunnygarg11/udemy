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

module.exports=user