var AmazonMwsParentRequest = require('../parent-request-class');

class RequestCall extends AmazonMwsParentRequest {
	constructor(CallName, Params) {
		super({
			Version          : "2011-07-01",
			SellerOrMerchant : "Seller",
			Path             : "/Sellers/2011-07-01",
			Parser           : require('./parser'),
			SubSchemas       : require('./subschemas.js'),
			MainSchema       : require('./schema.js'),
			CallName         : CallName,
			Params           : Params
		});
		return this.ExecuteRequest();
	}
}

class SellersRequest  {
	ListMarketplaceParticipations (params) { return new RequestCall('ListMarketplaceParticipations', 	params); }
	ListMarketplaceParticipationsByNextToken (params) { return new RequestCall('ListMarketplaceParticipationsByNextToken', params); }
	GetServiceStatus (params) { return new RequestCall('GetServiceStatus', 	params); }
}

module.exports = new SellersRequest();

