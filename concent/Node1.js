var http = require("http");

["text/plain", "text/html", "application/json"].forEach(function(type) {
var request = http.request({
	hostname: "eloquentjavascript.net",
	path: "/author", 
	method: "GET", 
	headers: {Accept: type} 
}, function(response) {
	function readStreamAsString(stream, callback) {
	  var data = "";
	  stream.on("data", function(chunk) {
	    data += chunk.toString();
	  });
	  stream.on("end", function() {
	    callback(null, data);
	  });
	  stream.on("error", function(error) {
	    callback(error);
	  });
	}
	readStreamAsString(response, function(error, content) {
		if (error)
			throw error;
		console.log(content);
	});
});



request.end();
});