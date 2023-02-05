let express=require('express');
let app=express();
//app.js solves the problem raised by this by using the express routes
app.get('/',(req,res) =>{
    res.send("<h2>Default Route</h2>");
})

app.get('/category',(req,res) =>{
    res.send('<h2>Category Page</h2>');
})

app.get('/category/details',(req,res) =>{
    res.send('<h2>Category Details Page</h2>');
})

app.get('/product',(req,res) =>{
    res.send('<h2>Product Page</h2>');
});

app.get('/product/details',(req,res) =>{
    res.send('<h2>Product Details Page</h2>');
});

app.listen(process.env.PORT||3000,(err)=>{
    if(err) throw err;
    console.log('listening on port');
})