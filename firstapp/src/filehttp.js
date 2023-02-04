let http=require('http');
let fs=require('fs');
let path=require('path');
http.createServer((req, res) => {
    fs.readFile(path.join(__dirname, '../public/readhtml.txt'), 'utf8', (err, data) =>{
        if(err)throw err;
        res.write(data);
        res.end();
    });
}).listen(process.env.PORT||3000);