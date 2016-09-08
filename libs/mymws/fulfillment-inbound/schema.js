module.exports = {

	"CreateInboundShipmentPlan" :  { 
		"title"       : "CreateInboundShipmentPlan",
		"description" : "Returns the information required to create an inbound shipment.",
		"docs_url"    : "http://docs.developer.amazonservices.com/en_US/fba_inbound/FBAInbound_CreateInboundShipmentPlan.html",
		"throttling"  : {
			"name"             : "CreateInboundShipmentPlan",
			"maxRequestQuota"  : 30,
			"hourlyRestoreRate": 7200  // 2 requests every second
		},
		"type"      : "object",
		"properties": {
			"ShipFromAddress" : {
				"name"       : "ShipFromAddress",
				"description": "The address from which you will send your inbound shipment.",
				"$ref": "/Address"
			},
			"ShipToCountryCode" : {
				"name"       : "ShipToCountryCode",
				"description": "The two-character country code for the country where you want your inbound shipment to be sent. Only for sellers in North America and Multi-Country Inventory (MCI) sellers in Europe.",
				"type"       : ""
			},
			"ShipToCountrySubdivisionCode" : {
				"name"       : "ShipToCountrySubdivisionCode",
				"description": "The two-character country code, followed by a dash and then up to three characters that represent the subdivision of the country where you want your inbound shipment to be sent. Only for sellers in India.",
				"type"       : ""
			},
			"LabelPrepPreference" : {
				"name"       : "LabelPrepPreference",
				"description": "Your preference for label preparation for an inbound shipment.",
				"type"       : ""
			},
			"InboundShipmentPlanRequestItems" : {
				"name"       : "InboundShipmentPlanRequestItems.member",
				"description": "",
				"type"       : ""
			}
		},
		"additionalProperties" : false,
		"required" : []
	},


	"CreateInboundShipment" :  {  
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	},


	"UpdateInboundShipment" :  {  
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	},


	"GetPreorderInfo" :  { 
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	},


	"ConfirmPreorder" :  {  
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	},


	"GetPrepInstructionsForSKU" :  { 
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	},


	"GetPrepInstructionsForASIN" :  { 
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	},


	"PutTransportContent" :  {  
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	},


	"EstimateTransportRequest" :  { 
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	},


	"GetTransportContent" :  {  
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	},


	"ConfirmTransportRequest" :  {  
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	},


	"VoidTransportRequest" :  {  
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	},


	"GetPackageLabels" :  {  
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	},


	"GetUniquePackageLabels" :  { 
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	},


	"GetPalletLabels" :  { 
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	},


	"GetBillOfLading" :  { 
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	},


	"ListInboundShipments" : {
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	},


	"ListInboundShipmentsByNextToken" :  { 
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	},


	"ListInboundShipmentItems" :  { 
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	},


	"ListInboundShipmentItemsByNextToken" :  { 
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	},


	"GetServiceStatus" :  {
		"title"       : "",
		"description" : "",
		"docs_url"    : "",
		"throttling"  : {
			"name"             : "",
			"maxRequestQuota"  : 0,
			"hourlyRestoreRate": 0
		},
		"type"      : "object",
		"properties": {
			"" : {
				"name"       : "",
				"description": "",
				"type"       : ""
			}

		},
		"additionalProperties" : false,
		"required" : []
	}

}; 