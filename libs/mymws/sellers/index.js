var 
	AmazonMwsRequest = require('../base_request'),
	Parser = require('./parser'),
	Schema = require('./schema.js');

class RequestCall extends AmazonMwsRequest {
	constructor(CallName, params) {
		super();
		this.query.Version  = "2011-07-01";
		this.query.SellerId = process.env.MWS_MerchantId;
		this.path           = "/Sellers/2011-07-01";
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

class SellersRequest  {
	ListMarketplaceParticipations (params) { return new RequestCall('ListMarketplaceParticipations', 	params); }
	ListMarketplaceParticipationsByNextToken (params) { return new RequestCall('ListMarketplaceParticipationsByNextToken', params); }
	GetServiceStatus (params) { return new RequestCall('GetServiceStatus', 	params); }
}

module.exports = new SellersRequest();

