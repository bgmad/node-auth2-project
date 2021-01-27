const knex = require('knex');
const configs = require('../knexfile');
const env = process.env.ENVIRONMENT || 'development';

const db = knex(configs[env]);

module.exports = db;