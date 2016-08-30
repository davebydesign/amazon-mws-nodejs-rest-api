var 
	express    = require('express'),
	router     = express.Router(),
	multer     = require('multer'),
	upload     = multer(),
	MyMWSClass = require('libs/mymws'),
	MWSCreds   = require('libs/mymws/credentials.js'),
	MyMWS      = new MyMWSClass(MWSCreds);

module.exports = router;

router.use(function(err, req, res, next) {
	res.json(err);
});






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

