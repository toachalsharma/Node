let  express = require( 'express');
let path = require('path');
let request = require('request');
let app=express();
app.set('view engine','ejs')
app.set('views','./src/views');
app.use(express.static(path.join(__dirname,'/public')));
let appRouter=express.Router();
appRouter.get('/:city',(req,res)=>{
    let city=req.params.city;
    let url=`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
    console.log(url);
    request(url,(err,data)=>{
        if(err) throw err;
        let output=JSON.parse(data.body);
        res.render('weatherApp',{title:"Weather",result:output})
    })
})
appRouter.get('/',(req, res)=>{
    let city=req.query.city;
    city=city?city:'Delhi';
    let url=`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
    request(url,(err,response)=>{
        if(err) throw err;
        let output=JSON.parse(response.body);
        res.render('weatherApp',{title:"Weather",result:output});
    })
})
app.use('/weather',appRouter);
app.listen(3000,(err)=>{
    if(err) throw err;
    console.log('server is running');
})