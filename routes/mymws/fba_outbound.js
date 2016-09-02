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






router.post('/GetFulfillmentPreview', upload.array(), function (req, res, next) {
	var keys = [
		'MarketplaceId',
		'Address',
		'Items',
		'ShippingSpeedCategories',
		'IncludeCODFulfillmentPreview',
		'IncludeDeliveryWindows'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentOutbound.GetFulfillmentPreview(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/CreateFulfillmentOrder', upload.array(), function (req, res, next) {
	var keys = [
		'MarketplaceId',
		'SellerFulfillmentOrderId',
		'FulfillmentAction',
		'DisplayableOrderId',
		'DisplayableOrderDateTime',
		'DisplayableOrderComment',
		'ShippingSpeedCategory',
		'DestinationAddress',
		'FulfillmentPolicy',
		'NotificationEmailList',
		'CODSettings',
		'Items',
		'DeliveryWindow'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentOutbound.CreateFulfillmentOrder(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/UpdateFulfillmentOrder', upload.array(), function (req, res, next) {
	var keys = [
		'MarketplaceId',
		'SellerFulfillmentOrderId',
		'FulfillmentAction',
		'DisplayableOrderId',
		'DisplayableOrderDateTime',
		'DisplayableOrderComment',
		'ShippingSpeedCategory',
		'DestinationAddress',
		'FulfillmentPolicy',
		'NotificationEmailList',
		'Items'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentOutbound.UpdateFulfillmentOrder(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetFulfillmentOrder', upload.array(), function (req, res, next) {
	var keys = ['SellerFulfillmentOrderId'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentOutbound.GetFulfillmentOrder(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/ListAllFulfillmentOrders', upload.array(), function (req, res, next) {
	var keys = ['QueryStartDateTime'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentOutbound.ListAllFulfillmentOrders(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/ListAllFulfillmentOrdersByNextToken', upload.array(), function (req, res, next) {
	var keys = ['NextToken'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentOutbound.ListAllFulfillmentOrdersByNextToken(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetPackageTrackingDetails', upload.array(), function (req, res, next) {
	var keys = ['PackageNumber'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentOutbound.GetPackageTrackingDetails(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});






router.post('/CancelFulfillmentOrder', upload.array(), function (req, res, next) {
	var keys = ['SellerFulfillmentOrderId'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentOutbound.CancelFulfillmentOrder(params)
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

	MyMWS.FulfillmentOutbound.GetServiceStatus(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});
