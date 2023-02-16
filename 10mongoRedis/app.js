let express=require("express")
let redis=require("redis");
let dotenv=require("dotenv").config();
let mongoClient=require("mongodb").MongoClient;
let router=express.Router();
let client=redis.createClient({
    port: 6379,
    host: '127.0.0.1'
});
let port=process.env.PORT||3010;
let url=process.env.URL||"mongodb://127.0.0.1:27017/"
let app=express()
app.listen(port,(err)=>{
    if(err)throw err;
    console.log("Server is running on port "+port);
})
app.use('/',router);
router.get('/',(req,res)=>{
    let category=req.query.category;
    client.get(category,(err,data)=>{
        if(err)throw err;
        if(data){
            res.send(data);
        }else{
            mongoClient.connect(url,(err,dCon)=>{
                if(err)throw err;
                let db=dCon.db('shopping');
                db.collection('product').find({category:"electronics"}).toArray((err,data)=>{
                    if(err)throw err;
                    client.set(category,JSON.stringify(data),(err,status)=>{
                        res.send(JSON.stringify(data));
                    });
                });
            });
        }
    });
})