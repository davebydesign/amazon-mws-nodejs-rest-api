module.exports = {

	"ListFinancialEventGroups" : {
		"title"      : "ListFinancialEventGroups",
		"description": "Returns financial event groups for a given date range.",
		"docs_url"   : "http://docs.developer.amazonservices.com/en_US/finances/Finances_ListFinancialEventGroups.html",
		"throttling" : { 
			"name" : "ListFinancialEventGroups",
			"maxRequestQuota" : 30,
			"hourlyRestoreRate" : 1800	// One request every two seconds
		},

		"type"       : "object",
		"properties" : {

			"MaxResultsPerPage" : {
				"name"        : "MaxResultsPerPage",
				"description" : "The maximum number of results to return per page.",
				"type"        : "number"
			},

			"FinancialEventGroupStartedAfter" : {
				"name"        : "FinancialEventGroupStartedAfter",
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
		"required" : ["FinancialEventGroupStartedAfter"]
	},


	"ListFinancialEventGroupsByNextToken" : {
		"title"      : "ListFinancialEventGroupsByNextToken",
		"description": "Returns the next page of financial event groups using the NextToken parameter.",
		"docs_url"   : "http://docs.developer.amazonservices.com/en_US/finances/Finances_ListFinancialEventGroupsByNextToken.html",
		"throttling" : { 
			"name" : "ListFinancialEventGroupsByNextToken",
			"maxRequestQuota" : 30,
			"hourlyRestoreRate" : 1800	// One request every two seconds
		},
		"type"       : "object",
		"properties" : {
			"NextToken" : {
				"name"        : "NextToken",
				"description" : "A string token returned in the response of your previous request to either ListFinancialEventGroups or ListFinancialEventGroupsByNextToken.",
				"type"        : "string",
			}
		},
		"additionalProperties" : false,
		"required" : ["NextToken"]
	},


	"ListFinancialEvents" : {
		"title"      : "ListFinancialEvents",
		"description": "Returns financial events for a given order, financial event group, or date range.",
		"docs_url"   : "http://docs.developer.amazonservices.com/en_US/finances/Finances_ListFinancialEvents.html",
		"throttling" : { 
			"name" : "ListFinancialEvents",
			"maxRequestQuota" : 30,
			"hourlyRestoreRate" : 1800	// One request every two seconds
		},
		"type"       : "object",
		"properties" : {
			"MaxResultsPerPage" : {
				"name"        : "MaxResultsPerPage",
				"description" : "The maximum number of results to return per page.",
				"type"        : "number"
			},

			"AmazonOrderId" : {
				"name"        : "AmazonOrderId",
				"description" : "The identifier of the order for which you want to obtain all financial events.",
				"type"        : "string"
			},

			"FinancialEventGroupId" : {
				"name"        : "FinancialEventGroupId",
				"description" : "The identifier of the financial event group for which you want to obtain all financial events.",
				"type"        : "string"
			},

			"PostedAfter" : {
				"name"        : "PostedAfter",
				"description" : "A date used for selecting financial events posted after (or at) a specified time.",
				"type"        : "datetime"
			},

			"PostedBefore" : {
				"name"        : "PostedBefore",
				"description" : "A date used for selecting financial events posted before (but not at) a specified time.",
				"type"        : "datetime"
			}				

		},
		"additionalProperties" : false,
		"required" : []
	},


	"ListFinancialEventsByNextToken" : {
		"title"      : "ListFinancialEventsByNextToken",
		"description": "Returns the next page of financial events using the NextToken parameter.",
		"docs_url"   : "http://docs.developer.amazonservices.com/en_US/finances/Finances_ListFinancialEventsByNextToken.html",
		"throttling" : { 
			"name" : "ListFinancialEventsByNextToken",
			"maxRequestQuota" : 30,
			"hourlyRestoreRate" : 1800	// One request every two seconds
		},
		"type"       : "object",
		"properties" : {
			"NextToken" : {
				"name"        : "NextToken",
				"description" : "A string token returned in the response of your previous request to either ListFinancialEvents or ListFinancialEventsByNextToken.",
				"type"        : "string",
			}
		},
		"additionalProperties" : false,
		"required" : ["NextToken"]
	},


	"GetServiceStatus" : {
		"title"      : "GetServiceStatus",
		"description": "Returns the operational status of the Finances API section.",
		"docs_url"   : "http://docs.developer.amazonservices.com/en_US/finances/Finances_GetServiceStatus.html",
		"throttling" : { 
			"name" : "Finances.GetServiceStatus",
			"maxRequestQuota" : 2,
			"hourlyRestoreRate" : 12	// one request every five minutes
		},
		"type"       : "object",
		"properties" : { },
		"additionalProperties" : false
	}


}; 