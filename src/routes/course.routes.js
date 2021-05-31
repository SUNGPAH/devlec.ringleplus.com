
module.exports = function(app) {

  var router = require("express").Router();
  const course = require("../controllers/course.controller.js");

  router.get("/list", course.list);
  router.get("/get/:courseId", course.get)
  router.get("/getCourseDetail/:courseId", course.getCourseDetail)
  router.get("/modify/:courseId", course.modify)
  router.get("/remove/:courseId", course.remove)
  router.get("/add", course.add)



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
};