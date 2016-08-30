var 
	AmazonMwsRequest = require('./base_request');

module.exports = class SellersRequest extends AmazonMwsRequest {
	constructor(creds) {
		super(creds);
		this.query["Version"] = "2011-07-01";
		this.query["SellerId"] = creds.MerchantId;
		this.path = "/Sellers/2011-07-01";		
	}

	ListMarketplaceParticipations(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ListMarketplaceParticipations";
		this.setThrottling("ListMarketplaceParticipations", 15, 60); // one request per minute

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListMarketplaceParticipationsByNextToken(params) {

		this.requestSchema = {
			"title"      : "ListMarketplaceParticipationsByNextToken",
			"throttling" : { 
				"name" : "ListMarketplaceParticipations",
				"maxRequestQuota" : 15,
				"hourlyRestoreRate" : 60	// One request per minute
			},

			"type"       : "object",
			"properties" : {

				"NextToken" : {
					"name"        : 'NextToken',
					"description" : "",
					"type"        : "string",
				}


			},
			additionalProperties : false,
			required : ['NextToken']
		};	

		return this.invoke(params, (result)=>{
			if (this.detectResponseError(result)) return this.deferred.reject(this.responseError);		
			this.deferred.fulfill(result);			
		});
	}

	GetServiceStatus(params) {
		this.requestSchema = {
			"title"      : "GetServiceStatus",
			"throttling" : { 
				"name" : "Sellers.GetServiceStatus",
				"maxRequestQuota" : 2,
				"hourlyRestoreRate" : 12	// one request every five minutes
			},

			"type"       : "object",
			"properties" : {


			},
			additionalProperties : false

		};
		
		return this.invoke(params, (result)=>{
			if (this.detectResponseError(result)) return this.deferred.reject(this.responseError);		
			this.deferred.fulfill(result);			
		});
	}
}