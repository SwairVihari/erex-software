const Product = require("../models/productModel")
const ErrorHander = require("../utils/errorhander");
const catchAsyncError = require("../middleware/catchAsyncError")




//Create Product -- ADMIN ROUTE

exports.createItem = catchAsyncError(async(req,res,next)=>{
    console.log(req.body);
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
})

exports.getItem = catchAsyncError(async(req,res,next)=>{

    const product = await Product.findOne({serial:req.params.id});
    if(!product){
        return next(new ErrorHander("Product Not found",404))
    }


    res.status(200).json({
        message: "Route is working fine",
        product
    })
})

exports.updateItem = catchAsyncError(async(req,res,next)=>{

    let product = await Product.findOne({serial:req.params.id});

    if(!product){
        return next(new ErrorHander("Product Not found",404))
    }

    product = await Product.findOneAndUpdate({serial:req.params.id}, req.body, {new:true, runValidators:true ,useFindAndModify:false} );
    
    res.status(200).json({
        success:true,
        product
    })

})