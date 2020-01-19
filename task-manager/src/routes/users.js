const express=require("express")
const multer=require("multer")


const Route=express.Router()
const User=require("../models/users")
const auth=require("../middlewares/auth")



Route.post("/users/login",auth,async(req,res)=>{
    // req.header()
    // console.log(req.body)
    try{
        const user=await User.findbyCredentials(req.body.email,req.body.password)
        // const token=await user.generateAuthtoken()
        // console.log(token)
        res.send(user)
    }catch(e){
        res.status(400).send()
    }
})
Route.post("/users",async(req,res)=>{
    
    const user=new User(req.body)
    // user.save().then(()=>{
    //     res.send(user)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
    try{
        const token=await user.generateAuthtoken()
        await user.save()
        res.send({user,token})
    }catch(e){
        res.send(e)
    }
    
})
// Route.post("/users/logout",auth,async(req,res)=>{

//    try{ 
//        req.user.token=req.user.token.filter((token)=>{
//             return token.token!==req.token
//     })
//     req.user.save()
//     res.status(200).send("logout")}catch(e){
//         res.status(400).send("unable to logout")
//     }

// })
Route.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})
Route.get("/users",(req,res)=>{
    User.find({}).then((user)=>{
        res.send(user)
    }).catch((e)=>{
        res.send(e)
    })
})
Route.get("/users/:id",(req,res)=>{
    const _id=req.params.id
    User.findById(_id).then((user)=>{
        res.send(user)
    }).catch((e)=>{
        res.send(e)
    })
})
Route.patch("/users/:id",async (req,res)=>{
    try{
        const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    if(!user){
      return  res.status(404).send()
    }
    res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})
Route.delete("/users/:id",async (req,res)=>{

    try{
        const user=await User.findByIdAndDelete(req.params.id)
    if(!user){
        return res.status(400).send()
    }
    res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

// Route.post("/user/avatar",upload.single("avatar"),(req,res,next)=>{
//     res.send()
// })
const upload = multer({
    dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

Route.post('/user/avatar', upload.single('avatar'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})



module.exports=Route