var 
	express    = require('express'),
	router     = express.Router(),
	multer     = require('multer'),		// Necessary to  accept data in "multipart/form-data" format
	upload     = multer(),
	MyMWS      = require('libs/mymws'),
	routes 	   = [
		'ListMarketplaceParticipations',
		'ListMarketplaceParticipationsByNextToken',
		'GetServiceStatus'
	];

routes.forEach(function(route) {
	router.post('/'+route, upload.array(), function (req, res, next) {
		MyMWS.Sellers[route](req.body)
		.then (function (result) { res.json(result);          })
		.catch(function (err)    { res.status(500).send(err); });
	});
});

module.exports = router;




