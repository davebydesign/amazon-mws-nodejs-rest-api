
var
	should    = require('chai').should(),
	expect    = require('chai').expect,
	supertest = require('supertest'),
	api       = supertest('http://localhost:8080');







describe('/mymws/products/', function() {


	describe.skip('ListMatchingProducts - Good Request', function() {

		var res = {};

		before(function(done) {
			api.post('/mymws/products/ListMatchingProducts')
			.send({
				MarketplaceId : "ATVPDKIKX0DER",
				Query : "stephen king"
			})
			.end(function(err, response){
				if (err) return done(err);
				res = response;
				done();
			});
		});	
		

		it('should return a response status of 200.', function(done) {
			res.status.should.equal(200);
			done();
		});

		it("should return a response type of 'application/json'.", function(done) {
			res.type.should.equal('application/json');
			done();
		});

		it('should return an array in the response body.', function(done) {
			res.body.should.be.a('array');
			done();
		});

		it('should return an array of non-zero length in the response body.', function(done) {
			res.body.length.should.be.above(0);
			done();
		});

		it("should expect each array element in the response body to be an 'object' type.", function(done) {
			for (var item of res.body) {
			  item.should.be.a('object');
			}
			done();
		});

		it("should expect each array element in the response body to contain property 'ASIN'", function(done) {
			for (var item of res.body) {
			  item.should.have.property('ASIN');
			}
			done();
		});

		it("should expect each array element in the response body to contain property 'ProductGroup'. \r\n", function(done) {
			for (var item of res.body) {
			  item.should.have.property('ProductGroup');
			}
			done();
		});

	});



	describe.skip('ListMatchingProducts - Bad Request', function() {
		var res = {};

		before(function(done) {
			api.post('/mymws/products/ListMatchingProducts')
			.send( {
				MarketplaceId : "ATVPDKIKX0DER",
				Querky : "stephen king"				//Intentional typo in 'Query' field
			})
			.end(function(err, response){
				if (err) return done(err);
				res = response;
				done();
			});
		});	

		it('should return a response status of 500.', function(done) {
			res.status.should.equal(500);
			done();
		});

		it('should expect the response body to be an array of two objects', function(done) {
			res.body.should.be.a('array');
			res.body.length.should.equal(2);
			res.body[0].should.be.a('object');
			res.body[1].should.be.a('object');
			done();
		});

		it("should return expected error messages in the response body.\r\n\r\n", function(done) {
			res.body[0].message.should.equal("additionalProperty \"Querky\" exists in instance when not allowed");
			res.body[1].message.should.equal("requires property \"Query\"");
			done();
		});

	});










	describe.skip('GetMatchingProduct - Good Request', function()  {

		var res = {};

		before(function(done) {
			api.post('/mymws/products/GetMatchingProduct')
			.send({
				MarketplaceId : "ATVPDKIKX0DER",
				ASINList: [
					'006443009X',
					'044845694X'
				]
			})
			.end(function(err, response){
				if (err) return done(err);
				res = response;
				done();
			});
		});	


		it('should return a response status of 200.\r\n', function(done) {
			res.status.should.equal(200);
			done();
		});


	});


	describe.skip('GetMatchingProduct - Bad Request', function()  {
		var res = {};

		before(function(done) {
			api.post('/mymws/products/GetMatchingProduct')
			.send({
				//MarketplaceId : "ATVPDKIKX0DER",  // missing MarketplaceId
				ASINList: [
					'006443009X',
					'044845694X'
				]
			})
			.end(function(err, response){
				if (err) return done(err);
				res = response;
				done();
			});
		});	



		it('should return a response status of 500.\r\n', function(done) {
			res.status.should.equal(500);
			done();
		});
	});






	describe.skip('GetMatchingProductForId - Good Request', function()  {

		var res = {};

		before(function(done) {
			api.post('/mymws/products/GetMatchingProductForId')
			.send({
				MarketplaceId : "ATVPDKIKX0DER",
				IdType: 'ASIN',
				IdList: [
					'006443009X',
					'044845694X'
				]
			})
			.end(function(err, response){
				if (err) return done(err);
				res = response;
				done();
			});
		});			


		it('should return a response status of 200.', function(done) {
			res.status.should.equal(200);
			done();
		});

	});



	describe.skip('GetMatchingProductForId - Bad Request', function()  {

		var res = {};

		before(function(done) {
			api.post('/mymws/products/GetMatchingProductForId')
			.send({
				//MarketplaceId : "ATVPDKIKX0DER",
				IdType: 'ASIN',
				IdList: [
					'006443009X',
					'044845694X'
				]
			})
			.end(function(err, response){
				if (err) return done(err);
				res = response;
				done();
			});
		});			


		it('should return a response status of 500.', function(done) {
			res.status.should.equal(500);
			done();
		});

	});



	describe.skip('GetCompetitivePricingForSKU - Good Request', function()  {

		var res = {};

		before(function(done) {
			api.post('/mymws/products/GetCompetitivePricingForSKU')
			.send({
				MarketplaceId : "ATVPDKIKX0DER",
				SellerSKUList: [
					// INSERT SELLER SKUS HERE
					'',
					''
				]
			})
			.end(function(err, response){
				if (err) return done(err);
				res = response;
				done();
			});
		});			


		it('should return a response status of 200.', function(done) {
			res.status.should.equal(200);
			done();
		});

	});



	describe.skip('GetCompetitivePricingForSKU - Bad Request', function()  {

		var res = {};

		before(function(done) {
			api.post('/mymws/products/GetCompetitivePricingForSKU')
			.send({
				MarketplaceId : "ATVPDKIKX0DER",
				SellerSKUList: [
					// INTENTIONAL BAD DATA
					'blah',
					'blah blah'
				]
			})
			.end(function(err, response){
				if (err) return done(err);
				res = response;
				done();
			});
		});			


		it('should return expected error result.', function(done) {
			res.status.should.equal(200);
			res.body.should.be.a('object');
			res.body.should.have.property('Products');
			res.body.should.have.property('Errors');
			res.body.Errors.should.be.a('array');
			res.body.Errors.length.should.equal(2);
			res.body.Errors[0].Code.should.equal("InvalidParameterValue");
			res.body.Errors[0].Message.should.contain("invalid SellerSKU");
			done();
		});

	});






	describe('GetCompetitivePricingForASIN - Good Request', function()  {

		var res = {};

		before(function(done) {
			api.post('/mymws/products/GetCompetitivePricingForASIN')
			.send({
				MarketplaceId : "ATVPDKIKX0DER",
				ASINList: [
					'B00C7EXSNS'
				]
			})
			.end(function(err, response){
				if (err) return done(err);
				res = response;
				done();
			});
		});			


		it('should return expected data', function(done) {
			res.status.should.equal(200);
			res.body.Products[0].ASIN.should.equal('B00C7EXSNS');
			done();
		});

	});



	describe('GetCompetitivePricingForASIN - Bad Request', function()  {

		var res = {};

		before(function(done) {
			api.post('/mymws/products/GetCompetitivePricingForASIN')
			.send({
				MarketplaceId : "ATVPDKIKX0DER",
				ASINList: [
					'XX'	// Intentional invalid ASIN
				]
			})
			.end(function(err, response){
				if (err) return done(err);
				res = response;
				done();
			});
		});			


		it('should return expected error result.', function(done) {
			res.status.should.equal(200);
			res.body.Errors[0].Message.should.equal("ASIN XX is not valid for marketplace ATVPDKIKX0DER");
			done();
		});

	});



});