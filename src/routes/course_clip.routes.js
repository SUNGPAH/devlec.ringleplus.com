
module.exports = function(app) {

  var router = require("express").Router();
  const courseClip = require("../controllers/course_clip.controller.js");

  // router.get("/list", courseClip.list);
  router.get("/get/:courseClipId", courseClip.get)
  router.post("/modify/:courseClipId", courseClip.modify)
  router.post("/remove/:courseClipId", courseClip.remove)
  router.post("/add", courseClip.add)
  app.use('/api/courseClip', router);
}