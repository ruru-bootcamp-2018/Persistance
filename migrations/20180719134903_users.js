
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('user_name')
    table.string('display_name')
    table.text('img')
    table.text('hash')

  })

};


exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
};
