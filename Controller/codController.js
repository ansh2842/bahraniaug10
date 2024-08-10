const asynchandler = require('express-async-handler')
const Order = require('../Model/orderModel');

exports.orders= asynchandler(async(req,res)=>{

    const {
        firstname,
        lastname,
        email,
        Phone,
        pincode,
        state,
        address,
        city,
        appartment,
        companyname,
        shippingDetails,
        cart,
        Amount,
        orderplacedID
    } = req.body;

    const Unique = `${new Date().getTime()}`;

    try{
        let parsedCart;
        if (typeof cart === 'string') {
            parsedCart = JSON.parse(cart);
        } else {
            parsedCart = cart;
        }

        const orders = await Order.create({
            firstname: firstname,
                lastname: lastname,
                email: email,
                Phone: Phone,
                pincode: pincode,
                state: state,
                address: address,
                city: city,
                appartment: appartment,
                companyname: companyname,
                shippingDetails: shippingDetails,
                country: "India",
                orderId: Unique,
                product: parsedCart,
                Amount: Amount,
                orderPlacedid:orderplacedID,
                orderType:"Cash on delivery",
                orderStatus: "Success"
        })
        res.json(orders)
    }catch (err){
        console.log(err)
    }
   
})

exports.getorders = asynchandler(async(req,res)=>{

    try{
        const getorder = await Order.find()
        res.json(getorder)
    }catch (err){
        console.log(err)
    }
})
exports.getordersbyIds = asynchandler(async(req,res)=>{
    const {id}= req.params
  
    console.log(id)
    

    try{
            const orderIds = await Order.findOne({orderPlacedid:id})
            console.log(orderIds)
            res.json(orderIds)
    }catch (err){
        console.log(err)
    }
})
exports.getordersbyIdss = asynchandler(async(req,res)=>{
    const {id}= req.params
  
   console.log(id)
    

    try{
            const orderIdsss = await Order.findById(id)
            console.log(orderIdsss)
           
            res.json(orderIdsss)
    }catch (err){
        console.log(err)
    }
})
exports.track = asynchandler(async (req, res) => {
    const { orderId, num } = req.body;
    console.log('Input phone number (num):', num, typeof num);

    try {
        const tracking = await Order.findOne({ orderId: orderId });
       
     
        if (!tracking) {
            console.log(`No document found for orderId ${orderId}`);
            return res.status(404).json({ message: 'No document found' });
        }

        console.log('Tracking phone number from DB:', tracking.Phone, typeof tracking.Phone);

        // Convert both to strings (if they are not already) to ensure correct comparison
        const phoneFromDB = String(tracking.Phone);
        const phoneInput = String(num);


        if (phoneFromDB === phoneInput) {
            const id= {
                id: tracking._id
            }
           
            return res.status(200).json({ message: 'Successfully tracked order',id:id });
        } else {
            console.log('Order ID and phone number do not match');
            return res.status(400).json({ message: 'Order ID and phone number do not match' });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
