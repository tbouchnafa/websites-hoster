"use strict";

var assert = require('assert');
var needle = require('needle');
var pjson = require('../package.json');

describe('Webserver Class', function () {

    var websites;
    var Webserver = require('../index');
    var server = new Webserver();

    before(function (done) {
        server.start(function (error, result) {
            assert.ifError(error);
            websites = result;
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

            assert.equal(Object.keys(websites).length > 0, true, 'no websites found');

            assert.ok(websites['cassing.de']);
            assert.equal(websites['cassing.de'], 'http://localhost:7777/cassing.de/index.html');

            needle.get(websites['cassing.de'], function(error, response) {
                assert.ifError(error);
                assert.ok(response.body);
                done();
            })
        });
    });
});
