var 
	express    = require('express'),
	router     = express.Router(),
	multer     = require('multer'),
	upload     = multer(),
	MyMWSClass = require('libs/mymws'),
	MWSCreds   = require('libs/mymws/credentials.js'),
	MyMWS      = new MyMWSClass(MWSCreds);

module.exports = router;

router.use(function(err, req, res, next) {
	res.json(err);
});





router.post('/GetLastUpdatedTimeForRecommendations', upload.array(), function (req, res, next) {
	var keys = ['MarketplaceId'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Recommendations.GetLastUpdatedTimeForRecommendations(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

})






router.post('/ListRecommendations', upload.array(), function (req, res, next) {
	var keys = [
		'MarketplaceId',
		'RecommendationCategory',
		'CategoryQueryList'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Recommendations.ListRecommendations(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

})





router.post('/ListRecommendationsByNextToken', upload.array(), function (req, res, next) {
	var keys = ['NextToken'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Recommendations.ListRecommendationsByNextToken(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

})






router.get('/GetServiceStatus', upload.array(), function (req, res, next) {
	var keys = [],
	params = MyMWS.parseParams(keys, req.body);	

	MyMWS.Recommendations.GetServiceStatus(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});
