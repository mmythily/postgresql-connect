const settings = require('./settings'); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

const input = process.argv[2];

\
function lookupPerson(name) {
  knex.select('first_name', 'last_name', 'birthdate').from('famous_people')
    .where('first_name', name)
    .orWhere('last_name', name)
    .asCallback(function(err, rows) {
      if(err) {
        return console.error("error running query", err);
      }
      console.log("Searching...");
      console.log(`Found ${rows.length} by the name of '${name}':`);
      let count = 0;
      rows.forEach((row) => {
        console.log(`- ${count += 1}: ${row.first_name} ${row.last_name}, born '${row.birthdate.toISOString().slice(0, 10)}'`);
      })
  });
};

lookupPerson(input);
