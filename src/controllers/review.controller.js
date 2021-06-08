const db = require("../../models");
const jwtHelper = require("../lib/jwtHelper");

exports.create = async(req, res) => {
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;
  const courseId = req.body.courseId
  const comment = req.body.comment

  if(!userId){
    res.send({success: false, message: "unauthorized"})
  }

  const review = await db.UserReview.findOne({where: {userId: userId, courseId: courseId}})
  if(review){
    res.send({success: false, message: "already submitted"})
  }

  const userReview = await db.UserReview.create({userId: userId, courseId: courseId, comment: comment})

  res.send({success: true, message: "created", userReview: userReview})
}

exports.list = async(req,res) => {
  const userReviews = await db.UserReview.findAll({where:{courseId: req.query.courseId},
    include: db.User}
  )
    
  res.send({success: true, message: "created", reviews: userReviews})
}