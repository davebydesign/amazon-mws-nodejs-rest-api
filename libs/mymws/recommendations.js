var 
	AmazonMwsRequest = require('./base_request');



class RecommendationsRequest extends AmazonMwsRequest {
	constructor() {
		super();
		this.query.Version = "2013-04-01";
		this.query.SellerId = process.env.MWS_MerchantId;
		this.path = "/Recommendations/2013-04-01";
	}

	GetLastUpdatedTimeForRecommendations(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetLastUpdatedTimeForRecommendations";
		this.setThrottling("GetLastUpdatedTimeForRecommendations", 8, 30 * 60); // one request every two seconds

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListRecommendations(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ListRecommendations";
		this.setThrottling("ListRecommendations", 8, 30 * 60); // one request every two seconds

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListRecommendationsByNextToken(params) {

		this.requestSchema = {
			"title"      : "ListRecommendationsByNextToken",
			"throttling" : { 
				"name" : "ListRecommendationsByNextToken",
				"maxRequestQuota" : 8,
				"hourlyRestoreRate" : 1800	// One request every two seconds
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
				"name" : "Recommendations.GetServiceStatus",
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


module.exports = new RecommendationsRequest();