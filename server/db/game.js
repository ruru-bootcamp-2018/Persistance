const conn = require('./connection')

function createGame(game_name, testDb){
  db = testDb || conn
  db('games')
    .insert({game_name, is_finished: false, in_progress: true, time_stamp: Date.now()})
}

function setRole(game_id, user_id, role, testDb){
  db = testDb || conn
  db('roles')
    .insert({game_id, user_id, role})
}

function newMission(game_id, testDb){
  db = testDb || conn
  db('missions')
    .insert({game_id})
}

function newRound(mission_id, leader_id, round_num, testDb){
  db = testDb || conn
  db('rounds')
    .insert({mission_id, leader_id, round_num})
}

function castNomination(round_id, user_id, testDb){
  db = testDb || conn
  db('nominations')
    .insert({round_id, user_id})
}

function castVote(round_id, user_id, vote, testDb){
  db = testDb || conn
  db('votes')
    .insert(round_id, user_id, vote)
}

function castIntention(mission_id, user_id, intention, testDb){
  db = testDb || conn
  db('intentions')
    .insert({mission_id, user_id, intention})
}

function finishMission(mission_id, outcome, testDb){
  db = testDb || conn
  db('missions').where('id', mission_id)
    .update({outcome})
}


module.exports = {
  createGame,
  newMission,
  finishMission,
  newRound,
  castVote,
  castNomination,
  castIntention,
  setRole,

}