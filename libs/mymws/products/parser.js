var _  = require('lodash');

function forceArray(ArrayOrObj) {
	/*
	if (_.isArray(ArrayOrObj))
		return ArrayOrObj;
	else
		return [ArrayOrObj];
	*/

	return (_.isArray(ArrayOrObj)) ? ArrayOrObj : [ArrayOrObj];
}

class ParserClass {


	GetMatchingProduct(result) {
		let 
		Results  = forceArray(result.GetMatchingProductResponse.GetMatchingProductResult),  
		Products = [],
		Errors   = [];

		for (let Result of Results) {
			if (Result.$.status == "Success") {
				Products.push(this.ParseProduct(Result.Product));
			} else {
				Errors.push(Result.Error);	
			}
		}

		return {Products: Products, Errors: Errors};
	}


	ListMatchingProducts(result) {
		//return result;
		if (!result.ListMatchingProductsResponse.ListMatchingProductsResult.Products.Product) return [];

		let 
		Results  = forceArray(result.ListMatchingProductsResponse.ListMatchingProductsResult.Products.Product),
		Products = [];

		for (let Result of Results) {
			Products.push(this.ParseProduct(Result));
		}

		return Products;
	}

	GetMatchingProductForId(result) {
		let 
		Results  = forceArray(result.GetMatchingProductForIdResponse.GetMatchingProductForIdResult),  
		Products = [],
		Errors   = [];

		for (let Result of Results) {
			if (Result.$.status == "Success") {
				Products.push(this.ParseProduct(Result.Products.Product));
			} else {
				Errors.push(Result.Error);	
			}
		}

		return {Products: Products, Errors: Errors};
	}


	GetCompetitivePricingForSKU(result) {
		//return result;
		let 
		Results  = forceArray(result.GetCompetitivePricingForSKUResponse.GetCompetitivePricingForSKUResult),
		Products = [],
		Errors   = [];

		for (let Result of Results) {
			if (Result.$.status == "Success") {
				Products.push(this.ParseCompetitivePricing(Result.Product));
			} else {
				Errors.push(Result.Error);	
			}
		}

		return {Products: Products, Errors: Errors};
	}



	GetCompetitivePricingForASIN(result) {
		//return result;
		let 
		Results  = forceArray(result.GetCompetitivePricingForASINResponse.GetCompetitivePricingForASINResult),
		Products = [],
		Errors   = [];

		for (let Result of Results) {
			if (Result.$.status == "Success") {
				Products.push(this.ParseCompetitivePricing(Result.Product));
			} else {
				Errors.push(Result.Error);	
			}
		}

		return {Products: Products, Errors: Errors};
	}

	GetLowestOfferListingsForSKU(result) {
		//return result;
		let 
		Results  = forceArray(result.GetLowestOfferListingsForSKUResponse.GetLowestOfferListingsForSKUResult),
		Products = [],
		Errors   = [];

		for (let Result of Results) {
			if (Result.$.status == "Success") {
				Products.push(this.ParseLowestOfferListings(Result));
			} else {
				Errors.push(Result.Error);	
			}
		}

		return {Products: Products, Errors: Errors};		
	}


	GetLowestOfferListingsForASIN(result) {
		//return result;
		let 
		Results  = forceArray(result.GetLowestOfferListingsForASINResponse.GetLowestOfferListingsForASINResult),
		Products = [],
		Errors   = [];

		for (let Result of Results) {
			if (Result.$.status == "Success") {
				Products.push(this.ParseLowestOfferListings(Result));
			} else {
				Errors.push(Result.Error);	
			}
		}

		return {Products: Products, Errors: Errors};		
	}








