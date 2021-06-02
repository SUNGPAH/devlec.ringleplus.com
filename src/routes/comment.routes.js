
module.exports = function(app) {

  var router = require("express").Router();
  const comment = require("../controllers/comment.controller.js");

  router.post("/create", comment.create)
  router.post("/getAll", comment.getAll)
  router.post("/list", comment.list)
  router.post("/delete", comment.delete)
  router.update("/update", comment.update)

  app.use('/api/comment', router);
}