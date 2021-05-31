
module.exports = function(app) {

  var router = require("express").Router();
  const course = require("../controllers/course.controller.js");

  router.get("/list", course.list);
  router.get("/get/:courseId", course.get)


  app.use('/api/course', router);


  // router.get("/list", document.list);
  // router.get("/abstract/:uuid", document.abstract);
  // router.post("/create", (req, res) => document.create(req,res,connection))
  // router.post("/exportHtml", (req, res) => document.exportHtml(req,res,connection))
  // router.post("/delete", document.delete)
  // router.post("/invite", document.invite)
  // router.post("/updatestatus", document.updatestatus)
  // router.post("/invitedlist", document.invitedList)
  // router.post("/updateTitle", document.updateTitle)
  // router.post("/checkAccess", document.checkAccess)
  // router.post("/inviteDelete", document.inviteDelete)
  // router.post("/inviteDeleteMyself", document.quickDelete)


  // //about course about courseabout course about course  about course  about course  about course  about course  about course  
  // //0. get Course
  // //1. course add
  // //2. course modify
  // //3. course delete

  // // 0 all list
  // app.get('/getCourses', async(req, res) => {
  //   const courses = await Course.findAll()
  //   res.send({success: true, courseClips: courses })
  // }); 

  // //0. get Course
  // app.get('/getCourse/:courseId', async(req, res) => {
  //   const userId = 1
  //   const courseId = req.params.courseId
  //   const course = await db.Course.findOne({raw:true, where:{id: courseId}})
  //   const userCourse = await db.UserCourse.findOne({where: userId, courseId: courseId})
    
  //   //course정보 -> clip까지 모두다...
  //   const courseClips = await db.CourseClip.findAll({raw: true, where: {courseId: courseId}})
  //   const userCourseClips = await db.UserCourseClip.findAll({where: {
  //     courseClipId: courseClips.map(courseClip => courseClip.id),
  //     userId: userId
  //   }})
    
  //   const _courseClips = courseClips.map(courseClip => {
  //     const userCourseClip = userCourseClips.find(ucc => ucc.courseCliipId === courseClip.id)
  //     courseClip.userCourseClip = userCourseClip
      
  //     return courseClip
  //   })
    
  //   res.send({success: true, courseClips: _courseClips })
  // }); 

  // //1. add Course
  // app.get('/addCourse', async(req, res) => {
  //   const payload = {
  //     title: "do somthing here..",
  //     imgUrl: 'asdfasdf',
  //   }

  //   const course = await db.Course.create(payload)
    
  //   res.send({success: true, course: course })
  // }); 

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




  // app.use(function(req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "x-access-token, Origin, Content-Type, Accept"
  //   );
  //   next();
  // });

  // app.post(
  //   "/api/auth/signup",
  //   [
  //     verifySignUp.checkDuplicateUsernameOrEmail,
  //     verifySignUp.checkRolesExisted
  //   ],
  //   controller.signup
  // );

  // app.post("/api/auth/signin", controller.signin);

};