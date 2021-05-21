const { Router } = require('express')
const { sendCounter, callBack } = require('../../controllers/nodeMailer/index')


const router = Router()

router.post('/sendCounter', sendCounter) // Отправка показаний счетчиков
router.post('/callback', callBack) // Отправка показаний счетчиков

module.exports = router
