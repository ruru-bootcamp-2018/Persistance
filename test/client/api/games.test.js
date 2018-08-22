import {getGames} from '../../../client/api/games'


jest.mock(
  '../../../client/utils/api',
  () => (method, endpoint, data) => Promise.resolve({
    body: {method, endpoint, data}
  })
)

jest.mock(
  '../../../client/actions/games',
  () => ({
    receiveGames: (game) => (game)
  })
)

describe('getGames', () => {
  it('should dispatch an action', () => {
    const
    method = 'get',
    endpoint = 'temporary/games',
    dispatch = jest.fn()

    const expected = {
      method,
      endpoint,
      data: undefined
    }

    return getGames()(dispatch)
    .then(() => {
      const actual = dispatch.mock.calls
      expect(actual).toHaveLength(1)
      expect(actual[0][0]).toEqual(expected)
    })
  })
})
