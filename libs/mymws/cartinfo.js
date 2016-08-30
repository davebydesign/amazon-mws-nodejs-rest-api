var 
	AmazonMwsRequest = require('./base_request');

module.exports = class CartInformationRequest extends AmazonMwsRequest {
	constructor(creds) {
		super(creds);
		this.query["Version"]  = "2014-03-01";
		this.query["SellerId"] = creds.MerchantId;
		this.path              = "/CartInformation";
	}


	ListCarts(params) {
		this.requestSchema = {
			"title"      : "ListCarts",
			"throttling" : { 
				"name" : "ListCarts",
				"maxRequestQuota" : 15,
				"hourlyRestoreRate" : 5 * 60	// five requests every minute
			},

			"type"       : "object",
			"properties" : {

				"MarketplaceId" : {
					"name"        : 'MarketplaceId',
					"description" : "",
					"type"        : "string"
				},

				"DateRangeStart" : {
					"name" : 'DateRangeStart',
					"type" : "datetime"
				},

				"DateRangeEnd" : {
					"name" : 'DateRangeEnd',
					"type" : "datetime"
				}
			},
			additionalProperties : false,
			required : ['DateRangeStart']
		};		

		return this.invoke(params, (result)=>{
			if (this.detectResponseError(result)) return this.deferred.reject(this.responseError);		
			this.deferred.fulfill(result);			
		});		
	}


	ListCartsByNextToken(params) {
		this.requestSchema = {
			"title"      : "ListCartsByNextToken",
			"throttling" : { 
				"name" : "ListCartsByNextToken",
				"maxRequestQuota" : 50,
				"hourlyRestoreRate" : 20 * 60	// 20 requests every minute
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

	GetCarts(params) {

		this.requestSchema = {
			"title"      : "GetCarts",
			"throttling" : { 
				"name" : "GetCarts",
				"maxRequestQuota" : 15,
				"hourlyRestoreRate" : 5 * 60	// 5 requests every minute
			},

			"type"       : "object",
			"properties" : {

				"MarketplaceId" : {
					"name"        : 'MarketplaceId',
					"description" : "",
					"type"        : "string"
				},

				"CartIdList" : {
					"name"        : 'CartIdList.CartId',
					"description" : "",
					"type"        : "array",
					"maxItems"    : 20,
					"items"       : {
						"type" : "string"
					}
				}
			},
			additionalProperties : false,
			required : ['MarketplaceId']
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
				"name" : "CartInfo.GetServiceStatus",
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