var express = require('express');
var router = express.Router();

const usersRouter = require('./users')
const questionRouter = require('./questions')
const resultRouter = require('./results')

router.use('/user' , usersRouter)
router.use('/question' , questionRouter)
router.use('/result' , resultRouter)

module.exports = router;
