const db = require("../../models");
const { v4: uuidv4 } = require('uuid');
const jwtHelper = require("../lib/jwtHelper");

exports.create = async(req, res) => {
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;

  if (!userId){
    res.send({})
  }

  if (!req.body.content){
    res.send({success:false, message: "No content"});
    return;
  }
  //req 어떤식으로 올라나? content 랑, courseClip Id 가 오겠지?
  //content, courseClipId, username
  const newComment = await db.Comment.create({
    userId: userId,
    title: "default",
    content: req.body.content, 
    courseId: req.body.courseId,
    recommendation: 0,
  })

  const rawComment = newComment.get({plain:true})
  const user = await db.User.findOne({where: {id: userId}});
  
  rawComment.userImg = user.userImg
  rawComment.username = user.username 

  if (!rawComment){
    res.send({success: false, message: "Something went wrong"});
    return; 
  }else{
    res.send({success: true , message: "success", comment: rawComment})
  }
}

// exports.getAll = async(req, res) => {
//   //!! -> need to fix!
//   const comments = await Comment.findAll({});

//   const Users = await User.findAll({where: {id: comments.map(comment => {comment.userId})}})

//   comments.map(comment => {
//     let user = Users.find(user => user.id === comment.userId)
//     modifiedComments = {
//       username: user.username,
//       userImg: user.imgUrl,
//       title: comment.title,
//       content: comment.content,
//       recommendation: comment.recommendation,
//       courseClipId: comment.courseClipId,
//       id: comment.id
//     }
//     return modifiedComments
//   })
//   res.send({success:true, comments:modifiedComments});
// }
exports.get = async(req, res) => {
  if (!req.params.commentId ){
    res.send({success:false, message:"No CommentId"});
    return
  }
  const commentId = parseInt(req.params.commentId);

  const comment = await db.Comment.findOne({where: {id:commentId}});
  const commentor = await db.User.findOne({where: {id: comment.userId}});

  if (!comment){
    res.send({success:false, message: "comment not Found"})
    return
  }
  if (!commentor){
    res.send({success:false, message: "commentor not found"})
    return
  }
  const commentData = {
    username: commentor.username,
    userImg: commentor.imgUrl,
    title: comment.title,
    content: comment.content,
    recommendation: comment.recommendation, 
    commentId: comment.id
  }
  res.send({success:true, message: "success", commentData: commentData});  
}

exports.list = async(req, res) => {
  if (!req.params.courseId){
    res.send({success:false, message:"No CourseId"});
    return
  }
  const courseId = parseInt(req.params.courseId)

  const comments = await db.Comment.findAll({where: {courseId: courseId}});
  const commentors = await db.User.findAll({where: {id: comments.map(x => x.userId)}})

  const commentList = comments.map(comment => {
    // let user = await User.findOne({where: {id: comment.userId}}) 
    const user = commentors.find(commentor => commentor.id === comment.userId)
    commentUserList = {username: user.username, userImg:user.imgUrl, title: comment.title, content: comment.content, id:comment.id}
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
