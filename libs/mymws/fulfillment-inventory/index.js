var AmazonMwsParentRequest = require('../parent-request-class');

class RequestCall extends AmazonMwsParentRequest {
	constructor(CallName, Params) {
		super({
			Version          : "2010-10-01",
			SellerOrMerchant : "Seller",
			Path             : "/FulfillmentInventory/2010-10-01",
			Parser           : require('./parser'),
			SubSchemas       : require('./subschemas.js'),
			MainSchema       : require('./schema.js'),
			CallName         : CallName,
			Params           : Params
		});
		return this.ExecuteRequest();
	}
}

class FulfillmentInventoryRequest  {
	ListInventorySupply				(params) { return new RequestCall('ListInventorySupply', 			params); }
	ListInventorySupplyByNextToken	(params) { return new RequestCall('ListInventorySupplyByNextToken', params); }
	GetServiceStatus				(params) { return new RequestCall('GetServiceStatus', 				params); }

}

module.exports = new FulfillmentInventoryRequest();



