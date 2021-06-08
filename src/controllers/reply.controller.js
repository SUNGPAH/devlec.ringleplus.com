const e = require("express");
const db = require("../../models");
const jwtHelper = require("../lib/jwtHelper");

const Reply = db.Reply
const User = db.User

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
    userId: userId,
    content: req.body.content,
    thumbCnt: 0,
  })

  if (!newReply){
    res.send({success: false, message: "Something went wrong"});
    return; 
  }
  res.send({success:true, message:"success", reply: newReply})
}

exports.get = async(req, res) => {
  //params
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;

  if (!req.params.replyId){
    res.send({success:false, message:"No CommentId"});
    return
  }
  const replyId = parseInt(req.params.replyId);

  const reply = await Reply.findOne({where: {id:replyId}});

  if (!reply){
    res.send({success:false, message:"No reply"})
    return;
  }

  const user = await User.findOne({where: {id: reply.userId}}); 
  
  const modifiedReply = {
    content: reply.content,
    username: user.username,
    userImg: user.imgUrl,
  }
  res.send({success:true, message: "success", reply: modifiedReply})

}

exports.list = async(req, res) => {
  if(!req.params.commentId){
    res.send({success: false, message: "No commentId"});
    return
  }

  const commentId = parseInt(req.params.commentId)
  const replies = await Reply.findAll({where: {commentId: commentId}});
  const repliers = await db.User.findAll({where: {id: replies.map(reply => reply.userId)}});

  const replyIds = replies.map(x => x.id)

  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;

  let userThumbups 
  if(userId){
    userThumbups = await db.UserThumbup.findAll({where: {userId: userId, sourceId: replyIds, sourceType: "Reply"}})
  }

  const commentReplies = replies.map(reply => {
    const user = repliers.find(user => user.id === reply.userId)
    const userThumbup = userThumbups.find(x => x.sourceId === reply.id)

    if (!user){
      const commentReplies = {
        id: reply.id,
        username: "none",
        userImg: "",
        content: "none",
        thumbCnt: reply.thumbCnt || 0,
        userThumbup: userThumbup,
      }
      return commentReplies;
    }else{
      const commentReplies = {
        id: reply.id,
        username: user.username,
        userImg: user.imgUrl, 
        content: reply.content, 
        thumbCnt: reply.thumbCnt || 0,
        userThumbup: userThumbup,
      }
      return commentReplies;
    }
  })

  console.log(commentReplies);
  res.send({success:true, message:"success", replyList: commentReplies});
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

exports.thumbup = async(req,res) => {
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;
  const sourceId = req.body.sourceId
  const sourceType = req.body.sourceType

  const condition = {userId: userId, sourceId: sourceId, sourceType: sourceType}
  let thumbup = await db.UserThumbup.findOne({where: condition})
  
  
  // await db.UserThumbup.destroy({where: condition})
  // res.send({success: true})
  // return

  let comment
  if(!thumbup){
    thumbup = await db.UserThumbup.create(condition)

    if(sourceType === "Comment"){
      comment = await db.Comment.findOne({where:{id: sourceId}})
      if(comment.thumbCnt){
        comment.thumbCnt = comment.thumbCnt + 1
      }else{
        comment.thumbCnt = 1
      }

      await comment.save()
      console.log('---------comment!!!');
      console.log(comment);
    }
    
    if(sourceType === "Reply"){
      console.log('reply')
      const reply = await db.Reply.findOne({where:{id: sourceId}})
      reply.thumbCnt = reply.thumbCnt + 1
      await reply.save()
    }
  }

  

  res.send({success: true, thumbup: thumbup, comment: comment})
}

exports.thumbupCancel = async(req,res) => {
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;
  const sourceId = req.body.sourceId
  const sourceType = req.body.sourceType
  const condition = {userId: userId, sourceId: sourceId, sourceType: sourceType}
  const thumbup = await db.UserThumbup.findOne({where: condition})
  
  if(thumbup){
    await thumbup.destroy()
  
    if(sourceType === "Comment"){
      comment = await db.Comment.findOne({where:{id: sourceId}})
      if(comment.thumbCnt){
        comment.thumbCnt = comment.thumbCnt - 1
      }
      await comment.save()
    }

    if(sourceType === "Reply"){
      const reply = await db.Reply.findOne({where:{id: sourceId}})
      reply.thumbCnt = reply.thumbCnt - 1
      await reply.save()
    }

  }

  res.send({success: true})
}
