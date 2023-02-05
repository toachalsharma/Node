const express=require('express');
const productRoute=express.Router();
productRoute.route('/').get((req,res)=>{
    res.send('hey this is product default route');
})
productRoute.route('/details').get((req,res)=>{
    res.send('this is the product details default route');
})
module.exports=productRoute;