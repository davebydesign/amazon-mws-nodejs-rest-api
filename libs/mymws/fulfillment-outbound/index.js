var AmazonMwsParentRequest = require('../parent-request-class');

class RequestCall extends AmazonMwsParentRequest {
	constructor(CallName, Params) {
		super({
			Version          : "2010-10-01",
			SellerOrMerchant : "Seller",
			Path             : "/FulfillmentOutboundShipment/2010-10-01",
			Parser           : require('./parser'),
			SubSchemas       : require('./subschemas.js'),
			MainSchema       : require('./schema.js'),
			CallName         : CallName,
			Params           : Params
		});
		return this.ExecuteRequest();
	}
}

class FulfillmentOutboundRequest  {
	GetFulfillmentPreview				(params) { return new RequestCall('GetFulfillmentPreview', 					params); }
	CreateFulfillmentOrder				(params) { return new RequestCall('CreateFulfillmentOrder', 				params); }
	UpdateFulfillmentOrder				(params) { return new RequestCall('UpdateFulfillmentOrder', 				params); }
	GetFulfillmentOrder					(params) { return new RequestCall('GetFulfillmentOrder', 					params); }
	ListAllFulfillmentOrders			(params) { return new RequestCall('ListAllFulfillmentOrders', 				params); }
	ListAllFulfillmentOrdersByNextToken	(params) { return new RequestCall('ListAllFulfillmentOrdersByNextToken',	params); }
	GetPackageTrackingDetails			(params) { return new RequestCall('GetPackageTrackingDetails', 				params); }
	CancelFulfillmentOrder				(params) { return new RequestCall('CancelFulfillmentOrder', 				params); }
	GetServiceStatus					(params) { return new RequestCall('GetServiceStatus', 						params); }

}

module.exports = new FulfillmentOutboundRequest();










