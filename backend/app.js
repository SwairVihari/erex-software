const express = require("express");

const app = express();
const errorMiddleware = require("./middleware/error")
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const path = require("path")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// parse application/json
app.use(bodyParser.json());
app.use(express.json());

//Config

if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"})
    }

//Route Imports

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
app.use('/api/v1',product);
app.use('/api/v1', user );

app.use(express.static(path.join(__dirname,"../frontend/build")));
app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
})
//Middleware for Errors
app.use(errorMiddleware)


module.exports = app;