const mongoose = require('mongoose')
const carouselSchema = new mongoose.Schema({

    image:{
        type:String,
        required:true,
    },
    text:{
        type:String,
        required:true,
    }
})
const carousel = new mongoose.model('Carousel',carouselSchema)
module.exports =carousel;