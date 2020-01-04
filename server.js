const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
var _ = require('lodash')

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// connection url
const url = 'mongodb://localhost:27017';
// database Name
const dbName = 'smartbrainDB';
// use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  client.close();
});

const database = {
  users: [{
    id: '1',
    name: 'Chris',
    email: 'ez@grr.la',
    entries: 0,
    joined: new Date(),
    password: 'cookies'
  }]
}

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('You have found the server congrats..'))

app.post('/signin', (req, res) => {
  var request = req.body;
  _.forEach(database.users, (user) => {
    if (request.email === user.email && request.password === user.password) {
      res.json(user)
    }
  })
})

app.put('/image', (req, res) => {
  database.users.forEach(user => {
    if (user.id === req.body.id) {
      user.entries++
      res.json(user)
    }
  });
  res.json('nope')
})


app.post('/register', (req, res) => {
  database.users.push({
    id: (database.users.length+1).toString(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length - 1])
})

app.get('/profile/:userId', (req, res) => {
  database.users.forEach(user => {
    if (user.id === req.params.userId) {
      return res.json(user);
    }
  })
  // res.json('no user')

})

app.listen(3000, () => console.log('Server is listening on http://localhost:3000'))