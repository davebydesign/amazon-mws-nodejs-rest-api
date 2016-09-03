
class MyMWSClass {
	constructor() {
		this.CartInformation      = require('./cartinfo');  
		this.CustomerInformation  = require('./customerinfo');
		this.Feeds                = require('./feeds');
		this.Finances             = require('./finances');
		this.FulfillmentInbound   = require('./fba_inbound');
		this.FulfillmentInventory = require('./fba_inventory');
		this.FulfillmentOutbound  = require('./fba_outbound');
		this.MerchantFulfillment  = require('./merchant_fulfillment');
		this.Orders               = require('./orders');
		this.Products 			  = require('./products');
		this.Recommendations      = require('./recommendations');
		this.Reports              = require('./reports');
		this.Sellers              = require('./sellers');
		this.Subscriptions        = require('./subscriptions');
		this.Webstore             = require('./webstore');
	}


	parseParams(keys, reqbody) {
		var params = {};
		for (var key of keys) {
			params[key] = (key in reqbody) ? reqbody[key] : null;
		}

		return	_.omit(params, _.isNull);	
	}
}


module.exports = new MyMWSClass();
