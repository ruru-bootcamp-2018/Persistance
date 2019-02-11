const {generateSync} = require('../server/auth/hash')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, user_name: 'user1' , display_name: 'user1' ,img:'https://tinyurl.com/ybmze666' , hash: generateSync('user1') },
        {id: 2, user_name: 'user2' , display_name: 'user2' ,img:'https://tinyurl.com/ybmze666' , hash: generateSync('user2') },
        {id: 3, user_name: 'user3' , display_name: 'user3' ,img:'https://tinyurl.com/ybmze666' , hash: generateSync('user3') },
        {id: 4, user_name: 'user4' , display_name: 'user4' ,img:'https://tinyurl.com/ybmze666' , hash: generateSync('user4') },
        {id: 5, user_name: 'user5' , display_name: 'user5' ,img:'https://tinyurl.com/ybmze666' , hash: generateSync('user5') },
        {id: 6, user_name: 'user6' , display_name: 'user6' ,img:'https://tinyurl.com/ybmze666' , hash: generateSync('user6') },
        {id: 7, user_name: 'user7' , display_name: 'user7' ,img:'https://tinyurl.com/ybmze666' , hash: generateSync('user7') },
        {id: 8, user_name: 'user8' , display_name: 'user8' ,img:'https://tinyurl.com/ybmze666' , hash: generateSync('user8') },
        {id: 9, user_name: 'user9' , display_name: 'user9' ,img:'https://tinyurl.com/ybmze666' , hash: generateSync('user9') },
        {id: 10, user_name: 'user10' , display_name: 'user10' ,img:'https://tinyurl.com/ybmze666' , hash: generateSync('user10') },
      ]);
    });
};
