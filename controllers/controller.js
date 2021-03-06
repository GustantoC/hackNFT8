const { NFT, User, PriceHistory } = require('../models')
const { Op } = require('sequelize')
const formatPrice = require('../helpers/formatPrice')

class Controller {
  static landingPage(req, res) {
    res.render('landingPage')
  }

  static showHomePage(req, res) {
    const search = req.query.search;
    const sort = req.query.sort;
    let notif = req.query.notif;
    console.log(req.query);
    let opt = {
      include: User,
      order: [["createdAt", "DESC"]],
      where: {}
    }

    if (search) {
      opt.where.name = { [Op.iLike]: `%${search}%` };
    }

    if (sort === "name") {
      opt.order = [["name", "ASC"]]
    } else if (sort === "mostRecent") {
      opt.order = [["createdAt", "DESC"]]
    }
    if(!notif){
      notif = false
    }

    NFT.findAll(opt)
      .then((data) => {
        res.render('homepage', { data, session: req.session, notif })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static addNft(req, res) {
    res.render('formAddNft')
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
    let notif = ''
    if(req.query){
      notif = req.query.notif
    }
    let dataNFT = {}
    const opt = {
      where: {
        id: nftId
      },
      include: [{
        model: User
      }]
    }
    NFT.findOne(opt)
      .then(data => {
        dataNFT = data
        return PriceHistory.findAll({
          include: { all: true },
          where: {
            NFTId: dataNFT.id
          }
        })
      })
      .then(data => {
        dataNFT.PriceHistory = data
        return res.render('nftDetails', { dataNFT, formatPrice ,notif })
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  static changeNFT(req, res) {
    console.log(req.session);
    console.log(req.body);
    let nftId = req.params.id
    let check = req.body.avaicheck
    let availabilityForm = false
    if (check) {
      availabilityForm = true
    }
    let priceForm = req.body.price
    console.log(availabilityForm);
    NFT.update({
      availability: availabilityForm,
      price: priceForm
    }, {
      where: {
        id: nftId
      }
    })
      .then(data => {
        const msg = "Success! data has been saved"
        res.redirect(`/nft/${nftId}?notif=${msg}`)
      })
      .catch(err => {
        return res.send(err)
      })
  }
  static postAddNft(req, res) {
    console.log(req.body);
    let UserId = req.session.userId
    let { name, price, imageUrl, description } = req.body
    let input = { name, price, imageUrl, description, UserId }
    NFT.create(input)
      .then((data) => {
        const msg = "Successfully added NFT"
        res.redirect(`/nft?notif=${msg}`)
      })
      .catch((err) => {
        res.send(err)
      })
  }


  static buyNFT(req, res) {
    let buyerId = req.session.userId
    let nftId = Number(req.params.id)
    if (buyerId) {
      NFT.update({
        UserId: buyerId,
        availability: false
      },
        {
          where: {
            id: nftId
          }
        })
        .then(changeId => {
          return NFT.findByPk(nftId)
        })
        .then(data => {
          let newPriceHistory = {
            NFTId: data.id,
            buyerId: buyerId,
            priceAt: data.price,
            time: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
          }
          console.log(newPriceHistory);
          return PriceHistory.create(newPriceHistory)
        })
        .then(data => {
          const msg = "Congratulations! you own this NFT now"
          res.redirect(`/nft/${nftId}?notif=${msg}`)
        })
        .catch(err => {
          res.send(err)
        })
    } else {
      const err = "Please log in first"
      res.redirect(`/login?err=${err}`)
    }
  }

  static editUser(req, res) {
    const username = req.params.username;
    let notif = ''
    if(req.query){
      notif = req.query.notif
    }
    let dataNft = {}
    NFT.findAll({
      where: {
        UserId: req.session.userId
      }
    })
      .then((nft) => {
         dataNft = nft
        return User.findOne({
          where: {
            username
          }
        })
      })
      .then(data => {
        res.render("profile", { dataNft, data,formatPrice,notif });
      })
      .catch(err => {
        console.log(err);
        console.log('eror');
        res.send(err);
      })
  }

  static postEditUser(req, res) {
    const { username, email } = req.body;
    console.log(req.body);
    const input = {
      username,
      email
    }
    console.log("profile", input);

    NFT.findAll({
      where: {
        UserId: req.session.userId
      }
    })
      .then((nft) => {
        return User.update(
          input, {
          where: {
            id: req.session.userId
          }
        }
        )
      })
      .then((user) => {
        let msg = "Your data has been saved successfully"
        req.session.username = username
        res.redirect(`/nft/detail/${username}?notif=${msg}`);
      })
      .catch(err => {
        res.send(err);
      })
  }

  static deleteNft(req, res) {
    let id = req.params.id
    PriceHistory.destroy({
      where: {
        NFTId: id
      }
    })
      .then((data) => {
        return NFT.destroy({
          where: {
            id: +id
          }
        })
      })
      .then((data) => {
        let msg = "Successfully deleted NFT"
        res.redirect(`/nft?notif=${msg}`)
      })
      .catch((err) => {
        res.send(err)
      })
  }
}
module.exports = Controller;