const express=require('express')
const app= express()
const categoryRoute=express.Router();
const productRoute=express.Router();

app.route('/').get((req,res) => {
    res.send('This is the default route for home page');
})

categoryRoute.route('/').get((req, res) => {
    res.send('This is the default route for category page')
})

categoryRoute.route('/details').get((req, res) => {
    res.send('This is the default route for category details page');
})

productRoute.route('/').get((req, res) => {
    res.send('This is the default route for product page');
})

productRoute.route('/details').get((req, res) => {
    res.send('This is the default route for product details page');
})

app.use('/category',categoryRoute);
app.use('/product',productRoute);

app.listen(3000,(err) => {
    if(err) throw err;
    console.log('Service listening on port 3000')
})