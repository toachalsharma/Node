const express=require('express')
const fs=require('fs')
const categoryRoute=express.Router();
const path=require('path')
function route(menu){
    categoryRoute.route('/').get((req,res) => {
        fs.readFile(path.join(__dirname,'../../public/json/categories.json'), 'utf8',(err,data) =>{
            if(err)throw err;
            var categories=JSON.parse(data);
            res.render('category',{title:'Category',menu,data:categories});
        });
    })

    //details route is not used for now
    categoryRoute.route('/details').get((req,res) => {
        res.send('Category detail route');
    })
    return categoryRoute;
}
module.exports=route;