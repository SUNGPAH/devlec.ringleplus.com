
module.exports = function(app) {

  var router = require("express").Router();
  const reply = require("../controllers/reply.controller.js");

  router.post("/create", reply.create)
  router.get("/get/replyId", reply.get)
  router.post("/getListWithCommentId", reply.getListWithCommentId)
  router.post("/remove", reply.remove)
  router.post("/update", reply.update)

  app.use('/api/reply', router);
}