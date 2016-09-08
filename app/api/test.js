'use strict';

var Bar = require('../../models/bar.model');

module.exports = function (req, res) {
    var newBar = new Bar({
        barName: "Test",
        going: ["Coby"],
        goingNumber: 1
    });
    newBar.save();
    res.send("done");
};