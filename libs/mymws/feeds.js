var 
	AmazonMwsRequest = require('./base_request');

module.exports = class FeedsRequest extends AmazonMwsRequest {

	constructor(creds) {
		super(creds);
		this.version          = "2009-01-01";
		this.sellerOrMerchant = "Seller";
		this.path             = "/";
	}

	SubmitFeed(params) {
		this.upload = true;
		this.httpBody = params.FeedContent;

		this.requestSchema = {
			"title"      : "SubmitFeed",
			"throttling" : { 
				"name" : "SubmitFeed",
				"maxRequestQuota" : 15,
				"hourlyRestoreRate" : 30	// One request every two minutes
			},

			"type"       : "object",
			"properties" : {

				"FeedContent" : {
					"name"        : 'FeedContent',
					"description" : "",
					"type"        : "string"
				},

				"FeedType" : {
					"name"        : 'FeedType',
					"description" : "",
					"type"        : "string",
					"$ref"        : "/FeedTypes"
				},

				"MarketplaceIdList" : {
					"name"        : 'MarketplaceIdList.Id',
					"description" : "",
					"type"        : "array",
					"items"       : {
						"type" : "string"
					}
				},

				"PurgeAndReplace" : {
					"name"        : 'PurgeAndReplace',
					"type"        : "boolean",	
				}
			},
			additionalProperties : false,
			required : ['FeedContent', 'FeedType']
		};		

		return this.invoke(params, (result)=>{
			if (this.detectResponseError(result)) return this.deferred.reject(this.responseError);		
			this.deferred.fulfill(result);			
		});
	}







	GetFeedSubmissionList(params) {

		this.requestSchema = {

			"title"      : "GetFeedSubmissionList",
			"throttling" : { 
				"name" : "GetFeedSubmissionList",
				"maxRequestQuota" : 10,
				"hourlyRestoreRate" : 80	// One request every 45 seconds
			},

			"type"       : "object",
			"properties" : {
				
				"FeedSubmissionIdList" : {
					"name"        : 'FeedSubmissionIdList.Id',
					"description" : "",
					"type"        : "array",
					"maxItems"    : 100,
					"items"       : {
						"type" : "string"
					}
				},

				"MaxCount" : {
					"name"        : 'MaxCount',
					"description" : "",
					"type"        : "number",
					"minimum"     : 1,
					"maximum"     : 100
				},
				
				"FeedTypeList" : {
					"name"        : 'FeedTypeList.Type',
					"description" : "",
					"type"        : "array",
					"items"       : {
						"$ref": "/FeedTypes"
					}
				},

				"FeedProcessingStatusList" : {
					"name"        : 'FeedProcessingStatusList.Status',
					"description" : "",
					"type"        : "array",
					"items"       : {
						"$ref": "/FeedProcessingStatuses"
					}
				},

				"SubmittedFromDate" : {
					"name" : 'SubmittedFromDate',
					"type" : "datetime"
				},

				"SubmittedToDate" : {
					"name" : 'SubmittedFromDate',
					"type" : "datetime"
				}
			},
			additionalProperties : false
		};


		return this.invoke(params, (result)=>{
			if (this.detectResponseError(result)) return this.deferred.reject(this.responseError);		
			this.deferred.fulfill(result);			
		});

	}



	GetFeedSubmissionListByNextToken(params) {

		this.requestSchema = {
			"title"      : "GetFeedSubmissionListByNextToken",
			"throttling" : { 
				"name" : "GetFeedSubmissionListByNextToken",
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

	GetFeedSubmissionCount(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetFeedSubmissionCount";
		this.setThrottling("GetFeedSubmissionCount", 10, 80); // One request every 45 seconds

		if ('FeedTypeList' in params)				this.listify('FeedTypeList.Type', params.FeedTypeList);
		if ('FeedProcessingStatusList' in params)	this.listify('FeedProcessingStatusList.Status', params.FeedProcessingStatusList);
		if ('SubmittedFromDate' in params)			this.query["SubmittedFromDate"] = new Date(params.SubmittedFromDate);
		if ('SubmittedToDate' in params)			this.query["SubmittedToDate"] = new Date(params.SubmittedToDate);		

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;		
	}

	CancelFeedSubmissions(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "CancelFeedSubmissions";
		this.setThrottling("CancelFeedSubmissions", 10, 80); // One request every 45 seconds

		if ('FeedSubmissionIdListt' in params)	this.listify('FeedSubmissionIdList.Id', params.FeedSubmissionIdList);
		if ('FeedTypeListt' in params)			this.listify('FeedTypeList.Type', params.FeedTypeList);
		if ('SubmittedFromDate' in params)		this.query["SubmittedFromDate"] = new Date(params.SubmittedFromDate);
		if ('SubmittedToDate' in params)		this.query["SubmittedToDate"] = new Date(params.SubmittedToDate);

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetFeedSubmissionResult(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetFeedSubmissionResult";
		this.setThrottling("GetFeedSubmissionResult", 15, 60); // One request every minute

		if (this.missingParams(params, ['FeedSubmissionId']))
		return deferred.reject(this.paramsError);

		this.query["FeedSubmissionId"] = params.FeedSubmissionId;
		
		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}
}

