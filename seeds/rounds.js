
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rounds').del()
    .then(function () {
      // Inserts seed entries
      return knex('rounds').insert([
        {id: 1, mission_id: 1 , leader_id: 1 , round_num: 1}
      ]);
    });
};
