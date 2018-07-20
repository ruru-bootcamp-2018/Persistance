const conn = require('./connection')

function getMissionParams(players_total, testDb){
  db = testDb || conn
  return db('missionParams').where({players_total})
}

function createGame(game_name, testDb){
  db = testDb || conn
  return db('games')
    .insert({game_name, is_finished: false, in_progress: false, time_stamp: Date.now()})
}

function startGame(game_id, testDb){
  db = testDb || conn
  return db('games').where('id', game_id)
    .update({in_progress: true, time_stamp: Date.now()})
}

function getGame(id, testDb){
  db = testDb || conn
  return db('games').where('id', id)
}

function roleEntry(game_id, user_id, testDb){
  db = testDb || conn
  return db('roles')
    .insert({game_id, user_id})
}

function getRoles(game_id, testDb){
  db = testDb || conn
  return db('roles').where('game_id', game_id)
}

function delRoles(game_id, testDb){
  db = testDb || conn
  return db('roles').where('game_id', game_id)
    .del()
}

function setRoles(roles, testDb){
  db =  testDb || conn
  return db('roles')
    .insert(roles)
}

function newMission(game_id, testDb){
  db = testDb || conn
  return db('missions')
    .insert({game_id})
}

function getMissions(game_id, testDb){
  db = testDb || conn
  return db('missions').where('game_id', game_id)
}

function newRound(mission_id, leader_id, round_num, testDb){
  db = testDb || conn
  return db('rounds')
    .insert({mission_id, leader_id, round_num})
}

function getRounds(mission_id, testDb){
  db = testDb || conn
  return db('rounds').where('mission_id', mission_id)
}

function castNomination(round_id, user_id, testDb){
  db = testDb || conn
  return db('nominations')
    .insert({round_id, user_id})
}

function castVote(round_id, user_id, vote, testDb){
  db = testDb || conn
  return db('votes')
    .insert(round_id, user_id, vote)
}

function castIntention(mission_id, user_id, intention, testDb){
  db = testDb || conn
  return db('intentions')
    .insert({mission_id, user_id, intention})
}

function finishMission(mission_id, outcome, testDb){
  db = testDb || conn
  return db('missions').where('id', mission_id)
    .update({outcome})
}


module.exports = {
  createGame,
  getGame,
  newMission,
  finishMission,
  newRound,
  castVote,
  castNomination,
  castIntention,
  setRoles,
  roleEntry,
  getRoles,
  delRoles,
  startGame,
  getMissions,
  getMissionParams,
  getRounds

}