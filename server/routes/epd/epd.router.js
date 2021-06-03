const { Router } = require('express')
const { parseIncomingRegistry } = require('../../controllers/epd/incomingRegister')
const router = Router()

router.post('/epd/parse-incoming-register/', parseIncomingRegistry) // загрузка входящего реестра


module.exports = router
