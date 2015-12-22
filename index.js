"use strict";

var Webserver = require('../spec/webserver.js');
var server = new Webserver('./test/websites', 7777);

server.start(function () {
    var websites = server.getAvailableWebsites();
    console.log(JSON.stringify(websites, null, 2));
});