	GetLowestPricedOffersForSKU(UnparsedResult) {
		let
		Result       = UnparsedResult.GetLowestPricedOffersForSKUResponse.GetLowestPricedOffersForSKUResult,
		ParsedResult = {
			Identifier : Result.Identifier,
			Summary    : {
				TotalOfferCount      : (Result.Summary.TotalOfferCount) ? Result.Summary.TotalOfferCount : 0,
				NumberOfOffers       : this.GetLowestPricedOffersParseNumberOfOffers(Result.Summary.NumberOfOffers),
				LowestPrices         : this.GetLowestPricedOffersParseLowestPrices(Result.Summary.LowestPrices),
				BuyBoxPrices         : this.GetLowestPricedOffersParseBuyBoxPrices(Result.Summary),
				ListPrice            : (Result.Summary.ListPrice) ? (Result.Summary.ListPrice.Amount) : 0,
				BuyBoxEligibleOffers : this.GetLowestPricedOffersParseNumberOfOffers(Result.Summary.BuyBoxEligibleOffers)
			},
			Offers : Result.Offers.Offer.map(this.GetLowestPricedOffersParseOffers)
		};

		return ParsedResult;
	}

	GetLowestPricedOffersForASIN(UnparsedResult) {
		let Result = UnparsedResult.GetLowestPricedOffersForASINResponse.GetLowestPricedOffersForASINResult;

		let ParsedResult = {
			Identifier : Result.Identifier,
			Summary    : {
				TotalOfferCount      : (Result.Summary.TotalOfferCount) ? Result.Summary.TotalOfferCount : 0,
				NumberOfOffers       : this.GetLowestPricedOffersParseNumberOfOffers(Result.Summary.NumberOfOffers),
				LowestPrices         : this.GetLowestPricedOffersParseLowestPrices(Result.Summary.LowestPrices),
				BuyBoxPrices         : this.GetLowestPricedOffersParseBuyBoxPrices(Result.Summary),
				ListPrice            : (Result.Summary.ListPrice) ? (Result.Summary.ListPrice.Amount) : 0,
				BuyBoxEligibleOffers : this.GetLowestPricedOffersParseNumberOfOffers(Result.Summary.BuyBoxEligibleOffers)
			},
			Offers : Result.Offers.Offer.map(this.GetLowestPricedOffersParseOffers)
		};

		return ParsedResult;
	}

	GetMyPriceForSKU(UnparsedResult) {
		let Results = forceArray(UnparsedResult.GetMyPriceForSKUResponse.GetMyPriceForSKUResult);
		return Results.map(this.GetMyPriceParseResults);
	}

	GetMyPriceForASIN(UnparsedResult) {
		let Results = forceArray(UnparsedResult.GetMyPriceForASINResponse.GetMyPriceForASINResult);
		//return Results;
		return Results.map(this.GetMyPriceParseResults);
	}




	GetProductCategoriesForSKU(UnparsedResult) {
		//return UnparsedResult;
		if (!UnparsedResult.GetProductCategoriesForSKUResponse.GetProductCategoriesForSKUResult.Self) {
			return [];
		}
		let Results = forceArray(UnparsedResult.GetProductCategoriesForSKUResponse.GetProductCategoriesForSKUResult.Self);

		return Results.map(this.GetProductCategoriesParseResults);
	}

	GetProductCategoriesForASIN(UnparsedResult) {
		//return UnparsedResult;
		if (!UnparsedResult.GetProductCategoriesForASINResponse.GetProductCategoriesForASINResult.Self) {
			return [];
		}
		let Results = forceArray(UnparsedResult.GetProductCategoriesForASINResponse.GetProductCategoriesForASINResult.Self);

		return Results.map(this.GetProductCategoriesParseResults);
	}

	GetProductCategoriesParseResults(Result) {
		let 
		FullCategoryName = Result.ProductCategoryName,
		FullCategoryIDPath = Result.ProductCategoryId,
		temp = Result;

		while (temp.Parent) {
			temp = temp.Parent;
			FullCategoryName = temp.ProductCategoryName + " | " + FullCategoryName;
			FullCategoryIDPath = temp.ProductCategoryId + " | " + FullCategoryIDPath;
		}

		return {
			ProductCategoryId   : Result.ProductCategoryId,
			ProductCategoryName : Result.ProductCategoryName,
			FullCategoryName    : FullCategoryName,
			FullCategoryIDPath  : FullCategoryIDPath

		};
	}



