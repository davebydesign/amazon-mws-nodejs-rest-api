var 
	AmazonMwsRequest = require('../base_request'),
	Parser = require('./parser'),
	Schema = require('./schema.js');

class RequestCall extends AmazonMwsRequest {
	constructor(CallName, params) {
		super();
		this.query.Version  = "2009-01-01";
		this.query.Merchant = process.env.MWS_MerchantId;
		this.path           = "/";
		return this.MakeCall(CallName, params);
	}

	MakeCall(CallName, params) {
		this.requestSchema = Schema[CallName];
		return this.invoke(params, (result)=>{
			if (this.detectResponseError(result)) return this.deferred.reject(this.responseError);

			if (Parser[CallName]) {
				let parsedResult = Parser[CallName](result);
				this.deferred.fulfill(parsedResult);	
			} else {
				this.deferred.fulfill(result);
			}
		});
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



