var express = require('express');        
var app = express();         
var bodyParser = require('body-parser');
var ipgeoblock = require("node-ipgeoblock");
var cors = require('cors');
var session = require('express-session')
var port = process.env.PORT || 8080;       
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.use(ipgeoblock({
    geolite2: "./GeoLite2-Country.mmdb",
    allowedCountries: [ "IL" ]
}));

// Add headers
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/',function(req,res){
       
     res.sendFile('index.html' , { root : __dirname });

});

app.listen(port);