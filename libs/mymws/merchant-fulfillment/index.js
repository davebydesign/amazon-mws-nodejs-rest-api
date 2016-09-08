var AmazonMwsParentRequest = require('../parent-request-class');

class RequestCall extends AmazonMwsParentRequest {
	constructor(CallName, Params) {
		super({
			Version          : "2015-06-01",
			SellerOrMerchant : "Seller",
			Path             : "/MerchantFulfillment/2015-06-01",
			Parser           : require('./parser'),
			SubSchemas       : require('./subschemas.js'),
			MainSchema       : require('./schema.js'),
			CallName         : CallName,
			Params           : Params
		});
		return this.ExecuteRequest();
	}
}

class MerchantFulfillmentRequest  {
	GetEligibleShippingServices	(params) { return new RequestCall('GetEligibleShippingServices',	params); }
	CreateShipment				(params) { return new RequestCall('CreateShipment', 				params); }
	GetShipment					(params) { return new RequestCall('GetShipment', 					params); }
	CancelShipment				(params) { return new RequestCall('CancelShipment', 				params); }
	GetServiceStatus			(params) { return new RequestCall('GetServiceStatus', 				params); }

}

module.exports = new MerchantFulfillmentRequest();




