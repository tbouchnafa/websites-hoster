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

            assert.equal(Object.keys(websites).length > 0, true, 'no websites found');

            assert.ok(websites['cassing.de']);
            assert.equal(websites['cassing.de'].indexOf('/cassing.de/index.html') > -1, true);

            needle.get(websites['cassing.de'], function (error, response) {
                assert.ifError(error);
                assert.ok(response.body);
                done();
            })
        });

        it('check start on the same server', function (done) {
            this.timeout(60000);
            server.start(function (error, result) {
                assert.ifError(error);
                assert.ok(result);
                assert.equal(server.port > server.source_port, true);
                done();
            });
        });
    });
});
