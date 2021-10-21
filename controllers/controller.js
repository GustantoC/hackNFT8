const {NFT, User} = require("../models/index");
const {Op} = require('sequelize')

class Controller {
  static landingPage(req,res){
    res.render('landingPage')
  }
  static showHomePage(req, res) {
    const search = req.query.search;
    const sort = req.query.sort;
    console.log(req.query);
    let opt = {
        include: User,
        order: [["createdAt", "DESC"]],
        where: {}
    }

    if(search) {
        opt.where.name = { [Op.iLike]: `%${search}%` };
    }

    if(sort === "name") {
        opt.order = [["name", "ASC"]]
    } else if(sort === "mostRecent") {
        opt.order = [["createdAt", "DESC"]]
    }

    NFT.findAll(opt)
    .then((data)=>{
      res.render('homepage', { data, session: req.session })
    })
    .catch((err)=>{
      res.send(err)
    })
  }

  static addNft(req, res) {
    res.render('formAddNft')
  }
  static postAddNft(req, res) {
    console.log(req.body);
    let UserId = req.session.userId
    let {name,price,imageUrl,description} = req.body
    let input = {name,price,imageUrl,description,UserId}
    NFT.create(input)
    .then((data)=>{
      res.redirect('/nft')
    })
    .catch((err)=>{
      res.send(err)
    })
    }
}
module.exports = Controller;