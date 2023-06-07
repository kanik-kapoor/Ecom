const mongoose = require("mongoose")



// const connectionString ="mongodb+srv://rahul:rahul@cluster0.ytwybs1.mongodb.net/blog?retryWrites=true&w=majority"
 const connectionString ="mongodb://rahul:rahul@ac-metwcnz-shard-00-00.ytwybs1.mongodb.net:27017,ac-metwcnz-shard-00-01.ytwybs1.mongodb.net:27017,ac-metwcnz-shard-00-02.ytwybs1.mongodb.net:27017/blog?ssl=true&replicaSet=atlas-3qzgej-shard-0&authSource=admin&retryWrites=true&w=majority"

const coneectDB = () =>{

    mongoose.connect(connectionString, {})
    .then(()=>{
        console.log(`database connected`)
    })
    .catch((error)=>{
          console.log(error.message)
    })

}


module.exports = coneectDB