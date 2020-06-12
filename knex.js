//Import the knex module into the project
const knex = require('knex')


//Initialise knex
const db = new knex({
    client: "pg",
    connection: process.env.DATABASE_URL
})

module.exports = db