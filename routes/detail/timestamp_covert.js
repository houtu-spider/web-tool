const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
    res.render('detail/timestamp_covert')
})

module.exports = router;