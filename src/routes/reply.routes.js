
module.exports = function(app) {

  var router = require("express").Router();
  const reply = require("../controllers/reply.controller.js");

  router.post("/create", reply.create)
  router.get("/get/:replyId", reply.get)
  router.get("/list/:commentId", reply.list)
  router.post("/remove", reply.remove)
  router.post("/update", reply.update)
  router.post("/thumbup", reply.thumbup)
  router.post("/thumbupCancel", reply.thumbupCancel)
  app.use('/api/reply', router);
}