
exports.up = function(knex, Promise) {
  return knex.schema.createTable('rounds', (table)=> {
    table.increments('id')
    table.integer('mission_id')
    table.integer('leader_id')
    table.integer('round_num')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rounds')
};
