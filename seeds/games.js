
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {id: 1, is_finished: false , in_progress: true , time_stamp: Date.now(), game_name: 'test game'}

      ]);
    });
};
