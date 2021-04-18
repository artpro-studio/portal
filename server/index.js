const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const { app, server } = require('./app')
const sequelize = require('./utils/database')



let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync()
    console.log('Connection has been established successfully.');

    const nuxt = new Nuxt(config)

    const { host, port } = nuxt.options.server

    if (config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    } else {
      await nuxt.ready()
    }

    app.use(nuxt.render)

    server.listen(port, host, () => {
      consola.ready({
        message: `Server start express listening on http://${host}:${port}`,
        badge: true
      })
    })

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


start()
