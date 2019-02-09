
exports.up = function(knex, Promise) {
  return knex.schema.createTable('mission_params', (table) => {
    table.increments('id')
    table.integer('players_total')
    table.integer('team_total')
    table.integer('mission_num')
    table.integer('fails_needed')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('mission_params')
};
