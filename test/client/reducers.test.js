import usersReducer from '../../client/reducers/users'
import gamesReducer from '../../client/reducers/games'
import authReducer from '../../client/reducers/auth'

test('Reducer Initial State', () => {
  const expected = []

  const actual = gamesReducer(undefined, {})

  expect(actual).toEqual(expected)
})

test('RECEIVE_GAME', () => {
  const fakeGame = [
    'One New Game'
  ]
  const expected = fakeGame

  const action = {
    type: 'RECEIVE_GAME',
    game: fakeGame
  }

  const actual = gamesReducer(undefined, action)

  expect(actual.length).toEqual(3)
  expect(actual).toEqual(expected)
})

test('RECEIVE_PLAYERS', () => {
  const fakePlayers = [
    'Harrison',
    'Ross'
  ]
  const expected = [fakePlayers]

  const action = {
    type: 'RECEIVE_PLAYERS',
    players: fakePlayers
  }

  const actual = usersReducer(undefined, action)

  expect(actual.length).toEqual(4)
  expect(actual).toEqual(expected)
})
