var AmazonMwsParentRequest = require('../parent-request-class');

class RequestCall extends AmazonMwsParentRequest {
	constructor(CallName, Params) {
		super({
			Version          : "2011-10-01",
			SellerOrMerchant : "Seller",
			Path             : "/Products/2011-10-01",
			Parser           : require('./parser'),
			SubSchemas       : require('./subschemas.js'),
			MainSchema       : require('./schema.js'),
			CallName         : CallName,
			Params           : Params
		});
		return this.ExecuteRequest();
	}
}

class RecommendationsRequest  {
	GetLastUpdatedTimeForRecommendations	(params) { return new RequestCall('GetLastUpdatedTimeForRecommendations', 	params); }
	ListRecommendations						(params) { return new RequestCall('ListRecommendations', 					params); }
	ListRecommendationsByNextToken			(params) { return new RequestCall('ListRecommendationsByNextToken', 		params); }
	GetServiceStatus						(params) { return new RequestCall('GetServiceStatus', 						params); }
}

module.exports = new RecommendationsRequest();


