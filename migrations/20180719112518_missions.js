
exports.up = function(knex, Promise) {
  return knex.schema.createTable('missions', (table) => {
    table.increments('id')
    table.integer('game_id')
    table.boolean('outcome')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('missions')
};
// not sure if we need this one
