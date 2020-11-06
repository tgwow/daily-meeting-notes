const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // logger
const bodyParser = require('body-parser');
const debug = require('debug')('app');
const mongoose = require('mongoose');
const api = require('./api');

const app = express();

const { port } = require('./config/port');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/api', api);
app.use(express.static('static'));

app.use(morgan('dev'));

app.use((req, res) => {
	const err = new Error('Not Found');
	err.stack = 'Not Found';
	err.status = 404;
	res.json(err);
});

// Add MongoDB connection in later... first just run app.listen (below)

// Localhost:
// mongodb://localhost:27017/virtualstandups
mongoose.connect('mongodb+srv://thevelopertg:jxnvsprophet@mycoorp-gbki1.mongodb.net/virtualstandups?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (err) => {
	debug('connection error: ', err);
});
db.once('open', () => {
	debug('Connected to MongoDB');
});
app.listen(port, () => {
	debug(`API Server Listening on http://localhost:${port}`);
});
