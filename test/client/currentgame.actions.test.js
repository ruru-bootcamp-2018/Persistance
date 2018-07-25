import {updateCurrentGame, updateCurrentRound, updateCurrentMission, updateMissionParams} from '../../client/actions/currentGame'

test('Update current game returns current game', () => {
  const fakeGame = [
    'thisone'
  ]

  const expected = {
    type: 'UPDATE_GAME',
    currentGame: fakeGame
  }

  const actual = updateCurrentGame(fakeGame)

  expect(actual.currentGame.length).toBe(1)
  expect(actual).toEqual(expected)
})

test('updateCurrentRound returns current round', () => {
  const newFakeRound = [
    'Seven'
  ]

  const expected = {
    type: 'UPDATE_ROUND',
    currentRound: newFakeRound
  }

  const actual = updateCurrentRound(newFakeRound)

  expect(actual.currentRound.length).toBe(1)
  expect(actual).toEqual(expected)
})

test('updateCurrentMission returns current mission', () => {
  const newFakeMission = [
    'Round awesome'
  ]
  const expected = {
    type: 'UPDATE_MISSION',
    currentMission: newFakeMission
  }
  const actual = updateCurrentMission(newFakeMission)

  expect(actual.currentMission.length).toBe(1)
  expect(actual).toEqual(expected)
})

test('updateMissionParams returns current params', () => {
  const newFakeParams = [
    {team: 1, user_id: 5},
    {team: 2, user_id: 7}
  ]
  const expected = {
    type: 'GET_PARAMS',
    missionParams: newFakeParams
  }
  const actual = updateMissionParams(newFakeParams)

  expect(actual.missionParams.length).toBe(2)
  expect(actual).toEqual(expected)
})
