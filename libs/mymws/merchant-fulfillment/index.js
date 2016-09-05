var 
	AmazonMwsRequest = require('../base_request'),
	Parser = require('./parser'),
	Schema = require('./schema.js');

class RequestCall extends AmazonMwsRequest {
	constructor(CallName, params) {
		super();
		this.query.Version  = "2015-06-01";
		this.query.SellerId = process.env.MWS_MerchantId;
		this.path           = "/MerchantFulfillment/2015-06-01";

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

class MerchantFulfillmentRequest  {
	GetEligibleShippingServices	(params) { return new RequestCall('GetEligibleShippingServices',	params); }
	CreateShipment				(params) { return new RequestCall('CreateShipment', 				params); }
	GetShipment					(params) { return new RequestCall('GetShipment', 					params); }
	CancelShipment				(params) { return new RequestCall('CancelShipment', 				params); }
	GetServiceStatus			(params) { return new RequestCall('GetServiceStatus', 				params); }

}

module.exports = new MerchantFulfillmentRequest();




