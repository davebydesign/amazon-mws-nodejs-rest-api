module.exports = {
	"ListMatchingProducts" : {
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
	}
};
