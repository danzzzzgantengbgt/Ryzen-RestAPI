const express = require('express');
const cors = require('cors');
const secure = require('ssl-express-www');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const app = express();

const mainrouter = require('./routes/mainrouter.js');
const apirouter = require('./routes/api.js');

app.enable('trust proxy');
app.set('json spaces', 2);
app.use(cors());
app.use(secure);
app.use(express.static('public'));
app.set('views', __dirname + '/view');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routers
app.use('/', mainrouter);
app.use('/api', apirouter);

// ❌ Jangan pakai app.listen(PORT)
// ✅ Export untuk serverless
module.exports = app;
module.exports.handler = serverless(app);
