var 
	AmazonMwsRequest = require('../base_request'),
	Parser = require('./parser'),
	Schema = require('./schema.js');

class RequestCall extends AmazonMwsRequest {
	constructor(CallName, params) {
		super();
		this.query.Version  = "2013-07-01";
		this.query.SellerId = process.env.MWS_MerchantId;
		this.path           = "/Subscriptions/2013-07-01";
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

class SubscriptionsRequest  {
	RegisterDestination 				(params) { return new RequestCall('RegisterDestination', 				params); }
	DeregisterDestination 				(params) { return new RequestCall('DeregisterDestination', 				params); }
	ListRegisteredDestinations 			(params) { return new RequestCall('ListRegisteredDestinations', 		params); }
	SendTestNotificationToDestination	(params) { return new RequestCall('SendTestNotificationToDestination',	params); }
	CreateSubscription 					(params) { return new RequestCall('CreateSubscription', 				params); }
	GetSubscription 					(params) { return new RequestCall('GetSubscription', 					params); }
	DeleteSubscription 					(params) { return new RequestCall('DeleteSubscription', 				params); }
	ListSubscriptions 					(params) { return new RequestCall('ListSubscriptions', 					params); }
	UpdateSubscription 					(params) { return new RequestCall('UpdateSubscription', 				params); }
	GetServiceStatus 					(params) { return new RequestCall('GetServiceStatus', 					params); }
}

module.exports = new SubscriptionsRequest();


