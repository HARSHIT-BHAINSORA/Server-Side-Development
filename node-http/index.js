const http = require('http');
const fs = require('fs'); // read and write into the file
import { exists } from 'fs';
const path = require('path'); // setting the path

const hostname = 'localhost';
const port = 5000;

// setup sever

//req - this is stands for requesting sever.
// it will return the response - res

const server = http.createServer((req,res) => {
    console.log("Request for " + req.url + "by methode" + req.method);


   if(req.method == 'GET')
   {
       var fileUrl;
       if(req.url == '/')
            fileUrl = '/index.html';
       else
            fileUrl = '/about.html'; 
       
        var filePath = path.resolve('./public'+fileUrl);
        const fileExt = path.extname(filePath);
        
        if(fileExt == '.html'){
           fs.existsSync(filePath,(existsSync)=>{

           })
       }         
   }
})

// here we start the server

server.listen(port , hostname ,  () => {
    console.log(`Server running at http://${hostname}:${port}`)
});