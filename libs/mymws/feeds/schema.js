module.exports = {

	"SubmitFeed" : {
		"title"      : "SubmitFeed",
		"description": "Uploads a feed for processing by Amazon MWS.",
		"docs_url"   : "http://docs.developer.amazonservices.com/en_US/feeds/Feeds_SubmitFeed.html",
		"throttling" : { 
			"name"             : "SubmitFeed",
			"maxRequestQuota"  : 15,
			"hourlyRestoreRate": 30	// One request every two minutes
		},
		"type"       : "object",
		"properties" : {
			"FeedContent" : {
				"name"        : "FeedContent",
				"description" : "The actual content of the feed itself, in XML or flat file format. You must include the FeedContent in the body of the HTTP request.",
				"type"        : "string"
			},

			"FeedType" : {
				"name"        : "FeedType",
				"description" : "A FeedType value indicating how the data should be processed.",
				"type"        : "string",
				"$ref"        : "/FeedType"
			},

			"MarketplaceIdList" : {
				"name"        : 'MarketplaceIdList.Id',
				"description" : "A list of one or more marketplace IDs (of marketplaces you are registered to sell in) that you want the feed to be applied to. The feed will be applied to all the marketplaces you specify.",
				"type"        : "array",
				"items"       : {
					"type" : "string"
				}
			},

			"PurgeAndReplace" : {
				"name"        : "PurgeAndReplace",
				"description" : "A Boolean value that enables the purge and replace functionality. Set to true to purge and replace the existing data; otherwise false. This value only applies to product-related flat file feed types, which do not have a mechanism for specifying purge and replace in the feed body. Use this parameter only in exceptional cases. Usage is throttled to allow only one purge and replace within a 24-hour period.",
				"type"        : "boolean",	
			}
		},
		"additionalProperties" : false,
		"required" : ["FeedContent", "FeedType"]
	},



	"GetFeedSubmissionList" : {
		"title"      : "GetFeedSubmissionList",
		"description": "Returns a list of all feed submissions submitted in the previous 90 days.",
		"docs_url"   : "http://docs.developer.amazonservices.com/en_US/feeds/Feeds_GetFeedSubmissionList.html",
		"throttling" : { 
			"name"             : "GetFeedSubmissionList",
			"maxRequestQuota"  : 10,
			"hourlyRestoreRate": 80	// One request every 45 seconds
		},
		"type"       : "object",
		"properties" : {			
			"FeedSubmissionIdList" : {
				"name"        : "FeedSubmissionIdList.Id",
				"description" : "A structured list of no more than 100 FeedSubmmissionId values. If you pass in FeedSubmmissionId values in a request, other query conditions are ignored.",
				"type"        : "array",
				"maxItems"    : 100,
				"items"       : {
					"type" : "string"
				}
			},
			"MaxCount" : {
				"name"        : "MaxCount",
				"description" : "A non-negative integer that indicates the maximum number of feed submissions to return in the list. If you specify a number greater than 100, the request is rejected.",
				"type"        : "number",
				"minimum"     : 1,
				"maximum"     : 100
			},
			
			"FeedTypeList" : {
				"name"        : "FeedTypeList.Type",
				"description" : "A structured list of one or more FeedType values by which to filter the list of feed submissions.",
				"type"        : "array",
				"items"       : {
					"$ref": "/FeedType"
				}
			},

			"FeedProcessingStatusList" : {
				"name"        : "FeedProcessingStatusList.Status",
				"description" : "A structured list of one or more feed processing statuses by which to filter the list of feed submissions.",
				"type"        : "array",
				"items"       : {
					"$ref": "/FeedProcessingStatus"
				}
			},

			"SubmittedFromDate" : {
				"name"       : "SubmittedFromDate",
				"description": "The earliest submission date that you are looking for.",
				"type"       : "datetime" 
			},

			"SubmittedToDate" : {
				"name"       : "SubmittedFromDate",
				"description": "The latest submission date that you are looking for.",
				"type"       : "datetime"
			}
		},
		"additionalProperties" : false
	},

	"GetFeedSubmissionListByNextToken" : {
		"title"      : "GetFeedSubmissionListByNextToken",
		"description": "Returns a list of feed submissions using the NextToken parameter.",
		"docs_url"   : "http://docs.developer.amazonservices.com/en_US/feeds/Feeds_GetFeedSubmissionListByNextToken.html",
		"throttling" : { 
			"name"             : "GetFeedSubmissionListByNextToken",
			"maxRequestQuota"  : 30,
			"hourlyRestoreRate": 1800	// One request every two seconds
		},
		"type"       : "object",
		"properties" : {
			"NextToken" : {
				"name"        : "NextToken",
				"description" : "A string token returned by a previous request to either GetFeedSubmissionList or GetFeedSubmissionListByNextToken where the value of HasNext was true.",
				"type"        : "string",
			}
		},
		"additionalProperties" : false,
		"required" : ["NextToken"]
	},

	"GetFeedSubmissionCount" : {
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	},

	"CancelFeedSubmissions" : {
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	},

	"GetFeedSubmissionResult" : {
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	}

}; 