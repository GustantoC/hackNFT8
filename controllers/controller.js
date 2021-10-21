const { NFT, User } = require('../models')

class Controller {
  static showHomePage(req, res) {
    NFT.findAll()
      .then(dataNFT => {
        res.render('homepage', { dataNFT })
      })
      .catch(err => {
        res.send(err.message)
      })
  }
  static showNFTDetail(req, res) {
    let nftId = Number(req.params.id)
    const opt = {
      where: {
        id: nftId
      },
      include: [{
        model: User
      }]
    }
    NFT.findOne(opt)
      .then(dataNFT => {
        res.render('nftDetails', { dataNFT })
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  static changeNFTAvailability(req, res) {
    console.log(req.session);
    console.log(req.body);
    let nftId = req.params.id
    let check = req.body.avaicheck
    let availabilityForm = false
    if (check) {
      availabilityForm = true
    }
    console.log(availabilityForm);
    NFT.update({
      availability: availabilityForm
    }, {
      where: {
        id: nftId
      }
    })
      .then(data => {
        res.redirect(`/nft/${nftId}`)
      })
      .catch(err => {
        return res.send(err)
      })
  }
}
module.exports = Controller;