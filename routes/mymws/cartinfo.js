var 
	express    = require('express'),
	router     = express.Router(),

	// Necessary to  accept data in "multipart/form-data" format
	multer     = require('multer'),
	upload     = multer(),

	MyMWS      = require('libs/mymws');

module.exports = router;


router.post('/ListCarts', upload.array(), function (req, res, next) {
	var keys = [
		'MarketplaceId',
		'DateRangeStart',
		'DateRangeEnd'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.CartInformation.ListCustomers(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});




router.post('/ListCartsByNextToken', upload.array(), function (req, res, next) {
	var keys = ['NextToken'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.CartInformation.ListCartsByNextToken(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});



router.post('/GetCarts', upload.array(), function (req, res, next) {
	var keys = [
		'MarketplaceId',
		'CartIdList'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.CartInformation.GetCarts(params)
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

	MyMWS.CartInformation.GetServiceStatus(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});
