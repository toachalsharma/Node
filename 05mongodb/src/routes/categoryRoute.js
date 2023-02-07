let express=require('express')
let mongodb=require('mongodb').MongoClient;
const categoryRouter=express.Router();
const url=process.env.MongoURL||"mongodb://127.0.0.1:27017";

function route(menu){
    categoryRouter.route('/').get((req,res)=>{
        mongodb.connect(url,(err,dc)=>{
            if(err) res.status(500).send('Error connecting to MongoDB: ' + err)
            else{
                let dbObj=dc.db('shopping');
                dbObj.collection('category').find().toArray((err,categories)=>{
                    res.render('category',{title:'Category',data:categories,menu})
                })
            }
        });
    })
    categoryRouter.route('/details').get((req,res)=>{
        res.send("This is the page for category details");
    })
    return categoryRouter;
}

module.exports=route;