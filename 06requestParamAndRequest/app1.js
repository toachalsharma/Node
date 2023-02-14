let express=require("express");
let path=require("path");
require('dotenv').config();
require("mongodb");
let app=express();
let port=process.env.PORT|| 3000
let menu=[
    {link:"/",name:"Home"},
    {link:"/product",name:"Product"},
    {link:"/category",name:"Category"}]
    
let catRoute=require("./src/routes/categoryRoute")(menu);
let productRoute=require("./src/routes/productRoute")(menu);
app.set("view engine","ejs");
app.set('views',__dirname+'/src/views')
app.use(express.static(__dirname+'/public'))
app.route('/').get((req,res)=>{
    res.render('index',{menu,title:"Product"});
})
app.listen(port, function(){
    console.log(`Server is running on the port : ${port}`);
})
app.use('/category',catRoute);
app.use('/product',productRoute);