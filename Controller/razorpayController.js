const asyncHandler = require('express-async-handler');
const Razorpay = require('razorpay');
const crypto = require('crypto')
// const userModel = require('../Model/userModel')
// const planOrderModel = require('../Model/plandOrderModel');
// const moment = require('moment');
const Order = require('../Model/orderModel')
const Unique = require('unique');

const razorpayKeyId = 'rzp_test_Ka4WdGqUQFoJq9'
const razorpayKeySecret = 'PW1JmmcpCLrYQ0VV6Dk38MF3'

console.log(razorpayKeyId,'the id ')
exports.order = asyncHandler(async(req,res) => {
 try {
    const razorpay = new Razorpay({
       key_id: razorpayKeyId,
       key_secret: razorpayKeySecret
    })
    
    if(!req.body){
        return res.status(400).send('Error req body not found')
    }
    const options = req.body
    const order = await razorpay.orders.create(options)
    if(!order){
        return res.status(401).send('Error while creating order')
    }
    res.json(order)
 } catch (error) {
    console.log(err)
    res.status(500).send('An error occured');
 }
})

exports.validate = asyncHandler(async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
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
    
    console.log(req.body, 'the reqbody');
    
    const sha = crypto.createHmac("sha256", razorpayKeySecret);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");

    if (digest !== razorpay_signature) {
        return res.status(400).json({ msg: "Transaction is not legit!" });
    }

    // Generate a unique order ID (example)
    const Unique = `${new Date().getTime()}`;
    
    try {
        let parsedCart;
        if (typeof cart === 'string') {
            parsedCart = JSON.parse(cart);
        } else {
            parsedCart = cart;
        }
        await Order.create({
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
            orderPlacedid:orderplacedID,
            Amount: Amount,
            orderType:"Bank Transfer",
            orderStatus: "Success"
        });
        res.json({ msg: "Transaction is legit!", orderId: razorpay_order_id, paymentId: razorpay_payment_id });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});