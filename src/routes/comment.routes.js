
module.exports = function(app) {
  var router = require("express").Router();
  const comment = require("../controllers/comment.controller.js");
  router.post("/create", comment.create);
  router.get("/list/:courseId", comment.list)
  app.use('/api/comment', router);
};
