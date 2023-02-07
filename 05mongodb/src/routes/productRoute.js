const express=require('express');
const productRoute=express.Router();
const mongodb=require('mongodb').MongoClient;
const url=process.env.MongoURL||"mongodb://localhost:27017/";;

function route(menu){
    productRoute.route('/').get((req,res) =>{
        mongodb.connect(url,(err,result)=>{
            if(err) 
                res.status(500).send('Error connecting to Mongodb server');
            else{
                let dbObj = result.db('shopping');
                dbObj.collection("product").find().toArray((err,result) =>{
                    if(err) res.status(203).send('Error accessing products collection');
                    else
                    {
                        res.render('product',{products:result,title:'Products',menu});
                    }
                })
            }
        });

        //res.render('product',{products,title:'Products',menu})
    })

    productRoute.route('/detail').get((req,res) =>{
        res.send('Products detail page');
    })

    return productRoute;
}

module.exports=route;