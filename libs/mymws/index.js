
class MyMWSClass {
	constructor() {
		this.Feeds                = require('./feeds');
		this.Finances             = require('./finances');
		this.FulfillmentInbound   = require('./fulfillment-inbound');
		this.FulfillmentInventory = require('./fulfillment-inventory');
		this.FulfillmentOutbound  = require('./fulfillment-outbound');
		this.MerchantFulfillment  = require('./merchant-fulfillment');
		this.Orders               = require('./orders');
		this.Products 			  = require('./products');
		this.Recommendations      = require('./recommendations');
		this.Reports              = require('./reports');
		this.Sellers              = require('./sellers');
		this.Subscriptions        = require('./subscriptions');
	}

}


module.exports = new MyMWSClass();
