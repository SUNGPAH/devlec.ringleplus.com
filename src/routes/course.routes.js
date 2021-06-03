
module.exports = function(app) {

  var router = require("express").Router();
  const course = require("../controllers/course.controller.js");

  router.get("/list", course.list);
  router.get("/get/:courseId", course.get)
  router.get("/:courseId/qnas", course.qnas)
  router.get("/mycourses", course.mycourses)
  router.post("/apply/:courseId", course.apply)
  router.post("/modify/:courseId", course.modify)
  router.post("/remove/:courseId", course.remove)
  router.post("/add", course.add)
  app.use('/api/course', router);
};