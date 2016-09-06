module.exports = {


	"ListMatchingProducts" : {
		"title"      : 'ListMatchingProducts',
		"throttling" : { 
			"name" : 'ListMatchingProducts',
			"maxRequestQuota" : 20,
			"hourlyRestoreRate" : 720	// One request every five seconds
		},
		"type"       : 'object',
		"properties" : {
			"MarketplaceId" : {
				"name"        : 'MarketplaceId',
				"description" : '',
				"type"        : 'string'
			},
			"Query" : {
				"name" : 'Query',
				"type" : 'string'
			},
			"QueryContextId" : {
				"name" : 'QueryContextId',
				"type" : 'string'
			}
		},
		"additionalProperties" : false,
		"required" : ['MarketplaceId', 'Query']
	},


	"GetMatchingProduct" : {
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
		"additionalProperties" : false,
		"required" : ['MarketplaceId', 'ASINList']
	},


	"GetMatchingProductForId" : {
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
		"additionalProperties" : false,
		"required" : ['MarketplaceId', 'IdList', 'IdType']
	},


	"GetCompetitivePricingForSKU" : {
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
		"additionalProperties" : false,
		"required" : ['MarketplaceId', 'SellerSKUList']
	},



	"GetCompetitivePricingForASIN" : {
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
		"additionalProperties" : false,
		"required" : ['MarketplaceId', 'ASINList']
	},



	"GetLowestOfferListingsForSKU"  : {
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
		"additionalProperties" : false,
		"required" : ['MarketplaceId', 'SellerSKUList']
	},



	"GetLowestOfferListingsForASIN" : {
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
		"additionalProperties" : false,
		"required" : ['MarketplaceId', 'ASINList']
	},



	"GetLowestPricedOffersForSKU" : {
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
		"additionalProperties" : false,
		"required" : ['MarketplaceId', 'SellerSKU', 'ItemCondition']
	},



	"GetLowestPricedOffersForASIN" : {
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
		"additionalProperties" : false,
		"required" : ['MarketplaceId', 'ASIN', 'ItemCondition']
	},



	"GetMyPriceForSKU" : {
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
		"additionalProperties" : false,
		"required" : ['MarketplaceId', 'SellerSKUList']
	},




	"GetMyPriceForASIN" : {
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
		"additionalProperties" : false,
		"required" : ['MarketplaceId', 'ASINList']
	},



	"GetProductCategoriesForSKU" : {
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
		"additionalProperties" : false,
		"required" : ['MarketplaceId', 'SellerSKU']
	},



	"GetProductCategoriesForASIN" : {
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
		"additionalProperties" : false,
		"required" : ['MarketplaceId', 'ASIN']
	},



	"GetServiceStatus" : {
		"title"      : "GetServiceStatus",
		"throttling" : { 
			"name" : "Products.GetServiceStatus",
			"maxRequestQuota" : 2,
			"hourlyRestoreRate" : 12	// one request every five minutes
		},

		"type"       : "object",
		"properties" : {

		},
		"additionalProperties" : false

	}

}; 