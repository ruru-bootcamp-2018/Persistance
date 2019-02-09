const {generateSync} = require('../server/auth/hash')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  // return knex('users').del()
  //   .then(function () {
  //     // Inserts seed entries
  //     return knex('users').insert([
  //       {id: 1, user_name: 'Cate' , display_name: 'Catree' ,img:'https://tinyurl.com/ybmze666' , hash: generateSync('Cate') },
  //       {id: 2, user_name: 'Ross' , display_name: 'MadDog' ,img:'https://tinyurl.com/ybmze666' , hash: generateSync('Ross') },
  //       {id: 3, user_name: 'Phoenix' , display_name: 'Solz' ,img:'https://tinyurl.com/ybmze666' , hash: '2754734' },
  //       {id: 4, user_name: 'Cliff' , display_name: 'Invictus' ,img:'https://tinyurl.com/ybmze666' , hash: '34734657' },
  //       {id: 5, user_name: 'Dugz' , display_name: 'Rebby' ,img:'https://tinyurl.com/ybmze666' , hash: '3547367' }
  //     ]);
  //   });
};
