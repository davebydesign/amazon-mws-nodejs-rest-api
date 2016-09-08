var AmazonMwsParentRequest = require('../parent-request-class');


class RequestCall extends AmazonMwsParentRequest {
	constructor(CallName, Params) {
		super({
			Version          : "2009-01-01",
			SellerOrMerchant : "Seller",
			Path             : "/",
			Parser           : require('./parser'),
			SubSchemas       : require('./subschemas.js'),
			MainSchema       : require('./schema.js'),
			CallName         : CallName,
			Params           : Params
		});

		if (CallName ==='SubmitFeed') {
			this.upload = true;
			this.httpBody = Params.FeedContent;			
		}

		return this.ExecuteRequest();
	}
}


class FeedsRequest  {
	SubmitFeed						(params) { return new RequestCall('SubmitFeed', 						params); }
	GetFeedSubmissionList			(params) { return new RequestCall('GetFeedSubmissionList', 			params); }
	GetFeedSubmissionListByNextToken(params) { return new RequestCall('GetFeedSubmissionListByNextToken', 	params); }
	GetFeedSubmissionCount			(params) { return new RequestCall('GetFeedSubmissionCount', 			params); }
	CancelFeedSubmissions			(params) { return new RequestCall('CancelFeedSubmissions', 			params); }
	GetFeedSubmissionResult			(params) { return new RequestCall('GetFeedSubmissionResult', 			params); }
}

module.exports = new FeedsRequest();



