const request = require('supertest')
const jest = require('jest')

jest.mock('../../server/db/game', () => ({
  getGame: () => Promise.resolve([
    {id: 1, game_name: 'Game'},
  ]),
  createGame: () => Promise.resolve({
       id: 1,
       game_name: 'gamessss',
       is_finished: false,
       in_progress: false,
       time_stamp: 1075657657
    }),
  roleEntry: () => Promise.resolve({
        id: 2,
        user_id: 4
    }),
}))

const server = require('../../server/server')

test('create a game', () => {
  return request(server)
    .post('/api/game/new')
    .send({fakeGame: {game_name: 'game2'}})
    .expect(200)
    .then(res => {
      expect(res.body).toBeTruthy()
      expect(res.body.length).toBe(1)
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})

test('add a player to a game', () => {
  const mockRole = {
    user_id: 4,
    game_id: 1
  }
  return request(server)
    .post('/api/game/join')
    .send(mockRole)
    .expect(200)
    .then(res => {
      expect(res.body).toBeTruthy()
      expect(res.body.length).toBe(1)
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})
