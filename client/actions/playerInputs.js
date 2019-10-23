import request from '../utils/api';

export function sendNomination(data) {
    return request('post', 'game/nominate', data);
}

export function removeNomination(data) {
    return request('post', 'game/remove', data);
}

export function confirmNominations(data) {
    return request('post', 'game/confirmNoms', data);
}

export function sendVote(data) {
    return request('post', 'game/vote', data);
}

export function joinGame(data) {
    return request('post', 'game/join', data);
}

export function sendIntention(data) {
    return request('post', 'game/intention', data);
}

export function startGame(game) {
    return request('post', 'game/start', { game });
}
