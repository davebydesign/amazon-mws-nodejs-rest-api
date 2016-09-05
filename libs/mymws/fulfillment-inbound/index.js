var 
	AmazonMwsRequest = require('../base_request'),
	Parser = require('./parser'),
	Schema = require('./schema.js');

class RequestCall extends AmazonMwsRequest {
	constructor(CallName, params) {
		super();
		this.query.Version  = "2010-10-01";
		this.query.SellerId = process.env.MWS_MerchantId;
		this.path           = "/FulfillmentInboundShipment/2010-10-01";

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

class FulfillmentInboundRequest  {
	CreateInboundShipmentPlan			(params) { return new RequestCall('CreateInboundShipmentPlan', 				params); }
	CreateInboundShipment				(params) { return new RequestCall('CreateInboundShipment', 					params); }
	UpdateInboundShipment				(params) { return new RequestCall('UpdateInboundShipment', 					params); }
	GetPreorderInfo						(params) { return new RequestCall('GetPreorderInfo', 						params); }
	ConfirmPreorder						(params) { return new RequestCall('ConfirmPreorder',						params); }
	GetPrepInstructionsForSKU			(params) { return new RequestCall('GetPrepInstructionsForSKU', 				params); }
	GetPrepInstructionsForASIN			(params) { return new RequestCall('GetPrepInstructionsForASIN', 			params); }
	PutTransportContent					(params) { return new RequestCall('PutTransportContent',					params); }
	EstimateTransportRequest			(params) { return new RequestCall('EstimateTransportRequest', 				params); }
	GetTransportContent					(params) { return new RequestCall('GetTransportContent', 					params); }
	ConfirmTransportRequest				(params) { return new RequestCall('ConfirmTransportRequest', 				params); }
	VoidTransportRequest				(params) { return new RequestCall('VoidTransportRequest', 					params); }
	GetPackageLabels					(params) { return new RequestCall('GetPackageLabels', 						params); }
	GetUniquePackageLabels				(params) { return new RequestCall('GetUniquePackageLabels', 				params); }
	GetPalletLabels						(params) { return new RequestCall('GetPalletLabels', 						params); }
	GetBillOfLading						(params) { return new RequestCall('GetBillOfLading', 						params); }
	ListInboundShipments				(params) { return new RequestCall('ListInboundShipments', 					params); }
	ListInboundShipmentsByNextToken		(params) { return new RequestCall('ListInboundShipmentsByNextToken', 		params); }
	ListInboundShipmentItems			(params) { return new RequestCall('ListInboundShipmentItems', 				params); }
	ListInboundShipmentItemsByNextToken	(params) { return new RequestCall('ListInboundShipmentItemsByNextToken', 	params); }
	GetServiceStatus					(params) { return new RequestCall('GetServiceStatus', 						params); }

}

module.exports = new FulfillmentInboundRequest();




