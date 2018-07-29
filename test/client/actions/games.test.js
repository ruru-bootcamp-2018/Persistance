import {
  RECEIVE_GAMES,
  receiveGames,

  ADD_GAME,
  addGame,

  JOIN_GAME,
  joinGame,

  LEAVE_GAME,
  leaveGame
} from '../../../client/actions/games'

test('Receive games action receives a game', () => {
  const fakeGames = [
    'thisone'
  ]

  const expected = {
    type: RECEIVE_GAMES,
    games: fakeGames
  }

  const actual = receiveGames(fakeGames)

  expect(actual.games.length).toBe(1)
  expect(actual).toEqual(expected)
})

test('addGame action receives a game', () => {
  const fakeGame = 'thisone'

  const expected = {
    type: ADD_GAME,
    game: fakeGame
  }

  const actual = addGame(fakeGame)

  expect(actual.game).toBe(fakeGame)
  expect(actual).toEqual(expected)
})

test('Join game action receives a game', () => {
  const fakeGame = {}

  const expected = {
    type: JOIN_GAME,
    game: fakeGame
  }

  const actual = joinGame(fakeGame)

  expect(actual.game).toBe(fakeGame)
  expect(actual).toEqual(expected)
})

test('Leave game action receives a game', () => {
  const fakeGame = {}

  const expected = {
    type: LEAVE_GAME,
    game: fakeGame
  }

  const actual = leaveGame(fakeGame)

  expect(actual.game).toBe(fakeGame)
  expect(actual).toEqual(expected)
})
