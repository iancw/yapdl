'use strict';

const ava = require('ava');
const _ = require('lodash');
const filterIncidents = require('./filter-incidents');
const allIncidents = require('../samples/all-incidents');

ava.test('Find incidents with description', function(t) {
    const incidents = filterIncidents(allIncidents.incidents, {
        description: 'Rats chewed through the fiber.'
    });

    t.is(2, incidents.length, 'Should only find one incident');
    t.deepEqual(['PB4MB4C', 'P4XDB14'], _.map(incidents, 'id'), 'Incident should have expected ids');
});
