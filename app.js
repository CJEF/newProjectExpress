const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const staticAsset = require('static-asset');
const mongoose = require('mongoose');
const config = require('./config')
// const port = 3000

// databases
mongoose.Promise = global.Promise;
        mongoose.set('debug', config.IS_PRODUCTION) // при кажом запросе будет выдавать логи, в продакшне фолз

        mongoose.connection
            .on('error', error => console.log(error))
            .on('close', () => console.log('database connection closed'))
            .once('open', () => {
                const info = mongoose.connections[0];
                console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
            })
        
mongoose.connect(config.MONGO_URL,  { useNewUrlParser: true, useUnifiedTopology: true, })

// express
const app = express()

// sets and uses
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(staticAsset(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));

// routers
app.get('/', (req, res) => {
    res.render('index')
})

app.use((req, res, next) => {
    const err = new Error('Not found')
    err.status = 404;
    next(err)
})

app.use(function(error, req, res, next) {
    res.status(error.status || 500)
    res.render('error', {
        message: error.message,
        error: !config.IS_PRODUCTION ? error : {},
        title: 'Oops...'
    });
});
  

app.listen(config.PORT, () => {
    console.log(`Example app listening at http://localhost:${config.PORT}`)
})
