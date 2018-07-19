
exports.up = function(knex, Promise) {
return knex.schema.createTable('nominations', (table) => {
  table.integer('round_id') //previously we have used round number do we need to identify this too?
  table.integer('user_id')
})
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('nominations')
};
