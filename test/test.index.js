"use strict";
var assert = require('assert');

describe('Webserver Class', function () {

    var websites;
    var Webserver = require('../webserver.js');
    var server = new Webserver('./resources/websites');

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
