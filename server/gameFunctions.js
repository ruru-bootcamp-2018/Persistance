const db = require('./db/game')
const {currentGames} = require('./currentGames')


//assign Roles Functions
function assignRoles(roles){
  const spyNum = howManySpies(roles.length)  
  for (let i = 0; i < spyNum; i++){
    assignRandomSpy(roles)
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
      return 1
  }
}

function assignRandomSpy(roles){
  let idx = Math.floor(Math.random()*roles.length)  
  if (roles[idx].role == 'spy') assignRandomSpy(roles)
  else roles[idx].role = 'spy'
}

//new Mission functions
function initMission(game_id){
  return db.newMission(game_id).then(ids => {
    return db.getMissions(game_id).then(missions => {
      let mission = missions[missions.length - 1] 
      mission.rounds = []
      mission.intentions = []
      currentGames[game_id].missions.push(mission)
      currentGames[game_id].currentMission = {id: ids[0], mission_num: missions.length, approved: false}
      return initRound(game_id)
    })        
  }) 
}

//new Round functions
function initRound(game_id){
 return db.getMissions(game_id).then(missions => {    
    const mission_id = missions[missions.length-1].id    
   return db.getAllRounds(game_id).then(allRounds => {
      const rounds = allRounds.filter(round => round.mission_id == mission_id)
      const round_num = rounds.length > 0 ? rounds[rounds.length-1].round_num+1 : 1      
     return db.getRoles(game_id).then(roles => {        
        let lastLeader = roles.findIndex(role => ((allRounds.length > 0 ? allRounds[allRounds.length-1].leader_id : 0) == role.user_id))        
        const nextLeader = (lastLeader+1 > roles.length-1) ? 0 : lastLeader+1                
        const leader_id = (roles[nextLeader].user_id) || roles[0].user_id
       return db.newRound(mission_id, leader_id, round_num).then(ids => {          
         return db.getRound(ids[0]).then(round => {
            currentGames[game_id].currentRound = round
            currentGames[game_id].gameStage = "nominating"
            console.log('nominate the team!!')
            currentGames[game_id].missions[missions.length - 1].rounds.push({...round, nominations: [], votes: []})
          })
        })
      })      
    })
  })
}

function checkNominations(game_id, round_id) {
  const missionParams = currentGames[game_id].missionParams[currentGames[game_id].currentMission.mission_num - 1]
  return db.getNominations(round_id).then(nominations => {
    if (nominations.length === missionParams.team_total) {
      currentGames[game_id].gameStage = "voting"
      console.log('vote on this team!!')
    }
  })
}

//check votes functions
function checkVotes(game_id, round_id){
  const round_num = currentGames[game_id].currentRound.round_num
  const mission_num = currentGames[game_id].currentMission.mission_num
  return db.getVotes(round_id).then(votes => {
    currentGames[game_id].missions[mission_num-1].rounds[round_num-1].votes = votes
    if (votes.length == currentGames[game_id].players.length) {
      if (countVotes(votes)) {
        approveMission(game_id, currentGames[game_id].currentMission.id)
      }
      else {
        if (currentGames[game_id].currentRound.round_num < 5) {
          console.log('rejected')
          return initRound(game_id)
          
        }
        else missionFails(game_id, currentGames[game_id].currentMission.id)
      }
    }
  })
}

function countVotes(votes){
  const approve = votes.reduce((acc, vote) => {
    if (vote.vote) acc++
    return acc
  }, 0)
  const reject = votes.length - approve
  return (approve > reject)
}

// mission functions
function approveMission(game_id){
  currentGames[game_id].currentMission.approved = true
  currentGames[game_id].gameStage = "intentions"
  console.log('mission goes ahead')
  console.log('place your intentions!!')
}

function checkIntentions(game_id, mission_id){
  const mission_num = currentGames[game_id].currentMission.mission_num
  const {team_total, fails_needed} = currentGames[game_id].missionParams[mission_num-1]  
  return db.getIntentions(mission_id).then(intentions => {
    currentGames[game_id].missions[mission_num-1].intentions = intentions
    if (intentions.length == team_total){
      if (countIntentions(intentions, fails_needed)) return missionSucceeds(game_id, mission_id)
      else return missionFails(game_id, mission_id)
    }
  })
}

function countIntentions(intentions, fails_needed){
  const fails = intentions.reduce((acc, intention) => {
    if (!intention.intention) acc++
    return acc
  }, 0)
  return (fails < fails_needed)
}

function missionSucceeds(game_id, mission_id){
  const mission_num = currentGames[game_id].currentMission.mission_num
  currentGames[game_id].missions[mission_num-1].outcome = true
  return db.finishMission(mission_id, true).then(() => {
    console.log('SUCCESS')
    return isGameFinished(game_id)    
  })  
}

function missionFails(game_id, mission_id){
  const mission_num = currentGames[game_id].currentMission.mission_num
  currentGames[game_id].missions[mission_num-1].outcome = false
  return db.finishMission(mission_id, false).then(() => {
    console.log("FAILURE")
    return isGameFinished(game_id)    
  })  
}

function isGameFinished(game_id){  
  return db.getMissions(game_id).then(missions => {
    const successes = missions.reduce((acc, mission) => {
      if (mission.outcome) acc++
      return acc
    }, 0)
    const fails = missions.length - successes
    if (successes == 3) return goodiesWin(game_id)
    else if (fails == 3) return spiesWin(game_id)
    else return initMission(game_id)
  })  
}

function goodiesWin(game_id){
  currentGames[game_id].game.is_finished = true
  currentGames[game_id].gameStage = 'goodWin'
  console.log('Goodies Win')
}

function spiesWin(game_id){
  currentGames[game_id].game.is_finished = true
  currentGames[game_id].gameStage = 'spyWin'
  console.log('Spies Win')
}

module.exports = {
  assignRoles,
  initMission,
  initRound,
  checkVotes,
  checkIntentions,
  checkNominations
}