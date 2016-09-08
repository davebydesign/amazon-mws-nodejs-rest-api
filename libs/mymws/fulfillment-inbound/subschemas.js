module.exports = [


	{
		"id"          : "/Address",
		"description" : "Postal address information. The Address datatype is used in a request parameter or in a response element of the following operations: CreateInboundShipmentPlan, CreateInboundShipment, UpdateInboundShipment, ListInboundShipments",
		"type"        : "object",
		"properties"  : {
			"Name" : {
				"name"        : "Name",
				"description" : "The name or business name.",
				"type"        : "string",
				"maxLength"   : 50
			},
			"AddressLine1" : {
				"name"        : "AddressLine1",
				"description" : "The street address information.",
				"type"        : "string",
				"maxLength"   : 180
			},
			"AddressLine2" : {
				"name"        : "AddressLine2",
				"description" : "Additional street address information, if required.",
				"type"        : "string",
				"maxLength"   : 60
			},
			"City" : {
				"name"        : "City",
				"description" : "The city.",
				"type"        : "string",
				"maxLength"   : 30
			},
			"DistrictOrCounty" : {
				"name"        : "DistrictOrCounty",
				"description" : "The district or county.",
				"type"        : "string",
				"maxLength"   : 25
			},
			"StateOrProvinceCode" : {
				"name"        : "StateOrProvinceCode",
				"description" : "The state or province code.",
				"type"        : "string",
				"maxLength"   : 2,
				"minLength"   : 2
			},
			"CountryCode" : {
				"name"        : "CountryCode",
				"description" : "The country code.",
				"type"        : "string",
				"maxLength"   : 2,
				"minLength"   : 2
			},
			"PostalCode" : {
				"name"        : "PostalCode",
				"description" : "The postal code.",
				"type"        : "string",
				"maxLength"   : 30
			}
		},
		"required" : ["Name", "AddressLine1", "City", "CountryCode"],
		"additionalProperties" : false
	},



	{
		"id"          : "/Amount",
		"description" : "The currency code and value. The Amount datatype is used in a request parameter or in a response element of the following operations: PutTransportContent, GetTransportContent",
		"type"        : "object",
		"properties"  : {
			"CurrencyCode": {
				"name"        : "CurrencyCode",
				"description" : "The currency code.",
				"type"        : "string",
				"maxLength"   : 3	
			},
			"Value" : {
				"name"        : "Value",
				"description" : "The amount.",
				"type"        : "string"				
			}


		},
		"required" : ["CurrencyCode", "Value"],
		"additionalProperties" : false
	},



	{
		"id"          : "/BoxContentsFeeDetails",
		"description" : "The manual processing fee per unit and total fee for a shipment.  The BoxContentsFeeDetails datatype is used in a request parameter or in a response element of the following operations: CreateInboundShipmentPlan, ListInboundShipments, ListInboundShipmentsByNextToken.",
		"type"        : "object",
		"properties"  : {
			"TotalUnits" : {
				"name"        : "TotalUnits",
				"description" : "The number of units to ship.",
				"type"        : "integer"
			},
			"FeePerUnit" : {
				"name"        : "FeePerUnit",
				"description" : "The manual processing fee per unit.",
				"$ref"        : "/Amount"
			},
			"TotalFee" : {
				"name"        : "TotalFee",
				"description" : "The total manual processing fee for the shipment.",
				"$ref"        : "/Amount"
			}

		},
		"required" : [],
		"additionalProperties" : false	
	},


	{
		"id"          : "/BoxContentsSource",
		"description" : "Where the seller provided box contents information for a shipment. The BoxContentsSource datatype is used in a request parameter of the following operations: ListInboundShipments, ListInboundShipmentsByNextToken.",
		"type"        : "string",
		"enum"        : [
			"NONE",			// There is no box content information for this shipment. Amazon will manually process the box contents. This may incur a fee.
			"FEED",			// Box content information is provided through the _POST_FBA_INBOUND_CARTON_CONTENTS_ feed.
			"2D_BARCODE",	// Box content information is provided by a barcode on the shipment. https://sellercentral.amazon.com/gp/help/202049090
			"INTERACTIVE"	// Box content information is provided by an interactive source, such as a web tool.
		]  	
	},


	{
		"id"          : "/Contact",
		"description" : "Contact information for the person in your organization who is responsible for a Less Than Truckload/Full Truckload (LTL/FTL) shipment. The Contact datatype is used in a request parameter or in a response element of the following operations: PutTransportContent, GetTransportContent.",
		"type"        : "object",
		"properties"  : {
			"Name" : {
				"name"        : "Name",
				"description" : "The name of the contact person.",
				"type"        : "string",
				"maxLength"   : 50
			},
			"Phone" : {
				"name"        : "Phone",
				"description" : "The phone number of the contact person..",
				"type"        : "string",
				"maxLength"   : 20
			},
			"Email" : {
				"name"        : "Email",
				"description" : "The e-mail address of the contact person.",
				"type"        : "string",
				"maxLength"   : 50
			},
			"Fax" : {
				"name"        : "Fax",
				"description" : "The fax number of the contact person.",
				"type"        : "string",
				"maxLength"   : 20
			}
		},
		"required" : ["Name", "Phone", "Email", "Fax"],
		"additionalProperties" : false
	},	


	{
		"id"         : "/Dimensions",
		"description" : "The dimension values and unit of measurement. The Dimensions datatype is used in a request parameter or in a response element of the following operations: PutTransportContent, GetTransportContent.",
		"type"       : "object",
		"properties" : {
			"Unit" : {				
				"name"        : "Unit",
				"description" : "The unit of measurement for the dimensions.",
				"type"        : "string",
				"enum" : [
					"inches",
					"centimeters"
				]
			},
			"Length" : {				
				"name"        : "Length",
				"description" : "The length dimension.",
				"type"        : "number"
			},
			"Width" : {				
				"name"        : "Width",
				"description" : "The width dimension.",
				"type"        : "number"
			},
			"Height" : {				
				"name"        : "Height",
				"description" : "The height dimension.",
				"type"        : "number"
			}
		},
		"required" : ["Unit", "Length", "Width", "Height"],
		"additionalProperties" : false
	},	



	{
		"id"          : "/InboundShipmentHeader",
		"description" : "Inbound shipment information used to create and update inbound shipments. The InboundShipmentHeader datatype is used in a request parameter of the following operations: CreateInboundShipment, UpdateInboundShipment.",
		"type"        : "object",
		"properties"  : {
			"ShipmentName" : {				
				"name"        : "ShipmentName",
				"description" : "The name you choose for your shipment. Use a naming convention that helps you distinguish between shipments over time, such as the date the shipment was created.",
				"type"        : "string"
			},
			"ShipFromAddress" : {				
				"name"        : "ShipFromAddress",
				"description" : "Your return address.",
				"$ref"        : "/Address"
			},
			"DestinationFulfillmentCenterId" : {				
				"name"        : "DestinationFulfillmentCenterId",
				"description" : "The identifier for the Amazon fulfillment center that your shipment will be shipped to. Get this identifier from the InboundShipmentPlans response element returned by the CreateInboundShipmentPlan operation.",
				"type"        : "string"
			},
			"LabelPrepPreference" : {				
				"name"        : "LabelPrepPreference",
				"description" : "Your preference for label preparation for an inbound shipment.",
				"type"        : "string",
				"enum" : [
					"SELLER_LABEL",
					"AMAZON_LABEL_ONLY",
					"AMAZON_LABEL_PREFERRED"
				]
			},
			"AreCasesRequired" : {				
				"name"        : "AreCasesRequired",
				"description" : "Indicates whether or not an inbound shipment contains case-packed boxes.",
				"type"        : "boolean",
				"maxLength"   : 20
			},
			"ShipmentStatus" : {				
				"name"        : "ShipmentStatus",
				"description" : "The status of your inbound shipment.",
				"type"        : "string",
				"enum" : [
					"WORKING",
					"SHIPPED",
					"CANCELLED"
				]
			},
			"IntendedBoxContentsSource" : {				
				"name"        : "IntendedBoxContentsSource",
				"description" : "",
				"type"        : "string",
				"enum" : [
					"NONE",
					"FEED",
					"2D_BARCODE"
				]
			}
		},
		"required" : ["ShipmentName", "ShipFromAddress", "DestinationFulfillmentCenterId", "LabelPrepPreference", "ShipmentStatus"],
		"additionalProperties" : false
	},


/*
			"" : {				
				"name"        : "",
				"description" : "",
				"type"        : "string",
				"maxLength"   : 20
			}
 */





	{
		"id"          : "/InboundShipmentItem",
		"description" : "Item information for an inbound shipment. Submitted with a call to the CreateInboundShipment or UpdateInboundShipment operation.",
		"type"        : "object",
		"properties"  : {
			"ShipmentId" : {				
				"name"        : "ShipmentId",
				"description" : "A shipment identifier originally returned by the CreateInboundShipmentPlan operation.",
				"type"        : "string"
			},
			"SellerSKU" : {				
				"name"        : "SellerSKU",
				"description" : "The Seller SKU of the item.",
				"type"        : "string"
			},
			"QuantityShipped" : {				
				"name"        : "QuantityShipped",
				"description" : "The item quantity that you are shipping.",
				"type"        : "integer"
			},
			"QuantityInCase" : {				
				"name"        : "QuantityInCase",
				"description" : "The item quantity in each case, for case-packed items. Note that QuantityInCase multiplied by the number of boxes in the inbound shipment equals QuantityShipped. Also note that all of the boxes of an inbound shipment must either be case packed or individually packed. For that reason, when you submit the CreateInboundShipment or the UpdateInboundShipment operation, the value of QuantityInCase must be provided for every item in the shipment or for none of the items in the shipment.",
				"type"        : "integer"
			},
			"PrepDetailsList" : {				
				"name"        : "PrepDetailsList",
				"description" : "A list of preparation instructions, and who is reponsible for each preparation.",
				"type"        : "array",
				"items"       : {
					"$ref": "/PrepDetails"
				}
			},
			"ReleaseDate" : {				
				"name"        : "ReleaseDate",
				"description" : "In YYYY-MM-DD format. The date that a pre-order item will be available for sale. For more information, see GetPreorderInfo. Pre-orders are only available in India and Japan.",
				"type"        : "string"
			}

		},	
		"required" : ["SellerSKU", "QuantityShipped"],
		"additionalProperties" : false
	},


	{
		"id"          : "/Condition",
		"description" : "The condition of an item.  Used as part of InboundShipmentPlanRequestItem",
		"type"        : "string",
		"enum"        : [
			"NewItem",
			"NewWithWarranty",
			"NewOEM",
			"NewOpenBox",
			"UsedLikeNew",
			"UsedVeryGood",
			"UsedGood",
			"UsedAcceptable",
			"UsedPoor",
			"UsedRefurbished",
			"CollectibleLikeNew",
			"CollectibleVeryGood",
			"CollectibleGood",
			"CollectibleAcceptable",
			"CollectiblePoor",
			"RefurbishedWithWarranty",
			"Refurbished",
			"Club"
		]  
	},

	{
		"id"          : "/InboundShipmentPlanRequestItem",
		"description" : "Item information for creating an inbound shipment plan. Submitted with a call to the CreateInboundShipmentPlan operation.",
		"type"        : "object",
		"properties"  : {
			"SellerSKU" : {
				"name"        : "SellerSKU",
				"description" : "The Seller SKU of the item",
				"type"        : "string",
				"maxLength"   : 200
			},
			"ASIN" : {
				"name"        : "ASIN",
				"description" : "The Amazon Standard Identification Number (ASIN) of the item.",
				"type"        : "string",
				"maxLength"   : 10,
				"minLength"   : 10
			},
			"Condition" : {
				"name"        : "Condition",
				"description" : "The condition of the item.",
				"$ref"        : "/Condition"
			},
			"Quantity" : {
				"name"        : "Quantity",
				"description" : "The item quantity.",
				"type"        : "integer"
			},
			"QuantityInCase" : {
				"name"        : "QuantityInCase",
				"description" : "The item quantity in each case, for case-packed items. Note that QuantityInCase multiplied by the number of cases in the inbound shipment equals Quantity. Also note that all of the boxes of an inbound shipment must either be case packed or individually packed. For that reason, when you submit the CreateInboundShipmentPlan operation, the value of QuantityInCase must be provided for every item in the shipment or for none of the items in the shipment.",
				"type"        : "integer"
			},
			"PrepDetailsList" : {				
				"name"        : "PrepDetailsList",
				"description" : "A list of preparation instructions, and who is reponsible for each preparation.",
				"type"        : "array",
				"items"       : {
					"$ref": "/PrepDetails"
				}
			}
		},
		"required" : ["SellerSKU"],
		"additionalProperties" : false
	},



	{
		"id"          : "/IntendedBoxContentsSource",
		"description" : "How the seller intends to provide box contents information for a shipment. The IntendedBoxContentsSource datatype is used in a request parameter of the following operations: CreateInboundShipment, UpdateInboundShipment",
		"type"        : "string",
		"enum"        : [
			"NONE",			// There is no box content information for this shipment. Amazon will manually process the box contents. This may incur a fee.
			"FEED",			// Box content information is provided through the _POST_FBA_INBOUND_CARTON_CONTENTS_ feed.
			"2D_BARCODE"	// Box content information is provided by a barcode on the shipment. https://sellercentral.amazon.com/gp/help/202049090
		]  	
	},



	{
		"id"          : "/CarrierName",
		"description" : "The carrier that you are using for your inbound shipment.",
		"type"        : "string",
		"enum"        : [
					"BUSINESS_POST",
					"DHL_AIRWAYS_INC",
					"DHL_UK",
					"PARCELFORCE",
					"DPD",
					"TNT_LOGISTICS_CORPORATION",
					"TNT",
					"YODEL",
					"UNITED_PARCEL_SERVICE_INC",
					"DHL_EXPRESS_USA_INC",
					"FEDERAL_EXPRESS_CORP",
					"UNITED_STATES_POSTAL_SERVICE",
					"UNITED_PARCEL_SERVICE_INC",
					"OTHER"
		]  	
	},



	{
		"id"          : "/NonPartneredLtlDataInput",
		"description" : "Information that you provide to Amazon about a Less Than Truckload/Full Truckload (LTL/FTL) shipment by a carrier that has not partnered with Amazon. The NonPartneredLtlDataInput datatype is used in a request parameter of the following operation: PutTransportContent.",
		"type"        : "object",
		"properties"  : {
			"CarrierName" : {
				"name"        : "CarrierName",
				"description" : "The carrier that you are using for your inbound shipment.",
				"$ref": "/CarrierName"
			},
			"ProNumber" : {
				"name"        : "ProNumber",
				"description" : "The PRO number assigned to your shipment by the carrier.",
				"type"        : "string"
			}
		},
		"required" : ["CarrierName", "ProNumber"],
		"additionalProperties" : false
	},


	{
		"id"          : "/NonPartneredSmallParcelDataInput",
		"description" : "Information that you provide to Amazon about a Small Parcel shipment shipped by a carrier that has not partnered with Amazon. The NonPartneredSmallParcelDataInput datatype is used in a request parameter of the following operation: PutTransportContent.",
		"type"        : "object",
		"properties"  : {
			"CarrierName" : {
				"name"        : "CarrierName",
				"description" : "The carrier that you are using for your inbound shipment.",
				"$ref": "/CarrierName"
			},
			"PackageList" : {
				"name"        : "PackageList",
				"description" : "A list of tracking numbers provided by the carrier.",
				"type"        : "array",
				"items"       : {
					"$ref": "/NonPartneredSmallParcelPackageInput"
				}
			}
		},
		"required" : ["CarrierName", "ProNumber"],
		"additionalProperties" : false
	},	


	{
		"id"          : "/NonPartneredSmallParcelPackageInput",
		"description" : "The tracking number of the package, provided by the carrier.",
		"type"        : "object",
		"properties"  : {
			"" : {
				"name"        : "TrackingId",
				"description" : "The tracking number of the package, provided by the carrier.",
				"type"        : "string",
				"maxLength"   : 30
			}
		},
		"required" : ["TrackingId"],
		"additionalProperties" : false
	},


	{
		"id"          : "/Pallet",
		"description" : "Pallet information. The Pallet datatype is used in a request parameter or in a response element of the following operations: PutTransportContent, GetTransportContent.",
		"type"        : "object",
		"properties"  : {
			"Dimensions" : {
				"name"        : "Dimensions",
				"description" : "The dimensions of the pallet.",
				"$ref": "/Dimensions"
			},
			"Weight" : {
				"name"        : "Weight",
				"description" : "The weight of the pallet.",
				"$ref": "/Weight"
			},
			"IsStacked" : {
				"name"        : "IsStacked",
				"description" : "Indicates whether pallets will be stacked when carrier arrives for pick-up.",
				"type"        : "boolean"
			}
		},
		"required" : ["Dimensions", "IsStacked"],
		"additionalProperties" : false
	},



	{
		"id"          : "/SellerFreightClass",
		"description" : "The freight class of the shipment. For information about determining the freight class, contact your carrier.",
		"type"        : "string",
		"enum"        : [
			"50", 
			"55", 
			"60", 
			"65", 
			"70", 
			"77.5", 
			"85", 
			"92.5", 
			"100", 
			"110", 
			"125", 
			"150", 
			"175", 
			"200", 
			"250", 
			"300", 
			"400", 
			"500"
		]  	
	},	


	{
		"id"          : "/PartneredLtlDataInput",
		"description" : "Information that is required by an Amazon-partnered carrier to ship a Less Than Truckload/Full Truckload (LTL/FTL) inbound shipment. The PartneredLtlDataInput datatype is used in a request parameter of the following operation: PutTransportContent.",
		"type"        : "object",
		"properties"  : {
			"Contact" : {
				"name"        : "Contact",
				"description" : "Contact information for the person in your organization who is responsible for the shipment. Used by the carrier if they have questions about the shipment.",
				"$ref": "/Contact"
			},
			"BoxCount" : {
				"name"        : "BoxCount",
				"description" : "The number of boxes in the shipment.",
				"type"        : "integer"
			},
			"SellerFreightClass" : {
				"name"        : "SellerFreightClass",
				"description" : "The freight class of the shipment. For information about determining the freight class, contact your carrier.",
				"$ref": "/SellerFreightClass"
			},
			"FreightReadyDate" : {
				"name"        : "FreightReadyDate",
				"description" : "The date that the shipment will be ready to be picked up by the carrier. Must be in YYYY-MM-DD format. At least two days after the date that the request is made.",
				"type"        : "string"
			},
			"PalletList" : {
				"name"        : "PalletList",
				"description" : "A list of pallet descriptions.",
				"type"        : "array",
				"items"       : {
					"$ref": "/Pallet"	
				}
			},
			"TotalWeight" : {
				"name"        : "TotalWeight",
				"description" : "The total weight of the shipment.",
				"$ref"        : "/Weight"
			},
			"SellerDeclaredValue" : {
				"name"        : "SellerDeclaredValue",
				"description" : "Your declaration of the total value of the inventory in the shipment.",
				"$ref"        : "/Amount"
			},
		},
		"required" : ["Contact", "BoxCount", "FreightReadyDate"],
		"additionalProperties" : false
	},


	{
		"id"          : "/PartneredSmallParcelDataInput",
		"description" : "Information that is required by an Amazon-partnered carrier to ship a Small Parcel inbound shipment. The PartneredSmallParcelDataInput datatype is used in a request parameter of the following operation: PutTransportContent.",
		"type"        : "object",
		"properties"  : {
			"CarrierName" : {
				"name"        : "CarrierName",
				"description" : "Indicates the Amazon-partnered carrier that you want to use for your inbound shipment.",
				"type"        : "string",
				"enum"        : [
					"UNITED_PARCEL_SERVICE_INC",
					"DHL_STANDARD"
				]
			},
			"PackageList" : {
				"name"        : "PackageList",
				"description" : "A list of packages, including the dimensions and weight of each package.",
				"type"        : "array",
				"items" : {
					"$ref"        : "/PartneredSmallParcelPackageInput"	
				}
			}
		},
		"required" : ["PackageList"],
		"additionalProperties" : false
	},


	{
		"id"          : "/PartneredSmallParcelPackageInput",
		"description" : "Dimension and weight information for the package. The PartneredSmallParcelPackageInput datatype is used in a request parameter of the following operation: PutTransportContent.",
		"type"        : "object",
		"properties"  : {
			"Dimensions" : {
				"name"        : "Dimensions",
				"description" : "The dimensions of the package.",
				"$ref"        : "/Dimensions"	
			},
			"Weight" : {
				"name"        : "Weight",
				"description" : "The weight of the package.",
				"$ref"        : "/Weight"
			}
		},
		"required" : ["Dimensions", "Weight"],
		"additionalProperties" : false
	},


	{
		"id"          : "/PrepDetails",
		"description" : "A preparation instruction, and who is reponsible for that preparation. PrepDetails is used in a request element of the following operations: CreateInboundShipmentPlan, CreateInboundShipment, UpdateInboundShipment.",
		"type"        : "object",
		"properties"  : {
			"PrepInstruction" : {
				"name"        : "PrepInstruction",
				"description" : "Preparation instructions for shipping an item to the Amazon Fulfillment Network.",
				"$ref"        : "/PrepInstruction"
			},
			"PrepOwner" : {
				"name"        : "PrepOwner",
				"description" : "Indicates who will prepare the item.",
				"type"        : "string",
				"enum"        : [
					"AMAZON",
					"SELLER"
				]
			}
		},
		"required" : ["PrepInstruction", "PrepOwner"],
		"additionalProperties" : false
	},


	{
		"id"          : "/PrepInstruction",
		"description" : "Preparation instructions for shipping an item to the Amazon Fulfillment Network. ",
		"type"        : "string",
		"enum"        : [
			"Polybagging", 			// Indicates that polybagging is required.
			"BubbleWrapping", 		// Indicates that bubble wrapping is required.
			"Taping", 				// Indicates that taping is required.
			"BlackShrinkWrapping", 	// Indicates that black shrink wrapping is required.
			"Labeling", 			// Indicates that the FNSKU label should be applied to the item.
			"HangGarment"			// Indicates that the item should be placed on a hanger.
		]  	
	},

/*
	{
		"id"          : "/",
		"description" : "",
		"type"        : "object",
		"properties"  : {
			"" : {
				"name"        : "",
				"description" : "",
				"type"        : ""
			}
		},
		"required" : [],
		"additionalProperties" : false
	}
*/

];