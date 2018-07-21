const state = {
    auth: {
        user: {
            id: 1,
            user_name: "Brad",
            display_name: "Bad Wombat",
            img: "www.wombatpics.com/img",
        },
        token: "some shit we don't care about"
    },
    games: [ //just the games that are not started or finished
        { id:"", is_finished:"", is_progress:"", timestamp:"", game_name:"", host_id:"" }
    ],
    currentMission: {
        id:"", game_id:"", outcome:"", //outcome will be null until mission outcome sent to db and currentmission iterated.
    mission_num:"", mission_approved: false, /*in DB, mebbe not needed in state?*/   
    },
    currentRound: {
        id:"", mission_id:"", leader_id:"", round_num:""
    },
    mission_params: [ //could be one level up?
        { id:"" /*need this?*/, players_total:"", team_total:"", mission_num:"", fails_needed:"" }
    ],
    currentGame: {
        game:  { id:"", is_finished:"", is_progress:"", timestamp:"", game_name:"", host_id:"" },
        gameStage:"nominating" || "voting" || "intentions",
        players: [
            { id:"", user_name:"", display_name:"", img:"", game_id:"", role:"" }
        ],



        missions: [
        {id:"", game_id:"", outcome:"", rounds:"" [
          {id:"", mission_id:"", leader_id:"", round_num:"",
          nominations: [{round_id:"", user_id:"" }], //nominated player => user_id
          votes: [{round_id:"", user_id:"", vote:""}] //vote caster => user_id
          }
        ], intentions: [{mission_id:"", user_id:"", intention:""}]
       }
      ],

    }
}

console.log(state);
