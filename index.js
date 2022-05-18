//object
const rectangle = require("./rectangle");
var rect = require("./rectangle")

function solveRect(l,b){
    console.log("computing the rectangle value " + l +"and"+b)

   rect(l , b , (err , rectangle) =>{
        if(err)
        {
            console.log("Error : " , err.message);
        }
        else{
            console.log("The area is =" +rectangle.area());
            console.log("The primeter is "+ rectangle.perimeter());
        }
   });

   console.log("This statement is after the callback func");
}

solveRect(2 ,4);
solveRect(5,4);
solveRect(2 ,0);
solveRect(1 ,3);
