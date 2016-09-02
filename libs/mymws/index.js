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


module.exports =  class MyMWSClass {
	constructor() {
		this.CartInformation      = new CartInformationRequest();  
		this.CustomerInformation  = new CustomerInformationRequest();
		this.Feeds                = new FeedsRequest();
		this.Finances             = new FinancesRequest();
		this.FulfillmentInbound   = new FulfillmentInboundRequest();
		this.FulfillmentInventory = new FulfillmentInventoryRequest();
		this.FulfillmentOutbound  = new FulfillmentOutboundRequest();
		this.MerchantFulfillment  = new MerchantFulfillmentRequest();
		this.Orders               = new OrdersRequest();
		this.Products             = new ProductsRequest();
		this.Recommendations      = new RecommendationsRequest();
		this.Reports              = new ReportsRequest();
		this.Sellers              = new SellersRequest();
		this.Subscriptions        = new SubscriptionsRequest();
		this.Webstore             = new WebstoreRequest();
	}


	parseParams(keys, reqbody) {
		var params = {};
		for (var key of keys) {
			params[key] = (key in reqbody) ? reqbody[key] : null;
		}

		return	_.omit(params, _.isNull);	
	}
};