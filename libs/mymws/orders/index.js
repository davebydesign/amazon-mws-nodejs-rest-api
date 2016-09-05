var 
	AmazonMwsRequest = require('../base_request'),
	Parser = require('./parser'),
	Schema = require('./schema.js');

class RequestCall extends AmazonMwsRequest {
	constructor(CallName, params) {
		super();
		this.query.Version  = "2013-09-01";
		this.query.SellerId = process.env.MWS_MerchantId;
		this.path           = "/Orders/2013-09-01";

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

class OrdersRequest  {
	ListOrders					(params) { return new RequestCall('ListOrders',					params); }
	ListOrdersByNextToken		(params) { return new RequestCall('ListOrdersByNextToken',		params); }
	GetOrder					(params) { return new RequestCall('GetOrder',					params); }
	ListOrderItems				(params) { return new RequestCall('ListOrderItems',				params); }
	ListOrderItemsByNextToken	(params) { return new RequestCall('ListOrderItemsByNextToken',	params); }
	GetServiceStatus			(params) { return new RequestCall('GetServiceStatus', 			params); }

}

module.exports = new OrdersRequest();



