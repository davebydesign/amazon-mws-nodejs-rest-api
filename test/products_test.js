var
	should = require('chai').should(),
	expect = require('chai').expect,
	supertest = require('supertest'),
	api = supertest('http://localhost:/8080');

describe('Products', function() {

	it('should return a 200 response', function(done){
		api.post('/mymws/products/ListMatchingProducts')
		.set('Accept', 'application/form-data')
		.send({
			MarketplaceId : "ATVPDKIKX0DER",
			Query : "alan moore"
		})
		.expect(200)
		.end(function(err, res){

			done();
		});

	});

});