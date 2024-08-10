const handler = require("express-async-handler")
const aboutModel = require("../Model/aboutModel")

exports.addAbout = handler(async(req,res)=>{

    const {text} = req.body
    const imagePath = req.files.map((file)=>file.filename)

    try{
        const about = await aboutModel.create({
            image: imagePath,
            text: text
        })
        res.json(about)
    }catch(err){
        console.log(err)
    }
})
exports.getabout = handler(async(req,res)=>{

    try{
        const about = await aboutModel.find()
        res.json(about)
    }catch(err){
        console.log(err)
    }
})
exports.geteditabout = handler(async(req,res)=>{
    const {id} = req.params
    try{
        const about = await aboutModel.findById(id)
        res.json(about)
    }catch(err){
        console.log(err)
    }
})
exports.editabout = handler(async(req,res)=>{
    const {id} = req.params
    const {text} = req.body
    try{
        const about = await aboutModel.findById(id)
       
            if (req.files && req.files.length > 0) {
                const imagePath = req.files.map((file) => file.filename);
                about.image = imagePath;
              }
              about.text = text;
              let toSave = await about.save();
              
        
        res.json(toSave)
    }catch(err){
        console.log(err)
    }
})

exports.aboutDelete = handler(async(req,res)=>{

    const {id} = req.params
    try{
        const about  = await aboutModel.findByIdAndDelete(id)
        res.json(about)
    }catch(err){
        console.log(err)
    }
})

