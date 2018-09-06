var rect = require('./rectangle.js');

function solve(l, b){
	rect (l,b,(err, rectangle) => {
		if(err){
			console.log("ERROR: ", err.message);
		}
		else{
			console.log("Area = " + rectangle.area());
			console.log("Perimeter = " + rectangle.perimeter());
		}
	});
	console.log("Check me out");
}

solve(5, 10);
solve(3, -4);