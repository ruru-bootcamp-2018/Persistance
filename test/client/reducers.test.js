import usersReducer from '../../client/reducers/users'
import gamesReducer from '../../client/reducers/games'
import authReducer from '../../client/reducers/auth'
import currentGameReducer from '../../client/reducers/currentGame'

jest.mock('../../client/utils/localstorage', () => {
  return {
    get: (key) => {},
    set: (key, value) => {}
  }
})

test('Games reducer Initial State', () => {
  const expected = [{"game_name": "PLAGUE'S GAME", "host_id": 7, "id": 1, "is_finished": false,
"is_progress": false, "timestamp": 63465475684}, {"game_name": "PLAGUE'S OTHER GAME",
"host_id": 5, "id": 2, "is_finished": false, "is_progress": false, "timestamp": 83745767386},
{"game_name": "PLAGUE'S OTHER OTHER GAME", "host_id": 3, "id": 3, "is_finished": false,
"is_progress": false, "timestamp": 33546476876}]

  const actual = gamesReducer(undefined, {})

  expect(actual).toEqual(expected)
})

test('RECEIVE_GAMES', () => {
  const fakeGame = [
    'One New Game'
  ]
  const expected = fakeGame

  const action = {
    type: 'RECEIVE_GAMES',
    games: fakeGame
  }

  const actual = gamesReducer(fakeGame, action)

  expect(actual.length).toEqual(1)
  expect(actual).toEqual(expected)
})

test('RECEIVE_PLAYERS', () => {
  const fakePlayers = [
    'Harrison',
    'Ross',
    'Cake'
  ]
  const expected = fakePlayers

  const action = {
    type: 'RECEIVE_PLAYERS',
    players: fakePlayers
  }

  const actual = usersReducer(fakePlayers, action)

  expect(actual.length).toEqual(3)
  expect(actual).toEqual(expected)
})

test('CurrentGame reducer Initial State', () => {
  const expected = {
      game: {},
      players: [],
      missions: [],
      gameStage: "",
      currentMission: {},
      currentRound: {}
  }

  const actual = currentGameReducer(undefined, {})

  expect(actual).toEqual(expected)
})

test('UPDATE_GAME', () => {
  const fakeCurrentGame = {
      game: {id: 1},
      players: ['people'],
      missions: [7],
      gameStage: "Nomnomnom",
      currentMission: {id: 0},
      currentRound: {id: 1}
  }

  const expected = fakeCurrentGame

  const action = {
    type: 'UPDATE_GAME',
    currentGame: fakeCurrentGame
  }

  const actual = currentGameReducer(fakeCurrentGame, action)

  expect(actual).toEqual(expected)
})
