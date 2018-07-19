
exports.up = function(knex, Promise) {
  return knex.schema.createTable('intentions', (table) => {
    // all increments ? all refering to the identification of elements...
    table.integer('mission_id')
    table.integer('user_id')
    table.boolean('intention') //this might need elaboration
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('intentions')
};
