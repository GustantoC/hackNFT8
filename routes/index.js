const router = require('express').Router()
const Controller = require('../controllers/controller')
const UserController = require('../controllers/UserController')

const session = require('express-session')
const isLoggedIn = require('../middlewares/isLoggedIn')
const isNotLoggedIn = require('../middlewares/isNotLoggedIn')

router.use(session({
  secret: 'hackNFT8Secret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true
  }
}))

router.use(function(req, res, next) {
  res.locals.userData = {
      userId: req.session.userId,
      username: req.session.username,
      role: req.session.role
  }
  next();
});

router.get('/', Controller.showHomePage)

router.get('/register',UserController.registerForm)
router.post('/register',UserController.registerPost)
router.get('/login',UserController.loginForm)
router.post('/login',UserController.loginPost)
router.get('/logout',UserController.getLogout)

module.exports = router