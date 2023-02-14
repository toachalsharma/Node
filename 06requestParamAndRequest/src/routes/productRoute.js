let express=require('express');
let mongodb=require('mongodb');
let mongoClient=mongodb.MongoClient;
let url=process.env.URL||"mongodb://127.0.0.1:27017/";
let app=express();
let productRouter=express.Router();
function productRoute(menu){
    productRouter.route('/').get((req,res)=>{
        mongoClient.connect(url,(err,dbCon)=>{
            if(err) throw err;
            let db=dbCon.db('shopping');
            db.collection('product').find().toArray((err,data)=>{
                if(err) throw err;
                res.render('product',{menu,products:data,title:"Product"});
            })
        })
    });
    productRouter.route('/:category').get((req,res)=>{
        let category = req.params.category;
        mongoClient.connect(url,(err,dCon)=>{
            if(err) throw err;
            let db=dCon.db('shopping');
            db.collection('product').find({category:category}).toArray((err,data)=>{
                if(err) throw err;
                res.render('product',{menu,products:data,title:"Product"});
            });
        })
    });
    return productRouter;
}
module.exports=productRoute;