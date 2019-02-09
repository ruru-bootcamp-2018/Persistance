import {
  UPDATE_GAME,
  UPDATE_ROUND,
  UPDATE_MISSION,
  GET_PARAMS
} from '../../../client/actions/currentGame'

test('UPDATE_GAME', () => {
  const
    expected = 'UPDATE_GAME',
    actual = UPDATE_GAME

  expect(actual).toBe(expected)
})

test('UPDATE_ROUND', () => {
  const
    expected = 'UPDATE_ROUND',
    actual = UPDATE_ROUND

  expect(actual).toBe(expected)
})

test('UPDATE_MISSION', () => {
  const
    expected = 'UPDATE_MISSION',
    actual = UPDATE_MISSION

  expect(actual).toBe(expected)
})

test('GET_PARAMS', () => {
  const
    expected = 'GET_PARAMS',
    actual = GET_PARAMS

  expect(actual).toBe(expected)
})
