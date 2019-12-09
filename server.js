const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cors = require('cors')

const database = {
  users: [{
    id: '123',
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
  var a = req.body;
  if (a.email === database.users[0].email && a.password === database.users[0].password) {
    res.json(database.users[0])
  } else {
    res.json('access denied');
  }
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
    id: '124',
    name: req.body.name,
    email: req.body.email,
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