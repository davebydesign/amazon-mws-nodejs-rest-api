var 
	AmazonMwsRequest = require('./base_request');



class WebstoreRequest extends AmazonMwsRequest {
	constructor() {
		super();
		this.query.Version = "2014-09-01";
		this.query.SellerId = process.env.MWS_MerchantId;
		this.path = "/WebstoreAPI/2014-09-01";
	}

	ListSubscriptionsCount(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ListSubscriptionsCount";
		this.setThrottling("ListSubscriptionsCount", 50, 20 * 60); // 20 requests every minute

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListSubscriptionsCountByNextToken(params) {

		this.requestSchema = {
			"title"      : "ListSubscriptionsCountByNextToken",
			"throttling" : { 
				"name" : "ListSubscriptionsCountByNextToken",
				"maxRequestQuota" : 50,
				"hourlyRestoreRate" : 20 * 60	/// 20 requests every minute
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

	GetSubscriptionDetails(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetSubscriptionDetails";
		this.setThrottling("GetSubscriptionDetails", 15, 5 * 60); // five requests every minute

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetServiceStatus(params) {
		this.requestSchema = {
			"title"      : "GetServiceStatus",
			"throttling" : { 
				"name" : "Webstore.GetServiceStatus",
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


module.exports = new WebstoreRequest();
