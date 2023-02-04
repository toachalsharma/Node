let http=require('http');
const PORT = process.env.PORT || 8080
http.createServer((req,res)=>{
    res.write('<h2>Hello from NodeJS</h2>');
    res.end();
}).listen(3000);