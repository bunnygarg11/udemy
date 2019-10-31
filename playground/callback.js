const doWorkCallback=(callback)=>{
    setTimeout(()=>{
        callback(undefined,45)
        callback("this is my error!",45)
    },2000)
}

doWorkCallback((err,res)=>{
    if(err){
        return console.log(err)

    }
    console.log(res)
    
})