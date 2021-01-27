const db = require('../../data/db-config');

const getAll = () => {
    return db('users');
}

const getById = id => {
    return db('users')
        .where({ userId: id })
        .first();
}

const getByUsername = username => {
    return db('users')
        .where({ username })
        .first();
}

const insert = newUser => {
    return db('users')
        .insert(newUser);
}

module.exports = {
    getAll,
    getById,
    getByUsername,
    insert
}