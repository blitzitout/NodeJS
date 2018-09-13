const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

//manages the /dishes requests
dishRouter.route('/')
.all((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
})
.get((req, res, next) => {
	res.end('Will send all the dishes!');
})
.post((req, res, next) => {
	res.end('Will add the dish ' + req.body.name + ' and update the details: ' + req.body.description);
})
.put((req, res, next) => {
	res.statusCode = 403;
	res.end('PUT not supported on dishes');
})
.delete((req, res, next) => {
	res.end('Deleting all the dishes');
});

//manages the /dishes/:dishId requests
dishRouter.route('/:dishId')
.all((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
})
.get((req, res, next) => {
	res.end('Will send the dish ' + req.params.dishId + ' to you');
})
.post((req, res, next) => {
	res.statusCode = 403;
	res.end('POST operations not supported on /dishes/' + req.params.dishId);
})
.put((req, res, next) => {
	res.write('Updating the dish: ' + req.params.dishId + '\n');
	res.end('Will update the dish ' + req.body.name + ' with details ' + req.body.description);
})
.delete((req, res, next) => {
	res.end('Deleting the dish ' + req.params.dishId);
});

module.exports = dishRouter;