const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path');
const staticAsset = require('static-asset');
// const port = 3000


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(staticAsset(path.join(__dirname, 'public')))
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));

app.get('/', (req, res) => {
    res.render('index')
})

module.exports = app