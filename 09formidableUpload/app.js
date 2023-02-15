let express=require("express")
let formidable= require("formidable");
let fs=require('fs')
require("dotenv").config();
let app=express()
let router=express.Router();
let port=process.env.PORT||3010;
app.use('/',router);
app.use('/css',express.static(__dirname+'/node_modules/bootstrap/dist/css'));
app.use(express.static(__dirname+'/public/'));
app.set('view engine', 'ejs');
app.set('views',__dirname+'/src/views')
router.get('/',function(req,res){
    res.render('index');
})
router.post('/imageUpload',(req,res)=>{
    let formidableForm=new formidable.IncomingForm()
    formidableForm.parse(req,function(err,fields,files){//imageFile imageTitle
        if(err) throw err;
        let imageTitle = fields.imageTitle;
        let imageFileObj = files.imageFile;
        let newImageFilePath = __dirname + '/public/images/'+imageFileObj.originalFilename;
        fs.copyFile(imageFileObj.filepath,newImageFilePath,(err)=>{
            if(err) throw err;
            fs.unlink(imageFileObj.filepath,function(err){
                if(err) throw err;
            });    
            res.render("display",{imageTitle:imageTitle,imageName:imageFileObj.originalFilename})
            res.end();
        });
    });
})
app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server is running on port ${port}`);
})