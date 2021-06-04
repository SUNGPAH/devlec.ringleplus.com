const db = require("../../models");
const { v4: uuidv4 } = require('uuid');
const jwtHelper = require("../lib/jwtHelper");

const Comment = db.comment 

exports.list = async(req, res) => {

  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;
  
  const programType = "Client"
  // const programType = req.params.programType;
  const courses = await db.Course.findAll({raw:true, where: {programType: programType}, order: [['courseOrder', 'ASC']]})

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
  const course = await db.Course.findOne({raw: true, where: {id: courseId}})
  
  if(!course){
    res.send({success: false, message: "not found"})
    return
  }

  if(userId) {
    const userCourse = await db.UserCourse.findOne({where: {userId: userId, courseId: courseId}})

    const userCourseClips = await db.UserCourseClip.findAll({where: {
      courseClipId: courseClips.map(courseClip => courseClip.id),
      userId: userId
    }})
    
    const _courseClips = courseClips.map(courseClip => {
      const userCourseClip = userCourseClips.find(ucc => ucc.courseClipId === courseClip.id)
      courseClip.userCourseClip = userCourseClip
      
      return courseClip
    })  

    course.userCourse = userCourse

    res.send({success: true, courseClips: _courseClips, course: course })

  }else{
    res.send({success: true, courseClips: courseClips, course: course })
  }
  
}

exports.add = async(req,res) => {
  const payload = req.body.payload
  const course = await db.Course.create(payload)
  res.send({success: true, course: course })  
}

exports.modify = async(req,res) => {
  const payload = req.body
  const course = await db.Course.findOne({where: {id: req.params.courseId}})
  if(!course){
    res.send({success: false, message: 'no course'})  
    return
  }

  console.log(payload);

  Object.keys(payload).forEach((key,index) => {
    course[key] = payload[key]
  })  

  await course.save();

  res.send({success: true, course: course})
}

exports.remove = async(req,res) => {

  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;
  
  if(!userId){
    res.send({success: false})
    return
  }

  const course = await db.Course.findOne({where: {id: req.params.courseId}})

  if(course){
    await course.destroy();
    res.send({success: true})
  }else{
    res.send({success: true, message: "already deleted"})
  }
}

exports.apply = async(req, res) => {
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;

  if(!userId){
    res.send({success: false, message: "not logged in"})
    return
  }

  const courseId = req.params.courseId

  //이미 있는 경우는>>/
  const userCourse = await db.UserCourse.create({
    userId: userId,
    courseId: courseId, 
    progress: 0,
  })

  console.log('102938019283091283');
  console.log(courseId)

  res.send({success: true, userCourse: userCourse})
}

exports.qnas = async(req,res) => {
  res.send({success: true, qnas: []})
}

exports.mycourses = async(req,res) => {
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;

  if(!userId){
    res.send({success: false, message: "not logged in"})
    return
  }

  const userCourses = await db.UserCourse.findAll({raw: true,where: {userId: userId}})
  const courseIds = userCourses.map(x => x.courseId)
  const courses = await db.Course.findAll({raw: true, where: {id: courseIds}})

  console.log(courses); 

  const mycourses = userCourses.map(userCourse => {
    const course = courses.find(course => course.id === userCourse.courseId)
    return {...course, userCourse: userCourse}
  })

  res.send({success: true, mycourses: mycourses})
}