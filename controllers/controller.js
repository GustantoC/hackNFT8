class Controller {
  static showHomePage(req, res) {
    res.render('homepage', { session: req.session })
  }
}
module.exports = Controller;