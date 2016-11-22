'use strict';

const _ = require('lodash');

module.exports = {
    statusQuery: statusQuery,
    serviceQuery: serviceQuery,
    timeZone: timeZone,
};

function statusQuery(statuses) {
    return _(statuses)
        .map((status) => `statuses%5B%5D=${status}`)
        .join('&');
}

function serviceQuery(services) {
    if (_.isEmpty(services)) {
        return '';
    }
    return 'service_ids%5B%5D=' + _.join(services, '%2C');
}

function timeZone(tz) {
    if (_.isNil(tz)) {
        return '';
    }
    return `time_zone=${tz}`;
}
