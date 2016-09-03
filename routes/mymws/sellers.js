var 
	express    = require('express'),
	router     = express.Router(),

	// Necessary to  accept data in "multipart/form-data" format
	multer     = require('multer'),
	upload     = multer(),

	MyMWS      = require('libs/mymws');

module.exports = router;



router.post('/ListMarketplaceParticipations', upload.array(), function (req, res, next) {
	var keys = [],
	params = MyMWS.parseParams(keys, req.body);	

	MyMWS.Sellers.ListMarketplaceParticipations(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/ListMarketplaceParticipationsByNextToken', upload.array(), function (req, res, next) {
	var keys = ['NextToken'],
	params = MyMWS.parseParams(keys, req.body);	

	MyMWS.Sellers.ListMarketplaceParticipationsByNextToken(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});






router.get('/GetServiceStatus', upload.array(), function (req, res, next) {
	var keys = [],
	params = MyMWS.parseParams(keys, req.body);	

	MyMWS.Sellers.GetServiceStatus(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});

