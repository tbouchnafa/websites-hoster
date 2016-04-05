"use strict";

var fs = require('fs');
var path = require('path');
var express = require('express');
var pjson = require('./package.json');
var debug = require('debug')('websites-hoster:server');
var app = express();

function Webserver(websites_folder, host, port) {
    this.websites_folder = websites_folder ? websites_folder : path.join(__dirname, 'resources/websites');
    this.host = host ? host : pjson.config.host;
    this.port = port ? port : pjson.config.port;
    this.source_port = port ? port : pjson.config.port;
    if (path.resolve(this.websites_folder) !== this.websites_folder) {
        this.websites_folder = path.resolve(this.websites_folder);
    }
    this.server = null;
}

Webserver.prototype.start = function (callback) {
    var self = this;

    app.get(/^(.+)$/, function (req, res) {
        res.sendFile(self.websites_folder + req.params[0]);
    });

    this.server = app.listen(this.port, function () {
        var port_retries = self.port - self.source_port;

        if(port_retries > 9) {
            debug('all ports between [' + this.source_port + '...' + this.port + ']', ' tried and failed to start server!');
            return callback(new Error('PORTS_ARE_TAKEN'));
        } else if(port_retries > 0) {
            debug('server started after incrementing the port ', port_retries, 'times');
        }

        debug('server started on port: ' + self.port);
        callback(null, self.getAvailableWebsites());

    }).on('error', function(error) {
        debug('error: ' + error);
        self.port++;
        return self.start(callback);
    });
};

Webserver.prototype.close = function (callback) {
    this.server.close();
    callback();
};

Webserver.prototype.getAvailableWebsites = function () {
    var self = this;
    var url = 'http://' + this.host + ':' + this.port + '/';
    var index = 'index.html';
    var results = {};

    fs.readdirSync(this.websites_folder).forEach(function (folder) {
        var siteDir = self.websites_folder + '/' + folder;
        var stat = fs.statSync(siteDir);
        if (stat && stat.isDirectory()) {
            results[folder] = url + folder + '/' + index;
        }
    });

    return results;
};

module.exports = Webserver;