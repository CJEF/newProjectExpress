const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String
    }
}, {
    timestamps: true
})

schema.set('toJSON', {
    virtuals: true
}) // в аpp.js можно указывать айди без ничжнего подчеркивания как было по дефолту

module.exports = mongoose.model('Post', schema)