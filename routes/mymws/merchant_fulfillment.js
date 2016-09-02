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





router.post('/GetEligibleShippingServices', upload.array(), function (req, res, next) {
	var keys = ['ShipmentRequestDetails'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.MerchantFulfillment.GetEligibleShippingServices(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/CreateShipment', upload.array(), function (req, res, next) {
	var keys = [
		'ShipmentRequestDetails',
		'ShippingServiceId',
		'ShippingServiceOfferId'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.MerchantFulfillment.CreateShipment(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});






router.post('/GetShipment', upload.array(), function (req, res, next) {
	var keys = ['ShipmentId'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.MerchantFulfillment.GetShipment(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/CancelShipment', upload.array(), function (req, res, next) {
	var keys = ['ShipmentId'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.MerchantFulfillment.CancelShipment(params)
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

	MyMWS.MerchantFulfillment.GetServiceStatus(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});

