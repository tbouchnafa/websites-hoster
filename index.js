"use strict";

var Webserver = require('./webserver.js');
var server = new Webserver('./resources/websites', 7777);

server.start(function () {
    var websites = server.getAvailableWebsites();
    console.log(JSON.stringify(websites, null, 2));
});