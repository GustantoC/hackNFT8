function isNotLoggedIn(req, res, next) {
  if(req.session.userId){
    res.redirect('/')
  } else {
    next();
  }
}

module.exports = isNotLoggedIn