const app = require('./app');
const database = require('./database')
const config = require('./config');

database().then(info => {
  console.log(`Connected to ${info.host}:${info.port}/${info.name}`);

  app.listen(config.PORT, () => {
  console.log(`Example app listening at http://localhost:${config.PORT}`)
  })
}).catch((e) => {
  console.error('Unable to connect to database', e);
  process.exit(1) // выход из node
})

