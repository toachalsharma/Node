const express=require('express')
const productRoute= express.Router();
const fs=require('fs')
const path=require('path')
function route(menu){
    productRoute.route('/').get((req,res) => {
        fs.readFile(path.join(__dirname,'../../public/json/products.json'), 'utf8',(err,data) => {
            if(err) throw err;
            let products = JSON.parse(data);
            res.render('product',{title:'Product',menu,products})
        });
    })
    productRoute.route('/details').get((req,res) => {
        res.send('Product Details');
    })
    return productRoute;
}
module.exports=route;