const mongoose = require("mongoose");

 var mongoURL = "mongodb+srv://Ajay_V:ROOT@cluster0.fbdhi.mongodb.net/mern-rooms?retryWrites=true&w=majority"

 mongoose.connect(mongoURL,{useUnifiedTopology:true , useNewUrlParser:true})

 var connection = mongoose.connection 

 
connection.on('error' , ()=>{
    console.log(`Mongo DB Connection Failed`);
})

connection.on('connected' , ()=>{
    console.log(`Mongo DB Connection Successfull`);
})

module.exports = mongoose 