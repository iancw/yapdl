'use strict';

const getIncidents = require('./get-incidents');
const filterIncidents = require('./filter-incidents');

module.exports = findIncidents;

function* findIncidents(opts) {
    const incidents = getIncidents(
        _.pick(opts, ['statuses', 'services', 'timeZone', 'token']));
    return filterIncidents(incidents, opts.filter);
}
