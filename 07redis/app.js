let express=require("express");
let redis=require("redis");
let axios=require("axios");
require('dotenv').config();
let app=express();
let router=express.Router();
let port=process.env.PORT||3000;
let client=redis.createClient({
    port: 6379,
    host: '127.0.0.1'
});
app.use(express.static(__dirname+"/public"));
app.use('/',router);
router.get('/',(req,res)=>{
    res.end();
})
router.get('/check', (req,res)=>{
    let userInput=req.query.topic;
    userInput=userInput?userInput:'India';
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;
    client.get(userInput,(err,data)=>{
        if(err) throw err;
        if(data){
            res.write(JSON.stringify({'from':'redis','other':JSON.parse(data)}));
            res.end();
        }else{
            axios.get(url).then((response)=>{
                client.set(userInput,JSON.stringify(response.data));
                res.write(JSON.stringify({'from':'axios','other':response.data}));
                res.end();
            })
        }
    })
});
app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`server is running on port ${port}`);
})