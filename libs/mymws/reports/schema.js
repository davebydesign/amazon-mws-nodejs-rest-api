module.exports = {

	RequestReport : {
		"title"      : "RequestReport",
		"throttling" : { 
			"name" : "RequestReport",
			"maxRequestQuota" : 15,
			"hourlyRestoreRate" : 60	// one request every minute
		},

		"type"       : "object",
		"properties" : {

			"ReportType" : {
				"name"        : "ReportType",
				"description" : "A value of the ReportType that indicates the type of report to request.",
				"type"        : "string"
				// See http://docs.developer.amazonservices.com/en_US/reports/Reports_ReportType.html
				// for a list of report types
			},

			"StartDate" : {
				"name"        : "StartDate",
				"description" : "The start of a date range used for selecting the data to report.",
				"type"        : "datetime"
			},

			"EndDate" : {
				"name"        : "EndDate",
				"description" : "The end of a date range used for selecting the data to report.",
				"type"        : "datetime"
			},

			"ReportOptions" : {
				"name"        : "ReportOptions",
				"description" : "Additional information to pass to the report.",
				"type"        : "string"
			},

			"MarketplaceIdList" : {
				"name"        : "MarketplaceIdList.Id",
				"description" : "A list of one or more marketplace IDs for the marketplaces you are registered to sell in.",
				// The resulting report will include information for all marketplaces you specify. 
				// For more information about the behavior of reports when submitting multiple MarketplaceId values, 
				// see http://docs.developer.amazonservices.com/en_US/reports/Reports_UsingMultipleMarketplaces.html
				"type"        : "array",
				"items"       : {
					"type" : "string"
				}
			}
		},
		additionalProperties : false,
		required : ["ReportType"]
	},


	GetReportRequestList : { 
		"title"      : "GetReportRequestList",
		"throttling" : { 
			"name" : "GetReportRequestList",
			"maxRequestQuota" : 10,
			"hourlyRestoreRate" : 80	// one request every 45 seconds
		},

		"type"       : "object",
		"properties" : {

			"ReportRequestIdList" : {
				"name"        : "ReportRequestIdList.Id",
				"description" : "A structured list of ReportRequestId values. If you pass in ReportRequestId values, other query conditions are ignored.",
				"type"        : "array",
				"items"       : {
					"type" : "string"
				}
			},

			"ReportTypeList" : {
				"name"        : "ReportTypeList.Type",
				"description" : "A structured list of ReportType enumeration values.",
				"type"        : "array",
				"items"       : {
					"type" : "string"
				}
			},

			"ReportProcessingStatusList" : {
				"name"        : "ReportProcessingStatusList.Status",
				"description" : "A structured list of report processing statuses by which to filter report requests.",
				"type"        : "array",
				"items"       : {
					"type" : "string",
					"enum" : [
						"_SUBMITTED_",
						"_IN_PROGRESS_",
						"_CANCELLED_",
						"_DONE_",
						"_DONE_NO_DATA_"
					]
				}
			},

			"MaxCount" : {
				"name" : "MaxCount",
				type : "number"
			},				

			"RequestedFromDate" : {
				"name"        : "RequestedFromDate",
				"description" : "The start of the date range used for selecting the data to report",
				"type"        : "datetime"
			},

			"RequestedToDate" : {
				"name"        : "RequestedToDate",
				"description" : "The end of the date range used for selecting the data to report",
				"type"        : "datetime"
			}
		},
		additionalProperties : false,
		required : []
	},


	GetReportRequestListByNextToken : {
		"title"      : "GetReportRequestListByNextToken",
		"throttling" : { 
			"name" : "GetReportRequestListByNextToken",
			"maxRequestQuota" : 30,
			"hourlyRestoreRate" : 1800	// One request every two seconds
		},

		"type"       : "object",
		"properties" : {

			"NextToken" : {
				"name"        : 'NextToken',
				"description" : "",
				"type"        : "string"
			}


		},
		"additionalProperties" : false,
		"required" : ['NextToken']
	},


	GetReportRequestCount : {
		"title"      : "GetReportRequestCount",
		"throttling" : { 
			"name" : "GetReportRequestCount",
			"maxRequestQuota" : 10,
			"hourlyRestoreRate" : 80	// one request every 45 seconds
		},

		"type"       : "object",
		"properties" : {

			"ReportTypeList" : {
				"name"        : "ReportTypeList.Type",
				"description" : "A structured list of ReportType enumeration values.",
				"type"        : "array",
				"items"       : {
					"type" : "string"
				}
			},

			"ReportProcessingStatusList" : {
				"name"        : "ReportProcessingStatusList.Status",
				"description" : "A structured list of report processing statuses by which to filter report requests.",
				"type"        : "array",
				"items"       : {
					"type" : "string",
					"enum" : [
						"_SUBMITTED_",
						"_IN_PROGRESS_",
						"_CANCELLED_",
						"_DONE_",
						"_DONE_NO_DATA_"
					]
				}
			},				

			"RequestedFromDate" : {
				"name"        : "RequestedFromDate",
				"description" : "The start of the date range used for selecting the data to report",
				"type"        : "datetime"
			},

			"RequestedToDate" : {
				"name"        : "RequestedToDate",
				"description" : "The end of the date range used for selecting the data to report",
				"type"        : "datetime"
			}
		},
		additionalProperties : false,
		required : []
	},


	CancelReportRequests : {
		"title"      : "CancelReportRequests",
		"throttling" : { 
			"name" : "CancelReportRequests",
			"maxRequestQuota" : 10,
			"hourlyRestoreRate" : 80	// one request every 45 seconds
		},

		"type"       : "object",
		"properties" : {

			"ReportRequestIdList" : {
				"name"        : "ReportRequestIdList.Id",
				"description" : "A structured list of ReportRequestId values. If you pass in ReportRequestId values, other query conditions are ignored.",
				"type"        : "array",
				"items"       : {
					"type" : "string"
				}
			},

			"ReportTypeList" : {
				"name"        : "ReportTypeList.Type",
				"description" : "A structured list of ReportType enumeration values.",
				"type"        : "array",
				"items"       : {
					"type" : "string"
				}
			},

			"ReportProcessingStatusList" : {
				"name"        : "ReportProcessingStatusList.Status",
				"description" : "A structured list of report processing statuses by which to filter report requests.",
				"type"        : "array",
				"items"       : {
					"type" : "string",
					"enum" : [
						"_SUBMITTED_",
						"_IN_PROGRESS_",
						"_CANCELLED_",
						"_DONE_",
						"_DONE_NO_DATA_"
					]
				}
			},				

			"RequestedFromDate" : {
				"name"        : "RequestedFromDate",
				"description" : "The start of the date range used for selecting the data to report",
				"type"        : "datetime"
			},

			"RequestedToDate" : {
				"name"        : "RequestedToDate",
				"description" : "The end of the date range used for selecting the data to report",
				"type"        : "datetime"
			}
		},
		additionalProperties : false,
		required : []
	},


	GetReportList : {
		"title"      : "GetReportList",
		"throttling" : { 
			"name" : "GetReportList",
			"maxRequestQuota" : 10,
			"hourlyRestoreRate" : 60	// one request every minute
		},

		"type"       : "object",
		"properties" : {

			"MaxCount" : {
				"name" : "MaxCount",
				type : "number"
			},

			"ReportTypeList" : {
				"name"        : "ReportTypeList.Type",
				"description" : "A structured list of ReportType enumeration values.",
				"type"        : "array",
				"items"       : {
					"type" : "string"
				}
			},

			"Acknowledged" : {
				"name" : "Acknowledged",
				"description" : "A Boolean value that indicates if an order report has been acknowledged by a prior call to UpdateReportAcknowledgements.",
				// Set to true to list order reports that have been acknowledged; set to false to list order reports that have not been acknowledged. 
				// This filter is valid only with order reports; it does not work with listing reports."
				"type" : "boolean"
			},
					
			"AvailableFromDate" : {
				"name"        : "AvailableFromDate",
				"description" : "The earliest date you are looking for",
				"type"        : "datetime"
			},

			"AvailableToDate" : {
				"name"        : "AvailableToDate",
				"description" : "The most recent date you are looking for",
				"type"        : "datetime"
			},


			"ReportRequestIdList" : {
				"name"        : "ReportRequestIdList.Id",
				"description" : "A structured list of ReportRequestId values. If you pass in ReportRequestId values, other query conditions are ignored.",
				"type"        : "array",
				"items"       : {
					"type" : "string"
				}
			}				

		},
		additionalProperties : false,
		required : []
	},


	GetReportListByNextToken : {
		"title"      : "GetReportListByNextToken",
		"throttling" : { 
			"name" : "GetReportListByNextToken",
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


	GetReportCount : {
		"title"      : "GetReportCount",
		"throttling" : { 
			"name" : "GetReportCount",
			"maxRequestQuota" : 10,
			"hourlyRestoreRate" : 80	// one request every 45 seconds
		},
		"type"       : "object",
		"properties" : {
			"ReportTypeList" : {
				"name"        : "ReportTypeList.Type",
				"description" : "A structured list of ReportType enumeration values.",
				"type"        : "array",
				"items"       : {
					"type" : "string"
				}
			},
			"Acknowledged" : {
				"name" : "Acknowledged",
				"description" : "A Boolean value that indicates if an order report has been acknowledged by a prior call to UpdateReportAcknowledgements.",
				// Set to true to list order reports that have been acknowledged; set to false to list order reports that have not been acknowledged. 
				// This filter is valid only with order reports; it does not work with listing reports."
				"type" : "boolean"
			},					
			"AvailableFromDate" : {
				"name"        : "AvailableFromDate",
				"description" : "The earliest date you are looking for",
				"type"        : "datetime"
			},
			"AvailableToDate" : {
				"name"        : "AvailableToDate",
				"description" : "The most recent date you are looking for",
				"type"        : "datetime"
			}		
		},
		additionalProperties : false,
		required : []
	},


	GetReport : {
		"title"      : "GetReport",
		"throttling" : { 
			"name" : "GetReport",
			"maxRequestQuota" : 10,
			"hourlyRestoreRate" : 60	// One request every minute
		},

		"type"       : "object",
		"properties" : {
			"ReportId" : {
				"name"        : 'ReportId',
				"description" : "",
				"type"        : "string",
			}
		},
		additionalProperties : false,
		required : ['ReportId']
	},


	ManageReportSchedule : {
		"title"      : "ManageReportSchedule",
		"throttling" : { 
			"name" : "ManageReportSchedule",
			"maxRequestQuota" : 10,
			"hourlyRestoreRate" : 80	// One request every 45 seconds
		},

		"type"       : "object",
		"properties" : {

			"ReportType" : {
				"name"        : 'ReportType',
				"description" : "A value of the ReportType that indicates the type of report to request.",
				"type"        : "string"
			},

			"Schedule" : {
				"name"        : 'Schedule',
				"description" : "A value of the Schedule that indicates how often a report request should be created.",
				"type"        : "string"
			},

			"ScheduleDate" : {
				"name"        : 'ScheduleDate',
				"description" : "The date when the next report request is scheduled to be submitted.",
				"type"        : "datetime"
			}
		},
		additionalProperties : false,
		required : ['ReportType', 'Schedule']
	},


	GetReportScheduleList : {
		"title"      : "GetReportScheduleList",
		"throttling" : { 
			"name" : "GetReportScheduleList",
			"maxRequestQuota" : 10,
			"hourlyRestoreRate" : 80	// One request every 45 seconds
		},

		"type"       : "object",
		"properties" : {

			"ReportTypeList" : {
				"name"        : "ReportTypeList.Type",
				"description" : "A structured list of ReportType enumeration values.",
				"type"        : "array",
				"items"       : {
					"type" : "string"
				}
			}
		},
		additionalProperties : false,
		required : []
	},


	GetReportScheduleCount : {
		"title"      : "GetReportScheduleCount",
		"throttling" : { 
			"name" : "GetReportScheduleCount",
			"maxRequestQuota" : 10,
			"hourlyRestoreRate" : 80	// One request every 45 seconds
		},
		"type"       : "object",
		"properties" : {
			"ReportTypeList" : {
				"name"        : "ReportTypeList.Type",
				"description" : "A structured list of ReportType enumeration values.",
				"type"        : "array",
				"items"       : {
					"type" : "string"
				}
			}
		},
		additionalProperties : false,
		required : []
	},


	UpdateReportAcknowledgements : {
		"title"      : "UpdateReportAcknowledgements",
		"throttling" : { 
			"name" : "UpdateReportAcknowledgements",
			"maxRequestQuota" : 10,
			"hourlyRestoreRate" : 80	// One request every 45 seconds
		},

		"type"       : "object",
		"properties" : {

			"ReportIdList" : {
				"name"        : "ReportIdList.Id",
				"description" : "A structured list of ReportType enumeration values.",
				"type"        : "array",
				"items"       : {
					"type" : "string"
				}
			},

			"Acknowledged" : {
				"name" : "Acknowledged",
				"description" : "A Boolean value that indicates that you have received and stored a report.",
				// Specify true to set the acknowledged status of a report to true.  
				// Specify false to set the acknowledged status of a report to false.
				"type" : "boolean"
			},

		},
		additionalProperties : false,
		required : []
	}




}; 