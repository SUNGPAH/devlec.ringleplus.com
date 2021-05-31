const db = require("../../models");
const { v4: uuidv4 } = require('uuid');
const jwtHelper = require("../lib/jwtHelper");

const Comment = db.comment 

exports.list = async(req, res) => {
  const userId = 1;
  const type = "Client"
  const courses = await db.Course.findAll({raw:true, where: {programType: type}, order: [['courseOrder', 'ASC']]})

  if (courses.length === 0){
    res.json({success: false})
    return
  }

  console.log(courses);
  console.log(courses.map(course => course.id));

  const userCourses = await db.UserCourse.findAll({where: {userId: userId, courseId: {$in: [4,5]} }})

  const _courses = courses.map(course => {
    userCourse = userCourses.find(userCourse => userCourse.courseId === course.id)    
    course.userCourse = userCourse

    return course
  })
  
  res.json({ message: "Welcome to our application.", courses: _courses});
}

exports.get = async(req,res) => {

  const course = await db.UserCourse.findOne({})
  res.send({success: true, course: course})

  // const userId = 1
  // const courseId = req.params.courseId
  // const course = await db.Course.findOne({raw:true, where:{id: courseId}})
  // const userCourse = await db.UserCourse.findOne({where: userId, courseId: courseId})
  
  // const courseClips = await db.CourseClip.findAll({raw: true, where: {courseId: courseId}})
  // const userCourseClips = await db.UserCourseClip.findAll({where: {
  //   courseClipId: courseClips.map(courseClip => courseClip.id),
  //   userId: userId
  // }})
  
  // const _courseClips = courseClips.map(courseClip => {
  //   const userCourseClip = userCourseClips.find(ucc => ucc.courseCliipId === courseClip.id)
  //   courseClip.userCourseClip = userCourseClip
    
  //   return courseClip
  // })
  
  // res.send({success: true, courseClips: _courseClips })
}

exports.add = async(req,res) => {
  const payload = {
    title: "do somthing here..",
    imgUrl: 'asdfasdf',
    programType: "Client",
  }

  const course = await db.Course.create(payload)
  
  res.send({success: true, course: course })  
}


  // //2. modify
  // app.get('/modifyCourse/:courseId', async(req, res) => {
  //   const payload = {
  //     title: "do somthing here..",
  //     imgUrl: 'asdfasdf',
  //   }

  //   const course = await db.Course.findOne({where: {id: req.params.courseId}})

  //   Object.keys(payload).forEach((key,index) => {
  //     course[key] = payload[key]
  //   })  

  //   await course.save();

  //   res.send({success: true, course: course })
  // }); 

  // app.get('/removeCourse/:courseId', async(req, res) => {
  //   const payload = {
  //     title: "do somthing here..",
  //     imgUrl: 'asdfasdf',
  //   }

  //   const course = await db.Course.findOne({where: {id: req.params.courseId}})

  //   if(course){
  //     await course.destroy();
  //     res.send({success: true})
  //   }else{
  //     res.send({success: true, message: "already deleted"})
  //   }
  // }); 