var 
	express   = require('express'),
	router    = express.Router(),
	MyPromise = require('bluebird'),
	_         = require('lodash'),
	https  = require('https'),
	crypto = require('crypto'),
	tls    = require('tls'),
	qs     = require("querystring"),
	xml2js = require('xml2js'),
	Validator = require('jsonschema').Validator;

	

module.exports = router;



function stripPrefix(str) {
    return str.replace('ns2:', '');
}

function parseNumbers(str) {
	if (str.length >= 10)  return str;
    if (!isNaN(str)) {
      str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
    }
    return str;
}

class AmazonMwsRequest {
	constructor(creds) {
		this.query          = {};
		this.creds          = creds;
		this.httpVerb       = "POST";
		this.host           = "mws.amazonservices.com";
		this.port           = 443;
		this.appName        = "Node_MWS_Client";
		this.appVersion     = "0.1.0";
		this.appLanguage    = "Javascript / NodeJS";
		this.contentType    = "application/x-www-form-urlencoded; charset=utf-8";
		this.httpBody       = "";
		this.paramsError    = "";
		this.responseError  = {};
		this.queryString    = "";
		this.queryStringSig = "";
		this.upload         = false;
		this.headers        = {};
		this.loadSchema();
		//this.v = new Validator();
		this.deferred = MyPromise.pending();

	}

