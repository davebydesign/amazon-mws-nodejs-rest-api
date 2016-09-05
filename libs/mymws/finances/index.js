var 
	AmazonMwsRequest = require('../base_request'),
	Parser = require('./parser'),
	Schema = require('./schema.js');

class RequestCall extends AmazonMwsRequest {
	constructor(CallName, params) {
		super();
		this.query.Version  = "2015-05-01";
		this.query.SellerId = process.env.MWS_MerchantId;
		this.path           = "/Finances/2015-05-01";
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

class FinancesRequest  {
	ListFinancialEventGroups			(params) { return new RequestCall('ListFinancialEventGroups',				params); }
	ListFinancialEventGroupsByNextToken	(params) { return new RequestCall('ListFinancialEventGroupsByNextToken', 	params); }
	ListFinancialEvents					(params) { return new RequestCall('ListFinancialEvents', 					params); }
	ListFinancialEventsByNextToken		(params) { return new RequestCall('ListFinancialEventsByNextToken', 		params); }
	GetServiceStatus					(params) { return new RequestCall('GetServiceStatus', 						params); }
}

module.exports = new FinancesRequest();





