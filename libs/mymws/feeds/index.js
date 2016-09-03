var 
	AmazonMwsRequest = require('../base_request'),
	Parser = require('./parser'),
	Schema = require('./schema.js');

class FeedsRequestCall extends AmazonMwsRequest {
	constructor(CallName, params) {
		super();
		this.query.Version  = "2009-01-01";
		this.query.SellerId = process.env.MWS_MerchantId;
		this.path           = "/";


		if (CallName==='SubmitFeed') {
			this.upload = true;
			this.httpBody = params.FeedContent;			
		}

		if (CallName==='GetFeedSubmissionCount') {
			if ('FeedTypeList' in params)				this.listify('FeedTypeList.Type', params.FeedTypeList);
			if ('FeedProcessingStatusList' in params)	this.listify('FeedProcessingStatusList.Status', params.FeedProcessingStatusList);
			if ('SubmittedFromDate' in params)			this.query.SubmittedFromDate = new Date(params.SubmittedFromDate);
			if ('SubmittedToDate' in params)			this.query.SubmittedToDate = new Date(params.SubmittedToDate);
		}

		if (CallName==='CancelFeedSubmissions') {
			if ('FeedSubmissionIdList' in params)	this.listify('FeedSubmissionIdList.Id', params.FeedSubmissionIdList);
			if ('FeedTypeListt' in params)			this.listify('FeedTypeList.Type', params.FeedTypeList);
			if ('SubmittedFromDate' in params)		this.query.SubmittedFromDate = new Date(params.SubmittedFromDate);
			if ('SubmittedToDate' in params)		this.query.SubmittedToDate = new Date(params.SubmittedToDate);
		}

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


class FeedsRequest  {
	SubmitFeed						(params) { return new FeedsRequestCall('SubmitFeed', 						params); }
	GetFeedSubmissionList			(params) { return new FeedsRequestCall('GetFeedSubmissionList', 			params); }
	GetFeedSubmissionListByNextToken(params) { return new FeedsRequestCall('GetFeedSubmissionListByNextToken', 	params); }
	GetFeedSubmissionCount			(params) { return new FeedsRequestCall('GetFeedSubmissionCount', 			params); }
	CancelFeedSubmissions			(params) { return new FeedsRequestCall('CancelFeedSubmissions', 			params); }
	GetFeedSubmissionResult			(params) { return new FeedsRequestCall('GetFeedSubmissionResult', 			params); }
}

module.exports = new FeedsRequest();



