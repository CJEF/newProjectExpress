const dotenv = require('dotenv');
const path = require('path');

const root = path.join.bind(this, __dirname);
dotenv.config({ path:root('.env') });

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL, // скачать mongo db на пк и в командой строке с помощью команды use <namebd> создаем бд, далее заходим в компасс mongo и вводим данную строку в запросившийся юрл
    IS_PRODUCTION: process.env.NODE_ENV === 'production'
}