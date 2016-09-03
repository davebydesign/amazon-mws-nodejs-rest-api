var 
	AmazonMwsRequest = require('../base_request'),
	Parser = require('./parser'),
	Schema = require('./schema.js');



class ProductsRequestCall extends AmazonMwsRequest {
	constructor(CallName, params) {
		super();
		this.query.Version  = "2011-10-01";
		this.query.SellerId = process.env.MWS_MerchantId;
		this.path           = "/Products/2011-10-01";

		return this.MakeCall(CallName, params);
	}

	MakeCall(CallName, params) {
		this.requestSchema = Schema[CallName];
		return this.invoke(params, (result)=>{
			if (this.detectResponseError(result)) return this.deferred.reject(this.responseError);

			let parsedResult = Parser[CallName](result);
			this.deferred.fulfill(parsedResult);		
		});
	}
}





class ProductsRequest  {

	constructor() {}

	ListMatchingProducts(params) {
		return new ProductsRequestCall('ListMatchingProducts', params);
	}

	GetMatchingProduct(params) {
		return new ProductsRequestCall('GetMatchingProduct', params);
	}


	/*
	ListMatchingProducts(params) {
		let Call = new ProductsRequestCall();
		Call.requestSchema = Schema.ListMatchingProducts;

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);

			let parsedResult = Parser.ListMatchingProducts(result);
			Call.deferred.fulfill(parsedResult);		
		});
		
	}
	*/


	/*
	GetMatchingProduct(params) {
		let Call = new ProductsRequestCall();
		Call.requestSchema = Schema.GetMatchingProduct;

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);

			let parsedResult = Parser.GetMatchingProduct(result);
			Call.deferred.fulfill(parsedResult);			
		});
	}
	*/



	/*** TESTED ***/
	GetMatchingProductForId(params) {
		let Call = new ProductsRequestCall();
		Call.requestSchema = Schema.GetMatchingProductForId;

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);

			let parsedResult = Parser.GetMatchingProductForId(result);	
			Call.deferred.fulfill(parsedResult);			
		});		
	}





	/*** TESTED ***/
	/* Gets the new and used buy box price */
	GetCompetitivePricingForSKU(params) {
		let Call = new ProductsRequestCall();
		Call.requestSchema = Schema.GetCompetitivePricingForSKU;

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);

			let parsedResult = Parser.GetCompetitivePricingForSKU(result);		
			Call.deferred.fulfill(parsedResult);			
		});	
	}






	/*** TESTED ***/
	/* Gets the new and used buy box price */
	GetCompetitivePricingForASIN(params) {
		let Call = new ProductsRequestCall();
		Call.requestSchema = Schema.GetCompetitivePricingForASIN;

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);

			let parsedResult = Parser.GetCompetitivePricingForASIN(result);		
			Call.deferred.fulfill(parsedResult);			
		});	
	}





	/*** TESTED ***/
	GetLowestOfferListingsForSKU(params) {
		let Call = new ProductsRequestCall();
		Call.requestSchema = Schema.GetLowestOfferListingsForSKU;
		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);

			let parsedResult = Parser.GetLowestOfferListingsForSKU(result);		
			Call.deferred.fulfill(parsedResult);			
		});			
	}





	/*** TESTED ***/
	GetLowestOfferListingsForASIN(params) {
		let Call = new ProductsRequestCall();
		Call.requestSchema = Schema.GetLowestOfferListingsForASIN;

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);

			let parsedResult = Parser.GetLowestOfferListingsForASIN(result);	
			Call.deferred.fulfill(parsedResult);			
		});
	}


	/*** TESTED ***/
	GetLowestPricedOffersForSKU(params) {
		let Call = new ProductsRequestCall();
		Call.requestSchema = Schema.GetLowestPricedOffersForSKU;

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);
			let parsedResult = Parser.GetLowestPricedOffersForSKU(result);	
			Call.deferred.fulfill(parsedResult);			
		});		 
	}





	/*** TESTED ***/
	GetLowestPricedOffersForASIN(params) {
		let Call = new ProductsRequestCall();
		Call.requestSchema = Schema.GetLowestPricedOffersForASIN;

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);
			let parsedResult = Parser.GetLowestPricedOffersForASIN(result);	
			Call.deferred.fulfill(parsedResult);			
		});			
	}





	/*** TESTED ***/
	GetMyPriceForSKU(params) {
		let Call = new ProductsRequestCall();
		Call.requestSchema = Schema.GetMyPriceForSKU;

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);
			let parsedResult = Parser.GetMyPriceForSKU(result);		
			Call.deferred.fulfill(parsedResult);			
		});	
	}





	/*** TESTED ***/
	GetMyPriceForASIN(params) {
		let Call = new ProductsRequestCall();

		Call.requestSchema = Schema.GetMyPriceForASIN;

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);
			let parsedResult = Parser.GetMyPriceForASIN(result);			
			Call.deferred.fulfill(parsedResult);			
		});	



	}





	/*** TESTED ***/
	GetProductCategoriesForSKU(params) {
		let Call = new ProductsRequestCall();

		Call.requestSchema = Schema.GetProductCategoriesForSKU;

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);
			let parsedResult = Parser.GetProductCategoriesForSKU(result);	
			Call.deferred.fulfill(parsedResult);			
		});	

	}





	/*** TESTED ***/
	GetProductCategoriesForASIN(params) {

		let Call = new ProductsRequestCall();

		Call.requestSchema = Schema.GetProductCategoriesForASIN;

		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);
			let parsedResult = Parser.GetProductCategoriesForASIN(result);	
			Call.deferred.fulfill(parsedResult);			
		});
	}

	GetServiceStatus(params) {
		let Call = new ProductsRequestCall();
		Call.requestSchema = Schema.GetServiceStatus;
		
		return Call.invoke(params, (result)=>{
			if (Call.detectResponseError(result)) return Call.deferred.reject(Call.responseError);		
			Call.deferred.fulfill(result);			
		});
	}
}

module.exports = new ProductsRequest();