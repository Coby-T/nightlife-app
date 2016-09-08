/**
 * Server-side search controller
 **/
 
 
'use strict';

var apiRouter = require('express').Router();
var Yelp = require('yelp');

module.exports = function(req, res) {
    
    var yelpAuth = {
        consumer_key: process.env.YELP_KEY,
        consumer_secret: process.env.YELP_SECRET,
        token: process.env.YELP_TOKEN,
        token_secret: process.env.YELP_TOKEN_SECRET
    };
    
    var yelp = new Yelp(yelpAuth);
    var searchParameters = {
        term: 'bar',
        location: req.query.location
    };
    
    yelp.search(searchParameters)
        .then(function (data) {
            res.json(data.businesses);
        })
        .catch(function (err) {
            res.json(err);
        });
    
};