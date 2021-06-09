
module.exports = function(app) {

  var router = require("express").Router();
  var adminRouter = require("express").Router();
  const course = require("../controllers/course.controller.js");

  router.get("/init", course.init);
  router.get("/list", course.list);
  router.get("/get/:courseId", course.get)
  router.get("/:courseId/qnas", course.qnas)
  router.get("/mycourses", course.mycourses)
  router.post("/apply/:courseId", course.apply)
  router.post("/drop/:courseId", course.drop)
  app.use('/api/course', router);

  //only admin..
  adminRouter.post("/add", course.add)
  adminRouter.post("/modify/:courseId", course.modify)
  adminRouter.post("/remove/:courseId", course.remove)
  adminRouter.get("/getUploadableImgUrl", course.getUploadableImgUrl)
  adminRouter.post("/grantImgPermission", course.grantImgPermission)
  app.use('/api/admin/course', adminRouter);
};

/*
  course.techStacks = ["html", "javascript", "react", "nodejs"]
*/