const mongoose = require('mongoose');
const  navSliderSchema = new mongoose.Schema({

    text:{
        type:String,
        required:true
    }
})

const navSlider = new mongoose.model('navSlider',navSliderSchema)
module.exports = navSlider;
