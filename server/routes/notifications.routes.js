const { Router } = require('express')
const { push } = require('../controllers/notifications.controller')
const router = Router()

router.post('/push', push) // data: {title:'', text:'', error: ''}

module.exports = router