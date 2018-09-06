const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
	console.log('Request for ' + req.url + ' by method ' + req.method);
	if(req.method == 'GET'){
		//Supports only GET method
		var fileUrl = req.url, filePath;
		if(req.url == '/')
			fileUrl = '/index.html';
		else fileUrl = req.url;
		filePath = path.resolve('./public' + fileUrl);
		const ext = path.extname(filePath);	
		if(ext == '.html'){
			//Supports only HTML file
			fs.exists(filePath, (flag) => {
				//fs.exists()'s callback function only takes a singe input which is boolean
				if(!flag){
					res.statusCode = 404;
					res.setHeader('Content-Type','text/html');
					res.end('<html><body><h1>Error 404: ' + fileUrl + ' not found</h1></body></html>');
				}
				else{
					res.statusCode = 200;
					res.setHeader('Content-Type','text/html');
					//creating a read stream from the existing file at the specified filePath
					//and pipes it to the response's write stream
					fs.createReadStream(filePath).pipe(res);
				}
			})
		}
		else{
			res.statusCode = 404;
			res.setHeader('Content-Type','text/html');
			res.end('<html><body><h1>Error 404: ' + ext + ' not HTML file</h1></body></html>');
		}
	}
	else{
		res.statusCode = 404;
		res.setHeader('Content-Type','text/html');
		res.end('<html><body><h1>Error 404: ' + req.method + ' not supported</h1></body></html>');
	}

	// res.statusCode = 200;
	// res.setHeader('Content-Type', 'text/html');
	// res.end('<html><body><h1>Hello World!</h1></body></html>');
})

server.listen(port, hostname, () => {
	//to display that the server is active on that hostname:port
	console.log(`Server running at http://${hostname}:${port}`);
})





