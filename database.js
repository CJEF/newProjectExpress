const config = require('./config')
const mongoose = require('mongoose');

module.exports = () => {
    return new Promise((resolve, reject) => {
        mongoose.Promise = global.Promise;
        mongoose.set('debug', true) // при кажом запросе будет выдавать логи, в продакшне фолз

        mongoose.connection
            .on('error', error => reject(error))
            .on('close', () => console.log('database connection closed'))
            .on('open', () => resolve(mongoose.connections[0]))
        
        mongoose.connect(config.MONGO_URL,  { useNewUrlParser: true, useUnifiedTopology: true, })
    })
}