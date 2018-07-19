
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('votes').del()
    .then(function () {
      // Inserts seed entries
      return knex('votes').insert([
        {round_id: 1 , user_id: 1 , vote: true  },
        {round_id: 1 , user_id: 2 , vote: false },
        {round_id: 1 , user_id: 3 , vote: false },
        {round_id: 1 , user_id: 4 , vote: true  },
        {round_id: 1 , user_id: 5 , vote: true  }
      ]);
    });
};
