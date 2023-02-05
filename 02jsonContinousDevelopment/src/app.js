const http= require('http');
const path= require('path');
const fs=require('fs');
http.createServer((req,res)=>{
    fs.readFile(path.join(__dirname,'../public/list.json'), 'utf8',function(err,data){
        if(err) throw err;
        res.write(data);
        res.end();
    })
}).listen(process.env.PORT||3000);