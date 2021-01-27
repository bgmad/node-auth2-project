const express = require('express');
const User = require('./model');
const protected = require('../auth/auth-middleware');
const router = express.Router();

// curl http://localhost:5000/api/users
router.get('/', protected, async (req, res) => {
    try {
        const users = await User.getAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'could not get users' });
    }
})

module.exports = router;