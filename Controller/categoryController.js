const handler = require("express-async-handler")
const categoryModel = require("../Model/CategoryModel")

exports.addCategory = handler(async(req,res)=>{
    const {name} = req.body
    try{
        const category = await categoryModel.create({
            name: name
        })
        res.json(category)
    }catch(err){
        console.log(err)
    }
})
exports.getCategory = handler(async(req,res)=>{
    
    try{
        const category = await categoryModel.find()
        res.json(category)
    }catch(err){
        console.log(err)
    }
})
exports.editCategory = handler(async(req,res)=>{

    const {id} = req.params
    try{
        const category = await categoryModel.findById(id)
        res.json(category)
    }catch(err){
        console.log(err)
    }
})
exports.updateCategory = handler(async(req,res)=>{
    const {name} = req.body
    console.log(name)
    const {id} = req.params
    try{
        const category = await categoryModel.findById(id)
        category.name = name;

        let toSave = await category.save()
        res.json(toSave)
    }catch(err){
        console.log(err)
    }
})

exports.categoryDelete =handler(async(req,res)=>{

    const {id} = req.params
    try{
        const category = await categoryModel.findByIdAndDelete(id)
        res.json(category)
    }catch(err){
        console.log(err)
    }
})

exports.getCategoryDetails = handler(async(req,res)=>{

    try{
        const category = await categoryModel.find()
        res.json(category)
    }catch(err){
        console.log(err)
    }
})