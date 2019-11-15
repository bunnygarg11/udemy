// const doWorkPromise=new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         reject("this is err")
//         resolve([7,4,1])
//         console.log("next")
//     },2000)
// })

// doWorkPromise.then((result)=>{
//     console.log("success",result)
// }).catch((result)=>{
//     console.log("error",result)
// })
const add=(a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(a+b)
        },2000)
    })
}

add(1,2).then((sum)=>{
    console.log(sum)
})