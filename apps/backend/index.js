require('dotenv').config();
const connectToDb = require('./models');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./redis');
const {join} = require('path');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
require('./routes')(app);
app.use('/', express.static(join(__dirname,'..', 'frontend', 'dist')));
app.use('*', express.static(join(__dirname,'..', 'frontend', 'dist', 'index.html')));




const server = require('http').createServer(app);
require('./socket')(server);

connectToDb().then(() => {
    server.listen(process.env.PORT || 4000, () => console.log('app is running'));
});





