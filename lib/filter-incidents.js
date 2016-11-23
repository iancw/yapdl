'use strict';

const _ = require('lodash');

module.exports = filterIncidents;

function filterIncidents(incidents, criteria) {
    return _.filter(incidents, (incident) => {
        return _.isEqual(
            _.pick(incident, _.keys(criteria)),
            criteria
        );
    });
}
