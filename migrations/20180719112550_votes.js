
exports.up = function(knex, Promise) {
  return knex.schema.createTable('votes', (table)=>{
    table.integer('round_id') //previously we have used round number do we need to identify this too?
    table.integer('user_id')
    table.string('vote')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('votes')
};
