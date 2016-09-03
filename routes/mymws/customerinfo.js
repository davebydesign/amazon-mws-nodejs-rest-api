var 
	express    = require('express'),
	router     = express.Router(),

	// Necessary to  accept data in "multipart/form-data" format
	multer     = require('multer'),
	upload     = multer(),

	MyMWS      = require('libs/mymws');

module.exports = router;



router.post('/ListCustomers', upload.array(), function (req, res, next) {
	var keys = [
		'MarketplaceId',
		'DateRangeStart',
		'DateRangeEnd',
		'DateRangeType'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.CustomerInformation.ListCustomers(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/ListCustomersByNextToken', upload.array(), function (req, res, next) {
	var keys = ['NextToken'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.CustomerInformation.ListCustomersByNextToken(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetCustomersForCustomerId', upload.array(), function (req, res, next) {
	var keys = [
		'MarketplaceId',
		'CustomerIdList'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.CustomerInformation.GetCustomersForCustomerId(params)
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

	MyMWS.CustomerInformation.GetServiceStatus(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});


