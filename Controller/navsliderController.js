const handler = require('express-async-handler')
const navSliderModel = require('../Model/navsliderModel')

exports.addSlider = handler(async(req,res)=>{
    const{text} = req.body

    try{
        const slider = await navSliderModel.create({
            text: text
        })
        res.json(slider)
    }catch(err){
        console.log(err)
    }
})

exports.getSlider=handler(async(req,res)=>{

    try{
        const slider = await navSliderModel.find()
        res.json(slider)
    }catch(err){
        console.log(err)
    }
})
exports.getSlideredit=handler(async(req,res)=>{
    const {id}= req.params

    try{
        const slider = await navSliderModel.findById(id)
        res.json(slider)
    }catch(err){
        console.log(err)
    }
})
exports.editSlider=handler(async(req,res)=>{
    const {id}= req.params
    const {text} = req.body
    try{
        const slider = await navSliderModel.findById(id)
        slider.text = text

        let toSave = await slider.save()
        res.json(toSave)
    }catch(err){
        console.log(err)
    }
})
exports.navSliderDelete=handler(async(req,res)=>{
    const {id}= req.params
    try{
        const slider = await navSliderModel.findByIdAndDelete(id)
        res.json(slider)
    }catch(err){
        console.log(err)
    }
})
//users

exports.getSliderfront = handler(async(req,res)=>{

    try{
        const slider = await navSliderModel.find()
        res.json(slider)
    }catch(err){
        console.log(err)
    }
})