var 
	AmazonMwsRequest = require('./base_request'),
	Parser = require('./parser');



class ProductsRequestCall extends AmazonMwsRequest {
	constructor(creds) {
		super(creds);
		this.query["Version"] = "2011-10-01";
		this.query["SellerId"] = creds.MerchantId;
		this.path = "/Products/2011-10-01";
	}
}






module.exports = class ProductsRequest  {

	constructor(creds) {
		this.creds = creds;
	}


	/*** TESTED ***/
	ListMatchingProducts(params) {
		
		let Call = new ProductsRequestCall(this.creds);

		Call.requestSchema = {
			"title"      : "ListMatchingProducts",
			"throttling" : { 
				"name" : "ListMatchingProducts",
				"maxRequestQuota" : 20,
				"hourlyRestoreRate" : 720	// One request every five seconds
			},

			"type"       : "object",
			"properties" : {

				"MarketplaceId" : {
					"name"        : 'MarketplaceId',
					"description" : "",
					"type"        : "string"
				},

				"Query" : {
					"name" : 'Query',
					"type" : "string"
				},

				"QueryContextId" : {
					"name" : 'QueryContextId',
					"type" : "string"
				}
			},
			additionalProperties : false,
			required : ['MarketplaceId', 'Query']
		};
		

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);

			let parsedResult = Parser.ListMatchingProducts(result);
			Call.deferred.fulfill(parsedResult);		
		});
		
	}





	/*** TESTED ***/
	GetMatchingProduct(params) {
		let Call = new ProductsRequestCall(this.creds);

		Call.requestSchema = {
			"title"      : "GetMatchingProduct",
			"throttling" : { 
				"name" : "GetMatchingProduct",
				"maxRequestQuota" : 20,
				"hourlyRestoreRate" : 7200	// Two requests every second
			},

			"type"       : "object",
			"properties" : {

				"MarketplaceId" : {
					"name"        : 'MarketplaceId',
					"description" : "",
					"type"        : "string"
				},

				"ASINList" : {
					"name" : 'ASINList.ASIN',
					"type" : "array",
					"maxItems"    : 10,
					"items"       : {
						"type" : "string"
					}
				}
			},
			additionalProperties : false,
			required : ['MarketplaceId', 'ASINList']
		};

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);

			let parsedResult = Parser.GetMatchingProduct(result);
			Call.deferred.fulfill(parsedResult);			
		});
	}





	/*** TESTED ***/
	GetMatchingProductForId(params) {
		let Call = new ProductsRequestCall(this.creds);

		Call.requestSchema = {
			"title"      : "GetMatchingProductForId",
			"throttling" : { 
				"name" : "GetMatchingProductForId",
				"maxRequestQuota" : 20,
				"hourlyRestoreRate" : 18000	// Five requests every second
			},

			"type"       : "object",
			"properties" : {

				"MarketplaceId" : {
					"name"        : 'MarketplaceId',
					"description" : "",
					"type"        : "string"
				},

				"IdType" : {
					"name" : "IdType",
					"type" : "string",
					"enum" : [ 
						"ASIN",
						"GCID",
						"SellerSKU",
						"UPC",
						"EAN",
						"ISBN",
						"JAN"
					]
				},

				"IdList" : {
					"name" : 'IdList.Id',
					"type" : "array",
					"maxItems"    : 5,
					"items"       : {
						"type" : "string"
					}
				}
			},
			additionalProperties : false,
			required : ['MarketplaceId', 'IdList', 'IdType']
		};

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);

			let parsedResult = Parser.GetMatchingProductForId(result);	
			Call.deferred.fulfill(parsedResult);			
		});		
	}





	/*** TESTED ***/
	/* Gets the new and used buy box price */
	GetCompetitivePricingForSKU(params) {
		let Call = new ProductsRequestCall(this.creds);

		Call.requestSchema = {
			"title"      : "GetCompetitivePricingForSKU",
			"throttling" : { 
				"name" : "GetCompetitivePricing",
				"maxRequestQuota" : 20,
				"hourlyRestoreRate" : 36000	// Ten requests every second
			},

			"type"       : "object",
			"properties" : {

				"MarketplaceId" : {
					"name"        : 'MarketplaceId',
					"description" : "",
					"type"        : "string"
				},


				"SellerSKUList" : {
					"name" : 'SellerSKUList.SellerSKU',
					"type" : "array",
					"maxItems"    : 20,
					"items"       : {
						"type" : "string"
					}
				}
			},
			additionalProperties : false,
			required : ['MarketplaceId', 'SellerSKUList']
		};

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);

			let parsedResult = Parser.GetCompetitivePricingForSKU(result);		
			Call.deferred.fulfill(parsedResult);			
		});	
	}






	/*** TESTED ***/
	/* Gets the new and used buy box price */
	GetCompetitivePricingForASIN(params) {
		let Call = new ProductsRequestCall(this.creds);

		Call.requestSchema = {
			"title"      : "GetCompetitivePricingForASIN",
			"throttling" : { 
				"name" : "GetCompetitivePricing",
				"maxRequestQuota" : 20,
				"hourlyRestoreRate" : 36000	// Ten requests every second
			},

			"type"       : "object",
			"properties" : {

				"MarketplaceId" : {
					"name"        : 'MarketplaceId',
					"description" : "",
					"type"        : "string"
				},


				"ASINList" : {
					"name" : 'ASINList.ASIN',
					"type" : "array",
					"maxItems"    : 20,
					"items"       : {
						"type" : "string"
					}
				}
			},
			additionalProperties : false,
			required : ['MarketplaceId', 'ASINList']
		};

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);

			let parsedResult = Parser.GetCompetitivePricingForASIN(result);		
			Call.deferred.fulfill(parsedResult);			
		});	
	}





	/*** TESTED ***/
	GetLowestOfferListingsForSKU(params) {
		let Call = new ProductsRequestCall(this.creds);

		Call.requestSchema = {
			"title"      : "GetLowestOfferListingsForSKU",
			"throttling" : { 
				"name" : "GetLowestOfferListings",
				"maxRequestQuota" : 20,
				"hourlyRestoreRate" : 36000	// Ten requests every second
			},

			"type"       : "object",
			"properties" : {

				"MarketplaceId" : {
					"name"        : 'MarketplaceId',
					"description" : "",
					"type"        : "string"
				},


				"SellerSKUList" : {
					"name" : 'SellerSKUList.SellerSKU',
					"type" : "array",
					"maxItems"    : 20,
					"items"       : {
						"type" : "string"
					}
				},

				"ItemCondition" : {
					"name" : "ItemCondition",
					"type" : "string",
					"enum" : [ 
						"Any",
						"New",
						"Used",
						"Collectible",
						"Refurbished",
						"Club"
					]
				}
			},
			additionalProperties : false,
			required : ['MarketplaceId', 'SellerSKUList']
		};

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);

			let parsedResult = Parser.GetLowestOfferListingsForSKU(result);		
			Call.deferred.fulfill(parsedResult);			
		});			
	}





	/*** TESTED ***/
	GetLowestOfferListingsForASIN(params) {
		let Call = new ProductsRequestCall(this.creds);

		Call.requestSchema = {
			"title"      : "GetLowestOfferListingsForASIN",
			"throttling" : { 
				"name" : "GetLowestOfferListings",
				"maxRequestQuota" : 20,
				"hourlyRestoreRate" : 36000	// Ten requests every second
			},

			"type"       : "object",
			"properties" : {

				"MarketplaceId" : {
					"name"        : 'MarketplaceId',
					"description" : "",
					"type"        : "string"
				},


				"ASINList" : {
					"name" : 'ASINList.ASIN',
					"type" : "array",
					"maxItems"    : 20,
					"items"       : {
						"type" : "string"
					}
				},

				"ItemCondition" : {
					"name" : "ItemCondition",
					"type" : "string",
					"enum" : [ 
						"Any",
						"New",
						"Used",
						"Collectible",
						"Refurbished",
						"Club"
					]
				}
			},
			additionalProperties : false,
			required : ['MarketplaceId', 'ASINList']
		};

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);

			let parsedResult = Parser.GetLowestOfferListingsForASIN(result);	
			Call.deferred.fulfill(parsedResult);			
		});
	}


	/*** TESTED ***/
	GetLowestPricedOffersForSKU(params) {
		let Call = new ProductsRequestCall(this.creds);

		Call.requestSchema = {
			"title"      : "GetLowestPricedOffersForSKU",
			"throttling" : { 
				"name" : "GetLowestPricedOffers",
				"maxRequestQuota" : 10,
				"hourlyRestoreRate" : 200	// 200 requests per hour
			},

			"type"       : "object",
			"properties" : {

				"MarketplaceId" : {
					"name"        : 'MarketplaceId',
					"description" : "",
					"type"        : "string"
				},


				"SellerSKU" : {
					"name" : 'SellerSKU',
					"type" : "string"
				},

				"ItemCondition" : {
					"name" : "ItemCondition",
					"type" : "string",
					"enum" : [ 
						"Any",
						"New",
						"Used",
						"Collectible",
						"Refurbished",
						"Club"
					]
				}
			},
			additionalProperties : false,
			required : ['MarketplaceId', 'SellerSKU', 'ItemCondition']
		};

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);
			let parsedResult = Parser.GetLowestPricedOffersForSKU(result);	
			Call.deferred.fulfill(parsedResult);			
		});		 
	}





	/*** TESTED ***/
	GetLowestPricedOffersForASIN(params) {
		let Call = new ProductsRequestCall(this.creds);

		Call.requestSchema = {
			"title"      : "GetLowestPricedOffersForASIN",
			"throttling" : { 
				"name" : "GetLowestPricedOffers",
				"maxRequestQuota" : 10,
				"hourlyRestoreRate" : 200	// 200 requests per hour
			},

			"type"       : "object",
			"properties" : {

				"MarketplaceId" : {
					"name"        : 'MarketplaceId',
					"description" : "",
					"type"        : "string"
				},


				"ASIN" : {
					"name" : 'ASIN',
					"type" : "string"
				},

				"ItemCondition" : {
					"name" : "ItemCondition",
					"type" : "string",
					"enum" : [ 
						"Any",
						"New",
						"Used",
						"Collectible",
						"Refurbished",
						"Club"
					]
				}
			},
			additionalProperties : false,
			required : ['MarketplaceId', 'ASIN', 'ItemCondition']
		};

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);
			let parsedResult = Parser.GetLowestPricedOffersForASIN(result);	
			Call.deferred.fulfill(parsedResult);			
		});			
	}





	/*** TESTED ***/
	GetMyPriceForSKU(params) {
		let Call = new ProductsRequestCall(this.creds);

		Call.requestSchema = {
			"title"      : "GetMyPriceForSKU",
			"throttling" : { 
				"name" : "GetMyPrice",
				"maxRequestQuota" : 20,
				"hourlyRestoreRate" : 36000	// 36000 requests per hour
			},

			"type"       : "object",
			"properties" : {

				"MarketplaceId" : {
					"name"        : 'MarketplaceId',
					"description" : "",
					"type"        : "string"
				},


				"SellerSKUList" : {
					"name" : 'SellerSKUList.SellerSKU',
					"type" : "array",
					"maxItems"    : 20,
					"items"       : {
						"type" : "string"
					}
				},

				"ItemCondition" : {
					"name" : "ItemCondition",
					"type" : "string",
					"enum" : [ 
						"Any",
						"New",
						"Used",
						"Collectible",
						"Refurbished",
						"Club"
					]
				}
			},
			additionalProperties : false,
			required : ['MarketplaceId', 'SellerSKUList']
		};

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);
			let parsedResult = Parser.GetMyPriceForSKU(result);		
			Call.deferred.fulfill(parsedResult);			
		});	
	}





	/*** TESTED ***/
	GetMyPriceForASIN(params) {
		let Call = new ProductsRequestCall(this.creds);

		Call.requestSchema = {
			"title"      : "GetMyPriceForASIN",
			"throttling" : { 
				"name" : "GetMyPrice",
				"maxRequestQuota" : 20,
				"hourlyRestoreRate" : 36000	// 36000 requests per hour
			},

			"type"       : "object",
			"properties" : {

				"MarketplaceId" : {
					"name"        : 'MarketplaceId',
					"description" : "",
					"type"        : "string"
				},


				"ASINList" : {
					"name" : 'ASINList.ASIN',
					"type" : "array",
					"maxItems"    : 20,
					"items"       : {
						"type" : "string"
					}
				},

				"ItemCondition" : {
					"name" : "ItemCondition",
					"type" : "string",
					"enum" : [ 
						"Any",
						"New",
						"Used",
						"Collectible",
						"Refurbished",
						"Club"
					]
				}
			},
			additionalProperties : false,
			required : ['MarketplaceId', 'ASINList']
		};

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);
			let parsedResult = Parser.GetMyPriceForASIN(result);			
			Call.deferred.fulfill(parsedResult);			
		});	



	}





	/*** TESTED ***/
	GetProductCategoriesForSKU(params) {
		let Call = new ProductsRequestCall(this.creds);

		Call.requestSchema = {
			"title"      : "GetProductCategoriesForSKU",
			"throttling" : { 
				"name" : "GetProductCategories",
				"maxRequestQuota" : 20,
				"hourlyRestoreRate" : 720	// One request every five seconds
			},

			"type"       : "object",
			"properties" : {

				"MarketplaceId" : {
					"name"        : 'MarketplaceId',
					"description" : "",
					"type"        : "string"
				},
				"SellerSKU" : {
					"name"        : 'SellerSKU',
					"description" : "",
					"type"        : "string"
				}

			},
			additionalProperties : false,
			required : ['MarketplaceId', 'SellerSKU']
		};

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);
			let parsedResult = Parser.GetProductCategoriesForSKU(result);	
			Call.deferred.fulfill(parsedResult);			
		});	

	}





	/*** TESTED ***/
	GetProductCategoriesForASIN(params) {

		let Call = new ProductsRequestCall(this.creds);

		Call.requestSchema = {
			"title"      : "GetProductCategoriesForASIN",
			"throttling" : { 
				"name" : "GetProductCategories",
				"maxRequestQuota" : 20,
				"hourlyRestoreRate" : 720	// One request every five seconds
			},

			"type"       : "object",
			"properties" : {

				"MarketplaceId" : {
					"name"        : 'MarketplaceId',
					"description" : "",
					"type"        : "string"
				},
				"ASIN" : {
					"name"        : 'ASIN',
					"description" : "",
					"type"        : "string"
				}

			},
			additionalProperties : false,
			required : ['MarketplaceId', 'ASIN']
		};

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);
			let parsedResult = Parser.GetProductCategoriesForASIN(result);	
			Call.deferred.fulfill(parsedResult);			
		});
	}

	GetServiceStatus(params) {
		let Call = new ProductsRequestCall(this.creds);
		Call.requestSchema = {
			"title"      : "GetServiceStatus",
			"throttling" : { 
				"name" : "Products.GetServiceStatus",
				"maxRequestQuota" : 2,
				"hourlyRestoreRate" : 12	// one request every five minutes
			},

			"type"       : "object",
			"properties" : {


			},
			additionalProperties : false

		};
		
		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);		
			Call.deferred.fulfill(result);			
		});
	}
}