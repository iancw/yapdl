# Javascript library for querying the PagerDuty v2 API

This is a wrapper for the PagerDuty v2 API for using in node JS. It is written to allow querying
for open incidents and filtering by description.

## Installation

`npm install --save yapdl`

## Basic Usage

Here is an example (from the unit tests) that queries the PagerDuty v2 API for open incidents filtering by a couple service names. It uses the public sample token provided by in the [PagerDuty API Reference](https://v2.developer.pagerduty.com/v2/page/api-reference).

```
const yapdl = require('yapdl');

const response = yield yapdl.getIncidents({
    statuses: ['triggered', 'acknowledged'],
    services: ['P3U7V58', 'POBALVM'],
    token: 'w_8PcNuhHa-y3xYdmc1x',
});

const ratIncidents = yapdl.filterIncidents(response.incidents, {description: 'Rats chewed through the fiber.'});
```

