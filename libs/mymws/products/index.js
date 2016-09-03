var 
	AmazonMwsRequest = require('../base_request'),
	Parser = require('./parser'),
	Schema = require('./schema.js');

class ProductsRequestCall extends AmazonMwsRequest {
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
	ListMatchingProducts			(params) { return new ProductsRequestCall('ListMatchingProducts', 			params); }
	GetMatchingProduct 				(params) { return new ProductsRequestCall('GetMatchingProduct', 			params); }
	GetMatchingProductForId			(params) { return new ProductsRequestCall('GetMatchingProductForId', 		params); }
	GetCompetitivePricingForSKU		(params) { return new ProductsRequestCall('GetCompetitivePricingForSKU', 	params); } /* Gets the new and used buy box price */	
	GetCompetitivePricingForASIN	(params) { return new ProductsRequestCall('GetCompetitivePricingForASIN', 	params); } /* Gets the new and used buy box price */
	GetLowestOfferListingsForSKU	(params) { return new ProductsRequestCall('GetLowestOfferListingsForSKU', 	params); }
	GetLowestOfferListingsForASIN	(params) { return new ProductsRequestCall('GetLowestOfferListingsForASIN',	params); }
	GetLowestPricedOffersForSKU		(params) { return new ProductsRequestCall('GetLowestPricedOffersForSKU', 	params); }
	GetLowestPricedOffersForASIN	(params) { return new ProductsRequestCall('GetLowestPricedOffersForASIN', 	params); }
	GetMyPriceForSKU				(params) { return new ProductsRequestCall('GetMyPriceForSKU', 				params); }
	GetMyPriceForASIN				(params) { return new ProductsRequestCall('GetMyPriceForASIN', 				params); }
	GetProductCategoriesForSKU		(params) { return new ProductsRequestCall('GetProductCategoriesForSKU', 	params); }
	GetProductCategoriesForASIN		(params) { return new ProductsRequestCall('GetProductCategoriesForASIN', 	params); }
	GetServiceStatus				(params) { return new ProductsRequestCall('GetServiceStatus', 				params); }
}

module.exports = new ProductsRequest();