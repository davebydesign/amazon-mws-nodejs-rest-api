var AmazonMwsParentRequest = require('../parent-request-class');

class RequestCall extends AmazonMwsParentRequest {
	constructor(CallName, Params) {
		super({
			Version          : "2013-09-01",
			SellerOrMerchant : "Seller",
			Path             : "/Orders/2013-09-01",
			Parser           : require('./parser'),
			SubSchemas       : require('./subschemas.js'),
			MainSchema       : require('./schema.js'),
			CallName         : CallName,
			Params           : Params
		});
		return this.ExecuteRequest();
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



