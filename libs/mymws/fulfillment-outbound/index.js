var 
	AmazonMwsRequest = require('../base_request'),
	Parser = require('./parser'),
	Schema = require('./schema.js');

class RequestCall extends AmazonMwsRequest {
	constructor(CallName, params) {
		super();
		this.query.Version  = "2010-10-01";
		this.query.SellerId = process.env.MWS_MerchantId;
		this.path           = "/FulfillmentOutboundShipment/2010-10-01";

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

class FulfillmentOutboundRequest  {
	GetFulfillmentPreview				(params) { return new RequestCall('GetFulfillmentPreview', 					params); }
	CreateFulfillmentOrder				(params) { return new RequestCall('CreateFulfillmentOrder', 				params); }
	UpdateFulfillmentOrder				(params) { return new RequestCall('UpdateFulfillmentOrder', 				params); }
	GetFulfillmentOrder					(params) { return new RequestCall('GetFulfillmentOrder', 					params); }
	ListAllFulfillmentOrders			(params) { return new RequestCall('ListAllFulfillmentOrders', 				params); }
	ListAllFulfillmentOrdersByNextToken	(params) { return new RequestCall('ListAllFulfillmentOrdersByNextToken',	params); }
	GetPackageTrackingDetails			(params) { return new RequestCall('GetPackageTrackingDetails', 				params); }
	CancelFulfillmentOrder				(params) { return new RequestCall('CancelFulfillmentOrder', 				params); }
	GetServiceStatus					(params) { return new RequestCall('GetServiceStatus', 						params); }

}

module.exports = new FulfillmentOutboundRequest();










