
module.exports = function(app) {

  var router = require("express").Router();
  const courseClip = require("../controllers/course_clip.controller.js");

  // router.get("/list", courseClip.list);
  router.get("/get/:courseClipId", courseClip.get)
  router.get("/modify/:courseClipId", courseClip.modify)
  router.get("/remove/:courseClipId", courseClip.remove)
  router.get("/add", courseClip.add)
  app.use('/api/courseClip', router);
}