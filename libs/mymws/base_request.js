var 
	MyPromise = require('bluebird'),
	_         = require('lodash'),
	https  = require('https'),
	crypto = require('crypto'),
	tls    = require('tls'),
	qs     = require("querystring"),
	xml2js = require('xml2js'),
	Schemas = require('./schemas'),
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
		Schemas.forEach((schema)=>{ this.schemaValidator.addSchema(schema, schema.id); });
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
