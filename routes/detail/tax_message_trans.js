const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
    res.render('detail/tax_message_trans')
})

module.exports = router;