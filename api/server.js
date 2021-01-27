const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const usersRouter = require('./users/router');
const authRouter = require('./auth/auth-router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/users', usersRouter);
server.use('/api/', authRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' });
});

module.exports = server;