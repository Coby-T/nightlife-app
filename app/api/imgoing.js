/**
 * Server-side controller for adding a member
 **/
 
 
'use strict';

var Bar = require('../../models/bar.model');

module.exports = function(req, res) {
    
    var barName = req.body.name;
    var state = req.body.state;
    var user = req.session.passport.user;
    
    Bar.findOne({barName: barName}, function (err, bar) {
        if (err) {
            throw err;
        }
        if (bar) {
            var goers = bar.going;
            if (goers.indexOf(user) === -1) {
                goers.push(user);
                bar.goingNumber ++;
            }
            else {
                goers.splice(goers.indexOf(user), 1);
                bar.goingNumber --;
            }
            bar.save();
        }
        else {
            var newBar = new Bar({
                barName: barName,
                state: state,
                going: [user],
                goingNumber: 1,
            });
            newBar.save();
        }
    });
    
};