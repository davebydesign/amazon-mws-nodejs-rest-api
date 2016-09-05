module.exports = {

	ListFinancialEventGroups : {
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
	},


	ListFinancialEventGroupsByNextToken : {
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
	},


	ListFinancialEvents : {
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
	},


	ListFinancialEventsByNextToken : {
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
	},


	GetServiceStatus : {
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
		}


}; 