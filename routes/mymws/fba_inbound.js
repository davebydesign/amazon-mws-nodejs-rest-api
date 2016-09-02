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





router.post('/CreateInboundShipmentPlan', upload.array(), function (req, res, next) {
	var keys = [
		'ShipFromAddress',
		'ShipToCountryCode',
		'ShipToCountrySubdivisionCode',
		'LabelPrepPreference',
		'InboundShipmentPlanRequestItems'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentInbound.CreateInboundShipmentPlan(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/CreateInboundShipment', upload.array(), function (req, res, next) {
	var keys = [
		'ShipmentId',
		'InboundShipmentHeader',
		'InboundShipmentItems'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentInbound.CreateInboundShipment(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});






router.post('/UpdateInboundShipment', upload.array(), function (req, res, next) {
	var keys = [
		'ShipmentId',
		'InboundShipmentHeader',
		'InboundShipmentItems'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentInbound.UpdateInboundShipment(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetPreorderInfo', upload.array(), function (req, res, next) {
	var keys = ['ShipmentId'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentInbound.GetPreorderInfo(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/ConfirmPreorder', upload.array(), function (req, res, next) {
	var keys = [
		'ShipmentId',
		'NeedByDate'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentInbound.ConfirmPreorder(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetPrepInstructionsForSKU', upload.array(), function (req, res, next) {
	var keys = [
		'SellerSKUList',
		'ShipToCountryCode'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentInbound.GetPrepInstructionsForSKU(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetPrepInstructionsForASIN', upload.array(), function (req, res, next) {
	var keys = [
		'ASINList',
		'ShipToCountryCode'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentInbound.GetPrepInstructionsForASIN(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/PutTransportContent', upload.array(), function (req, res, next) {
	var keys = [
		'ShipmentId',
		'IsPartnered',
		'ShipmentType',
		'TransportDetails'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentInbound.PutTransportContent(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/EstimateTransportRequest', upload.array(), function (req, res, next) {
	var keys = ['ShipmentId'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentInbound.EstimateTransportRequest(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetTransportContent', upload.array(), function (req, res, next) {
	var keys = ['ShipmentId'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentInbound.GetTransportContent(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/ConfirmTransportRequest', upload.array(), function (req, res, next) {
	var keys = ['ShipmentId'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentInbound.ConfirmTransportRequest(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});







router.post('/VoidTransportRequest', upload.array(), function (req, res, next) {
	var keys = ['ShipmentId'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentInbound.VoidTransportRequest(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetPackageLabels', upload.array(), function (req, res, next) {
	var keys = [
		'ShipmentId',
		'PageType',
		'NumberOfPackages'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentInbound.GetPackageLabels(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetUniquePackageLabels', upload.array(), function (req, res, next) {
	var keys = [
		'ShipmentId',
		'PageType',
		'PackageLabelsToPrint'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentInbound.GetUniquePackageLabels(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetPalletLabels', upload.array(), function (req, res, next) {
	var keys = [
		'ShipmentId',
		'PageType',
		'NumberOfPallets'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentInbound.GetPalletLabels(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetBillOfLading', upload.array(), function (req, res, next) {
	var keys = ['ShipmentId'],
	params = MyMWS.parseParams(keys, req.body);	

	MyMWS.FulfillmentInbound.GetBillOfLading(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/ListInboundShipments', upload.array(), function (req, res, next) {
	var keys = [
		'ShipmentStatusList',
		'ShipmentIdList',
		'LastUpdatedAfter',
		'LastUpdatedBefore'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentInbound.ListInboundShipments(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});






router.post('/ListInboundShipmentsByNextToken', upload.array(), function (req, res, next) {
	var keys = ['NextToken'],
	params = MyMWS.parseParams(keys, req.body);	

	MyMWS.FulfillmentInbound.ListInboundShipmentsByNextToken(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/ListInboundShipmentItems', upload.array(), function (req, res, next) {
	var keys = [
		'ShipmentId',
		'LastUpdatedAfter',
		'LastUpdatedBefore'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.FulfillmentInbound.ListInboundShipmentItems(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});






router.post('/ListInboundShipmentItemsByNextToken', upload.array(), function (req, res, next) {
	var keys = ['NextToken'],
	params = MyMWS.parseParams(keys, req.body);	

	MyMWS.FulfillmentInbound.ListInboundShipmentItemsByNextToken(params)
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

	MyMWS.FulfillmentInbound.GetServiceStatus(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});