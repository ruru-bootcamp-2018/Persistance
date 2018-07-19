
exports.up = function(knex, Promise) {
  return knex.schema.createTable('rounds', (table)=> {
    table.increments('id')
    table.increments('gameid')
    table.increments('missionid')
    table.increments('leaderid')
    // table.integer('roundNum')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rounds')
};
