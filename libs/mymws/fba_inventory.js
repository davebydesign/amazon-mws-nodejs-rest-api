var 
	AmazonMwsRequest = require('./base_request');

module.exports = class FulfillmentInventoryRequest extends AmazonMwsRequest {
	constructor() {
		super();
		this.query.Version  = "2010-10-01";
		this.query.SellerId = process.env.MWS_MerchantId;
		this.path           = "/FulfillmentInventory/2010-10-01";
	}

	ListInventorySupply(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ListInventorySupply";
		this.setThrottling("ListInventorySupply", 30, 2 * 60 * 60); // two requests every second

		if ('SellerSkus'			in params)  	this.listify.set('SellerSkus.member', params.SellerSkus);
		if ('QueryStartDateTime'	in params)		this.query["QueryStartDateTime"] = new Date(params.QueryStartDateTime);
		if ('ResponseGroup'			in params)		this.query["ResponseGroup"] =  params.ResponseGroup;
		if ('MarketplaceId'			in params)		this.query["MarketplaceId"] = params.MarketplaceId;

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListInventorySupplyByNextToken(params) {
		this.requestSchema = {
			"title"      : "ListInventorySupplyByNextToken",
			"throttling" : { 
				"name" : "ListInventorySupply",
				"maxRequestQuota" : 30,
				"hourlyRestoreRate" : 2 * 60 * 60	// two requests every second
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
				"name" : "FulfillmentInventory.GetServiceStatus",
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