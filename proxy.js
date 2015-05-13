//Nodejs, whatever
/*
    WARNING: the code that follows will make you cry;
             a safety pig is provided below for your benefit

  "The way this code is structured makes memory leaks particularly 
   difficult to spot. Add a Safety Pig and run your changes through
   valgrind before every commit."
  "The compiler can't ensure type safety here, so we added a Safety Pig
   just in case."
   "I don't have unit tests yet, but I did put in a Safety Pig." (almost worked)
                         _
 _._ _..._ .-',     _.._(`))
'-. `     '  /-._.-'    ',/
   )         \            '.
  / _    _    |             \
 |  a    a    /              |
 \   .-.                     ;  
  '-('' ).-'       ,'       ;
     '-;           |      .'
        \           \    /
        | 7  .__  _.-\   \
        | |  |  ``/  /`  /
       /,_|  |   /,_/   /
          /,_/      '`-'
*/

var http = require('http'),
	url = require('url');

var notFounded = function (res) {
	res.writeHead(404, {'Content-Type' : 'text/plain'});
	res.end('Error 404: page not founded');
};

http.createServer( function (req, res) {
	
	var brw_req = url.parse( req.url, true );

	if ( !brw_req.query || !brw_req.query.url ) return notFounded( res );

	var prx_req = url.parse ( brw_req.query.url );

	var client = http.createClient ( prx_req.port || 80, prx_req.hostname);

	var server = client.request( 'GET', prx_req.pathname || '/', { host: prx_req.hostname });
	server.end();

	server.addListener( 'response', function(prx_res) {

		res.writeHead( prx_res.statusCode, prx_res.headers);

		prx_res.addListener('data', function(some) {
			res.write(some);
		});

		prx_res.addListener('end', function() {
			res.end();
		});
	});
}).listen(3000, '127.0.0.1');

console.log('Running at http://127.0.0.1:3000');