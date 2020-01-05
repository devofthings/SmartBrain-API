const handleProfileGet = (req, res, db) => {
    const { userID } = req.params
    db.select('*').from('users').where('id', userID)
      .then(user => {
        if(user.length > 0) {
          res.json(user[0])
        } else {
          res.status(400).json('user not found')
        }
      })
      .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    handleProfileGet
}