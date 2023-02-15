let express=require("express");
let bodyParser=require("body-parser");
let fileUpload=require("express-fileupload");
require("dotenv").config();
let route=express.Router();
let app=express();
let port=process.env.PORT||3010;
route.get('/',(req,res)=>{
    res.render('index');
});
route.post('/uploadImage',(req,res)=>{
    let imageFile=req.files.imgUpload;
    imageFile.mv(`${__dirname}/public/images/${imageFile.name}`,(err,data)=>{
        if(err) throw err;
        res.render("display",{imgTitle:req.body.imgTitle,imgName:imageFile.name})
        res.end();
    })
})
app.set('views',__dirname+'/src/views/');
app.set('view engine', 'ejs');
app.use("/css",express.static(__dirname+'/node_modules/bootstrap/dist/css'))
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use("/",route); 
app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server is running on port ${port}`);
})