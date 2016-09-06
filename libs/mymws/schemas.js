module.exports = [

	{
		"id": "/FeedType",
		"type" : "string", 
		"enum" : [  
			"_POST_PRODUCT_DATA_",									// Product Feed
			"_POST_INVENTORY_AVAILABILITY_DATA_",					// Inventory Feed
			"_POST_PRODUCT_OVERRIDES_DATA_",						// Overrides Feed
			"_POST_PRODUCT_PRICING_DATA_",							// Pricing Feed
			"_POST_PRODUCT_IMAGE_DATA_",							// Product Images Feed
			"_POST_PRODUCT_RELATIONSHIP_DATA_",						// Relationships Feed
			"_POST_FLAT_FILE_INVLOADER_DATA_",						// Flat File Inventory Loader Feed
			"_POST_FLAT_FILE_LISTINGS_DATA_",						// Flat File Listings Feed
			"_POST_FLAT_FILE_BOOKLOADER_DATA_",						// Flat File Book Loader Feed
			"_POST_FLAT_FILE_CONVERGENCE_LISTINGS_DATA_",			// Flat File Music Loader Feed
			"_POST_FLAT_FILE_LISTINGS_DATA_",						// Flat File Video Loader Feed
			"_POST_FLAT_FILE_PRICEANDQUANTITYONLY_UPDATE_DATA_",	// Flat File Price and Quantity Update Feed
			"_POST_UIEE_BOOKLOADER_DATA_",							// UIEE Inventory Feed
			"_POST_STD_ACES_DATA_",									// ACES 3.0 Data (Automotive Part Finder) Feed

			"_POST_ORDER_ACKNOWLEDGEMENT_DATA_",					// Order Acknowledgement Feed
			"_POST_PAYMENT_ADJUSTMENT_DATA_",						// Order Adjustments Feed
			"_POST_ORDER_FULFILLMENT_DATA_",						// Order Fulfillment Feed
			"_POST_INVOICE_CONFIRMATION_DATA_",						// Invoice Confirmation Feed (China only)
			"_POST_FLAT_FILE_ORDER_ACKNOWLEDGEMENT_DATA_",			// Flat File Order Acknowledgement Feed
			"_POST_FLAT_FILE_PAYMENT_ADJUSTMENT_DATA_",				// Flat File Order Adjustments Feed
			"_POST_FLAT_FILE_FULFILLMENT_DATA_",					// Flat File Order Fulfillment Feed
			"_POST_FLAT_FILE_INVOICE_CONFIRMATION_DATA_",			// Flat File Invoice Confirmation Feed (China only)

			"_POST_FULFILLMENT_ORDER_REQUEST_DATA_",						// FBA Fulfillment Order Feed
			"_POST_FULFILLMENT_ORDER_CANCELLATION_REQUEST_DATA_",			// FBA Fulfillment Order Cancellation Feed
			"_POST_FBA_INBOUND_CARTON_CONTENTS_",							// FBA Inbound Shipment Carton Information Feed
			"_POST_FLAT_FILE_FULFILLMENT_ORDER_REQUEST_DATA_",				// Flat File FBA Fulfillment Order Feed
			"_POST_FLAT_FILE_FULFILLMENT_ORDER_CANCELLATION_REQUEST_DATA_",	// Flat File FBA Fulfillment Order Cancellation Feed
			"_POST_FLAT_FILE_FBA_CREATE_INBOUND_PLAN_",						// Flat File FBA Create Inbound Shipment Plan Feed
			"_POST_FLAT_FILE_FBA_UPDATE_INBOUND_PLAN_",						// Flat File FBA Update Inbound Shipment Plan Feed
			"_POST_FLAT_FILE_FBA_CREATE_REMOVAL_"							// Flat File FBA Create Removal Feed
		]		
	},

	{
		"id": "/FeedProcessingStatus",
		"type" : "string",
		"enum" : [
			"_AWAITING_ASYNCHRONOUS_REPLY_",
			"_CANCELLED_",
			"_DONE_",
			"_IN_PROGRESS_",
			"_IN_SAFETY_NET_",
			"_SUBMITTED_",
			"_UNCONFIRMED_"
		]  
	}


];