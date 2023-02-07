const express=require('express');
require('mongodb')
require('dotenv').config();
const app=express();
const mongo=require('mongodb').MongoClient;
const port=process.env.PORT|| 3000;
const menu=[
    {link:'/', name: 'Home'},
    {link:'/category',name: 'Category'},
    {link:'/product',name: 'Product'}
]
const catRoute=require('./src/routes/categoryRoute')(menu);
const proRoute=require('./src/routes/productRoute')(menu);
app.listen(port,(err) => {
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
});

app.route('/').get((req,res) => {
    res.render('index',{title:'Home',menu});
});
app.use('/category',catRoute)
app.use('/product',proRoute)
app.set('view engine','ejs');
app.set('views',__dirname+'/src/views');
app.use(express.static(__dirname+'/public'));
