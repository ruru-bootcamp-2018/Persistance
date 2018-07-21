const mission2 = {
  "currentGame": {
      "game": {
          "id": 28,
          "is_finished": 0,
          "in_progress": true,
          "time_stamp": 1532143690765,
          "game_name": "Dagger",
          "host_id": null
      },
      "players": [
          {
              "id": 1,
              "user_name": "Cate",
              "display_name": "Catree",
              "img": "https://tinyurl.com/ybmze666",
              "role": "spy"
          },
          {
              "id": 2,
              "user_name": "Ross",
              "display_name": "MadDog",
              "img": "https://tinyurl.com/ybmze666",
              "role": "spy"
          },
          {
              "id": 3,
              "user_name": "Phoenix",
              "display_name": "Solz",
              "img": "https://tinyurl.com/ybmze666",
              "role": "good"
          },
          {
              "id": 4,
              "user_name": "Cliff",
              "display_name": "Invictus",
              "img": "https://tinyurl.com/ybmze666",
              "role": "good"
          },
          {
              "id": 5,
              "user_name": "Dugz",
              "display_name": "Rebby",
              "img": "https://tinyurl.com/ybmze666",
              "role": "good"
          }
      ],
      "gameStage": "nominating",
      "missions": [
          {
              "id": 45,
              "game_id": 28,
              "outcome": false,
              "rounds": [
                  {
                      "id": 77,
                      "mission_id": 45,
                      "leader_id": 1,
                      "round_num": 1,
                      "nominations": [
                          {
                              "round_id": 77,
                              "user_id": 1
                          },
                          {
                              "round_id": 77,
                              "user_id": 2
                          }
                      ],
                      "votes": [
                          {
                              "round_id": 77,
                              "user_id": 1,
                              "vote": 1
                          },
                          {
                              "round_id": 77,
                              "user_id": 2,
                              "vote": 1
                          },
                          {
                              "round_id": 77,
                              "user_id": 3,
                              "vote": 0
                          },
                          {
                              "round_id": 77,
                              "user_id": 4,
                              "vote": 0
                          },
                          {
                              "round_id": 77,
                              "user_id": 5,
                              "vote": 0
                          }
                      ]
                  },
                  {
                      "id": 78,
                      "mission_id": 45,
                      "leader_id": 2,
                      "round_num": 2,
                      "nominations": [
                          {
                              "round_id": 78,
                              "user_id": 1
                          },
                          {
                              "round_id": 78,
                              "user_id": 2
                          }
                      ],
                      "votes": [
                          {
                              "round_id": 78,
                              "user_id": 1,
                              "vote": 1
                          },
                          {
                              "round_id": 78,
                              "user_id": 2,
                              "vote": 1
                          },
                          {
                              "round_id": 78,
                              "user_id": 3,
                              "vote": 1
                          },
                          {
                              "round_id": 78,
                              "user_id": 4,
                              "vote": 0
                          },
                          {
                              "round_id": 78,
                              "user_id": 5,
                              "vote": 0
                          }
                      ]
                  }
              ],
              "intentions": [
                  {
                      "mission_id": 45,
                      "user_id": 1,
                      "intention": 1
                  },
                  {
                      "mission_id": 45,
                      "user_id": 2,
                      "intention": 0
                  }
              ]
          },
          {
              "id": 46,
              "game_id": 28,
              "outcome": null,
              "rounds": [
                  {
                      "id": 79,
                      "mission_id": 46,
                      "leader_id": 3,
                      "round_num": 1,
                      "nominations": [],
                      "votes": []
                  }
              ],
              "intentions": []
          }
      ]
  },
  "currentRound": {
      "id": 79,
      "mission_id": 46,
      "leader_id": 3,
      "round_num": 1
  },
  "currentMission": {
      "id": 46,
      "mission_num": 2,
      "approved": false
  },
  "missionParams": [
      {
          "id": 91,
          "players_total": 5,
          "team_total": 2,
          "mission_num": 1,
          "fails_needed": 1
      },
      {
          "id": 92,
          "players_total": 5,
          "team_total": 3,
          "mission_num": 2,
          "fails_needed": 1
      },
      {
          "id": 93,
          "players_total": 5,
          "team_total": 2,
          "mission_num": 3,
          "fails_needed": 1
      },
      {
          "id": 94,
          "players_total": 5,
          "team_total": 3,
          "mission_num": 4,
          "fails_needed": 1
      },
      {
          "id": 95,
          "players_total": 5,
          "team_total": 3,
          "mission_num": 5,
          "fails_needed": 1
      }
  ]
}

module.exports = mission2