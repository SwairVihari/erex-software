const ErrorHander = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchAsyncError")
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");


exports.registerUser = catchAsyncError( async(req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password
    });

    sendToken(user,201, res);
})

//lOGIN USER

exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body;

    //checking if user has given passwerd and email both

    if(!email || !password){
        return next(new ErrorHander("Please Enter Email & Passwrod", 400));

    }

    const user = await User.findOne({email});
    
    if(!user){
        return next(new ErrorHander("Invalid email or password",401));
        
        
    }
    
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password",401));
        
        
    }

    sendToken(user,200, res);



})

//logout user

exports.logout = catchAsyncError(async (req,res,next)=>{
    
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly:true
    });
    
    
    res.status(200).json({
        success:true,
        message:"Logged out"
    })
})

