var 
	CartInformationRequest      = require('./cartinfo'),
	CustomerInformationRequest  = require('./customerinfo'),
	FeedsRequest                = require('./feeds'),
	FinancesRequest             = require('./finances'),
	FulfillmentInboundRequest   = require('./fba_inbound'),
	FulfillmentInventoryRequest = require('./fba_inventory'),
	FulfillmentOutboundRequest  = require('./fba_outbound'),
	MerchantFulfillmentRequest  = require('./merchant_fulfillment'),
	OrdersRequest               = require('./orders'),
	ProductsRequest             = require('./products'),
	RecommendationsRequest      = require('./recommendations'),
	ReportsRequest              = require('./reports'),
	SellersRequest              = require('./sellers'),
	SubscriptionsRequest        = require('./subscriptions'),
	WebstoreRequest             = require('./webstore');	


module.exports = class MyMWSClass {
	constructor(creds) {
		this.CartInformation      = new CartInformationRequest(creds);  
		this.CustomerInformation  = new CustomerInformationRequest(creds);
		this.Feeds                = new FeedsRequest(creds);
		this.Finances             = new FinancesRequest(creds);
		this.FulfillmentInbound   = new FulfillmentInboundRequest(creds);
		this.FulfillmentInventory = new FulfillmentInventoryRequest(creds);
		this.FulfillmentOutbound  = new FulfillmentOutboundRequest(creds);
		this.MerchantFulfillment  = new MerchantFulfillmentRequest(creds);
		this.Orders               = new OrdersRequest(creds);
		this.Products             = new ProductsRequest(creds);
		this.Recommendations      = new RecommendationsRequest(creds);
		this.Reports              = new ReportsRequest(creds);
		this.Sellers              = new SellersRequest(creds);
		this.Subscriptions        = new SubscriptionsRequest(creds);
		this.Webstore             = new WebstoreRequest(creds);
	}


	parseParams(keys, reqbody) {
		var params = {};
		for (var key of keys) {
			params[key] = (key in reqbody) ? reqbody[key] : null;
		}

		return	_.omit(params, _.isNull);	
	}
};