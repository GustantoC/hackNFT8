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

router.get('/', Controller.landingPage)
router.get('/nft', Controller.showHomePage)


router.get('/register',UserController.registerForm)
router.post('/register',UserController.registerPost)
router.get('/login',UserController.loginForm)
router.post('/login',UserController.loginPost)
router.get('/logout',UserController.getLogout)

router.get('/nft/add', Controller.addNft)
router.post('/nft/add', Controller.postAddNft)


router.get('/nft/:id',Controller.showNFTDetail)
router.post('/nft/:id/edit',Controller.changeNFT)
router.get('/nft/:id/buy', Controller.buyNFT)
router.get('/nft/:id/delete', Controller.deleteNft)


module.exports = router