const {generateSync} = require('../server/auth/hash')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, user_name: 'user1' , display_name: 'user1' ,img:'https://tinyurl.com/ybmze666' , hash: generateSync('user1') },

      ]);
    });
};
