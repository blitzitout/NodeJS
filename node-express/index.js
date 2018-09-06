const express = require('express');
const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//Mounting the endpoint, so that it lets the dishRouter handle the requests with URLs '/dishes'
app.use('/dishes', dishRouter);

app.all('/dishes', (req, res, next) => {
	//console.log(req.headers);
	res.statusCode = 200;
	res.setHeader('Content-Type','text/plain');
	//res.end('Will send the dishes');
	next();
});

//-----When the URL is /dishes-----
app.get('/dishes', (req, res, next) => {
	res.end('Will send all the dishes!');
});

app.post('/dishes', (req, res, next) => {
	res.end('Will add the dish ' + req.body.name + ' and update the details: ' + req.body.description);
});

app.put('/dishes', (req, res, next) => {
	res.statusCode = 403;
	res.end('PUT not supported on dishes');
});

app.delete('/dishes', (req, res, next) => {
	res.end('Deleting all the dishes');
});

//-----When the URL is /dishes/:dishId----
app.get('/dishes/:dishId', (req, res, next) => {
	res.end('Will send the dish ' + req.params.dishId + 'to you');
});

app.post('/dishes/:dishId', (req, res, next) => {
	res.statusCode = 403;
	res.end('POST operations not supported on /dishes/' + req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
	res.write('Updating the dish: ' + req.params.dishId + '\n');
	res.end('Will update the dish ' + req.body.name + ' with details ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
	res.end('Deleting the dish ' + req.params.dishId);
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}`);
});