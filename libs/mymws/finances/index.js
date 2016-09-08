var AmazonMwsParentRequest = require('../parent-request-class');

class RequestCall extends AmazonMwsParentRequest {
	constructor(CallName, Params) {
		super({
			Version          : "2015-05-01",
			SellerOrMerchant : "Seller",
			Path             : "/Finances/2015-05-01",
			Parser           : require('./parser'),
			SubSchemas       : require('./subschemas.js'),
			MainSchema       : require('./schema.js'),
			CallName         : CallName,
			Params           : Params
		});
		return this.ExecuteRequest();
	}
}

class FinancesRequest  {
	ListFinancialEventGroups			(params) { return new RequestCall('ListFinancialEventGroups',				params); }
	ListFinancialEventGroupsByNextToken	(params) { return new RequestCall('ListFinancialEventGroupsByNextToken', 	params); }
	ListFinancialEvents					(params) { return new RequestCall('ListFinancialEvents', 					params); }
	ListFinancialEventsByNextToken		(params) { return new RequestCall('ListFinancialEventsByNextToken', 		params); }
	GetServiceStatus					(params) { return new RequestCall('GetServiceStatus', 						params); }
}

module.exports = new FinancesRequest();





