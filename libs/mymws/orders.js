var 
	AmazonMwsRequest = require('./base_request');




class OrdersRequest extends AmazonMwsRequest {
	constructor() {
		super();
		this.query.Version = "2013-09-01";
		this.query.SellerId = process.env.MWS_MerchantId;
		this.path = "/Orders/2013-09-01";
	}

	ListOrders(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ListOrders";
		this.setThrottling("ListOrders", 6, 60); // one request every minute

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListOrdersByNextToken(params) {

		this.requestSchema = {
			"title"      : "ListOrdersByNextToken",
			"throttling" : { 
				"name" : "ListOrders",
				"maxRequestQuota" : 6,
				"hourlyRestoreRate" : 60	// one request every minute
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

	GetOrder(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetOrder";
		this.setThrottling("GetOrder", 6, 60); // one request every minute

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListOrderItems(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ListOrderItems";
		this.setThrottling("ListOrderItems", 30, 1800); // One request every two seconds

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListOrderItemsByNextToken(params) {
		this.requestSchema = {
			"title"      : "ListOrderItemsByNextToken",
			"throttling" : { 
				"name" : "ListOrderItems",
				"maxRequestQuota" : 30,
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
				"name" : "Orders.GetServiceStatus",
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


module.exports = new OrdersRequest();