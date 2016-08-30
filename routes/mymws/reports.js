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



/*
router.post('/ListMatchingProducts', upload.array(), function (req, res, next) {
	MyMWS.Products.ListMatchingProducts(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});

});
 */


router.post('/RequestReport', upload.array(), function (req, res, next) {
	MyMWS.Reports.RequestReport(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});
})






router.post('/GetReportRequestList', upload.array(), function (req, res, next) {
	MyMWS.Reports.GetReportRequestList(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});
})





router.post('/GetReportRequestListByNextToken', upload.array(), function (req, res, next) {
	MyMWS.Reports.GetReportRequestListByNextToken(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});
})





router.post('/GetReportRequestCount', upload.array(), function (req, res, next) {
	MyMWS.Reports.GetReportRequestCount(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});
})





router.post('/CancelReportRequests', upload.array(), function (req, res, next) {
	MyMWS.Reports.CancelReportRequests(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});
})





router.post('/GetReportList', upload.array(), function (req, res, next) {
	MyMWS.Reports.GetReportList(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});
})





router.post('/GetReportListByNextToken', upload.array(), function (req, res, next) {
	MyMWS.Reports.GetReportListByNextToken(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});
})






router.post('/GetReportCount', upload.array(), function (req, res, next) {
	MyMWS.Reports.GetReportCount(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});
})






router.post('/GetReport', upload.array(), function (req, res, next) {
	MyMWS.Reports.GetReport(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});
})





router.post('/ManageReportSchedule', upload.array(), function (req, res, next) {
	MyMWS.Reports.ManageReportSchedule(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});
})





router.post('/GetReportScheduleList', upload.array(), function (req, res, next) {
	MyMWS.Reports.GetReportScheduleList(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});
})





router.post('/GetReportScheduleCount', upload.array(), function (req, res, next) {
	MyMWS.Reports.GetReportScheduleCount(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});
})





router.post('/UpdateReportAcknowledgements', upload.array(), function (req, res, next) {
	MyMWS.Reports.UpdateReportAcknowledgements(req.body)
	.then(function(result){
		res.json(result);	
	})
	.catch(function (err) {
		res.status(500).send(err);
	});
})


