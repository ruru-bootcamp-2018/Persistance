import {getGames} from '../../../client/api/games'


jest.mock(
  '../../../client/utils/api',
  () => (method, endpoint, data) => Promise.reject({
    body: {method, endpoint, data}
  })
)

jest.mock(
  '../../../client/actions/games',
  () => ({})
)


describe('getGames', () => {
  it('should error', () => {
    const dispatch = jest.fn()

    return getGames()(dispatch)
    .then(() => {
      expect(true).toBeFalsey()
    })
    .catch(() => expect(true).toBeTruthy())
  })
})
