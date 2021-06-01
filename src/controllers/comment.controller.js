const db = require("../../models");
const { v4: uuidv4 } = require('uuid');
const jwtHelper = require("../lib/jwtHelper");

const Comment = db.comment 
const User = db.user

exports.create = async(req, res) => {
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;

  const user = await User.find({where: {username: username}});

  if (!user){
    res.send({})
  }

  if (!req.body.content){
    res.send({success:false, message: "No content"});
    return;
  }
  //req 어떤식으로 올라나? content 랑, courseClip Id 가 오겠지?
  //content, courseClipId, username
  const newComment = await Comment.create({
    userId: userId,
    title: req.body.title,
    content: req.body.content, 
    courseClipId: req.body.courseClipId,
    recommendation: 0,
  })

  if (!newComment){
    res.send({success: false, message: "Something went wrong"});
    return; 
  }else{
    res.send({success: true , message: "success", comment: newComment})
  }
}

exports.getAll = async(req, res) => {
  const comments = await Comment.findAll({});

  const Users = await User.findAll({where: {id: comments.map(comment => {comment.userId})}})

  comments.map(comment => {
    let user = Users.find(user => user.id === comment.userId)
    modifiedComments = {
      username: user.username,
      userImg: user.imgUrl,
      title: comment.title,
      content: comment.content,
      recommendation: comment.recommendation,
      courseClipId: comment.courseClipId,
      id: comment.id
    }
    return modifiedComments
  })
  res.send({success:true, comments:modifiedComments});
}

exports.list = async(req, res) => {
  //req의 courseClipId 와 일치하는 comment 모두 가져오기 -> username 까지..!
  //req.body.courseClipId

  if (!req.body.courseClipId){
    res.send({success:false, message:"No Course Clip Id"});
    return
  }

  const comments = await Comment.findAll({where: {courseClipId: req.body.courseClipId}});
  //userId그대로 뿌려주지 말고, 가공 후 뿌려주기
  comments.map(comment => {
    let user = await User.findOne({where: {id: comment.userId}}) 
    commentUserList = {username: user.username, userImg:user.imgUrl, title: comment.title, content: comment.content}
    return commentUserList;
  });

  //username과 content만 뿌려주기
  res.send({success:true, message: "success", commentList: commentList});
}

exports.delete = async(req, res)=> {
  //userId와 commentId로 삭제하기.
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;

  if (!user){
    res.send({success:false, message:"unknown user"});
    return;
  }

  const comment = await Comment.findOne({where: {id: req.body.commentId}});
  if (!comment.userId === userId ){
    res.send({success:false, message: "not an exact user"});
    return;
  }else{
    const deleteComment = await Comment.destroy({where: {id: req.body.commentId}});
    if(deleteComment){
      res.send({success:true, message: "deleted"});
      return 
    }else{
      res.send({success:false, message: "Deleting failed"});
    }
  }
}
exports.update = async(req,res)=> {
  //userId와 commentId, content
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;

  const user = await User.findOne({where: {id: userId}});
  if (!user){
    res.send({success:false, message:"unknown user"});
    return;
  }

  const comment = await Comment.findOne({where: {id: req.body.commentId}});
  if (!comment.userId === userId){
    res.send({success:false, message: "not an exact user"});
    return;
  }
  //username을 바꾸면 어떡함..?

  const updateComment = await Comment.update({content: req.body.content}, {where: {id: req.body.commentId}})
  if (!updateComment){
    res.send({success:false, message: "updating failed"});
    return 
  }else{
    res.send({success:true, message: "success"});
  }
}
