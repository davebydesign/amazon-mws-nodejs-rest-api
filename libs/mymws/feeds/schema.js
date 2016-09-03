module.exports = {

	SubmitFeed : {
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
	},



	GetFeedSubmissionList : {
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
	},

	GetFeedSubmissionListByNextToken : {
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
	},

	GetFeedSubmissionCount : {

	},

	CancelFeedSubmissions : {

	},

	GetFeedSubmissionResult : {

	}

}; 