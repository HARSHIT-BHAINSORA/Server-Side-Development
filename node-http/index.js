const http = require('http');

const hostname = 'localhost';
const port = 5000;

// setup sever

//req - this is stands for requesting sever.
// it will return the response - res

const server = http.createServer((req,res) => {
    console.log(req.headers);

    res.statusCode = 200;
    res.setHeader('Content-Type' , 'text/html');
    res.end('<html><body><h1> Hi , i am learing Node</h1> </body></html>');
})

// here we start the server

server.listen(port , hostname ,  () => {
    console.log(`Server running at http://${hostname}:${port}`)
});