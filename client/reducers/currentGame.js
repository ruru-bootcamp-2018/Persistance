export const initialState = {
    auth: {
        user: {
            id: 7,
            user_name: "Cate",
            display_name: "Plague the Great and Powerful",
            img: "www.wombatpics.com/img",
        },
        token: "some shit we don't care about"
    },
    games: [ //just the games that are not started or finished
        { id: 1, is_finished:false, is_progress:false, timestamp:63465475684, game_name:"PLAGUE'S GAME", host_id: 7},
        { id: 2, is_finished:false, is_progress:false, timestamp:83745767386, game_name:"PLAGUE'S OTHER GAME", host_id: 5},
        { id: 3, is_finished:false, is_progress:false, timestamp:33546476876, game_name:"PLAGUE'S OTHER OTHER GAME", host_id: 3}
    ],
    currentGame: {
        game:  {id: 4, is_finished:false, is_progress:true, timestamp:6968856873, game_name:"THE BEST GAME OF ALL", host_id:7},
        players: [
            {id:1, user_name:"Rebdug", display_name:"REBDUG", img:"www.wombatpics.com/img", game_id:4, role:"spy" },
            {id:7, user_name:"Cate", display_name:"Plague the Great and Powerful", img:"www.wombatpics.com/img", game_id:4, role:"spy" },
            {id:3, user_name:"Dannash100", display_name:"DANNASH100", img:"www.wombatpics.com/img", game_id:4, role:"good" },
            {id:4, user_name:"maddog", display_name:"MAD DOG PINFOLD", img:"www.wombatpics.com/img", game_id:4, role:"good" },
            {id:5, user_name:"phoenix", display_name:"Phoenix", img:"www.wombatpics.com/img", game_id:4, role:"good" }
        ],
        missions: [
        {id:1, game_id:4, outcome:false, rounds: [
          {id:1, mission_id:1, leader_id:1, round_num:1,
          nominations: [{round_id:1, user_id:3 },
            {round_id:1, user_id:1 }], //nominated player => user_id
          votes: [{round_id:1, user_id:1, vote:true},
            {round_id:1, user_id:7, vote:true},
            {round_id:1, user_id:3, vote:true},
            {round_id:1, user_id:4, vote:false},
            {round_id:1, user_id:5, vote:false}] //vote caster => user_id
          }
        ],
        intentions: [{mission_id:1, user_id:1, intention:false},
            {mission_id:1, user_id:3, intention:true}]
       }
      ]
    },
    currentMission: {
        id:1, game_id:4, outcome:false, //outcome will be null until mission outcome sent to db and currentmission iterated.
    },
    currentRound: {
        id:1, mission_id:1, leader_id:1, round_num:1
    },
    mission_params: [ //could be one level up?
        {players_total:5, team_total:2, mission_num:1, fails_needed:1 }
    ]
}

export default function currentGame(state = initialState, action) {
    switch(action.type) {
        case 'UPDATE_GAME':
            return action.currentGame
        default:
            return state; 
    }
}
