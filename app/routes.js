/**
 * Main routing file
 **/
 
 
'use strict';

var rootPath = process.cwd();

module.exports = function (app, passport) {
    
    // App routing
    app.route('/')
        .get(function(req, res) {
            res.sendFile(rootPath + '/public/index.html');
        });
        
    // API routing
    app.route('/api/search')
        .get(function(req, res) {
            require(rootPath + '/app/api/search.js') (req, res);
        });
    app.route('/api/goinglist/:state')
        .get(function(req, res) {
            require(rootPath + '/app/api/goinglist.js') (req, res); 
        })
        .post(function(req, res) {
            require(rootPath + '/app/api/imgoing.js') (req, res);
        });
    app.route('/api/loggedin')
        .get(function(req, res) {
            if (req.session.passport) {
                res.json({user: req.session.passport.user});
            }
            else {
                res.json({user: null});
            }
        });
    
    // Auth routing
    app.route('/auth/twitter')
        .get(passport.authenticate('twitter'));
    app.route('/auth/twitter/callback')
        .get(passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/'
        }));
    app.route('/logout')
        .get(function(req, res) {
            req.logout();
            res.redirect('/');
        });
};