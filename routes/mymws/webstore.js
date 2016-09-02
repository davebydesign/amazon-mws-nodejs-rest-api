var 
	express    = require('express'),
	router     = express.Router(),
	multer     = require('multer'),
	upload     = multer(),
	MyMWSClass = require('libs/mymws'),
	MyMWS      = new MyMWSClass();

module.exports = router;

router.use(function(err, req, res, next) {
	res.json(err);
});





router.post('/ListSubscriptionsCount', upload.array(), function (req, res, next) {
	var keys = [
		'MarketplaceId',
		'SubscriptionState',
		'DateRangeStart',
		'DateRangeEnd',
		'SellerSKUList'	
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Webstore.ListSubscriptionsCount(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/ListSubscriptionsCountByNextToken', upload.array(), function (req, res, next) {
	var keys = ['NextToken'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Webstore.ListSubscriptionsCountByNextToken(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetSubscriptionDetails', upload.array(), function (req, res, next) {
	var keys = [
		'MarketplaceId',
		'SellerSKU',
		'SubscriptionState',
		'DateRangeStart',
		'DateRangeEnd'		
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Webstore.GetSubscriptionDetails(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

})





router.get('/GetServiceStatus', upload.array(), function (req, res, next) {
	var keys = [],
	params = MyMWS.parseParams(keys, req.body);	

	MyMWS.Webstore.GetServiceStatus(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});

