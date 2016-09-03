var _  = require('lodash');

function forceArray(ArrayOrObj) {
	return (_.isArray(ArrayOrObj)) ? ArrayOrObj : [ArrayOrObj];
}

class ParserClass {


}

module.exports = new ParserClass();