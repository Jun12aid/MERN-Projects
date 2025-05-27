const express = require('express');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedin');
const {registerUser, loginUser} = require('../controllers/authcontroller');


router.get('/', (req, res) => {
    res.send('Hello, World!');
});

router.post('/register',registerUser);
router.post('/login',loginUser);
// router.get('/logout', logout)

module.exports = router;