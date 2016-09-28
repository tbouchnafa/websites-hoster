"use strict";

var path = require('path');
var assert = require('assert');
var request = require('request');
var async = require('async');

describe('Webserver Class', function () {

    var Webserver = require('../index');
    var server = new Webserver();

    describe('#start()', function () {

        it('check if websites were found', function (done) {
            this.timeout(60000);
            server.start(function(error, websites) {
                assert.ifError(error);
                assert.ok(websites);

                assert.ok(websites['example.com']);
                assert.equal(websites['example.com'].indexOf('/example.com/index.html') > -1, true);

                request.get(websites['example.com'], function (error, response, body) {
                    assert.ifError(error);
                    assert.ok(body);
                    server.close(done);
                });
            });
        });
    });

    describe('#start() maximal 10 times', function () {

        it('check start', function (done) {
            this.timeout(60000);

            var start = function(cb) {
                server.start(function(error, websites) {
                    assert.ok(websites);
                    cb(error);
                });
            };

            var startthatFails = function(cb) {
                server.start(function(error) {
                    assert.ok(error);
                    cb(error);
                });
            };

            var close = function(cb) {
                server.close(cb);
            };

            async.waterfall([start, start, start, start, start, start, start, start, start, start, startthatFails], function(error) {
                // could not start the server 11 times error != null
                assert.ok(error);
                async.waterfall([close, close, close, close, close, close, close, close, close, close], function(error) {
                    // closing...
                    assert.ifError(error);
                    done();

                });
            });

        });
    });

    var _server = new Webserver(path.join(__dirname, '../resources/websites'), '127.0.0.1', 9600);
    describe('#start() server on provided port', function () {

        it('check start', function (done) {
            this.timeout(60000);

            var start = function(cb) {
                _server.start(function(error) {
                    cb(error);
                });
            };

            var startThatFails = function(cb) {
                _server.start(function(error) {
                    assert.ok(error);
                    cb(error);
                });
            };

            var close = function(cb) {
                server.close(cb);
            };

            async.waterfall([start, startThatFails], function(error) {
                assert.ok(error);
                assert.equal(error.code, 'EADDRINUSE');
                close(done);
            });

        });
    });

});
