const express=require("express");
const app=express();
const port=process.env.PORT||3000;

const menu=[
    {link:'/',name:'Home'},
    {link:'/category',name:'Categories'},
    {link:'/product',name:'Products'},
];
const catRoute=require('./src/routes/categoryRouter')(menu)
const proRoute=require('./src/routes/productRouter')(menu)

app.use(express.static(__dirname+'/public'));
app.set('views',__dirname+'/src/views')
app.set('view engine','ejs');
app.route('/').get((req,res) =>{
    res.render('index',{menu:menu,title:'Home Page'});
})
app.listen(port,(err)=>{
    if(err) throw err;
    console.log('Server is now listening on this port')
})
app.use('/category',catRoute);
app.use('/product',proRoute);
