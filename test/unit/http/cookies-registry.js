'use strict';

require('../../../lib/common/init');

var assert = require('assert'),
    request = require('supertest'),
    danf = require('../../../lib/server/app')
;

var app = danf(require(__dirname + '/../../fixtures/http/danf'), {listen: false, environment: 'test'});

describe('SessionHandler', function() {
    it('should allow to get and set cookies', function(done) {
        request(app)
            .get('/cookie')
            .expect(204)
            .end(function(err, res) {
                if (err) {
                    if (res) {
                        console.log(res.text);
                    } else {
                        console.log(err);
                    }

                    throw err;
                }

                done();
            })
        ;
    })
})