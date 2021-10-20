const { User } = require('../models')
const checkPassword = require('../helpers/checkPassword')

class UserController {
  static loginForm(req, res) {
    const { err } = req.query
    res.render("auth-pages/login-form", { err })
  }
  static registerForm(req, res) {
    const { err } = req.query
    res.render("auth-pages/register-form", { err })
  }

  static registerPost(req, res) {
    const { username, email, password, role } = req.body
    User.create({ username, email, password, role })
      .then(newUser => {
        res.redirect('/login')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static loginPost(req, res) {
    const { username, password } = req.body
    User.findOne({ where: { username } })
      .then(user => {
        if (user) {
          if (checkPassword(password, user.password)) {
            req.session.userId = user.id
            req.session.role = user.role
            req.session.username = user.username
            return res.redirect('/')
          } else {
            const err = "invalid username/password"
            return res.redirect(`/login?err=${err}`)
          }
        } else {
          //kalau user gk ada
          const err = "invalid username/password"
          return res.redirect(`/login?err=${err}`)
        }
      })
      .catch(err => {
        err = "invalid username/password"
        return res.redirect(`/login?err=${err}`)
      })
  }

  static getLogout(req,res) {
    req.session.destroy((err) => {
      if(err) console.log(err);
      else{
        res.redirect('/')
      }
    })
  }
}
module.exports = UserController