const db = require("../../models");
const config = require("../../config/auth.config");
const Role = db.role;
const User = db.User;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.list = async (req,res) => {
  const users = await User.findAll();

  res.send({success: true, users: users})

}
exports.signup = (req, res) => {
  console.log('-12093109283091280939180283');
  console.log(req.body);
  
  console.log(bcrypt.hashSync(req.body.password, 8));
  
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
  .then(user => {
  
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours //ha!
    });

    res.send({ 
      message: "User was registered successfully!", 
      user: user,
      accessToken: token, 
      success: true
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      
      res.status(200).send({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          accessToken: token
        }
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}