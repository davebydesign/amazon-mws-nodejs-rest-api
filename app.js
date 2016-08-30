require('app-module-path').addPath(__dirname);
require('use-strict');

var 
    port        = 8080,
    express     = require('express'),
    app         = express(),
    server      = app.listen(port, function() {console.log("Server started on port " + port); }),
    bodyParser = require('body-parser');

app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static('public'));


app.use(function(req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/mymws',   require('routes/mymws'));

















