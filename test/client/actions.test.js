import {receiveGames, getPlayersForGame, getPlayers} from '../../client/actions/games'

test('Receive games action receives a game', () => {
  const fakeGame = [
    'thisone'
  ]

  const expected = {
    type: 'RECEIVE_GAME',
    game: fakeGame
  }

  const actual = receiveGames(fakeGame)

  expect(actual.game.length).toBe(1)
  expect(actual).toEqual(expected)
})

test('getPlayersForGame receives players', () => {
  const fakePlayers = [
    'Sam',
    'Harrison',
  ]

  const expected = {
    type: 'RECEIVE_PLAYERS',
    players: fakePlayers
  }

  const actual = getPlayersForGame(fakePlayers)

  expect(actual.players.length).toBe(2)
  expect(actual).toEqual(expected)
})
