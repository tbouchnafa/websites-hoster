"use strict";

var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var pjson = require('./package.json');

function TestWebserver(websitesFolder, port) {
    this.websitesFolder = websitesFolder ? websitesFolder : './resources/websites/';
    this.port = port ? port : pjson.config.port;
    this.host = 'localhost';
    if (path.resolve(this.websitesFolder) !== this.websitesFolder) {
        this.websitesFolder = path.resolve(this.websitesFolder);
    }
    this.server = null;
}

TestWebserver.prototype.start = function (callback) {

    var self = this;

    app.get(/^(.+)$/, function (req, res) {
        res.sendFile(self.websitesFolder + req.params[0]);
    });

    this.server = app.listen(this.port, function () {
        callback(null, self.getAvailableWebsites());
    });
};

TestWebserver.prototype.close = function (callback) {
    this.server.close();
    callback();
};

TestWebserver.prototype.getAvailableWebsites = function () {
    var self = this;
    var url = 'http://' + this.host + ':' + this.port + '/';
    var index = 'index.html';
    var results = {};

    fs.readdirSync(this.websitesFolder).forEach(function (folder) {
        var siteDir = self.websitesFolder + '/' + folder;
        var stat = fs.statSync(siteDir);
        if (stat && stat.isDirectory()) {
            results[folder] = url + folder + '/' + index;
        }
    });
    return results;
};

module.exports = TestWebserver;