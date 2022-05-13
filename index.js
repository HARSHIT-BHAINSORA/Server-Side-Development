//object
var rect = require("./rectangle")

function solveRect(l,b){
    console.log("computing the rectangle value " + l +"and"+b)

    if(l <= 0 || b <= 0)
    {
        console.log("Invalid dimension");
    }
    else{
        console.log("The area of rectagle is "+  rect.area(l,b))
        console.log("The perimeter of rectangle is" + rect.perimeter(l,b));
    }
}

solveRect(2 ,4);
solveRect(5,4);
solveRect(2 ,0);
solveRect(1 ,3);
