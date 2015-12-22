"use strict";

var pjson = require('./package.json');

var Webserver = require('./webserver.js');
var server = new Webserver('./resources/websites', pjson.config.port);

module.exports = server;