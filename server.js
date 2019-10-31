const {MongoClient,ObjectID}=require("mongodb")

const id=new ObjectID
console.log(id)

const db_path="mongodb://localhost:27017"

// MongoClient.connect(db_path,{useUnifiedTopology:true},(err,client)=>{
//     if(err)throw err

//     const db=client.db("taskmanager")

// })
MongoClient.connect(db_path,{useUnifiedTopology:true},(err,client)=>{
    
    if(err) throw err

    const testdb=client.db("testdb")
    // console.log(testdb)

    const people=testdb.collection("people")
   const update= people.updateOne({
        _id:new ObjectID("5dbaa6f4adc5d729c3aef224")
    },{
        $set:{name:"anubha"}
    // },(err,res)=>{
    //     if(err)throw err
    //     console.log(res)

    })

    update.then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })


    
    // people.insertMany([
    //     {name: 'Abcd', age: 10, city: 'Delhi'},
    //     {name: 'Efgh', age: 12, city: 'Mumbai'},
    //     {name: 'Ijkl', age: 11, city: 'Delhi'},
    //     {name: 'Mnop', age: 9, city: 'Kolkata'},
    //     {name: 'Qrst', age: 10, city: 'Delhi'}
    // ],(err,res)=>{
    //     console.log(res)
    // })
    // people.find({}).toArray((err,res)=>{
    //     if(err)throw err
    //     console.log(res)
    // })
    // people.find({
    //     name:"mohit"
    // }).toArray((err,res)=>{
    //     if(err)throw err
    //     console.log(res)

})