	GetMyPriceParseResults(Result) {
		return {
			ASIN : Result.Product.Identifiers.MarketplaceASIN.ASIN,
			SellerSKU : Result.Product.Offers.Offer.SellerSKU,
			LandedPrice : Result.Product.Offers.Offer.BuyingPrice.LandedPrice.Amount,
			ListingPrice : Result.Product.Offers.Offer.BuyingPrice.ListingPrice.Amount,
			Shipping : Result.Product.Offers.Offer.BuyingPrice.Shipping.Amount,
			RegularPrice : Result.Product.Offers.Offer.RegularPrice.Amount,
			FulfillmentChannel : Result.Product.Offers.Offer.FulfillmentChannel,
			ItemCondition : Result.Product.Offers.Offer.ItemCondition,
			ItemSubCondition : Result.Product.Offers.Offer.ItemSubCondition
		};
	}

	GetLowestPricedOffersParseOffers(Offer) {
		return {
			MyOffer                  : Offer.MyOffer,
			SubCondition             : Offer.SubCondition,
			FeedbackRating           : Offer.SellerFeedbackRating.SellerPositiveFeedbackRating,
			FeedbackCount            : Offer.SellerFeedbackRating.FeedbackCount,
			ShippingTimeMinHours     : Offer.ShippingTime.$.minimumHours,
			ShippingTimeMaxHours     : Offer.ShippingTime.$.maximumHours,
			availabilityType         : Offer.ShippingTime.$.availabilityType,
			ListingPriceAmount       : Offer.ListingPrice.Amount,
			ListingPriceCurrencyCode : Offer.ListingPrice.CurrencyCode,
			ShippingAmount           : Offer.Shipping.Amount,
			ShippingCurrencyCode     : Offer.Shipping.CurrencyCode,
			ShipsFromState           : Offer.ShipsFrom.State,
			ShipsFromCountry         : Offer.ShipsFrom.Country,
			IsFulfilledByAmazon      : Offer.IsFulfilledByAmazon,
			IsBuyBoxWinner           : Offer.IsBuyBoxWinner,
			IsFeaturedMerchant       : Offer.IsFeaturedMerchant
		};
	}

	GetLowestPricedOffersParseBuyBoxPrices(Summary) {
		let BuyBoxPrices = {
			Used : 0,
			New  : 0
		};

		if (!Summary.BuyBoxPrices) return BuyBoxPrices;

		if (Summary.BuyBoxPrices.BuyBoxPrice) {
			Summary.BuyBoxPrices = Summary.BuyBoxPrices.BuyBoxPrice;	
		}

		Summary.BuyBoxPrices = forceArray(Summary.BuyBoxPrices);


		for (let BuyBoxPrice of Summary.BuyBoxPrices) {
			if (BuyBoxPrice.$.condition === "New") {
				BuyBoxPrices.New = BuyBoxPrice.LandedPrice.Amount;	
			}
			if (BuyBoxPrice.$.condition === "Used") {
				BuyBoxPrices.Used = BuyBoxPrice.LandedPrice.Amount;	
			}
		}

		return BuyBoxPrices;
	}


