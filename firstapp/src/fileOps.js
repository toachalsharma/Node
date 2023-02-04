let fs=require('fs');
let path=require('path');

fs.writeFile(path.join(__dirname,'../public/firstfile.txt'),'hello this is the first file',(err)=>{
    if(err) throw err;
    console.log('file created');
});

fs.readFile(path.join(__dirname,'../public/firstfile.txt'),'utf-8',(err,data)=>{
    if(err) throw err;
    console.log(data);
});

fs.appendFile(path.join(__dirname,'../public/firstfile.txt'),'appended some text',(err)=>{
    if(err) throw err;
    console.log('file appended');
});

fs.rename(path.join(__dirname,'../public/firstfile.txt'),path.join(__dirname,'../public/renamedFile.txt'),(err)=>{
    if(err)throw err;
    console.log('file renamed');
});

fs.unlink(path.join(__dirname,'../public/renamedFile.txt'),(err)=>{
    if(err) throw err;
    console.log('file deleted');
});