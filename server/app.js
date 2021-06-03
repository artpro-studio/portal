const app = require('express')()
const bodyParser = require('body-parser')
const session = require('express-session')
const csrf = require('csurf')
const handlersMiddleware = require('./middleware/ErrorHandlerMiddleware')

const authRouter =  require('./routes/auth.routes')
const roleRouter =  require('./routes/user/role.router')
const nodeMailerRouter =  require('./routes/nodeMailer/index')
const organizationsRouter =  require('./routes/user/organization.router')
const integrationRouter =  require('./routes/integration/integration.router')
const addressRouter =  require('./routes/address/address.router')
const epdRouter =  require('./routes/epd/epd.router')

const server = require('http').createServer(app)


app.use(bodyParser.urlencoded({ extends: true }))
app.use(bodyParser.json())
app.use(session({
  secret: 'portal jkh',
  resave: false,
  saveUninitialized: false,
}))
//app.use(csrf())

app.use('/api/v1', authRouter)
app.use('/api/v1', roleRouter)
app.use('/api/v1', organizationsRouter)
app.use('/api/v1', nodeMailerRouter)
app.use('/api/v1', integrationRouter)
app.use('/api/v1/address', addressRouter)
app.use('/api/v1/', epdRouter)

//Обработка ошибок
app.use(handlersMiddleware)

module.exports = {
  app,
  server
}
