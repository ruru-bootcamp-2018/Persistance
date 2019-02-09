
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('mission_params').del()
    .then(function () {
      // Inserts seed entries
      return knex('mission_params').insert([
        {players_total: 5, team_total: 2 , mission_num:1 , fails_needed: 1 },
        {players_total: 5, team_total: 3 , mission_num:2 , fails_needed: 1 },
        {players_total: 5, team_total: 2 , mission_num:3, fails_needed: 1 },
        {players_total: 5, team_total: 3 , mission_num:4 , fails_needed: 1 },
        {players_total: 5, team_total: 3 , mission_num:5 , fails_needed: 1 },
        // round for six players
        {players_total: 6, team_total: 2 , mission_num:1 , fails_needed: 1 },
        {players_total: 6, team_total: 3 , mission_num:2 , fails_needed: 1 },
        {players_total: 6, team_total: 4 , mission_num:3, fails_needed: 1 },
        {players_total: 6, team_total: 3 , mission_num:4 , fails_needed: 1 },
        {players_total: 6, team_total: 4 , mission_num:5 , fails_needed: 1 },
        // round for seven players
        {players_total: 7, team_total: 2 , mission_num:1 , fails_needed: 1 },
        {players_total: 7, team_total: 3 , mission_num:2 , fails_needed: 1 },
        {players_total: 7, team_total: 3 , mission_num:3, fails_needed: 1 },
        {players_total: 7, team_total: 4 , mission_num:4 , fails_needed: 2 },
        {players_total: 7, team_total: 4 , mission_num:5 , fails_needed: 1 },
        // round for eight players
        {players_total: 8, team_total: 3 , mission_num:1 , fails_needed: 1 },
        {players_total: 8, team_total: 4 , mission_num:2 , fails_needed: 1 },
        {players_total: 8, team_total: 4 , mission_num:3, fails_needed: 1 },
        {players_total: 8, team_total: 5 , mission_num:4 , fails_needed: 4 },
        {players_total: 8, team_total: 5 , mission_num:5 , fails_needed: 1 },
        // round for nine players
        {players_total: 9, team_total: 3 , mission_num:1 , fails_needed: 1 },
        {players_total: 9, team_total: 4 , mission_num:2 , fails_needed: 1 },
        {players_total: 9, team_total: 4 , mission_num:3, fails_needed: 1 },
        {players_total: 9, team_total: 5 , mission_num:4 , fails_needed: 2 },
        {players_total: 9, team_total: 5 , mission_num:5 , fails_needed: 1 },
        // round for ten players
        {players_total: 10, team_total: 3 , mission_num:1 , fails_needed: 1 },
        {players_total: 10, team_total: 4 , mission_num:2 , fails_needed: 1 },
        {players_total: 10, team_total: 4 , mission_num:3, fails_needed: 1 },
        {players_total: 10, team_total: 5 , mission_num:4 , fails_needed: 2 },
        {players_total: 10, team_total: 5 , mission_num:5 , fails_needed: 1 },
        // round for 2 players
        {players_total: 2, team_total: 1 , mission_num:1 , fails_needed: 1 },
        {players_total: 2, team_total: 1 , mission_num:2 , fails_needed: 1 },
        {players_total: 2, team_total: 1 , mission_num:3, fails_needed: 1 },
        {players_total: 2, team_total: 1 , mission_num:4 , fails_needed: 1 },
        {players_total: 2, team_total: 1 , mission_num:5 , fails_needed: 1 },
        // round for 3 players
        {players_total: 3, team_total: 1 , mission_num:1 , fails_needed: 1 },
        {players_total: 3, team_total: 1 , mission_num:2 , fails_needed: 1 },
        {players_total: 3, team_total: 1 , mission_num:3, fails_needed: 1 },
        {players_total: 3, team_total: 1 , mission_num:4 , fails_needed: 1 },
        {players_total: 3, team_total: 1 , mission_num:5 , fails_needed: 1 },
        // round for 4 players
        {players_total: 4, team_total: 1 , mission_num:1 , fails_needed: 1 },
        {players_total: 4, team_total: 1 , mission_num:2 , fails_needed: 1 },
        {players_total: 4, team_total: 1 , mission_num:3, fails_needed: 1 },
        {players_total: 4, team_total: 1 , mission_num:4 , fails_needed: 1 },
        {players_total: 4, team_total: 1 , mission_num:5 , fails_needed: 1 }
      ]);
    });
};
