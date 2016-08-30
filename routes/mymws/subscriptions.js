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





router.post('/RegisterDestination', upload.array(), function (req, res, next) {
	var keys = [
		'MarketplaceId',
		'Destination'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Subscriptions.RegisterDestination(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

})





router.post('/DeregisterDestination', upload.array(), function (req, res, next) {
	var keys = [
		'MarketplaceId',
		'Destination'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Subscriptions.DeregisterDestination(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

})





router.post('/ListRegisteredDestinations', upload.array(), function (req, res, next) {
	var keys = ['MarketplaceId'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Subscriptions.ListRegisteredDestinations(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

})





router.post('/SendTestNotificationToDestination', upload.array(), function (req, res, next) {
	var keys = [
		'MarketplaceId',
		'Destination'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Subscriptions.SendTestNotificationToDestination(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

})







router.post('/CreateSubscription', upload.array(), function (req, res, next) {
	var keys = [
		'MarketplaceId',
		'Subscription'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Subscriptions.CreateSubscription(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

})







router.post('/GetSubscription', upload.array(), function (req, res, next) {
	var keys = [
		'MarketplaceId',
		'NotificationType',
		'Subscription'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Subscriptions.GetSubscription(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

})





router.post('/DeleteSubscription', upload.array(), function (req, res, next) {
	var keys = [
		'MarketplaceId',
		'NotificationType',
		'Subscription'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Subscriptions.DeleteSubscription(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

})





router.post('/ListSubscriptions', upload.array(), function (req, res, next) {
	var keys = ['MarketplaceId'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Subscriptions.ListSubscriptions(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

})





router.post('/UpdateSubscription', upload.array(), function (req, res, next) {
	var keys = [
		'MarketplaceId',
		'Subscription'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.Subscriptions.UpdateSubscription(params)
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

	MyMWS.Subscriptions.GetServiceStatus(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});