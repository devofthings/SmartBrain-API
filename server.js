const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const PORT = process.env.PORT || 3000
const DATABASE_URL = process.env.DATABASE_URL

const db = knex({
  client: 'pg',
  connection: {
    connectionString : DATABASE_URL,
    ssl: true
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('you have found the server congrats..'))
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt))
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))
app.put('/image', (req, res) => image.handleImage(req, res, db))
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})
app.get('/profile/:userID', (req, res) => profile.handleProfileGet(req, res, db))

app.listen(PORT, () => console.log(`server is listening on ${PORT}`))