
exports.up = function(knex, Promise) {
return knex.schema.createTable('games', (table) => {
  table.increments('id') //previously we have used round number do we need to identify this too?
  table.boolean('is_finished')
  table.boolean('in_progress')
  //table.timestamp('time_stamp') //biginteger?
  table.string('game_name')
  table.integer('host_id')
})
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('games')
}

