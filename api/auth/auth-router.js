const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../users/model');

const router = express.Router();

// curl -d '{"username": "tester1", "password": "1234", "department": "sales"}' -H 'Content-Type: Application/json' -X POST http://localhost:5000/api/register
router.post('/register', async (req, res, next) => {
    const { username, password, department } = req.body;
    const hashed = bcrypt.hashSync(password, 10);
    try {
        const [ userId ] = await User.insert({ username, password: hashed, department });
        const user = await User.getById(userId);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Could not register user' });
    }
});

// curl -d '{"username": "tester1", "password": "1234", "department": "sales"}' -H 'Content-Type: Application/json' -X POST http://localhost:5000/api/register
router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.getByUsername(username);
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.json({ message: 'Welcome back!', token: token });
        } else {
            res.status(500).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not login' });
    }
});

const generateToken = user => {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, 'shh', options);
}

module.exports = router;