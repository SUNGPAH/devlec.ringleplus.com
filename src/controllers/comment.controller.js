const db = require("../../models");
const { v4: uuidv4 } = require('uuid');
const jwtHelper = require("../lib/jwtHelper");

const Comment = db.comment 

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
    username: userId,
    content: req.body.content, 
    courseClipId: req.body.courseClipId
  })

  if (!newComment){
    res.send({success: false, message: "Something went wrong"});
    return; 
  }else{
    res.send({success: true , message: "success", comment: newComment})
  }
}

exports.list = async(req, res) => {
  //req의 courseClipId 와 일치하는 comment 모두 가져오기 -> username 까지..!
  //req.body.courseClipId

  if (!req.body.courseClipId){
    res.send({success:false, message:"No Course Clip Id"});
    return
  }

  const comments = await Comment.findAll({where: {courseClipId: req.body.courseClipId}});
  comments.map(comment => {
    commentList = {username: comment.username, content: comment.content}
    return commentList;
  });
  //username과 content만 뿌려주기
  res.send({success:true, message: "success", commentList: commentList});
}

exports.delete = async(req, res)=> {
  //userId와 commentId로 삭제하기.
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;

  const user = await User.findOne({where: {id: userId}});

  if (!user){
    res.send({success:false, message:"unknown user"});
    return;
  }

  const username = user.username;

  const comment = await Comment.findOne({where: {id: req.body.commentId}});
  if (!comment.username === username ){
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
  const username = user.username;

  const comment = await Comment.findOne({where: {id: req.body.commentId}});
  if (!comment.username === username){
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
