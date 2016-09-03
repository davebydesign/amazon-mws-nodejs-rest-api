var 
	express         = require('express'),
	router          = express.Router();

module.exports = router;

router.use(function(err, req, res, next) {
	res.json(err);
});


router.use('/cartinfo', 			require('./cartinfo.js'));
router.use('/customerinfo', 		require('./customerinfo.js'));
router.use('/feeds', 				require('./feeds.js'));
router.use('/finances', 			require('./finances.js'));
router.use('/fba_inbound', 			require('./fba_inbound.js'));
router.use('/fba_inventory', 		require('./fba_inventory.js'));
router.use('/fba_outbound', 		require('./fba_outbound.js'));
router.use('/merchant_fulfillment',	require('./merchant_fulfillment.js'));
router.use('/orders', 				require('./orders.js'));
router.use('/products', 			require('./products.js'));
router.use('/recommendations', 		require('./recommendations.js'));
router.use('/reports', 				require('./reports.js'));
router.use('/sellers', 				require('./sellers.js'));
router.use('/subscriptions', 		require('./subscriptions.js'));
router.use('/webstore', 			require('./webstore.js'));
