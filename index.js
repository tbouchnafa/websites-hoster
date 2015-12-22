"use strict";

var pjson = require('./package.json');

var Webserver = require('./webserver.js');
var server = new Webserver('./resources/websites', pjson.config.port);

server.start(function () {
    var websites = server.getAvailableWebsites();
    console.log(JSON.stringify(websites, null, 2));
});