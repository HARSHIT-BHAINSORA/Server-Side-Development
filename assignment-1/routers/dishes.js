const express = require('express');
const bodyParser = require('body-parser');
const { route } = require('../../node-Express/routers/dishRouter');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req , res , next)=>{
    res.writeHead(200 , {'Content-type':'text/plain'});
    next();
})

.get((req , res , next)=>{
    res.end('Send all the dish to the user...');
})

.post((req , res , next)=>{
    res.end('Add the dish ' + req.body.name + ' with details ' + req.body.description);
})

.put((req , res , next) =>{
    res.statusCode = 403;
    res.end('Put operation not supported');
})

.delete((req , res , next)=>{
    res.end('Deleted all the dish');
})


dishRouter.route('/:dishId')
.all((req , res , next)=>{
    res.writeHead(200 , {'Content-type':'text/plain'});
    next();
})

.get((req , res , next)=>{
    res.end('Sending all the details of dish ' + req.params.dishId +' to you');
})

.post((req , res , next)=>{
    res.statusCode = 403;
    res.end('Post operation not supported');
})

.put((req , res , next) =>{
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name +
            ' with details: ' + req.body.description);
})

.delete((req , res , next)=>{
    res.end('Deleted the dish: ' + req.params.dishId);
})

module.exports = dishRouter;