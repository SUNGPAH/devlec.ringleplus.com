const db = require("../../models");
const { v4: uuidv4 } = require('uuid');
const jwtHelper = require("../lib/jwtHelper");

const Comment = db.comment 

exports.list = async(req, res) => {
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;
  
  const type = "Client"
  const courses = await db.Course.findAll({raw:true, where: {programType: type}, order: [['courseOrder', 'ASC']]})

  if (courses.length === 0){
    res.json({success: false})
    return
  }

  if(userId){
    const userCourses = await db.UserCourse.findAll({where: {userId: userId, courseId: {$in: [4,5]} }})
    const _courses = courses.map(course => {
      userCourse = userCourses.find(userCourse => userCourse.courseId === course.id)    
      course.userCourse = userCourse
  
      return course
    })  

    res.json({ message: "Welcome to our application.", courses: _courses});
  }else{
    res.json({ message: "Welcome to our application.", courses: courses});
  }
}

exports.get = async(req,res) => {
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;
  const courseId = parseInt(req.params.courseId)
  const courseClips = await db.CourseClip.findAll({raw: true, where: {courseId: courseId}})
  
  if(userId) {
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

  }else{
    res.send({success: true, courseClips: courseClips})
  }
  
}

exports.add = async(req,res) => {
  // const payload = {
  //   title: "do somthing here..",
  //   imgUrl: 'asdfasdf',
  //   programType: "Client",
  // }
  // 여기는 어스가 된 사람만 되어야 함...
  const payload = req.body.payload
  const course = await db.Course.create(payload)
  res.send({success: true, course: course })  
}

exports.modify = async(req,res) => {
  // const payload = {
  //   title: "do somthing here..",
  //   imgUrl: 'asdfasdf',
  // }
  const payload = req.body.payload
  const course = await db.Course.findOne({where: {id: req.params.courseId}})
  if(!course){
    res.send({success: false, message: 'no course'})  
  }

  Object.keys(payload).forEach((key,index) => {
    course[key] = payload[key]
  })  

  await course.save();

  res.send({success: true, course: course})
}

exports.remove = async(req,res) => {
  const course = await db.Course.findOne({where: {id: req.params.courseId}})

  if(course){
    await course.destroy();
    res.send({success: true})
  }else{
    res.send({success: true, message: "already deleted"})
  }
}
