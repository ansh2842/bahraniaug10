const mongoose = require('mongoose')
const aboutSchema = new mongoose.Schema({

    image:[{
        type:String,
        required:true
    }],
    text:{
        type:String,
        required:true
    }
})
const about = new mongoose.model('about', aboutSchema)
module.exports =about;