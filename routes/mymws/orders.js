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






router.post('/ListOrders', upload.array(), function (req, res, next) {
	var keys = [
		'CreatedAfter',
		'CreatedBefore',
		'LastUpdatedAfter',
		'LastUpdatedBefore',
		'OrderStatus',
		'MarketplaceId',
		'FulfillmentChannel',
		'PaymentMethod',
		'BuyerEmail',
		'SellerOrderId',
		'MaxResultsPerPage',
		'TFMShipmentStatus'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Orders.ListOrders(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/ListOrdersByNextToken', upload.array(), function (req, res, next) {
	var keys = ['NextToken'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Orders.ListOrdersByNextToken(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetOrder', upload.array(), function (req, res, next) {
	var keys = ['AmazonOrderId'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Orders.GetOrder(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});







router.post('/ListOrderItems', upload.array(), function (req, res, next) {
	var keys = ['AmazonOrderId'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Orders.ListOrderItems(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/ListOrderItemsByNextToken', upload.array(), function (req, res, next) {
	var keys = ['NextToken'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Orders.ListOrderItemsByNextToken(params)
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

	MyMWS.Orders.GetServiceStatus(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});

