var AmazonMwsParentRequest = require('../parent-request-class');

class RequestCall extends AmazonMwsParentRequest {
	constructor(CallName, Params) {
		super({
			Version          : "2011-10-01",
			SellerOrMerchant : "Seller",
			Path             : "/Products/2011-10-01",
			Parser           : require('./parser'),
			SubSchemas       : require('./subschemas.js'),
			MainSchema       : require('./schema.js'),
			CallName         : CallName,
			Params           : Params
		});
		return this.ExecuteRequest();
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