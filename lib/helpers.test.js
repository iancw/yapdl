'use strict';

const ava = require('ava');
const helpers = require('./helpers');

ava.test('Status query string is properly constructed', function(t) {
    t.is(
        'statuses%5B%5D=triggered&statuses%5B%5D=acknowledged&statuses%5B%5D=resolved',
        helpers.statusQuery(['triggered', 'acknowledged', 'resolved']),
        'Queried status are properly constructed into a query string. ' +
        'Yes this query string is odd. This is what works with pagerduty'
   );
    t.is(
        'statuses%5B%5D=triggered',
        helpers.statusQuery(['triggered']),
        'With a single status argument'
   );
    t.is(
        '',
        helpers.statusQuery([]),
        'With an empty array'
   );
    t.is(
        '',
        helpers.statusQuery(),
        'With undefined argument'
   );
});

ava.test('Service query string is properly constructed', function(t) {
    t.is(
        'service_ids%5B%5D=7654321&service_ids%5B%5D=0123456',
        helpers.serviceQuery(['7654321', '0123456']),
        'With two services'
    );
    t.is(
        'service_ids%5B%5D=7654321',
        helpers.serviceQuery(['7654321']),
        'With one service'
    );
    t.is(
        '',
        helpers.serviceQuery([]),
        'With empty array argument'
    );
    t.is(
        '',
        helpers.serviceQuery(),
        'With undefined argument'
    );
 });

 ava.test('Time zone query string is properly constructed', function(t) {
    t.is(
        'time_zone=UTC',
        helpers.timeZone('UTC'),
        'With utc argument'
    );
    t.is(
        '',
        helpers.timeZone(),
        'With no argument'
    );
 });
