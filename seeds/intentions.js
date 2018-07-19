
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('intentions').del()
    .then(function () {
      // Inserts seed entries
      return knex('intentions').insert([
        {mission_id:1 , user_id: 1 , intention: true},
        {mission_id:1 , user_id: 2 , intention: false}

      ]);
    });
};
