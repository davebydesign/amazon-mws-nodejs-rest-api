var 
	express    = require('express'),
	router     = express.Router(),

	// Necessary to  accept data in "multipart/form-data" format
	multer     = require('multer'),
	upload     = multer(),

	MyMWS      = require('libs/mymws');

module.exports = router;




router.post('/SubmitFeed', upload.array(), function (req, res, next) {
	var keys = [
		'FeedContent',
		'FeedType',
		'MarketplaceIdList',
		'PurgeAndReplace'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Feeds.SubmitFeed(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetFeedSubmissionList', upload.array(), function (req, res, next) {
	var keys = [
		'FeedSubmissionIdList',
		'MaxCount',
		'FeedTypeList',
		'FeedProcessingStatusList',
		'SubmittedFromDate',
		'SubmittedToDate'
	],	
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Feeds.GetFeedSubmissionList(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetFeedSubmissionListByNextToken', upload.array(), function (req, res, next) {
	var keys = ['NextToken'],	
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Feeds.GetFeedSubmissionListByNextToken(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetFeedSubmissionCount', upload.array(), function (req, res, next) {
	var keys = [
		'FeedTypeList',
		'FeedProcessingStatusList',
		'SubmittedFromDate',
		'SubmittedToDate'
	],	
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Feeds.GetFeedSubmissionCount(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/CancelFeedSubmissions', upload.array(), function (req, res, next) {
	var keys = [
		'FeedSubmissionIdList',
		'FeedTypeList',
		'SubmittedFromDate',
		'SubmittedToDate'
	],	
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Feeds.CancelFeedSubmissions(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetFeedSubmissionResult', upload.array(), function (req, res, next) {
	var keys = ['FeedSubmissionId'],	
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Feeds.GetFeedSubmissionResult(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});

