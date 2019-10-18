exports.up = function(knex, Promise) {
    return knex.schema.createTable('roles', table => {
        table.integer('game_id');
        table.integer('user_id');
        table.string('role');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('roles');
};
