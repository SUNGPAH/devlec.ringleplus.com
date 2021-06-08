const db = require("../../models");
const { v4: uuidv4 } = require('uuid');
const jwtHelper = require("../lib/jwtHelper");


exports.removeUserCourseClips = async(req,res) => {
  const courseId = req.body.courseId
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;


  const courseClips = await db.CourseClip.findAll({where: {courseId: courseId}})
  const courseClipIds = courseClips.map(x => x.id)
  await db.UserCourseClip.destroy({where: {userId: userId, courseClipId: courseClipIds}})

}

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

  const userCourseClip = await db.UserCourseClip.findOne({where: {userId: userId, courseClipId: courseClipId}})
  if (userCourseClip){
    if(userCourseClip.status === "done"){
    }else{
    }
  }else{
    const courseClip = await db.CourseClip.findOne({where: {id: courseClipId}})
    
    let initStatus    
    if (!courseClip.vodUUid){
      initStatus = "done"
    }else{
      initStatus = "started"
    }

    const newUserCourseClip = await db.UserCourseClip.create({userId: userId, courseClipId: courseClipId, status: initStatus})    
  }

  const course = await db.Course.findOne({where: {id: courseId}})
  const courseClips = await db.CourseClip.findAll({where: {courseId: courseId}})
  const courseClipIds = courseClips.map(x => x.id)
  const userCourseClips = await db.UserCourseClip.findAll({where: {userId: userId, courseClipId: courseClipIds, status: "done"}})
  const length = userCourseClips.length
  
  userCourse.progress = (length * 100/courseClips.length); 
  await userCourse.save()


  res.send({success: true, userCourse: userCourse, progress: userCourse.progress, length: length, courseClipIds: courseClipIds})  
}