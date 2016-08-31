
var
	should    = require('chai').should(),
	expect    = require('chai').expect,
	supertest = require('supertest'),
	api       = supertest('http://localhost:8080');




var
	RoutePath = '/mymws/products/ListMatchingProducts',
	GoodInputData = {
		MarketplaceId : "ATVPDKIKX0DER",
		Query : "stephen king"
	},

	BadInputData = {
		MarketplaceId : "ATVPDKIKX0DER",
		Querky : "stephen king"
	},

	GoodResponse = {},
	BadResponse = {};



describe('POST '+RoutePath, function() {

	before(function(done) {
		api.post(RoutePath)
		.send(GoodInputData)
		.end(function(err, res){
			if (err) return done(err);
			GoodResponse = res;
			this.timeout(2000);
			done();
		});
	});	

	

	before(function(done) {
		api.post(RoutePath)
		.send(BadInputData)
		.end(function(err, res){
			if (err) return done(err);
			BadResponse = res;
			this.timeout(2000);
			done();
		});
	});	

	

	it('A good request should return a response status of 200.', function(done) {
		GoodResponse.status.should.equal(200);
		done();
	});

	it("A good request should return a response type of 'application/json'.", function(done) {
		GoodResponse.type.should.equal('application/json');
		done();
	});

	it('A good request should return an array in the response body.', function(done) {
		GoodResponse.body.should.be.a('array');
		done();
	});

	it('A good request should return an array of non-zero length in the response body.', function(done) {
		GoodResponse.body.length.should.be.above(0);
		done();
	});

	it("A good request should expect each array element in the response body to be an 'object' type.", function(done) {
		for (var item of GoodResponse.body) {
		  item.should.be.a('object');
		}
		done();
	});

	it("A good request should expect each array element in the response body to contain property 'ASIN'", function(done) {
		for (var item of GoodResponse.body) {
		  item.should.have.property('ASIN');
		}
		done();
	});

	it("A good request should expect each array element in the response body to contain property 'ProductGroup'. \r\n", function(done) {
		for (var item of GoodResponse.body) {
		  item.should.have.property('ProductGroup');
		}
		done();
	});

	it('A bad request should return a response status of 500.', function(done) {
		BadResponse.status.should.equal(500);
		done();
	});

	it('A bad request should expect the response body to be an array of two objects', function(done) {
		BadResponse.body.should.be.a('array');
		BadResponse.body.length.should.equal(2);
		BadResponse.body[0].should.be.a('object');
		BadResponse.body[1].should.be.a('object');
		done();
	});

	it("A bad request should return expected error messages in the response body.", function(done) {
		BadResponse.body[0].message.should.equal("additionalProperty \"Querky\" exists in instance when not allowed");
		BadResponse.body[1].message.should.equal("requires property \"Query\"");
		done();
	});


});




var
RoutePath = '/mymws/products/GetMatchingProduct',
GoodInputData = {
	MarketplaceId : "ATVPDKIKX0DER",
	ASINList: [
		'006443009X',
		'044845694X'
	]
},
BadInputData = {
	ASINList: [
		'006443009X',
		'044845694X'
	]
};



describe('POST '+RoutePath, function()  {


	before(function(done) {
		api.post(RoutePath)
		.send(GoodInputData)
		.end(function(err, res){
			if (err) return done(err);
			GoodResponse = res;
			this.timeout(2000);
			done();
		});
	});	

	

	before(function(done) {
		api.post(RoutePath)
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

