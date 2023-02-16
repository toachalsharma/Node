import express from "express";
import dotenv from "dotenv";
let app=express();
dotenv.config();
let router= express.Router();
router.get('/',(req,res)=>{
    res.send('Hello world');
})
app.use('/',router);
app.listen(3000,(err)=>{
    if(err) throw err;
})