var 
	AmazonMwsRequest = require('./base_request');


class CustomerInformationRequest extends AmazonMwsRequest {
	constructor() {
		super();
		this.query.Version  = "2014-03-01";
		this.query.SellerId = process.env.MWS_MerchantId;
		this.path           = "/CustomerInformation";
	}

	ListCustomers(params) {
		this.requestSchema = {
			"title"      : "ListCustomers",
			"throttling" : { 
				"name" : "ListCustomers",
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
				},

				"DateRangeType" : {
					"name" : 'DateRangeType',
					"type" : "string",
					"enum" : [ 
						"AssociatedDate",
						"LastUpdatedDate"
					]				
				}
			},
			additionalProperties : false
		};		

		return this.invoke(params, (result)=>{
			if (this.detectResponseError(result)) return this.deferred.reject(this.responseError);		
			this.deferred.fulfill(result);			
		});		
	}

	ListCustomersByNextToken(params) {
		this.requestSchema = {
			"title"      : "ListCustomersByNextToken",
			"throttling" : { 
				"name" : "ListCustomersByNextToken",
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

	GetCustomersForCustomerId(params) {

		this.requestSchema = {
			"title"      : "GetCustomersForCustomerId",
			"throttling" : { 
				"name" : "GetCustomersForCustomerId",
				"maxRequestQuota" : 50,
				"hourlyRestoreRate" : 20 * 60	// 20 requests every minute
			},

			"type"       : "object",
			"properties" : {

				"MarketplaceId" : {
					"name"        : 'MarketplaceId',
					"description" : "",
					"type"        : "string"
				},

				"CustomerIdList" : {
					"name"        : 'CustomerIdList.CustomerId',
					"description" : "",
					"type"        : "array",
					"maxItems"    : 20,
					"items"       : {
						"type" : "string"
					}
				}
			},
			additionalProperties : false,
			required : ['CustomerIdList']
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
				"name" : "CustomerInfo.GetServiceStatus",
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

module.exports = new CustomerInformationRequest();
