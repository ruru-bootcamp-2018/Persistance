
exports.up = function(knex, Promise) {
return knex.schema.createTable('games', (table) => {
  table.increments('id') //previously we have used round number do we need to identify this too?
  table.boolean('is_finished')
  table.boolean('in_progress')
  table.integer('time_stamp')
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('games')
};
