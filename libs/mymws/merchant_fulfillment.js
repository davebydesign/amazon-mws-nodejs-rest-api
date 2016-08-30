var 
	AmazonMwsRequest = require('./base_request');

module.exports = class MerchantFulfillmentRequest extends AmazonMwsRequest {
	constructor(creds) {
		super(creds);
		this.query["Version"] = "2015-06-01";
		this.query["SellerId"] = "creds.MerchantId";
		this.path = "/MerchantFulfillment/2015-06-01";
	}

	GetEligibleShippingServices(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetEligibleShippingServices";
		this.setThrottling("GetEligibleShippingServices", 10, 5 * 60 * 60); // five requests every second

		if (this.missingParams(params, ['AmazonOrderId', 'ItemList', 'ShipFromAddress', 'PackageDimensions', 'Weight', 'ShippingServiceOptions'])) 
		return deferred.reject(this.paramsError);

		this.query["ShipmentRequestDetails.AmazonOrderId"] = params.AmazonOrderId;
		this.mapComplexList(params.ItemList);
		

		if ('SellerOrderId' in params)	this.query["ShipmentRequestDetails.SellerOrderId"] = params.SellerOrderId;

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	CreateShipment(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "CreateShipment";
		this.setThrottling("CreateShipment", 10, 5 * 60 * 60); // five requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetShipment(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetShipment";
		this.setThrottling("GetShipment", 10, 5 * 60 * 60); // five requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	CancelShipment(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "CancelShipment";
		this.setThrottling("CancelShipment", 10, 5 * 60 * 60); // five requests every second

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
				"name" : "MerchantFulfillment.GetServiceStatus",
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
