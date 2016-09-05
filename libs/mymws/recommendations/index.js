var 
	AmazonMwsRequest = require('../base_request'),
	Parser = require('./parser'),
	Schema = require('./schema.js');

class RequestCall extends AmazonMwsRequest {
	constructor(CallName, params) {
		super();
		this.query.Version  = "2011-10-01";
		this.query.SellerId = process.env.MWS_MerchantId;
		this.path           = "/Products/2011-10-01";
		return this.MakeCall(CallName, params);
	}

	MakeCall(CallName, params) {
		this.requestSchema = Schema[CallName];
		return this.invoke(params, (result)=>{
			if (this.detectResponseError(result)) return this.deferred.reject(this.responseError);

			if (Parser[CallName]) {
				let parsedResult = Parser[CallName](result);
				this.deferred.fulfill(parsedResult);	
			} else {
				this.deferred.fulfill(result);
			}
		});
	}
}

class RecommendationsRequest  {
	GetLastUpdatedTimeForRecommendations	(params) { return new RequestCall('GetLastUpdatedTimeForRecommendations', 	params); }
	ListRecommendations						(params) { return new RequestCall('ListRecommendations', 					params); }
	ListRecommendationsByNextToken			(params) { return new RequestCall('ListRecommendationsByNextToken', 		params); }
	GetServiceStatus						(params) { return new RequestCall('GetServiceStatus', 						params); }
}

module.exports = new RecommendationsRequest();


