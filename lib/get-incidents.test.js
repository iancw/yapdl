'use strict';

const ava = require('ava');
const nock = require('nock');

const allIncidents = require('../samples/all-incidents.json');

const getIncidents = require('./get-incidents');

ava.test.beforeEach(t => {
    nock.disableNetConnect();
});

ava.test.afterEach(t => {
    nock.cleanAll();
});

ava.test('Call to getIncidents hits correct pagerduty endpoint', function*(t) {
    const scope = nock('https://api.pagerduty.com', {
            reqHeaders: {
                'authorization': 'Token token=w_8PcNuhHa-y3xYdmc1x',
                'accept': 'application/vnd.pagerduty+json;version=2',
            }
        })
        .get('/incidents')
        .query({
            statuses: ['triggered', 'acknowledged', 'resolved']
        })
        .reply(200, allIncidents);

    const response = yield getIncidents({
        statuses: ['triggered', 'acknowledged', 'resolved'],
        token: 'w_8PcNuhHa-y3xYdmc1x',
    });

    t.is(
        true,
        response.more,
        'Response object should have the more=true field'
    );
    t.is(
        25,
        response.incidents.length,
        'Response should include 25 incidents'
    );
});

ava.test('Call to getIncidents without token throws error', function(t) {
    t.throws(() => {getIncidents({})});
});
