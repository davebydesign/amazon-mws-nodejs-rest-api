var AmazonMwsParentRequest = require('../parent-request-class');

class RequestCall extends AmazonMwsParentRequest {
	constructor(CallName, Params) {
		super({
			Version          : "2009-01-01",
			SellerOrMerchant : "Merchant",
			Path             : "/",
			Parser           : require('./parser'),
			SubSchemas       : require('./subschemas.js'),
			MainSchema       : require('./schema.js'),
			CallName         : CallName,
			Params           : Params
		});
		return this.ExecuteRequest();
	}
}


class ReportsRequest  {
	RequestReport					(params) { return new RequestCall('RequestReport', 						params); }
	GetReportRequestList			(params) { return new RequestCall('GetReportRequestList', 				params); }
	GetReportRequestListByNextToken	(params) { return new RequestCall('GetReportRequestListByNextToken',	params); }
	GetReportRequestCount			(params) { return new RequestCall('GetReportRequestCount', 				params); }
	CancelReportRequests			(params) { return new RequestCall('CancelReportRequests', 				params); }
	GetReportList					(params) { return new RequestCall('GetReportList', 						params); }
	GetReportListByNextToken		(params) { return new RequestCall('GetReportListByNextToken', 			params); }
	GetReportCount					(params) { return new RequestCall('GetReportCount', 					params); }
	GetReport						(params) { return new RequestCall('GetReport', 							params); }
	ManageReportSchedule			(params) { return new RequestCall('ManageReportSchedule', 				params); }
	GetReportScheduleList			(params) { return new RequestCall('GetReportScheduleList', 				params); }
	GetReportScheduleCount			(params) { return new RequestCall('GetReportScheduleCount', 			params); }
	UpdateReportAcknowledgements	(params) { return new RequestCall('UpdateReportAcknowledgements', 		params); }
}

module.exports = new ReportsRequest();



