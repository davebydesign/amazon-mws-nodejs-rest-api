
var
	should    = require('chai').should(),
	expect    = require('chai').expect,
	supertest = require('supertest'),
	api       = supertest('http://localhost:8080');







describe('/mymws/products/', function() {


	describe('ListMatchingProducts - Good Request', function() {

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



	describe('ListMatchingProducts - Bad Request', function() {
		var res = {};

		before(function(done) {
			api.post('/mymws/products/ListMatchingProducts')
			.send( {
				MarketplaceId : "ATVPDKIKX0DER",
				Querky : "stephen king"
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





	describe('GetMatchingProduct - Good Request', function()  {

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






	describe('GetMatchingProductForId', function()  {
		var
			GoodInputData = {
				MarketplaceId : "ATVPDKIKX0DER",
				IdType: 'ASIN',
				IdList: [
					'006443009X',
					'044845694X'
				]
			},
			BadInputData = {
				IdList: [
					'006443009X',
					'044845694X'
				]
			};	
		var
			GoodResponse = {},
			BadResponse = {};

		before(function(done) {
			api.post('/mymws/products/GetMatchingProductForId')
			.send(GoodInputData)
			.end(function(err, res){
				if (err) return done(err);
				GoodResponse = res;
				done();
			});
		});	

		

		before(function(done) {
			api.post('/mymws/products/GetMatchingProductForId')
			.send(BadInputData)
			.end(function(err, res){
				if (err) return done(err);
				BadResponse = res;
				done();
			});
		});	

		it('A good request should return a response status of 200.', function(done) {
			GoodResponse.status.should.equal(200);
			done();
		});


	});


});