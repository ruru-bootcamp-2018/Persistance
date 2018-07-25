import {receiveGames, addGame} from '../../client/actions/games'

test('Receive games action receives a game', () => {
  const fakeGames = [
    'thisone',
    'alsothisone'
  ]

  const expected = {
    type: 'RECEIVE_GAMES',
    games: fakeGames
  }

  const actual = receiveGames(fakeGames)

  expect(actual.games.length).toBe(2)
  expect(actual).toEqual(expected)
})

test('Add games action creator adds a game', () => {
  const newFakeGame = [
    'John'
  ]

  const expected = {
    type: 'ADD_GAME',
    game: newFakeGame
  }

  const actual = addGame(newFakeGame)

  expect(actual.game.length).toBe(1)
  expect(actual).toEqual(expected)
})
