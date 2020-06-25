//Import the knex module into the project
const knex = require('knex')


//Initialise knex
const db = new knex({
    client: "pg",
    connection: 'postgres://postgres:12345678910@localhost:5432/proflow'
    // connection: process.env.DATABASE_URL
})

module.exports = db