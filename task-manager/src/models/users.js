const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

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
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw Error("enter valid email")
            }

    }
},
tokens:[{
    token:{
        type:String,
        required:true
    }
}]
})
userSchema.methods.generateAuthtoken=async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},"thisismongoose")
    user.tokens=user.tokens.concat({token})
    // await user.save()
    return token
}
// userSchema.methods.generateAuthToken = async function () {
//     const user = this
//     const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

//     user.tokens = user.tokens.concat({ token })
//     await user.save()

//     return token
// }
userSchema.statics.findbyCredentials=async(email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        throw Error("login invalid")
    }
    const isverified=await bcrypt.compare(password,user.password)
    if(!isverified){
        throw Error("login invalid")
    }
    return user
}
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// userSchema.pre("save",async function(next){
//     comsole.log("before saving")
//     if(this.isModified("password")){
//         this.password= bcrypt.hash(this.password,8)
//     }
//     next()
// })
const User=mongoose.model("user",userSchema)

module.exports=User