var 
	express    = require('express'),
	router     = express.Router(),
	multer     = require('multer'),
	upload     = multer(),
	MyMWSClass = require('libs/mymws'),
	MyMWS      = new MyMWSClass();

module.exports = router;

router.use(function(err, req, res, next) {
	res.json(err);
});

 


router.post('/ListCarts', upload.array(), function (req, res, next) {
	var keys = [
		'MarketplaceId',
		'DateRangeStart',
		'DateRangeEnd'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.CartInformation.ListCustomers(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});




router.post('/ListCartsByNextToken', upload.array(), function (req, res, next) {
	var keys = ['NextToken'],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.CartInformation.ListCartsByNextToken(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});



router.post('/GetCarts', upload.array(), function (req, res, next) {
	var keys = [
		'MarketplaceId',
		'CartIdList'
	],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.CartInformation.GetCarts(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});



router.get('/GetServiceStatus', upload.array(), function (req, res, next) {
	
	var keys = [],
	params = MyMWS.parseParams(keys, req.body);

	MyMWS.CartInformation.GetServiceStatus(params)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});
