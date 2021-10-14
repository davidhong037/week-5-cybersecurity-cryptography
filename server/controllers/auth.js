const bcrypt = require('bcryptjs')
const { Console } = require('console')

const users = []

module.exports = {
    login: (req, res) => {
      // console.log('Logging In User')
      // console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const existing = bcrypt.compareSync(password, users[i].pinHash)
          if(existing){
            let returnToUser = {...users[i]}
            delete returnToUser.pinHash
            res.status(200).send(returnToUser)
            // console.log(returnToUser)
            return
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        // console.log('Registering User')
        // console.log(req.body)
        const {username, email, firstName, lastName, password} = req.body
        let salt = bcrypt.genSaltSync(5)
        let pinHash = bcrypt.hashSync (password, salt)

        const newUser = {
          username,
          email,
          firstName,
          lastName,
          pinHash
        }
        
        users.push(newUser)
        let returnToUser = {...newUser}
        delete returnToUser.pinHash
        res.status(200).send(returnToUser)
        
    }
}