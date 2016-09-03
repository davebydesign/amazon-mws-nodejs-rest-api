var 
	AmazonMwsRequest = require('./base_request');

class FinancesRequestCall extends AmazonMwsRequest {
	constructor() {
		super();
		this.query.Version = "2015-05-01";
		this.query.SellerId = process.env.MWS_MerchantId;
		this.path = "/Finances/2015-05-01";
	}
}



class FinancesRequest {
	constructor() {}


	ListFinancialEventGroups(params) {

		let Call = new FinancesRequestCall();

		Call.requestSchema = {
			"title"      : "ListFinancialEventGroups",
			"throttling" : { 
				"name" : "ListFinancialEventGroups",
				"maxRequestQuota" : 30,
				"hourlyRestoreRate" : 1800	// One request every two seconds
			},

			"type"       : "object",
			"properties" : {

				"MaxResultsPerPage" : {
					"name"        : 'MaxResultsPerPage',
					"description" : "The maximum number of results to return per page.",
					"type"        : "number"
				},

				"FinancialEventGroupStartedAfter" : {
					"name"        : 'FinancialEventGroupStartedAfter',
					"description" : "A date used for selecting financial event groups that opened after (or at) a specified time.",
					"type"        : "datetime"
				},

				"FinancialEventGroupStartedBefore" : {
					"name"        : 'FinancialEventGroupStartedBefore',
					"description" : "A date used for selecting financial event groups that opened before (but not at) a specified time.",
					"type"        : "datetime"
				}				

			},
			"additionalProperties" : false,
			"required" : ['FinancialEventGroupStartedAfter']
		};

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);
			Call.deferred.fulfill(result);
		});
	}







	ListFinancialEventGroupsByNextToken(params) {

		let Call = new FinancesRequestCall();

		Call.requestSchema = {
			"title"      : "ListFinancialEventGroupsByNextToken",
			"throttling" : { 
				"name" : "ListFinancialEventGroupsByNextToken",
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

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);
			Call.deferred.fulfill(result);
		});
	}






	ListFinancialEvents(params) {
		let Call = new FinancesRequestCall();	
		
		Call.requestSchema = {
			"title"      : "ListFinancialEvents",
			"throttling" : { 
				"name" : "ListFinancialEvents",
				"maxRequestQuota" : 30,
				"hourlyRestoreRate" : 1800	// One request every two seconds
			},

			"type"       : "object",
			"properties" : {

				"MaxResultsPerPage" : {
					"name"        : 'MaxResultsPerPage',
					"description" : "The maximum number of results to return per page.",
					"type"        : "number"
				},

				"AmazonOrderId" : {
					"name"        : 'AmazonOrderId',
					"description" : "The identifier of the order for which you want to obtain all financial events.",
					"type"        : "string"
				},

				"FinancialEventGroupId" : {
					"name"        : 'FinancialEventGroupId',
					"description" : "The identifier of the financial event group for which you want to obtain all financial events.",
					"type"        : "string"
				},

				"PostedAfter" : {
					"name"        : 'PostedAfter',
					"description" : "A date used for selecting financial events posted after (or at) a specified time.",
					"type"        : "datetime"
				},

				"PostedBefore" : {
					"name"        : 'PostedBefore',
					"description" : "A date used for selecting financial events posted before (but not at) a specified time.",
					"type"        : "datetime"
				}				

			},
			"additionalProperties" : false,
			"required" : []
		};


		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);
			Call.deferred.fulfill(result);
		});
	}

	ListFinancialEventsByNextToken(params) {
		let Call = new FinancesRequestCall();	

		Call.requestSchema = {
			"title"      : "ListFinancialEventsByNextToken",
			"throttling" : { 
				"name" : "ListFinancialEventsByNextToken",
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

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);
			Call.deferred.fulfill(result);
		});
	}

	GetServiceStatus(params) {
		let Call = new FinancesRequestCall();	
		
		Call.requestSchema = {
			"title"      : "GetServiceStatus",
			"throttling" : { 
				"name" : "Finances.GetServiceStatus",
				"maxRequestQuota" : 2,
				"hourlyRestoreRate" : 12	// one request every five minutes
			},

			"type"       : "object",
			"properties" : {


			},
			additionalProperties : false

		};
		
		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);
			Call.deferred.fulfill(result);
		});
	}

}


module.exports = new FinancesRequest();
