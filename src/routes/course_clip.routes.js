
module.exports = function(app) {

  var router = require("express").Router();
  var adminRouter = require("express").Router();

  const courseClip = require("../controllers/course_clip.controller.js");

  // router.get("/list", courseClip.list);
  router.get("/get/:courseClipId", courseClip.get)
  //
  adminRouter.post("/modify/:courseClipId", courseClip.modify)
  adminRouter.post("/remove/:courseClipId", courseClip.remove)
  adminRouter.post("/add", courseClip.add)

  app.use('/api/courseClip', router);
  app.use("/api/admin/courseClip", adminRouter)
}