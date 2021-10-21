function isLoggedIn(req, res, next) {
  if(req.session.userId){
    next();
  } else {
    const err = "You're not logged in"
    res.redirect(`/login?err=${err}`)
  }
}

module.exports = isLoggedIn