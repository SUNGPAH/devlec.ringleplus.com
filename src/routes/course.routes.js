
module.exports = function(app) {

  var router = require("express").Router();
  const course = require("../controllers/course.controller.js");

  router.get("/list", course.list);
  router.get("/get/:courseId", course.get)
  router.get("/:courseId/qnas", course.qnas)
  router.get("/mycourses", course.mycourses)
  router.post("/apply/:courseId", course.apply)
  router.post("/drop/:courseId", course.drop)
  //only admin..
  router.post("/add", course.add)
  router.post("/modify/:courseId", course.modify)
  router.post("/remove/:courseId", course.remove)
  router.get("/getUploadableImgUrl", course.getUploadableImgUrl)

  router.post("/grantImgPermission", course.grantImgPermission)


  

  app.use('/api/course', router);
};

/*
  course.techStacks = ["html", "javascript", "react", "nodejs"]
*/