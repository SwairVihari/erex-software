const mongoose = require("mongoose");

const options = {
    autoIndex: true, //this is the code I added that solved it all
    keepAlive: true,
   
    
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6

  }

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI,options,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then((data)=>{
        console.log(`Mongodb is connected with server : ${data.connection.host}`);
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports = connectDatabase