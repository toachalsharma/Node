let express=require('express');
let mongodb=require('mongodb');
let mongoClient=mongodb.MongoClient;
let url=process.env.URL||"mongodb://127.0.0.1:27017/";
let app=express();
let categoryRouter=express.Router();
function categoryRoute(menu){
    categoryRouter.route('/').get((req,res)=>{
        mongoClient.connect(url,(err,dbCon)=>{
            if(err) throw err;
            let db=dbCon.db('shopping');
            db.collection('category').find().toArray((err,data)=>{
                if(err) throw err;
                res.render('category',{menu,data,title:"Category"});
            })
        })
    });
    return categoryRouter;
}
module.exports=categoryRoute;