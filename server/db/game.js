const conn = require('./connection');

function getMissionParams(players_total, testDb) {
    db = testDb || conn;
    return db('mission_params').where({ players_total });
}

function createGame(game_name, host_id, testDb) {
    const db = testDb || conn;
    return db
        .insert(
            [{ game_name, host_id, is_finished: false, in_progress: false }],
            'id'
        )
        .into('games');
}

function startGame(game_id, testDb) {
    const db = testDb || conn;
    return db('games')
        .where('id', game_id)
        .update({ in_progress: true /*, time_stamp: Date.now()*/ });
}

function getGame(id, testDb) {
    const db = testDb || conn;
    return db('games')
        .where('id', id)
        .first();
}

function getOpenGames(testDb) {
    const db = testDb || conn;
    return db('games').where({ in_progress: false, is_finished: false });
}

function roleEntry(game_id, user_id, testDb) {
    const db = testDb || conn;
    return db.insert([{ game_id, user_id }], 'user_id').into('roles');
}

function getRoles(game_id, testDb) {
    const db = testDb || conn;
    return db('roles').where('game_id', game_id);
}

function getPlayers(game_id, testDb) {
    const db = testDb || conn;
    return db('roles')
        .where('game_id', game_id)
        .join('users', 'users.id', 'roles.user_id')
        .select(
            'users.id',
            'users.user_name',
            'users.display_name',
            'users.img',
            'roles.role'
        );
    // .then(players => {
    //   return players.map(player => {
    //     delete player.hash
    //     return player
    //   })
    // })
}

function delRoles(game_id, testDb) {
    const db = testDb || conn;
    return db('roles')
        .where('game_id', game_id)
        .del();
}

function setRoles(roles, testDb) {
    const db = testDb || conn;
    return db.insert(roles, 'user_id').into('roles');
}

function newMission(game_id, testDb) {
    const db = testDb || conn;
    return db.insert([{ game_id }], 'id').into('missions');
}

function getMissions(game_id, testDb) {
    const db = testDb || conn;
    return db('missions').where('game_id', game_id);
}

function newRound(mission_id, leader_id, round_num, testDb) {
    const db = testDb || conn;
    return db
        .insert([{ mission_id, leader_id, round_num }], 'id')
        .into('rounds');
}

function getRounds(mission_id, testDb) {
    const db = testDb || conn;
    return db('rounds').where('mission_id', mission_id);
}

function getAllRounds(game_id, testDb) {
    const db = testDb || conn;
    return db('rounds')
        .join('missions', 'rounds.mission_id', 'missions.id')
        .select(
            'rounds.id',
            'rounds.mission_id',
            'rounds.leader_id',
            'rounds.round_num',
            'missions.game_id'
        )
        .where('game_id', game_id);
}

function getRound(round_id, testDb) {
    const db = testDb || conn;
    return db('rounds')
        .where('id', round_id)
        .first();
}

function castNomination(round_id, user_id, username, testDb) {
    const db = testDb || conn;
    return db
        .insert([{ round_id, user_id, username }], 'user_id')
        .into('nominations');
}

function removeNomination(round_id, user_id, testDb) {
    const db = testDb || conn;
    return db('nominations')
        .where('user_id', user_id)
        .del();
}

function getNominations(round_id, testDb) {
    const db = testDb || conn;
    return db('nominations').where('round_id', round_id);
}

function castVote(round_id, user_id, vote, testDb) {
    const db = testDb || conn;
    return db.insert([{ round_id, user_id, vote }], 'user_id').into('votes');
}

function getVotes(round_id, testDb) {
    const db = testDb || conn;
    return db('votes').where('round_id', round_id);
}

function castIntention(mission_id, user_id, intention, testDb) {
    const db = testDb || conn;
    return db
        .insert([{ mission_id, user_id, intention }], 'user_id')
        .into('intentions');
}

function getIntentions(mission_id, testDb) {
    const db = testDb || conn;
    return db('intentions').where('mission_id', mission_id);
}

function finishMission(mission_id, outcome, testDb) {
    const db = testDb || conn;
    return db('missions')
        .where('id', mission_id)
        .update({ outcome });
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
    getRounds,
    getAllRounds,
    getNominations,
    getVotes,
    getPlayers,
    getOpenGames,
    getRound,
    getIntentions,
    removeNomination,
};
