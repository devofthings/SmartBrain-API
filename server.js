const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('this works')
})

app.listen(3001, () => {
    console.log('app is running on port 3001');
})

/*
/ --> res = this is working
/ signin --> POST = success/fail
/ register --> POST = user
/ profile/:userID --> GET = user
/ image --> PUT --> user
*/