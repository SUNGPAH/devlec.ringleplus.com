module.exports = function(app) {
  var router = require("express").Router();
  const userCourse = require("../controllers/user_course.controller.js");

  router.post("/setCurrentCourseClipId", userCourse.setCurrentCourseClipId)
  router.post("/removeUserCourseClips", userCourse.removeUserCourseClips)

  
  app.use('/api/userCourse', router);
}
