var 
	AmazonMwsRequest = require('../base_request'),
	Parser = require('./parser'),
	Schema = require('./schema.js');

class RequestCall extends AmazonMwsRequest {
	constructor(CallName, params) {
		super();
		this.query.Version  = "2011-10-01";
		this.query.SellerId = process.env.MWS_MerchantId;
		this.path           = "/Products/2011-10-01";
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

class ProductsRequest  {
	ListMatchingProducts			(params) { return new RequestCall('ListMatchingProducts', 			params); }
	GetMatchingProduct 				(params) { return new RequestCall('GetMatchingProduct', 			params); }
	GetMatchingProductForId			(params) { return new RequestCall('GetMatchingProductForId', 		params); }
	GetCompetitivePricingForSKU		(params) { return new RequestCall('GetCompetitivePricingForSKU', 	params); } /* Gets the new and used buy box price */	
	GetCompetitivePricingForASIN	(params) { return new RequestCall('GetCompetitivePricingForASIN', 	params); } /* Gets the new and used buy box price */
	GetLowestOfferListingsForSKU	(params) { return new RequestCall('GetLowestOfferListingsForSKU', 	params); }
	GetLowestOfferListingsForASIN	(params) { return new RequestCall('GetLowestOfferListingsForASIN',	params); }
	GetLowestPricedOffersForSKU		(params) { return new RequestCall('GetLowestPricedOffersForSKU', 	params); }
	GetLowestPricedOffersForASIN	(params) { return new RequestCall('GetLowestPricedOffersForASIN', 	params); }
	GetMyPriceForSKU				(params) { return new RequestCall('GetMyPriceForSKU', 				params); }
	GetMyPriceForASIN				(params) { return new RequestCall('GetMyPriceForASIN', 				params); }
	GetProductCategoriesForSKU		(params) { return new RequestCall('GetProductCategoriesForSKU', 	params); }
	GetProductCategoriesForASIN		(params) { return new RequestCall('GetProductCategoriesForASIN', 	params); }
	GetServiceStatus				(params) { return new RequestCall('GetServiceStatus', 				params); }
}

module.exports = new ProductsRequest();