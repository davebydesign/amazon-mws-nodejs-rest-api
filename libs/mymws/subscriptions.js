var 
	AmazonMwsRequest = require('./base_request');

module.exports = class SubscriptionsRequest extends AmazonMwsRequest {
	constructor(creds) {
		super(creds);
		this.query["Version"] = "2013-07-01";
		this.query["SellerId"] = creds.MerchantId;
		this.path = "/Subscriptions/2013-07-01";
	}

	RegisterDestination(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "RegisterDestination";
		this.setThrottling("RegisterDestination", 25, 2 * 60 * 60); // two requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	DeregisterDestination(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "DeregisterDestination";
		this.setThrottling("DeregisterDestination", 25, 2 * 60 * 60); // two requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListRegisteredDestinations(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ListRegisteredDestinations";
		this.setThrottling("ListRegisteredDestinations", 25, 2 * 60 * 60); // two requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	SendTestNotificationToDestination(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "SendTestNotificationToDestination";
		this.setThrottling("SendTestNotificationToDestination", 25, 2 * 60 * 60); // two requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	CreateSubscription(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "CreateSubscription";
		this.setThrottling("CreateSubscription", 25, 2 * 60 * 60); // two requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetSubscription(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetSubscription";
		this.setThrottling("GetSubscription", 25, 2 * 60 * 60); // two requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	DeleteSubscription(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "DeleteSubscription";
		this.setThrottling("DeleteSubscription", 25, 2 * 60 * 60); // two requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListSubscriptions(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ListSubscriptions";
		this.setThrottling("ListSubscriptions", 25, 2 * 60 * 60); // two requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	UpdateSubscription(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "UpdateSubscription";
		this.setThrottling("UpdateSubscription", 25, 2 * 60 * 60); // two requests every second

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
				"name" : "Subscriptions.GetServiceStatus",
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
