'use strict';

const getIncidents = require('./lib/get-incidents');
const findIncidents = require('./lib/find-incidents');
const filterIncidents = require('./lib/filter-incidents');

module.exports = {
    getIncidents: getIncidents,
    findIncidents: findIncidents,
    filterIncidents: filterIncidents,
};

