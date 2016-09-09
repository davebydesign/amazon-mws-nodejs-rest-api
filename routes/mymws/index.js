var 
	express         = require('express'),
	router          = express.Router();

module.exports = router;

router.use(function(err, req, res, next) {
	res.json(err);
});



router.use('/feeds', 				require('./feeds.js'));
router.use('/finances', 			require('./finances.js'));
router.use('/fba-inbound', 			require('./fulfillment-inbound.js'));
router.use('/fba-inventory', 		require('./fulfillment-inventory.js'));
router.use('/fba-outbound', 		require('./fulfillment-outbound.js'));
router.use('/merchant-fulfillment',	require('./merchant-fulfillment.js'));
router.use('/orders', 				require('./orders.js'));
router.use('/products', 			require('./products.js'));
router.use('/recommendations', 		require('./recommendations.js'));
router.use('/reports', 				require('./reports.js'));
router.use('/sellers', 				require('./sellers.js'));
router.use('/subscriptions', 		require('./subscriptions.js'));

