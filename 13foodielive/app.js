let express=require("express")
let cors=require("cors")
let mongo=require("mongodb")
let bodyParser=require("body-parser")
let mongoClient=mongo.MongoClient;
require("dotenv").config()
let url= process.env.URL || "mongodb://127.0.0.1:27017/"
let port= process.env.PORT || 3000
let app=express();
app.use(cors());
let db;
let router=express.Router();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/',router);
router.get('/',(req,res)=>{
    res.status(200).send("OK");
})

router.get('/restaurants',(req,res)=>{
    let token=req.header("x-basic-token");
    if(vaildToken(token)){
        let queryObj={};
        let state=req.query.state;
        let mealtypes=req.query.mealtypes;
        if(state && mealtypes){
            queryObj={"state_id":Number(state),"mealTypes.mealtype_id":Number(mealtypes)}
        }
        else if(state){
            queryObj={state_id:Number(state)}
        }else if(mealtypes){
            queryObj={"mealTypes.mealtype_id":Number(mealtypes)}
        }
        db.collection("restaurants").find(queryObj).toArray((err,result)=>{
            if(err) throw err;
            res.status(200).send(result);
        });
    }else{
        res.status(403).send("Unauthorized");
    }
})

router.get('/restaurants/:mealtypes',(req,res)=>{
    let mealtypes=Number(req.params.mealtypes);
    let cuisines=Number(req.query.cuisines);
    let hcost=Number(req.query.hcost);
    let lcost=Number(req.query.lcost);
    let skip=0;
    let limit=10000;
    let sort={cost:1};
    let queryObj={};
    if(req.query.sort){
        sort={cost:req.query.sort};
    }
    if(req.query.skip && req.query.limit){
        skip=Number(req.query.skip);
        limit=Number(req.query.limit);
    }

    if(cuisines && hcost && lcost){
        queryObj={
            "mealTypes.mealtype_id":mealtypes,"cuisines.cuisine_id":cuisines,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }else if(cuisines)
    {
        queryObj={"mealTypes.mealtype_id":mealtypes,"cuisines.cuisine_id":cuisines}
    }else if( lcost && hcost){
        queryObj={
            "mealTypes.mealtype_id":mealtypes,
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }

    db.collection('restaurants').find(queryObj).sort(sort).skip(skip).limit(limit).toArray((err,result)=>{
        if(err) throw err;
        res.status(200).send(result);
    })
})

//based on object id
router.get('/restaurants/details/:id',(req,res)=>{
    //searching based on object id
    let id=mongo.ObjectId(req.params.id);
    db.collection("restaurants").find({_id:id}).toArray(function(err,data){
        res.status(200).send(data);
    })
})

//menu of restaurant
router.get('/restaurants/menu/:id',(req,res)=>{
    let id= Number(req.params.id);
    db.collection('menu').find({"restaurant_id":id}).toArray((err,data)=>{
        res.status(200).send(data);
    })
})

router.post('/placeOrder',(req,res)=>{
    let data=req.body;
    console.log(req.body);
    db.collection("orders").insert(data,(err)=>{
        if(err) throw err;
        res.status(200).send("Order Placed");
    })
})

router.get('/orders',(req,res)=>{
    let queryObj={}
    let email=req.query.email;
    if(email){
        queryObj={email:email};
    }
    db.collection('orders').find(queryObj).toArray((err, data)=>{
        res.status(200).send(data);
    })
})

function vaildToken(token){
    if(token==process.env.TOKEN){
        return true;
    }else{
        return false;
    }
}

router.get('/locations',(req,res)=>{
    let token=req.header("x-basic-token");
    if(vaildToken(token)){
        db.collection("locations").find({}).toArray((err,result)=>{
            if(err) throw err;
            res.status(200).send(result);
        });
    }else{
        res.status(403).send("Unauthorized");
    }
})

router.get('/mealtypes',(req,res)=>{
    let token=req.header("x-basic-token");
    if(vaildToken(token)){
        db.collection("mealtypes").find({}).toArray((err,result)=>{
            if(err) throw err;
            res.status(200).send(result);
        });
    }else{
        res.status(403).send("Unauthorized");
    }
})

//menu wrt to id{[1.2.3]}
app.post('/menuItems',(req,res) => {
    let menuItems=req.body.id;
    if(Array.isArray(menuItems)){
        db.collection('menu').find({menu_id:{$in:menuItems}}).toArray((err,data)=>{
            if(err) throw err;
            res.status(200).send(data);
        })
    }else{
        res.send('Pass array');
    }
})

app.post('/removeOrder',(req,res)=>{
    let id=mongo.ObjectId(req.body._id);
    db.collection('orders').find({_id:id}).toArray((err,data)=>{
        if(err) throw err;
        if(data.length!=0){
            db.collection('orders').deleteOne({_id:id},(err,result)=>{
                if(err) throw err;
                res.status(200).send('Order deleted');
            })
        }else{
            res.status(200).send('No order found');
        }
    })
})

//update order
app.put('/updateOrder',(req,res)=>{
    let orderId=req.body._id;
    let status=req.body.status;
    db.collection('orders').updateOne(
        {_id:mongo.ObjectId(orderId)},
        {$set: {"status":req.body.status}},
        (err,data)=>{
            if(err) throw err;
            res.send("Order status updated successfully");
        })
})

mongoClient.connect(url,{useNewUrlParser:true},(err,dbCon)=>{
    if(err) throw err;
    db=dbCon.db("foodiedb");
    app.listen(port,(err)=>{
        if(err) throw err;
        console.log("Server is running on port 3000");
    })
})