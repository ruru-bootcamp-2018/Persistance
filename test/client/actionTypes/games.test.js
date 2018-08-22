import {
  RECEIVE_GAMES,
  ADD_GAME,
  JOIN_GAME,
  LEAVE_GAME
} from '../../../client/actions/games'

test('RECEIVE_GAMES action type', () => {
  const expected = 'RECEIVE_GAMES'

  const actual = RECEIVE_GAMES

  expect(actual).toBe(expected)
})

test('JOIN_GAME action type', () => {
  const expected = 'JOIN_GAME'

  const actual = JOIN_GAME

  expect(actual).toBe(expected)
})

test('ADD_GAME action type', () => {
  const expected = 'ADD_GAME'

  const actual = ADD_GAME

  expect(actual).toBe(expected)
})

test('LEAVE_GAME action type', () => {
  const expected = 'LEAVE_GAME'

  const actual = LEAVE_GAME

  expect(actual).toBe(expected)
})
