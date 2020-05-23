// To run this, enter `npm run genTxnData`.
const faker = require('faker');
const fs = require('fs');

const RECORDS = 100;
const CATEGORIES = ['clothing', 'entertainment', 'food', 'transportation'];

const records = [];

for (let i = 0; i < RECORDS; i++) {
  records.push({
    date: faker.date.past(2), // can go back 2 years
    category: faker.random.arrayElement(CATEGORIES),
    price: faker.commerce.price(),
    description: faker.commerce.productName(),
    txnId: '#' + faker.random.number({min: 100000, max: 999999})
  });
}

const fileName = 'txn-data.json';
fs.writeFileSync(fileName, JSON.stringify(records));
console.info('wrote', fileName);