	// NOT YET BULLET PROOFED FOR ZERO OFFERS
	GetLowestPricedOffersParseNumberOfOffers(Offers) {
		let NumberOfOffers = {
			FBA : {
				Used        : 0,
				New         : 0,
				Collectible : 0
			},
			Merchant : {
				Used        : 0,
				New         : 0,
				Collectible : 0
			}
		};

		for (let Offer of Offers.OfferCount) {
			if (Offer.$.fulfillmentChannel === "Amazon" && Offer.$.condition === "used") {
				NumberOfOffers.FBA.Used = Offer._;
			}
			if (Offer.$.fulfillmentChannel === "Amazon" && Offer.$.condition === "new") {
				NumberOfOffers.FBA.New = Offer._;
			}
			if (Offer.$.fulfillmentChannel === "Amazon" && Offer.$.condition === "collectible") {
				NumberOfOffers.FBA.Collectible = Offer._;
			}
			if (Offer.$.fulfillmentChannel === "Merchant" && Offer.$.condition === "used") {
				NumberOfOffers.Merchant.Used = Offer._;
			}
			if (Offer.$.fulfillmentChannel === "Merchant" && Offer.$.condition === "new") {
				NumberOfOffers.Merchant.New = Offer._;
			}
			if (Offer.$.fulfillmentChannel === "Merchant" && Offer.$.condition === "collectible") {
				NumberOfOffers.Merchant.Collectible = Offer._;
			}
		}

		return 	NumberOfOffers;	
	}

	// NOT YET BULLET PROOFED FOR ZERO OFFERS
	GetLowestPricedOffersParseLowestPrices(Prices) {
		let LowestPrices = {
			FBA : {
				Used        : 0,
				New         : 0,
				Collectible : 0
			},
			Merchant : {
				Used        : 0,
				New         : 0,
				Collectible : 0
			}
		};

		for (let Offer of Prices.LowestPrice) {
			if (Offer.$.fulfillmentChannel === "Amazon" && Offer.$.condition === "used") {
				LowestPrices.FBA.Used = Offer.LandedPrice.Amount;
			}
			if (Offer.$.fulfillmentChannel === "Amazon" && Offer.$.condition === "new") {
				LowestPrices.FBA.New = Offer.LandedPrice.Amount;
			}
			if (Offer.$.fulfillmentChannel === "Amazon" && Offer.$.condition === "collectible") {
				LowestPrices.FBA.Collectible = Offer.LandedPrice.Amount;
			}
			if (Offer.$.fulfillmentChannel === "Merchant" && Offer.$.condition === "used") {
				LowestPrices.Merchant.Used = Offer.LandedPrice.Amount;
			}
			if (Offer.$.fulfillmentChannel === "Merchant" && Offer.$.condition === "new") {
				LowestPrices.Merchant.New = Offer.LandedPrice.Amount;
			}
			if (Offer.$.fulfillmentChannel === "Merchant" && Offer.$.condition === "collectible") {
				LowestPrices.Merchant.Collectible = Offer.LandedPrice.Amount;
			}
		}

		return LowestPrices;	
	}



	ParseLowestOfferListings(Result) {
		return {
			SKU : 
				(Result.Product.Identifiers.SKUIdentifier) 
				? Result.Product.Identifiers.SKUIdentifier.SellerSKU 
				: null,
			ASIN : 
				(Result.Product.Identifiers.MarketplaceASIN)
				? Result.Product.Identifiers.MarketplaceASIN.ASIN
				: null,
			AllOfferListingsConsidered : Result.AllOfferListingsConsidered,
			LowestOfferListings : 
				(Result.Product.LowestOfferListings)
				? this.SubParseLowestOfferListings(Result.Product.LowestOfferListings.LowestOfferListing)
				: []
			
		};
	}

