const doWorkPromise=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject("this is err")
        resolve([7,4,1])
        console.log("next")
    },2000)
})

doWorkPromise.then((result)=>{
    console.log("success",result)
}).catch((result)=>{
    console.log("error",result)
})