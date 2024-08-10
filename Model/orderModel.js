const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
   id: String,
   image: [String],
   name: String,
   mrp: Number,
   quantity: Number,
   price: Number,
   category: String,
   flavour: String
});

const OrderShema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
         lastname:{
            type: String,
            required: true
         },
         email:{
            type: String,
            required: true
         },
         Phone:{
            type: Number,
            required: true
         },
         pincode:{
            type: Number,
            required: true
         },
         state:{
            type: String,
            required: true
         },
         address:{
            type: String,
            required: true
         },
         city:{
            type: String,
            required: true
         },
         appartment:{
            type: String,
            required: true
         },
         companyname:{
            type: String,
         },
         shippingDetails:{
            type: String,
         },
         date:{
            type: Date,
            default: Date.now()
         },
         country:{
            type: String,

         },
         orderId:{
            type: String,
          
         },
         product:[productSchema],
         Amount:{
            type: Number
            },
               orderStatus:{
                  type: String,
               },
         orderType:{
            type: String,
         },
         orderPlacedid:{
            type: String,
            required: true
            
         }

         
})

const Orders = new mongoose.model('Order',OrderShema)
module.exports =Orders