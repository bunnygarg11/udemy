const {MongoClient,ObjectID}=require("mongodb")

const id=new ObjectID
console.log(id)

const db_path="mongodb://localhost:27017"

MongoClient.connect(db_path,{useNewUrlParser:true},(err,client)=>{
    if(err)throw err

    const db=client.db("taskmanager")

})
