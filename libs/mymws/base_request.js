var 
	MyPromise = require('bluebird'),
	_         = require('lodash'),
	https  = require('https'),
	crypto = require('crypto'),
	tls    = require('tls'),
	qs     = require("querystring"),
	xml2js = require('xml2js'),
	Validator = require('jsonschema').Validator;



module.exports = class AmazonMwsRequest {
	constructor() {
		this.deferred = MyPromise.pending();
		this.query = {};
		//this.creds          = creds;
		this.httpVerb       = "POST";
		this.host           = "mws.amazonservices.com";
		this.port           = 443;
		this.appName        = "Node_MWS_Client";
		this.appVersion     = "0.1.0";
		this.appLanguage    = "Javascript / NodeJS";
		this.contentType    = "application/x-www-form-urlencoded; charset=utf-8";
		this.resetQuery();
		

	}

	resetQuery() {

		 if (this.query.Version) {
		 	this.Version = this.query.Version;
		 }

		 if (this.query.SellerId) {
		 	this.SellerId = process.env.MWS_MerchantId;
		 	this.Merchant = null;		 	
		 }

		 if (this.query.Merchant) {
		 	this.Merchant = process.env.MWS_MerchantId;
		 	this.SellerId = null;		 	
		 }


		this.query = {
			/*
			AWSAccessKeyId   : this.creds.AccessKeyId 		|| '',
			SecretAccessKey  : this.creds.SecretAccessKey 	|| '',
			MarketplaceId    : this.creds.MarketplaceId,
			*/
		
			AWSAccessKeyId   : process.env.MWS_AccessKeyId,
			SecretAccessKey  : process.env.MWS_SecretAccessKey,
			MarketplaceId    : process.env.MWS_MarketplaceId,
			SignatureMethod  : "HmacSHA256",
			SignatureVersion : 2,
			Timestamp        : new Date().toISOString(),
			Version : this.version
		};
		//if (this.sellerOrMerchant == "Seller") this.query["SellerId"] = this.creds.MerchantId;
		//if (this.sellerOrMerchant == "Merchant") this.query["Merchant"] = this.creds.MerchantId;
		
		this.queryVersion = this.Version;

		if (this.SellerId) {
			this.querySellerId = this.SellerId;
		}

		if (this.Merchant) {
			this.queryMerchant = this.Merchant;
		}

		this.httpBody       = "";
		this.paramsError    = "";
		//this.responseError  = {};
		this.queryString    = "";
		this.queryStringSig = "";
		this.upload         = false;
		this.headers        = {};
		this.loadSchema();	
	}

	loadSchema() {
		this.schemaValidator = new Validator();

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
		].forEach((schema)=>{ this.schemaValidator.addSchema(schema, schema.id); });



		//this.v.addSchema(this.definitionsSchema, '/AmazonMWS');


	}

	buildQuery(params) {
		
		this.query.Action = this.requestSchema.title;
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
		var validation = this.schemaValidator.validate(params, this.requestSchema);
		this.validationErrors = validation.errors;
		return (this.validationErrors.length === 0);		
	}



	log(){
		console.log("super:"+JSON.stringify(this, null, 3));	
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
		if (this.responseError) return (this.responseError);


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
			  if (result.Error) throw(Error.Code + ": " + Error.Message);
			  			
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
		var hash = crypto.createHmac("sha256", process.env.MWS_SecretAccessKey);
		this.query.Signature = hash.update(this.queryString).digest("base64");
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
		};
		if (this.upload) {
			this.headers['Content-MD5'] = cryto.createHash('md5').update(this.httpBody).digest("base64");
		}
	}


	invoke(params, callback) {
		if (!this.validate(params)) this.deferred.reject(this.validationErrors); 

		this.buildQuery(params);

		this.makeRequest(callback);

		//console.log(JSON.stringify(this.query, null, 3));

		this.resetQuery();

		return this.deferred.promise;		
	}

};




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
