const mongoose = require('mongoose');

const connectDB = async () =>{
    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
        console.log('Connected to DB');
    })
} 


module.exports = connectDB