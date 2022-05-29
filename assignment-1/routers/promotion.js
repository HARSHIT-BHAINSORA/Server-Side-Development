const express = require('express');
const bodyParser = require('body-parser');


const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req , res , next)=>{
    res.writeHead(200 , {'Content-type':'text/plain'});
    next();
})

.get((req , res , next)=>{
    res.end('Send all the promo to the user...');
})

.post((req , res , next)=>{
    res.end('Add the promo ' + req.body.name + ' with details ' + req.body.description);
})

.put((req , res , next) =>{
    res.statusCode = 403;
    res.end('Put operation not supported');
})

.delete((req , res , next)=>{
    res.end('Deleted all the promo');
})


promoRouter.route('/:promoId')
.all((req , res , next)=>{
    res.writeHead(200 , {'Content-type':'text/plain'});
    next();
})

.get((req , res , next)=>{
    res.end('Sending all the details of promo ' + req.params.promoId +' to you');
})

.post((req , res , next)=>{
    res.statusCode = 403;
    res.end('Post operation not supported');
})

.put((req , res , next) =>{
    res.write('Updating the promo: ' + req.params.promoId + '\n');
    res.end('Will update the promo: ' + req.body.name +
            ' with details: ' + req.body.description);
})

.delete((req , res , next)=>{
    res.end('Deleted the promo: ' + req.params.promoId);
})

module.exports = promoRouter;