function isAdmin(req, res, next) {
  if(req.session.userId && req.session.role == 'admin'){
    next();
  } else {
    const err = "You don't have the permission to access that area"
    res.redirect(`/login?err=${err}`)
  }
}

module.exports = isAdmin