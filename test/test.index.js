"use strict";

var assert = require('assert');
var needle = require('needle');
var async = require('async');

describe('Webserver Class', function () {

    var Webserver = require('../index');
    var server = new Webserver();

    describe('#start()', function () {

        it('check if websites were found', function (done) {
            this.timeout(60000);
            var websites;
            server.start(function(error, websites) {
                assert.ifError(error);
                assert.equal(Object.keys(websites).length > 0, true, 'no websites found');

                assert.ok(websites['cassing.de']);
                assert.equal(websites['cassing.de'].indexOf('/cassing.de/index.html') > -1, true);

                needle.get(websites['cassing.de'], function (error, response) {
                    assert.ifError(error);
                    assert.ok(response.body);
                    server.close(done);
                })
            });
        });
    });

    describe('#start() maximal 10 times', function () {

        it('check start', function (done) {
            this.timeout(60000);

            var start = function(cb) {
                server.start(function(error, websites) {
                    console.log(JSON.stringify(websites, null, 2));
                    cb(error);
                });
            };

            var close = function(cb) {
                server.close(cb);
            };

            async.waterfall([start, start, start, start, start, start, start, start, start, start, start], function(error){
                // could not start ther server 11 times error != null
                assert.ok(error);
                async.waterfall([close, close, close, close, close, close, close, close, close, close], function(error){

                    // closing...
                    assert.ifError(error);
                    done();

                });
            });

        });
    });
});
