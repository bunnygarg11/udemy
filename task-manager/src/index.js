const express=require("express")
const app=express()
const routeuser=require("./routes/users")
const routeTask=require("./routes/task")
const Task=require("./models/Task")
const User=require("./models/users")
const multer=require("multer")
// const upload=multer({
//     dest:"images",
//     limits:{
//         fileSize:1000000
//     },
//     fileFilter(req,file,cb){
//         // cb(new Error("msg"))
//         // cb(undefined,true)
//         // cb(undefined,false)
//     }
// })
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a Word document'))
        }

        cb(undefined, true)
    }
})
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


// app.post("/upload",upload.single("upload"),(req,res,next)=>{
//     res.send()
// })


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
// const main=async ()=>{
    
//     const user= await User.findById("5dd7aa4c61957735b53ae5d2")
//     await user.populate("tasks").execPopulate()
//     console.log(user.tasks)
// }
// main()