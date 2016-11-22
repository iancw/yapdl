'use strict';

const ava = require('ava');
const nock = require('nock');

const allIncidents = require('../samples/all-incidents.json');
const twoServiceIncidents = require('../samples/POBALVM-P3U7V58-incidents.json');
const noIncidents = require('../samples/no-incidents.json');

const getIncidents = require('./get-incidents');

ava.test.beforeEach(t => {
    nock.disableNetConnect();
});

ava.test.afterEach(t => {
    nock.cleanAll();
});

function nockForQuery(query, response) {
    return nock('https://api.pagerduty.com', {
            reqHeaders: {
                'authorization': 'Token token=w_8PcNuhHa-y3xYdmc1x',
                'accept': 'application/vnd.pagerduty+json;version=2',
            }
        })
        .get('/incidents')
        .query(query)
        .reply(200, response);
}

ava.test('Call to getIncidents hits correct pagerduty endpoint', function*(t) {
    nockForQuery(
        {
            statuses: ['triggered', 'acknowledged', 'resolved']
        },
        allIncidents
    );

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
ava.test('Call to getIncidents with services and timezones', function*(t) {
    nockForQuery(
        {
            statuses: ['triggered', 'acknowledged', 'resolved'],
            'service_ids': ['P3U7V58', 'POBALVM'],
            'time_zone': 'UTC',
        },
        twoServiceIncidents
    );

    const response = yield getIncidents({
        statuses: ['triggered', 'acknowledged', 'resolved'],
        services: ['P3U7V58', 'POBALVM'],
        timeZone: 'UTC',
        token: 'w_8PcNuhHa-y3xYdmc1x',
    });

    t.is(
        false,
        response.more,
        'Response object should have the more=true field'
    );
    t.is(
        1,
        response.incidents.length,
        'Response should include one incident'
    );
    t.is(
        'Rats chewed through the fiber.',
        response.incidents[0].description
    );
});

ava.test('Call to getIncidents without token throws error', function(t) {
    t.throws(() => {getIncidents({})});
});

ava.test('Call to getIncidents that returns no incidents', function*(t) {
    const scope = nockForQuery(
        {
            statuses: ['triggered'],
            'service_ids': ['POBALVM'],
        },
        noIncidents
    );

    const response = yield getIncidents({
        statuses: ['triggered'],
        services: ['POBALVM'],
        token: 'w_8PcNuhHa-y3xYdmc1x',
    });

    t.is(0, response.incidents.length);
});
