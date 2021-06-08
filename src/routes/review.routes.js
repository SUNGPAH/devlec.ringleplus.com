module.exports = function(app) {
  var router = require("express").Router();
  const review = require("../controllers/review.controller.js");
  router.get("/list", review.list);
  router.post("/create", review.create);
  app.use('/api/review', router);
};
