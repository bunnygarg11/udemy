const User=require("./users")

const deleteTaskandCount=( async (id)=>{
    const user=await User.findByIdAndDelete(id)
    console.log(user)
})("5dce72833cd0d762ae45351f")