const handler= require("express-async-handler")
const ProductModel = require("../Model/ProductModel")

exports.addProduct=handler(async(req,res)=>{

    const {text,mrp,price,name,category,flavour,status,prtype}=req.body
    const imagePath = req.files.map((file) => file.filename);

    try{
        const product = await ProductModel.create({
            image: imagePath,
            text: text,
            mrp:mrp,
            price: price,
            name: name,
            category: category,
            flavour: flavour,
            status: status,
            prtype: prtype

        })

        res.json(product)
    }catch(err){
        console.log(err)
    }
})

exports.getproduct = handler(async(req,res)=>{

    try{
        const product = await ProductModel.find()
        res.json(product)
    }catch(err){
        console.log(err)
    }
})
exports.deleteproduct = handler(async(req,res)=>{

    const {id} = req.params
    try{
        const product = await ProductModel.findByIdAndDelete(id)
        res.json(product)
    }catch(err){
        console.log(err)
    }
})

exports.geteditproduct = handler(async(req,res)=>{

    const {id} = req.params
  
    try{
        const product = await ProductModel.findById(id)
        res.json(product)
    }catch(err){
        console.log(err)
    }
})

exports.editproduct = handler(async(req,res)=>{

    const {text,name,mrp,price,category,flavour} = req.body
    console.log(req.body)
    const {id} = req.params

    try{
        const product = await ProductModel.findById(id)
        if (req.files && req.files.length > 0) {
            const imagePath = req.files.map((file) => file.filename);
            product.image = imagePath;
          }

          product.text = text;
          product.name = name;
          product.mrp = mrp;
          product.price = price;
          product.category = category;
          product.flavour = flavour;

          let tosave = await product.save()
          res.json(tosave);
    }catch(err){
        console.log(err);
    }
})

exports.editstatus = handler(async(req,res)=>{

    const {id}= req.params
    const {status} = req.body

    
        try{
            const product = await ProductModel.findById(id)
            
    
              product.status = status;
             
    
              let tosave = await product.save()
              res.json(tosave);
    }catch(err){
        console.log(err);
    }
})
exports.editstatuss = handler(async(req,res)=>{

    const {id}= req.params
    const {prtype} = req.body

    
        try{
            const product = await ProductModel.findById(id)
            
    
              product.prtype = prtype;
             
    
              let tosave = await product.save()
              res.json(tosave);
    }catch(err){
        console.log(err);
    }
})

exports.getProductDetails = handler(async(req,res)=>{

    const id = req.query.products;
    const stock = req.query.stocks;
 
    

    try{
        const query = {};
        const data = stock
        if (id) {
          query.category = id;
        }else if(stock){
            query.$or = [
                { status: data },
                
            ]

        }
    
        const product = await ProductModel.find(query)
        res.json(product)
    }catch(err){
        console.log(err);
    }
})

