const bodyParser = require('body-parser')
const busboy = require('connect-busboy');
const Busboy = require('busboy');
const busboyBodyParser = require('busboy-body-parser');
const AWS = require('aws-sdk');
const jwt = require('express-jwt');

const secret = require('../lib/secret');
const utils = require('../lib/utils');

const authenticate = jwt({
    secret: secret.value,
    userProperty: 'payload',
});

	
const accessKeyId= 'AKIAJ6AADJMEM2QCMYMQ';
const secretAccessKey= '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';
const Bucket= 'fantastic4';



const s3fsImage = new AWS.S3(
{	
accessKeyId: accessKeyId,
secretAccessKey: secretAccessKey,
Bucket: Bucket,

});


//Initialize the bucket
var bucket = s3fsImage.createBucket();

module.exports.routes = (router) => {

	router.use(authenticate);
	router.use('/submit', busboy());
	router.use('/submit',bodyParser.urlencoded({ extended: true }));
	router.use('/submit',bodyParser.json());
	router.use('/submit',busboyBodyParser());

	//Insert an image. This require a file to be posted
	router.post('/submit', function(request, response){
		utils.authorizeRequest(request, response, (req2, res2) => {
            var file = req.files.file;
			var params = {Bucket: Bucket, Key:file.name, Body: file.data };
			s3fsImage.upload(params, function(err, data) {
			console.log(err, data);
			});
		});	
	});


	//upload file from the database by giving the unique key
	router.get('/upload', function(request, response){
		utils.authorizeRequest(request, response, (req, res) => {
			var file_name = req.headers.name;
			var params = {Bucket: Bucket, Key:file_name};

			s3fsImage.getObject(params, function(err, data) {
				if (err) console.log(err, err.stack); // an error occurred
				else {
					console.log(data);           // successful response
					res.json({
						ok: true,
						imdata: data,
					});
				}
			});
			
		});
		
	});


	//get the link to the image when doing get request
	router.get('/linkget', function(request, response){

		utils.authorizeRequest(request, response, (req, res) => {
			var file_name = req.headers.name;
			var params = {Bucket: Bucket, Key:file_name};
			var url = s3fsImage.getSignedUrl('getObject', params);
			res.json({
						ok: true,
						imurl: url,
					});
		
		});
	});
	return router;
};















