/**
 * Retrieves the list of people attending
 **/
 
 
'use strict';

var Bar = require('../../models/bar.model');

module.exports = function (req, res) {
    
    var state = req.params.state;
    
    Bar.find({state: state}, function (err, barlist) {
        if (err) {
            res.send(err);
        }
        res.json(barlist);
    });
    
};