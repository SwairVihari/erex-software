const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    serial:{
        type:String,
        required:[true,"Please Enter voltage of the batteries"],
        unique:true
    },

    volt:{
        type:Number,
        required:[true,"Please Enter voltage of the batteries"]
    },

    amphour:{
        type:Number,
        required:[true, "Please Enter AH of the Battery"]
    },

    manifactureDate:{
        type:Date,
        return:[true,"Please Enter ManifactureDate"],
        default: Date.now()
    },

    ReplacementWarrantyExpireMonth:{
        type:Date,
        return:[true,"Please Enter replacement warranty expire month of the battery"],
        default: Date.now()

    },

    ServiceWarrantyExpireMonth:{
        type:Date,
        return:[true,"Please Enter Service warranty expire month of the battery"],
        default: Date.now()
    }


    
});


module.exports = mongoose.model("Product", productSchema)