//	This is a example of a server that calculate Mathematics formulas
var http = require('http');

var formulaList = "EXAMPLE OF OPERATIONS\n=====================\n\nhttp://127.0.0.1:3000/ or http://localhost:3000/\nFollowed by any of this elements:\n\n  1 - add\\\n  2 - sub\\\n  3 - mul\\\n  4 - div\\\n\nAnd after this you can add any two, for example:\n\n** http://127.0.0.1:3000/add/10/25 ** and the result = 35";

var Mathematics = {
	add: function (a, b) { return a + b; },
	sub: function (a, b) { return a - b; },
	mul: function (a, b) { return a * b; },
	div: function (a, b) { return a / b; }, 
	pi: function() { return Math.PI; }
};

http.createServer( function (req, res) {

	var parts = req.url.split('/'),
		operator = Mathematics[parts[1]],
		a = parseInt(parts[2], 10) || 0,
		b = parseInt(parts[3], 10) || 0,
		result = operator ? operator(a, b) : formulaList;

	//console.log(parts);

	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(result + '');

}).listen(3000, '127.0.0.1');
console.log('Running at http://127.0.0.1:3000');