const handler = require("express-async-handler")
const carouselModel =  require("../Model/CarouselModel")

exports.addCrousel = handler(async(req,res)=>{
    const {text}= req.body
    const imagePath = req.file.filename;
    console.log(req.body)

    try{
        const add = await carouselModel.create({
            image: imagePath,
            text: text
        })
        res.json(add)
    }catch(err){
        console.log(err)
    }
})

exports.getCrousel = handler(async(req,res)=>{

    try{
        const datas = await carouselModel.find()
        res.json(datas)
    }catch(err){
        console.log(err)
    }
})

exports.editCrousel = handler(async(req,res)=>{

    const {id} = req.params

    try{
        const data = await carouselModel.findById(id)
        res.json(data)
    }catch(err){
        console.log(err)
    }
})

exports.editCrouselend = handler(async(req,res)=>{

    const {text} = req.body
    const {id} = req.params
    console.log(text,"1111", id,"2222")
    try{
        const edit = await carouselModel.findById(id)

        if(req.file){
            const imagePath = req.file.filename
            edit.image = imagePath
        }

        edit.text = text
        let toUpdate = await edit.save()
        res.json(toUpdate)
    }catch(err){
        console.log(err)
    }

})

exports.deleteCrousel = handler(async(req,res)=>{

    const {id} = req.params
    try{
        const deletes = await carouselModel.findByIdAndDelete(id)
        res.json(deletes)
    }catch(err){
        console.log(err)
    }
})