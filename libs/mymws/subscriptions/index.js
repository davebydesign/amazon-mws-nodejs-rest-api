var AmazonMwsParentRequest = require('../parent-request-class');

class RequestCall extends AmazonMwsParentRequest {
	constructor(CallName, Params) {
		super({
			Version          : "2013-07-01",
			SellerOrMerchant : "Seller",
			Path             : "/Subscriptions/2013-07-01",
			Parser           : require('./parser'),
			SubSchemas       : require('./subschemas.js'),
			MainSchema       : require('./schema.js'),
			CallName         : CallName,
			Params           : Params
		});
		return this.ExecuteRequest();
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


