//Import the knex module into the project
const knex = require('knex')


//Initialise knex
const db = new knex({
    client: "pg",
    connection: ' postgres://nqkkatyjlnexff:ecbf9dd96fade8f845146b06d40262b8eb3fac9f8b87b78ae1752dd19565ded3@ec2-18-214-211-47.compute-1.amazonaws.com:5432/d76bun6392uif4'
})

module.exports = db