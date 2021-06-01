const db = require("../../models");
const jwtHelper = require("../lib/jwtHelper");

const Reply = db.reply
const User = db.user

exports.create = async(req, res) => {
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;

  if (!req.body.content){
    res.send({success:false, message: "No content"});
    return;
  }
  if(!req.body.commentId){
    res.send({success:false, message: "Which comment? "});
    return;
  }
  if (!userId === req.body.userId){
    res.send({success:false, message: "Not a same user"})
    return;
  }

  const newReply = await Reply.create({
    commentId: req.body.commentId,
    userId = req.body.userId,
    content = req.body.content,
    recommendation: 0,
  })

  if (!newReply){
    res.send({success: false, message: "Something went wrong"});
    return; 
  }

  const user = await User.findOne({where: {id: newReply.userId}});
  if(!user){
    res.send({success: false, message: "Writer not found"})
    return;
  }
  const modifiedReply = {
    username: user.username,
    userImg: user.imgUrl,
    content: newReply.content,
    recommendation: newReply.recommendation,
  }

  res.send({success: true, reply: modifiedReply});

}
exports.get = (req, res) => {
  //params
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;

  const replyId = parseInt(req.params.replyId)
  const reply = await Reply.findOne({where: {id:replyId}});

  if (!reply){
    res.send({success:false, message:"No reply"})
    return;
  }

  const user = await User.findOne({where: {id: reply.userId}}); 

  const modifiedReply = {
    content: reply.content,
    recommendation: reply.recommendation,
    username: user.username,
    userImg: user.imgUrl,
  }
  res.send({success:true, message: "success", reply: modifiedReply})

}

exports.getListWithCommendId = async(req, res) => {
  //req 로 commentId를 가져온다.
  if(!req.body.commentId){
    res.send({success: false, message: "No commentId"});
    return
  }
  const replies = await Reply.findAll({where: {commentId: req.body.commentId}});
  
  const Users = await User.findAll({where: {id: replies.map(reply => {reply.userId})}});

  replies.map(reply => {
    let user = Users.find(user => user.id === reply.userId)
    commentReplies = {
      username: user.username,
      userImg:user.imgUrl, 
      content:reply.content, 
      recommendation:reply.recommendation,
    }
    return commentReplies;
  })
  res.send({success:true, message:"success", commentReplies: commentReplies});
}

exports.update = async(req, res) => {
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;

  const reply = await Reply.findOne({where: {id: req.body.replyId}})
  if (!reply.userId === userId){
    res.send({success:false, message: "not writer's request"})
    return;
  }
  if(!reply){
    res.send({success: false, message: "no reply"});
    return;
  }
  reply.content = req.body.content;
  await reply.save();

  const user = await User.findOne({where: {id: userId}});

  const modifiedReply = {
    username: user.username,
    userImg: user.imgUrl,
    content: reply.content,
    recommendation: reply.recommendation,
  }
  res.send({success:true, reply: modifiedReply});
}

exports.remove = async(req,res) => {
  const reply = await Reply.findOne({where: {id: req.body.replyId}})

  if (reply){
    await reply.destroy();
    res.send({success:true});
  }else{
    res.send({success:true, message:"Reply already doesn't exist"})
  }
}