	loadSchema() {
		this.v = new Validator();

		this.schemas = [
			{
				"id": "/FeedTypes",
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
				"id": "/FeedProcessingStatuses",
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
		].forEach((schema)=>{ this.v.addSchema(schema, schema.id); });



		//this.v.addSchema(this.definitionsSchema, '/AmazonMWS');


	}

	buildQuery(params) {
		
		this.query["Action"] = this.requestSchema.title;
		this.throttling = this.requestSchema.throttling;

		if (this.requestSchema.title === "GetServiceStatus") return;
		

		for (var prop in this.requestSchema.properties) {
			if (prop in params) {
				switch(this.requestSchema.properties[prop].type) {
					case 'number' :
					case 'string' :
						this.query[prop] = params[prop];
						break;
					case 'array' :
						this.listify(this.requestSchema.properties[prop].name, params[prop]);
						break;
					case 'datetime':
						this.query[prop] = new Date(params[prop]).toISOString();
						break;
					case 'boolean':
						setBooleanParam(prop, params);
						break;
				}
			}
		}
	}

	validate(params) {
		var validation = this.v.validate(params, this.requestSchema);
		this.validationErrors = validation.errors;
		return (this.validationErrors.length === 0);		
	}

	resetQuery() {
		this.query = {
			AWSAccessKeyId   : this.creds.AccessKeyId 		|| '',
			SecretAccessKey  : this.creds.SecretAccessKey 	|| '',
			MarketplaceId    : this.creds.MarketplaceId,
			SignatureMethod  : "HmacSHA256",
			SignatureVersion : 2,
			Timestamp        : new Date().toISOString(),
			Version : this.version
		};
		if (this.sellerOrMerchant == "Seller") this.query["SellerId"] = this.creds.MerchantId;
		if (this.sellerOrMerchant == "Merchant") this.query["Merchant"] = this.creds.MerchantId;
		this.upload  = false;	
	}

	log(){
		console.log("super:"+JSON.stringify(this, null, 3));
		console.log([...this.queryMap]);	
	}

/*
	setThrottling(throttling) {
		this.throttling = {
			Name               : Name,
			MaxRequestQuota    : MaxRequestQuota,
			HourlyRestoreRate  : HourlyRestoreRate
		};
	}
*/
	listify(name, value) {
		var i = 0;
		if ((typeof(value) == "string") || (typeof(value) == "number")) {
			setValue(name + '.1', value);
		} 
		if (typeof(value) == "object") {
			if (Array.isArray(value)) {
				for (i = value.length - 1; i >= 0; i--) {
					this.query[name + '.' + (i+1)] = value[i];
				}
			} else {
				for (var key in value) {
					this.query[name +  '.' + (++i)] = value[key];
				}
			}
		}
	}

	mapComplexList(itemsArray) {
		for (var ItemString of itemsArray) {
			var 
				splitArray = ItemString.split('='),
				key        = splitArray[0].trim(),
				value      = splitArray[1].trim();

  			//this.query[""] = key, value);
  			this.query[key] = value;
		}
	}

	
	missingParams(paramsObj, requiredKeys) {
		this.paramsError = '';
		requiredKeys.every(function(key) { 
			if (!key in paramsObj) {
				this.paramsError += ("'"+key+"'"+" parameter required. \r\n");
			} 
		});
	}

	setBooleanParam(key, params) {
		var booltext = (params[key]) ? 'true' : 'false';	
		//this.query[""] = key, booltext);
		this.query[key] = booltext;
	}

	detectResponseError(result) {
		//console.log("Response Error");
		this.responseError = _.get(result, 'ErrorResponse.Error', null);
		return (this.responseError) ? this.responseError : null;
	}

	makeRequest(callback) {
		this.createQueryString();
		this.signQueryString();
		this.setHeaders();
		this.submitRequest(callback);

		//console.log(this.queryStringSig); 
		//callback(this.queryStringSig);
	}

	submitRequest(callback) {
		var reqOptions = {
			host    : this.host,
			port    : this.port,
			path    : this.path + (this.upload ? '?' + this.queryString : ''),
			method  : "POST",
			headers : this.headers
		};

		// Make the initial request and define callbacks
		var req = https.request(reqOptions, function (res) {
		  var data = '';
		  // Append each incoming chunk to data variable
		  res.addListener('data', function (chunk) {
			data += chunk.toString();
		  });

		  // When response is complete, parse the XML and pass it to callback
		  res.addListener('end', function() {
		  	var parserOptions = {
				explicitArray      : false,
				tagNameProcessors  : [stripPrefix],
				attrNameProcessors : [stripPrefix],
				valueProcessors    : [parseNumbers]	
		  	}; 
			var parser = new xml2js.Parser(parserOptions);
			parser.addListener('end', function (result) {
			  // Throw an error if there was a problem reported
			  if (result.Error != null) throw(Error.Code + ": " + Error.Message);
			  			
			  callback(result);
			});
			if (data.slice(0, 5) == '<?xml')
			  parser.parseString(data);
			else
			  callback(data);
		   });	  
		});

		req.write(this.httpBody);
		req.end();
	}


	createQueryString() {
		// Copy query keys, sort them, then copy over the values
		var
			keys   = _.keys(this.query).sort(),
			sorted = {};
		 _.map( keys, (key)=>{sorted[key] = this.query[key];} );

		this.queryString = ["POST", this.host, this.path, qs.stringify(sorted)].join("\n");
		this.queryString = this.queryString.replace(/'/g,"%27");
		this.queryString = this.queryString.replace(/\*/g,"%2A");
		this.queryString = this.queryString.replace(/\(/g,"%28");
		this.queryString = this.queryString.replace(/\)/g,"%29");
	}

	signQueryString() {
		var hash = crypto.createHmac("sha256", this.creds.SecretAccessKey);
		this.query['Signature'] = hash.update(this.queryString).digest("base64");
	}

	setHeaders() {
		if (!this.upload) {
			this.httpBody = qs.stringify(this.query);
		}
		this.headers = {
			'Host'           : this.host,
			'User-Agent'     : this.appName + '/' + this.appVersion + ' (Language=' + this.appLanguage + ')',
			'Content-Type'   : this.contentType,
			'Content-Length' : this.httpBody.length
		}
		if (this.upload) {
			this.headers['Content-MD5'] = cryto.createHash('md5').update(this.httpBody).digest("base64");
		}
	}


	invoke(params, callback) {
		if (!this.validate(params)) this.deferred.reject(this.validationErrors); 

		this.buildQuery(params);

		this.makeRequest(callback);

		this.resetQuery();

		return this.deferred.promise;		
	}


}














class CartInformationRequest extends AmazonMwsRequest {
	constructor(creds) {
		super(creds);
		this.query["Version"]  = "2014-03-01";
		this.query["SellerId"] = creds.MerchantId;
		this.path              = "/CartInformation";
	}


	ListCarts(params) {
		this.requestSchema = {
			"title"      : "ListCarts",
			"throttling" : { 
				"name" : "ListCarts",
				"maxRequestQuota" : 15,
				"hourlyRestoreRate" : 5 * 60	// five requests every minute
			},

			"type"       : "object",
			"properties" : {

				"MarketplaceId" : {
					"name"        : 'MarketplaceId',
					"description" : "",
					"type"        : "string"
				},

				"DateRangeStart" : {
					"name" : 'DateRangeStart',
					"type" : "datetime"
				},

				"DateRangeEnd" : {
					"name" : 'DateRangeEnd',
					"type" : "datetime"
				}
			},
			additionalProperties : false,
			required : ['DateRangeStart']
		};		

		return this.invoke(params, (result)=>{
			if (this.detectResponseError(result)) return this.deferred.reject(this.responseError);		
			this.deferred.fulfill(result);			
		});		
	}


	ListCartsByNextToken(params) {
		this.requestSchema = {
			"title"      : "ListCartsByNextToken",
			"throttling" : { 
				"name" : "ListCartsByNextToken",
				"maxRequestQuota" : 50,
				"hourlyRestoreRate" : 20 * 60	// 20 requests every minute
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

	GetCarts(params) {

		this.requestSchema = {
			"title"      : "GetCarts",
			"throttling" : { 
				"name" : "GetCarts",
				"maxRequestQuota" : 15,
				"hourlyRestoreRate" : 5 * 60	// 5 requests every minute
			},

			"type"       : "object",
			"properties" : {

				"MarketplaceId" : {
					"name"        : 'MarketplaceId',
					"description" : "",
					"type"        : "string"
				},

				"CartIdList" : {
					"name"        : 'CartIdList.CartId',
					"description" : "",
					"type"        : "array",
					"maxItems"    : 20,
					"items"       : {
						"type" : "string"
					}
				}
			},
			additionalProperties : false,
			required : ['MarketplaceId']
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
				"name" : "CartInfo.GetServiceStatus",
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















class CustomerInformationRequest extends AmazonMwsRequest {
	constructor(creds) {
		super(creds);
		this.query["Version"] = "2014-03-01";
		this.query["SellerId"] = creds.MerchantId;
		this.path = "/CustomerInformation";
	}

	ListCustomers(params) {
		this.requestSchema = {
			"title"      : "ListCustomers",
			"throttling" : { 
				"name" : "ListCustomers",
				"maxRequestQuota" : 15,
				"hourlyRestoreRate" : 5 * 60	// five requests every minute
			},

			"type"       : "object",
			"properties" : {

				"MarketplaceId" : {
					"name"        : 'MarketplaceId',
					"description" : "",
					"type"        : "string"
				},

				"DateRangeStart" : {
					"name" : 'DateRangeStart',
					"type" : "datetime"
				},

				"DateRangeEnd" : {
					"name" : 'DateRangeEnd',
					"type" : "datetime"
				},

				"DateRangeType" : {
					"name" : 'DateRangeType',
					"type" : "string",
					"enum" : [ 
						"AssociatedDate",
						"LastUpdatedDate"
					]				
				}
			},
			additionalProperties : false
		};		

		return this.invoke(params, (result)=>{
			if (this.detectResponseError(result)) return this.deferred.reject(this.responseError);		
			this.deferred.fulfill(result);			
		});		
	}

	ListCustomersByNextToken(params) {
		this.requestSchema = {
			"title"      : "ListCustomersByNextToken",
			"throttling" : { 
				"name" : "ListCustomersByNextToken",
				"maxRequestQuota" : 50,
				"hourlyRestoreRate" : 20 * 60	// 20 requests every minute
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

	GetCustomersForCustomerId(params) {

		this.requestSchema = {
			"title"      : "GetCustomersForCustomerId",
			"throttling" : { 
				"name" : "GetCustomersForCustomerId",
				"maxRequestQuota" : 50,
				"hourlyRestoreRate" : 20 * 60	// 20 requests every minute
			},

			"type"       : "object",
			"properties" : {

				"MarketplaceId" : {
					"name"        : 'MarketplaceId',
					"description" : "",
					"type"        : "string"
				},

				"CustomerIdList" : {
					"name"        : 'CustomerIdList.CustomerId',
					"description" : "",
					"type"        : "array",
					"maxItems"    : 20,
					"items"       : {
						"type" : "string"
					}
				}
			},
			additionalProperties : false,
			required : ['CustomerIdList']
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
				"name" : "CustomerInfo.GetServiceStatus",
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












class FeedsRequest extends AmazonMwsRequest {

	constructor(creds) {
		super(creds);
		this.version          = "2009-01-01";
		this.sellerOrMerchant = "Seller";
		this.path             = "/";
	}

	SubmitFeed(params) {
		this.upload = true;
		this.httpBody = params.FeedContent;

		this.requestSchema = {
			"title"      : "SubmitFeed",
			"throttling" : { 
				"name" : "SubmitFeed",
				"maxRequestQuota" : 15,
				"hourlyRestoreRate" : 30	// One request every two minutes
			},

			"type"       : "object",
			"properties" : {

				"FeedContent" : {
					"name"        : 'FeedContent',
					"description" : "",
					"type"        : "string"
				},

				"FeedType" : {
					"name"        : 'FeedType',
					"description" : "",
					"type"        : "string",
					"$ref"        : "/FeedTypes"
				},

				"MarketplaceIdList" : {
					"name"        : 'MarketplaceIdList.Id',
					"description" : "",
					"type"        : "array",
					"items"       : {
						"type" : "string"
					}
				},

				"PurgeAndReplace" : {
					"name"        : 'PurgeAndReplace',
					"type"        : "boolean",	
				}
			},
			additionalProperties : false,
			required : ['FeedContent', 'FeedType']
		};		

		return this.invoke(params, (result)=>{
			if (this.detectResponseError(result)) return this.deferred.reject(this.responseError);		
			this.deferred.fulfill(result);			
		});
	}







	GetFeedSubmissionList(params) {

		this.requestSchema = {

			"title"      : "GetFeedSubmissionList",
			"throttling" : { 
				"name" : "GetFeedSubmissionList",
				"maxRequestQuota" : 10,
				"hourlyRestoreRate" : 80	// One request every 45 seconds
			},

			"type"       : "object",
			"properties" : {
				
				"FeedSubmissionIdList" : {
					"name"        : 'FeedSubmissionIdList.Id',
					"description" : "",
					"type"        : "array",
					"maxItems"    : 100,
					"items"       : {
						"type" : "string"
					}
				},

				"MaxCount" : {
					"name"        : 'MaxCount',
					"description" : "",
					"type"        : "number",
					"minimum"     : 1,
					"maximum"     : 100
				},
				
				"FeedTypeList" : {
					"name"        : 'FeedTypeList.Type',
					"description" : "",
					"type"        : "array",
					"items"       : {
						"$ref": "/FeedTypes"
					}
				},

				"FeedProcessingStatusList" : {
					"name"        : 'FeedProcessingStatusList.Status',
					"description" : "",
					"type"        : "array",
					"items"       : {
						"$ref": "/FeedProcessingStatuses"
					}
				},

				"SubmittedFromDate" : {
					"name" : 'SubmittedFromDate',
					"type" : "datetime"
				},

				"SubmittedToDate" : {
					"name" : 'SubmittedFromDate',
					"type" : "datetime"
				}
			},
			additionalProperties : false
		};


		return this.invoke(params, (result)=>{
			if (this.detectResponseError(result)) return this.deferred.reject(this.responseError);		
			this.deferred.fulfill(result);			
		});

	}



	GetFeedSubmissionListByNextToken(params) {

		this.requestSchema = {
			"title"      : "GetFeedSubmissionListByNextToken",
			"throttling" : { 
				"name" : "GetFeedSubmissionListByNextToken",
				"maxRequestQuota" : 30,
				"hourlyRestoreRate" : 1800	// One request every two seconds
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

	GetFeedSubmissionCount(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetFeedSubmissionCount";
		this.setThrottling("GetFeedSubmissionCount", 10, 80); // One request every 45 seconds

		if ('FeedTypeList' in params)				this.listify('FeedTypeList.Type', params.FeedTypeList);
		if ('FeedProcessingStatusList' in params)	this.listify('FeedProcessingStatusList.Status', params.FeedProcessingStatusList);
		if ('SubmittedFromDate' in params)			this.query["SubmittedFromDate"] = new Date(params.SubmittedFromDate);
		if ('SubmittedToDate' in params)			this.query["SubmittedToDate"] = new Date(params.SubmittedToDate);		

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;		
	}

	CancelFeedSubmissions(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "CancelFeedSubmissions";
		this.setThrottling("CancelFeedSubmissions", 10, 80); // One request every 45 seconds

		if ('FeedSubmissionIdListt' in params)	this.listify('FeedSubmissionIdList.Id', params.FeedSubmissionIdList);
		if ('FeedTypeListt' in params)			this.listify('FeedTypeList.Type', params.FeedTypeList);
		if ('SubmittedFromDate' in params)		this.query["SubmittedFromDate"] = new Date(params.SubmittedFromDate);
		if ('SubmittedToDate' in params)		this.query["SubmittedToDate"] = new Date(params.SubmittedToDate);

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetFeedSubmissionResult(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetFeedSubmissionResult";
		this.setThrottling("GetFeedSubmissionResult", 15, 60); // One request every minute

		if (this.missingParams(params, ['FeedSubmissionId']))
		return deferred.reject(this.paramsError);

		this.query["FeedSubmissionId"] = params.FeedSubmissionId;
		
		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}
}







class FinancesRequest extends AmazonMwsRequest {
	constructor(creds) {
		super(creds);
		this.query["Version"] = "2015-05-01";
		this.query["Merchant"] = creds.MerchantId;
		this.path  = "/Finances/2015-05-01";
	}

	ListFinancialEventGroups(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ListFinancialEventGroups";
		this.setThrottling("ListFinancialEventGroups", 30, 1800); // One request every two seconds

		if (this.missingParams(params, ['FinancialEventGroupStartedAfter']))
		return deferred.reject(this.paramsError);

		this.query["FinancialEventGroupStartedAfter"] = new Date(params.FinancialEventGroupStartedAfter);
		if ('MaxResultsPerPage' in params)					this.query["MaxResultsPerPage"] =  params.MaxResultsPerPage;
		if ('FinancialEventGroupStartedBefore' in params)	this.query["FinancialEventGroupStartedBefore"] = new Date(params.FinancialEventGroupStartedBefore);

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListFinancialEventGroupsByNextToken(params) {

		this.requestSchema = {
			"title"      : "ListFinancialEventGroupsByNextToken",
			"throttling" : { 
				"name" : "ListFinancialEventGroupsByNextToken",
				"maxRequestQuota" : 30,
				"hourlyRestoreRate" : 1800	// One request every two seconds
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

	ListFinancialEvents(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] =  "ListFinancialEvents";
		this.setThrottling("ListFinancialEvents", 30, 1800); // One request every two seconds

		if ('MaxResultsPerPage' in params)		this.query["MaxResultsPerPage"] = params.MaxResultsPerPage;
		if ('AmazonOrderId' in params)			this.query["AmazonOrderId"] = params.AmazonOrderId;
		if ('FinancialEventGroupId' in params)	this.query["FinancialEventGroupId"] = params.FinancialEventGroupId;
		if ('PostedAfter' in params)			this.query["PostedAfter"] = new Date(params.PostedAfter);
		if ('PostedBefore' in params)			this.query["PostedBefore"] = new Date(params.PostedBefore);

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListFinancialEventsByNextToken(params) {

		this.requestSchema = {
			"title"      : "ListFinancialEventsByNextToken",
			"throttling" : { 
				"name" : "ListFinancialEventsByNextToken",
				"maxRequestQuota" : 30,
				"hourlyRestoreRate" : 1800	// One request every two seconds
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
				"name" : "Finances.GetServiceStatus",
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







class FulfillmentInboundRequest extends AmazonMwsRequest {
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







class FulfillmentInventoryRequest extends AmazonMwsRequest {
	constructor(creds) {
		super(creds);
		this.query["Version"] = "2010-10-01";
		this.query["SellerId"] = creds.MerchantId;
		this.path = "/FulfillmentInventory/2010-10-01";
	}

	ListInventorySupply(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ListInventorySupply";
		this.setThrottling("ListInventorySupply", 30, 2 * 60 * 60); // two requests every second

		if ('SellerSkus'			in params)  	this.listify.set('SellerSkus.member', params.SellerSkus);
		if ('QueryStartDateTime'	in params)		this.query["QueryStartDateTime"] = new Date(params.QueryStartDateTime);
		if ('ResponseGroup'			in params)		this.query["ResponseGroup"] =  params.ResponseGroup;
		if ('MarketplaceId'			in params)		this.query["MarketplaceId"] = params.MarketplaceId;

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListInventorySupplyByNextToken(params) {
		this.requestSchema = {
			"title"      : "ListInventorySupplyByNextToken",
			"throttling" : { 
				"name" : "ListInventorySupply",
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
				"name" : "FulfillmentInventory.GetServiceStatus",
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







class FulfillmentOutboundRequest extends AmazonMwsRequest {

	constructor(creds) {
		super(creds);
		this.query["Version"] = "2010-10-01";
		this.query["SellerId"] = creds.MerchantId;
		this.path = "/FulfillmentOutboundShipment/2010-10-01";
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







class MerchantFulfillmentRequest extends AmazonMwsRequest {
	constructor(creds) {
		super(creds);
		this.query["Version"] = "2015-06-01";
		this.query["SellerId"] = "creds.MerchantId";
		this.path = "/MerchantFulfillment/2015-06-01";
	}

	GetEligibleShippingServices(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetEligibleShippingServices";
		this.setThrottling("GetEligibleShippingServices", 10, 5 * 60 * 60); // five requests every second

		if (this.missingParams(params, ['AmazonOrderId', 'ItemList', 'ShipFromAddress', 'PackageDimensions', 'Weight', 'ShippingServiceOptions'])) 
		return deferred.reject(this.paramsError);

		this.query["ShipmentRequestDetails.AmazonOrderId"] = params.AmazonOrderId;
		this.mapComplexList(params.ItemList);
		

		if ('SellerOrderId' in params)	this.query["ShipmentRequestDetails.SellerOrderId"] = params.SellerOrderId;

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	CreateShipment(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "CreateShipment";
		this.setThrottling("CreateShipment", 10, 5 * 60 * 60); // five requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetShipment(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetShipment";
		this.setThrottling("GetShipment", 10, 5 * 60 * 60); // five requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	CancelShipment(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "CancelShipment";
		this.setThrottling("CancelShipment", 10, 5 * 60 * 60); // five requests every second

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
				"name" : "MerchantFulfillment.GetServiceStatus",
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







class OrdersRequest extends AmazonMwsRequest {
	constructor(creds) {
		super(creds);
		this.query["Version"] = "2013-09-01";
		this.query["SellerId"] = "creds.MerchantId";
		this.path = "/Orders/2013-09-01";
	}

	ListOrders(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ListOrders";
		this.setThrottling("ListOrders", 6, 60); // one request every minute

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListOrdersByNextToken(params) {

		this.requestSchema = {
			"title"      : "ListOrdersByNextToken",
			"throttling" : { 
				"name" : "ListOrders",
				"maxRequestQuota" : 6,
				"hourlyRestoreRate" : 60	// one request every minute
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

	GetOrder(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetOrder";
		this.setThrottling("GetOrder", 6, 60); // one request every minute

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListOrderItems(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ListOrderItems";
		this.setThrottling("ListOrderItems", 30, 1800); // One request every two seconds

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListOrderItemsByNextToken(params) {
		this.requestSchema = {
			"title"      : "ListOrderItemsByNextToken",
			"throttling" : { 
				"name" : "ListOrderItems",
				"maxRequestQuota" : 30,
				"hourlyRestoreRate" : 1800	// One request every two seconds
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
				"name" : "Orders.GetServiceStatus",
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







class ProductsRequest extends AmazonMwsRequest {
	constructor(creds) {
		super(creds);
		this.query["Version"] = "2011-10-01";
		this.query["SellerId"] = creds.MerchantId;
		this.path = "/Products/2011-10-01";
	}

	ListMatchingProducts(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ListMatchingProducts";
		this.setThrottling("ListMatchingProducts", 20, 720); // One request every five seconds

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetMatchingProduct(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetMatchingProduct";
		this.setThrottling("GetMatchingProduct", 20, 7200); // Two requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetMatchingProductForId(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetMatchingProductForId";
		this.setThrottling("GetMatchingProductForId", 20, 18000); // Five requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetCompetitivePricingForSKU(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetCompetitivePricingForSKU";
		this.setThrottling("GetCompetitivePricing", 20, 36000); // Ten requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetCompetitivePricingForASIN(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetCompetitivePricingForASIN";
		this.setThrottling("GetCompetitivePricing", 20, 36000); // Ten requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetLowestOfferListingsForSKU(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetLowestOfferListingsForSKU";
		this.setThrottling("GetLowestOfferListings", 20, 36000); // Ten requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetLowestOfferListingsForASIN(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetLowestOfferListingsForASIN";
		this.setThrottling("GetLowestOfferListings", 20, 36000); // Ten requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetLowestPricedOffersForSKU(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetLowestPricedOffersForSKU";
		this.setThrottling("GetLowestPricedOffers", 10, 200);

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise; 
	}

	GetLowestPricedOffersForASIN(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetLowestPricedOffersForASIN";
		this.setThrottling("GetLowestPricedOffers", 10, 200);

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetMyPriceForSKU(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetMyPriceForSKU";
		this.setThrottling("GetMyPrice", 20, 36000); // Ten requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetMyPriceForASIN(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetMyPriceForASIN";
		this.setThrottling("GetMyPrice", 20, 36000); // Ten requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetProductCategoriesForSKU(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetProductCategoriesForSKU";
		this.setThrottling("GetProductCategories", 20, 720); // One request every five seconds

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetProductCategoriesForASIN(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetProductCategoriesForASIN";
		this.setThrottling("GetProductCategories", 20, 720); // One request every five seconds

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
				"name" : "Products.GetServiceStatus",
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







class RecommendationsRequest extends AmazonMwsRequest {
	constructor(creds) {
		super(creds);
		this.query["Version"] = "2013-04-01";
		this.query["SellerId"] = creds.MerchantId;
		this.path = "/Recommendations/2013-04-01";
	}

	GetLastUpdatedTimeForRecommendations(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetLastUpdatedTimeForRecommendations";
		this.setThrottling("GetLastUpdatedTimeForRecommendations", 8, 30 * 60); // one request every two seconds

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListRecommendations(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ListRecommendations";
		this.setThrottling("ListRecommendations", 8, 30 * 60); // one request every two seconds

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListRecommendationsByNextToken(params) {

		this.requestSchema = {
			"title"      : "ListRecommendationsByNextToken",
			"throttling" : { 
				"name" : "ListRecommendationsByNextToken",
				"maxRequestQuota" : 8,
				"hourlyRestoreRate" : 1800	// One request every two seconds
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
				"name" : "Recommendations.GetServiceStatus",
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







class ReportsRequest extends AmazonMwsRequest {
	constructor(creds) {
		super(creds);
		this.query["Version"] = "2009-01-01";
		this.query["Merchant"] = creds.MerchantId;
		this.path = "/";
	}

	RequestReport(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "RequestReport";
		this.setThrottling("RequestReport", 15, 60); // one request every minute

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetReportRequestList(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetReportRequestList";
		this.setThrottling("GetReportRequestList", 10, 80); // one request every 45 seconds

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetReportRequestListByNextToken(params) {

		this.requestSchema = {
			"title"      : "GetReportRequestListByNextToken",
			"throttling" : { 
				"name" : "GetReportRequestListByNextToken",
				"maxRequestQuota" : 30,
				"hourlyRestoreRate" : 1800	// One request every two seconds
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

	GetReportRequestCount(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetReportRequestCount";
		this.setThrottling("GetReportRequestCount", 10, 80); // one request every 45 seconds

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	CancelReportRequests(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "CancelReportRequests";
		this.setThrottling("CancelReportRequests", 10, 80); // one request every 45 seconds

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetReportList(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetReportList";
		this.setThrottling("GetReportList", 10, 60); // one request every minute

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetReportListByNextToken(params) {
		this.requestSchema = {
			"title"      : "GetReportListByNextToken",
			"throttling" : { 
				"name" : "GetReportListByNextToken",
				"maxRequestQuota" : 30,
				"hourlyRestoreRate" : 1800	// One request every two seconds
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

	GetReportCount(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetReportCount";
		this.setThrottling("GetReportCount", 10, 80); // one request every 45 seconds

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetReport(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetReport";
		this.setThrottling("GetReport", 10, 60); // one request every minute

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ManageReportSchedule(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ManageReportSchedule";
		this.setThrottling("ManageReportSchedule", 10, 80); // one request every 45 seconds

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetReportScheduleList(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] =  "GetReportScheduleList";
		this.setThrottling("GetReportScheduleList", 10, 80); // one request every 45 seconds

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

/**
 * @see  http://docs.developer.amazonservices.com/en_US/reports/Reports_GetReportScheduleListByNextToken.html
 * "Currently this operation can never be called because the GetReportScheduleList operation cannot return more than 100 results. 
 * It is included for future compatibility."
 */
	GetReportScheduleListByNextToken(params) {
		this.query["Action"] =  "GetReportScheduleListByNextToken";
	}

	GetReportScheduleCount(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetReportScheduleCount";
		this.setThrottling("GetReportScheduleCount", 10, 80); // one request every 45 seconds


		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	UpdateReportAcknowledgements(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "UpdateReportAcknowledgements";
		this.setThrottling("UpdateReportAcknowledgements", 10, 80); // one request every 45 seconds


		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}
}







class SellersRequest extends AmazonMwsRequest {
	constructor(creds) {
		super(creds);
		this.query["Version"] = "2011-07-01";
		this.query["SellerId"] = creds.MerchantId;
		this.path = "/Sellers/2011-07-01";		
	}

	ListMarketplaceParticipations(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ListMarketplaceParticipations";
		this.setThrottling("ListMarketplaceParticipations", 15, 60); // one request per minute

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListMarketplaceParticipationsByNextToken(params) {

		this.requestSchema = {
			"title"      : "ListMarketplaceParticipationsByNextToken",
			"throttling" : { 
				"name" : "ListMarketplaceParticipations",
				"maxRequestQuota" : 15,
				"hourlyRestoreRate" : 60	// One request per minute
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
				"name" : "Sellers.GetServiceStatus",
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







class SubscriptionsRequest extends AmazonMwsRequest {
	constructor(creds) {
		super(creds);
		this.query["Version"] = "2013-07-01";
		this.query["SellerId"] = creds.MerchantId;
		this.path = "/Subscriptions/2013-07-01";
	}

	RegisterDestination(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "RegisterDestination";
		this.setThrottling("RegisterDestination", 25, 2 * 60 * 60); // two requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	DeregisterDestination(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "DeregisterDestination";
		this.setThrottling("DeregisterDestination", 25, 2 * 60 * 60); // two requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListRegisteredDestinations(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ListRegisteredDestinations";
		this.setThrottling("ListRegisteredDestinations", 25, 2 * 60 * 60); // two requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	SendTestNotificationToDestination(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "SendTestNotificationToDestination";
		this.setThrottling("SendTestNotificationToDestination", 25, 2 * 60 * 60); // two requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	CreateSubscription(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "CreateSubscription";
		this.setThrottling("CreateSubscription", 25, 2 * 60 * 60); // two requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	GetSubscription(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetSubscription";
		this.setThrottling("GetSubscription", 25, 2 * 60 * 60); // two requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	DeleteSubscription(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "DeleteSubscription";
		this.setThrottling("DeleteSubscription", 25, 2 * 60 * 60); // two requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListSubscriptions(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ListSubscriptions";
		this.setThrottling("ListSubscriptions", 25, 2 * 60 * 60); // two requests every second

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	UpdateSubscription(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "UpdateSubscription";
		this.setThrottling("UpdateSubscription", 25, 2 * 60 * 60); // two requests every second

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
				"name" : "Subscriptions.GetServiceStatus",
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







class WebstoreRequest extends AmazonMwsRequest {
	constructor(creds) {
		super(creds);
		this.query["Version"] = "2014-09-01";
		this.query["SellerId"] = creds.MerchantId;
		this.path = "/WebstoreAPI/2014-09-01";
	}

	ListSubscriptionsCount(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "ListSubscriptionsCount";
		this.setThrottling("ListSubscriptionsCount", 50, 20 * 60); // 20 requests every minute

		this.makeRequest((result)=>{
			if (this.detectResponseError(result)) return deferred.reject(this.responseError);		
			deferred.fulfill(result);			
		});

		return deferred.promise;
	}

	ListSubscriptionsCountByNextToken(params) {

		this.requestSchema = {
			"title"      : "ListSubscriptionsCountByNextToken",
			"throttling" : { 
				"name" : "ListSubscriptionsCountByNextToken",
				"maxRequestQuota" : 50,
				"hourlyRestoreRate" : 20 * 60	/// 20 requests every minute
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

	GetSubscriptionDetails(params) {
		var deferred = MyPromise.pending();
		this.resetQuery();
		this.query["Action"] = "GetSubscriptionDetails";
		this.setThrottling("GetSubscriptionDetails", 15, 5 * 60); // five requests every minute

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
				"name" : "Webstore.GetServiceStatus",
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






class MyMWSClass {
	constructor(creds) {
		this.CartInformation      = new CartInformationRequest(creds);
		this.CustomerInformation  = new CustomerInformationRequest(creds);
		this.Feeds                = new FeedsRequest(creds);
		this.Finances             = new FinancesRequest(creds);
		this.FulfillmentInbound   = new FulfillmentInboundRequest(creds);
		this.FulfillmentInventory = new FulfillmentInventoryRequest(creds);
		this.FulfillmentOutbound  = new FulfillmentOutboundRequest(creds);
		this.MerchantFulfillment  = new MerchantFulfillmentRequest(creds);
		this.Orders               = new OrdersRequest(creds);
		this.Products             = new ProductsRequest(creds);
		this.Recommendations      = new RecommendationsRequest(creds);
		this.Reports              = new ReportsRequest(creds);
		this.Sellers              = new SellersRequest(creds);
		this.Subscriptions        = new SubscriptionsRequest(creds);
		this.Webstore             = new WebstoreRequest(creds);
	}


	parseParams(keys, reqbody) {
		var params = {};
		for (var key of keys) {
			params[key] = (key in reqbody) ? reqbody[key] : null;
		}

		return	_.omit(params, _.isNull);	
	}
};






var MWSCreds = {
	AccessKeyId     : '0DAMF4S8ATPSYMJW1AG2',
	SecretAccessKey : 'Gav3iKO4mgLJjWxye31ZyPe2detP6D0yd+2Pe1SD',
	MerchantId      : 'A1SGWLLOJ9HNYJ',
	MarketplaceId   : 'ATVPDKIKX0DER'
};

var MyMWS = new MyMWSClass(MWSCreds);

var 
	express  = require('express'),
	router   = express.Router();
	//_         = require('lodash');
	//Q        = require('q'),
	//MyMWS    = require('libs/amazon/mws-davec'),
	//xml2js = require('xml2js'),
	//S       = require('string'),
	//config    = require('libs/amazon/mws-davec/config'),
	//xml = require('xml');
	

var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

module.exports = router;

router.use(function(err, req, res, next) {
	res.json(err);
});






router.post('/GetFeedSubmissionList', upload.array(), function (req, res, next) {
	
	var params 	= _.omit({
		FeedSubmissionIdList   		: ('FeedSubmissionIdList' 		in req.body) 	? req.body.FeedSubmissionIdList		: null,
		MaxCount               		: ('MaxCount' 					in req.body) 	? req.body.MaxCount 				: null,
		FeedTypeList           		: ('FeedTypeList' 				in req.body) 	? req.body.FeedTypeList 			: null,
		FeedProcessingStatusList	: ('FeedProcessingStatusList'	in req.body)	? req.body.FeedProcessingStatusList : null,
		SubmittedFromDate      		: ('SubmittedFromDate' 			in req.body) 	? req.body.SubmittedFromDate		: null,
		SubmittedToDate        		: ('SubmittedToDate' 			in req.body) 	? req.body.SubmittedToDate 			: null
	}, _.isNull);

	MyMWS.Feeds.GetFeedSubmissionList(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});


router.get('/OrdersGetServiceStatus', upload.array(), function (req, res, next) {
	
	var params 	= _.omit({

	}, _.isNull);

	MyMWS.Orders.GetServiceStatus(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});