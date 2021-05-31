const db = require("../../models");
const { v4: uuidv4 } = require('uuid');
const jwtHelper = require("../lib/jwtHelper");

const Comment = db.comment 

exports.list = async(req, res) => {
  const userId = 1;
  const type = "client"
  const courses = await db.Course.findAll({where: {type: type}, order: [['courseOrder', 'ASC']]})

  const userCourses = await db.UserCourse.findAll({where: {userId: userId, courseId: courses.map(course => course.id)}})

  const _courses = courses.map(course => {
    userCourse = userCourses.find(userCourse => userCourse.courseId === course.id)    
    let values = course.dataValues
    values.userCourse = userCourse

    return values
  })
  
  res.json({ message: "Welcome to our application.", courses: _courses});
}

exports.get = async(req,res) => {
  const userId = 1
  const courseId = req.params.courseId
  const course = await db.Course.findOne({raw:true, where:{id: courseId}})
  const userCourse = await db.UserCourse.findOne({where: userId, courseId: courseId})
  
  const courseClips = await db.CourseClip.findAll({raw: true, where: {courseId: courseId}})
  const userCourseClips = await db.UserCourseClip.findAll({where: {
    courseClipId: courseClips.map(courseClip => courseClip.id),
    userId: userId
  }})
  
  const _courseClips = courseClips.map(courseClip => {
    const userCourseClip = userCourseClips.find(ucc => ucc.courseCliipId === courseClip.id)
    courseClip.userCourseClip = userCourseClip
    
    return courseClip
  })
  
  res.send({success: true, courseClips: _courseClips })
}