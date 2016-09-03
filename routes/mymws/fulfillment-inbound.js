
var 
	express    = require('express'),
	router     = express.Router(),
	multer     = require('multer'),		// Necessary to  accept data in "multipart/form-data" format
	upload     = multer(),
	MyMWS      = require('libs/mymws'),
	routes 	   = [
		'CreateInboundShipmentPlan',
		'CreateInboundShipment',
		'UpdateInboundShipment',
		'GetPreorderInfo',
		'ConfirmPreorder',
		'GetPrepInstructionsForSKU',
		'GetPrepInstructionsForASIN',
		'PutTransportContent',
		'EstimateTransportRequest',
		'GetTransportContent',
		'ConfirmTransportRequest',
		'VoidTransportRequest',
		'GetPackageLabels',
		'GetUniquePackageLabels',
		'GetPalletLabels',
		'GetBillOfLading',
		'ListInboundShipments',
		'ListInboundShipmentsByNextToken',
		'ListInboundShipmentItems',
		'ListInboundShipmentItemsByNextToken',
		'GetServiceStatus'
	];

routes.forEach(function(route) {
	router.post('/'+route, upload.array(), function (req, res, next) {
		MyMWS.FulfillmentInbound[route](req.body)
		.then (function (result) { res.json(result);          })
		.catch(function (err)    { res.status(500).send(err); });
	});
});

module.exports = router;