	SubParseLowestOfferListings(LowestOfferListings) {
		LowestOfferListings = forceArray(LowestOfferListings);
		let ParsedOffers = [];
		for (let Offer of LowestOfferListings) {
			ParsedOffers.push({
				ItemCondition                : Offer.Qualifiers.ItemCondition,
				ItemSubcondition             : Offer.Qualifiers.ItemSubcondition,
				FulfillmentChannel           : Offer.Qualifiers.FulfillmentChannel,
				ShipsDomestically            : Offer.Qualifiers.ShipsDomestically,
				MaxShippingTime              : Offer.Qualifiers.ShippingTime.Max,
				SellerPositiveFeedbackRating : Offer.Qualifiers.SellerPositiveFeedbackRating,
				NumberOfOfferListingsConsidered : Offer.NumberOfOfferListingsConsidered,
				SellerFeedbackCount      : Offer.SellerFeedbackCount,
				LandedPrice              : Offer.Price.LandedPrice.Amount,
				LandedPriceCurrencyCode  : Offer.Price.LandedPrice.CurrencyCode,
				ListingPrice             : Offer.Price.ListingPrice.Amount,
				ListingPriceCurrencyCode : Offer.Price.ListingPrice.CurrencyCode,
				Shipping                 : Offer.Price.Shipping.Amount,
				ShippingCurrencyCode     : Offer.Price.Shipping.CurrencyCode,
				MultipleOffersAtLowestPrice : Offer.MultipleOffersAtLowestPrice
			});
		}
		return 	ParsedOffers;
	}


	ParseCompetitivePricing(Product) {
		//return Product;
		return {
			SKU : 
				(Product.Identifiers.SKUIdentifier) 
				? Product.Identifiers.SKUIdentifier.SellerSKU 
				: null,
			ASIN : 
				(Product.Identifiers.MarketplaceASIN) 
				? Product.Identifiers.MarketplaceASIN.ASIN 
				: null,
			BuyBoxPrices : 
				(Product.CompetitivePricing.CompetitivePrices.CompetitivePrice)
				? this.ParseCompetitivePrices(Product.CompetitivePricing.CompetitivePrices.CompetitivePrice) 
				: [],
			Offers : 
				(Product.CompetitivePricing.NumberOfOfferListings.OfferListingCount)
				? this.ParseNumberOfOfferListings(Product.CompetitivePricing.NumberOfOfferListings.OfferListingCount)
				: {New:0, Used:0, Collectible:0, Any: 0},
			TradeInValue :
				(Product.CompetitivePricing.TradeInValue)
				? Product.CompetitivePricing.TradeInValue.Amount
				: 0,
			TradeInValueCurrencyCode :
				(Product.CompetitivePricing.TradeInValue)
				? Product.CompetitivePricing.TradeInValue.CurrencyCode
				: "USD",
			SalesRank: this.ParseSalesRank(Product.SalesRankings.SalesRank)

		};
	}

	ParseCompetitivePrices(CompetitivePrices) {
		function ParsePrice(CompetitivePrice) {
			return {
				belongsToRequester       : CompetitivePrice.$.belongsToRequester,
				condition                : CompetitivePrice.$.condition,
				subcondition             : CompetitivePrice.$.subcondition,
				CompetitivePriceId       : CompetitivePrice.CompetitivePriceId,
				LandedPrice              : CompetitivePrice.Price.LandedPrice.Amount,
				LandedPriceCurrencyCode  : CompetitivePrice.Price.LandedPrice.CurrencyCode,
				ListingPrice             : CompetitivePrice.Price.ListingPrice.Amount,
				ListingPriceCurrencyCode : CompetitivePrice.Price.ListingPrice.CurrencyCode,
				Shipping                 : CompetitivePrice.Price.Shipping.Amount,
				ShippingCurrencyCode     : CompetitivePrice.Price.Shipping.CurrencyCode,
				FulfillmentChannel : (CompetitivePrice.Price.Shipping.Amount === 0) ? "Amazon" : "Merchant"
			};	
		}

		let ParsedPrices = {New : {}, Used: {}};
		CompetitivePrices = forceArray(CompetitivePrices);
		for (let CompetitivePrice of CompetitivePrices) {
			if (CompetitivePrice.$.condition === "New") {
				ParsedPrices.New = ParsePrice(CompetitivePrice);
			}
			if (CompetitivePrice.$.condition === "Used") {
				ParsedPrices.Used = ParsePrice(CompetitivePrice);
			}
		}

		return 	ParsedPrices;
	}

