const db = require("../../models");
const config = require("../../config/auth.config");
const jwtHelper = require("../lib/jwtHelper");
const Role = db.role;
const User = db.User;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.update = async(req,res) => {
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;

  if (!userId){
    res.send({success: false})
  }

  const user = await db.User.findOne({where:{id: userId}})
  
  try{
    user.username = req.body.username
    await user.save()
    res.send({success: true, user: user})
  }catch(e){
    console.log(e);
    res.send({success: false})
  } 

}

exports.list =
 async (req,res) => {
  const users = await User.findAll();

  res.send({success: true, users: users})
}

exports.signup = async (req, res) => {
  console.log("executed")
  console.log(req.body)
  const usernameCheck = await User.findAll({where: {username: req.body.username}})
  const emailCheck = await User.findOne({where: {email: req.body.email}})
  console.log(usernameCheck);

  if (usernameCheck.length){
    res.send({success:false, message: "Same Username"});
    return; 
  }
  if (emailCheck){
    res.send({success:false, message: "Same Email"});
    return;
  }
  //유저 생성

  await User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
  .then(user => {
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours //ha!
    });
    console.log("CREATED")
    res.send({ 
      message: "User was registered successfully!", 
      user: user,
      accessToken: token, 
      success: true
    });
  })
  .catch(err => {
    console.log("FAILED")
    res.status(500).send({ success: false, message: err.message });
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

exports.userinfo = async(req,res) => {
  //High Security Infos.
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;

  if (!userId){
    res.send({success:false, message:"Not allowed to access"});
    return
  }
  const user = db.User.findOne({where: {id: userId}});
  
  if(!user){
    res.send({success:false, message:"User Not Found"});
    return
  }
  const userInfo = {
    username: user.username,
    email: user.email,
    imgUrl: user.imgUrl,
  }
  res.send({success:true, userInfo: userInfo})
}