var 
	MyPromise = require('bluebird'),
	_         = require('lodash'),
	https     = require('https'),
	crypto    = require('crypto'),
	tls       = require('tls'),
	qs        = require("querystring"),
	xml2js    = require('xml2js'),
	Validator = require('jsonschema').Validator;



module.exports = class AmazonMwsParentRequest {
	constructor(ChildData) {		
		this.httpVerb       = "POST";
		this.host           = "mws.amazonservices.com";
		this.port           = 443;
		this.appName        = "Node_MWS_Client";
		this.appVersion     = "0.1.0";
		this.appLanguage    = "Javascript / NodeJS";
		this.contentType    = "application/x-www-form-urlencoded; charset=utf-8";
		this.httpBody       = "";
		this.paramsError    = "";
		this.queryString    = "";
		this.queryStringSig = "";
		this.upload         = false;
		this.headers        = {};
		this.responseError  = {};
		this.path           = ChildData.Path;
		this.parser         = ChildData.Parser;
		this.subSchemas     = ChildData.SubSchemas;
		this.mainSchema     = ChildData.MainSchema;
		this.callName       = ChildData.CallName;
		this.params         = ChildData.Params;	
		this.schemaValidator = new Validator();		
		this.query          = {
			AWSAccessKeyId  : process.env.MWS_AccessKeyId,
			SecretAccessKey  : process.env.MWS_SecretAccessKey,
			MarketplaceId    : process.env.MWS_MarketplaceId,
			SignatureMethod  : "HmacSHA256",
			SignatureVersion : 2,
			Timestamp        : new Date().toISOString(),
			Version          : ChildData.Version
		};

		if (ChildData.SellerOrMerchant === "Seller")   this.query.SellerId = process.env.MWS_MerchantId;
		if (ChildData.SellerOrMerchant === "Merchant") this.query.Merchant = process.env.MWS_MerchantId;

		
		this.subSchemas.forEach((schema)=>{ this.schemaValidator.addSchema(schema, schema.id); });

	}




	ExecuteRequest() {
		this.deferred = MyPromise.pending();
		if (!this.validate()) this.deferred.reject(this.validationErrors);

		this.buildQuery();
		this.createQueryString();
		this.signQueryString();
		this.setHeaders();	
		this.submitRequest( (result) => {
			if (this.detectResponseError(result)) {
				return this.deferred.reject(this.responseError);
			}
			if (this.parser[this.callName]) {
				this.deferred.fulfill( this.parser[this.callName](result) );	
			} else {
				this.deferred.fulfill(result);
			}
		});

		return this.deferred.promise;
	}




	validate() {
		var validation = this.schemaValidator.validate(this.params, this.mainSchema);
		this.validationErrors = validation.errors;
		return (this.validationErrors.length === 0);		
	}


	buildQuery() {
		
		this.query.Action = this.mainSchema.title;
		this.throttling = this.mainSchema.throttling;

		if (this.mainSchema.title === "GetServiceStatus") return;
		

		for (var key in this.mainSchema.properties) {
			if (key in this.params) {
				switch(this.requestSchema.properties[key].type) {
					case 'number' :
					case 'integer' :
					case 'string' :
						this.query[key] = this.params[key];
						break;
					case 'array' :
						this.listify(this.requestSchema.properties[key].name, this.params[key]);
						break;
					case 'datetime':
						this.query[key] = new Date(this.params[prop]).toISOString();
						break;
					case 'boolean':
						setBooleanParam(key, this.params);
						break;
				}
			}
		}
	}


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


	setBooleanParam(key, params) {
		var booltext = (params[key]) ? 'true' : 'false';	
		this.query[key] = booltext;
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





	detectResponseError(result) {
		this.responseError = _.get(result, 'ErrorResponse.Error', null);
		return (_.isEmpty(this.responseError)) ? null : this.responseError;
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
