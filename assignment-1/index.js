const express = require('express');
const morgan = require('morgan');
const http = require('http');
const app = express();
const dishRouter = require('./routers/dishes');
const leaderRouter = require('./routers/leader');
const promoRouter = require('./routers/promotion');


const hostname = 'localhost';
const port = 5000;


app.use(morgan('dev'));

app.use('/dishes',dishRouter);
app.use('/leader',leaderRouter);
app.use('/promotion',promoRouter);



const server = http.createServer(app);

server.listen(port , hostname , () =>{
    console.log(`Server running at http://${hostname}:${port}`);
})