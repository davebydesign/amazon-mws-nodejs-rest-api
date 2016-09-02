var 
	AmazonMwsRequest = require('./base_request');

module.exports = class FulfillmentOutboundRequest extends AmazonMwsRequest {

	constructor() {
		super();
		this.query.Version  = "2010-10-01";
		this.query.SellerId = process.env.MWS_MerchantId;
		this.path           = "/FulfillmentOutboundShipment/2010-10-01";
	}

	GetFulfillmentPreview(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetFulfillmentPreview";
		this.setThrottling("GetFulfillmentPreview", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['Address', 'Items']))
		return deferred.reject(this.paramsError);

		if ('MarketplaceId' 		in params)					this.query["MarketplaceId"] 				= params.MarketplaceId;
		if ('Name' 					in params.Address)			this.query["Address.Name"] 					= params.Address.Name;
		if ('AddressLine1' 			in params.Address)			this.query["Address.AddressLine1"] 			= params.Address.AddressLine1;
		if ('AddressLine2' 			in params.Address)			this.query["Address.AddressLine2"] 			= params.Address.AddressLine2;
		if ('City' 					in params.Address)			this.query["Address.City"] 					= params.Address.City;
		if ('DistrictOrCounty' 		in params.Address)			this.query["Address.DistrictOrCounty"] 		= params.Address.DistrictOrCounty;
		if ('StateOrProvinceCode'	in params.Address)			this.query["Address.StateOrProvinceCode"]	= params.Address.StateOrProvinceCode;
		if ('CountryCode' 			in params.Address)			this.query["Address.CountryCode"] 			= params.Address.CountryCode;
		if ('PostalCode' 			in params.Address)			this.query["Address.PostalCode"] 			= params.Address.PostalCode;
		this.mapComplexList(params.Items);
		if (params.ShippingSpeedCategories)		this.listify('ShippingSpeedCategories');

		if ('IncludeCODFulfillmentPreview' in params)	this.setBooleanParam('IncludeCODFulfillmentPreview', params);
		if ('IncludeDeliveryWindows' in params)			this.setBooleanParam('IncludeDeliveryWindows', params);

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;		
	}

	CreateFulfillmentOrder(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "CreateFulfillmentOrder";
		this.setThrottling("CreateFulfillmentOrder", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, [
			'SellerFulfillmentOrderId', 
			'DisplayableOrderId', 
			'DisplayableOrderDateTime', 
			'DisplayableOrderComment',
			'ShippingSpeedCategory',
			'DestinationAddress',
			'Items']
		)) return deferred.reject(this.paramsError);
		

		this.query["SellerFulfillmentOrderId"] 					= params.SellerFulfillmentOrderId;
		this.query["DisplayableOrderId"] 						= params.DisplayableOrderId;
		this.query["DisplayableOrderDateTime"] 					= new Date(params.DisplayableOrderDateTime);
		this.query["DisplayableOrderComment"] 					= params.DisplayableOrderComment;
		this.query["ShippingSpeedCategory"] 					= params.ShippingSpeedCategory;
		this.query["DestinationAddress.Name"] 					= params.DestinationAddress.Name;
		this.query["DestinationAddress.AddressLine1"] 			= params.DestinationAddress.AddressLine1;
		this.query["DestinationAddress.AddressLine2"] 			= params.DestinationAddress.AddressLine2;
		this.query["DestinationAddress.City"] 					= params.DestinationAddress.City;
		this.query["DestinationAddress.DistrictOrCounty"] 		= params.DestinationAddress.DistrictOrCounty;
		this.query["DestinationAddress.StateOrProvinceCode"]	= params.DestinationAddress.StateOrProvinceCode;
		this.query["DestinationAddress.CountryCode"] 			= params.DestinationAddress.CountryCode;
		this.query["DestinationAddress.PostalCode"] 			= params.DestinationAddress.PostalCode;
		this.mapComplexList(params.Items);

		if ('MarketplaceId' in params)			this.query["MarketplaceId"] = params.MarketplaceId;
		if ('FulfillmentAction' in params)		this.query["FulfillmentAction"] = params.FulfillmentAction;
		if ('FulfillmentPolicy' in params)		this.query["FulfillmentPolicy"] = params.FulfillmentPolicy;
		if ('NotificationEmailList' in params)	this.listify.set('NotificationEmailList.member', params.NotificationEmailList);
		if ('CODSettings' in params)			this.mapComplexList(params.CODSettings);
		if ('DeliveryWindow' in params)			this.mapComplexList(params.DeliveryWindow);

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	UpdateFulfillmentOrder(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "UpdateFulfillmentOrder";
		this.setThrottling("UpdateFulfillmentOrder", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['SellerFulfillmentOrderId'])) 
		return deferred.reject(this.paramsError);

		this.query["SellerFulfillmentOrderId"] = params.SellerFulfillmentOrderId;

		if ('MarketplaceId' 			in params)	this.query["MarketplaceId"] 			= params.MarketplaceId;
		if ('FulfillmentAction' 		in params)	this.query["FulfillmentAction"] 		= params.FulfillmentAction;
		if ('DisplayableOrderId' 		in params)	this.query["DisplayableOrderId"] 		= params.DisplayableOrderId;
		if ('DisplayableOrderDateTime'	in params)	this.query["DisplayableOrderDateTime"]	= new Date(params.DisplayableOrderDateTime);
		if ('DisplayableOrderComment' 	in params)	this.query["DisplayableOrderComment"] 	= params.DisplayableOrderComment;
		if ('ShippingSpeedCategory' 	in params)	this.query["ShippingSpeedCategory"] 	= params.ShippingSpeedCategory;

		if (params.DestinationAddress.Name)					this.query["DestinationAddress.Name"] 					= params.DestinationAddress.Name;
		if (params.DestinationAddress.AddressLine1)			this.query["DestinationAddress.AddressLine1"] 			= params.DestinationAddress.AddressLine1;
		if (params.DestinationAddress.AddressLine2)			this.query["DestinationAddress.AddressLine2"] 			= params.DestinationAddress.AddressLine2;
		if (params.DestinationAddress.City)					this.query["DestinationAddress.City"] 					= params.DestinationAddress.City;
		if (params.DestinationAddress.DistrictOrCounty)		this.query["DestinationAddress.DistrictOrCounty"] 		= params.DestinationAddress.DistrictOrCounty;
		if (params.DestinationAddress.StateOrProvinceCode)	this.query["DestinationAddress.StateOrProvinceCode"]	= params.DestinationAddress.StateOrProvinceCode;
		if (params.DestinationAddress.CountryCode)			this.query["DestinationAddress.CountryCode"] 			= params.DestinationAddress.CountryCode;
		if (params.DestinationAddress.PostalCode)			this.query["DestinationAddress.PostalCode"] 			= params.DestinationAddress.PostalCode;

		if ('FulfillmentPolicy' in params)		this.query["FulfillmentPolicy"] = params.FulfillmentPolicy;
		if ('NotificationEmailList' in params)	this.listify.set('NotificationEmailList.member', params.NotificationEmailList);
		if ('Items' in params)					this.mapComplexList(params.Items);

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetFulfillmentOrder(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetFulfillmentOrder";
		this.setThrottling("GetFulfillmentOrder", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['SellerFulfillmentOrderId'])) 
		return deferred.reject(this.paramsError);

		this.query["SellerFulfillmentOrderId"] = params.SellerFulfillmentOrderId;

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListAllFulfillmentOrders(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ListAllFulfillmentOrders";
		this.setThrottling("ListAllFulfillmentOrders", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['QueryStartDateTime'])) 
		return deferred.reject(this.paramsError);

		this.query["QueryStartDateTime"] = new Date(params.QueryStartDateTime);

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListAllFulfillmentOrdersByNextToken(params) {
		this.requestSchema = {
			"title"      : "ListAllFulfillmentOrdersByNextToken",
			"throttling" : { 
				"name" : "ListAllFulfillmentOrders",
				"maxRequestQuota" : 30,
				"hourlyRestoreRate" : 2 * 60 * 60	// two requests every second
			},

			"type"       : "object",
			"properties" : {

				"NextToken" : {
					"name"        : 'NextToken',
					"description" : "",
					"type"        : "string",
				}


			},
			additionalProperties : false,
			required : ['NextToken']
		};	

		return this.invoke(params, (result)=>{
			if (this.detectResponseError(result)) return this.deferred.reject(this.responseError);		
			this.deferred.fulfill(result);			
		});
	}

	GetPackageTrackingDetails(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetPackageTrackingDetails";
		this.setThrottling("GetPackageTrackingDetails", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['PackageNumber'])) 
		return deferred.reject(this.paramsError);

		this.query["PackageNumber"] =  params.PackageNumber;

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	CancelFulfillmentOrder(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "CancelFulfillmentOrder";
		this.setThrottling("CancelFulfillmentOrder", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['SellerFulfillmentOrderId'])) 
		return deferred.reject(this.paramsError);

		this.query["SellerFulfillmentOrderId"] = params.SellerFulfillmentOrderId;

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetServiceStatus(params) {
		this.requestSchema = {
			"title"      : "GetServiceStatus",
			"throttling" : { 
				"name" : "FulfillmentOutbound.GetServiceStatus",
				"maxRequestQuota" : 2,
				"hourlyRestoreRate" : 12	// one request every five minutes
			},

			"type"       : "object",
			"properties" : {


			},
			additionalProperties : false

		};
		
		return this.invoke(params, (result)=>{
			if (this.detectResponseError(result)) return this.deferred.reject(this.responseError);		
			this.deferred.fulfill(result);			
		});
	}
}
