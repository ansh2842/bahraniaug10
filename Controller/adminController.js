const handler = require("express-async-handler")
const adminModel = require('../Model/adminModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const jwtsecretkey = "bharani_token_key";
const jwtExpiration = "80d"

exports.data = handler(async(req,res)=>{

    try{
        const adminData = await adminModel.create({
            name: "Bharanifoods",
            password: "Bharanifoods21B"
        })
        res.json(adminData)
        console.log(adminData)
    }catch(err){
        console.log(err)
    }
  
}) 

exports.dataLogin = handler(async(req,res)=>{

    const {input, password} = req.body;
    console.log(req.body)

    try{
        const adminDatas = await adminModel.findOne({name:input})
        
        if(!adminDatas){
            return res.status(409).json({error:"user not found"})
        }
        const passwordMatch = await bcrypt.compare(password,adminDatas.password);
        if(!passwordMatch){
            return res.status(409).json({invalid:true ,message:"invalid password"})
        }
        if(passwordMatch){
            const payload ={
                userId : adminDatas._id,
                name : adminDatas.name
            }
            const adminProfile ={
                userId : adminDatas._id,
                name : adminDatas.name
            }
            const token = jwt.sign(payload,jwtsecretkey,{
                expiresIn:jwtExpiration
            })
            res.status(200).json({token:token,adminProfile:adminProfile})
        }else{
           
            res.status(404).json({invalid:true ,message:"invalid details"})
        }

    }catch(err){
        console.log(err)
    }

})

exports.dataGet = handler(async(req,res)=>{

    try{
        const data = await adminModel.find()
        res.json(data)
    }catch(err){
        console.log(err)
    }
})
exports.dataGetEdit = handler(async(req,res)=>{

    const {id} = req.params;

   try{
        const editData = await adminModel.findById(id);
        res.json(editData)
   }catch(err){
    console.log(err)
   }
})

exports.dataEdit = handler(async(req,res)=>{
    const {id} = req.params;
    const{ username,password} = req.body
    console.log(username)

    try{
        const edit = await adminModel.findById(id)
        edit.name = username
        edit.password = password
        let toSave = await edit.save()
        res.json(toSave)
    }catch(err){
        console.log(err)
    }
})
