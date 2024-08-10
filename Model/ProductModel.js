const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({

    image:[{
        type:String,
        required:true,
    },
    ],
    name:{
        type:String,
        required:true,
    },
    text:{
        type:String,
        required:true,
    },
    mrp:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    flavour:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    prtype:{
        type:String,
    }
    
})

const product = new mongoose.model("Product",productSchema)
module.exports = product