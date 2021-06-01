
module.exports = function(app) {

  var router = require("express").Router();
  const course = require("../controllers/course.controller.js");

  router.get("/list", course.list);
  router.get("/get/:courseId", course.get)
  router.get("/modify/:courseId", course.modify)
  router.get("/remove/:courseId", course.remove)
  router.get("/add", course.add)
  app.use('/api/course', router);
};