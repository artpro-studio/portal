const { Router } = require('express')
const { sendCounter } = require('../../controllers/nodeMailer/index')


const router = Router()

router.post('/sendCounter', sendCounter) // Отправка показаний счетчиков

module.exports = router
