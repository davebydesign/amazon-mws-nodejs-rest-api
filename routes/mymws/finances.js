var 
	express    = require('express'),
	router     = express.Router(),

	// Necessary to  accept data in "multipart/form-data" format
	multer     = require('multer'),
	upload     = multer(),

	MyMWS      = require('libs/mymws');

module.exports = router;



router.post('/ListFinancialEventGroups', upload.array(), function (req, res, next) {
	var keys = [
		'MaxResultsPerPage',
		'FinancialEventGroupStartedAfter',
		'FinancialEventGroupStartedBefore'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Finances.ListFinancialEventGroups(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/ListFinancialEventGroupsByNextToken', upload.array(), function (req, res, next) {
	var keys = ['NextToken'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Finances.ListFinancialEventGroupsByNextToken(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/ListFinancialEvents', upload.array(), function (req, res, next) {
	var keys = [
		'MaxResultsPerPage',
		'AmazonOrderId',
		'FinancialEventGroupId',
		'PostedAfter',
		'PostedBefore'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Finances.ListFinancialEvents(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/ListFinancialEventsByNextToken', upload.array(), function (req, res, next) {
	var keys = ['NextToken'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Finances.ListFinancialEventsByNextToken(params)
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

	MyMWS.Finances.GetServiceStatus(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});


