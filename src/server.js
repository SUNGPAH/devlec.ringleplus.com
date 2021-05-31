const express = require('express');
const cors = require('cors');

const port = 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))
app.use(cors());
app.use('/static', express.static('public'));


app.listen(port, () => console.log(`server running up on port ${port}`));

const db = require("../models");
// const user = db.User

app.get("/", async(req, res) => {
  console.log("---")
  const user = await db.User.findOne({});
  res.json({message: "Welcome", firstUser: user})
})

app.get("/courses", async(req, res) => {
  const courses = await db.Course.findAll({})
  res.json({message: "find all courses", courses: courses});
})

