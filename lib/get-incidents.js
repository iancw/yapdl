'use strict';

const got = require('got');
const helpers = require('./helpers');
const _ = require('lodash');

module.exports = getIncidents;

function buildQueryString(opts) {
    return _.join(_.compact([
        helpers.statusQuery(opts.statuses),
        helpers.serviceQuery(opts.services),
        helpers.timeZone(opts.timeZone),
    ]), '&');
}

function getIncidents(opts) {
    if (_.isNil(_.get(opts, 'token'))) {
        throw new ReferenceError('Options must include token');
    }
    return got('https://api.pagerduty.com/incidents', {
        query: buildQueryString(opts),
        headers: {
            accept: 'application/vnd.pagerduty+json;version=2',
            authorization: `Token token=${opts.token}`
        }
    })
    .then((response) => {
        return JSON.parse(response.body);
    });
}
