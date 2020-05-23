const express = require('express');
const fs = require('fs');
const logger = require('./logger');

const api = express.Router();

api.post('/', (req, res) => {
  const {ascending, filters, size, sortOn, start = 0, type} = req.body;
  const sortDetails = sortOn
    ? ` sorted on ${sortOn} (${type}) ${ascending ? 'ascending' : 'descending'}`
    : '';
  let msg =
    `start = ${start}, size = ${size}` +
    `${sortDetails} with filters ${JSON.stringify(filters)}`;
  const operation = 'get transactions';
  logger.info(req, operation, msg);

  // Get all the data.
  const json = fs.readFileSync('./txn-data.json', {
    encoding: 'utf8'
  });
  let array = JSON.parse(json);

  if (sortOn) {
    array.sort((obj1, obj2) => {
      let compare = 0;
      const v1 = obj1[sortOn];
      const v2 = obj2[sortOn];

      if (type === 'number' || type === 'currency') {
        compare = v1 - v2;
      } else if (type === 'date') {
        const d1 = new Date(v1);
        const d2 = new Date(v2);
        compare = d1.getTime() - d2.getTime();
      } else if (type === 'string') {
        compare = v1.localeCompare(v2);
      }

      return ascending ? compare : -compare;
    });
  }

  function processFilter(property, type, operator, value) {
    if (value === undefined) return;

    const isDate = type === 'date';
    if (isDate) value = new Date(value).getTime();

    array = array.filter(element => {
      let v = element[property];
      if (isDate) v = new Date(v).getTime();

      switch (operator) {
        case '>':
          return Number(v) > Number(value);
        case '>=':
          return Number(v) >= Number(value);
        case '=':
          return Number(v) === Number(value);
        case '!=':
          return Number(v) !== Number(value);
        case '<=':
          return Number(v) <= Number(value);
        case '<':
          return Number(v) < Number(value);
        case 'equals':
          return String(v) === String(value);
        case 'not equals':
          return String(v) !== String(value);
        case 'contains':
          return String(v).includes(String(value));
        case 'starts with':
          return String(v).startsWith(String(value));
        case 'ends with':
          return String(v).endsWith(String(value));
        default:
          return true;
      }
    });
  }

  // Filter the data.
  for (const property of Object.keys(filters)) {
    const filter = filters[property];
    const {operator1, operator2, type, value1, value2} = filter;
    processFilter(property, type, operator1, value1);
    processFilter(property, type, operator2, value2);
  }

  const isLast = start + size + 1 >= array.length;

  // Return only the requested subset.
  const transactions = size ? array.slice(start, start + size) : array;
  msg = `returning ${transactions.length} transactions`;
  logger.info(req, operation, msg);
  res.json({isLast, records: transactions});
});

module.exports = api;
