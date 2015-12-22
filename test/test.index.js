"use strict";
var assert = require('assert');
var pjson = require('../package.json');

describe('Webserver Class', function () {

    var websites;
    var Webserver = require('../index.js');
    var server = new Webserver('./resources/websites', pjson.config.port);
    before(function (done) {
        server.start(function () {
            websites = server.getAvailableWebsites();
            done();
        });
    });

    after(function (done) {
        server.close(done);
    });

    describe('#start()', function () {
        it('check if websites were found', function (done) {
            this.timeout(60000);

            assert.equal(server.port, pjson.config.port);

            var count = 0;
            for (var property in websites) {
                if (websites.hasOwnProperty(property)) {
                    ++count;
                }
            }
            assert.equal(count > 0, true, 'no websites found');
            done();
        });
    });
});
