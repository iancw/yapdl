'use strict';

const _ = require('lodash');

module.exports = {
    statusQuery: statusQuery,
    serviceQuery: serviceQuery,
    timeZone: timeZone,
};

function statusQuery(statuses) {
    return arrayQueryParams(statuses, 'statuses');
}

function serviceQuery(services) {
    return arrayQueryParams(services, 'service_ids');
}

function arrayQueryParams(arrayData, name) {
    return _(arrayData)
        .map((d) => `${name}%5B%5D=${d}`)
        .join('&');
}

function timeZone(tz) {
    if (_.isNil(tz)) {
        return '';
    }
    return `time_zone=${tz}`;
}
