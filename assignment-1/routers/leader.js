const express = require('express');
const bodyParser = require('body-parser');


const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req , res , next)=>{
    res.writeHead(200 , {'Content-type':'text/plain'});
    next();
})

.get((req , res , next)=>{
    res.end('Send all the leader to the user...');
})

.post((req , res , next)=>{
    res.end('Add the leader ' + req.body.name + ' with details ' + req.body.description);
})

.put((req , res , next) =>{
    res.statusCode = 403;
    res.end('Put operation not supported');
})

.delete((req , res , next)=>{
    res.end('Deleted all the leader');
})


leaderRouter.route('/:leaderId')
.all((req , res , next)=>{
    res.writeHead(200 , {'Content-type':'text/plain'});
    next();
})

.get((req , res , next)=>{
    res.end('Sending all the details of leader ' + req.params.leaderId +' to you');
})

.post((req , res , next)=>{
    res.statusCode = 403;
    res.end('Post operation not supported');
})

.put((req , res , next) =>{
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('Will update the leader: ' + req.body.name +
            ' with details: ' + req.body.description);
})

.delete((req , res , next)=>{
    res.end('Deleted the leader: ' + req.params.leaderId);
})

module.exports = leaderRouter;