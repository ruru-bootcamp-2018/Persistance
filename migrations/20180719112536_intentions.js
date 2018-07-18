
exports.up = function(knex, Promise) {
  return knex.schema.createTable('intentions', (table) => {
    // all increments ? all refering to the identification of elements...
    table.increments('id')
    table.increments('gameid')
    table.increments('missionid')
    table.increments('playerid')
    table.string('intention') //this might need elaboration 
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable('intentions')
};
