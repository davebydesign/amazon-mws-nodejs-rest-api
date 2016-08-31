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






router.post('/ListMatchingProducts', upload.array(), function (req, res, next) {
	MyMWS.Products.ListMatchingProducts(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});






router.post('/GetMatchingProduct', upload.array(), function (req, res, next) {

	MyMWS.Products.GetMatchingProduct(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetMatchingProductForId', upload.array(), function (req, res, next) {

	MyMWS.Products.GetMatchingProductForId(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetCompetitivePricingForSKU', upload.array(), function (req, res, next) {

	MyMWS.Products.GetCompetitivePricingForSKU(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});






router.post('/GetCompetitivePricingForASIN', upload.array(), function (req, res, next) {

	MyMWS.Products.GetCompetitivePricingForASIN(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});






router.post('/GetLowestOfferListingsForSKU', upload.array(), function (req, res, next) {

	MyMWS.Products.GetLowestOfferListingsForSKU(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});






router.post('/GetLowestOfferListingsForASIN', upload.array(), function (req, res, next) {

	MyMWS.Products.GetLowestOfferListingsForASIN(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetLowestPricedOffersForSKU', upload.array(), function (req, res, next) {

	MyMWS.Products.GetLowestPricedOffersForSKU(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetLowestPricedOffersForASIN', upload.array(), function (req, res, next) {

	MyMWS.Products.GetLowestPricedOffersForASIN(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetMyPriceForSKU', upload.array(), function (req, res, next) {

	MyMWS.Products.GetMyPriceForSKU(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetMyPriceForASIN', upload.array(), function (req, res, next) {

	MyMWS.Products.GetMyPriceForASIN(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetProductCategoriesForSKU', upload.array(), function (req, res, next) {

	MyMWS.Products.GetProductCategoriesForSKU(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});





router.post('/GetProductCategoriesForASIN', upload.array(), function (req, res, next) {

	MyMWS.Products.GetProductCategoriesForASIN(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});






router.get('/GetServiceStatus', upload.array(), function (req, res, next) {

	MyMWS.Products.GetServiceStatus()
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});




