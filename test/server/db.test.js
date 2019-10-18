const gameDb = require('../../server/db/game');
const userDb = require('../../server/db/users');
const request = require('supertest');

const env = require('./test-environment');

// Manage the test database

let testDb = null;
beforeEach(() => {
    testDb = env.getTestDb();
    return env.initialise(testDb);
});
afterEach(() => env.cleanup(testDb));

// Tests

test('Db can add a new game', () => {
    const fakeGameName = 'Some game';
    return gameDb.createGame(fakeGameName, testDb).then(game => {
        expect(game.length).toBe(1);
    });
});

test('get game returns a game object', () => {
    const id = 1;
    gameDb
        .getGame(id, testDb)

        .then(game => {
            expect(game.id).toBe(id);
            expect(game.length).toBe(1);
            expect(game[0].hasOwnProperty('game_name')).toBeTruthy();
        });
});

test('can get all the roles of a single game', () => {
    let id = 1;
    return gameDb.getRoles(id, testDb).then(roles => {
        expect(roles.length).toBe(5);
        expect(roles[0].hasOwnProperty('role')).toBeTruthy();
    });
});

test('can add a role to the role db', () => {
    let game_id = 1;
    let user_id = 2;
    return gameDb.roleEntry(game_id, user_id, testDb).then(roles => {
        expect(roles.length).toBe(1);
    });
});

// test('can delete a role from the roles db', () => {
//   let game_id = 1
//   return gameDb.delRoles(game_id, testDb)
//     .then(role => {
//       expect(role.length).toBe(1)
//   })
// })