	ParseNumberOfOfferListings(OfferListingCount) {
		function getCount(condition) {
			for (let OfferListing of OfferListingCount) {
				if (OfferListing.$.condition === condition) {
					return OfferListing._;
				}
			}
			return 0;
		}

		return {
			New         : getCount("New"),
			Used        : getCount("Used"),
			Collectible : getCount("Collectible"),
			Any         : getCount("Any")
		};
	}


	ParseProduct(Product) {
		let
		IA           = Product.AttributeSets.ItemAttributes,

		NoDimensions = {
			Height    : 0,
			HeightUOM : 'inches',
			Length    : 0,
			LengthUOM : 'inches',
			Width     : 0,
			WidthUOM  : 'inches',
			Weight    : 0,
			WeightUOM : 'ounces'
		};

		return {
			ASIN                 : Product.Identifiers.MarketplaceASIN.ASIN,
			Authors              : forceArray(IA.Author),
			Creators             : (IA.Creator) ? this.ParseCreator(IA.Creator) : null,
			Binding              : IA.Binding,
			Brand                : IA.Brand,
			Edition              : IA.Edition,
			Feature              : IA.Feature,
			Format               : IA.Format,
			IsAdultProduct       : IA.IsAdultProduct,
			IsEligibleForTradeIn : IA.IsEligibleForTradeIn,
			Label                : IA.Label,
			Manufacturer         : IA.Manufacturer,
			NumberOfItems        : IA.NumberOfItems,
			NumberOfPages        : IA.NumberOfPages,
			ListPrice            : (IA.ListPrice) ? IA.ListPrice.Amount : null,
			ProductGroup         : IA.ProductGroup,
			ProductTypeName      : IA.ProductTypeName,
			PublicationDate      : IA.PublicationDate,
			Publisher            : IA.Publisher,
			ReleaseDate          : IA.ReleaseDate,
			ImageURL             : (IA.SmallImage && IA.SmallImage.URL) ? IA.SmallImage.URL.replace('_SL75_.', '') : null,
			Studio               : IA.Studio,
			Title                : IA.Title,
			SalesRank            : (Product.SalesRankings && Product.SalesRankings.SalesRank) ? this.ParseSalesRank(Product.SalesRankings.SalesRank) : 0,
			ItemDimensions       : (IA.ItemDimensions) ? this.ParseDimensions(IA.ItemDimensions) : NoDimensions,
			PackageDimensions    : (IA.PackageDimensions) ? this.ParseDimensions(IA.PackageDimensions) : NoDimensions
		};

		
	}

	ParseCreator(creator) {
		let Creators = forceArray(creator);
		return _.map(Creators, function(person){
			return {
				name: person._,
				role: person.$.Role	
			};
		});
	}

	ParseSalesRank(salesrank) {
		if (!salesrank) return null;
		if (!_.isArray(salesrank)) {
			return salesrank.Rank;
		} else {
			return salesrank[0].Rank;	
		}
	}

	ParseDimensions(Dimensions) {
		var 
			sortNumber = function(a,b) {return a - b;},
			Sorted = [
				(Dimensions.Height) ? Dimensions.Height._ : 0,
				(Dimensions.Length) ? Dimensions.Length._ : 0,
				(Dimensions.Width) ? Dimensions.Width._ : 0
			];
			Sorted.sort(sortNumber);
		return {
			Height    : Sorted[0] || 0,
			HeightUOM : (Dimensions.Height) ? Dimensions.Height.$.Units : 'inches',
			Length    : Sorted[2] || 0,
			LengthUOM : (Dimensions.Length) ? Dimensions.Length.$.Units : 'inches',
			Width     : Sorted[1] || 0,
			WidthUOM  : (Dimensions.Width) ? Dimensions.Width.$.Units : 'inches',
			Weight    : (Dimensions.Weight) ? Dimensions.Weight._ : 0,
			WeightUOM : (Dimensions.Weight) ? Dimensions.Weight.$.Units : 'ounces'
		};
	}
}



module.exports = new ParserClass();