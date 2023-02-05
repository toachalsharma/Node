let express=require('express');
const categoryRoute=express.Router();
categoryRoute.route('/').get((req,res)=>{
    res.send('hey this is the default route for category');
})
categoryRoute.route('/details').get((req,res)=>{
    res.send('this is the route for category details page');
})
module.exports = categoryRoute;