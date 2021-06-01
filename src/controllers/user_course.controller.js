const db = require("../../models");
const { v4: uuidv4 } = require('uuid');
const jwtHelper = require("../lib/jwtHelper");

// const Comment = db.comment 

exports.setCurrentCourseClipId = async(req, res) => {
  const courseId = req.body.courseId
  const courseClipId = req.body.courseClipId

  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;

  if(!userId){
    res.send({success:false})
  }

  const userCourse = await db.UserCourse.findOne({where: {userId: userId, courseId: courseId}})

  userCourse.currentCourseClipId = courseClipId
  await userCourse.save()

  res.send({success: true, userCourse: userCourse})  
}