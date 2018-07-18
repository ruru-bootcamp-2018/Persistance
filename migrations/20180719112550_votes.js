
exports.up = function(knex, Promise) {
  return knex.schema.createTable('votes', (table)=>{
    table.increments('id')
    table.increments('roundid') //previously we have used round number do we need to identify this too?
    table.increments('playerid')
    table.string('vote')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('votes')
};
