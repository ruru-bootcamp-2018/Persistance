export const RECEIVE_GAMES = 'RECEIVE_GAMES';
export const ADD_GAME = 'ADD_GAME';
export const JOIN_GAME = 'JOIN_GAME';
export const LEAVE_GAME = 'LEAVE_GAME';

export const receiveGames = games => ({
    type: RECEIVE_GAMES,
    games,
});

export const addGame = game => ({
    type: ADD_GAME,
    game,
});

export const joinGame = game => ({
    type: JOIN_GAME,
    game,
});

export const leaveGame = game => ({
    type: LEAVE_GAME,
    game,
});
