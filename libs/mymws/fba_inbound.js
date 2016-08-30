var 
	AmazonMwsRequest = require('./base_request');

module.exports = class FulfillmentInboundRequest extends AmazonMwsRequest {
	constructor(creds) {
		super(creds);
		this.query["Version"] = "2010-10-01";
		this.query["SellerId"] = creds.MerchantId;
		this.path = "/FulfillmentInboundShipment/2010-10-01";
	}

	CreateInboundShipmentPlan(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "CreateInboundShipmentPlan";
		this.setThrottling("CreateInboundShipmentPlan", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['ShipFromAddress', 'InboundShipmentPlanRequestItems']))
		return deferred.reject(this.paramsError);

		if ('Name' 					in params.ShipFromAddress)	this.query["ShipFromAddress.Name"] = params.ShipFromAddress.Name;
		if ('AddressLine1' 			in params.ShipFromAddress)	this.query["ShipFromAddress.AddressLine1"] = params.ShipFromAddress.AddressLine1;
		if ('AddressLine2' 			in params.ShipFromAddress)	this.query["ShipFromAddress.AddressLine2"] = params.ShipFromAddress.AddressLine2;
		if ('City' 					in params.ShipFromAddress)	this.query["ShipFromAddress.City"] = params.ShipFromAddress.City;
		if ('DistrictOrCounty' 		in params.ShipFromAddress)	this.query["ShipFromAddress.DistrictOrCounty"] = params.ShipFromAddress.DistrictOrCounty;
		if ('StateOrProvinceCode' 	in params.ShipFromAddress)	this.query["ShipFromAddress.StateOrProvinceCode"] = params.ShipFromAddress.StateOrProvinceCode;
		if ('CountryCode' 			in params.ShipFromAddress)	this.query["ShipFromAddress.CountryCode"] = params.ShipFromAddress.CountryCode;
		if ('PostalCode' 			in params.ShipFromAddress)	this.query["ShipFromAddress.PostalCode"] = params.ShipFromAddress.PostalCode;
		if ('ShipToCountryCode' 			in params)			this.query["ShipToCountryCode"] = params.ShipToCountryCode;
		if ('ShipToCountrySubdivisionCode'	in params)			this.query["ShipToCountrySubdivisionCode"] = params.ShipToCountrySubdivisionCode;
		if ('LabelPrepPreference' 			in params)			this.query["LabelPrepPreference"] = params.LabelPrepPreference;

		this.mapComplexList(params.InboundShipmentPlanRequestItems);

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	CreateInboundShipment(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "CreateInboundShipment";
		this.setThrottling("CreateInboundShipment", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['ShipmentId', 'InboundShipmentHeader', 'InboundShipmentItems']))
		return deferred.reject(this.paramsError);

		this.query["ShipmentId"] = params.ShipmentId;
		this.mapComplexList(params.InboundShipmentHeader);		
		this.mapComplexList(params.InboundShipmentItems);		
		
		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	UpdateInboundShipment(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "UpdateInboundShipment";
		this.setThrottling("UpdateInboundShipment", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['ShipmentId', 'InboundShipmentHeader', 'InboundShipmentItems']))
		return deferred.reject(this.paramsError);

		this.query["ShipmentId"] = params.ShipmentId;
		this.mapComplexList(params.InboundShipmentHeader);		
		this.mapComplexList(params.InboundShipmentItems);	

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetPreorderInfo(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetPreorderInfo";
		this.setThrottling("GetPreorderInfo", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['ShipmentId']))
		return deferred.reject(this.paramsError);
		
		this.query["ShipmentId"] = params.ShipmentId;

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ConfirmPreorder(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ConfirmPreorder";
		this.setThrottling("ConfirmPreorder", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['ShipmentId', 'NeedByDate']))
		return deferred.reject(this.paramsError);
		
		this.query["ShipmentId"] = params.ShipmentId;		
		this.query["NeedByDate"] = new Date(params.NeedByDate);
		
		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetPrepInstructionsForSKU(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetPrepInstructionsForSKU";
		this.setThrottling("GetPrepInstructionsForSKU", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['SellerSKUList', 'ShipToCountryCode']))
		return deferred.reject(this.paramsError);
		
		this.listify('SellerSKUList.Id', params.SellerSKUList);
		this.query["ShipToCountryCode"] = params.ShipToCountryCode;
		
		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetPrepInstructionsForASIN(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetPrepInstructionsForASIN";
		this.setThrottling("GetPrepInstructionsForASIN", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['ASINList', 'ShipToCountryCode']))
		return deferred.reject(this.paramsError);
		
		this.listify('ASINList.Id', params.ASINList);		
		this.query["ShipToCountryCode"] = params.ShipToCountryCode;
		
		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	PutTransportContent(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "PutTransportContent";
		this.setThrottling("PutTransportContent", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['ShipmentId', 'IsPartnered', 'ShipmentType', 'TransportDetails']))
		return deferred.reject(this.paramsError);

		this.query["ShipmentId"] = params.ShipmentId;
		this.setBooleanParam('IsPartnered', params);			
		this.query["ShipmentType"] = params.ShipmentType;
		this.mapComplexList(params.TransportDetails);		
		
		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;		
	}

	EstimateTransportRequest(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "EstimateTransportRequest";
		this.setThrottling("EstimateTransportRequest", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['ShipmentId']))
		return deferred.reject(this.paramsError);
		
		this.query["ShipmentId"] = params.ShipmentId;

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;		
	}

	GetTransportContent(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetTransportContent";
		this.setThrottling("GetTransportContent", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['ShipmentId']))
		return deferred.reject(this.paramsError);

		this.query["ShipmentId"] = params.ShipmentId;
		
		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ConfirmTransportRequest(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ConfirmTransportRequest";
		this.setThrottling("ConfirmTransportRequest", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['ShipmentId']))
		return deferred.reject(this.paramsError);
		
		this.query["ShipmentId"] = params.ShipmentId;

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	VoidTransportRequest(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "VoidTransportRequest";
		this.setThrottling("VoidTransportRequest", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['ShipmentId']))
		return deferred.reject(this.paramsError);
		
		this.query["ShipmentId"] = params.ShipmentId;
		
		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetPackageLabels(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetPackageLabels";
		this.setThrottling("GetPackageLabels", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['ShipmentId', 'PageType']))
		return deferred.reject(this.paramsError);

		this.query["ShipmentId"] = params.ShipmentId;		
		this.query["PageType"] = params.PageType;
		if ('NumberOfPackages' in params)   this.query["NumberOfPackages"] = params.NumberOfPackages;

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetUniquePackageLabels(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetUniquePackageLabels";
		this.setThrottling("GetUniquePackageLabels", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['ShipmentId', 'PageType', 'PackageLabelsToPrint']))
		return deferred.reject(this.paramsError);
	
		this.query["ShipmentId"] = params.ShipmentId;		
		this.query["PageType"] = params.PageType;		
		this.listify('PackageLabelsToPrint.member', params.PackageLabelsToPrint);
		
		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetPalletLabels(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetPalletLabels";
		this.setThrottling("GetPalletLabels", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['ShipmentId', 'PageType', 'NumberOfPallets']))
		return deferred.reject(this.paramsError);
		
		this.query["ShipmentId"]      = 'ShipmentId', params.ShipmentId;		
		this.query["PageType"]        = 'PageType', params.PageType;		
		this.query["NumberOfPallets"] = 'NumberOfPallets', params.NumberOfPallets;
		
		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetBillOfLading(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetBillOfLading";
		this.setThrottling("GetBillOfLading", 30, 2 * 60 * 60); // two requests every second

		if (this.missingParams(params, ['ShipmentId']))
		return deferred.reject(this.paramsError);
		
		this.query["ShipmentId"] = params.ShipmentId;
		
		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListInboundShipments(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ListInboundShipments";
		this.setThrottling("ListInboundShipments", 30, 2 * 60 * 60); // two requests every second

		if ('ShipmentStatusList'	in params)  this.listify.set('ShipmentStatusList.member', params.ShipmentStatusList);
		if ('ShipmentIdList' 		in params)  this.listify.set('ShipmentIdList.member', params.ShipmentIdList);
		if ('LastUpdatedAfter' 		in params)	this.query["LastUpdatedAfter"] = new Date(params.LastUpdatedAfter);
		if ('LastUpdatedBefore'		in params)	this.query["LastUpdatedBefore"] = new Date(params.LastUpdatedBefore);

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListInboundShipmentsByNextToken(params) {
		this.requestSchema = {
			"title"      : "ListInboundShipmentsByNextToken",
			"throttling" : { 
				"name" : "ListInboundShipments",
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

	ListInboundShipmentItems(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ListInboundShipmentItems";
		this.setThrottling("ListInboundShipmentItems", 30, 2 * 60 * 60); // two requests every second

		if ('ShipmentId'		in params)	this.query["ShipmentId"] = params.ShipmentId;
		if ('LastUpdatedAfter'	in params)	this.query["LastUpdatedAfter"] = new Date(params.LastUpdatedAfter);
		if ('LastUpdatedBefore'	in params)	this.query["LastUpdatedBefore"] = new Date(params.LastUpdatedBefore);

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListInboundShipmentItemsByNextToken(params) {
		this.requestSchema = {
			"title"      : "ListInboundShipmentItemsByNextToken",
			"throttling" : { 
				"name" : "ListInboundShipmentItems",
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

	GetServiceStatus(params) {
		this.requestSchema = {
			"title"      : "GetServiceStatus",
			"throttling" : { 
				"name" : "FulfillmentInbound.GetServiceStatus",
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

