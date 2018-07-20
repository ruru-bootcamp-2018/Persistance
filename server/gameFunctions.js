const db = require('./db/game')


//assign Roles Functions
function assignRoles(roles){
  const spyNum = howManySpies(roles.length)  
  for (let i = 0; i < spyNum; i++){
    //assignRandomSpy(roles)
  }
  roles.forEach(role => {
  if (!role.role) role.role = 'good'  
  })  
}

function howManySpies(num){  
  switch(num){
    case 5:
    case 6:
      return 2
    case 7:
    case 8:
    case 9:
      return 3    
    case 10:
      return 4
    default:
      return 2
  }
}

function assignRandomSpy(roles){
  let idx = Math.floor(Math.random()*roles.length)  
  if (roles[idx].role == 'spy') assignRandomSpy(roles)
  else roles[idx].role = 'spy'
}

//new Mission functions
function initMission(game_id){
  db.newMission(game_id).then(() => {
    initRound(game_id)
  })
}

//new Round functions
function initRound(game_id){
  db.getMissions(game_id).then(missions => {
    console.log(missions)
    const mission_id = missions[missions.length-1].id
    // needs to be all rounds not just current mission
    db.getRounds(mission_id).then(rounds => {
      const round_num = rounds.length > 0 ? rounds[rounds.length-1].round_num+1 : 1
      db.getRoles(game_id).then(roles => {
        const lastLeader = roles.findIndex(role => (rounds.length > 0 ? rounds[rounds.length-1].leader_id : 0 == role.user_id))
        const nextLeader = (lastLeader+1 > roles.length-1) ? 0 : lastLeader+1
        const leader_id = (roles[nextLeader].user_id) || roles[0].user_id
        db.newRound(mission_id, leader_id, round_num).then(ids => {
          console.log('Current Round id: '+ ids[0])
        })
      })
      
    })
  })
  

}

module.exports = {
  assignRoles,
  initMission,
  initRound
}