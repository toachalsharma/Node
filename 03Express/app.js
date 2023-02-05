const express=require('express')
const app=express();
const catRoute=require('./src/routes/categoryRoute.js')
const proRoute=require('./src/routes/productRoute.js')
app.route('/').get((req,res)=>{
    res.send('Welcome to the home page of the application')
})
app.use('/category',catRoute);
app.use('/product',proRoute);
app.listen(3000,(err)=>{
    if(err) throw err;
    console.log('App listening on port 3000');
}) 